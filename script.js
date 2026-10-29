// nsh.editz — interaksi ringan untuk website toko digital
// PENTING: ganti nomor di bawah dengan nomor WhatsApp tokomu.
// Gunakan kode negara, tanpa tanda +, spasi, atau strip. Contoh format Indonesia: 62812xxxxxxxx.
const WHATSAPP_NUMBER = "6281234567890"; // GANTI dengan nomor WhatsApp milikmu!

// Tahun di footer otomatis mengikuti tahun sekarang.
document.querySelectorAll(".year").forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// Menu navigasi untuk layar HP.
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });
}

// Tombol tema terang/gelap. Pilihan disimpan di browser pengunjung.
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  const savedTheme = localStorage.getItem("nsh-theme");
  if (savedTheme === "dark") document.body.classList.add("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const dark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = dark ? "☀" : "☾";
    localStorage.setItem("nsh-theme", dark ? "dark" : "light");
  });
}

// Filter dan pencarian di halaman produk.
const productGrid = document.getElementById("productGrid");
if (productGrid) {
  const searchInput = document.getElementById("productSearch");
  const filterButtons = document.querySelectorAll(".filter-button");
  let activeFilter = "all";

  function updateProducts() {
    const query = (searchInput?.value || "").toLowerCase().trim();
    productGrid.querySelectorAll(".product-card").forEach((card) => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = (card.dataset.name + " " + card.innerText).toLowerCase().includes(query);
      card.hidden = !(matchesCategory && matchesSearch);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      activeFilter = button.dataset.filter;
      updateProducts();
    });
  });
  searchInput?.addEventListener("input", updateProducts);
}

// Tombol order di halaman produk/jasa mengisi nama item di formulir kontak.
document.querySelectorAll(".order-link").forEach((link) => {
  link.addEventListener("click", () => {
    const item = link.dataset.item;
    if (item) localStorage.setItem("nsh-selected-item", item);
  });
});
const itemInput = document.getElementById("itemName");
const orderType = document.getElementById("orderType");
if (itemInput) {
  const selectedItem = localStorage.getItem("nsh-selected-item");
  if (selectedItem) {
    itemInput.value = selectedItem;
    if (orderType && selectedItem.toLowerCase().includes("jasa")) orderType.value = "Jasa edit";
    else if (orderType) orderType.value = "Produk digital";
    localStorage.removeItem("nsh-selected-item");
  }
}

// Form pesanan: membuka WhatsApp dengan teks yang sudah disiapkan.
const orderForm = document.getElementById("orderForm");
if (orderForm) {
  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("customerName").value.trim();
    const type = document.getElementById("orderType").value;
    const item = document.getElementById("itemName").value.trim();
    const details = document.getElementById("orderDetails").value.trim();
    const message = [
      "Halo nsh.editz! Aku mau tanya/pesan ya.",
      "",
      "Nama: " + name,
      "Jenis pesanan: " + type,
      "Produk/jasa: " + item,
      "Detail: " + (details || "-"),
      "",
      "Mohon info harga dan proses pemesanannya. Terima kasih!"
    ].join("\n");

    const status = document.getElementById("formMessage");
    if (WHATSAPP_NUMBER === "6281234567890") {
      status.textContent = "Demo: ganti WHATSAPP_NUMBER di script.js dengan nomor tokomu sebelum website dipublikasikan.";
      return;
    }
    const url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener,noreferrer");
    status.textContent = "Pesan sudah disiapkan. Periksa kembali di WhatsApp sebelum mengirim.";
  });
}
