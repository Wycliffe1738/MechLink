
import React from "react";

function HowItWorks() {
    return (
        <section className="how-it-works" id="how-it-works">
            <div className="section-heading">
                <span>
                    HOW MECHLINK WORKS

                    </span>
                <h2>
                    Getting help is simple
                    
                    </h2>
                <p>
                    Three simple steps to get your machinery moving again
                    </p>
            </div>

            <div className="steps-grid">
                <article className="step-card">
                    <span>
                        01
                        </span>
                    <h3>
                        Tell us the problem
                        </h3>
                    <p>
                        Describe the mechanical issue, select your machinery and share your location
                    </p>
                </article>

                <article className="step-card">
                    <span>02</span>
                    <h3>
                        Find your mechanic
                        </h3>
                    <p>
                        Explore available mechanics, compare quotations and choose the right service provider
                    </p>
                </article>

                <article className="step-card">
                    <span>03</span>
                    <h3>
                        Get back on the road
                        </h3>
                    <p>
                        Confirm your booking and receive the mechanical assistance you need
                    </p>
                </article>
            </div>
        </section>
    );
}

export default HowItWorks;
