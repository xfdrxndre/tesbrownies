// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
    currentPrice = price;
    document.getElementById('productName').textContent = productName;
    document.getElementById('totalPrice').textContent = price.toLocaleString();
    document.getElementById('buyModal').style.display = 'block';
    updateTotal();
}

// Fungsi untuk menutup modal pemesanan
function closeBuyForm() {
    if (!isFormSubmitting) {
        document.getElementById('buyModal').style.display = 'none';
        resetForm();
    }
}

// Fungsi untuk mereset form pemesanan
function resetForm() {
    document.getElementById('orderForm').reset();
    document.getElementById('totalPrice').textContent = currentPrice.toLocaleString();
    isFormSubmitting = false;
}

// Fungsi untuk memperbarui total harga berdasarkan jumlah
function updateTotal() {
    const quantity = document.getElementById('quantity').value;
    const total = currentPrice * quantity;
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}

// Fungsi untuk mengirim pesanan via WhatsApp
function submitOrder(event) {
    event.preventDefault();
    if (isFormSubmitting) return;

    isFormSubmitting = true;
    const formData = {
        productName: document.getElementById('productName').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        quantity: document.getElementById('quantity').value,
        total: document.getElementById('totalPrice').textContent
    };

    if (!formData.name || !formData.email || !formData.phone || !formData.quantity) {
        alert('Mohon isi semua field yang diperlukan');
        isFormSubmitting = false;
        return;
    }

    const message = encodeURIComponent(
        `Halo, saya ingin memesan MUCACHIPS:\n\n` +
        `Produk: ${formData.productName}\n` +
        `Jumlah: ${formData.quantity}\n` +
        `Total: Rp ${formData.total}\n\n` +
        `Detail Pembeli:\n` +
        `Nama: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `WhatsApp: ${formData.phone}\n\n` +
        `Mohon diproses, terima kasih!`
    );

    const adminPhone = '6281554370247';
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');

    setTimeout(() => {
        document.getElementById('buyModal').style.display = 'none';
        setTimeout(resetForm, 500);
    }, 1000);
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
