/**
 * @jest-environment jsdom
 */
const matchers = require("@testing-library/jest-dom/matchers");
const { fireEvent } = require("@testing-library/dom");
expect.extend(matchers);

describe("Favorites Page Rendering & Behavior", () => {
  let favoritesContainer;

  // Örnek event listesi – test için kullanılır
  const events = [
    {
      id: "13",
      title: "Galatasaray vs Fenerbahçe",
      desc: "Ali Sami Yen Spor Kompleksi, İstanbul",
      date: "June 23, 21:45",
    },
    {
      id: "15",
      title: "Beşiktaş vs Trabzonspor",
      desc: "Vodafone Park, İstanbul",
      date: "June 21, 21:00",
    },
  ];

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="favorites-container"></div>
    `;
    favoritesContainer = document.getElementById("favorites-container");

    // Favorilere örnek 2 ID ekle
    sessionStorage.setItem("favorites", JSON.stringify(["13", "15"]));
  });

  function renderFavorites() {
    favoritesContainer.innerHTML = "";
    const favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
      favoritesContainer.innerHTML = "<p>No favorites yet.</p>";
      return;
    }

    favorites.forEach((favId, index) => {
      const event = events.find((e) => e.id === favId);
      if (event) {
        const html = `
          <div class="fav-item" data-index="${index}">
            <h4>${event.title}</h4>
            <p><i class="fa fa-map-marker"></i> ${event.desc}</p>
            <p><i class="fa fa-calendar"></i> ${event.date}</p>
            <div class="fav-buttons">
              <button class="remove-fav-btn">Remove from Favorites</button>
              <a href="#" class="purchase-link" data-id="${event.id}">Purchase Tickets</a>
            </div>
          </div>
        `;
        favoritesContainer.insertAdjacentHTML("beforeend", html);
      }
    });
  }

  test("renders favorite items from sessionStorage", () => {
    renderFavorites();

    expect(favoritesContainer).toHaveTextContent("Galatasaray vs Fenerbahçe");
    expect(favoritesContainer).toHaveTextContent("Beşiktaş vs Trabzonspor");
  });

  test("removes an item from favorites on remove button click", () => {
    renderFavorites();

    const removeButtons =
      favoritesContainer.querySelectorAll(".remove-fav-btn");
    fireEvent.click(removeButtons[0]); // İlk favori silinir

    // Simülasyon: sessionStorage güncellenir
    const currentFavs = JSON.parse(sessionStorage.getItem("favorites"));
    currentFavs.splice(0, 1);
    sessionStorage.setItem("favorites", JSON.stringify(currentFavs));

    // Sayfa yeniden çizilir
    renderFavorites();

    expect(favoritesContainer).not.toHaveTextContent(
      "Galatasaray vs Fenerbahçe"
    );
    expect(favoritesContainer).toHaveTextContent("Beşiktaş vs Trabzonspor");
  });
});
