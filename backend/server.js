const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mysql = require("mysql2/promise");

const app = express();

app.use(cors());
app.use(express.json());


// ============================================================
// MYSQL CONNECTION
// ============================================================

const db = mysql.createPool({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "demo2",
    port: Number(process.env.DB_PORT) || 3306,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


// ============================================================
// HOME
// ============================================================

app.get("/", (req, res) => {
    res.send("Railway Reservation Backend is running!");
});


// ============================================================
// TEST DATABASE
// ============================================================

app.get("/api/test", async (req, res) => {

    try {

        const connection = await db.getConnection();

        await connection.query("SELECT 1");

        connection.release();

        res.json({
            success: true,
            message: "Backend and MySQL database connected successfully"
        });

    } catch (error) {

        console.error("Database connection error:", error);

        res.status(500).json({
            success: false,
            message: "Database connection failed",
            error: error.message
        });
    }
});


// ============================================================
// GET TRAINS
// ============================================================

app.get("/api/trains", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM Train"
        );

        res.json(rows);

    } catch (error) {

        console.error("Error loading trains:", error);

        res.status(500).json({
            message: "Unable to load trains",
            error: error.message
        });
    }
});


// ============================================================
// GET STATIONS
// ============================================================

app.get("/api/stations", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM Station"
        );

        res.json(rows);

    } catch (error) {

        console.error("Error loading stations:", error);

        res.status(500).json({
            message: "Unable to load stations",
            error: error.message
        });
    }
});


// ============================================================
// GET PASSENGERS
// ============================================================

app.get("/api/passengers", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM Passenger"
        );

        res.json(rows);

    } catch (error) {

        console.error("Error loading passengers:", error);

        res.status(500).json({
            message: "Unable to load passengers",
            error: error.message
        });
    }
});


// ============================================================
// GET PASSENGER BY ID
// ============================================================

app.get("/api/passengers/:id", async (req, res) => {

    try {

        const passengerId = req.params.id;

        const [rows] = await db.query(
            "SELECT * FROM Passenger WHERE passenger_id = ?",
            [passengerId]
        );

        if (rows.length === 0) {

            return res.status(404).json({
                message: "Passenger not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.error("Error searching passenger:", error);

        res.status(500).json({
            message: "Unable to search passenger",
            error: error.message
        });
    }
});


// ============================================================
// ADD PASSENGER
// ============================================================

app.post("/api/passengers", async (req, res) => {

    try {

        const {
            name,
            age,
            gender,
            phone
        } = req.body;

        if (!name || !age || !gender || !phone) {

            return res.status(400).json({
                message: "All passenger fields are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO Passenger
            (name, age, gender, phone)
            VALUES (?, ?, ?, ?)`,
            [
                name,
                age,
                gender,
                phone
            ]
        );

        res.status(201).json({
            success: true,
            message: "Passenger added successfully",
            passengerId: result.insertId
        });

    } catch (error) {

        console.error("Error adding passenger:", error);

        res.status(500).json({
            message: "Unable to add passenger",
            error: error.message
        });
    }
});


// ============================================================
// GET RESERVATIONS
// ============================================================

app.get("/api/reservations", async (req, res) => {

    try {

        const [rows] = await db.query(
            "SELECT * FROM Reservation"
        );

        res.json(rows);

    } catch (error) {

        console.error("Error loading reservations:", error);

        res.status(500).json({
            message: "Unable to load reservations",
            error: error.message
        });
    }
});


// ============================================================
// BOOK TICKET
// ============================================================

app.post("/api/book", async (req, res) => {

    let connection;

    try {

        const {
            passengerId,
            trainId,
            sourceStation,
            destinationStation,
            journeyDate,
            travelClass
        } = req.body;


        // ----------------------------------------------------
        // VALIDATE INPUT
        // ----------------------------------------------------

        if (
            !passengerId ||
            !trainId ||
            !sourceStation ||
            !destinationStation ||
            !journeyDate ||
            !travelClass
        ) {

            return res.status(400).json({
                message: "All booking fields are required"
            });
        }


        connection = await db.getConnection();

        await connection.beginTransaction();


        // ----------------------------------------------------
        // CHECK PASSENGER
        // ----------------------------------------------------

        const [passenger] = await connection.query(
            "SELECT * FROM Passenger WHERE passenger_id = ?",
            [passengerId]
        );

        if (passenger.length === 0) {

            await connection.rollback();

            return res.status(404).json({
                message: "Passenger not found"
            });
        }


        // ----------------------------------------------------
        // CHECK TRAIN
        // ----------------------------------------------------

        const [train] = await connection.query(
            "SELECT * FROM Train WHERE train_id = ?",
            [trainId]
        );

        if (train.length === 0) {

            await connection.rollback();

            return res.status(404).json({
                message: "Train not found"
            });
        }


        // ----------------------------------------------------
        // INSERT RESERVATION
        // ----------------------------------------------------

        const [result] = await connection.query(

            `INSERT INTO Reservation
            (
                passenger_id,
                train_id,
                source_station,
                destination_station,
                journey_date,
                class
            )
            VALUES (?, ?, ?, ?, ?, ?)`,

            [
                passengerId,
                trainId,
                sourceStation,
                destinationStation,
                journeyDate,
                travelClass
            ]
        );


        await connection.commit();


        res.status(201).json({

            success: true,

            message: "Ticket booked successfully",

            reservationId: result.insertId

        });

    } catch (error) {

        if (connection) {
            await connection.rollback();
        }

        console.error("Error booking ticket:", error);

        res.status(500).json({

            message: "Unable to book ticket",

            error: error.message

        });

    } finally {

        if (connection) {
            connection.release();
        }

    }
});


// ============================================================
// CANCEL TICKET
// ============================================================

app.delete("/api/reservations/:id", async (req, res) => {

    try {

        const reservationId = req.params.id;

        const [result] = await db.query(

            "DELETE FROM Reservation WHERE reservation_id = ?",

            [reservationId]

        );


        if (result.affectedRows === 0) {

            return res.status(404).json({

                message: "Reservation not found"

            });

        }


        res.json({

            success: true,

            message: "Ticket cancelled successfully"

        });

    } catch (error) {

        console.error("Error cancelling ticket:", error);

        res.status(500).json({

            message: "Unable to cancel ticket",

            error: error.message

        });
    }
});


// ============================================================
// SERVER
// ============================================================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});