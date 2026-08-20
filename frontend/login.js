// =========================================
// LOGIN FORM
// =========================================

const loginForm = document.getElementById("loginForm");


loginForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();


    // Get form values
    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;


    // Check email
    if (email === "") {

        alert("Please enter your email address.");

        return;
    }


    // Check password
    if (password === "") {

        alert("Please enter your password.");

        return;
    }


    // Basic password validation
    if (password.length < 6) {

        alert("Password must contain at least 6 characters.");

        return;
    }


    // Temporary login message
    // Later this will communicate with Node.js + MySQL

    alert(
        "Login successful!\n\n" +
        "Email: " + email
    );

});


// =========================================
// FORGOT PASSWORD
// =========================================

const forgotPassword =
    document.getElementById("forgotPassword");


forgotPassword.addEventListener("click", function (event) {

    event.preventDefault();

    alert(
        "Password recovery functionality will be added later."
    );

});