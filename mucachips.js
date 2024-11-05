// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';

let currentPrice = 0;
let isFormSubmitting = false; // Flag untuk mencegah multiple submission

// Fungsi untuk debugging form
function debugForm() {
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        quantity: document.getElementById('quantity').value,
        productName: document.getElementById('productName').textContent,
        totalPrice: document.getElementById('totalPrice').textContent
    };
    
    // Tampilkan data di debug output
    const debugOutput = document.getElementById('debugOutput');
    debugOutput.innerHTML = '<strong>Form Data:</strong><br>' +
        Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('<br>');
            
    // Log ke console untuk inspeksi lebih detail
    console.log('Form Data:', formData);
    
    // Generate WhatsApp URL untuk testing
    let message = `Halo, saya ingin memesan ${formData.productName} dengan rincian sebagai berikut:\n\n`;
    message += `Nama: ${formData.name}\n`;
    message += `Email: ${formData.email}\n`;
    message += `No. WhatsApp: ${formData.phone}\n`;
    message += `Jumlah: ${formData.quantity}\n`;
    message += `Total Harga: Rp ${formData.totalPrice}\n\n`;
    message += `Mohon konfirmasi pesanan saya. Terima kasih!`;
    
    const waNumber = "6281554370247";
    const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    
    debugOutput.innerHTML += '<br><br><strong>Generated WhatsApp URL:</strong><br>' +
        `<a href="${waUrl}" target="_blank" style="word-break: break-all;">${waUrl}</a>`;
}

// Update fungsi submitOrder dengan logging
function submitOrder(event) {
    event.preventDefault();
    console.log('Submit Order triggered');

    // Ambil data dari formulir
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const quantity = document.getElementById("quantity").value;
    const productName = document.getElementById("productName").textContent;
    const totalPrice = document.getElementById("totalPrice").textContent;

    console.log('Form Data Collected:', {
        name, email, phone, quantity, productName, totalPrice
    });

    // Validasi form
    if (!name || !phone || !quantity) {
        console.log('Form Validation Failed');
        alert("Mohon lengkapi semua data yang diperlukan!");
        return;
    }

    // Validasi nomor telepon
    if (phone.length < 10 || phone.length > 13) {
        console.log('Phone Validation Failed');
        alert("Nomor WhatsApp harus antara 10-13 digit!");
        return;
    }

    try {
        // Format nomor WhatsApp
        let waNumber = "6281554370247";
        
        // Buat pesan WhatsApp
        let message = `Halo, saya ingin memesan ${productName} dengan rincian sebagai berikut:\n\n`;
        message += `Nama: ${name}\n`;
        message += `Email: ${email}\n`;
        message += `No. WhatsApp: ${phone}\n`;
        message += `Jumlah: ${quantity}\n`;
        message += `Total Harga: Rp ${totalPrice}\n\n`;
        message += `Mohon konfirmasi pesanan saya. Terima kasih!`;

        console.log('Message Created:', message);

        // Encode pesan untuk URL
        const encodedMessage = encodeURIComponent(message);
        
        // Buat URL WhatsApp
        const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
        
        console.log('WhatsApp URL:', waUrl);
        
        // Buka WhatsApp di tab baru
        window.open(waUrl, '_blank');
        
        // Tutup modal
        closeBuyForm();
    } catch (error) {
        console.error('Error in submitOrder:', error);
        alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
    }
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
