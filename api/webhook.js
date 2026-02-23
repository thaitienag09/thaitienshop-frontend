import { initializeApp } from 'firebase/app';
import { getDatabase, ref, update } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyAPURqNXE86MvgqZHLFlIbs2fN2SdRO7qk",
    authDomain: "shopdoanthaitien.firebaseapp.com",
    projectId: "shopdoanthaitien",
    storageBucket: "shopdoanthaitien.firebasestorage.app",
    messagingSenderId: "545068453271",
    appId: "1:545068453271:web:5a5d70bb4afb0d2e47c8d2",
    databaseURL: "https://shopdoanthaitien-default-rtdb.firebaseio.com/"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { callback_query } = req.body;

    if (callback_query) {
        const data = callback_query.data; // Ví dụ: "confirm_transaction_123"
        const chatId = callback_query.message.chat.id;
        const messageId = callback_query.message.message_id;

        const [action, , transactionId] = data.split('_');

        if (action === 'confirm' || action === 'cancel') {
            const status = action === 'confirm' ? 'success' : 'failed';
            const statusText = action === 'confirm' ? '✅ Đã xác nhận' : '❌ Đã hủy';

            // 1. Cập nhật Firebase
            try {
                await update(ref(db, `transactions/${transactionId}`), {
                    status: status,
                    updatedAt: Date.now()
                });

                // 2. Phản hồi lại Telegram (Sửa tin nhắn để báo đã bấm)
                const responseText = action === 'confirm'
                    ? `✅ GIAO DỊCH ĐÃ ĐƯỢC XÁC NHẬN\n\nMã: ${transactionId}\nKhách đã nhận được thông báo thành công trên Web.`
                    : `❌ GIAO DỊCH ĐÃ BỊ HỦY\n\nMã: ${transactionId}`;

                const botToken = '8716710838:AAFBO26c5u-yvR4wkoSSRmNYertmyl5LNmc';
                await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: responseText,
                        parse_mode: 'Markdown'
                    })
                });

                return res.status(200).json({ ok: true });
            } catch (error) {
                console.error('Lỗi Webhook:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        }
    }

    res.status(200).json({ ok: true });
}
