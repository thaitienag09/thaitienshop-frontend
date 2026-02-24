import { Resend } from 'resend';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin
if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID;
    const databaseURL = process.env.FIREBASE_DATABASE_URL || process.env.VITE_FIREBASE_DATABASE_URL;

    console.log('🔥 Initializing Firebase Admin for Project:', projectId);

    admin.initializeApp({
        credential: admin.credential.cert({
            projectId: projectId,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
        databaseURL: databaseURL,
    });
}

const rtdb = admin.database();
const firestore = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { transactionId } = req.body;

    if (!transactionId) {
        return res.status(400).json({ error: 'Missing transactionId' });
    }

    try {
        // 1. Fetch transaction from RTDB
        const txSnapshot = await rtdb.ref(`transactions/${transactionId}`).once('value');
        const transaction = txSnapshot.val();

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        if (transaction.status !== 'success') {
            return res.status(400).json({ error: 'Transaction is not confirmed yet' });
        }

        // 2. Fetch project from Firestore to get sourceCodeUrl
        const projectDoc = await firestore.collection('projects').doc(transaction.projectId).get();
        if (!projectDoc.exists) {
            return res.status(404).json({ error: 'Project not found' });
        }
        const projectData = projectDoc.data();
        const sourceCodeUrl = projectData?.sourceCodeUrl;

        if (!sourceCodeUrl) {
            return res.status(400).json({ error: 'Source code link not configured for this project' });
        }

        // 3. Send email via Resend
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
            console.error('Resend Error:', error);
            return res.status(500).json({ error: 'Failed to send email' });
        }

        return res.status(200).json({ message: 'Email sent successfully', data });

    } catch (error: any) {
        console.error('API Error:', error);
        return res.status(500).json({ error: error.message });
    }
}
