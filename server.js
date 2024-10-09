const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51Q7MaoJMLiAgd6diIzlzr8HoEhdQqXLhUhONigkPhKTZMpvCcj8hRaCQ6dLBPrDzbEKDKiCksdgbxv9TytHyIzhK006A1lsczS');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.envPORT || 2000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // index.htmlを返す
});

// チェックアウトセッションを作成するエンドポイント
app.post('/create-checkout-session', async (req, res) => {
    try {
        const { items } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price_data: {
                    currency: 'jpy',
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price,
                },
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: 'http://localhost:3000/success.html',
            cancel_url: 'http://localhost:3000/cancel.html',
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error('接続ができませんでした:', error);
        res.status(500).json({ error: error.message });
    }
});

// サーバーの起動
app.listen(PORT, () => {
    console.log(`サーバーが起動しました:${PORT}`);
});
