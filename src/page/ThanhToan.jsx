import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ShieldCheck, CheckCircle, Smartphone, Info, Copy, ExternalLink, ArrowRight } from 'lucide-react'

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Payment Section */}
          <div className="lg:col-span-7 space-y-8">
            <div className="glass p-10 rounded-[3rem] shadow-premium border border-white/50">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-primary">Phương thức Chuyển khoản</h2>
                <div className="px-4 py-2 bg-accent/10 rounded-xl">
                  <span className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Ưu tiên xử lý nhanh</span>
                </div>
              </div>

              {/* Bank Statement Card */}
              <div className="bg-primary/5 rounded-[2rem] p-8 border border-primary/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <ExternalLink className="w-32 h-32 text-primary" />
                </div>

                <div className="space-y-6 relative z-10">
                  <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-primary/10 pb-6 space-y-4 md:space-y-0">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                        <Smartphone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ngân hàng thụ hưởng</p>
                        <p className="text-sm font-black text-primary">VIB (BANK QUỐC TẾ)</p>
                      </div>
                    </div>
                    <button className="flex items-center text-[10px] font-black text-accent uppercase tracking-widest hover:opacity-70">
                      SAO CHÉP QR <Copy className="h-3 w-3 ml-2" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Số tài khoản</p>
                      <p className="text-2xl font-black text-primary tracking-tighter">913263053</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Chủ tài khoản</p>
                      <p className="text-lg font-black text-primary uppercase">DUONG THAI TIEN</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-primary/10">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Số tiền cần chuyển</p>
                    <p className="text-3xl font-black text-accent">{project.price}₫</p>
                  </div>

                  <div className="bg-white/50 backdrop-blur-sm p-6 rounded-xl border border-white">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Nội dung chuyển khoản (BẮT BUỘC)</p>
                    <div className="p-4 bg-primary text-white rounded-xl mb-4">
                      <p className="text-sm font-bold italic text-center">"PETCARE - [GMAIL_CUA_BAN]"</p>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-relaxed text-center">
                      Thay <span className="italic text-primary font-bold">[GMAIL_CUA_BAN]</span> bằng địa chỉ Gmail của bạn để hệ thống gửi code tự động.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <div className="flex items-start bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <Info className="h-5 w-5 text-accent mr-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-primary mb-1 uppercase">Lưu ý quan trọng</p>
                    <p className="text-xs font-semibold text-gray-500 leading-relaxed">
                      Chuyển đúng số tiền và kèm Gmail trong nội dung để nhận code ngay.
                      Hệ thống sẽ từ chối các giao dịch thiếu Gmail.
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-[#0f172a] text-white py-6 rounded-2xl font-black text-sm uppercase tracking-widest shadow-glow hover:bg-accent transition-all duration-300 flex items-center justify-center disabled:opacity-50"
                >
                  {isProcessing ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-3"></div>
                      ĐANG XÁC THỰC...
                    </div>
                  ) : (
                    <>
                      TÔI ĐÃ CHUYỂN KHOẢN {project.price}₫
                      <ArrowRight className="h-4 w-4 ml-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass p-10 rounded-[3rem] shadow-premium border border-white/50">
              <h3 className="text-lg font-bold text-primary mb-8 uppercase tracking-widest">Chi tiết đơn hàng</h3>

              <div className="flex items-center mb-8 pb-8 border-b border-gray-100">
                <div className="w-20 h-20 bg-surface-muted rounded-2xl overflow-hidden mr-6 flex-shrink-0 border border-gray-100">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-primary mb-1 line-clamp-1">{project.title}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-accent uppercase tracking-widest">Enterprise Solution</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-400 lowercase tracking-widest">tạm tính:</span>
                  <span className="font-bold text-primary">{project.originalPrice}₫</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-400 lowercase tracking-widest">ưu đãi (-{project.discount}%):</span>
                  <span className="font-bold text-green-500">-{parseInt(project.originalPrice.replace(',', '')) - parseInt(project.price.replace(',', ''))},000₫</span>
                </div>
                <div className="pt-6 border-t border-gray-100 flex justify-between items-end">
                  <span className="font-black text-primary text-xl uppercase tracking-tighter">tổng thanh toán:</span>
                  <span className="font-black text-accent text-3xl tracking-tighter">{project.price}₫</span>
                </div>
              </div>

              <div className="bg-gray-50/50 p-6 rounded-2xl flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">BẢO MẬT GIAO DỊCH 256-BIT SSL</span>
              </div>
            </div>

            {/* Support Box */}
            <div className="glass p-8 rounded-[2.5rem] border border-white/50">
              <h4 className="text-xs font-bold text-primary mb-3 uppercase tracking-widest">Hỗ trợ thanh toán</h4>
              <p className="text-xs text-gray-500 leading-relaxed italic mb-4">
                "Gặp vấn đề trong quá trình thanh toán? Hotline hỗ trợ khách hàng sẵn sàng phục vụ 24/7."
              </p>
              <div className="flex items-center text-sm font-black text-primary hover:text-accent cursor-pointer transition-colors">
                CSKH: 0913 263 053
                <ArrowRight className="h-4 w-4 ml-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
