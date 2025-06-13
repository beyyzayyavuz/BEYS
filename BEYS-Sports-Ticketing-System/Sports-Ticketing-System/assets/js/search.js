// Arama filtresi özelliğini aktif hale getirir
function attachSearchFilter() {
  const searchInput = document.getElementById("eventSearchInput");
  // Arama kutusu sayfada bulunamazsa uyarı verip işlemi durdur
  if (!searchInput) {
    console.warn("Search input not found!");
    return;
  }
  // Kullanıcı her tuşa bastığında çalışacak olay
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();

    // "Just for you" alanındaki tüm owl-item'ları al (slider kartları)
    const owlItems = document.querySelectorAll(
      "#just-for-you-events .owl-item"
    );
    // Her kartın içindeki başlığı al
    owlItems.forEach((item) => {
      const titleElement = item.querySelector(".venue-item h4");
      if (!titleElement) return;

      const title = titleElement.textContent.toLowerCase();
      // Arama kelimesi başlıkta geçiyorsa göster, geçmiyorsa gizle
      item.style.display = title.includes(searchTerm) ? "block" : "none";
    });
  });
}
// Arama kelimesi başlıkta geçiyorsa göster, geçmiyorsa gizle
function waitForOwlItemsAndStartFilter() {
  const container = document.querySelector("#just-for-you-events .owl-stage");
  // Eğer slider sahnesi sayfada yoksa işlemi iptal et
  if (!container) {
    console.warn("Owl stage not found");
    return;
  }
  // DOM'a yeni owl-item eklendiğinde kontrol et
  const observer = new MutationObserver((mutations, obs) => {
    const owlItems = container.querySelectorAll(".owl-item");
    // Eğer owl-item'lar yüklenmişse arama filtresini başlat
    if (owlItems.length > 0) {
      attachSearchFilter();
      // Tek seferlik gözlem yeterli, daha fazlasına gerek yok
      obs.disconnect(); // bir kere çalışsın yeter
    }
  });
  // Gözlem başlatılır: çocuk elemanlarda değişiklik olursa tetiklenir
  observer.observe(container, { childList: true, subtree: true });
}
// Sayfa tamamen yüklendikten sonra arama filtresi başlatma işlemi tetiklenir
document.addEventListener("DOMContentLoaded", () => {
  waitForOwlItemsAndStartFilter();
});
