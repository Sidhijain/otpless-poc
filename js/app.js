// let OTPlessSignin;

// const statusBox = () => document.getElementById("status");

// function updateStatus(title, data = "") {
//   statusBox().innerHTML =
//     "<strong>" +
//     title +
//     "</strong><br><br>" +
//     (typeof data === "string" ? data : JSON.stringify(data, null, 2));
// }

// document.addEventListener("DOMContentLoaded", () => {
//   console.log("Inisde evenet listner");
//   // const callback = (event) => {
//   //   console.log("event",event);
//   //   updateStatus(event.responseType || "Callback", event);
//   //   if (event.responseType === "ONETAP") {
//   //     setTimeout(() => {
//   //       location.href = "success.html";
//   //     }, 1500);
//   //   }
//   // };
//   const callback = async (eventCallback) => {
//     alert("EVENT = " + eventCallback.responseType);

//     console.log(eventCallback);

//     updateStatus(eventCallback.responseType, eventCallback);

//     const EVENTS_MAP = {
//       OTP_AUTO_READ: async () => {
//         const otp = eventCallback.response?.otp;

//         alert("OTP AUTO READ : " + otp);

//         const phone = document.getElementById("mobileNumber").value.trim();

//         const result = await OTPlessSignin.verify({
//           channel: "PHONE",
//           phone,
//           countryCode: "+91",
//           otp,
//         });

//         console.log(result);
//       },

//       ONETAP() {
//         alert("SUCCESS");

//         location.href = "success.html";
//       },

//       FAILED() {
//         alert(JSON.stringify(eventCallback.response));
//       },

//       FALLBACK_TRIGGERED() {
//         alert("FALLBACK");
//       },
//     };

//     if (eventCallback.responseType in EVENTS_MAP) {
//       EVENTS_MAP[eventCallback.responseType]();
//     }
//   };

//   OTPlessSignin = new OTPless(callback);
//   console.log("OTPlessSignin =", OTPlessSignin);
// console.dir(OTPlessSignin);

// console.log("window.otpless =", window.otpless);
// console.dir(window.otpless);

//   document.getElementById("verifyBtn").addEventListener("click", initiateAuth);
// });

// async function initiateAuth() {
//   const phone = document.getElementById("mobileNumber").value.trim();
//   if (!phone) {
//     alert("Enter Mobile Number");
//     return;
//   }
//   updateStatus("Initiating Authentication...");
//   try {
//     const result = await OTPlessSignin.initiate({
//       channel: "PHONE",
//       phone,
//       countryCode: "+91",
//     });
//     updateStatus("INITIATE", result);
//   } catch (error) {
//     console.error(error);

//     updateStatus("ERROR", error);
//   }
// }
// const OTP_AUTO_READ = () => {
//   const {
//       response: {
//           otp
//       }
//   } = eventCallback;
//   try{
//       $("#verifyBtn").val(otp.toString());
//       // expAopLoginOTPSubmission(true);
//   }
//   catch (error) {
//       console.error("An error occurred while auto-filling OTP:", error);
//   }
// }

let OTPlessSignin;

const status = document.getElementById("status");

function show(data) {

    status.textContent =
        typeof data === "string"
            ? data
            : JSON.stringify(data, null, 2);

}

document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("message", (e) => {
    alert("messgae recived");
    console.log("========== WINDOW MESSAGE ==========");
    console.log("Origin:", e.origin);
    console.log("Data:", e.data);
});
    const callback = (eventCallback) => {

        console.log("CALLBACK");

        console.log(eventCallback);

        show(eventCallback);

        const EVENTS_MAP = {

            ONETAP,

            OTP_AUTO_READ,

            FAILED,

            FALLBACK_TRIGGERED,

            VERIFY

        };

        if ("responseType" in eventCallback) {

            EVENTS_MAP[eventCallback.responseType]?.();

        }

        function ONETAP() {

            alert("Authentication Success");

            window.location.href = "success.html";

        }

        async function OTP_AUTO_READ() {

            alert("OTP AUTO READ");

            const otp = eventCallback.response?.otp;

            alert("OTP : " + otp);

            document.getElementById("otpInput").value = otp;

            const phone = document
                .getElementById("mobileNumber")
                .value
                .trim();

            const result = await OTPlessSignin.verify({

                channel: "PHONE",

                phone,

                countryCode: "+91",

                otp

            });

            console.log(result);

            show(result);

        }

        function VERIFY() {

            alert("VERIFY EVENT");

        }

        function FAILED() {

            alert("FAILED");

            console.log(eventCallback);

        }

        function FALLBACK_TRIGGERED() {

            alert("FALLBACK");

            document
                .getElementById("otpContainer")
                .style.display = "block";

        }

    };

    OTPlessSignin = new OTPless(callback);

    console.log("SDK Ready");

    document
        .getElementById("verifyBtn")
        .addEventListener("click", sendOTP);

    document
        .getElementById("verifyOtpBtn")
        .addEventListener("click", verifyOTP);

});

async function sendOTP() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

        const result = await OTPlessSignin.initiateWithFeedback({
          channel: "PHONE",
          phone,
          countryCode: "+91"
      });
      
      console.log(result);
      console.log(JSON.stringify(result, null, 2));

    show(result);

}

async function verifyOTP() {

    const phone = document
        .getElementById("mobileNumber")
        .value
        .trim();

    const otp = document
        .getElementById("otpInput")
        .value
        .trim();

    const result = await OTPlessSignin.verify({

        channel: "PHONE",

        phone,

        countryCode: "+91",

        otp

    });

    console.log(result);

    show(result);

}