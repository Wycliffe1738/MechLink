import CustomerBookingHistory from "../components/CustomerBookingHistory";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

function Bookings() {
    const location = useLocation();

    const [mechanicName, setMechanicName] = useState(
        location.state?.mechanic?.name || ""
    );

    const [mechanicLocation, setMechanicLocation] = useState(
        location.state?.mechanic?.location || ""
    );

    const [message, setMessage] = useState("");

    const today = new Date().toISOString().split("T")[0];

    function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        const customerPhone = form.querySelector("#bookingCustomerPhone").value.trim();
        const phoneDigits = customerPhone.replace(/\D/g, "");

        if (phoneDigits.length < 9 || phoneDigits.length > 15) {
            setMessage("Please enter a valid phone number");
            return;
        }

        const selectedDate = form.querySelector("#bookingDate").value;
        const selectedTime = form.querySelector("#bookingTime").value;

        const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

        if (selectedDateTime < new Date()) {
            setMessage("Please choose a future date and time");
            return;
        }

        const newBooking = {
            id: Date.now(),
            mechanicName: mechanicName,
            customerName: form.querySelector("#bookingCustomerName").value.trim(),
            customerPhone: customerPhone,
            date: selectedDate,
            time: selectedTime,
            location: mechanicLocation.trim(),
            problem: form.querySelector("#bookingProblem").value.trim(),
            status: "Pending",
            dateSubmitted: new Date().toLocaleString()
        };

        const savedBookings = JSON.parse(
            localStorage.getItem("mechLinkBookings") || "[]"
        );

        savedBookings.push(newBooking);

        localStorage.setItem(
            "mechLinkBookings",
            JSON.stringify(savedBookings)
        );

        setMessage("Your booking request has been submitted successfully");

        form.reset();
        setMechanicName("");
        setMechanicLocation("");
    }

    return (
        <><section className="booking-section" id="booking">
            <div className="booking-container">

                <div className="section-heading">
                    <span>BOOK A MECHANIC</span>
                    <h2>Let's arrange your assistance</h2>
                    <p>
                        Choose when you would like your selected mechanic to help you
                    </p>
                </div>

                <form className="booking-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="bookingMechanic"
                            placeholder="Selected mechanic"
                            value={mechanicName}
                            onChange={event => setMechanicName(event.target.value)}
                            readOnly
                            required />
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="bookingCustomerName"
                            placeholder="Your full name"
                            required />
                    </div>

                    <div className="form-group">
                        <input
                            type="tel"
                            id="bookingCustomerPhone"
                            placeholder="Your phone number"
                            required />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="bookingDate">Preferred date</label>
                            <input
                                type="date"
                                id="bookingDate"
                                min={today}
                                required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bookingTime">Preferred time</label>
                            <input
                                type="time"
                                id="bookingTime"
                                required />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="bookingLocation"
                            placeholder="Where do you need assistance?"
                            value={mechanicLocation}
                            onChange={event => setMechanicLocation(event.target.value)}
                            required />
                    </div>

                    <div className="form-group">
                        <textarea
                            id="bookingProblem"
                            rows="4"
                            placeholder="Describe the mechanical problem"
                            required
                        ></textarea>
                    </div>

                    <button type="submit" className="submit-button">
                        Confirm Booking Request
                    </button>

                    <p className="form-message">{message}</p>
                </form>

            </div>
        </section><CustomerBookingHistory /></>
    );
}

export default Bookings;
