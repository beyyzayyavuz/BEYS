document.addEventListener("DOMContentLoaded", function () {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalQuantityEl = document.getElementById("cart-total-quantity");
  const cartTotalPriceEl = document.getElementById("cart-total-price");

  // ✅ Etkinlik verileri (id ve fiyat dahil)
  const events = [
    { id: "1", title: "Fenerbahçe Beko vs Anadolu Efes", price: 90 },
    { id: "2", title: "Beşiktaş Fibabanka vs Galatasaray NEF", price: 120 },
    { id: "3", title: "Eczacıbaşı Dynavit vs VakıfBank", price: 75 },
    { id: "4", title: "Pınar Karşıyaka vs Darüşşafaka", price: 110 },
    { id: "5", title: "Ankara DSİ vs İstanbul BŞB", price: 130 },
    {
      id: "6",
      title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
      price: 50,
    },
    { id: "7", title: "Galatasaray A.Ş vs Trabzonspor", price: 40 },
    { id: "8", title: "Fenerbahçe vs Adana Demirspor", price: 85 },
    { id: "9", title: "Ziraat Bankkart vs Halkbank", price: 95 },
    { id: "10", title: "İpek Soylu vs Zeynep Sönmez", price: 95 },
    { id: "11", title: "Türkiye vs İtalya (Kadın Voleybol)", price: 95 },
    { id: "12", title: "Efes Pilsen vs Pınar Karşıyaka", price: 95 },
    { id: "13", title: "Galatasaray vs Fenerbahçe", price: 95 },
    { id: "14", title: "Türkiye vs Sırbistan (Basketbol)", price: 95 },
    { id: "15", title: "Beşiktaş vs Trabzonspor", price: 45 },
  ];

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const itemHTML = `
      <div class="cart-item" data-index="${index}">
        <h4>${item.event}</h4>
        <p>Price: $${item.price}</p>
        <p>Total: $${item.total}</p>
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
      totalQuantity += item.quantity;
      totalPrice += item.total;
    });

    if (cartTotalQuantityEl) cartTotalQuantityEl.textContent = totalQuantity;
    if (cartTotalPriceEl)
      cartTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
  }

  document.body.addEventListener("click", function (e) {
    // ✅ Add to Cart
    if (e.target.classList.contains("add-to-cart-btn")) {
      e.preventDefault();
      const card = e.target.closest(".venue-item, .right-content");
      if (!card) return;

      const eventName =
        card.querySelector("h4")?.textContent || "Unnamed Event";

      // 🎯 Etkinlik fiyatını bul
      const matchedEvent = events.find((ev) => ev.title === eventName);
      const eventPrice = matchedEvent ? matchedEvent.price : 65;

      const quantityInput = card.querySelector(".input-text.qty");
      const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;

      const total = quantity * eventPrice;

      const cartItem = {
        event: eventName,
        quantity: quantity,
        price: eventPrice,
        total: total,
      };

      cart.push(cartItem);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      alert(`${eventName} added to cart!`);

      // ✅ Login kontrolü
      const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";

      window.location.href = isLoggedIn
        ? "event-details-after-logged-in.html"
        : "event-details.html";

      renderCart();
    }

    // ✅ Remove from Cart
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

    // ✅ Purchase Ticket
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
