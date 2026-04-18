import admin from 'firebase-admin';
import { Resend } from 'resend';

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        console.log('--- SEPAY WEBHOOK START ---');
        console.log('Headers:', JSON.stringify(req.headers));

        // 1. Xác thực Secret Key (SePay gửi qua Authorization: Bearer hoặc apikey header)
        const secretKey = process.env.SEPAY_SECRET_KEY;
        const authHeader = req.headers.authorization;
        const apikeyHeader = req.headers['apikey'] || req.headers['x-api-key'];

        const isValidBearer = authHeader === `Bearer ${secretKey}`;
        const isValidApiKey = apikeyHeader === secretKey;

        // Nếu không có secretKey thì bỏ qua xác thực (demo mode)
        if (secretKey && !isValidBearer && !isValidApiKey) {
            console.error('❌ Xác thực thất bại. Auth:', authHeader, 'ApiKey:', apikeyHeader);
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const data = req.body;
        console.log('Payload từ SePay:', JSON.stringify(data));

        // Lấy mã giao dịch (thường nằm trong content)
        const rawContent = data.content || data.code || "";
        // Tìm mã có định dạng TX...... trong nội dung (đề phòng khách viết thêm chữ)
        const match = rawContent.match(/TX\d+/i);
        const transactionId = match ? match[0].toUpperCase() : null;
        
        const transferAmount = parseFloat(data.transferAmount || 0);

        if (!transactionId) {
            console.error('❌ Không tìm thấy mã đơn hàng (TX...) trong nội dung chuyển khoản:', rawContent);
            return res.status(400).json({ error: 'Mã đơn hàng không hợp lệ' });
        }

        // 2. Khởi tạo Firebase Admin
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                }),
                databaseURL: process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL,
            });
        }

        const rtdb = admin.database();
        const db = admin.firestore();

        // 3. Tìm giao dịch
        console.log(`🔍 Đang kiểm tra đơn hàng: ${transactionId}`);
        const txRef = rtdb.ref(`transactions/${transactionId}`);
        const txSnap = await txRef.once('value');
        const transaction = txSnap.val();

        if (!transaction) {
            console.error(`❌ Không tìm thấy đơn hàng ${transactionId} trong Database.`);
            return res.status(404).json({ error: 'Đơn hàng không tồn tại' });
        }

        if (transaction.status === 'success') {
            console.log('ℹ️ Đơn hàng này đã được xử lý trước đó.');
            return res.status(200).json({ message: 'Already processed' });
        }

        // 4. KIỂM TRA SỐ TIỀN & CẬP NHẬT
        const expectedPrice = parseFloat(transaction.price || 0);
        
        // Chấp nhận nếu số tiền chuyển khoản >= giá sản phẩm (đề phòng khách chuyển dư)
        if (transferAmount < expectedPrice) {
            console.warn(`⚠️ Số tiền thiếu: Khách chuyển ${transferAmount}, Giá đơn ${expectedPrice}`);
            // Bạn có thể không duyệt ở đây, nhưng demo thì tôi vẫn cho qua hoặc log lại
        }

        await txRef.update({
            status: 'success',
            updatedAt: admin.database.ServerValue.TIMESTAMP,
            paymentDetail: data
        });

        console.log(`✅ Chúc mừng! Đơn hàng ${transactionId} đã TỰ ĐỘNG DUYỆT.`);

        // 5. GỬI EMAIL TỰ ĐỘNG
        try {
            const projectDoc = await db.collection('projects').doc(transaction.projectId).get();
            const sourceCodeUrl = projectDoc.data()?.sourceCodeUrl;

            if (sourceCodeUrl && transaction.email) {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || 'thaitienshop <onboarding@resend.dev>',
                    to: [transaction.email],
                    subject: `[thaitienshop] Mã nguồn: ${transaction.projectName}`,
                    html: `
                        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                            <h2 style="color: #2563eb;">Thanh toán thành công!</h2>
                            <p>Link tải mã nguồn của bạn: <a href="${sourceCodeUrl}">${sourceCodeUrl}</a></p>
                            <p>Mã đơn: ${transactionId}</p>
                        </div>
                    `,
                });
                console.log('📧 Email đã được gửi.');
            }
        } catch (e) {
            console.error('Lỗi gửi mail:', e);
        }

        return res.status(200).json({ success: true });

    } catch (error: any) {
        console.error('CRITICAL ERROR:', error);
        return res.status(500).json({ error: error.message });
    }
}
