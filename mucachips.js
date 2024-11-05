// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk mengupdate total harga saat jumlah berubah
function updateTotal() {
    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const basePrice = 10000; // Harga dasar produk
    const total = quantity * basePrice;
    document.getElementById("totalPrice").textContent = total.toLocaleString('id-ID');
}

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
    const modal = document.getElementById("buyModal");
    const productNameSpan = document.getElementById("productName");
    const totalPriceSpan = document.getElementById("totalPrice");
    const quantityInput = document.getElementById("quantity");

    productNameSpan.textContent = productName;
    totalPriceSpan.textContent = price.toLocaleString('id-ID');
    modal.style.display = "block";
    
    // Reset form
    document.getElementById("orderForm").reset();
    quantityInput.value = "1";
    updateTotal();
}

// Fungsi untuk menutup modal
function closeBuyForm() {
    const modal = document.getElementById("buyModal");
    modal.style.display = "none";
    document.getElementById("orderForm").reset();
}

// Fungsi untuk mengirim pesanan via WhatsApp
function submitOrder(event) {
    event.preventDefault();

    // Ambil data dari formulir
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const quantity = document.getElementById("quantity").value;
    const productName = document.getElementById("productName").textContent;
    const totalPrice = parseInt(document.getElementById("totalPrice").textContent.replace(/\D/g, ''));

    // Validasi nomor telepon
    if (phone.length < 10 || phone.length > 13) {
        alert("Nomor WhatsApp harus antara 10-13 digit!");
        return;
    }

    // Format nomor WhatsApp - pastikan dimulai dengan 62
    let waNumber = "6281554370247";
    
    // Buat pesan WhatsApp
    let message = `Halo, saya ingin memesan *${productName}* dengan rincian sebagai berikut:\n\n`;
    message += `Nama: *${name}*\n`;
    message += `Email: ${email}\n`;
    message += `No. WhatsApp: *${phone}*\n`;
    message += `Jumlah: *${quantity}*\n`;
    message += `Total Harga: *Rp ${totalPrice.toLocaleString('id-ID')}*\n\n`;
    message += `Mohon konfirmasi pesanan saya. Terima kasih!`;

    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Buat URL WhatsApp
    const waUrl = `https://api.whatsapp.com/send?phone=${waNumber}&text=${encodedMessage}`;
    
    // Buka WhatsApp di tab baru
    window.open(waUrl, '_blank');
    
    // Tutup modal
    closeBuyForm();
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Event listener untuk input jumlah
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener("input", updateTotal);
    }

    // Event listener untuk tombol close modal
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeBuyForm);
    }

    // Event listener untuk klik di luar modal
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("buyModal");
        if (event.target === modal) {
            closeBuyForm();
        }
    });
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
