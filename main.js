// Variables para almacenar el carrito
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar la vista del carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    
    // Limpiar el contenido actual del carrito en el DOM
    cartItems.innerHTML = '';

    // Calcular el total
    let totalPrice = 0;

    // Renderizar los productos en el carrito
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.nombre} - $${product.precio}`;
        
        // Botón para eliminar un producto del carrito
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Eliminar';
        removeButton.addEventListener('click', () => {
            removeFromCart(index);
        });
        
        li.appendChild(removeButton);
        cartItems.appendChild(li);

        totalPrice += parseFloat(product.precio);
    });

    // Actualizar el precio total
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Guardar el carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para agregar un producto al carrito
function addToCart(productoId) {
    const productoItem = document.querySelector(`.producto-item[data-id="${productoId}"]`);
    const nombre = productoItem.dataset.nombre;
    const precio = productoItem.dataset.precio;

    // Crear objeto del producto
    const producto = { id: productoId, nombre, precio };

    // Agregar el producto al carrito
    cart.push(producto);
    
    // Actualizar la vista del carrito
    updateCart();
}

// Función para eliminar un producto del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

// Función para vaciar el carrito
function emptyCart() {
    cart = [];
    updateCart();
}

// Función para ir al pago
function checkout() {
    alert('Redirigiendo a la página de pago...');
    window.location.href = "./checkout.html"
    // Aquí redirigirías a la página de pago o manejarías el proceso de pago
}

// Agregar funcionalidad a los botones "Agregar Producto al carrito"
document.querySelectorAll('.botonAgregar').forEach(button => {
    button.addEventListener('click', (event) => {
        const productoItem = button.parentElement;
        const productoId = parseInt(productoItem.dataset.id);
        addToCart(productoId);
    });
});

// Vaciar el carrito
document.getElementById('empty-cart-button').addEventListener('click', emptyCart);

// Ir a pagar
document.getElementById('checkout-button').addEventListener('click', checkout);

// Actualizar la vista del carrito al cargar la página
updateCart();
