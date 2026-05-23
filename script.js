const inputs = document.querySelectorAll("input"),
  button = document.querySelector("button"),
  warning = document.querySelector(".warning");

const Sound = document.getElementById("Sound");
const Success = document.getElementById("Success");
const Wrong = document.getElementById("Wrong");
function playBeep() {
  if (!Sound) return;
  Sound.currentTime = 0;
  Sound.play().catch(() => {});
}

function playSuccess() {
  if (!Success) return;
  Success.currentTime = 0;
  Success.play().catch(() => {});
}

function playWrong(){
  if (!Wrong) return;
  Wrong.currentTime = 0;
  Wrong.play().catch(() => {});
}

inputs.forEach((input, index1) => {
  input.addEventListener("keyup", (e) => {
    playBeep();
    const currentInput = input,
      nextInput = input.nextElementSibling,
      prevInput = input.previousElementSibling;
    if (currentInput.value.length > 1) {
      currentInput.value = "";
      return;
    }
    if (
      nextInput &&
      nextInput.hasAttribute("disabled") &&
      currentInput.value !== ""
    ) {
      nextInput.removeAttribute("disabled");
      nextInput.focus();
    }
    if (e.key === "Backspace") {
      inputs.forEach((input, index2) => {
        if (index1 <= index2 && prevInput) {
          input.setAttribute("disabled", true);
          input.value = "";
          prevInput.focus();
        }
      });
    }
  });
});

function showWarning() {
  warning.style.display = "block";
  void warning.offsetWidth;
  warning.classList.add("visible");
}

function hideWarning() {
  warning.classList.remove("visible");
  setTimeout(() => {
    if (!warning.classList.contains("visible")) {
      warning.style.display = "none";
    }
  }, 1000);
}

// if the code is correct run this
function success() {
  button.classList.add("success");
  button.textContent = "Success!";
  inputs.forEach((input) => {
    input.classList.add("valid");
    input.style.color = "#fff";
  });
  warning.querySelector("p").textContent = "Password is correct!";
  warning.style.background = "#4caf50";
  playSuccess();
  showWarning();
}
// if the code is incorrect run this
function invalid() {
  inputs.forEach((input) => {
    input.value = "";
    input.setAttribute("disabled", true);
    input.style.display = "flex";
    input.style.justifyContent = "center";
    input.style.alignItems = "center";
    input.style.fontSize = "20px";
    input.style.fontWeight = "bold";
    input.style.textAlign = "center";
    input.style.textTransform = "uppercase";
  });
  inputs[0].removeAttribute("disabled");
  inputs[0].focus();

  button.textContent = "Try Again";
  void button.offsetWidth;
  button.classList.add("denied");

  warning.querySelector("p").textContent =
    "Incorrect password! Please try again.";
  playWrong();
  showWarning();

  setTimeout(() => {
    button.classList.remove("denied");
    button.textContent = "Verify";
    hideWarning();
    setTimeout(() => {
      warning.querySelector("p").textContent = "Please enter the password!";
    }, 400);
  }, 1000);
}
// if the input is empty run this
function reset() {
  showWarning();
  void button.offsetWidth;
  button.classList.add("denied");
  setTimeout(() => {
    hideWarning();
    button.classList.remove("denied");
  }, 1500);
}

function verify() {
  const code = Array.from(inputs)
    .map((i) => i.value)
    .join("");
  const allEmpty = Array.from(inputs).every((i) => i.value === "");
  if (code === "040611") {
    success();
    setTimeout(() => {
      warning.querySelector("p").textContent = "Redirecting...";
    }, 1500);
    setTimeout(() => {
      window.location.href = "#";
    }, 1500);
  } else if (allEmpty) {
    reset();
  } else {
    invalid();
  }
}

window.addEventListener("load", () => {
  inputs[0].focus();
});
