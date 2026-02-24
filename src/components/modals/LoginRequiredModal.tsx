import { useNavigate } from 'react-router-dom'
import { LogIn, X, ShoppingCart, ShieldAlert } from 'lucide-react'

interface LoginRequiredModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginRequiredModal({ isOpen, onClose }: LoginRequiredModalProps) {
    const navigate = useNavigate()

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-primary/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden animate-scale-in">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-xl transition-all"
                >
                    <X className="h-5 w-5" />
                </button>

                <div className="p-10 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center mb-6 animate-bounce-in">
                        <div className="relative">
                            <ShoppingCart className="h-10 w-10 text-blue-600" />
                            <ShieldAlert className="h-5 w-5 text-accent absolute -top-1 -right-1" />
                        </div>
                    </div>

                    <h3 className="text-2xl font-black text-primary tracking-tighter uppercase mb-3">
                        BẠN CẦN ĐĂNG NHẬP
                    </h3>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed mb-10 max-w-[280px]">
                        Vui lòng đăng nhập để có thể thực hiện giao dịch và sở hữu mã nguồn từ thaitienshop. 🚀
                    </p>

                    <div className="w-full space-y-3">
                        <button
                            onClick={() => {
                                onClose()
                                navigate('/auth')
                            }}
                            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center hover:bg-blue-700 hover:shadow-lg transition-all active:scale-[0.98]"
                        >
                            <LogIn className="h-5 w-5 mr-3" />
                            Đăng nhập ngay
                        </button>

                        <button
                            onClick={onClose}
                            className="w-full bg-gray-50 text-gray-400 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all"
                        >
                            Để sau
                        </button>
                    </div>

                    <p className="mt-8 text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                        thaitienshop — cam kết bảo mật 100%
                    </p>
                </div>
            </div>
        </div>
    )
}
