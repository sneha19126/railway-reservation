// =========================================
// CONFIRMATION PAGE
// =========================================


// =========================================
// GET BOOKING DATA
// =========================================

const urlParams =
    new URLSearchParams(window.location.search);


const pnr =
    urlParams.get("pnr");

const name =
    urlParams.get("name");

const trainNumber =
    urlParams.get("trainNumber");

const trainName =
    urlParams.get("trainName");

const from =
    urlParams.get("from");

const to =
    urlParams.get("to");

const date =
    urlParams.get("date");

const passengers =
    urlParams.get("passengers");

const travelClass =
    urlParams.get("class");


// =========================================
// DISPLAY DATA
// =========================================

document.getElementById("pnrNumber")
    .textContent = pnr || "RR000000";


document.getElementById("passengerName")
    .textContent = name || "--";


document.getElementById("trainName")
    .textContent = trainName || "--";


document.getElementById("trainNumber")
    .textContent = trainNumber || "--";


document.getElementById("fromStation")
    .textContent = from || "--";


document.getElementById("toStation")
    .textContent = to || "--";


document.getElementById("passengers")
    .textContent = passengers || "1";


document.getElementById("travelClass")
    .textContent = travelClass || "--";


// =========================================
// FORMAT DATE
// =========================================

if (date) {

    const selectedDate =
        new Date(date);

    const formattedDate =
        selectedDate.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

    document.getElementById("journeyDate")
        .textContent = formattedDate;

}