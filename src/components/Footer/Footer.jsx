import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white flex items-center justify-center rounded-xl shadow-premium">
                <span className="text-primary font-black text-xl">S</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">thaitienshop</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed italic">
              "Giải pháp công nghệ tối ưu cho doanh nghiệp và chuyên gia lập trình. Kiến tạo tương lai qua từng dòng code."
            </p>
            <div className="flex space-x-6">
              <Facebook className="h-5 w-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-white/40 hover:text-accent cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Liên kết</h3>
            <ul className="space-y-4 text-sm font-bold">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">TRANG CHỦ</Link></li>
              <li><Link to="/projects" className="text-white/80 hover:text-white transition-colors">KHO ĐỒ ÁN</Link></li>
              <li><Link to="/auth" className="text-white/80 hover:text-white transition-colors">ĐĂNG NHẬP</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Thông tin</h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span className="text-white font-bold text-sm group-hover:text-white transition-colors">support@thaitienshop.vn</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-white font-bold text-sm group-hover:text-white transition-colors">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Clock className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Giờ làm việc</p>
                  <span className="text-white text-sm font-bold">07:00 - 22:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-8">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-accent">Địa chỉ</h3>
            <div className="flex items-start space-x-4">
              <MapPin className="h-5 w-5 text-accent mt-1" />
              <p className="text-white/60 text-sm font-bold leading-relaxed">
                Khu đô thị công nghệ cao,<br />
                Thành phố Hồ Chí Minh, Việt Nam
              </p>
            </div>
            <div className="pt-4">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Support Online</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
          <p>© 2024 THAITIENSHOP ENTERPRISE. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
