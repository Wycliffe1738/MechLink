
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMechLink } from "../context/MechLinkContext";

function MechanicDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mechanics } = useMechLink();


    const mechanic = mechanics.find(
    mechanic => String(mechanic.id) === id
);
    function requestMechanic() {
        navigate("/bookings", {
            state: {
                mechanic: {
                    name: mechanic.name,
                    location: mechanic.location
                }
            }
        });
    }

    if (!mechanic) {
        return (
            <section className="mechanic-discovery">
                <div className="discovery-container">
                    <h2>Mechanic not found</h2>
                    <p>
                        This mechanic is not available
                        </p>
                </div>
            </section>
        );
    }

    return (
        <section className="mechanic-discovery">
            <div className="discovery-container">
                <article className="mechanic-card mechanic-profile-card">
                    <img
                        src={mechanic.image}
                        alt={mechanic.name}
                        className="mechanic-photo"
                    />

                    <div className="mechanic-info">
                        <div className="mechanic-top">
                            <h2>{mechanic.name}</h2>
                            <span className="mechanic-rating">
                                ★ {mechanic.rating}
                            </span>
                        </div>

                        <p className="mechanic-specialty">
                            {mechanic.specialty}
                        </p>

                        <p className="mechanic-location">
                            📍 {mechanic.location}
                        </p>

                        <p className="mechanic-arrival">
                            Estimated arrival: {mechanic.arrival}
                        </p>

                        <p className="mechanic-price">
                            {mechanic.price}
                        </p>

                        {mechanic.experience !== undefined && (
                            <p className="mechanic-location">
                                {mechanic.experience} years of experience
                            </p>
                        )}

                        {mechanic.description && (
                            <p className="mechanic-description">
                                {mechanic.description}
                            </p>
                        )}

                        <span className={`mechanic-availability ${mechanic.available ? "" : "busy"}`}>
                            {mechanic.available ? "Available" : "Currently Busy"}
                        </span>

                        <button
                            className="mechanic-book-button"
                            disabled={!mechanic.available}
                            onClick={requestMechanic}
                        >
                            Request This Mechanic
                        </button>
                    </div>
                </article>
            </div>
        </section>
    );
}

export default MechanicDetails;
