// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
const WA_NUMBER = '6281554370247';
const BASE_PRICE = 10000;

// Fungsi untuk memformat harga
function formatPrice(price) {
    return price.toLocaleString('id-ID');
}

// Fungsi untuk membuka form pemesanan
function openBuyForm(productName, price) {
    const modal = document.getElementById("buyModal");
    document.getElementById("productName").textContent = productName;
    document.getElementById("totalPrice").textContent = formatPrice(price);
    document.getElementById("quantity").value = "1";
    modal.style.display = "block";
}

// Fungsi untuk menutup form
function closeBuyForm() {
    document.getElementById("buyModal").style.display = "none";
    document.getElementById("orderForm").reset();
}

// Fungsi untuk update total harga
function updateTotal() {
    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const total = quantity * BASE_PRICE;
    document.getElementById("totalPrice").textContent = formatPrice(total);
}

// Fungsi utama untuk mengirim pesanan
function submitOrder(event) {
    event.preventDefault();

    // Ambil data dari form
    const productName = document.getElementById("productName").textContent;
    const quantity = document.getElementById("quantity").value;
    const total = parseInt(document.getElementById("totalPrice").textContent.replace(/\D/g, ''));
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    // Validasi nomor telepon
    if (phone.length < 10 || phone.length > 13) {
        alert("Nomor WhatsApp harus antara 10-13 digit!");
        return;
    }

    // Buat pesan sesuai format yang diminta
    const message = 
`Halo, saya ingin memesan MUCACHIPS:
Produk: ${productName}
Jumlah: ${quantity}
Total: Rp ${formatPrice(total)}
Detail Pembeli:
Nama: ${name}
Email: ${email}
WhatsApp: ${phone}
Mohon diproses, terima kasih!`;

    // Buka WhatsApp di tab baru dengan pesan yang sudah di-encode
    const waUrl = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');

    // Tutup modal
    closeBuyForm();
}

// Hapus event listeners karena sudah menggunakan inline events di HTML
// Tapi tetap menginisialisasi nilai awal saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Set nilai awal total price jika ada
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement && totalPriceElement.textContent === "0") {
        totalPriceElement.textContent = formatPrice(BASE_PRICE);
    }
});
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
