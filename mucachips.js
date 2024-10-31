// Configuration
const CONFIG = {
    SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbznoObsh4CSBhZv26Ur3x3zVe66CykFKAvUWuBc12UnvyjgIHNoPECkzs4t_yU7ry2f/exec',
    ADMIN_PHONE: '6281554370247'
};

// State Management
const state = {
    currentPrice: 0,
    isFormSubmitting: false
};

// Form Handling Functions
const formHandlers = {
    openBuyForm(productName, price) {
        state.currentPrice = price;
        document.getElementById('productName').textContent = productName;
        document.getElementById('totalPrice').textContent = price.toLocaleString();
        document.getElementById('buyModal').style.display = 'block';
        this.updateTotal();
    },

    closeBuyForm() {
        if (!state.isFormSubmitting) {
            document.getElementById('buyModal').style.display = 'none';
            this.resetForm();
        }
    },

    resetForm() {
        document.getElementById('orderForm').reset();
        document.getElementById('totalPrice').textContent = state.currentPrice.toLocaleString();
        state.isFormSubmitting = false;
    },

    updateTotal() {
        const quantity = document.getElementById('quantity').value;
        const total = state.currentPrice * quantity;
        document.getElementById('totalPrice').textContent = total.toLocaleString();
    },

    async submitOrder(event) {
        event.preventDefault();
        if (state.isFormSubmitting) return;
        
        state.isFormSubmitting = true;

        // Get form data
        const formData = {
            productName: document.getElementById('productName').textContent,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            quantity: document.getElementById('quantity').value,
            total: document.getElementById('totalPrice').textContent
        };

        // Validate form
        if (!this.validateForm(formData)) {
            state.isFormSubmitting = false;
            return;
        }

        // Create WhatsApp message
        const message = this.createWhatsAppMessage(formData);

        // Open WhatsApp in new tab
        window.open(`https://wa.me/${CONFIG.ADMIN_PHONE}?text=${message}`, '_blank');

        // Close modal and reset form
        setTimeout(() => {
            document.getElementById('buyModal').style.display = 'none';
            setTimeout(() => this.resetForm(), 500);
        }, 1000);
    },

    validateForm(formData) {
        if (!formData.name || !formData.email || !formData.phone || !formData.quantity) {
            alert('Mohon isi semua field yang diperlukan');
            return false;
        }
        return true;
    },

    createWhatsAppMessage(formData) {
        return encodeURIComponent(
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
    }
};

// Navigation Menu Handlers
const navigationHandlers = {
    toggleMenu(navMenu, toggleButton) {
        navMenu.classList.toggle('active');
        toggleButton.classList.toggle('active');
    },

    closeMenu(navMenu, toggleButton) {
        navMenu.classList.remove('active');
        toggleButton.classList.remove('active');
    },

    setupNavigation() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburger && navMenu) {
            // Hamburger click event
            hamburger.addEventListener('click', () => {
                this.toggleMenu(navMenu, hamburger);
            });

            // Navigation link click events
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu(navMenu, hamburger);
                });
            });

            // Click outside navigation
            document.addEventListener('click', (event) => {
                const isClickInside = navMenu.contains(event.target) || 
                                    hamburger.contains(event.target);
                
                if (!isClickInside && navMenu.classList.contains('active')) {
                    this.closeMenu(navMenu, hamburger);
                }
            });
        }
    }
};

// Modal Handlers
const modalHandlers = {
    setupModal() {
        window.onclick = (event) => {
            const modal = document.getElementById('buyModal');
            if (event.target === modal) {
                formHandlers.closeBuyForm();
            }
        };
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    // Setup Form Events
    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => formHandlers.submitOrder(e));
    }

    // Setup Quantity Input Events
    const quantityInput = document.getElementById('quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', () => formHandlers.updateTotal());
        quantityInput.addEventListener('input', () => formHandlers.updateTotal());
    }

    // Setup Navigation
    navigationHandlers.setupNavigation();

    // Setup Modal
    modalHandlers.setupModal();
});

// Make necessary functions globally available
window.openBuyForm = (productName, price) => formHandlers.openBuyForm(productName, price);
window.closeBuyForm = () => formHandlers.closeBuyForm();
