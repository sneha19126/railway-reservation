const API_URL = "http://localhost:3000";


// ============================================================
// NAVIGATION
// ============================================================

function showSection(sectionId) {

    const section =
        document.getElementById(sectionId);

    if (section) {

        section.scrollIntoView({
            behavior: "smooth"
        });

    }
}


// ============================================================
// TEST BACKEND
// ============================================================

async function testBackend() {

    try {

        const response =
            await fetch(`${API_URL}/api/test`);

        const data =
            await response.json();

        console.log("Backend:", data);

    } catch (error) {

        console.error(
            "Backend connection failed:",
            error
        );

    }
}


// ============================================================
// LOAD TRAINS
// ============================================================

async function loadTrains() {

    const container =
        document.getElementById("trainsContainer");

    try {

        const response =
            await fetch(`${API_URL}/api/trains`);

        if (!response.ok) {

            throw new Error(
                "Unable to load trains"
            );

        }

        const trains =
            await response.json();

        document.getElementById("trainCount")
            .textContent = trains.length;


        if (trains.length === 0) {

            container.innerHTML =
                "<p class='loading'>No trains found.</p>";

            return;

        }


        let html = `

            <table>

                <thead>

                    <tr>

                        <th>
                            Train ID
                        </th>

                        <th>
                            Train Number
                        </th>

                        <th>
                            Train Name
                        </th>

                        <th>
                            Train Type
                        </th>

                    </tr>

                </thead>

                <tbody>

        `;


        trains.forEach(train => {

            html += `

                <tr>

                    <td>
                        ${train.train_id}
                    </td>

                    <td>
                        ${train.train_number}
                    </td>

                    <td>
                        ${train.train_name}
                    </td>

                    <td>
                        ${train.train_type}
                    </td>

                </tr>

            `;

        });


        html += `

                </tbody>

            </table>

        `;


        container.innerHTML = html;


    } catch (error) {

        container.innerHTML = `

            <p class="error">

                Unable to load trains.

            </p>

        `;

        console.error(error);

    }
}


// ============================================================
// FILTER TRAINS
// ============================================================

function filterTrains() {

    const search =
        document
            .getElementById("trainSearch")
            .value
            .toLowerCase();


    const rows =
        document.querySelectorAll(
            "#trainsContainer tbody tr"
        );


    rows.forEach(row => {

        const text =
            row.textContent.toLowerCase();

        row.style.display =
            text.includes(search)
                ? ""
                : "none";

    });
}


// ============================================================
// FORMAT DATABASE COLUMN NAME
// ============================================================

function formatColumnName(column) {

    return column

        .replace(/_/g, " ")

        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );

}


// ============================================================
// LOAD STATIONS
// ============================================================

async function loadStations() {

    const container =
        document.getElementById(
            "stationsContainer"
        );


    try {

        const response =
            await fetch(
                `${API_URL}/api/stations`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load stations"
            );

        }


        const stations =
            await response.json();


        document.getElementById(
            "stationCount"
        ).textContent =
            stations.length;


        if (stations.length === 0) {

            container.innerHTML =
                "<p class='loading'>No stations found.</p>";

            return;

        }


        const columns =
            Object.keys(stations[0]);


        let html = `

            <table>

                <thead>

                    <tr>

        `;


        columns.forEach(column => {

            html += `

                <th>
                    ${formatColumnName(column)}
                </th>

            `;

        });


        html += `

                    </tr>

                </thead>

                <tbody>

        `;


        stations.forEach(station => {

            html += "<tr>";


            columns.forEach(column => {

                html += `

                    <td>
                        ${station[column] ?? "-"}
                    </td>

                `;

            });


            html += "</tr>";

        });


        html += `

                </tbody>

            </table>

        `;


        container.innerHTML = html;


    } catch (error) {

        container.innerHTML = `

            <p class="error">

                Unable to load stations.

            </p>

        `;

        console.error(error);

    }
}


// ============================================================
// LOAD RESERVATIONS
// ============================================================

async function loadReservations() {

    const container =
        document.getElementById(
            "reservationsContainer"
        );


    try {

        const response =
            await fetch(
                `${API_URL}/api/reservations`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load reservations"
            );

        }


        const reservations =
            await response.json();


        document.getElementById(
            "reservationCount"
        ).textContent =
            reservations.length;


        if (reservations.length === 0) {

            container.innerHTML =
                "<p class='loading'>No reservations found.</p>";

            return;

        }


        const columns =
            Object.keys(reservations[0]);


        let html = `

            <table>

                <thead>

                    <tr>

        `;


        columns.forEach(column => {

            html += `

                <th>
                    ${formatColumnName(column)}
                </th>

            `;

        });


        html += `

                <th>
                    Action
                </th>

                    </tr>

                </thead>

                <tbody>

        `;


        reservations.forEach(reservation => {

            html += "<tr>";


            columns.forEach(column => {

                html += `

                    <td>
                        ${reservation[column] ?? "-"}
                    </td>

                `;

            });


            const reservationId =
                reservation.reservation_id;


            html += `

                <td>

                    <button
                        class="cancel-button"
                        onclick="cancelTicket(${reservationId})"
                    >
                        Cancel
                    </button>

                </td>

            `;


            html += "</tr>";

        });


        html += `

                </tbody>

            </table>

        `;


        container.innerHTML = html;


    } catch (error) {

        container.innerHTML = `

            <p class="error">

                Unable to load reservations.

            </p>

        `;

        console.error(error);

    }
}


// ============================================================
// LOAD PASSENGER COUNT
// ============================================================

async function loadPassengerCount() {

    try {

        const response =
            await fetch(
                `${API_URL}/api/passengers`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load passengers"
            );

        }


        const passengers =
            await response.json();


        document.getElementById(
            "passengerCount"
        ).textContent =
            passengers.length;


    } catch (error) {

        document.getElementById(
            "passengerCount"
        ).textContent =
            "--";


        console.error(error);

    }
}


// ============================================================
// ADD PASSENGER
// ============================================================

const passengerForm =
    document.getElementById(
        "passengerForm"
    );


if (passengerForm) {

    passengerForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const data = {

                name:
                    document
                        .getElementById(
                            "passengerName"
                        )
                        .value
                        .trim(),

                age:
                    document
                        .getElementById(
                            "passengerAge"
                        )
                        .value,

                gender:
                    document
                        .getElementById(
                            "passengerGender"
                        )
                        .value,

                phone:
                    document
                        .getElementById(
                            "passengerPhone"
                        )
                        .value
                        .trim()

            };


            const message =
                document.getElementById(
                    "passengerMessage"
                );


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/passengers`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Unable to add passenger"
                    );

                }


                message.innerHTML = `

                    <div class="success">

                        Passenger added successfully!

                        <br>

                        Passenger ID:

                        <strong>
                            ${result.passengerId}
                        </strong>

                    </div>

                `;


                passengerForm.reset();


                loadPassengerCount();


            } catch (error) {

                message.innerHTML = `

                    <div class="error">

                        ${error.message}

                    </div>

                `;

                console.error(error);

            }

        }
    );

}


// ============================================================
// BOOK TICKET
// ============================================================

const bookingForm =
    document.getElementById(
        "bookingForm"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const data = {

                passengerId:
                    document
                        .getElementById(
                            "bookingPassengerId"
                        )
                        .value,

                trainId:
                    document
                        .getElementById(
                            "bookingTrainId"
                        )
                        .value,

                sourceStation:
                    document
                        .getElementById(
                            "sourceStation"
                        )
                        .value
                        .trim(),

                destinationStation:
                    document
                        .getElementById(
                            "destinationStation"
                        )
                        .value
                        .trim(),

                journeyDate:
                    document
                        .getElementById(
                            "journeyDate"
                        )
                        .value,

                travelClass:
                    document
                        .getElementById(
                            "travelClass"
                        )
                        .value

            };


            const message =
                document.getElementById(
                    "bookingMessage"
                );


            try {

                const response =
                    await fetch(
                        `${API_URL}/api/book`,
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(data)

                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Booking failed"
                    );

                }


                message.innerHTML = `

                    <div class="success">

                        Ticket booked successfully!

                        <br>

                        Reservation ID:

                        <strong>
                            ${result.reservationId}
                        </strong>

                    </div>

                `;


                bookingForm.reset();


                loadReservations();


            } catch (error) {

                message.innerHTML = `

                    <div class="error">

                        ${error.message}

                    </div>

                `;


                console.error(
                    "Booking error:",
                    error
                );

            }

        }
    );

}


// ============================================================
// CANCEL TICKET
// ============================================================

async function cancelTicket(reservationId) {

    const confirmCancel =
        confirm(
            `Are you sure you want to cancel reservation ${reservationId}?`
        );


    if (!confirmCancel) {
        return;
    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/reservations/${reservationId}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Cancellation failed"
            );

        }


        alert(
            "Ticket cancelled successfully."
        );


        loadReservations();


    } catch (error) {

        alert(
            error.message
        );


        console.error(
            "Cancellation error:",
            error
        );

    }
}


// ============================================================
// SEARCH PASSENGER
// ============================================================

async function searchPassenger() {

    const id =
        document
            .getElementById(
                "searchPassengerId"
            )
            .value;


    const resultBox =
        document.getElementById(
            "passengerResult"
        );


    if (!id) {

        resultBox.innerHTML = `

            <div class="error">

                Please enter a passenger ID.

            </div>

        `;

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/api/passengers/${id}`
            );


        const passenger =
            await response.json();


        if (!response.ok) {

            throw new Error(
                passenger.message ||
                "Passenger not found"
            );

        }


        const columns =
            Object.keys(passenger);


        let html = `

            <div class="card">

                <h3>
                    Passenger Details
                </h3>

        `;


        columns.forEach(column => {

            html += `

                <p>

                    <strong>
                        ${formatColumnName(column)}:
                    </strong>

                    ${passenger[column] ?? "-"}

                </p>

            `;

        });


        html += "</div>";


        resultBox.innerHTML = html;


    } catch (error) {

        resultBox.innerHTML = `

            <div class="error">

                ${error.message}

            </div>

        `;


        console.error(error);

    }
}


// ============================================================
// INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        testBackend();

        loadTrains();

        loadStations();

        loadReservations();

        loadPassengerCount();

    }
);