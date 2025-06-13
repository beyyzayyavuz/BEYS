// Sayfa yüklendiğinde tüm formların ve butonların DOM'dan alınması
document.addEventListener("DOMContentLoaded", function () {
  // Her form tipi için ilgili kutuları seçiyoruz
  const loginForm = document.querySelector(".form-box.login");
  const registerForm = document.querySelector(".form-box.register");
  const guestForm = document.querySelector(".form-box.guest");
  // Geçiş butonları: Login, Register ve Guest için ayrı ayrı linkler alınıyor
  const loginLinks = document.querySelectorAll(".login-link");
  const registerLinks = document.querySelectorAll(".register-link");
  const guestLinks = document.querySelectorAll(".guest-link");

  // Sayfa ilk açıldığında login formu aktif olarak gösterilir
  // Başlangıç durumu
  loginForm.classList.add("active");
  registerForm.classList.add("exit-left");
  guestForm.classList.add("exit-left");
  // Kullanıcı Register butonuna tıklarsa
  // Register’a geçiş
  registerLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Diğer formların aktifliği kaldırılır
      loginForm.classList.remove("active");
      guestForm.classList.remove("active");

      // Diğer formlar dışarı kaydırılır
      loginForm.classList.add("exit-left");
      guestForm.classList.add("exit-left");

      // Register formu görünür hale getirilir
      registerForm.classList.remove("exit-left");
      registerForm.classList.add("active");
    });
  });

  // Kullanıcı Login linkine tıklarsa
  loginLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // Diğer formların görünürlüğü kapatılır
      registerForm.classList.remove("active");
      guestForm.classList.remove("active");

      registerForm.classList.add("exit-left");
      guestForm.classList.add("exit-left");

      loginForm.classList.remove("exit-left");
      loginForm.classList.add("active");
    });
  });

  // Kullanıcı Guest olarak devam etmek isterse
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

// Form gönderim işlemleri ve yönlendirme kısmı
// Form submit'leri için ortak yönlendirme
// Her formun içindeki <form> elementleri alınır
const loginFormEl = document.querySelector(".form-box.login form");
const registerFormEl = document.querySelector(".form-box.register form");
const guestFormEl = document.querySelector(".form-box.guest form");
// Girişten sonra hangi sayfaya gidileceğini kontrol eder
function handleRedirectAfterLogin() {
  const redirect =
    sessionStorage.getItem("redirectAfterLogin") ||
    "index-after-logged-in.html";
  window.location.href = redirect;
}
// Girişten sonra hangi sayfaya gidileceğini kontrol eder
if (loginFormEl) {
  loginFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "true");
    handleRedirectAfterLogin();
  });
}
// Register formu gönderildiğinde
if (registerFormEl) {
  registerFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "true");
    handleRedirectAfterLogin();
  });
}
// Guest formu gönderildiğinde
if (guestFormEl) {
  guestFormEl.addEventListener("submit", function (e) {
    e.preventDefault();
    sessionStorage.setItem("isLoggedIn", "guest");
    handleRedirectAfterLogin();
  });
}
