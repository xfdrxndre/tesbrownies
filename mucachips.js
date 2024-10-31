// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
  document.getElementById("productName").textContent = productName;
  document.getElementById("totalPrice").textContent = price.toLocaleString();
  document.getElementById("buyModal").style.display = "block";
}

// Fungsi untuk menutup modal pemesanan
function closeBuyForm() {
  document.getElementById("buyModal").style.display = "none";
}

// Fungsi untuk mengirim pesanan via WhatsApp
function submitOrder(event) {
  event.preventDefault();

  // Ambil data dari formulir
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const quantity = document.getElementById("quantity").value;
  const productName = document.getElementById("productName").textContent;
  const totalPrice = parseFloat(document.getElementById("totalPrice").textContent.replace(/,/g, ''));

  // Buat pesan WhatsApp
  let message = `Halo, saya ingin memesan *${productName}* dengan rincian sebagai berikut:\n\n`;
  message += `Nama: ${name}\n`;
  message += `Email: ${email}\n`;
  message += `No. WhatsApp: ${phone}\n`;
  message += `Jumlah: ${quantity}\n`;
  message += `Total Harga: Rp ${totalPrice.toLocaleString()}\n\n`;
  message += `Tolong segera konfirmasi pesanan saya. Terima kasih!`;

  // Buka tautan WhatsApp dengan pesan
  const url = `https://wa.me/6281554370247?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  // Tutup modal
  closeBuyForm();
}

// Event listener untuk menutup modal saat klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('buyModal');
    if (event.target == modal) {
        closeBuyForm();
    }
};

// Event listener untuk tombol "Pelajari Lebih Lanjut"
document.addEventListener("DOMContentLoaded", function() {
    const learnMoreButton = document.querySelector(".learn-more");
    const additionalInfo = document.querySelector(".additional-info");

    additionalInfo.style.display = "none";

    learnMoreButton.addEventListener("click", function() {
        if (additionalInfo.style.display === "none") {
            additionalInfo.style.display = "block";
            learnMoreButton.textContent = "Tutup";
        } else {
            additionalInfo.style.display = "none";
            learnMoreButton.textContent = "Pelajari Lebih Lanjut";
        }
    });
});

// Event listener untuk hamburger menu
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navMenuHamburger = document.querySelector(".nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenuHamburger.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenuHamburger.classList.remove("active");
    }));
});

// Event listener untuk toggle menu pada tampilan mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
menuToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Menutup menu saat klik di luar area menu
document.addEventListener('click', function(event) {
    const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
    if (!isClickInside && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});
