// =========================================
// REGISTRATION FORM
// =========================================

const registerForm = document.getElementById("registerForm");


registerForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    // Get form values
    const fullName =
        document.getElementById("fullName").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    const terms =
        document.getElementById("terms").checked;


    // =========================================
    // VALIDATION
    // =========================================

    // Check name
    if (fullName === "") {

        alert("Please enter your full name.");

        return;
    }


    // Check email
    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    // Check phone number
    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;
    }


    // Check password length
    if (password.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        return;
    }


    // Check password match
    if (password !== confirmPassword) {

        alert("Passwords do not match.");

        return;
    }


    // Check terms
    if (!terms) {

        alert(
            "Please accept the Terms and Conditions."
        );

        return;
    }


    // =========================================
    // TEMPORARY SUCCESS
    // =========================================

    alert(
        "Registration successful!\n\n" +
        "Welcome, " + fullName + "!"
    );


    // Clear form
    registerForm.reset();


    /*
        IMPORTANT:

        Later we will replace this temporary
        section with a request to our backend:

        Frontend
             ↓
        Node.js + Express
             ↓
        MySQL

        The user's information will then be
        stored permanently in the database.
    */

});