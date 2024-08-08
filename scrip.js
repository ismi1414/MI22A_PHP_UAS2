
// script.js

document.addEventListener('DOMContentLoaded', function() {
    const productNameInput = document.getElementById('productNameInput');
    const productPriceInput = document.getElementById('productPriceInput');
    const addProductBtn = document.getElementById('addProductBtn');
    const productList = document.getElementById('productList');

    // Load products from localStorage and display them
    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${product.name} - $${product.price.toFixed(2)}
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>`;
            productList.appendChild(li);
        });
    }

    // Add product
    addProductBtn.addEventListener('click', function() {
        const name = productNameInput.value.trim();
        const price = parseFloat(productPriceInput.value);

        if (name === '' || isNaN(price) || price <= 0) return;

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products.push({ name, price });
        localStorage.setItem('products', JSON.stringify(products));

        productNameInput.value = '';
        productPriceInput.value = '';
        loadProducts();
    });

    // Handle edit and delete
    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            let products = JSON.parse(localStorage.getItem('products')) || [];
            products.splice(index, 1);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
        } else if (event.target.classList.contains('edit-btn')) {
            const index = event.target.getAttribute('data-index');
            let products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products[index];

            const newName = prompt('Enter new product name:', product.name);
            const newPrice = parseFloat(prompt('Enter new product price:', product.price));

            if (newName !== null && !isNaN(newPrice) && newPrice > 0) {
                products[index] = { name: newName, price: newPrice };
                localStorage.setItem('products', JSON.stringify(products));
                loadProducts();
            }
        }
    });

    // Initial load
    loadProducts();
});
