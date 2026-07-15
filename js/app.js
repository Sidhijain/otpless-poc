let OTPlessSignin;

const statusBox = () => document.getElementById("status");

function updateStatus(title, data = "") {
  statusBox().innerHTML =
    "<strong>" +
    title +
    "</strong><br><br>" +
    (typeof data === "string" ? data : JSON.stringify(data, null, 2));
}

document.addEventListener("DOMContentLoaded", () => {
  console.log("Inisde evenet listner");
  // const callback = (event) => {
  //   console.log("event",event);
  //   updateStatus(event.responseType || "Callback", event);
  //   if (event.responseType === "ONETAP") {
  //     setTimeout(() => {
  //       location.href = "success.html";
  //     }, 1500);
  //   }
  // };
  const callback = async (eventCallback) => {
    alert("EVENT = " + eventCallback.responseType);

    console.log(eventCallback);

    updateStatus(eventCallback.responseType, eventCallback);

    const EVENTS_MAP = {
      OTP_AUTO_READ: async () => {
        const otp = eventCallback.response?.otp;

        alert("OTP AUTO READ : " + otp);

        const phone = document.getElementById("mobileNumber").value.trim();

        const result = await OTPlessSignin.verify({
          channel: "PHONE",
          phone,
          countryCode: "+91",
          otp,
        });

        console.log(result);
      },

      ONETAP() {
        alert("SUCCESS");

        location.href = "success.html";
      },

      FAILED() {
        alert(JSON.stringify(eventCallback.response));
      },

      FALLBACK_TRIGGERED() {
        alert("FALLBACK");
      },
    };

    if (eventCallback.responseType in EVENTS_MAP) {
      EVENTS_MAP[eventCallback.responseType]();
    }
  };

  OTPlessSignin = new OTPless(callback);

  document.getElementById("verifyBtn").addEventListener("click", initiateAuth);
});

async function initiateAuth() {
  const phone = document.getElementById("mobileNumber").value.trim();
  if (!phone) {
    alert("Enter Mobile Number");
    return;
  }
  updateStatus("Initiating Authentication...");
  try {
    const result = await OTPlessSignin.initiate({
      channel: "PHONE",
      phone,
      countryCode: "+91",
    });
    updateStatus("INITIATE", result);
  } catch (error) {
    console.error(error);

    updateStatus("ERROR", error);
  }
}
