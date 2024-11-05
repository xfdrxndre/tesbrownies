// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk mengupdate total harga saat jumlah berubah
function updateTotal() {
    const quantity = parseInt(document.getElementById("quantity").value);
    const basePrice = 10000; // Harga dasar produk
    const total = quantity * basePrice;
    document.getElementById("totalPrice").textContent = total.toLocaleString();
}

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
    currentPrice = price;
    document.getElementById("productName").textContent = productName;
    document.getElementById("totalPrice").textContent = price.toLocaleString();
    document.getElementById("buyModal").style.display = "block";
    
    // Reset quantity ke 1 setiap kali modal dibuka
    document.getElementById("quantity").value = "1";
    updateTotal();
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
    const totalPrice = parseInt(document.getElementById("totalPrice").textContent.replace(/,/g, ''));

    // Format nomor WhatsApp
    let waNumber = "6281554370247"; // Nomor WhatsApp tujuan
    
    // Buat pesan WhatsApp dengan format yang benar
    let message = `Halo, saya ingin memesan *${productName}* dengan rincian sebagai berikut:%0A%0A`;
    message += `Nama: ${name}%0A`;
    message += `Email: ${email}%0A`;
    message += `No. WhatsApp: ${phone}%0A`;
    message += `Jumlah: ${quantity}%0A`;
    message += `Total Harga: Rp ${totalPrice.toLocaleString()}%0A%0A`;
    message += `Tolong segera konfirmasi pesanan saya. Terima kasih!`;

    // Buat URL WhatsApp dengan format yang benar
    const waUrl = `https://wa.me/${waNumber}?text=${message}`;
    
    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');

    // Tutup modal
    closeBuyForm();
}

// Event listener untuk input jumlah
document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener("change", updateTotal);
        quantityInput.addEventListener("input", updateTotal);
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
