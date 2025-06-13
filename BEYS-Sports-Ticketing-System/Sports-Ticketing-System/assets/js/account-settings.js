document
  .getElementById("password-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const current = document.getElementById("current-password").value;
    const newPass = document.getElementById("new-password").value;
    const confirm = document.getElementById("confirm-password").value;
    const msg = document.getElementById("message");

    if (newPass !== confirm) {
      msg.style.color = "red";
      msg.textContent = "New passwords do not match.";
      return;
    }

    if (newPass.length < 6) {
      msg.style.color = "red";
      msg.textContent = "Password must be at least 6 characters.";
      return;
    }

    // Simulated backend check
    if (current !== "123456") {
      msg.style.color = "red";
      msg.textContent = "Current password is incorrect.";
      return;
    }

    // Success simulation
    msg.style.color = "green";
    msg.textContent = "Password successfully updated!";
  });
