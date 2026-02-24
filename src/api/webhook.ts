import * as admin from 'firebase-admin'

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: process.env.VITE_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
    })
}

const db = admin.database()

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed')
    }

    // Security check: Verify the request comes from Telegram using a secret token
    const telegramSecretToken = req.headers['x-telegram-bot-api-secret-token']
    if (telegramSecretToken !== process.env.TELEGRAM_WEBHOOK_SECRET) {
        console.error('🔒 Unauthorized webhook request blocked.')
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const { callback_query } = req.body

    if (callback_query) {
        const data = callback_query.data // Ví dụ: "confirm_transaction_123"
        const chatId = callback_query.message.chat.id
        const messageId = callback_query.message.message_id

        const [action, , transactionId] = data.split('_')

        if (action === 'confirm' || action === 'cancel') {
            const status = action === 'confirm' ? 'success' : 'failed'

            // 1. Cập nhật Firebase using Admin SDK (bypasses security rules)
            try {
                const txPath = `transactions/${transactionId}`
                console.log(`📡 Cập nhật Firebase (Admin) tại: ${txPath} với status: ${status}`)

                await db.ref(txPath).update({
                    status: status,
                    updatedAt: admin.database.ServerValue.TIMESTAMP
                })

                // 2. Phản hồi lại Telegram (Sửa tin nhắn để báo đã bấm)
                const responseText = action === 'confirm'
                    ? `✅ XÁC NHẬN THÀNH CÔNG\n\n🆔 Mã: \`${transactionId}\`\n💻 Trạng thái: Đã cập nhật lên Web.`
                    : `❌ ĐÃ HỦY GIAO DỊCH\n\n🆔 Mã: \`${transactionId}\``

                const botToken = process.env.TELEGRAM_BOT_TOKEN
                await fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId,
                        message_id: messageId,
                        text: responseText,
                        parse_mode: 'Markdown'
                    })
                })

                return res.status(200).json({ ok: true, transactionId })
            } catch (error: any) {
                console.error('❌ Lỗi Webhook Firebase Admin:', error)
                return res.status(500).json({ error: error.message })
            }
        }
    }

    res.status(200).json({ ok: true })
}
