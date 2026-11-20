
import React, { useState } from "react";

function CustomerRequests() {
    const [requests, setRequests] = useState(() => {
        return JSON.parse(localStorage.getItem("mechLinkRequests") || "[]");
    });

    const totalRequests = requests.length;

    const pendingRequests = requests.filter(
        request => request.status === "Pending"
    ).length;

    const completedRequests = requests.filter(
        request => request.status === "Completed"
    ).length;


    function handleComplete(requestId) {
        const updatedRequests = requests.map(request =>
            request.id === requestId
                ? { ...request, status: "Completed" }
                : request
        );

        localStorage.setItem(
            "mechLinkRequests",
            JSON.stringify(updatedRequests)
        );

        setRequests(updatedRequests);
    }

    function handleCancel(requestId) {
        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this request?"
        );

        if (!confirmCancel) {
            return;
        }

        const updatedRequests = requests.map(request =>
            request.id === requestId
                ? { ...request, status: "Cancelled" }
                : request
        );

        localStorage.setItem(
            "mechLinkRequests",
            JSON.stringify(updatedRequests)
        );

        setRequests(updatedRequests);
    }



    return (
        <section className="customer-dashboard" id="dashboard">
            <div className="dashboard-container">

                <div className="section-heading">
                    <span>
                        YOUR MECHLINK ACCOUNT
                        </span>
                    <h2>
                        Your assistance dashboard
                        </h2>
                    <p>
                        Keep track of your mechanical assistance requests in one place
                    </p>
   
                </div>

                <div className="dashboard-stats">

                    <div className="stat-card">
                        <span>
                            Total Requests
                            </span>
                        <h3>{totalRequests}</h3>
                    </div>

                    <div className="stat-card">
                        <span>
                            Pending Requests
                        </span>
                        <h3>{pendingRequests}</h3>
                    </div>

                    <div className="stat-card">
                        <span>
                            Completed Requests
                        </span>
                        <h3>{completedRequests}</h3>
                    </div>

                </div>

               
                <div className="request-history">
                    <div className="history-heading">
                        <h3>
                            Recent Requests
                        </h3>
                        <p>
                            Your submitted assistance requests
                        </p>
                    </div>

                    <div className="customer-request-list">

                        {requests.length === 0 ? (
                            <div className="empty-requests">
                                <h4>
                                    No requests yet
                                </h4>
                                <p>
                                    Your mechanical assistance requests will appear here
                                </p>
                            </div>
                        ) : (
                            requests.slice().reverse().map(request => (
                                <div className="customer-request-card" key={request.id}>

                                    <div className="customer-request-top">
                                        <h4>
                                            {request.machineryType} Assistance
                                            </h4>

                                        <span className={`request-status ${
                                            request.status === "Completed" ? "completed" : ""
                                        }`}>
                                            {request.status}
                                        </span>
                                    </div>

                                    <p>
                                        Location: {request.customerLocation}
                                        </p>
                                    <p>
                                        Problem: {request.problemDescription}
                                    </p>
                                    <p>
                                        Submitted: {request.dateSubmitted}
                                    </p>

                                    <div className="request-actions">

                                        {request.status === "Pending" && (
                                            <>
                                                <button
                                                    className="complete-request-button"
                                                    onClick={() => handleComplete(request.id)}
                                                >
                                                    Mark as Completed
                                                </button>

                                                <button
                                                    className="cancel-request-button"
                                                    onClick={() => handleCancel(request.id)}
                                                >
                                                    Cancel Request
                                                </button>
                                            </>
                                        )}

                                    </div>

                                </div>
                            ))
                        )}

                    </div>
                </div>


            </div>
        </section>

    );
}

export default CustomerRequests;
