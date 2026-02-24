import { useState, useEffect } from 'react'
import { X, QrCode, Mail, Zap, CheckCircle, Copy, ShieldCheck, PartyPopper, AlertCircle } from 'lucide-react'
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

    useEffect(() => {
        if (!isOpen) {
            const now = Date.now()
            const cooldown = 5 * 60 * 1000
            if (now - lastSubmittedAt < cooldown && transactionId) {
                setPaymentStep(3)
            } else {
                setPaymentStep(1)
            }
        }
    }, [isOpen, lastSubmittedAt, project.id, paymentStep])

    const handleConfirmPayment = async () => {
        const now = Date.now()
        const cooldown = 5 * 60 * 1000
        if (now - lastSubmittedAt < cooldown) {
            setPaymentStep(3)
            return
        }

        setIsSubmitting(true)
        const newTransactionId = `TX${now.toString().slice(-6)}${Math.floor(Math.random() * 1000)}`
        setTransactionId(newTransactionId)

        try {
            const txRef = ref(db, `transactions/${newTransactionId}`)

            await set(txRef, {
                id: newTransactionId,
                email: userEmail,
                projectId: project.id,
                projectName: project.title,
                price: project.price,
                status: 'pending',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
                userId: currentUser?.uid
            })

            localStorage.setItem(`last_submit_${project.id}`, String(now))
            localStorage.setItem(`last_tx_id_${project.id}`, newTransactionId)
            setLastSubmittedAt(now)

            setPaymentStep(2)
            setTimeout(() => setPaymentStep(3), 3000)

        } catch (error) {
            console.error('Lỗi lưu giao dịch vào Firebase:', error)
            alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.')
            setPaymentStep(1)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
            <div className="absolute inset-0 bg-primary/40 backdrop-blur-md" onClick={onClose}></div>
            <div className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden animate-scale-in">
                <div className="absolute top-8 right-8 z-10">
                    <button
                        onClick={onClose}
                        className="p-3 bg-gray-100 hover:bg-gray-200 rounded-2xl text-gray-400 hover:text-primary transition-all"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {paymentStep === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="bg-gray-50 p-12 flex flex-col items-center justify-center border-r border-gray-100">
                            <div className="bg-white p-6 rounded-[2.5rem] shadow-premium mb-8 w-full aspect-square flex items-center justify-center overflow-hidden">
                                <img
                                    src={`https://img.vietqr.io/image/VIB-913263053-compact2.png?amount=${project.price}&addInfo=${encodeURIComponent(userEmail + " " + project.title)}&accountName=DUONG%20THAI%20TIEN`}
                                    alt="VietQR Payment"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="text-center">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2 leading-none">Quét mã để thanh toán</p>
                                <p className="text-xl font-black text-primary tracking-tighter">{project.price} VNĐ</p>
                            </div>
                        </div>

                        <div className="p-12">
                            <div className="mb-10">
                                <h3 className="text-2xl font-black text-primary tracking-tighter uppercase mb-2">Thông tin chuyển khoản</h3>
                                <p className="text-xs text-gray-500 font-medium italic">Vui lòng nhập email chính xác để nhận mã nguồn.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="p-6 bg-surface-muted rounded-3xl border border-gray-100 font-sans">
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
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                        <div className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-blue-100/50 rounded-2xl text-xs font-bold text-primary flex items-center">
                                            {userEmail}
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-gray-400 italic ml-2 mt-1">* Source code sẽ được gửi tự động vào email này.</p>
                                </div>

                                <button
                                    onClick={handleConfirmPayment}
                                    disabled={!userEmail || isSubmitting}
                                    className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center ${userEmail && !isSubmitting ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-premium' : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-2"></div>
                                    ) : <Zap className="h-4 w-4 mr-2" />}
                                    {isSubmitting ? 'ĐANG GỬI...' : 'TÔI ĐÃ CHUYỂN KHOẢN'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {paymentStep === 2 && (
                    <div className="p-20 flex flex-col items-center justify-center text-center animate-fade-in">
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
                    <div className="p-20 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="relative mb-10">
                            <div className="h-24 w-24 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ShieldCheck className="h-10 w-10 text-accent animate-pulse" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-black text-primary tracking-tighter uppercase mb-4">Đang đợi Admin xác nhận</h3>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-8 font-medium">
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
                    <div className="p-20 flex flex-col items-center justify-center text-center animate-scale-in">
                        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-10 shadow-glow">
                            <CheckCircle className="h-12 w-12 text-white" />
                        </div>
                        <h3 className="text-4xl font-black text-primary tracking-tighter uppercase mb-4">THANH TOÁN THÀNH CÔNG!</h3>
                        <p className="text-gray-500 max-w-sm leading-relaxed mb-10 font-medium">
                            Cảm ơn bạn đã ủng hộ! Mã nguồn đã được kích hoạt chuyển giao đến email: <span className="text-green-600 font-bold">{userEmail}</span>
                        </p>
                        <button
                            onClick={onClose}
                            className="bg-primary text-white py-5 px-10 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-premium"
                        >
                            HOÀN TẤT & ĐÓNG
                        </button>
                    </div>
                )}

                {paymentStep === 5 && (
                    <div className="p-20 flex flex-col items-center justify-center text-center animate-fade-in">
                        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-8">
                            <AlertCircle className="h-12 w-12 text-red-500" />
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
