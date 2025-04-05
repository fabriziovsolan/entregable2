// Variables

const products = [
    {
        id: 1,
        title: "Remera",
        price: "$15000.00",
        image: "./src/assets/products/remera.webp",
    },
    {
        id: 2,
        title: "Pantalón",
        price: "$25000.00",
        image: "./src/assets/products/Pantalon.webp",
    },
    {
        id: 3,
        title: "Campera",
        price: "$40000.00",
        image: "./src/assets/products/campera.webp",
    },
    {
        id: 4,
        title: "Buzo",
        price: "$30000.00",
        image: "./src/assets/products/buzo.webp",
    },
];

const btnCart = document.querySelector('.cart'); // Botón del carrito en el header
const cartModal = document.getElementById('cart-modal'); // Modal del carrito
const closeCartModal = document.getElementById('close-cart-modal'); // Botón para cerrar el modal
const productsList = document.querySelector('#products .product-list'); // Contenedor de las tarjetas de productos
const rowProduct = document.querySelector('.cart-items'); // Contenedor de productos en el modal
const countProducts = document.querySelector('#cart-count'); // Contador de productos en el carrito
const cartTotalModal = document.getElementById('cart-total-modal'); // Total en el modal

let allProducts = []; // Array para almacenar los productos agregados al carrito

// Mostrar el modal al hacer clic en el carrito
btnCart.addEventListener('click', () => {
    cartModal.classList.remove('hidden'); // Mostrar el modal
});

// Cerrar el modal al hacer clic en el botón "Cerrar"
closeCartModal.addEventListener('click', () => {
    cartModal.classList.add('hidden'); // Ocultar el modal
});

// Renderizar los productos en la sección "Productos Destacados"
const renderProducts = () => {
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product');
        productCard.dataset.id = product.id;

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>${product.price}</p>
            <button class="add-to-cart">Agregar al carrito</button>
        `;

        productsList.appendChild(productCard);
    });
};

// Evento para agregar productos al carrito
productsList.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        const product = e.target.parentElement;

        const infoProduct = {
            id: product.dataset.id,
            quantity: 1,
            title: product.querySelector('h3').textContent,
            price: product.querySelector('p').textContent,
        };

        const exists = allProducts.some(
            product => product.id === infoProduct.id
        );

        if (exists) {
            const products = allProducts.map(product => {
                if (product.id === infoProduct.id) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
            allProducts = [...products];
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML(); // Actualizar el carrito en el DOM
    }
});

// Evento para eliminar productos del carrito
rowProduct.addEventListener('click', e => {
    if (e.target.classList.contains('icon-close')) {
        const product = e.target.parentElement;
        const id = product.dataset.id;

        allProducts = allProducts.filter(
            product => product.id !== id
        );

        showHTML(); // Actualizar el carrito en el DOM
    }
});

// Función para mostrar el carrito en el DOM
const showHTML = () => {
    rowProduct.innerHTML = ''; // Limpiar contenido previo
    let total = 0;
    let totalOfProducts = 0;

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div');
        containerProduct.classList.add('cart-item');
        containerProduct.dataset.id = product.id;

        containerProduct.innerHTML = `
            <p>${product.title} x${product.quantity}</p>
            <p>$${(product.quantity * parseFloat(product.price.replace('$', ''))).toFixed(2)}</p>
            <button class="icon-close">Eliminar</button>
        `;

        rowProduct.appendChild(containerProduct);

        total += product.quantity * parseFloat(product.price.replace('$', ''));
        totalOfProducts += product.quantity;
    });

    cartTotalModal.textContent = `$${total.toFixed(2)}`;
    countProducts.textContent = totalOfProducts;
};

// Renderizar los productos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});