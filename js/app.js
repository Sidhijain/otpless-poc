let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS Callback
    const callback = (response) => {

        console.log("========== OTPLESS CALLBACK ==========");
        console.log(response);
        console.log("Response Type:", response.responseType);

        // Uncomment this while debugging on mobile
        alert(JSON.stringify(response, null, 2));

       
    };

    // Initialize OTPLESS SDK
    OTPlessSignin = new OTPless(callback);

    console.log("OTPLESS SDK Ready");

    // Button Click Event
    const verifyBtn = document.getElementById("verifyBtn");

    verifyBtn.addEventListener("click", phoneAuth);
    document
    .getElementById("sendOtpBtn")
    .addEventListener("click", phoneAuth);

document
    .getElementById("verifyOtpBtn")
    .addEventListener("click", verifyOTP);

});

// Function to start authentication
function phoneAuth() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phone,
        countryCode: "+91"
    });

    // Show OTP section
    document.getElementById("otpSection").style.display = "block";
}
function verifyOTP() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    const otp = document
        .getElementById("otpInput")
        .value
        .trim();

    OTPlessSignin.verify({
        channel: "PHONE",
        phone: phone,
        otp: otp,
        countryCode: "+91"
    });
}
