let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS callback
    const callback = async (event) => {

        showDebug("Callback Received", event);
    
        switch (event.responseType) {
    
            case "INITIATE":
    
                showDebug("INITIATE", event);
                break;
    
            case "OTP_AUTO_READ":
    
                showDebug("OTP_AUTO_READ", event);
    
                const otp = event.response?.otp;
    
                if (otp) {
    
                    showDebug("OTP Found", otp);
    
                    const phone = document
                        .getElementById("mobileNumber")
                        .value
                        .trim();
    
                    const result = await OTPlessSignin.verify({
                        channel: "PHONE",
                        phone: phone,
                        countryCode: "+91",
                        otp: otp
                    });
    
                    showDebug("Verify Result", result);
    
                }
    
                break;
    
            case "VERIFY":
    
                showDebug("VERIFY", event);
                break;
    
            case "ONETAP":
    
                showDebug("ONETAP SUCCESS", event);
    
                setTimeout(() => {
                    window.location.href = "success.html";
                }, 3000);
    
                break;
    
            case "FAILED":
    
                showDebug("FAILED", event);
                break;
    
            case "FALLBACK_TRIGGERED":
    
                showDebug("FALLBACK_TRIGGERED", event);
    
                document
                    .getElementById("otpSection")
                    .style.display = "block";
    
                break;
    
            default:
    
                showDebug("UNKNOWN EVENT", event);
    
        }
    
    };
    // Initialize SDK
    alert("Creating OTPLESS instance");

OTPlessSignin = new OTPless((event)=>{

    alert("CALLBACK");

    showDebug("CALLBACK",event);

    console.log(event);

});

alert("OTPLESS Created");

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
