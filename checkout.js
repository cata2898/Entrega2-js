// Recuperar el carrito desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para mostrar los productos del carrito en la página de pago
function showCartOnCheckout() {
    const cartItems = document.getElementById('checkout-cart-items');
    const totalPriceElement = document.getElementById('checkout-total-price');
    
    // Limpiar el contenido actual
    cartItems.innerHTML = '';

    let totalPrice = 0;

    // Mostrar los productos del carrito
    cart.forEach(product => {
        const li = document.createElement('li');
        li.textContent = `${product.nombre} - $${product.precio}`;
        cartItems.appendChild(li);

        totalPrice += parseFloat(product.precio);
    });

    // Actualizar el precio total
    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Función para confirmar el pago
function confirmPayment() {
    alert("Gracias por su compra");

    // Vaciar el carrito en localStorage
    localStorage.removeItem('cart');

    // Redirigir a la página principal después de hacer clic en "Aceptar"
    window.location.href = "index.html";  // Cambia "index.html" por la página principal de tu sitio
}

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', showCartOnCheckout);

// Evento para el botón de "Confirmar Pago"
document.getElementById('confirm-payment-button').addEventListener('click', confirmPayment);

//Luego arreglare la parte del pago con css para que quede mas bonita pero no me da el tiempo
