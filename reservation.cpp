#include <iostream>
#include <string>
#include <mysql/jdbc.h>

using namespace std;


// ============================================================
// MYSQL CONNECTION
// ============================================================

sql::Connection* connectDatabase()
{
    try
    {
        cout << "\nConnecting to MySQL..." << endl;

        sql::mysql::MySQL_Driver* driver =
            sql::mysql::get_mysql_driver_instance();

        sql::Connection* con =
            driver->connect(
                "tcp://127.0.0.1:3306",
                "root",
                "9918335774"
            );

        con->setSchema("demo2");

        cout << "MySQL connection successful!" << endl;
        cout << "Database: demo2" << endl;

        return con;
    }
    catch (sql::SQLException& e)
    {
        cout << "\n========================================" << endl;
        cout << "       MYSQL CONNECTION FAILED" << endl;
        cout << "========================================" << endl;

        cout << "Error: " << e.what() << endl;
        cout << "MySQL Error Code: "
             << e.getErrorCode() << endl;
        cout << "SQL State: "
             << e.getSQLState() << endl;

        return nullptr;
    }
}


// ============================================================
// ADD PASSENGER
// ============================================================

void addPassenger(sql::Connection* con)
{
    string name;
    int age;
    string gender;
    string phone;
    string email;

    cout << "\n========== ADD PASSENGER ==========\n";

    cout << "Enter passenger name: ";
    cin.ignore();
    getline(cin, name);

    cout << "Enter age: ";
    cin >> age;

    cout << "Enter gender: ";
    cin >> gender;

    cout << "Enter phone number: ";
    cin >> phone;

    cout << "Enter email: ";
    cin >> email;

    try
    {
        sql::PreparedStatement* pstmt =
            con->prepareStatement(
                "INSERT INTO Passenger "
                "(name, age, gender, phone, email) "
                "VALUES (?, ?, ?, ?, ?)"
            );

        pstmt->setString(1, name);
        pstmt->setInt(2, age);
        pstmt->setString(3, gender);
        pstmt->setString(4, phone);
        pstmt->setString(5, email);

        pstmt->executeUpdate();

        delete pstmt;

        cout << "\nPassenger added successfully!\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nError adding passenger: "
             << e.what() << endl;
        cout << "Error Code: "
             << e.getErrorCode() << endl;
    }
}


// ============================================================
// DISPLAY PASSENGERS
// ============================================================

void displayPassengers(sql::Connection* con)
{
    cout << "\n============================================================\n";
    cout << "                    PASSENGERS\n";
    cout << "============================================================\n";

    try
    {
        cout << "Reading passengers from database...\n";

        sql::Statement* stmt =
            con->createStatement();

        sql::ResultSet* res =
            stmt->executeQuery(
                "SELECT passenger_id, "
                "COALESCE(name,''), "
                "COALESCE(age,0), "
                "COALESCE(gender,''), "
                "COALESCE(phone,''), "
                "COALESCE(email,'') "
                "FROM Passenger "
                "ORDER BY passenger_id"
            );

        bool found = false;

        while (res->next())
        {
            found = true;

            cout << "\n----------------------------------------\n";

            cout << "Passenger ID : "
                 << res->getInt(1) << endl;

            cout << "Name         : "
                 << res->getString(2) << endl;

            cout << "Age          : "
                 << res->getInt(3) << endl;

            cout << "Gender       : "
                 << res->getString(4) << endl;

            cout << "Phone        : "
                 << res->getString(5) << endl;

            cout << "Email        : "
                 << res->getString(6) << endl;
        }

        if (!found)
        {
            cout << "\nNo passengers found.\n";
        }

        delete res;
        delete stmt;

        cout << "\n----------------------------------------\n";
        cout << "Passenger query completed successfully.\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nMYSQL ERROR while displaying passengers!\n";
        cout << "Error: " << e.what() << endl;
        cout << "Code: " << e.getErrorCode() << endl;
        cout << "SQL State: " << e.getSQLState() << endl;
    }
}


// ============================================================
// DISPLAY TRAINS
// ============================================================

void displayTrains(sql::Connection* con)
{
    cout << "\n============================================================\n";
    cout << "                    AVAILABLE TRAINS\n";
    cout << "============================================================\n";

    try
    {
        cout << "Reading trains from database...\n";

        sql::Statement* stmt =
            con->createStatement();

        sql::ResultSet* res =
            stmt->executeQuery(
                "SELECT train_id, "
                "COALESCE(train_number,''), "
                "COALESCE(train_name,''), "
                "COALESCE(train_type,'') "
                "FROM Train "
                "ORDER BY train_id"
            );

        bool found = false;

        while (res->next())
        {
            found = true;

            cout << "\n----------------------------------------\n";

            cout << "Train ID     : "
                 << res->getInt(1) << endl;

            cout << "Train Number : "
                 << res->getString(2) << endl;

            cout << "Train Name   : "
                 << res->getString(3) << endl;

            cout << "Train Type   : "
                 << res->getString(4) << endl;
        }

        if (!found)
        {
            cout << "\nNo trains found.\n";
        }

        delete res;
        delete stmt;

        cout << "\n----------------------------------------\n";
        cout << "Train query completed successfully.\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nMYSQL ERROR while displaying trains!\n";
        cout << "Error: " << e.what() << endl;
        cout << "Code: " << e.getErrorCode() << endl;
        cout << "SQL State: " << e.getSQLState() << endl;
    }
}


// ============================================================
// DISPLAY STATIONS
// ============================================================

void displayStations(sql::Connection* con)
{
    cout << "\n============================================================\n";
    cout << "                     STATIONS\n";
    cout << "============================================================\n";

    try
    {
        cout << "Reading stations from database...\n";

        sql::Statement* stmt =
            con->createStatement();

        sql::ResultSet* res =
            stmt->executeQuery(
                "SELECT station_id, "
                "COALESCE(station_code,''), "
                "COALESCE(station_name,''), "
                "COALESCE(city,''), "
                "COALESCE(state,'') "
                "FROM Station "
                "ORDER BY station_id"
            );

        bool found = false;

        while (res->next())
        {
            found = true;

            cout << "\n----------------------------------------\n";

            cout << "Station ID   : "
                 << res->getInt(1) << endl;

            cout << "Station Code : "
                 << res->getString(2) << endl;

            cout << "Station Name : "
                 << res->getString(3) << endl;

            cout << "City         : "
                 << res->getString(4) << endl;

            cout << "State        : "
                 << res->getString(5) << endl;
        }

        if (!found)
        {
            cout << "\nNo stations found.\n";
        }

        delete res;
        delete stmt;

        cout << "\n----------------------------------------\n";
        cout << "Station query completed successfully.\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nMYSQL ERROR while displaying stations!\n";
        cout << "Error: " << e.what() << endl;
        cout << "Code: " << e.getErrorCode() << endl;
        cout << "SQL State: " << e.getSQLState() << endl;
    }
}


// ============================================================
// BOOK TICKET
// ============================================================

void bookTicket(sql::Connection* con)
{
    int passengerId;
    int trainId;
    int sourceStation;
    int destinationStation;

    string journeyDate;
    string travelClass;
    string seatNumber;

    cout << "\n========== BOOK TICKET ==========\n";

    // Display passengers
    displayPassengers(con);

    cout << "\nEnter Passenger ID: ";
    cin >> passengerId;

    // Display trains
    displayTrains(con);

    cout << "\nEnter Train ID: ";
    cin >> trainId;

    // Display stations
    displayStations(con);

    cout << "\nEnter Source Station ID: ";
    cin >> sourceStation;

    cout << "Enter Destination Station ID: ";
    cin >> destinationStation;

    cout << "\nEnter journey date (YYYY-MM-DD): ";
    cin >> journeyDate;

    cout << "Enter class (Sleeper/AC3/AC2/AC1): ";
    cin >> travelClass;

    cout << "Enter seat number: ";
    cin >> seatNumber;

    try
    {
        sql::PreparedStatement* pstmt =
            con->prepareStatement(
                "INSERT INTO Reservation "
                "(passenger_id, train_id, journey_date, "
                "source_station, destination_station, "
                "`class`, seat_number, status) "
                "VALUES (?, ?, ?, ?, ?, ?, ?, 'CONFIRMED')"
            );

        pstmt->setInt(1, passengerId);
        pstmt->setInt(2, trainId);
        pstmt->setString(3, journeyDate);
        pstmt->setInt(4, sourceStation);
        pstmt->setInt(5, destinationStation);
        pstmt->setString(6, travelClass);
        pstmt->setString(7, seatNumber);

        pstmt->executeUpdate();

        delete pstmt;

        cout << "\n========================================\n";
        cout << "       TICKET BOOKED SUCCESSFULLY\n";
        cout << "========================================\n";

        cout << "Passenger ID : "
             << passengerId << endl;

        cout << "Train ID     : "
             << trainId << endl;

        cout << "Journey Date : "
             << journeyDate << endl;

        cout << "Class        : "
             << travelClass << endl;

        cout << "Seat Number  : "
             << seatNumber << endl;

        cout << "Status       : CONFIRMED\n";

        cout << "========================================\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nError booking ticket: "
             << e.what() << endl;

        cout << "Error Code: "
             << e.getErrorCode() << endl;
    }
}


// ============================================================
// DISPLAY RESERVATIONS
// ============================================================

void displayReservations(sql::Connection* con)
{
    cout << "\n============================================================\n";
    cout << "                    RESERVATIONS\n";
    cout << "============================================================\n";

    try
    {
        sql::Statement* stmt =
            con->createStatement();

        sql::ResultSet* res =
            stmt->executeQuery(
                "SELECT "
                "r.reservation_id, "
                "p.name AS passenger_name, "
                "t.train_number, "
                "t.train_name, "
                "s1.station_name AS source, "
                "s2.station_name AS destination, "
                "r.journey_date, "
                "r.`class`, "
                "r.seat_number, "
                "r.status "
                "FROM Reservation r "
                "JOIN Passenger p "
                "ON r.passenger_id = p.passenger_id "
                "JOIN Train t "
                "ON r.train_id = t.train_id "
                "JOIN Station s1 "
                "ON r.source_station = s1.station_id "
                "JOIN Station s2 "
                "ON r.destination_station = s2.station_id "
                "ORDER BY r.reservation_id"
            );

        bool found = false;

        while (res->next())
        {
            found = true;

            cout << "\n----------------------------------------\n";

            cout << "Reservation ID : "
                 << res->getInt("reservation_id") << endl;

            cout << "Passenger      : "
                 << res->getString("passenger_name") << endl;

            cout << "Train Number   : "
                 << res->getString("train_number") << endl;

            cout << "Train Name     : "
                 << res->getString("train_name") << endl;

            cout << "Source         : "
                 << res->getString("source") << endl;

            cout << "Destination    : "
                 << res->getString("destination") << endl;

            cout << "Journey Date   : "
                 << res->getString("journey_date") << endl;

            cout << "Class          : "
                 << res->getString("class") << endl;

            cout << "Seat Number    : "
                 << res->getString("seat_number") << endl;

            cout << "Status         : "
                 << res->getString("status") << endl;
        }

        if (!found)
        {
            cout << "\nNo reservations found.\n";
        }

        delete res;
        delete stmt;

        cout << "\n----------------------------------------\n";
        cout << "Reservation query completed.\n";
    }
    catch (sql::SQLException& e)
    {
        cout << "\nError displaying reservations: "
             << e.what() << endl;

        cout << "Error Code: "
             << e.getErrorCode() << endl;

        cout << "SQL State: "
             << e.getSQLState() << endl;
    }
}


// ============================================================
// CANCEL TICKET
// ============================================================

void cancelTicket(sql::Connection* con)
{
    int reservationId;

    cout << "\n========== CANCEL TICKET ==========\n";

    cout << "Enter Reservation ID: ";
    cin >> reservationId;

    try
    {
        sql::PreparedStatement* update =
            con->prepareStatement(
                "UPDATE Reservation "
                "SET status = 'CANCELLED' "
                "WHERE reservation_id = ?"
            );

        update->setInt(1, reservationId);

        int affected =
            update->executeUpdate();

        delete update;

        if (affected > 0)
        {
            cout << "\nTicket cancelled successfully!\n";
        }
        else
        {
            cout << "\nReservation not found!\n";
        }
    }
    catch (sql::SQLException& e)
    {
        cout << "\nError cancelling ticket: "
             << e.what() << endl;

        cout << "Error Code: "
             << e.getErrorCode() << endl;
    }
}


// ============================================================
// SEARCH PASSENGER
// ============================================================

void searchPassenger(sql::Connection* con)
{
    int passengerId;

    cout << "\n========== SEARCH PASSENGER ==========\n";

    cout << "Enter Passenger ID: ";
    cin >> passengerId;

    try
    {
        sql::PreparedStatement* pstmt =
            con->prepareStatement(
                "SELECT passenger_id, name, age, "
                "gender, phone, email "
                "FROM Passenger "
                "WHERE passenger_id = ?"
            );

        pstmt->setInt(1, passengerId);

        sql::ResultSet* res =
            pstmt->executeQuery();

        if (res->next())
        {
            cout << "\nPassenger Found!\n";
            cout << "----------------------------------\n";

            cout << "ID     : "
                 << res->getInt("passenger_id")
                 << endl;

            cout << "Name   : "
                 << res->getString("name")
                 << endl;

            cout << "Age    : "
                 << res->getInt("age")
                 << endl;

            cout << "Gender : "
                 << res->getString("gender")
                 << endl;

            cout << "Phone  : "
                 << res->getString("phone")
                 << endl;

            cout << "Email  : "
                 << res->getString("email")
                 << endl;

            cout << "----------------------------------\n";
        }
        else
        {
            cout << "\nPassenger not found!\n";
        }

        delete res;
        delete pstmt;
    }
    catch (sql::SQLException& e)
    {
        cout << "\nError searching passenger: "
             << e.what() << endl;

        cout << "Error Code: "
             << e.getErrorCode() << endl;
    }
}


// ============================================================
// MAIN
// ============================================================

int main()
{
    cout << "\n========================================\n";
    cout << "       RAILWAY RESERVATION SYSTEM\n";
    cout << "========================================\n";

    sql::Connection* con =
        connectDatabase();

    if (con == nullptr)
    {
        cout << "\nProgram stopped because "
             << "database connection failed.\n";

        cout << "\nPress Enter to exit...";
        cin.ignore();
        cin.get();

        return 1;
    }

    int choice;

    do
    {
        cout << "\n\n";
        cout << "========================================\n";
        cout << "       RAILWAY RESERVATION SYSTEM\n";
        cout << "========================================\n";

        cout << "1. Add Passenger\n";
        cout << "2. Display Passengers\n";
        cout << "3. Display Trains\n";
        cout << "4. Book Ticket\n";
        cout << "5. Display Reservations\n";
        cout << "6. Cancel Ticket\n";
        cout << "7. Search Passenger\n";
        cout << "8. Display Stations\n";
        cout << "9. Exit\n";

        cout << "\nEnter your choice: ";
        cin >> choice;

        switch (choice)
        {
            case 1:
                addPassenger(con);
                break;

            case 2:
                displayPassengers(con);
                break;

            case 3:
                displayTrains(con);
                break;

            case 4:
                bookTicket(con);
                break;

            case 5:
                displayReservations(con);
                break;

            case 6:
                cancelTicket(con);
                break;

            case 7:
                searchPassenger(con);
                break;

            case 8:
                displayStations(con);
                break;

            case 9:
                cout << "\nThank you for using "
                     << "Railway Reservation System!\n";
                break;

            default:
                cout << "\nInvalid choice! Try again.\n";
        }

    } while (choice != 9);

    delete con;

    return 0;
}