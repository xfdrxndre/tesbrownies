// Ganti URL ini dengan URL Google Apps Script Anda
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

function openBuyForm(productName, price) {
    currentPrice = price;
    document.getElementById('productName').textContent = productName;
    document.getElementById('totalPrice').textContent = price.toLocaleString();
    document.getElementById('buyModal').style.display = 'block';
    updateTotal();
}

function closeBuyForm() {
    // Hanya tutup modal jika form tidak sedang dalam proses submit
    if (!isFormSubmitting) {
        document.getElementById('buyModal').style.display = 'none';
        resetForm();
    }
}

function resetForm() {
    document.getElementById('orderForm').reset();
    document.getElementById('totalPrice').textContent = currentPrice.toLocaleString();
    isFormSubmitting = false;
}

function updateTotal() {
    const quantity = document.getElementById('quantity').value;
    const total = currentPrice * quantity;
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}

function submitOrder(event) {
    event.preventDefault();
    
    if (isFormSubmitting) return; // Mencegah multiple submission
    isFormSubmitting = true;
    
    // Ambil semua data form
    const formData = {
        productName: document.getElementById('productName').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        quantity: document.getElementById('quantity').value,
        total: document.getElementById('totalPrice').textContent
    };

    // Validasi form
    if (!formData.name || !formData.email || !formData.phone || !formData.quantity) {
        alert('Mohon isi semua field yang diperlukan');
        isFormSubmitting = false;
        return;
    }

    // Membuat pesan WhatsApp
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
    
    // Buka WhatsApp di tab baru
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');
    
    // Tunggu sebentar sebelum menutup modal dan reset form
    setTimeout(() => {
        document.getElementById('buyModal').style.display = 'none';
        setTimeout(resetForm, 500); // Reset form setelah modal tertutup
    }, 1000);
}

// Event listener untuk menutup modal saat klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('buyModal');
    if (event.target == modal) {
        closeBuyForm();
    }
}

// Tambahkan event listener saat dokumen dimuat
document.addEventListener('DOMContentLoaded', function() {
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
    
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', updateTotal);
        quantityInput.addEventListener('input', updateTotal);
    }
});

// Add to mucachips.js
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            nav.classList.remove('active');
        }
    });

    // Close menu when clicking a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Menutup menu ketika link di klik
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});
