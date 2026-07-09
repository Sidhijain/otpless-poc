let OTPlessSignin;

document.addEventListener("DOMContentLoaded", () => {

    // OTPLESS callback
    const callback = async (event) => {

        console.log("========== OTPLESS CALLBACK ==========");
        console.log(event);
    
        switch (event.responseType) {
    
            case "OTP_AUTO_READ":
    
                console.log("OTP Auto Read");
    
                const otp = event.response?.otp;
    
                if (otp) {
    
                    console.log("Auto OTP:", otp);
    
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
    
                    console.log("Verify Result:", result);
                }
    
                break;
    
            case "ONETAP":
    
                console.log("Authentication Successful");
    
                window.location.href = "success.html";
    
                break;
    
            case "FAILED":
    
                console.error(event.response);
    
                break;
    
            case "FALLBACK_TRIGGERED":
    
                console.log("Fallback Triggered");
    
                break;
    
            default:
    
                console.log(event);
    
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