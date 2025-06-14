/**
 * @jest-environment jsdom
 */

const path = require("path");

describe("Login/Register/Guest/Forgot flow", () => {
  beforeEach(() => {
    // HTML simülasyonu
    document.body.innerHTML = `
      <div class="form-box login"><form></form></div>
      <div class="form-box register"><form></form></div>
      <div class="form-box guest"><form></form></div>
      <div class="form-box forgot"><form></form></div>

      <a href="#" class="register-link">Register</a>
      <a href="#" class="guest-link">Guest</a>
      <a href="#" class="login-link">Login</a>
      <a href="#" class="forgot-link">Forgot</a>
    `;

    // login.js'i yükle (yolu sana göre ayarlı)
    jest.resetModules();
    require("./BEYS-Sports-Ticketing-System/Sports-Ticketing-System/assets/js/login.js");

    // Çünkü login.js içinde kodlar DOMContentLoaded'e bağlı
    document.dispatchEvent(new Event("DOMContentLoaded"));
  });

  test("Register linkine tıklanınca register formu aktif olur", () => {
    document.querySelector(".register-link").click();
    expect(
      document.querySelector(".form-box.register").classList.contains("active")
    ).toBe(true);
  });

  test("Guest linkine tıklanınca guest formu aktif olur", () => {
    document.querySelector(".guest-link").click();
    expect(
      document.querySelector(".form-box.guest").classList.contains("active")
    ).toBe(true);
  });

  test("Login linkine tıklanınca login formu aktif olur", () => {
    // önce register'a tıkla, sonra geri dön
    document.querySelector(".register-link").click();
    document.querySelector(".login-link").click();
    expect(
      document.querySelector(".form-box.login").classList.contains("active")
    ).toBe(true);
  });

  test("Forgot linkine tıklanınca forgot formu aktif olur", () => {
    document.querySelector(".forgot-link").click();
    expect(
      document.querySelector(".form-box.forgot").classList.contains("active")
    ).toBe(true);
  });

  test("Login form submit edilince isLoggedIn=true kaydedilir", () => {
    const form = document.querySelector(".form-box.login form");
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
    expect(sessionStorage.getItem("isLoggedIn")).toBe("true");
  });

  test("Register form submit edilince isLoggedIn=true kaydedilir", () => {
    const form = document.querySelector(".form-box.register form");
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
    expect(sessionStorage.getItem("isLoggedIn")).toBe("true");
  });

  test("Guest form submit edilince isLoggedIn=guest kaydedilir", () => {
    const form = document.querySelector(".form-box.guest form");
    form.dispatchEvent(
      new Event("submit", { bubbles: true, cancelable: true })
    );
    expect(sessionStorage.getItem("isLoggedIn")).toBe("guest");
  });
});
