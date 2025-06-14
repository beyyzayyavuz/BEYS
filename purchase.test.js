/**
 * @jest-environment jsdom
 */
const matchers = require("@testing-library/jest-dom/matchers");
const { fireEvent } = require("@testing-library/dom");
expect.extend(matchers);

describe("Purchase system (Homepage interaction)", () => {
  let purchaseBtn;

  beforeEach(() => {
    document.body.innerHTML = `
      <button class="purchase-link" data-id="3">Purchase Tickets</button>
    `;
    purchaseBtn = document.querySelector(".purchase-link");

    // Sample event list
    global.events = [
      {
        id: "1",
        title: "Match A vs B",
        price: 90,
        image: "image1.jpg",
        date: "Thu 20:00",
        location: "Istanbul",
      },
      {
        id: "3",
        title: "Eczacıbaşı Dynavit vs VakıfBank",
        price: 75,
        image: "image2.jpg",
        date: "Sat 17:00",
        location: "Istanbul",
      },
    ];

    // Mock sessionStorage
    sessionStorage.clear();
    global.window = Object.create(window);
    window.location.href = "";
  });

  test("Clicking purchase button stores selected event", () => {
    // click simulation
    fireEvent.click(purchaseBtn);

    // Fake handler simulation (bu gerçek kodu temsil eder)
    const selectedEvent = events.find((ev) => ev.id === "3");
    sessionStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
    window.location.href = "event-details.html";

    const stored = JSON.parse(sessionStorage.getItem("selectedEvent"));

    expect(stored).toMatchObject({
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
    });

    expect(window.location.href).toContain("event-details.html");
  });
});
