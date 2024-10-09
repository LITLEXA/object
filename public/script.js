const stripe = Stripe('pk_test_51Q7MaoJMLiAgd6dipP8uB9WsOoONVjG5qjb0qyJ6cXWmP7mvx54eMK8OjaYnGDBPJvdFqR0EJSUc4cRwwxWvpfqM00x8p48TKI'); // 公開可能なキーをここに入力
let cart = [];

// カートの更新
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // 現在のカート内容をクリア

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.quantity}個 - ${item.price}円`;
        const removeButton = document.createElement('button');
        removeButton.textContent = '削除';
        removeButton.onclick = () => {
            cart.splice(index, 1); // カートから商品を削除
            updateCartDisplay(); // 表示を更新
        };
        li.appendChild(removeButton);
        cartItemsContainer.appendChild(li);
    });
}

// 商品をカートに追加
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseInt(button.getAttribute('data-price'));

        // カートに商品を追加
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity += 1; // 既存の商品数を増加
        } else {
            cart.push({ name, price, quantity: 1 }); // 新しい商品を追加
        }

        updateCartDisplay(); // 表示を更新
    });
});

// チェックアウトボタンのクリックイベント
document.getElementById('checkout-button').addEventListener('click', async () => {
    const response = await fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
    });

    const session = await response.json();

    if (response.ok) {
        // Stripe Checkoutへリダイレクト
        stripe.redirectToCheckout({ sessionId: session.id });
    } else {
        alert('エラーが発生しました: ' + session.error);
    }
});


//search 表示切り替え
document.getElementById('searchBtn').addEventListener('click', function() {
    const searchContainer = document.getElementById('searchContainer');
    searchContainer.classList.toggle('active');
});
//Cart表示切り替え
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
//Sort表示切り替え
document.getElementById('sortBtn').addEventListener('click', function() {
    const sortContainer = document.getElementById('sortContainer');
    sortContainer.classList.toggle('active');
});
