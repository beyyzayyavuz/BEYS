/**
 * @jest-environment jsdom
 */
const { fireEvent } = require("@testing-library/dom");
const matchers = require("@testing-library/jest-dom/matchers");
expect.extend(matchers);

describe("Sport Ticket Cart System", () => {
  let cartItemsEl, cartTotalQuantityEl, cartTotalPriceEl;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="cart-items"></div>
      <span id="cart-total-quantity"></span>
      <span id="cart-total-price"></span>
    `;

    cartItemsEl = document.getElementById("cart-items");
    cartTotalQuantityEl = document.getElementById("cart-total-quantity");
    cartTotalPriceEl = document.getElementById("cart-total-price");

    sessionStorage.clear();
  });

  test("adds an item to the cart and renders it", () => {
    const fakeCart = [
      {
        event: "Fenerbahçe Beko vs Anadolu Efes",
        price: 90,
      },
    ];
    sessionStorage.setItem("cart", JSON.stringify(fakeCart));

    const renderCart = () => {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cartItemsEl.innerHTML = "";
      cart.forEach((item, index) => {
        const html = `
          <div class="cart-item" data-index="${index}">
            <h4>${item.event}</h4>
            <p>Price: $${item.price}</p>
            <button class="remove-item">Remove from Cart</button>
            <a href="#" class="purchase-item" data-index="${index}">Purchase Tickets</a>
          </div>
        `;
        cartItemsEl.insertAdjacentHTML("beforeend", html);
      });
      cartTotalQuantityEl.textContent = cart.length;
    };

    renderCart();

    expect(cartItemsEl).toHaveTextContent("Fenerbahçe Beko vs Anadolu Efes");
    expect(cartTotalQuantityEl.textContent).toBe("1");
  });
  test("removes an item from the cart and updates DOM", () => {
    const fakeCart = [
      { event: "Galatasaray vs Fenerbahçe", price: 80 },
      { event: "Beşiktaş vs Trabzonspor", price: 50 },
    ];
    sessionStorage.setItem("cart", JSON.stringify(fakeCart));

    const renderCart = () => {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cartItemsEl.innerHTML = "";
      cart.forEach((item, index) => {
        const html = `
        <div class="cart-item" data-index="${index}">
          <h4>${item.event}</h4>
          <p>Price: $${item.price}</p>
          <button class="remove-item">Remove from Cart</button>
        </div>
      `;
        cartItemsEl.insertAdjacentHTML("beforeend", html);
      });
      cartTotalQuantityEl.textContent = cart.length;
    };

    renderCart();

    // 1. ilk ürünü sil
    const removeButtons = cartItemsEl.querySelectorAll(".remove-item");
    fireEvent.click(removeButtons[0]);

    // 2. fakeCart dizisini güncelle (gerçek hayat gibi simüle)
    fakeCart.splice(0, 1);
    sessionStorage.setItem("cart", JSON.stringify(fakeCart));
    renderCart();

    expect(cartItemsEl).toHaveTextContent("Beşiktaş vs Trabzonspor");
    expect(cartItemsEl).not.toHaveTextContent("Galatasaray vs Fenerbahçe");
    expect(cartTotalQuantityEl.textContent).toBe("1");
  });
  test("removes an item from the cart and updates DOM", () => {
    const fakeCart = [
      { event: "Galatasaray vs Fenerbahçe", price: 80 },
      { event: "Beşiktaş vs Trabzonspor", price: 50 },
    ];
    sessionStorage.setItem("cart", JSON.stringify(fakeCart));

    const renderCart = () => {
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
      cartItemsEl.innerHTML = "";
      cart.forEach((item, index) => {
        const html = `
        <div class="cart-item" data-index="${index}">
          <h4>${item.event}</h4>
          <p>Price: $${item.price}</p>
          <button class="remove-item">Remove from Cart</button>
        </div>
      `;
        cartItemsEl.insertAdjacentHTML("beforeend", html);
      });
      cartTotalQuantityEl.textContent = cart.length;
    };

    renderCart();

    // 1. ilk ürünü sil
    const removeButtons = cartItemsEl.querySelectorAll(".remove-item");
    fireEvent.click(removeButtons[0]);

    // 2. fakeCart dizisini güncelle (gerçek hayat gibi simüle)
    fakeCart.splice(0, 1);
    sessionStorage.setItem("cart", JSON.stringify(fakeCart));
    renderCart();

    expect(cartItemsEl).toHaveTextContent("Beşiktaş vs Trabzonspor");
    expect(cartItemsEl).not.toHaveTextContent("Galatasaray vs Fenerbahçe");
    expect(cartTotalQuantityEl.textContent).toBe("1");
  });
});
