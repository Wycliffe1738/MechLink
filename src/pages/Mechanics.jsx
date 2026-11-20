
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const sampleMechanics = [
    {
        id: 1,
        name: "David Mwangi",
        specialty: "Engine Repair",
        location: "Westlands, Nairobi",
        rating: 4.9,
        arrival: "15–25 minutes",
        price: "From KSh 1,500",
        available: true,
        image: "https://images.pexels.com/photos/4489758/pexels-photo-4489758.jpeg?auto=compress&cs=tinysrgb&w=600"
    },
    {
        id: 2,
        name: "adams muhindi",
        specialty: "Electrical",
        location: "Kilimani, Nairobi",
        rating: 4.8,
        arrival: "20–30 minutes",
        price: "From KSh 2,000",
        available: true,
        image: "https://images.pexels.com/photos/33653240/pexels-photo-33653240.jpeg?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 3,
        name: "Peter Kamau",
        specialty: "Tyre Services",
        location: "Thika Road, Nairobi",
        rating: 4.7,
        arrival: "10–20 minutes",
        price: "From KSh 800",
        available: true,
        image: "https://images.pexels.com/photos/32828998/pexels-photo-32828998.jpeg?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 4,
        name: "Samuel Kiptoo",
        specialty: "General Repairs",
        location: "Karen, Nairobi",
        rating: 4.9,
        arrival: "25–35 minutes",
        price: "From KSh 1,800",
        available: false,
        image: "https://images.pexels.com/photos/28153669/pexels-photo-28153669.jpeg?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 5,
        name: "James Njoroge",
        specialty: "Heavy Machinery",
        location: "Industrial Area, Nairobi",
        rating: 4.8,
        arrival: "30–45 minutes",
        price: "From KSh 3,500",
        available: true,
        image: "https://images.pexels.com/photos/20814732/pexels-photo-20814732.jpeg?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: 6,
        name: "Michael Ouma",
        specialty: "Engine Repair",
        location: "Kasarani, Nairobi",
        rating: 4.6,
        arrival: "20–30 minutes",
        price: "From KSh 1,200",
        available: true,
        image: "https://images.pexels.com/photos/31928799/pexels-photo-31928799.jpeg?auto=format&fit=crop&w=600&q=80"
    }
];

function Mechanics() {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [selectedSpecialty, setSelectedSpecialty] = useState("All");

    const registeredMechanics = JSON.parse(
        localStorage.getItem("mechLinkMechanics") || "[]"
    );

    const approvedMechanics = registeredMechanics
        .filter(mechanic => mechanic.status === "Approved")
        .map(mechanic => ({
            id: mechanic.id,
            name: mechanic.name,
            specialty: mechanic.specialty,
            location: mechanic.location,
            rating: "New",
            arrival: "Contact for availability",
            price: "Contact for pricing",
            available: true,
            image: "https://images.pexels.com/photos/8985510/pexels-photo-8985510.jpeg?auto=format&fit=crop&w=600&q=80"
        }));

    const allMechanics = [...sampleMechanics, ...approvedMechanics];

    const filteredMechanics = allMechanics.filter(mechanic => {
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
