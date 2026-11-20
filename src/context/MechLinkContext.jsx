
import React, { createContext, useContext, useState } from "react";

const MechLinkContext = createContext();

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

function MechLinkProvider({ children }) {
    const [mechanics] = useState(() => {
        const registeredMechanics = JSON.parse(
            localStorage.getItem("mechLinkMechanics") || "[]"
        );

        const approvedMechanics = registeredMechanics
            .filter(mechanic => mechanic.status === "Approved")
            .map(mechanic => ({
                ...mechanic,
                rating: "New",
                arrival: "Contact for availability",
                price: "Contact for pricing",
                available: true,
                image: "https://images.pexels.com/photos/8985510/pexels-photo-8985510.jpeg?auto=format&fit=crop&w=600&q=80"
            }));

        return [...sampleMechanics, ...approvedMechanics];
    });

    return (
        <MechLinkContext.Provider value={{ mechanics }}>
            {children}
        </MechLinkContext.Provider>
    );
}

function useMechLink() {
    return useContext(MechLinkContext);
}

export { MechLinkProvider, useMechLink };
