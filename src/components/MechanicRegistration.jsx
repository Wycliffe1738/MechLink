import React, { useState } from "react";

function MechanicRegistration() {
    const [message, setMessage] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        const mechanicName = form.querySelector("#mechanicName").value.trim();
        const mechanicPhone = form.querySelector("#mechanicPhone").value.trim();
        const mechanicLocation = form.querySelector("#mechanicLocation").value.trim();
        const mechanicSpecialty = form.querySelector("#mechanicSpecialty").value;
        const mechanicExperience = Number(form.querySelector("#mechanicExperience").value);
        const mechanicDescription = form.querySelector("#mechanicDescription").value.trim();

        const phoneDigits = mechanicPhone.replace(/\D/g, "");

        if (phoneDigits.length < 9 || phoneDigits.length > 15) {
            setMessage("Please enter a valid phone number");
            return;
        }

        if (mechanicExperience < 0 || mechanicExperience > 60) {
            setMessage("Please enter a valid number of experience years");
            return;
        }

        const newMechanic = {
            id: Date.now(),
            name: mechanicName,
            phone: mechanicPhone,
            location: mechanicLocation,
            specialty: mechanicSpecialty,
            experience: mechanicExperience,
            description: mechanicDescription,
            status: "Pending",
            dateRegistered: new Date().toLocaleString()
        };

        const registeredMechanics = JSON.parse(
            localStorage.getItem("mechLinkMechanics") || "[]"
        );

        registeredMechanics.push(newMechanic);

        localStorage.setItem(
            "mechLinkMechanics",
            JSON.stringify(registeredMechanics)
        );

        setMessage("Your registration has been submitted successfully");
        form.reset();
    }

    return (
        <section className="mechanic-registration" id="mechanic-registration">
            <div className="registration-container">

                <div className="section-heading">
                    <span>
                        JOIN THE MECHLINK NETWORK
                        </span>
                    <h2>
                        Ready to grow your mechanical business?
                        </h2>
                    <p>
                        Register with MechLink and connect with customers who need your skills
                        </p>
                </div>

                <form className="registration-form" onSubmit={handleSubmit}>

                    <div className="form-row">
                        <div className="form-group">
                            <input type="text" id="mechanicName" placeholder="Your full name" required />
                        </div>

                        <div className="form-group">
                            <input type="tel" id="mechanicPhone" placeholder="Phone number" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="text" id="mechanicLocation" placeholder="Your working location" required />
                    </div>

                    <div className="form-group">
                        <select id="mechanicSpecialty" required>
                            <option
                            value="">Select your specialization
                            </option>
                            <option
                            value="Engine Repair">Engine Repair
                            </option>
                            <option
                            value="Electrical">Electrical
                            </option>
                            <option
                            value="Tyre Services">Tyre Services
                            </option>
                            <option
                            value="General Repairs">General Repairs
                            </option>
                            <option
                            value="Heavy Machinery">Heavy Machinery
                            </option>
                            <option
                            value="Towing Services">Towing Services
                            </option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input type="number" id="mechanicExperience" placeholder="Years of experience" min="0" max="60" required />
                    </div>

                    <div className="form-group">
                        <textarea id="mechanicDescription" placeholder="Tell us about your experience and services" rows="5"></textarea>
                    </div>

                    <p id="registrationMessage">{message}</p>

                    <button type="submit" className="primary-button">
                        Submit Registration
                    </button>

                </form>
            </div>
        </section>
    );
}

export default MechanicRegistration;