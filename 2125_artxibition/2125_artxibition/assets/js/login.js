document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-box.login");
  const registerForm = document.querySelector(".form-box.register");
  const guestForm = document.querySelector(".form-box.guest");

  const loginLinks = document.querySelectorAll(".login-link");
  const registerLinks = document.querySelectorAll(".register-link");
  const guestLinks = document.querySelectorAll(".guest-link");

  // Başlangıç durumu
  loginForm.classList.add("active");
  registerForm.classList.add("exit-left");
  guestForm.classList.add("exit-left");

  // Register’a geçiş
  registerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("active");
      guestForm.classList.remove("active");

      loginForm.classList.add("exit-left");
      guestForm.classList.add("exit-left");

      registerForm.classList.remove("exit-left");
      registerForm.classList.add("active");
    });
  });

  // Login’e geçiş
  loginLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      registerForm.classList.remove("active");
      guestForm.classList.remove("active");

      registerForm.classList.add("exit-left");
      guestForm.classList.add("exit-left");

      loginForm.classList.remove("exit-left");
      loginForm.classList.add("active");
    });
  });

  // Guest formuna geçiş
  guestLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      loginForm.classList.remove("active");
      registerForm.classList.remove("active");

      loginForm.classList.add("exit-left");
      registerForm.classList.add("exit-left");

      guestForm.classList.remove("exit-left");
      guestForm.classList.add("active");
    });
  });
});
