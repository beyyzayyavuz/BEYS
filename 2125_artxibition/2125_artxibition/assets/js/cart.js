document.addEventListener("DOMContentLoaded", function () {
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalQuantityEl = document.getElementById("cart-total-quantity");
  const cartTotalPriceEl = document.getElementById("cart-total-price");

  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

  // Cart'ı render eden fonksiyon
  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = "";

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const itemHTML = `
        <div class="cart-item" data-index="${index}">
          <h4>${item.event}</h4>
          <p>Quantity: ${item.quantity}</p>
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

    cartTotalQuantityEl.textContent = totalQuantity;
    cartTotalPriceEl.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Add-to-Cart ve Remove işlemleri
  document.body.addEventListener("click", function (e) {
    // Add to Cart
    if (e.target.classList.contains("add-to-cart-btn")) {
      e.preventDefault();
      const card = e.target.closest(".venue-item, .right-content");
      if (!card) return;

      const eventName =
        card.querySelector("h4")?.textContent || "Unnamed Event";
      const eventPrice = 65;

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
      renderCart();
    }

    // Remove from Cart
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

    // Purchase Tickets
    if (e.target.classList.contains("purchase-item")) {
      e.preventDefault();
      const index = parseInt(e.target.getAttribute("data-index"));
      if (!isNaN(index)) {
        const selectedEvent = cart[index];
        sessionStorage.setItem("selectedEventId", selectedEvent.event);
        alert(`Proceeding to purchase for: ${selectedEvent.event}`);
        window.location.href = "cart-1-after-logged-in.html"; // Yönlendirme sayfan
      }
    }
  });

  renderCart();
});
