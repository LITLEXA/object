const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q7MaoJMLiAgd6diIzlzr8HoEhdQqXLhUhONigkPhKTZMpvCcj8hRaCQ6dLBPrDzbEKDKiCksdgbxv9TytHyIzhK006A1lsczS');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.envPORT || 2000;

app.use(cors());
app.use(bodyParser.json());
// パスの確認用ログ
console.log('Serving static files from:', path.join(__dirname, 'public'));

// 静的ファイルの提供
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // ルートでindex.htmlを提供
});


// チェックアウトセッションを作成するエンドポイント
app.post('/create-checkout-session', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: 'jpy',
                    product_data: { name: item.name },
                    unit_amount: item.price,
                    images: [item.image],
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:2000',
            cancel_url: 'http://localhost:2000',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});


// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました:${PORT}`);
});
