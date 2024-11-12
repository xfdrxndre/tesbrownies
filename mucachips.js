// URL Google Apps Script untuk pemesanan
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
const WA_NUMBER = '6281554370247'; // Nomor WhatsApp admin
const BASE_PRICE = 10000; // Harga dasar produk

// State management
let currentPrice = 0;
let isFormSubmitting = false;

// Fungsi untuk memformat angka ke format rupiah
function formatRupiah(number) {
    return number.toLocaleString('id-ID');
}

// Fungsi untuk validasi input
function validateInput(input, type) {
    const patterns = {
        phone: /^[0-9]{10,13}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        name: /^[a-zA-Z\s]{2,50}$/
    };
    
    return patterns[type]?.test(input) ?? false;
}

// Fungsi untuk mengupdate total harga saat jumlah berubah
function updateTotal() {
    const quantity = parseInt(document.getElementById("quantity").value) || 1;
    const total = quantity * BASE_PRICE;
    currentPrice = total;
    document.getElementById("totalPrice").textContent = formatRupiah(total);
}

// Fungsi untuk membuka modal pemesanan
function openBuyForm(productName, price) {
    const modal = document.getElementById("buyModal");
    const productNameSpan = document.getElementById("productName");
    const totalPriceSpan = document.getElementById("totalPrice");
    const quantityInput = document.getElementById("quantity");

    // Reset form dan state
    isFormSubmitting = false;
    document.getElementById("orderForm").reset();
    
    productNameSpan.textContent = productName;
    totalPriceSpan.textContent = formatRupiah(price);
    currentPrice = price;
    
    quantityInput.value = "1";
    updateTotal();
    
    modal.style.display = "block";
}

// Fungsi untuk menutup modal
function closeBuyForm() {
    const modal = document.getElementById("buyModal");
    modal.style.display = "none";
    document.getElementById("orderForm").reset();
    isFormSubmitting = false;
}

// Fungsi untuk mengirim pesanan via WhatsApp
async function submitOrder(event) {
    event.preventDefault();
    
    if (isFormSubmitting) return;
    isFormSubmitting = true;

    try {
        // Ambil dan validasi data dari formulir
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            quantity: document.getElementById("quantity").value,
            productName: document.getElementById("productName").textContent,
            totalPrice: currentPrice
        };

        // Validasi input
        if (!validateInput(formData.phone, 'phone')) {
            alert("Nomor WhatsApp tidak valid! Pastikan 10-13 digit.");
            isFormSubmitting = false;
            return;
        }

        if (!validateInput(formData.email, 'email')) {
            alert("Format email tidak valid!");
            isFormSubmitting = false;
            return;
        }

        // Buat pesan WhatsApp dengan format yang lebih rapi
        const message = `Halo, saya ingin memesan *${formData.productName}* dengan rincian sebagai berikut:

*Detail Pemesan:*
📝 Nama: *${formData.name}*
📧 Email: ${formData.email}
📱 WhatsApp: *${formData.phone}*

*Detail Pesanan:*
🛍️ Produk: *${formData.productName}*
📦 Jumlah: *${formData.quantity}*
💰 Total: *Rp ${formatRupiah(formData.totalPrice)}*

Mohon konfirmasi pesanan saya. Terima kasih! 🙏`;

        // Encode pesan untuk URL WhatsApp
        const waUrl = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;

        // Simpan data ke spreadsheet jika diperlukan
        try {
            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(formData)
            });
            
            if (!response.ok) {
                throw new Error('Gagal menyimpan data');
            }
        } catch (error) {
            console.error('Error saving to spreadsheet:', error);
            // Lanjutkan ke WhatsApp meskipun penyimpanan gagal
        }

        // Buka WhatsApp di tab baru
        window.open(waUrl, '_blank');
        
        // Tutup modal setelah berhasil
        closeBuyForm();
    } catch (error) {
        console.error('Error in order submission:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
        isFormSubmitting = false;
    }
}

// Event listeners
document.addEventListener("DOMContentLoaded", function() {
    // Setup quantity input listener
    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener("input", updateTotal);
    }

    // Setup modal close button
    const closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener("click", closeBuyForm);
    }

    // Setup modal outside click
    window.addEventListener("click", function(event) {
        const modal = document.getElementById("buyModal");
        if (event.target === modal) {
            closeBuyForm();
        }
    });

    // Setup form submission
    const orderForm = document.getElementById("orderForm");
    if (orderForm) {
        orderForm.addEventListener("submit", submitOrder);
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
