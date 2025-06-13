document.addEventListener("DOMContentLoaded", function () {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalQuantityEl = document.getElementById("cart-total-quantity");
  const cartTotalPriceEl = document.getElementById("cart-total-price");

  // 🟡 Etkinlikler: title, price, date, desc (yer)
  const events = [
    {
      id: "1",
      title: "Fenerbahçe Beko vs Anadolu Efes",
      price: 90,
      date: "Thursday 18:00 - 22:00",
      desc: "Ülker Sports Arena, İstanbul",
    },
    {
      id: "2",
      title: "Beşiktaş Fibabanka vs Galatasaray NEF",
      price: 120,
      date: "Friday 19:00 - 21:30",
      desc: "Akatlar Spor Kompleksi, İstanbul",
    },
    {
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
      price: 75,
      date: "Saturday 17:00 - 19:00",
      desc: "Burhan Felek Vestel Voleybol Salonu",
    },
    {
      id: "4",
      title: "Pınar Karşıyaka vs Darüşşafaka",
      price: 110,
      date: "Sunday 16:00 - 18:00",
      desc: "Karşıyaka Spor Salonu, İzmir",
    },
    {
      id: "5",
      title: "Ankara DSİ vs İstanbul BŞB",
      price: 130,
      date: "Monday 20:00 - 22:00",
      desc: "Ankara Spor Kompleksi, Ankara",
    },
    {
      id: "6",
      title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
      price: 50,
      date: "Wednesday 18:00 - 20:00",
      desc: "TED Koleji Spor Salonu, Ankara",
    },
    {
      id: "7",
      title: "Galatasaray A.Ş vs Trabzonspor",
      price: 40,
      date: "Sunday 21:00 - 23:00",
      desc: "RAMS Park, İstanbul",
    },
    {
      id: "8",
      title: "Fenerbahçe vs Adana Demirspor",
      price: 85,
      date: "Saturday 20:00 - 22:30",
      desc: "Şükrü Saracoğlu Stadyumu, İstanbul",
    },
    {
      id: "9",
      title: "Ziraat Bankkart vs Halkbank",
      price: 95,
      date: "Friday 17:30 - 19:30",
      desc: "Başkent Voleybol Salonu, Ankara",
    },
    {
      id: "10",
      title: "İpek Soylu vs Zeynep Sönmez",
      price: 95,
      date: "Tuesday 15:00 - 17:00",
      desc: "TED Spor Kulübü, İstanbul",
    },
    {
      id: "11",
      title: "Türkiye vs İtalya (Kadın Voleybol)",
      price: 95,
      date: "Thursday 19:00 - 21:00",
      desc: "Ankara Spor Salonu",
    },
    {
      id: "12",
      title: "Efes Pilsen vs Pınar Karşıyaka",
      price: 95,
      date: "Monday 18:00 - 20:30",
      desc: "Sinan Erdem Spor Salonu, İstanbul",
    },
    {
      id: "13",
      title: "Galatasaray vs Fenerbahçe",
      price: 95,
      date: "Sunday 21:45 - 00:00",
      desc: "Ali Sami Yen Spor Kompleksi, İstanbul",
    },
    {
      id: "14",
      title: "Türkiye vs Sırbistan (Basketbol)",
      price: 95,
      date: "Saturday 20:30 - 23:00",
      desc: "Ülker Spor ve Etkinlik Salonu, İstanbul",
    },
    {
      id: "15",
      title: "Beşiktaş vs Trabzonspor",
      price: 45,
      date: "Friday 21:00 - 23:15",
      desc: "Vodafone Park, İstanbul",
    },
  ];

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = "";

    cart.forEach((item, index) => {
      const eventInfo = events.find((ev) => ev.title === item.event);
      const eventDate = eventInfo ? eventInfo.date : "Date not available";
      const eventDesc = eventInfo ? eventInfo.desc : "Venue not available";
      const eventPrice = eventInfo ? eventInfo.price : item.price;

      const itemHTML = `
        <div class="cart-item" data-index="${index}">
          <h4>${item.event}</h4>
          <p><i class="fa fa-map-marker"></i> ${eventDesc}</p>
          <p><i class="fa fa-calendar"></i> ${eventDate}</p>
          <p>Price: $${eventPrice}</p>
          <div class="cart-buttons">
            <button class="remove-item">Remove from Cart</button>
            <div class="main-dark-button">
              <a href="#" class="purchase-item" data-index="${index}">Purchase Tickets</a>
            </div>
          </div>
          <hr>
        </div>
      `;
      cartItemsEl.insertAdjacentHTML("beforeend", itemHTML);
    });

    if (cartTotalQuantityEl) cartTotalQuantityEl.textContent = cart.length;
    if (cartTotalPriceEl) cartTotalPriceEl.textContent = "";
  }

  document.body.addEventListener("click", function (e) {
    // ➕ Add to Cart
    if (e.target.classList.contains("add-to-cart-btn")) {
      e.preventDefault();
      const card = e.target.closest(".venue-item, .right-content");
      if (!card) return;

      const eventName =
        card.querySelector("h4")?.textContent || "Unnamed Event";
      const matchedEvent = events.find((ev) => ev.title === eventName);
      const eventPrice = matchedEvent ? matchedEvent.price : 65;

      const cartItem = {
        event: eventName,
        price: eventPrice,
      };

      cart.push(cartItem);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      alert(`${eventName} added to cart!`);

      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
      window.location.href = isLoggedIn
        ? "event-details-after-logged-in.html"
        : "event-details.html";

      renderCart();
    }

    // ❌ Remove from Cart
    if (e.target.classList.contains("remove-item")) {
      const index = parseInt(
        e.target.closest(".cart-item")?.getAttribute("data-index")
      );
      if (!isNaN(index)) {
        cart.splice(index, 1);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      }
    }

    // 🎟️ Purchase Ticket
    if (e.target.classList.contains("purchase-item")) {
      e.preventDefault();
      const index = parseInt(e.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        const selectedEvent = cart[index];
        sessionStorage.setItem("selectedEvent", JSON.stringify(selectedEvent));
        alert(`Proceeding to purchase for: ${selectedEvent.event}`);
        window.location.href = "cart-1-after-logged-in.html";
      }
    }
  });

  renderCart();
});
