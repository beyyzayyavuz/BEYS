// events.js

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const purchaseLink = isLoggedIn
    ? "event-details-after-logged-in.html"
    : "event-details.html";

  const events = [
    {
      id: "1",
      title: "Fenerbahçe Beko vs Anadolu Efes",
      desc: "Ülker Sports Arena, İstanbul",
      image: "assets/images/match-01.jpg",
      capacity: 250,
      audience: 500,
      category: "upcoming",
    },
    {
      id: "2",
      title: "Beşiktaş Fibabanka vs Galatasaray NEF",
      desc: "Akatlar Spor Kompleksi, İstanbul",
      image: "assets/images/match-05.jpg",
      capacity: 450,
      audience: 650,
      category: "upcoming",
    },
    {
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
      desc: "Burhan Felek Vestel Voleybol Salonu",
      image: "assets/images/match-02.jpg",
      capacity: 250,
      audience: 500,
      category: "upcoming",
    },
    {
      id: "4",
      title: "Galatasaray A.Ş vs Trabzonspor",
      desc: "RAMS Park, İstanbul",
      image: "assets/images/match-04.jpg",
      capacity: 52000,
      audience: 49000,
      category: "last",
    },
    {
      id: "5",
      title: "Fenerbahçe vs Adana Demirspor",
      desc: "Şükrü Saracoğlu Stadyumu, İstanbul",
      image: "assets/images/match-06.jpg",
      capacity: 47000,
      audience: 43000,
      category: "last",
    },
    {
      id: "6",
      title: "Ziraat Bankkart vs Halkbank",
      desc: "Başkent Voleybol Salonu, Ankara",
      image: "assets/images/match-07.jpg",
      capacity: 1800,
      audience: 1600,
      category: "last",
    },
    {
      id: "7",
      title: "İpek Soylu vs Zeynep Sönmez",
      desc: "TED Spor Kulübü, İstanbul",
      image: "assets/images/match-03.jpg",
      capacity: 500,
      audience: 450,
      category: "just-for-you",
    },
    {
      id: "8",
      title: "Türkiye vs İtalya (Kadın Voleybol)",
      desc: "Ankara Spor Salonu",
      image: "assets/images/match-08.jpg",
      capacity: 10000,
      audience: 9500,
      category: "just-for-you",
    },
    {
      id: "9",
      title: "Efes Pilsen vs Pınar Karşıyaka",
      desc: "Sinan Erdem Spor Salonu, İstanbul",
      image: "assets/images/match-09.jpg",
      capacity: 16000,
      audience: 15500,
      category: "just-for-you",
    },
  ];

  const upcoming = document.getElementById("upcoming-events");
  const last = document.getElementById("last-time-offers");
  const justForYou = document.getElementById("just-for-you-events");
  const allEvents = document.getElementById("all-events");

  /*logged-in olduysa kullanıcı ana sayfada favori butonu gözükecek ve özellik aktif olacak*/
  events.forEach((event) => {
    let favBtn = "";
    if (isLoggedIn) {
      favBtn = `
      <button class="fav-btn">
        <i class="fa fa-heart-o"></i>
      </button>`;
    }

    const card = `
    <div class="venue-item" data-id="${event.id}">
      ${favBtn}
      <div class="thumb"><img src="${event.image}" alt="${event.title}"></div>
      <div class="down-content">
        <h4>${event.title}</h4>
        <p>${event.desc}</p>
        <ul>
          <li><i class="fa fa-sitemap"></i>${event.capacity}</li>
          <li><i class="fa fa-user"></i>${event.audience}</li>
        </ul>
        <div class="main-white-button">
          <a href="${purchaseLink}" class="purchase-link" data-id="${event.id}">Purchase Tickets</a>
        </div>
      </div>
    </div>`;

    // Kategorilere göre ekle
    if (event.category === "upcoming" && upcoming)
      upcoming.insertAdjacentHTML("beforeend", card);
    else if (event.category === "last" && last)
      last.insertAdjacentHTML("beforeend", card);
    else if (event.category === "just-for-you" && justForYou)
      justForYou.insertAdjacentHTML("beforeend", card);

    // Hepsini All Events'te göster
    if (allEvents) allEvents.insertAdjacentHTML("beforeend", card);
  });

  initSliders();

  // FAVORİ BUTONLARI (Sadece login varsa)
  if (isLoggedIn) {
    let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

    setTimeout(() => {
      const favButtons = document.querySelectorAll(".fav-btn");

      favButtons.forEach((btn) => {
        const eventId = btn.closest(".venue-item").getAttribute("data-id");

        if (favorites.includes(eventId)) {
          btn.classList.add("active");
          btn.querySelector("i").classList.remove("fa-heart-o");
          btn.querySelector("i").classList.add("fa-heart");
        }

        btn.addEventListener("click", () => {
          if (favorites.includes(eventId)) {
            favorites = favorites.filter((id) => id !== eventId);
            btn.classList.remove("active");
            btn.querySelector("i").classList.add("fa-heart-o");
            btn.querySelector("i").classList.remove("fa-heart");
          } else {
            favorites.push(eventId);
            btn.classList.add("active");
            btn.querySelector("i").classList.remove("fa-heart-o");
            btn.querySelector("i").classList.add("fa-heart");
          }
          sessionStorage.setItem("favorites", JSON.stringify(favorites));
        });
      });
    }, 500);
  }
});

// PURCHASE LINK TIKLAMASI
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("purchase-link")) {
    e.preventDefault();
    const eventId = e.target.getAttribute("data-id");
    sessionStorage.setItem("selectedEventId", eventId);

    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    window.location.href = isLoggedIn
      ? "event-details-after-logged-in.html"
      : "event-details.html";
  }
});
