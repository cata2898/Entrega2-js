// Recuperar carrito desde Local Storage o inicializarlo vacío
let cart = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para mostrar productos en el DOM
function mostrarProductos(productos) {
    const listaDeProductos = document.getElementById('producto-list');
    listaDeProductos.innerHTML = ''; // Limpiar lista antes de agregar productos

    productos.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-item');
        productoDiv.dataset.id = producto.id;
        productoDiv.dataset.nombre = producto.nombre;
        productoDiv.dataset.precio = producto.precio;

        productoDiv.innerHTML = `
            <img src="./img/${producto.nombre.toLowerCase().replace(' ', '-')}.jpg" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>Precio: $ ${producto.precio.toFixed(2)}</p>
            <button type="button">Agregar Producto al carrito</button>
        `;

        listaDeProductos.appendChild(productoDiv);
    });

    // Agregar eventos para los botones "Agregar Producto al carrito"
    document.querySelectorAll('.producto-item button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productoItem = button.parentElement;
            const productoId = parseInt(productoItem.dataset.id);
            addToCart(productoId);
        });
    });
}

// Función para agregar un producto al carrito
function addToCart(productoId) {
    fetch('instrumentos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const productos = data.instrumentos;
            const producto = productos.find(p => p.id === productoId);
            if (producto) {
                cart.push(producto);
                updateCart();
            }
        })
        .catch(error => console.error('Error al cargar los productos:', error));
}

// Función para actualizar el carrito en el DOM y en Local Storage
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        cartItems.appendChild(li);
        total += item.precio;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);

    // Guardar el carrito actualizado en Local Storage
    localStorage.setItem('carrito', JSON.stringify(cart));
}

// Función para vaciar el carrito
function emptyCart() {
    cart = [];
    updateCart();
}

// Función para ir a pagar
function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío. Agrega productos antes de proceder.");
        return;
    }

    // Redirigir a la página de pago
    window.location.href = 'checkout.html';
}

// Eventos del DOM
document.addEventListener('DOMContentLoaded', () => {
    // Cargar productos desde el archivo JSON
    fetch('instrumentos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la red: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            mostrarProductos(data.instrumentos);
        })
        .catch(error => console.error('Error al cargar los productos:', error));

    updateCart();  // Actualizar la vista del carrito al cargar la página

    document.getElementById('empty-cart-button').addEventListener('click', emptyCart);
    document.getElementById('checkout-button').addEventListener('click', checkout);
});
