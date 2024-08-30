document.addEventListener('DOMContentLoaded', () => {
    // Recuperar el carrito desde Local Storage
    const cart = JSON.parse(localStorage.getItem('carrito')) || [];
    const cartItems = document.getElementById('cart-items');
    let total = 0;

    // Mostrar los productos del carrito en la página de pago
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.precio;
    });

    // Mostrar el total
    document.getElementById('total-price').textContent = total.toFixed(2);

    // Manejar el envío del formulario de pago
    const paymentForm = document.getElementById('payment-form');
    paymentForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Validar los campos del formulario
        const name = document.getElementById('name').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiration = document.getElementById('expiration').value.trim();
        const cvv = document.getElementById('cvv').value.trim();

        if (!name || !cardNumber || !expiration || !cvv) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            alert('Por favor, ingresa un número de tarjeta válido de 16 dígitos.');
            return;
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            alert('Por favor, ingresa un CVV válido de 3 o 4 dígitos.');
            return;
        }

        // Simular el procesamiento del pago
        alert('Pago confirmado. ¡Gracias por tu compra!');

        // Limpiar el carrito después del pago
        localStorage.removeItem('carrito');

        // Redirigir a la página principal u otra página después del pago
        window.location.href = 'index.html';
    });
});

//Luego arreglare la parte del pago con css para que quede mas bonita pero no me da el tiempo
