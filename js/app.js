let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

   const callback = (response) => {
    console.log("===== OTPLESS CALLBACK =====");
    console.log(response);

    switch (response.responseType) {
        case "SUCCESS":
            console.log("Authentication successful");
            console.log("Token:", response.token);
            break;

        case "FAILED":
            console.log("Authentication failed");
            console.log(response);
            break;

        default:
            console.log("Response Type:", response.responseType);
            break;
    }
};

    OTPlessSignin = new OTPless(callback);

    console.log("OTPLESS SDK Ready");

    const verifyBtn = document.getElementById("verifyBtn");

    verifyBtn.addEventListener("click", phoneAuth);

});

function phoneAuth() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    if (!phone) {
        alert("Enter mobile number");
        return;
    }

    console.log("Starting authentication for:", phone);

    OTPlessSignin.initiate({
        channel: "PHONE",
        phone: phone,
        countryCode: "+91"
    });

}