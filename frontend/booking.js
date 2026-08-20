// =========================================
// BOOKING PAGE
// =========================================


// =========================================
// GET DATA FROM URL
// =========================================

const urlParams =
    new URLSearchParams(window.location.search);


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


// =========================================
// DISPLAY TRAIN INFORMATION
// =========================================

const trainNameElement =
    document.getElementById("trainName");

const trainNumberElement =
    document.getElementById("trainNumber");

const fromElement =
    document.getElementById("fromStation");

const toElement =
    document.getElementById("toStation");

const dateElement =
    document.getElementById("journeyDate");

const passengerElement =
    document.getElementById("passengerCount");


// Train name
if (trainName) {
    trainNameElement.textContent = trainName;
}


// Train number
if (trainNumber) {
    trainNumberElement.textContent =
        "Train No: " + trainNumber;
}


// From
if (from) {
    fromElement.textContent = from;
}


// To
if (to) {
    toElement.textContent = to;
}


// Passengers
if (passengers) {
    passengerElement.textContent = passengers;
}


// Date
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

    dateElement.textContent =
        formattedDate;
}


// =========================================
// BOOKING FORM
// =========================================

const bookingForm =
    document.getElementById("bookingForm");


bookingForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get passenger information

        const name =
            document
                .getElementById("passengerName")
                .value
                .trim();

        const age =
            document
                .getElementById("age")
                .value;

        const gender =
            document
                .getElementById("gender")
                .value;

        const phone =
            document
                .getElementById("phone")
                .value
                .trim();

        const email =
            document
                .getElementById("email")
                .value
                .trim();

        const travelClass =
            document
                .getElementById("travelClass")
                .value;


        // =========================================
        // VALIDATION
        // =========================================

        if (name === "") {

            alert(
                "Please enter passenger name."
            );

            return;
        }


        if (age < 1 || age > 120) {

            alert(
                "Please enter a valid age."
            );

            return;
        }


        if (gender === "") {

            alert(
                "Please select gender."
            );

            return;
        }


        if (!/^[0-9]{10}$/.test(phone)) {

            alert(
                "Please enter a valid 10-digit phone number."
            );

            return;
        }


        if (email === "") {

            alert(
                "Please enter email address."
            );

            return;
        }


        if (travelClass === "") {

            alert(
                "Please select travel class."
            );

            return;
        }


        // =========================================
        // TEMPORARY BOOKING MESSAGE
        // =========================================

        alert(
            "Passenger details accepted!\n\n" +

            "Passenger: " + name +
            "\nAge: " + age +
            "\nGender: " + gender +
            "\nPhone: " + phone +
            "\nClass: " + travelClass
        );


        /*
            Later we will send this information
            to Node.js and MySQL.

            Example:

            Frontend
                 ↓
            Node.js / Express
                 ↓
               MySQL

            Then we will generate a real
            booking/PNR number.
        */

    }
);