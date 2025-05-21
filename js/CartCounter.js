function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const count = cartItems.reduce((total, item) => total + parseInt(item.quantity || 1), 0);
    const cartCountElement = document.getElementById('cartCount');
    
    if (cartCountElement) {
        cartCountElement.textContent = count;
        
        if (count === 0) {
            cartCountElement.classList.add('d-none');
        } else {
            cartCountElement.classList.remove('d-none');
        }
    }
}
 
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount(); 
    setInterval(updateCartCount, 2000);
}); 