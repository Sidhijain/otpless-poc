let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS Callback
    const callback = (response) => {

        console.log("========== OTPLESS CALLBACK ==========");
        console.log(response);
        console.log("Response Type:", response.responseType);

        // Uncomment this while debugging on mobile
        // alert(JSON.stringify(response, null, 2));

        switch (response.responseType) {

            case "SUCCESS":

                console.log("✅ Authentication Successful");
                console.log("Token:", response.token);

                // Save token if required
                sessionStorage.setItem("otplessToken", response.token);

                // Redirect to success page
                window.location.href = "success.html";
                break;

            case "FAILED":

                console.error("❌ Authentication Failed");
                console.error(response);

                alert("Authentication Failed");
                break;

            default:

                console.log("ℹ️ Intermediate Callback");
                console.log(response);
                break;
        }
    };

    // Initialize OTPLESS SDK
    OTPlessSignin = new OTPless(callback);

    console.log("OTPLESS SDK Ready");

    // Button Click Event
    const verifyBtn = document.getElementById("verifyBtn");

    verifyBtn.addEventListener("click", phoneAuth);

});

// Function to start authentication
function phoneAuth() {

    const phoneInput = document.getElementById("mobileNumber");
    const phone = phoneInput.value.trim();

    if (!phone) {
        alert("Please enter a mobile number.");
        phoneInput.focus();
        return;
    }

    if (!/^\d{10}$/.test(phone)) {
        alert("Please enter a valid 10-digit mobile number.");
        phoneInput.focus();
        return;
    }

    console.log("Starting authentication for:", phone);

    OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phone,
        countryCode: "+91"
    });

}