import { useState, useEffect } from 'react'
import { X, QrCode, Zap, CheckCircle, Copy, ShieldCheck, PartyPopper, AlertCircle, Download, ExternalLink } from 'lucide-react'
import { rtdb as db } from '@/config/firebase'
import { ref, onValue, set, serverTimestamp, Unsubscribe } from 'firebase/database'
import { useAuth } from '@/contexts/AuthContext'
import type { Project } from '@/types'

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    project: Project;
}

export default function PaymentModal({ isOpen, onClose, project }: PaymentModalProps) {
    const { currentUser } = useAuth()
    const userEmail = currentUser?.email || ''

    const [paymentStep, setPaymentStep] = useState(1) // 1: QR, 2: NotifySuccess, 3: Verifying, 4: ConfirmedSuccess, 5: Failed
    const [isCopied, setIsCopied] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [transactionId, setTransactionId] = useState<string | null>(localStorage.getItem(`last_tx_id_${project.id}`))
    const [lastSubmittedAt, setLastSubmittedAt] = useState(Number(localStorage.getItem(`last_submit_${project.id}`)) || 0)

    // Lắng nghe sự thay đổi từ Firebase khi ở bước Verifying
    useEffect(() => {
        if (paymentStep === 3 && transactionId) {
            const txPath = `transactions/${transactionId}/status`
            const statusRef = ref(db, txPath)

            console.log("🔥 Lắng nghe tại:", txPath)
            const unsubscribe: Unsubscribe = onValue(statusRef, (snapshot) => {
                const status = snapshot.val()
                console.log("📡 Nhận dữ liệu từ Firebase:", status)
                if (status === 'success') {
                    setPaymentStep(4)
                    // Xóa hoàn toàn dấu vết để khách hàng có thể tạo lệnh mới nếu muốn
                    localStorage.removeItem(`last_submit_${project.id}`)
                    localStorage.removeItem(`last_tx_id_${project.id}`)
                    setLastSubmittedAt(0)
                    setTransactionId(null)
                } else if (status === 'failed') {
                    setPaymentStep(5)
                }
            }, (error) => {
                console.error("❌ Lỗi lắng nghe Firebase:", error)
            })

            return () => unsubscribe()
        }
    }, [paymentStep, transactionId])

    // Tự động đóng modal sau 3 giây khi thanh toán thành công
    useEffect(() => {
        if (paymentStep === 4) {
            const timer = setTimeout(() => {
                onClose()
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [paymentStep, onClose])

    // Tự động tạo mã giao dịch và lưu vào Firebase ngay khi mở modal
    useEffect(() => {
        const initTransaction = async () => {
            if (isOpen && !isSubmitting && paymentStep === 1) {
                // Kiểm tra xem đã có giao dịch còn hiệu lực trong localStorage không
                const savedTxId = localStorage.getItem(`last_tx_id_${project.id}`);
                const savedSTime = Number(localStorage.getItem(`last_submit_${project.id}`));
                const now = Date.now();
                const cooldown = 5 * 60 * 1000;

                if (savedTxId && (now - savedSTime < cooldown)) {
                    setTransactionId(savedTxId);
                    setLastSubmittedAt(savedSTime);
                    setPaymentStep(3); // Chuyển thẳng sang bước đợi xác nhận
                    return;
                }

                // Nếu chưa có hoặc đã hết hạn, tạo mới
                const newId = `TX${now.toString().slice(-6)}${Math.floor(Math.random() * 1000)}`;
                setTransactionId(newId);
                setIsSubmitting(true);

                try {
                    const txRef = ref(db, `transactions/${newId}`);
                    await set(txRef, {
                        id: newId,
                        email: userEmail,
                        projectId: project.id,
                        projectName: project.title,
                        price: project.price,
                        status: 'pending',
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                        userId: currentUser?.uid
                    });

                    localStorage.setItem(`last_submit_${project.id}`, String(now));
                    localStorage.setItem(`last_tx_id_${project.id}`, newId);
                    setLastSubmittedAt(now);
                    setPaymentStep(3); // Tự động chuyển sang trạng thái chờ xác thực ngay khi hiện mã QR
                } catch (error) {
                    console.error('Lỗi khởi tạo giao dịch:', error);
                } finally {
                    setIsSubmitting(false);
                }
            }
        };

        initTransaction();
    }, [isOpen]);

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white rounded-2xl md:rounded-[3rem] shadow-2xl overflow-y-auto max-h-[95vh] md:max-h-[90vh] animate-scale-in">
                <div className="sticky top-0 right-0 z-10 flex justify-end p-3 md:absolute md:top-8 md:right-8">
                    <button
                        onClick={onClose}
                        className="p-2 md:p-3 bg-gray-100/80 backdrop-blur-sm hover:bg-gray-200 rounded-xl md:rounded-2xl text-gray-400 hover:text-primary transition-all shadow-sm"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {(paymentStep === 1 || paymentStep === 3) && (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bg-gray-50 p-4 sm:p-6 md:p-12 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-gray-100">
                            <div className="bg-white p-3 md:p-6 rounded-2xl md:rounded-[2.5rem] shadow-premium mb-4 md:mb-8 w-full max-w-[280px] md:max-w-none flex items-center justify-center overflow-hidden">
                                {transactionId ? (
                                    <img
                                        src={`https://img.vietqr.io/image/VIB-913263053-compact2.png?amount=${project.price}&addInfo=${transactionId}&accountName=DUONG%20THAI%20TIEN`}
                                        alt="VietQR Payment"
                                        className="w-full h-auto"
                                    />
                                ) : (
                                    <div className="h-64 flex items-center justify-center">
                                        <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 leading-none">Quét mã để thanh toán</p>
                                <p className="text-lg md:text-xl font-black text-primary tracking-tighter">{project.price} VNĐ</p>
                                {transactionId && (
                                    <div className="mt-4 p-2 bg-blue-50 rounded-xl border border-blue-100">
                                        <p className="text-[8px] font-black text-blue-600 uppercase tracking-widest leading-none mb-1">Nội dung chuyển khoản</p>
                                        <p className="text-sm font-black text-blue-700">{transactionId}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-4 sm:p-6 md:p-12">
                            <div className="mb-6 md:mb-10">
                                <h3 className="text-lg md:text-2xl font-black text-primary tracking-tighter uppercase mb-2">Thông tin thanh toán</h3>
                                <p className="text-[10px] md:text-xs text-gray-500 font-medium italic">Hệ thống đang tự động kiểm tra giao dịch của bạn.</p>
                            </div>

                            <div className="space-y-4 md:space-y-6">
                                <div className="p-4 md:p-6 bg-surface-muted rounded-2xl md:rounded-3xl border border-gray-100 font-sans">
                                    <p className="text-[10px] font-black text-primary uppercase mb-2 leading-none">VIB - NGÂN HÀNG QUỐC TẾ</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1 leading-none">STK: 913263053</p>
                                            <p className="text-sm font-black text-primary uppercase">DUONG THAI TIEN</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText('913263053')
                                                setIsCopied(true)
                                                setTimeout(() => setIsCopied(false), 2000)
                                            }}
                                            className="p-3 bg-white shadow-sm rounded-xl text-gray-400 hover:text-accent transition-all"
                                        >
                                            {isCopied ? <CheckCircle className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2 block text-left">Email nhận code (Tự động)</label>
                                    <div className="relative group">
                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <div className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-blue-100/50 rounded-2xl text-xs font-bold text-primary flex items-center">
                                            {userEmail}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-blue-600 rounded-2xl shadow-premium flex flex-col items-center justify-center space-y-3 animate-pulse">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-2 w-2 bg-white rounded-full animate-ping"></div>
                                        <span className="text-white font-black text-[10px] md:text-xs uppercase tracking-widest">Đang chờ thanh toán...</span>
                                    </div>
                                    <p className="text-[9px] text-blue-100 text-center">Web sẽ tự động cập nhật ngay khi bạn chuyển tiền thành công.</p>
                                </div>

                                <button
                                    onClick={() => {
                                        localStorage.removeItem(`last_submit_${project.id}`)
                                        localStorage.removeItem(`last_tx_id_${project.id}`)
                                        setLastSubmittedAt(0)
                                        setTransactionId(null)
                                        setPaymentStep(1)
                                        window.location.reload()
                                    }}
                                    className="w-full text-center text-[9px] font-bold text-gray-400 uppercase hover:text-red-500 transition-colors"
                                >
                                    Làm mới hoặc Hủy bỏ giao dịch này
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStep === 2 && (
                    <div className="p-8 md:p-20 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 animate-bounce">
                            <CheckCircle className="h-12 w-12 text-green-500" />
                        </div>
                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase mb-4">Gửi báo cáo xong!</h3>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-6 font-medium">
                            Tuyệt vời! Admin đang kiểm tra thông báo của bạn.
                        </p>
                        <div className="flex items-center space-x-2 text-accent animate-pulse font-black text-xs uppercase tracking-widest">
                            <span>Sắp chuyển sang chế độ chờ xác thực...</span>
                        </div>
                    </div>
                )}

                {paymentStep === 3 && (
                    <div className="p-6 md:p-20 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="relative mb-10">
                            <div className="h-24 w-24 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldCheck className="h-10 w-10 text-accent animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-xl md:text-3xl font-black text-primary tracking-tighter uppercase mb-4">Đang đợi Admin xác nhận</h3>
                        <p className="text-sm md:text-base text-gray-500 max-w-sm leading-relaxed mb-6 md:mb-8 font-medium">
                            Hệ thống sẽ tự động cập nhật ngay khi Admin nhấn nút xác nhận trên bảng điều khiển Quản trị.
                        </p>
                        <div className="p-4 bg-gray-50 rounded-2xl flex flex-col items-center space-y-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                            <div className="flex items-center space-x-3">
                                <div className="h-2 w-2 bg-yellow-400 rounded-full animate-ping"></div>
                                <span>Đang đợi Admin nhấn nút...</span>
                            </div>
                            <div className="flex flex-col items-center space-y-1">
                                <span className="opacity-50">Mã GD: {transactionId}</span>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-accent hover:underline mt-2"
                                >
                                    Nếu Admin đã bấm mà chưa thấy gì, nhấn vào đây để tải lại trang
                                </button>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem(`last_submit_${project.id}`)
                                        localStorage.removeItem(`last_tx_id_${project.id}`)
                                        setLastSubmittedAt(0)
                                        setTransactionId(null)
                                        setPaymentStep(1)
                                    }}
                                    className="text-red-500 hover:text-red-700 font-bold mt-4 border border-red-200 px-4 py-2 rounded-xl bg-red-50"
                                >
                                    Hủy và tạo lệnh chuyển tiền mới
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStep === 4 && (
                    <div className="p-8 md:p-20 flex flex-col items-center justify-center text-center animate-scale-in">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 md:mb-10 shadow-glow">
                            <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-white" />
                        </div>
                        <h3 className="text-2xl md:text-4xl font-black text-primary tracking-tighter uppercase mb-4">THANH TOÁN THÀNH CÔNG!</h3>
                        <p className="text-sm md:text-base text-gray-500 max-w-sm leading-relaxed mb-6 font-medium">
                            Cảm ơn bạn đã ủng hộ! Nhấn nút bên dưới để tải mã nguồn ngay.
                        </p>

                        {project.sourceCodeUrl ? (
                            <a
                                href={project.sourceCodeUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-green-500 hover:bg-green-600 text-white py-4 md:py-5 px-8 md:px-10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-premium flex items-center gap-3 mb-4"
                            >
                                <Download className="h-5 w-5" />
                                TẢI MÃ NGUỒN NGAY
                                <ExternalLink className="h-4 w-4" />
                            </a>
                        ) : (
                            <p className="text-sm text-red-500 font-medium mb-4 bg-red-50 px-4 py-3 rounded-xl">
                                ⚠️ Link mã nguồn chưa được cấu hình. Vui lòng liên hệ Admin.
                            </p>
                        )}

                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-primary font-bold text-xs uppercase tracking-widest transition-all mt-2"
                        >
                            Đóng
                        </button>
                    </div>
                )}

                {paymentStep === 5 && (
                    <div className="p-8 md:p-20 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mb-6 md:mb-8">
                            <AlertCircle className="h-10 w-10 md:h-12 md:w-12 text-red-500" />
                        </div>
                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase mb-4">Xác nhận thất bại</h3>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-10 font-medium">
                            Admin báo rằng chưa nhận được tiền hoặc có sai sót. Vui lòng check lại nội dung chuyển khoản hoặc liên hệ hỗ trợ.
                        </p>
                        <button
                            onClick={() => setPaymentStep(1)}
                            className="text-accent font-black text-xs uppercase tracking-widest hover:underline px-4 py-2"
                        >
                            THỬ LẠI BƯỚC QUÉT MÃ
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
