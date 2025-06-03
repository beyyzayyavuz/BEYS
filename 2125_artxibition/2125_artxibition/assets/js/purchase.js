// ==============================
// EVENT TICKETS FLOW - purchase.js (Tam Akış)
// ==============================
document.addEventListener("DOMContentLoaded", () => {
  // 1️⃣ Ana Sayfa: Purchase Ticket Tıklama
  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("purchase-link")) {
      e.preventDefault();
      const eventId = e.target.getAttribute("data-id");

      const events = [
        {
          id: "1",
          title: "Radio City Musical Hall",
          date: "Thu 18:00-22:00",
          location: "NYC",
          image: "assets/images/venue-01.jpg",
          price: 50,
          serviceFee: 15,
        },
        {
          id: "2",
          title: "Madison Square Garden",
          date: "Fri 20:00-23:00",
          location: "NYC",
          image: "assets/images/venue-02.jpg",
          price: 60,
          serviceFee: 20,
        },
        {
          id: "3",
          title: "Sunset Beach Party",
          date: "Sat 15:00-19:00",
          location: "LA",
          image: "assets/images/venue-05.jpg",
          price: 40,
          serviceFee: 10,
        },
      ];

      const selectedEvent = events.find((ev) => ev.id === eventId);
      if (selectedEvent) {
        sessionStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
        window.location.href = "event-details.html";
      }
    }
  });

  // 2️⃣ Event Details Sayfası: Event Data Göster & Purchase Button
  const eventPurchaseBtn = document.getElementById("purchase-button");
  if (eventPurchaseBtn) {
    const eventData = JSON.parse(sessionStorage.getItem("selectedEvent"));

    if (eventData) {
      document.getElementById("event-title").textContent = eventData.title;
      document.getElementById("event-date").textContent = eventData.date;
      document.getElementById("event-location").textContent =
        eventData.location;
      document.getElementById("event-image").src = eventData.image;
      document.getElementById(
        "event-price"
      ).textContent = `$${eventData.price}`;
      document.getElementById(
        "event-fee"
      ).textContent = `$${eventData.serviceFee}`;
    }

    eventPurchaseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "cart-1.html";
    });
  }

  // 3️⃣ Cart-1: Kategori Seçimi
  const categoryBoxes = document.querySelectorAll(".category-box");
  if (categoryBoxes.length) {
    categoryBoxes.forEach((box) => {
      box.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        const category = box.querySelector("h5").textContent.trim();
        sessionStorage.setItem("selectedCategory", category);
        window.location.href = "cart-2.html";
      });
    });
  }

  // 4️⃣ Cart-2: Koltuk Seçimi ve Event Data Gösterimi
  const seatGrid = document.querySelector(".seat-grid");
  if (seatGrid) {
    const eventData = JSON.parse(sessionStorage.getItem("selectedEvent"));
    const category = sessionStorage.getItem("selectedCategory") || "Category 1";

    if (eventData) {
      document.getElementById("event-title").textContent = eventData.title;
      document.getElementById("event-date").textContent = eventData.date;
      document.getElementById("event-location").textContent =
        eventData.location;
      document.getElementById("event-image").src = eventData.image;
      document.getElementById(
        "event-price"
      ).textContent = `$${eventData.price}`;
      document.getElementById(
        "event-fee"
      ).textContent = `$${eventData.serviceFee}`;

      // Koltuk Planı
      const rows = 6;
      const cols = 8;
      seatGrid.innerHTML = "";

      // Koltukları Oluştur
      for (let r = 1; r <= rows; r++) {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("seat-row");

        const rowLabel = document.createElement("span");
        rowLabel.classList.add("seat-row-label");
        rowLabel.textContent = r;
        rowDiv.appendChild(rowLabel);

        for (let c = 1; c <= cols; c++) {
          const seat = document.createElement("div");
          seat.classList.add("seat");
          seat.dataset.row = r;
          seat.dataset.col = c;

          seat.addEventListener("click", () => {
            seat.classList.toggle("selected");
            updateSummary();
          });

          rowDiv.appendChild(seat);
        }

        seatGrid.appendChild(rowDiv);
      }

      // Alt Kolon Numaraları
      const footer = document.createElement("div");
      footer.classList.add("seat-footer");
      footer.innerHTML =
        `<span></span>` +
        Array.from({ length: cols }, (_, i) => `<span>${i + 1}</span>`).join(
          ""
        );
      seatGrid.appendChild(footer);

      // Seçim Özeti Güncelle
      function updateSummary() {
        const count = document.querySelectorAll(".seat.selected").length;
        document.getElementById("selected-count").textContent = count;
        document.getElementById("total-price").textContent = `$${
          count * (eventData.price + eventData.serviceFee)
        }`;
      }
    }
  }

  // 5️⃣ Payment Butonu
  const paymentBtn = document.getElementById("payment-button");
  if (paymentBtn) {
    paymentBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      if (isLoggedIn) {
        // Kullanıcı zaten giriş yapmışsa doğrudan cart-3.html'e git
        window.location.href = "cart-3-after-logged-in.html";
      } else {
        // Kullanıcı giriş yapmamışsa login'e yönlendir
        sessionStorage.setItem("redirectAfterLogin", "cart-3.html");
        window.location.href = "login.html";
      }
    });
  }
  //dikkat
  if (e.target.classList.contains("login-nav-text")) {
    e.preventDefault();
    sessionStorage.setItem("redirectAfterLogin", "index.html");
    window.location.href = "login.html";
  }

  // 6️⃣ Login & Guest Akışı
  const loginForm = document.getElementById("login-form");
  const guestBtn = document.getElementById("continue-as-guest");
  const registerForm = document.getElementById("register-form");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "true");
      const redirect =
        sessionStorage.getItem("redirectAfterLogin") ||
        "index-after-logged-in.html";
      window.location.href = redirect;
    });
  }

  if (guestBtn) {
    guestBtn.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "guest");
      const redirect =
        sessionStorage.getItem("redirectAfterLogin") ||
        "index-after-logged-in.html";
      window.location.href = redirect;
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "true");
      const redirect =
        sessionStorage.getItem("redirectAfterLogin") ||
        "index-after-logged-in.html";
      window.location.href = redirect;
    });
  }
});
