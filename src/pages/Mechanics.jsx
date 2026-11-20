import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMechLink } from "../context/MechLinkContext";



function Mechanics() {

    const navigate = useNavigate();
    const { mechanics } = useMechLink();
    const [searchValue, setSearchValue] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");



    const filteredMechanics = mechanics.filter(mechanic => {
        const search = searchValue.toLowerCase().trim();

        const matchesSearch =
            mechanic.name.toLowerCase().includes(search) ||
            mechanic.location.toLowerCase().includes(search) ||
            mechanic.specialty.toLowerCase().includes(search);

        const matchesSpecialty =
            selectedSpecialty === "All" ||
            mechanic.specialty === selectedSpecialty;

        return matchesSearch && matchesSpecialty;
    });


    function selectMechanic(mechanic) {
    navigate("/bookings", {
        state: {
            mechanic: {
                name: mechanic.name,
                location: mechanic.location
            }
        }
    });
}

    return (
        <section className="mechanic-discovery" id="find-mechanics">
            <div className="discovery-container">

                <div className="section-heading">
                    <span>FIND YOUR MECHANIC</span>
                    <h2>Reliable help is closer than you think</h2>
                    <p>
                        Explore mechanics who are ready to help get you moving again
                    </p>
                </div>

                <div className="mechanic-search">
                    <input
                        type="text"
                        placeholder="Search by name, location or specialization"
                        value={searchValue}
                        onChange={event => setSearchValue(event.target.value)}
                    />

                    <select
                        value={selectedSpecialty}
                        onChange={event => setSelectedSpecialty(event.target.value)}
                    >
                        <option value="All">All Specializations</option>
                        <option value="Engine Repair">Engine Repair</option>
                        <option value="Electrical">Electrical</option>
                        <option value="Tyre Services">Tyre Services</option>
                        <option value="General Repairs">General Repairs</option>
                        <option value="Heavy Machinery">Heavy Machinery</option>
                    </select>
                </div>

                <div className="mechanic-grid">
                    {filteredMechanics.length === 0 ? (
                        <div className="no-mechanics">
                            <h3>No mechanics found</h3>
                            <p>Try another name, location or specialization</p>
                        </div>
                    ) : (
                        filteredMechanics.map(mechanic => (
                            <article className="mechanic-card" key={mechanic.id}>
                                <img
                                    src={mechanic.image}
                                    alt={mechanic.name}
                                    className="mechanic-photo"
                                />

                                <div className="mechanic-info">
                                    <div className="mechanic-top">
                                        <h3>{mechanic.name}</h3>
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

                                    <span className={`mechanic-availability ${mechanic.available ? "" : "busy"}`}>
                                        {mechanic.available ? "Available" : "Currently Busy"}
                                    </span>
<button
    className="mechanic-profile-button"
    onClick={() => navigate(`/mechanics/${mechanic.id}`)}
>
    View Profile
</button>
                                    <button
                                        className="mechanic-book-button"
                                        disabled={!mechanic.available}
                                        onClick={() => selectMechanic(mechanic)}
                                    >
                                        {mechanic.available
                                            ? "Request This Mechanic"
                                            : "Currently Unavailable"}
                                    </button>
                                </div>
                            </article>
                        ))
                    )}
                </div>

                <p className="mechanic-count">
                    {filteredMechanics.length === 0
                        ? "No mechanics available"
                        : `Showing ${filteredMechanics.length} mechanics`}
                </p>

            </div>
        </section>
    );
}

export default Mechanics;
