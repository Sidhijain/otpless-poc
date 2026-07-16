let OTPlessSignin;

const statusBox = () => document.getElementById("status");

function updateStatus(title, data = "") {
  statusBox().innerHTML =
    "<strong>" +
    title +
    "</strong><br><br>" +
    (typeof data === "string"
      ? data
      : JSON.stringify(data, null, 2));
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Loaded");

  const callback = async (eventCallback) => {
    console.log("==================================");
    console.log("OTPLESS CALLBACK RECEIVED");
    console.log(eventCallback);
    console.log("Response Type:", eventCallback.responseType);

    updateStatus(eventCallback.responseType, eventCallback);

    switch (eventCallback.responseType) {
      case "OTP_AUTO_READ":
        console.log("OTP_AUTO_READ EVENT");

        try {
          const otp = eventCallback.response?.otp;
          console.log("OTP:", otp);

          if (!otp) {
            console.log("OTP not found in callback.");
            return;
          }

          const phone = document
            .getElementById("mobileNumber")
            .value.trim();

          console.log("Calling verify()...");

          const result = await OTPlessSignin.verify({
            channel: "PHONE",
            phone,
            countryCode: "+91",
            otp,
          });

          console.log("VERIFY RESULT");
          console.log(result);
        } catch (err) {
          console.error("VERIFY FAILED");
          console.error(err);
        }

        break;

      case "ONETAP":
        console.log("ONETAP RECEIVED");
        console.log(eventCallback);

        alert("Authentication Successful");

        location.href = "success.html";

        break;

      case "FAILED":
        console.log("FAILED");
        console.log(eventCallback);

        alert("FAILED");

        break;

      case "FALLBACK_TRIGGERED":
        console.log("FALLBACK_TRIGGERED");
        console.log(eventCallback);

        alert("Fallback Triggered");

        break;

      default:
        console.log("UNKNOWN EVENT");
        console.log(eventCallback);
    }
  };

  OTPlessSignin = new OTPless(callback);

  console.log("OTPlessSignin");
  console.log(OTPlessSignin);

  document
    .getElementById("verifyBtn")
    .addEventListener("click", initiateAuth);
});

async function initiateAuth() {
  const phone = document.getElementById("mobileNumber").value.trim();

  if (!phone) {
    alert("Enter Mobile Number");
    return;
  }

  console.log("Calling initiate()");

  updateStatus("Initiating Authentication...");

  try {
    const result = await OTPlessSignin.initiate({
      channel: "PHONE",
      phone,
      countryCode: "+91",
    });

    console.log("INITIATE RESULT");
    console.log(result);

    updateStatus("INITIATE", result);
  } catch (error) {
    console.error("INITIATE ERROR");
    console.error(error);

    updateStatus("ERROR", error);
  }
}