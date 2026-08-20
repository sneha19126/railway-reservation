// =========================================
// RAILWAY RESERVATION SYSTEM
// MAIN JAVASCRIPT
// =========================================


// =========================================
// SEARCH TRAIN FORM
// =========================================

const searchForm = document.querySelector(".search-form");

if (searchForm) {

    searchForm.addEventListener("submit", function (event) {

        // Stop the normal form submission
        event.preventDefault();


        // Get form values
        const from = document
            .getElementById("from")
            .value
            .trim();

        const to = document
            .getElementById("to")
            .value
            .trim();

        const date = document
            .getElementById("date")
            .value;

        const passengers = document
            .getElementById("passengers")
            .value;


        // =========================================
        // VALIDATION
        // =========================================

        if (from === "" || to === "" || date === "") {

            alert("Please fill in all the required fields.");

            return;
        }


        // From and To cannot be same
        if (from.toLowerCase() === to.toLowerCase()) {

            alert(
                "Departure and destination stations cannot be the same."
            );

            return;
        }


        // Check journey date
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const selectedDate = new Date(date);


        if (selectedDate < today) {

            alert("Please select a valid journey date.");

            return;
        }


        // =========================================
        // OPEN TRAIN RESULTS PAGE
        // =========================================

        const url =
            "trains.html" +
            "?from=" + encodeURIComponent(from) +
            "&to=" + encodeURIComponent(to) +
            "&date=" + encodeURIComponent(date) +
            "&passengers=" + encodeURIComponent(passengers);


        window.location.href = url;

    });

}


// =========================================
// SET MINIMUM DATE
// =========================================

const dateInput = document.getElementById("date");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    const currentDate =
        `${year}-${month}-${day}`;

    dateInput.setAttribute("min", currentDate);

}


// =========================================
// HERO BUTTON
// =========================================

const heroButton =
    document.querySelector(".hero-btn");

if (heroButton) {

    heroButton.addEventListener("click", function () {

        console.log(
            "Opening train search section..."
        );

    });

}


// =========================================
// PAGE LOADED
// =========================================

console.log(
    "Railway Reservation System loaded successfully."
);
