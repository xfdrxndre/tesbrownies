const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
const WA_NUMBER = '6281554370247';
const BASE_PRICE = 10000;

// Fungsi untuk memformat harga dengan memastikan minimal 4 digit
function formatPrice(price) {
    const numPrice = typeof price === 'string' ? parseInt(price.replace(/\D/g, '')) : price;
    return numPrice.toLocaleString('id-ID');
}

// Fungsi untuk membuka form pemesanan
function openBuyForm(productName, price) {
    const modal = document.getElementById("buyModal");
    if (modal && productName) {
        document.getElementById("productName").textContent = productName;
        document.getElementById("totalPrice").textContent = formatPrice(price);
        document.getElementById("quantity").value = "1";
        modal.style.display = "block";
        updateTotal(); // Pastikan total terupdate saat modal dibuka
    }
}

// Fungsi untuk menutup form
function closeBuyForm() {
    const modal = document.getElementById("buyModal");
    if (modal) {
        modal.style.display = "none";
        const form = document.getElementById("orderForm");
        if (form) {
            form.reset();
        }
    }
}

// Fungsi untuk update total harga
function updateTotal() {
    const quantityInput = document.getElementById("quantity");
    const totalPriceElement = document.getElementById("totalPrice");
    
    if (quantityInput && totalPriceElement) {
        const quantity = parseInt(quantityInput.value) || 1;
        const total = quantity * BASE_PRICE;
        totalPriceElement.textContent = formatPrice(total);
    }
}

// Fungsi utama untuk mengirim pesanan
function submitOrder(event) {
    event.preventDefault();

    const productName = document.getElementById("productName").textContent;
    const quantity = document.getElementById("quantity").value;
    const total = parseInt(document.getElementById("totalPrice").textContent.replace(/\D/g, ''));
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (phone.length < 10 || phone.length > 13) {
        alert("Nomor WhatsApp harus antara 10-13 digit!");
        return;
    }

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

    const waUrl = `https://api.whatsapp.com/send?phone=${WA_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    closeBuyForm();
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", function() {
    const totalPriceElement = document.getElementById("totalPrice");
    if (totalPriceElement) {
        totalPriceElement.textContent = formatPrice(BASE_PRICE);
    }

    const quantityInput = document.getElementById("quantity");
    if (quantityInput) {
        quantityInput.addEventListener('input', updateTotal);
        quantityInput.addEventListener('change', updateTotal);
    }

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

    document.addEventListener('click', function(event) {
        const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
        if (!isClickInside && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Tombol "Pelajari Lebih Lanjut"
    const learnMoreButton = document.querySelector(".learn-more");
    const additionalInfo = document.querySelector(".additional-info");

    if (learnMoreButton && additionalInfo) {
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
    }

    // Hamburger Menu
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

        document.addEventListener('click', function(event) {
            const isClickInside = navMenuHamburger.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && navMenuHamburger.classList.contains('active')) {
                navMenuHamburger.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // Toggle Menu pada Tampilan Mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        document.addEventListener('click', function(event) {
            const isClickInside = navMenu.contains(event.target) || menuToggle.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    }
});
