// =========================================
// TRAIN SEARCH PAGE
// =========================================


// =========================================
// GET SEARCH DATA FROM URL
// =========================================

const urlParams =
    new URLSearchParams(window.location.search);

const from = urlParams.get("from");
const to = urlParams.get("to");
const date = urlParams.get("date");
const passengers = urlParams.get("passengers");


// =========================================
// DISPLAY SEARCH INFORMATION
// =========================================

const fromStation =
    document.getElementById("fromStation");

const toStation =
    document.getElementById("toStation");

const journeyDate =
    document.getElementById("journeyDate");


if (from) {
    fromStation.textContent = from;
}


if (to) {
    toStation.textContent = to;
}


if (date) {

    const selectedDate = new Date(date);

    const formattedDate =
        selectedDate.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    journeyDate.textContent = formattedDate;
}


// =========================================
// BOOK TRAIN FUNCTION
// =========================================

function bookTrain(trainNumber, trainName) {

    const url =
        "booking.html" +
        "?trainNumber=" + encodeURIComponent(trainNumber) +
        "&trainName=" + encodeURIComponent(trainName) +
        "&from=" + encodeURIComponent(from || "Lucknow") +
        "&to=" + encodeURIComponent(to || "New Delhi") +
        "&date=" + encodeURIComponent(date || "") +
        "&passengers=" + encodeURIComponent(passengers || "1");

    window.location.href = url;
}