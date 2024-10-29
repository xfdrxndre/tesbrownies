// Ganti URL ini dengan URL Google Apps Script Anda
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec';
// Variabel global untuk menyimpan harga produk saat ini
let currentPrice = 0;

// Fungsi untuk membuka form pembelian
function openBuyForm(productName, price) {
    currentPrice = price;
    document.getElementById('productName').textContent = productName;
    document.getElementById('totalPrice').textContent = price.toLocaleString();
    document.getElementById('buyModal').style.display = 'block';
    updateTotal(); // Update total saat pertama kali dibuka
}

// Fungsi untuk menutup form
function closeBuyForm() {
    document.getElementById('buyModal').style.display = 'none';
    // Reset form dengan timeout untuk memastikan data tidak hilang sebelum WhatsApp terbuka
    setTimeout(() => {
        document.getElementById('orderForm').reset();
        document.getElementById('totalPrice').textContent = '0';
    }, 1000);
}

// Fungsi untuk update total harga
function updateTotal() {
    const quantity = document.getElementById('quantity').value;
    const total = currentPrice * quantity;
    document.getElementById('totalPrice').textContent = total.toLocaleString();
}

// Fungsi untuk submit pesanan
function submitOrder(event) {
    event.preventDefault();
    
    // Ambil semua data form
    const formData = {
        productName: document.getElementById('productName').textContent,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        quantity: document.getElementById('quantity').value,
        total: document.getElementById('totalPrice').textContent
    };

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

    // Ganti nomor WhatsApp admin di sini
    const adminPhone = '6281554370247';
    
    // Buka WhatsApp di tab baru
    window.open(`https://wa.me/${adminPhone}?text=${message}`, '_blank');
    
    // Tutup modal setelah membuka WhatsApp
    closeBuyForm();
    
    // Reset form setelah beberapa detik
    setTimeout(() => {
        document.getElementById('orderForm').reset();
        updateTotal();
    }, 1500);
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
    // Tambahkan event listener untuk form
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', submitOrder);
    }
    
    // Tambahkan event listener untuk quantity
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', updateTotal);
        quantityInput.addEventListener('input', updateTotal);
    }
});

// Intersection Observer untuk animasi scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Hentikan observasi setelah animasi
            }
        });
    }, observerOptions);

    // Tambahkan class fade-in ke semua elemen yang ingin dianimasi
    const fadeElements = document.querySelectorAll('.product-card, .about-content, .contact-info');
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
});

// Tambahkan efek ripple pada tombol
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    
    const diameter = Math.max(rect.width, rect.height);
    const radius = diameter / 2;
    
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.classList.add('ripple');
    
    const rippleContainer = button.getElementsByClassName('ripple')[0];
    if (rippleContainer) {
        rippleContainer.remove();
    }
    
    button.appendChild(ripple);
}

// Tambahkan event listener untuk efek ripple pada semua tombol
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', createRipple);
});
