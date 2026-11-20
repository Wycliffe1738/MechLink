
import React from "react";
import Services from "../components/Services";
import HowItWorks from "../components/HowItWorks";
import MechanicsPromo from "../components/MechanicsPromo";
import AssistanceRequest from "../components/AssistanceRequest";
import MechanicRegistration from "../components/MechanicRegistration";


function Home() {
    return (
    <>
        <section className="hero" id="home">

            <div className="hero-content">
                <span className="hero-tag">

                    MECHANICAL HELP, WHENEVER YOU NEED IT

                </span>

                <h1>
                    Broken down?
                    <span>
                        We've got you covered
                        </span>
                </h1>

                <p>
                    Whether it's your car, motorcycle, truck or machinery,
                    finding reliable mechanical assistance is now easier
                    than ever
                </p>

                <div className="hero-actions">
                    <a href="#request" className="primary-button">
                        Find a Mechanic
                    </a>
                    <a href="#how-it-works" className="secondary-button">
                        How It Works
                    </a>
                </div>

                <div className="hero-trust">

                    <div>
                        <strong>
                            Reliable
                            </strong>
                        <span>
                            Verified mechanics
                            </span>
                    </div>

                    <div>
                        <strong>
                            Convenient
                            </strong>
                        <span>
                            Wherever you are
                            </span>
                    </div>

                    <div>
                        <strong>
                            Transparent
                            </strong>
                        <span>
                            Clear cost estimates
                            </span>
                    </div>
                </div>
            </div>

            <div className="hero-image">
                <img

                    src="https://images.pexels.com/photos/12555015/pexels-photo-12555015.jpeg"

                    alt="Mechanic inspecting a vehicle engine"
                />




  <button
    type="button"
    className="floating-card"
    onClick={() => {

        document.getElementById("request")?.scrollIntoView({
            behavior: "smooth"
        });
    }}
>
    <span className="status-dot"></span>
    <div>
        <strong>
            Need assistance?
            </strong>
        <p>
            Help is closer than you think
            </p>
    </div>
</button>


            </div>
        </section>
                <Services />

                <HowItWorks />
                <MechanicsPromo />
                <AssistanceRequest />
                <MechanicRegistration />
    </>
    );
}

export default Home;
