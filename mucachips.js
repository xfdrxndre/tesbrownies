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
