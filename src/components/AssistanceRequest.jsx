
import React, { useState } from "react";

function AssistanceRequest() {


    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        const customerName = form.querySelector("#customerName").value.trim();
        const customerPhone = form.querySelector("#customerPhone").value.trim();
        const machineryType = form.querySelector("#machineryType").value;
        const customerLocation = form.querySelector("#customerLocation").value.trim();
        const problemDescription = form.querySelector("#problemDescription").value.trim();
        const problemImage = form.querySelector("#problemImage").files[0];

        const phoneDigits = customerPhone.replace(/\D/g, "");

        if (phoneDigits.length < 9 || phoneDigits.length > 15) {
            setFormMessage("Please enter a valid phone number");
            return;
        }

        if (problemImage && !problemImage.type.startsWith("image/")) {
            setFormMessage("Please select a valid image");
            return;
        }

        if (problemImage && problemImage.size > 2 * 1024 * 1024) {
            setFormMessage("Your image must be smaller than 2MB");
            return;
        }

        setIsSubmitting(true);
        setFormMessage("");

        try {
            let imageData = "";

            if (problemImage) {
                imageData = await new Promise((resolve, reject) => {
                    const reader = new FileReader();

                    reader.onload = () => resolve(reader.result);
                    reader.onerror = () => reject(new Error("Image upload failed"));

                    reader.readAsDataURL(problemImage);
                });
            }

            const newRequest = {
                id: Date.now(),
                customerName,
                customerPhone,
                machineryType,
                customerLocation,
                problemDescription,
                problemImage: imageData,
                status: "Pending",
                dateSubmitted: new Date().toLocaleString()
            };

            const savedRequests = JSON.parse(
                localStorage.getItem("mechLinkRequests") || "[]"
            );

            savedRequests.push(newRequest);

            localStorage.setItem(
                "mechLinkRequests",
                JSON.stringify(savedRequests)
            );

           

            setFormMessage("Your request has been submitted successfully");
            form.reset();

        } catch (error) {
            setFormMessage("Something went wrong. Please try again");

        } finally {
            setIsSubmitting(false);
        }
    }

    const [formMessage, setFormMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    return (
        <section className="request-section" id="request">
            <div className="request-container">

                <div className="request-heading">
                    <span>MECHLINK RESCUE</span>
                    <h2>Let's get you the help you need</h2>
                    <p>
                        Tell us a little about what's happening and we'll help you find the right person for the job
                    </p>
 
                </div>

                <form className="request-form" onSubmit={handleSubmit}>


                    <div className="form-row">
                        <div className="form-group">
                            <input
                                type="text"
                                id="customerName"
                                placeholder="Your full name"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="tel"
                                id="customerPhone"
                                placeholder="Phone number"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <select id="machineryType" required>
                            <option value="">Select machinery type</option>
                            <option value="Car">Car</option>
                            <option value="Motorcycle">Motorcycle</option>
                            <option value="Truck">Truck</option>
                            <option value="Tractor">Tractor</option>
                            <option value="Heavy Machinery">Heavy Machinery</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            id="customerLocation"
                            placeholder="Where are you located?"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <textarea
                            id="problemDescription"
                            rows="5"
                            placeholder="Describe the mechanical problem"
                            required
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="problemImage">
                            Upload a picture of the problem
                        </label>
                        <input
                            type="file"
                            id="problemImage"
                            accept="image/*"
                        />
                    </div>

                    <button
                        type="submit"
                        className="submit-button"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Submitting..." : "Find Me a Mechanic"}
                    </button>

                    <p className="form-message">{formMessage}</p>

                </form>
            </div>
        </section>

    );
}

export default AssistanceRequest;
