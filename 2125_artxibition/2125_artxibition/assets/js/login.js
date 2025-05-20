document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".form-box.login");
  const registerForm = document.querySelector(".form-box.register");
  const loginLink = document.querySelector(".login-link");
  const registerLink = document.querySelector(".register-link");

  // Başlangıç durumu
  loginForm.classList.add("active");
  registerForm.classList.add("exit-left");

  // Register’a tıklanırsa geçiş yap
  registerLink.addEventListener("click", function (e) {
    e.preventDefault();
    loginForm.classList.remove("active");
    loginForm.classList.add("exit-left");

    registerForm.classList.remove("exit-left");
    registerForm.classList.add("active");
  });

  // Login’e tıklanırsa geri geçiş yap
  loginLink.addEventListener("click", function (e) {
    e.preventDefault();
    registerForm.classList.remove("active");
    registerForm.classList.add("exit-left");

    loginForm.classList.remove("exit-left");
    loginForm.classList.add("active");
  });
});
