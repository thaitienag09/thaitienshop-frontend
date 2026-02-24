import { Resend } from 'resend';
import * as admin from 'firebase-admin';

export default async function handler(req: any, res: any) {
    // Luôn luôn trả về JSON kể cả khi lỗi cực nặng
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        const { transactionId } = req.body;
        if (!transactionId) {
            return res.status(400).json({ error: 'Missing transactionId' });
        }

        // 1. Kiểm tra hằng số môi trường
        const config = {
            projectId: process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY,
            databaseURL: process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL,
            resendKey: process.env.RESEND_API_KEY
        };

        const missing = Object.entries(config).filter(([k, v]) => !v).map(([k]) => k);
        if (missing.length > 0) {
            return res.status(500).json({
                error: `Thiếu cấu hình biến môi trường: ${missing.join(', ')}. Hãy kiểm tra Dashboard Vercel.`
            });
        }

        // 2. Khởi tạo Firebase Admin an toàn
        if (!admin.apps.length) {
            try {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: config.projectId,
                        clientEmail: config.clientEmail,
                        privateKey: config.privateKey?.replace(/\\n/g, '\n'),
                    }),
                    databaseURL: config.databaseURL,
                });
            } catch (initErr: any) {
                return res.status(500).json({ error: `Lỗi khởi tạo Firebase: ${initErr.message}` });
            }
        }

        const rtdb = admin.database();
        const firestore = admin.firestore();
        const resend = new Resend(config.resendKey);

        // 3. Lấy thông tin giao dịch
        const txSnapshot = await rtdb.ref(`transactions/${transactionId}`).once('value');
        const transaction = txSnapshot.val();

        if (!transaction) {
            return res.status(404).json({ error: 'Không tìm thấy giao dịch trên Database.' });
        }

        if (transaction.status !== 'success') {
            return res.status(400).json({ error: 'Giao dịch chưa được xác nhận thành công.' });
        }

        // 4. Lấy link mã nguồn
        const projectDoc = await firestore.collection('projects').doc(transaction.projectId).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ error: 'Không tìm thấy sản phẩm tương ứng.' });
        }

        const sourceCodeUrl = projectDoc.data()?.sourceCodeUrl;
        if (!sourceCodeUrl) {
            return res.status(400).json({ error: 'Sản phẩm này chưa được cấu hình Link mã nguồn.' });
        }

        // 5. Gửi email
        const { data, error } = await resend.emails.send({
            from: 'thaitienshop <onboarding@resend.dev>',
            to: [transaction.email],
            subject: `[thaitienshop] Mã nguồn của bạn: ${transaction.projectName}`,
            html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                    <h2 style="color: #2563eb; text-align: center;">Thanh toán thành công!</h2>
                    <p>Chào bạn,</p>
                    <p>Cảm ơn bạn đã mua mã nguồn <strong>${transaction.projectName}</strong> tại thaitienshop.</p>
                    <p>Dưới đây là link tải mã nguồn của bạn:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${sourceCodeUrl}" style="background-color: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold;">TẢI MÃ NGUỒN NGAY</a>
                    </div>
                    <p style="font-size: 12px; color: #666;">Mã giao dịch: ${transactionId}</p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
                    <p style="font-size: 12px; color: #999; text-align: center;">© 2024 thaitienshop. All rights reserved.</p>
                </div>
            `,
        });

        if (error) {
            return res.status(500).json({ error: `Lỗi từ Resend: ${JSON.stringify(error)}` });
        }

        return res.status(200).json({ message: 'Email sent successfully', data });

    } catch (criticalError: any) {
        console.error('CRITICAL API ERROR:', criticalError);
        return res.status(500).json({
            error: `Lỗi hệ thống nghiêm trọng: ${criticalError.message || criticalError}`
        });
    }
}
