//Lista de productos

const productos = [
    { id: 1, nombre: "Piano", precio: 400.00 },
    { id: 2, nombre: "Guitarra acústica", precio: 120.00 },
    { id: 3, nombre: "Violín", precio: 150.00 },
    { id: 4, nombre: "Batería", precio: 350.00 }
];

let cart = [];

// Función para mostrar productos en el DOM
function mostrarProductos() {
    const listaDeProductos = document.getElementById('producto-list');
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
}

// Función para agregar un producto al carrito
function addToCart(productoId) {
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
        cart.push(producto);
        updateCart();
    }
}

// Función para actualizar el carrito en el DOM
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

    // despues creare otro html que sea el del pago
    alert("Procediendo al pago...");

}

// Eventos del DOM
document.addEventListener('DOMContentLoaded', () => {
    mostrarProductos();

    document.querySelectorAll('.producto-item button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productoItem = button.parentElement;
            const productoId = parseInt(productoItem.dataset.id);
            addToCart(productoId);
        });
    });

    document.getElementById('empty-cart-button').addEventListener('click', emptyCart);
    document.getElementById('checkout-button').addEventListener('click', checkout);
});
