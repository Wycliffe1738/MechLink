



function displayAdminDashboard() {
    const registeredMechanics = JSON.parse(
        localStorage.getItem("mechLinkMechanics") || "[]"
    );

    document.getElementById("adminTotalMechanics").textContent =
        registeredMechanics.length;

    document.getElementById("adminPendingMechanics").textContent =
        registeredMechanics.filter(mechanic => mechanic.status === "Pending").length;

    document.getElementById("adminApprovedMechanics").textContent =
        registeredMechanics.filter(mechanic => mechanic.status === "Approved").length;

    document.getElementById("adminRejectedMechanics").textContent =
        registeredMechanics.filter(mechanic => mechanic.status === "Rejected").length;

    const adminMechanicList = document.getElementById("adminMechanicList");

    adminMechanicList.innerHTML = "";

    if (registeredMechanics.length === 0) {
        adminMechanicList.innerHTML = `
            <div class="admin-empty">
                <h4>No mechanic applications yet</h4>
                <p>New mechanic registrations will appear here</p>
            </div>
        `;
        return;
    }

    registeredMechanics.slice().reverse().forEach(mechanic => {
        const card = document.createElement("div");
        card.className = "admin-mechanic-card";

        const heading = document.createElement("h4");
        heading.textContent = mechanic.name;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + mechanic.phone;

        const location = document.createElement("p");
        location.textContent = "Location: " + mechanic.location;

        const specialty = document.createElement("p");
        specialty.textContent = "Specialization: " + mechanic.specialty;

        const experience = document.createElement("p");
        experience.textContent = "Experience: " + mechanic.experience + " years";

        const description = document.createElement("p");
        description.textContent = mechanic.description;

        const status = document.createElement("span");
        status.className = "admin-status";

        if (mechanic.status === "Approved") {
            status.classList.add("approved");
        }

        if (mechanic.status === "Rejected") {
            status.classList.add("rejected");
        }

        status.textContent = mechanic.status;

        card.appendChild(heading);
        card.appendChild(phone);
        card.appendChild(location);
        card.appendChild(specialty);
        card.appendChild(experience);
        card.appendChild(description);
        card.appendChild(status);

        const actions = document.createElement("div");
        actions.className = "admin-actions";

        if (mechanic.status === "Pending") {
            const approveButton = document.createElement("button");
            approveButton.textContent = "Approve";
            approveButton.className = "admin-approve-button";
            approveButton.dataset.mechanicId = mechanic.id;

            const rejectButton = document.createElement("button");
            rejectButton.textContent = "Reject";
            rejectButton.className = "admin-reject-button";
            rejectButton.dataset.mechanicId = mechanic.id;

            actions.appendChild(approveButton);
            actions.appendChild(rejectButton);
        }

        card.appendChild(actions);
        adminMechanicList.appendChild(card);
    });
}

const adminMechanicList = document.getElementById("adminMechanicList");

adminMechanicList.addEventListener("click", function (event) {
    const mechanicId = event.target.dataset.mechanicId;

    if (!mechanicId) {
        return;
    }

    const registeredMechanics = JSON.parse(
        localStorage.getItem("mechLinkMechanics") || "[]"
    );

    const selectedMechanic = registeredMechanics.find(
        mechanic => String(mechanic.id) === mechanicId
    );

    if (!selectedMechanic || selectedMechanic.status !== "Pending") {
        return;
    }

    if (event.target.classList.contains("admin-approve-button")) {
        selectedMechanic.status = "Approved";
    }

    if (event.target.classList.contains("admin-reject-button")) {
        selectedMechanic.status = "Rejected";
    }

    localStorage.setItem(
        "mechLinkMechanics",
        JSON.stringify(registeredMechanics)
    );

    displayAdminDashboard();
});

displayAdminDashboard();




function displayAdminBookings() {
    const savedBookings = JSON.parse(
        localStorage.getItem("mechLinkBookings") || "[]"
    );

    document.getElementById("totalBookings").textContent =
        savedBookings.length;

    document.getElementById("pendingBookings").textContent =
        savedBookings.filter(booking => booking.status === "Pending").length;

    document.getElementById("confirmedBookings").textContent =
        savedBookings.filter(booking => booking.status === "Confirmed").length;

    document.getElementById("cancelledBookings").textContent =
        savedBookings.filter(booking => booking.status === "Cancelled").length;

    const adminBookingList = document.getElementById("adminBookingList");

    adminBookingList.innerHTML = "";

    if (savedBookings.length === 0) {
        adminBookingList.innerHTML = `
            <div class="empty-bookings">
                <h4>No bookings yet</h4>
                <p>Customer booking requests will appear here</p>
            </div>
        `;
        return;
    }

    savedBookings.slice().reverse().forEach(booking => {
        const card = document.createElement("div");
        card.className = "admin-booking-card";

        const heading = document.createElement("h4");
        heading.textContent = "Booking with " + booking.mechanicName;

        const customer = document.createElement("p");
        customer.textContent = "Customer: " + booking.customerName;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + booking.customerPhone;

        const date = document.createElement("p");
        date.textContent = "Preferred date: " + booking.date;

        const time = document.createElement("p");
        time.textContent = "Preferred time: " + booking.time;

        const location = document.createElement("p");
        location.textContent = "Location: " + booking.location;

        const problem = document.createElement("p");
        problem.textContent = "Problem: " + booking.problem;

        const status = document.createElement("span");
        status.className = "booking-management-status";

        if (booking.status === "Confirmed") {
            status.classList.add("confirmed");
        }

        if (booking.status === "Cancelled") {
            status.classList.add("cancelled");
        }

        status.textContent = booking.status;

        card.appendChild(heading);
        card.appendChild(customer);
        card.appendChild(phone);
        card.appendChild(date);
        card.appendChild(time);
        card.appendChild(location);
        card.appendChild(problem);
        card.appendChild(status);

        const actions = document.createElement("div");
        actions.className = "booking-management-actions";

        if (booking.status === "Pending") {
            const confirmButton = document.createElement("button");
            confirmButton.textContent = "Confirm Booking";
            confirmButton.className = "confirm-booking-button";
            confirmButton.dataset.bookingId = booking.id;

            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancel Booking";
            cancelButton.className = "cancel-booking-button";
            cancelButton.dataset.bookingId = booking.id;

            actions.appendChild(confirmButton);
            actions.appendChild(cancelButton);
        }

        card.appendChild(actions);
        adminBookingList.appendChild(card);
    });
}

const adminBookingList = document.getElementById("adminBookingList");

adminBookingList.addEventListener("click", function (event) {
    const bookingId = event.target.dataset.bookingId;

    if (!bookingId) {
        return;
    }

    const savedBookings = JSON.parse(
        localStorage.getItem("mechLinkBookings") || "[]"
    );

    const selectedBooking = savedBookings.find(
        booking => String(booking.id) === bookingId
    );

    if (!selectedBooking || selectedBooking.status !== "Pending") {
        return;
    }

    if (event.target.classList.contains("confirm-booking-button")) {
        selectedBooking.status = "Confirmed";
    }

    if (event.target.classList.contains("cancel-booking-button")) {
        selectedBooking.status = "Cancelled";
    }

const newNotification = {
    id: Date.now(),
    customerPhone: selectedBooking.customerPhone,
    title: selectedBooking.status === "Confirmed"
        ? "Booking Confirmed"
        : "Booking Cancelled",
    message: `Your booking with ${selectedBooking.mechanicName}
    
    for ${selectedBooking.date} at ${selectedBooking.time} 
    has been ${selectedBooking.status.toLowerCase()}`,
    
    
    date: new Date().toLocaleString()
};

const savedNotifications = JSON.parse(
    localStorage.getItem("mechLinkNotifications") || "[]"
);

savedNotifications.push(newNotification);

localStorage.setItem(
    "mechLinkNotifications",
    JSON.stringify(savedNotifications)
);

    localStorage.setItem(
        "mechLinkBookings",
        JSON.stringify(savedBookings)
    );

    displayAdminBookings();
});

displayAdminBookings();


