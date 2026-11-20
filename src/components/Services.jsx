
import React from "react";

function Services() {
    return (
        <section className="services" id="services">
            <div className="section-heading">
                <span>
                    WHAT WE OFFER
                </span>
                <h2>
                    One platform, multiple solutions
                    </h2>
                <p>
                    Whatever the problem, we've made finding help easier
                    </p>
            </div>

            <div className="service-grid">
                <article className="service-card">
                    <div className="service-icon">🚗</div>
                    <h3>
                        Car Repairs
                        </h3>
                    <p>
                        Find qualified mechanics for your vehicle repairs
                        </p>
                </article>

                <article className="service-card">
                    <div className="service-icon">🏍️</div>
                    <h3>
                        Motorcycle Repairs
                    </h3>
                    <p>
                        Get assistance for motorcycles and other two-wheelers
                    </p>
                </article>

                <article className="service-card">
                    <div className="service-icon">🚛</div>
                    <h3>
                        Heavy Machinery
                    </h3>
                    <p>
                        Connect with specialists for trucks and heavy equipment
                    </p>
                </article>

                <article className="service-card">
                    <div className="service-icon">🛻</div>
                    <h3>Towing Services</h3>
                    <p>
                        Find recovery services when your machinery cannot move
                    </p>
                </article>

                <article className="service-card">
                    <div className="service-icon">🔋</div>
                    <h3>Battery Assistance</h3>
                    <p>
                        Get help with battery failures and replacements
                    </p>
                </article>

                <article className="service-card">
                    <div className="service-icon">🔧</div>
                    <h3>General Repairs</h3>
                    <p>
                        Find specialists for different mechanical problems
                    </p>
                </article>
            </div>
        </section>
    );
}

export default Services;
