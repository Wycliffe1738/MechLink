
import React, { useState } from "react";

function CustomerBookingHistory() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bookings, setBookings] = useState([]);
    const [message, setMessage] = useState("");
    const [searched, setSearched] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const searchPhone = phoneNumber.replace(/\D/g, "");

        if (searchPhone.length < 9 || searchPhone.length > 15) {
            setBookings([]);
            setMessage("Please enter a valid phone number");
            setSearched(true);
            return;
        }

        const savedBookings = JSON.parse(
            localStorage.getItem("mechLinkBookings") || "[]"
        );

        const customerBookings = savedBookings.filter(booking => {
            const bookingPhone = booking.customerPhone.replace(/\D/g, "");

            return bookingPhone === searchPhone;
        });

        setBookings(customerBookings.slice().reverse());
        setMessage("");
        setSearched(true);
    }

    return (
        <section
            className="customer-booking-history"
            id="customer-booking-history"
        >
            <div className="customer-history-container">

                <div className="section-heading">
                    <span>TRACK YOUR BOOKING</span>
                    <h2>Where does your booking stand?</h2>
                    <p>
                        Enter the phone number you used when booking to view your booking updates
                    </p>
                </div>

                <form
                    className="booking-lookup-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <input
                            type="tel"
                            id="lookupPhone"
                            placeholder="Enter your booking phone number"
                            value={phoneNumber}
                            onChange={event => setPhoneNumber(event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Find My Bookings
                    </button>
                </form>

                <div className="customer-booking-results">

                    {searched && message && (
                        <div className="booking-lookup-empty">
                            <h3>Invalid phone number</h3>
                            <p>{message}</p>
                        </div>
                    )}

                    {searched && !message && bookings.length === 0 && (
                        <div className="booking-lookup-empty">
                            <h3>No bookings found</h3>
                            <p>Check your phone number and try again</p>
                        </div>
                    )}

                    {bookings.map(booking => (
                        <div className="customer-booking-card" key={booking.id}>
                            <h3>Booking with {booking.mechanicName}</h3>

                            <span className={`customer-booking-status ${
                                booking.status === "Confirmed"
                                    ? "confirmed"
                                    : booking.status === "Cancelled"
                                    ? "cancelled"
                                    : ""
                            }`}>
                                {booking.status}
                            </span>

                            <p>Preferred date: {booking.date}</p>
                            <p>Preferred time: {booking.time}</p>
                            <p>Location: {booking.location}</p>
                            <p>Problem: {booking.problem}</p>
                        </div>
                    ))}

                </div>

            </div>
        </section>


    );
}

export default CustomerBookingHistory;
