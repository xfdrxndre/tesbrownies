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
    // Reset form
    document.getElementById('orderForm').reset();
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

    const productName = document.getElementById('productName').textContent;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const quantity = document.getElementById('quantity').value;
    const total = document.getElementById('totalPrice').textContent;

    // Membuat pesan WhatsApp
    const message = encodeURIComponent(
        `Halo, saya ingin memesan MUCACHIPS:\n\n` +
        `Produk: ${productName}\n` +
        `Jumlah: ${quantity}\n` +
        `Total: Rp ${total}\n\n` +
        `Detail Pembeli:\n` +
        `Nama: ${name}\n` +
        `Email: ${email}\n` +
        `WhatsApp: ${phone}\n\n` +
        `Mohon diproses, terima kasih!`
    );

    // Ganti nomor WhatsApp admin di sini
    const adminPhone = '6281554370247';
    
    // Redirect ke WhatsApp
    window.location.href = `https://wa.me/${adminPhone}?text=${message}`;
}

// Event listener untuk menutup modal saat klik di luar modal
window.onclick = function(event) {
    const modal = document.getElementById('buyModal');
    if (event.target == modal) {
        closeBuyForm();
    }
}