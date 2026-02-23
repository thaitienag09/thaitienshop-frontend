import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ShieldCheck, CheckCircle, Smartphone, Info, Copy, ExternalLink, ArrowRight, Clock } from 'lucide-react'

export default function ThanhToan() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const project = {
    title: "Hệ thống Quản lý Cửa hàng Thú y (PetCare)",
    price: "199,000",
    originalPrice: "299,000",
    discount: 33,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=200&h=200&fit=crop"
  }

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsSuccess(true)
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-surface-muted flex items-center justify-center p-6">
        <div className="glass rounded-[3rem] shadow-glow p-12 max-w-xl w-full text-center border border-white/50 animate-scale-in">
          <div className="w-24 h-24 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-sm">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h1 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">Gửi xác nhận thành công!</h1>
          <p className="text-gray-500 mb-10 leading-relaxed font-medium">
            Nếu bạn đã chuyển khoản kèm <span className="text-primary font-bold">Gmail</span> đúng nội dung,
            source code sẽ được gửi tự động trong 5-10 phút.
            Cảm ơn bạn đã tin tưởng thaitienshop!
          </p>
          <div className="space-y-4">
            <Link
              to="/projects"
              className="block w-full bg-[#0f172a] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:bg-accent transition-all duration-300"
            >
              TIẾP TỤC KHÁM PHÁ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-muted pb-20">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <Link to="/projects" className="flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors mb-6 group">
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            HUỶ THANH TOÁN
          </Link>
          <h1 className="text-4xl font-black text-primary tracking-tight">Xác nhận <span className="text-accent">Giao dịch</span></h1>
        </div>

        <div className="grid grid-cols-1 gap-12 items-center justify-center text-center py-20">
          <div className="glass p-16 rounded-[4rem] shadow-glow border border-white/50 max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-accent/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10">
              <Clock className="h-12 w-12 text-accent animate-spin-slow" />
            </div>
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tighter uppercase">THANH TOÁN TẠM KHOÁ</h2>
            <p className="text-gray-500 mb-10 leading-relaxed font-medium italic">
              Hệ thống thanh toán tự động đang được bảo trì và nâng cấp để hỗ trợ các dự án Laravel - MySQL mới.
              Vui lòng quay lại sau khi "PetCare" được phát hành chính thức.
            </p>
            <Link
              to="/projects"
              className="bg-primary text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:bg-accent transition-all duration-300 inline-block"
            >
              QUAY LẠI THƯ VIỆN
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
