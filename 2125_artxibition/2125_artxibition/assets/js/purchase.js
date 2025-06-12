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
          title: "Fenerbahçe Beko vs Anadolu Efes",
          date: "Thursday 20:00 to 22:30",
          location: "Istanbul",
          image: "assets/images/match-01.jpg",
          price: 90,
        },
        {
          id: "2",
          title: "Beşiktaş Fibabanka vs Galatasaray NEF",
          image: "assets/images/match-05.jpg",
          date: "Sunday 19:00 to 21:00",
          location: "Istanbul",
          price: 120,
        },
        {
          id: "3",
          title: "Eczacıbaşı Dynavit vs VakıfBank",
          image: "assets/images/match-02.jpg",
          date: "Saturday 17:00 to 19:00",
          location: "Istanbul",
          price: 75,
        },
        {
          id: "4",
          title: "Pınar Karşıyaka vs Darüşşafaka",
          image: "assets/images/match-13.jpg",
          date: "Friday 20:00 to 22:00",
          location: "Istanbul",
          price: 110,
        },
        {
          id: "5",
          title: "Ankara DSİ vs İstanbul BŞB",
          image: "assets/images/match-14.jpg",
          date: "Sunday 21:00 to 23:00",
          location: "Istanbul",
          price: 130,
        },
        {
          id: "6",
          title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
          image: "assets/images/match-15.jpg",
          date: "Wednesday 18:30 to 20:30",
          location: "Ankara",
          price: 50,
        },
        {
          id: "7",
          title: "Galatasaray A.Ş vs Trabzonspor",
          image: "assets/images/match-04.jpg",
          date: "Tuesday 16:00 to 18:00",
          location: "Istanbul",
          price: 40,
        },
        {
          id: "8",
          title: "Fenerbahçe vs Adana Demirspor",
          image: "assets/images/match-06.jpg",
          date: "Saturday 18:00 to 20:00",
          location: "Ankara",
          price: 85,
        },
        {
          id: "9",
          title: "Ziraat Bankkart vs Halkbank",
          image: "assets/images/match-07.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "10",
          title: "İpek Soylu vs Zeynep Sönmez",
          image: "assets/images/match-03.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "11",
          title: "Türkiye vs İtalya (Kadın Voleybol)",
          image: "assets/images/match-08.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "12",
          title: "Efes Pilsen vs Pınar Karşıyaka",
          image: "assets/images/match-09.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "13",
          title: "Galatasaray vs Fenerbahçe",
          image: "assets/images/match-10.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "14",
          title: "Türkiye vs Sırbistan (Basketbol)",
          image: "assets/images/match-11.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 95,
        },
        {
          id: "15",
          title: "Beşiktaş vs Trabzonspor",
          image: "assets/images/match-12.jpg",
          date: "Thursday 20:00 to 22:00",
          location: "Istanbul",
          price: 45,
        },
      ];

      const selectedEvent = events.find((ev) => ev.id === eventId);
      if (selectedEvent) {
        sessionStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
        window.location.href = "event-details.html";
      }
    }
  });

  // 2️⃣ Event Details Sayfası: Event Bilgisi Göster & Purchase
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

  /* 3️⃣ Cart-1: Kategori Seçimi
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
  }*/
  // 3️⃣ Cart-1: Kategori Seçimi
  const categoryBoxes = document.querySelectorAll(".category-box");
  if (categoryBoxes.length) {
    const eventData = JSON.parse(sessionStorage.getItem("selectedEvent"));
    const basePrice = eventData?.price || 100;

    categoryBoxes.forEach((box) => {
      const category = box.querySelector("h5").textContent.trim();
      const multiplier = categoryMultipliers[category] || 1.0;
      const finalPrice = (basePrice * multiplier).toFixed(2);

      // Sayfada göster (₺ simgesi ile)
      const priceEl = box.querySelector(".category-subtitle");
      if (priceEl) {
        priceEl.textContent = `₺${finalPrice}`;
      }

      // Butona tıklanınca seçimi kaydet
      box.querySelector("button").addEventListener("click", (e) => {
        e.preventDefault();
        sessionStorage.setItem("selectedCategory", category);
        sessionStorage.setItem("selectedCategoryPrice", finalPrice);
        window.location.href = "cart-2.html";
      });
    });
  }

  // 4️⃣ Cart-2: Koltuk Seçimi ve Bilgiler
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

      const footer = document.createElement("div");
      footer.classList.add("seat-footer");
      footer.innerHTML =
        `<span></span>` +
        Array.from({ length: cols }, (_, i) => `<span>${i + 1}</span>`).join(
          ""
        );
      seatGrid.appendChild(footer);

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
  // 5️⃣ Payment Butonu
  const paymentBtn = document.getElementById("payment-button");
  if (paymentBtn) {
    paymentBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const loginStatus = sessionStorage.getItem("isLoggedIn");

      if (loginStatus === "guest") {
        window.location.href = "cart-3.html"; // Guest → cart-3
      } else if (loginStatus === "true") {
        window.location.href = "cart-3-after-logged-in.html"; // Giriş yapmış → cart-3-after
      } else {
        // Giriş yapılmamışsa login'e yönlendir → ama cart3aftera dönecek şekilde
        sessionStorage.setItem(
          "redirectAfterLogin",
          "cart-3-after-logged-in.html"
        );
        window.location.href = "login.html";
      }
    });
  }

  // 6️⃣ Login Linki
  document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("login-nav-text")) {
      e.preventDefault();
      sessionStorage.setItem("redirectAfterLogin", "index.html");
      window.location.href = "login.html";
    }
  });

  // 7️⃣ Login İşlemi
  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      sessionStorage.setItem("isLoggedIn", "true");

      let redirect = sessionStorage.getItem("redirectAfterLogin");
      if (!redirect || redirect === "index.html") {
        redirect = "index-after-logged-in.html";
      }
      sessionStorage.removeItem("redirectAfterLogin");
      window.location.href = redirect;
    });
  }

  //guest işlemlerii

  const guestBtn = document.getElementById("continue-as-guest");

  if (guestBtn) {
    guestBtn.addEventListener("click", (e) => {
      e.preventDefault();

      sessionStorage.setItem("isLoggedIn", "guest");

      // cart3-after için gelindiyse düzelt
      let redirect = sessionStorage.getItem("redirectAfterLogin");

      if (
        !redirect || // hiç tanımlanmamışsa
        redirect === "index.html" ||
        redirect.includes("index-after-logged-in.html")
      ) {
        redirect = "cart-3.html"; // fallback
      } else if (redirect.includes("cart-3-after-logged-in.html")) {
        redirect = "cart-3.html"; // guest gideceği yer
      }

      sessionStorage.removeItem("redirectAfterLogin");

      window.location.href = redirect;
    });
  }
  // Cart-2: Ödeme butonuna tıklanırken koltuk ve kategori bilgileri de kaydedilmeli
  const eventData = JSON.parse(sessionStorage.getItem("selectedEvent"));
  const selectedSeats = document.querySelectorAll(".seat.selected").length;
  const category = sessionStorage.getItem("selectedCategory") || "Category 1";
  const categoryPrice =
    parseFloat(sessionStorage.getItem("selectedCategoryPrice")) || 0;

  const totalPrice = (eventData.price + categoryPrice) * selectedSeats;

  const finalTicketData = {
    ...eventData,
    quantity: selectedSeats,
    category: category,
    categoryPrice: categoryPrice,
    totalPrice: totalPrice,
  };

  sessionStorage.setItem("selectedEvent", JSON.stringify(finalTicketData));
  // Kayıt Formu
  const registerForm = document.getElementById("register-form");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const redirect =
        sessionStorage.getItem("redirectAfterLogin") ||
        "index-after-logged-in.html";
      sessionStorage.setItem("redirectAfterLogin", redirect);
      window.location.href = "login.html";
    });
  }
});
