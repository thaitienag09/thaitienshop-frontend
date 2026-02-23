import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold">TiếnCode</span>
            </div>
            <p className="text-gray-400 text-sm">
              Nền tảng bán đồ án CNTT chất lượng cao của Tiến. 
              Đồ án được tạo ra với kinh nghiệm và kiến thức chuyên sâu.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-red-500 transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-red-500 transition-colors">
                  Đồ án
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-red-500 transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-400 hover:text-red-500 transition-colors">
                  Đăng nhập
                </Link>
              </li>
            </ul>
          </div>


          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Mail className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="text-gray-400 text-sm group-hover:text-red-500 transition-colors">tiencode@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <Phone className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="text-gray-400 text-sm group-hover:text-red-500 transition-colors">+84 123 456 789</span>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer">
                <MapPin className="h-5 w-5 text-gray-400 group-hover:text-red-500 transition-colors" />
                <span className="text-gray-400 text-sm group-hover:text-red-500 transition-colors">Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Vị trí</h3>
            <div className="w-full h-48 bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4796740123456!2d105.854167!3d21.028511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab8c8b8c8b8c%3A0x8b8c8b8c8b8c8b8c!2sHanoi%2C%20Vietnam!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="TiếnCode Location"
                className="rounded-lg"
              ></iframe>
            </div>
            <p className="text-gray-400 text-xs">
              📍 Trụ sở chính tại Hà Nội, Việt Nam
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 TiếnCode. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  )
}
