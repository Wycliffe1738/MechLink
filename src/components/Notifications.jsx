
import React, { useState } from "react";

function Notifications() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [notifications, setNotifications] = useState([]);
    const [message, setMessage] = useState("");
    const [searched, setSearched] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        const searchPhone = phoneNumber.replace(/\D/g, "");

        if (searchPhone.length < 9 || searchPhone.length > 15) {
            setNotifications([]);
            setMessage("Please enter a valid phone number");
            setSearched(true);
            return;
        }

        const savedNotifications = JSON.parse(
            localStorage.getItem("mechLinkNotifications") || "[]"
        );

        const customerNotifications = savedNotifications.filter(notification => {
            const notificationPhone = notification.customerPhone.replace(/\D/g, "");

            return notificationPhone === searchPhone;
        });

        setNotifications(customerNotifications.slice().reverse());
        setMessage("");
        setSearched(true);
    }

    function clearNotifications() {
        const searchPhone = phoneNumber.replace(/\D/g, "");

        const savedNotifications = JSON.parse(
            localStorage.getItem("mechLinkNotifications") || "[]"
        );

        const remainingNotifications = savedNotifications.filter(notification => {
            const notificationPhone = notification.customerPhone.replace(/\D/g, "");

            return notificationPhone !== searchPhone;
        });

        localStorage.setItem(
            "mechLinkNotifications",
            JSON.stringify(remainingNotifications)
        );

        setNotifications([]);
    }

    return (
        <section className="notification-section" id="notifications">
            <div className="notification-container">

                <div className="section-heading">
                    <span>STAY UPDATED</span>
                    <h2>Your Notifications</h2>
                    <p>Stay informed about changes to your mechanic bookings</p>
                </div>

                <form className="booking-lookup-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="tel"
                            placeholder="Enter your booking phone number"
                            value={phoneNumber}
                            onChange={event => setPhoneNumber(event.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-button">
                        Find My Notifications
                    </button>
                </form>

                {searched && message && (
                    <div className="booking-lookup-empty">
                        <h3>Invalid phone number</h3>
                        <p>{message}</p>
                    </div>
                )}

                {searched && !message && (
                    <>
                        <div className="notification-tools">
                            <span>
                                {notifications.length}{" "}
                                {notifications.length === 1
                                    ? "notification"
                                    : "notifications"}
                            </span>

                            {notifications.length > 0 && (
                                <button type="button" onClick={clearNotifications}>
                                    Clear Notifications
                                </button>
                            )}
                        </div>

                        <div className="notification-list">
                            {notifications.length === 0 ? (
                                <div className="empty-notifications">
                                    <h4>No notifications yet</h4>
                                    <p>
                                        Updates about your mechanic bookings will appear here
                                    </p>
                                </div>
                            ) : (
                                notifications.map(notification => (
                                    <div
                                        className="notification-card"
                                        key={notification.id}
                                    >
                                        <div className="notification-icon">🔔</div>

                                        <div className="notification-content">
                                            <h4>{notification.title}</h4>
                                            <p>{notification.message}</p>
                                            <small>{notification.date}</small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                )}

            </div>
        </section>
    );
}

export default Notifications;
