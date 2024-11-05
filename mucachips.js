// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk mengupdate total harga saat jumlah berubah
function updateTotal() {
    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const basePrice = 10000;
    const total = quantity * basePrice;
    document.getElementById("totalPrice").textContent = total.toLocaleString('id-ID');
}

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
    document.getElementById("buyModal").style.display = "block";
    document.getElementById("productName").textContent = productName;
    document.getElementById("totalPrice").textContent = price.toLocaleString('id-ID');
    document.getElementById("quantity").value = "1";
    updateTotal();
}

// Fungsi untuk menutup modal
function closeBuyForm() {
    document.getElementById("buyModal").style.display = "none";
    document.getElementById("orderForm").reset();
}

// Fungsi untuk mengirim pesanan via WhatsApp
function submitOrder(event) {
    event.preventDefault();
    console.log("Form submitted"); // Debug log

    // Ambil data dari form
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const quantity = document.getElementById("quantity").value;
    const productName = document.getElementById("productName").textContent;
    const totalPrice = document.getElementById("totalPrice").textContent;

    // Buat pesan WhatsApp
    const message = `Halo, saya ingin memesan:\n\n` +
                   `Produk: ${productName}\n` +
                   `Nama: ${name}\n` +
                   `Email: ${email}\n` +
                   `WhatsApp: ${phone}\n` +
                   `Jumlah: ${quantity}\n` +
                   `Total: Rp ${totalPrice}\n\n` +
                   `Mohon konfirmasi pesanan saya. Terima kasih!`;

    // Nomor WhatsApp tujuan (ganti dengan nomor yang benar)
    const waNumber = "6281554370247";

    // Buat URL WhatsApp
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

    // Log URL untuk debugging
    console.log("WhatsApp URL:", waUrl);

    // Buka WhatsApp
    window.open(waUrl, '_blank');
    
    // Tutup modal
    closeBuyForm();
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Input quantity
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener("change", updateTotal);
    }

    // Close button
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeBuyForm);
    }

    // Click outside modal
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
