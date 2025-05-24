document.addEventListener("DOMContentLoaded", function () {
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  const cartItemsEl = document.getElementById("cart-items"); // ÖNEMLİ: Cart HTML'inde #cart-items olmalı
  const cartTotalQuantityEl = document.getElementById("cart-total-quantity");
  const cartTotalPriceEl = document.getElementById("cart-total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Add to Cart İşlemi
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const quantityInput = document.querySelector(".input-text.qty");
      const quantity = parseInt(quantityInput.value) || 1;
      const ticketPrice = 65;
      const total = quantity * ticketPrice;

      const cartItem = {
        event: "Sunny Hill Festival",
        quantity: quantity,
        price: ticketPrice,
        total: total,
      };

      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Item added to cart!");
    });
  }

  // Cart'ı Render Eden Fonksiyon
  function renderCart() {
    if (!cartItemsEl) return;
    cartItemsEl.innerHTML = ""; // Eskiyi temizle

    let totalQuantity = 0;
    let totalPrice = 0;

    cart.forEach((item, index) => {
      const itemHTML = `
        <div class="cart-item" data-index="${index}">
          <h4>${item.event}</h4>
          <p>Quantity: ${item.quantity}</p>
          <p>Price: $${item.price}</p>
          <p>Total: $${item.total}</p>
          <button class="remove-item">Remove from Cart</button>
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

  // Remove İşlemi
  if (cartItemsEl) {
    cartItemsEl.addEventListener("click", function (e) {
      if (e.target.classList.contains("remove-item")) {
        const index = parseInt(
          e.target.closest(".cart-item").getAttribute("data-index")
        );
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Sayfayı yenilemeden DOM'u güncelle
      }
    });
  }

  // Sayfa açıldığında sepeti yükle
  renderCart();
});
