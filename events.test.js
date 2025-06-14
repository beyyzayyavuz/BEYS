/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");
const { fireEvent } = require("@testing-library/dom");

describe("Events Page Behavior", () => {
  beforeEach(() => {
    // Test için sahte HTML sayfası yükle (örnek olarak test-dom.html kullandık)
    document.body.innerHTML = fs.readFileSync(
      path.resolve(__dirname, "test-dom.html"),
      "utf8"
    );

    // Giriş yapmış gibi işaretle
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("favorites", JSON.stringify([]));

    // events.js dosyasını çağır (önceden tanımlı fonksiyonları yüklemesi için)
    require("./events.js");
  });

  afterEach(() => {
    jest.resetModules(); // events.js'i temizle
    sessionStorage.clear();
  });

  test("renders event cards with Purchase button and favorite button", () => {
    const eventCards = document.querySelectorAll(".venue-item");
    expect(eventCards.length).toBeGreaterThan(0);

    const firstPurchaseBtn = eventCards[0].querySelector(".purchase-link");
    const firstFavBtn = eventCards[0].querySelector(".fav-btn");

    expect(firstPurchaseBtn).toBeTruthy();
    expect(firstFavBtn).toBeTruthy();
  });

  test("clicking favorite button toggles active state and updates sessionStorage", () => {
    const favBtn = document.querySelector(".fav-btn");
    const icon = favBtn.querySelector("i");

    expect(icon.classList.contains("fa-heart-o")).toBe(true);

    fireEvent.click(favBtn);

    const updatedFavorites = JSON.parse(sessionStorage.getItem("favorites"));
    expect(updatedFavorites.length).toBe(1);
    expect(icon.classList.contains("fa-heart")).toBe(true);
  });

  test("clicking purchase button saves selectedEventId and redirects", () => {
    delete window.location;
    window.location = { href: "" };

    const purchaseBtn = document.querySelector(".purchase-link");
    fireEvent.click(purchaseBtn);

    const selectedId = sessionStorage.getItem("selectedEventId");
    expect(selectedId).toBeTruthy();
    expect(window.location.href).toContain("event-details");
  });
});
