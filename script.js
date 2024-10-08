document.getElementById('searchBtn').addEventListener('click', function() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.classList.toggle('active');
});

document.getElementById('cartButton').addEventListener('click', function() {
    const popup = document.getElementById('cartPopup');
    const button = document.getElementById('cartButton');

    // Toggle the visibility of the cart popup
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        button.textContent = 'CLOSE CART';
    } else {
        popup.classList.add('hidden');
        button.textContent = 'CART';
    }
});

document.getElementById('sortBtn').addEventListener('click', function() {
    const popup = document.getElementById('sortPopup');
    const button = document.getElementById('sortBtn');

    // Toggle the visibility of the cart popup
    if (popup.classList.contains('hidden')) {
        popup.classList.remove('hidden');
        button.textContent = 'SORT';
    } else {
        popup.classList.add('hidden');
        button.textContent = 'CLOSE SORT';
    }
});
