let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS callback
    const callback = async (event) => {

        showDebug(event.responseType, event);
        console.log(event);
    
        switch (event.responseType) {
    
            case "OTP_AUTO_READ":
    
                const otp = event.response?.otp;
    
                alert("OTP AUTO READ : " + otp);
    
                break;
    
            case "VERIFY":
    
                alert("VERIFY");
                break;
    
            case "ONETAP":
    
                alert("SUCCESS");
    
                window.location.href = "success.html";
    
                break;
    
            case "FAILED":
    
                alert(JSON.stringify(event.response));
                break;
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
        showDebug("Initiate Result", result);

        alert(result.responseType);
        console.log("Initiate Result");
        console.log(result);

        if (result.success) {

            alert("OTP Sent Successfully");

          

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

    const otp = 5

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
function showDebug(title, data = "") {

    const debugBox = document.getElementById("debugBox");

    debugBox.innerHTML =
        "<h3>" + title + "</h3><pre>" +
        (typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2)) +
        "</pre>";
}
