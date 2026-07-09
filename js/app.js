let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS callback
    const callback = (response) => {

        console.log("========== OTPLESS CALLBACK ==========");
        console.log(response);

        // Uncomment for debugging
        // alert(JSON.stringify(response, null, 2));

        if (response.responseType === "SUCCESS") {

            console.log("Authentication Successful");
            console.log(response);

            sessionStorage.setItem(
                "otplessResponse",
                JSON.stringify(response)
            );

            window.location.href = "success.html";
        }

        if (response.responseType === "FAILED") {

            console.error("Authentication Failed");
            console.error(response);

            alert("Authentication Failed");
        }
    };

    // Initialize SDK
    OTPlessSignin = new OTPless(callback);

    console.log("OTPLESS SDK Ready");

    // Send OTP
    document
        .getElementById("verifyBtn")
        .addEventListener("click", phoneAuth);

    // Verify OTP
    document
        .getElementById("verifyOtpBtn")
        .addEventListener("click", verifyOTP);

});


// Send OTP
async function phoneAuth() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    if (!phone) {
        alert("Please enter mobile number");
        return;
    }

    try {

        console.log("Sending OTP...");

        const result = await OTPlessSignin.initiate({
            channel: "PHONE",
            phone: phone,
            countryCode: "+91"
        });

        console.log("Initiate Result");
        console.log(result);

        if (result.success) {

            alert("OTP Sent Successfully");

            document
                .getElementById("otpSection")
                .style.display = "block";

        } else {

            alert(
                result?.response?.errorMessage ||
                "Unable to send OTP"
            );

        }

    } catch (error) {

        console.error(error);
        alert("Error while sending OTP");

    }

}


// Verify OTP
async function verifyOTP() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    const otp = document
        .getElementById("otpInput")
        .value
        .trim();

    if (!otp) {
        alert("Please enter OTP");
        return;
    }

    try {

        console.log("Verifying OTP...");

        const result = await OTPlessSignin.verify({
            channel: "PHONE",
            phone: phone,
            otp: otp,
            countryCode: "+91"
        });

        console.log("Verify Result");
        console.log(result);

        if (result.success) {

            alert("OTP Verified Successfully");

            window.location.href = "success.html";

        } else {

            alert(
                result?.response?.errorMessage ||
                "Invalid OTP"
            );

        }

    } catch (error) {

        console.error(error);
        alert("Error while verifying OTP");

    }

}