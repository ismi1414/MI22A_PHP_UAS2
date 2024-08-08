
// script.js

document.addEventListener('DOMContentLoaded', function() {
    const categoryInput = document.getElementById('categoryInput');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const categoryList = document.getElementById('categoryList');

    // Load categories from localStorage and display them
    function loadCategories() {
        const categories = JSON.parse(localStorage.getItem('categories')) || [];
        categoryList.innerHTML = '';
        categories.forEach((category, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${category} <button class="delete-btn" data-index="${index}">Delete</button>`;
            categoryList.appendChild(li);
        });
    }

    // Add category
    addCategoryBtn.addEventListener('click', function() {
        const category = categoryInput.value.trim();
        if (category === '') return;

        let categories = JSON.parse(localStorage.getItem('categories')) || [];
        categories.push(category);
        localStorage.setItem('categories', JSON.stringify(categories));

        categoryInput.value = '';
        loadCategories();
    });

    // Handle delete category
    categoryList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.getAttribute('data-index');
            let categories = JSON.parse(localStorage.getItem('categories')) || [];
            categories.splice(index, 1);
            localStorage.setItem('categories', JSON.stringify(categories));
            loadCategories();
        }
    });

    // Initial load
    loadCategories();
});
