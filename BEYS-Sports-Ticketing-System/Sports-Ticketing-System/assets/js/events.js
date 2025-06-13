document.addEventListener("DOMContentLoaded", () => {
  // Sayfa tamamen yüklendikten sonra çalışması için DOMContentLoaded kullanılır
  // Kullanıcının giriş yapıp yapmadığını sessionStorage üzerinden kontrol eder
  const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
  const purchaseLink = isLoggedIn
    ? "event-details-after-logged-in.html"
    : "event-details.html";
  // Etkinlik verileri: her bir etkinlik kartının başlık, açıklama, görsel, tarih ve kategorisi
  const events = [
    {
      id: "1",
      title: "Fenerbahçe Beko vs Anadolu Efes",
      desc: "Ülker Sports Arena, İstanbul",
      image: "assets/images/match-01.jpg",
      date: "Thursday 18:00 - 22:00",
      category: "upcoming",
    },
    {
      id: "2",
      title: "Beşiktaş Fibabanka vs Galatasaray NEF",
      desc: "Akatlar Spor Kompleksi, İstanbul",
      image: "assets/images/match-05.jpg",
      date: "Friday 19:00 - 21:30",
      category: "upcoming",
    },
    {
      id: "3",
      title: "Eczacıbaşı Dynavit vs VakıfBank",
      desc: "Burhan Felek Vestel Voleybol Salonu",
      image: "assets/images/match-02.jpg",
      date: "Saturday 17:00 - 19:00",
      category: "upcoming",
    },
    {
      id: "4",
      title: "Pınar Karşıyaka vs Darüşşafaka",
      desc: "Karşıyaka Spor Salonu, İzmir",
      image: "assets/images/match-13.jpg",
      date: "Sunday 16:00 - 18:00",
      category: "upcoming",
    },
    {
      id: "5",
      title: "Ankara DSİ vs İstanbul BŞB",
      desc: "Ankara Spor Kompleksi, Ankara",
      image: "assets/images/match-14.jpg",
      date: "Monday 20:00 - 22:00",
      category: "upcoming",
    },
    {
      id: "6",
      title: "TED Ankara Kolejliler vs Gaziantep Basketbol",
      desc: "TED Koleji Spor Salonu, Ankara",
      image: "assets/images/match-15.jpg",
      date: "Wednesday 18:00 - 20:00",
      category: "upcoming",
    },
    {
      id: "7",
      title: "Galatasaray A.Ş vs Trabzonspor",
      desc: "RAMS Park, İstanbul",
      image: "assets/images/match-04.jpg",
      date: "Sunday 21:00 - 23:00",
      category: "last",
    },
    {
      id: "8",
      title: "Fenerbahçe vs Adana Demirspor",
      desc: "Şükrü Saracoğlu Stadyumu, İstanbul",
      image: "assets/images/match-06.jpg",
      date: "Saturday 20:00 - 22:30",
      category: "last",
    },
    {
      id: "9",
      title: "Ziraat Bankkart vs Halkbank",
      desc: "Başkent Voleybol Salonu, Ankara",
      image: "assets/images/match-07.jpg",
      date: "Friday 17:30 - 19:30",
      category: "last",
    },
    {
      id: "10",
      title: "İpek Soylu vs Zeynep Sönmez",
      desc: "TED Spor Kulübü, İstanbul",
      image: "assets/images/match-03.jpg",
      date: "Tuesday 15:00 - 17:00",
      category: "just-for-you",
    },
    {
      id: "11",
      title: "Türkiye vs İtalya (Kadın Voleybol)",
      desc: "Ankara Spor Salonu",
      image: "assets/images/match-08.jpg",
      date: "Thursday 19:00 - 21:00",
      category: "just-for-you",
    },
    {
      id: "12",
      title: "Efes Pilsen vs Pınar Karşıyaka",
      desc: "Sinan Erdem Spor Salonu, İstanbul",
      image: "assets/images/match-09.jpg",
      date: "Monday 18:00 - 20:30",
      category: "just-for-you",
    },
    {
      id: "13",
      title: "Galatasaray vs Fenerbahçe",
      desc: "Ali Sami Yen Spor Kompleksi, İstanbul",
      image: "assets/images/match-10.jpg",
      date: "Sunday 21:45 - 00:00",
      category: "just-for-you",
    },
    {
      id: "14",
      title: "Türkiye vs Sırbistan (Basketbol)",
      desc: "Ülker Spor ve Etkinlik Salonu, İstanbul",
      image: "assets/images/match-11.jpg",
      date: "Saturday 20:30 - 23:00",
      category: "just-for-you",
    },
    {
      id: "15",
      title: "Beşiktaş vs Trabzonspor",
      desc: "Vodafone Park, İstanbul",
      image: "assets/images/match-12.jpg",
      date: "Friday 21:00 - 23:15",
      category: "just-for-you",
    },
  ];
  // Sayfa üzerinde ilgili kategori bölümlerinin DOM elementlerini alıyoruz
  const upcoming = document.getElementById("upcoming-events");
  const last = document.getElementById("last-time-offers");
  const justForYou = document.getElementById("just-for-you-events");
  const allEvents = document.getElementById("all-events");

  // Her etkinliği tek tek işleyip ilgili bölüme kart olarak ekle
  events.forEach((event) => {
    let favBtn = "";
    // Eğer kullanıcı giriş yaptıysa kartlara favori butonu ekle
    if (isLoggedIn) {
      favBtn = `
        <button class="fav-btn">
          <i class="fa fa-heart-o"></i>
        </button>`;
    }

    // Etkinlik kartı HTML yapısı burada oluşturulur

    const card = `
      <div class="venue-item" data-id="${event.id}">
        ${favBtn}
        <div class="thumb"><img src="${event.image}" alt="${event.title}"></div>
        <div class="down-content">
          <h4>${event.title}</h4>
          <p><i class="fa fa-map-marker"></i> ${event.desc}</p>

          <p><i class="fa fa-calendar"></i> ${event.date}</p>
          <div class="main-white-button">
            <a href="${purchaseLink}" class="purchase-link" data-id="${event.id}">Purchase Tickets</a>
          </div>
        </div>
      </div>`;

    // Etkinlik kategori bilgisine göre doğru alana kartı yerleştir
    if (event.category === "upcoming" && upcoming)
      upcoming.insertAdjacentHTML("beforeend", card);
    else if (event.category === "last" && last)
      last.insertAdjacentHTML("beforeend", card);
    else if (event.category === "just-for-you" && justForYou)
      justForYou.insertAdjacentHTML("beforeend", card);

    if (allEvents) allEvents.insertAdjacentHTML("beforeend", card);
  });

  // Slider yapısını başlatır (örneğin Owl Carousel)
  //Slider kullanımda değil.
  initSliders();

  // Favorilere ekleme sistemi sadece giriş yapılmışsa aktif edilir
  // Favori butonları
  if (isLoggedIn) {
    let favorites = JSON.parse(sessionStorage.getItem("favorites")) || [];

    // Kartlar DOM’a yerleştirildikten sonra butonları işlemek için kısa gecikme verilir
    setTimeout(() => {
      const favButtons = document.querySelectorAll(".fav-btn");

      favButtons.forEach((btn) => {
        const eventId = btn.closest(".venue-item").getAttribute("data-id");
        // Daha önce favorilere eklenmişse ikonu doldurulmuş kalp olarak göster
        if (favorites.includes(eventId)) {
          btn.classList.add("active");
          btn.querySelector("i").classList.replace("fa-heart-o", "fa-heart");
        }
        // Favori butonuna tıklandığında favoriye ekle/çıkar işlemi yapılır
        btn.addEventListener("click", () => {
          if (favorites.includes(eventId)) {
            favorites = favorites.filter((id) => id !== eventId);
            btn.classList.remove("active");
            btn.querySelector("i").classList.replace("fa-heart", "fa-heart-o");
          } else {
            favorites.push(eventId);
            btn.classList.add("active");
            btn.querySelector("i").classList.replace("fa-heart-o", "fa-heart");
          }
          // Favoriler sessionStorage’a kaydedilir
          sessionStorage.setItem("favorites", JSON.stringify(favorites));
        });
      });
    }, 500); // DOM yerleşmesi için kısa gecikme
  }
});

// Purchase Tickets tıklaması
document.body.addEventListener("click", function (e) {
  if (e.target.classList.contains("purchase-link")) {
    e.preventDefault();
    // Etkinlik ID'sini al ve sessionStorage'a kaydet
    const eventId = e.target.getAttribute("data-id");
    sessionStorage.setItem("selectedEventId", eventId);

    // Giriş durumuna göre doğru sayfaya yönlendirme yap
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    window.location.href = isLoggedIn
      ? "event-details-after-logged-in.html"
      : "event-details.html";
  }
});

// Search filtre (sadece just-for-you içindir)
function attachSearchFilter() {
  const searchInput = document.getElementById("eventSearchInput");
  if (!searchInput) return;
  // Kullanıcı her yazdığında inputa göre filtre uygulanır
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    const allOwlItems = document.querySelectorAll(
      "#just-for-you-events .owl-item"
    );

    allOwlItems.forEach((item) => {
      const titleElement = item.querySelector(".venue-item h4");
      if (!titleElement) return;

      const title = titleElement.textContent.toLowerCase();
      // Eşleşmeyen kartlar gizlenir
      item.style.display = title.includes(searchTerm) ? "block" : "none";
    });
  });
}

// Owl Carousel yüklenip tamamlandıktan sonra filtre işlevini başlatmak için gözlemci tanımlanır
function waitForOwlItemsAndAttachFilter() {
  const container = document.querySelector("#just-for-you-events .owl-stage");

  if (!container) return;

  const observer = new MutationObserver((mutations, obs) => {
    const owlItems = container.querySelectorAll(".owl-item");
    if (owlItems.length > 0) {
      attachSearchFilter(); // filtre işlevi başlatılır
      obs.disconnect(); // gözlem durdurulur
    }
  });
  // DOM’daki değişimleri gözlemler
  observer.observe(container, { childList: true, subtree: true });
}
// Sliders ve filtre sistemi başlatılır
initSliders();
waitForOwlItemsAndAttachFilter();
