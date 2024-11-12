// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
const WA_NUMBER = '6281554370247';
const BASE_PRICE = 10000;

// Fungsi untuk memformat harga dengan memastikan minimal 4 digit
function formatPrice(price) {
    // Pastikan price adalah number
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/\D/g, '')) : price;
    // Format dengan pemisah ribuan dan minimal 4 digit
    return numPrice.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        minimumSignificantDigits: 4
    });
}

// Fungsi untuk membuka form pemesanan
function openBuyForm(productName, price) {
    const modal = document.getElementById("buyModal");
    document.getElementById("productName").textContent = productName;
    document.getElementById("totalPrice").textContent = formatPrice(price);
    document.getElementById("quantity").value = "1";
    modal.style.display = "block";
    updateTotal(); // Pastikan total terupdate saat modal dibuka
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
    const totalPriceElement = document.getElementById("totalPrice");
    
    // Update tampilan total dengan format yang benar
    if (totalPriceElement) {
        totalPriceElement.textContent = formatPrice(total);
    }
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

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    // Set nilai awal total price
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
        totalPriceElement.textContent = formatPrice(BASE_PRICE);
    }

    // Tambahkan event listener untuk input quantity
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        // Gunakan 'input' event untuk update real-time
        quantityInput.addEventListener('input', updateTotal);
        // Tambahkan juga 'change' event untuk kompatibilitas
        quantityInput.addEventListener('change', updateTotal);
    }

    // Setup "Pelajari Lebih Lanjut" button
    const learnMoreButton = document.querySelector(".learn-more");
    const additionalInfo = document.querySelector(".additional-info");

    if (additionalInfo) {
        additionalInfo.style.display = "none";
    }

    if (learnMoreButton && additionalInfo) {
        learnMoreButton.addEventListener("click", function() {
            if (additionalInfo.style.display === "none") {
                additionalInfo.style.display = "block";
                learnMoreButton.textContent = "Tutup";
            } else {
                additionalInfo.style.display = "none";
                learnMoreButton.textContent = "Pelajari Lebih Lanjut";
            }
        });
    }

    // Setup hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navMenuHamburger = document.querySelector(".nav-menu");

    if (hamburger && navMenuHamburger) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenuHamburger.classList.toggle("active");
        });

        document.querySelectorAll(".nav-menu a").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenuHamburger.classList.remove("active");
        }));
    }
});

// Menu toggle untuk mobile
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
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
}

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
