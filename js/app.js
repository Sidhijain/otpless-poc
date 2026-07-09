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
  const callback = (event) => {
    console.log(event);

    updateStatus(event.responseType || "Callback", event);

    if (event.responseType === "ONETAP") {
      setTimeout(() => {
        location.href = "success.html";
      }, 1500);
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
