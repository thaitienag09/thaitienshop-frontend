import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, Download, Eye, CheckCircle, Clock, ChevronLeft, Share2, ShieldCheck, Zap, MessageSquare, ChevronRight } from 'lucide-react'

export default function ChiTietDoAn() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('description')

  const project = {
    id: 1,
    title: "Hệ thống Quản lý Cửa hàng Thú y (PetCare)",
    description: "Giải pháp toàn diện quản lý cửa hàng thú y: quản lý hồ sơ thú cưng, lịch hẹn tiêm phòng, kho thuốc và hóa đơn thanh toán.",
    fullDescription: `Dự án PetCare là một hệ thống quản lý chuyên sâu cho các phòng khám và cửa hàng thú y. Hệ thống giúp số hóa quy trình quản lý, từ việc tiếp nhận thú cưng đến việc theo dõi bệnh lý và quản lý kinh doanh.

## Điểm nhấn công nghệ:
- **Cơ sở dữ liệu MySQL**: Thiết kế chuẩn hóa giúp lưu trữ dữ liệu an toàn và truy xuất nhanh chóng.
- **Quản lý hồ sơ**: Lưu trữ thông tin chi tiết về thú cưng, lịch sử khám bệnh và tiêm chủng.
- **Hệ thống kho**: Tự động theo dõi tồn kho thuốc và các sản phẩm chăm sóc thú cưng.
- **Báo cáo tài chính**: Thống kê doanh thu, chi phí và lợi nhuận theo thời gian thực.

## Danh sách tính năng:
- **Quản lý khách hàng**: Lưu trữ thông tin chủ nuôi và liên kết với hồ sơ thú cưng.
- **Lịch hẹn thông minh**: Hệ thống nhắc lịch tiêm phòng và tái khám tự động qua email/SMS.
- **Quản lý bán hàng**: Tích hợp quét mã vạch và in hóa đơn chuyên nghiệp.
- **Phân quyền người dùng**: Quản lý nhân viên với các quyền hạn khác nhau theo chức năng công việc.

## Stack Công nghệ:
- **Ngôn ngữ**: PHP 8.2+, Laravel 10/11 Framework.
- **Cơ sở dữ liệu**: MySQL 8.0 chuẩn hóa.
- **Frontend**: Blade Template hoặc React (Inertia.js) phối hợp Tailwind CSS.
- **Báo cáo**: Laravel Excel hoặc DomPDF hỗ trợ xuất hóa đơn.`,
    price: "199,000",
    originalPrice: "299,000",
    rating: 5.0,
    reviews: 45,
    downloads: 120,
    image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=1000&h=600&fit=crop",
    category: "Store Management",
    author: {
      name: "thaitienshop",
      avatar: "/avtar.png",
      rating: 5.0,
      projects: 50
    },
    createdAt: "2024-02-20",
    updatedAt: "2024-02-23",
    tags: ["PHP", "Laravel", "MySQL", "Pet Management"],
    requirements: [
      "PHP >= 8.2 & Composer",
      "MySQL Server 8.0+",
      "Apache/Nginx (XAMPP/Laragon)",
      "Trình duyệt hiện đại (Chrome, Edge)"
    ],
    includes: [
      "Trọn bộ Source Code Laravel Project",
      "File Script Database MySQL chuẩn (.sql)",
      "Tài liệu hướng dẫn cấu hình môi trường (.env)",
      "Báo cáo đồ án chi tiết (Word/PDF)",
      "Hỗ trợ cài đặt & fix lỗi 1:1 qua Ultraview"
    ]
  }

  const reviews = [
    {
      id: 1,
      user: "Nguyễn Minh Tùng",
      role: "CTO @ TechGlobal",
      rating: 5,
      comment: "Cấu trúc code cực kỳ chuyên nghiệp. Đây là đồ án chất lượng nhất tôi từng thấy trên thị trường Việt Nam.",
      date: "2024-01-18"
    },
    {
      id: 2,
      user: "Lê Hoàng Nam",
      role: "Senior Developer",
      rating: 5,
      comment: "Tài liệu đi kèm rất chi tiết, giúp đội ngũ của tôi triển khai chỉ trong vài giờ.",
      date: "2024-01-16"
    }
  ]

  return (
    <div className="min-h-screen bg-surface-muted pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Navigation & Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
          <Link to="/projects" className="flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors group">
            <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            QUAY LẠI THƯ VIỆN
          </Link>
          <div className="flex items-center space-x-4">
            <button className="p-3 glass rounded-2xl text-gray-400 hover:text-accent transition-colors shadow-sm">
              <Share2 className="h-5 w-5" />
            </button>
            <span className="h-8 w-[1px] bg-gray-200 hidden md:block"></span>
            <div className="flex items-center bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
              <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-none">Verified Asset</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-12">
            {/* Project Hero */}
            <div className="glass rounded-[3rem] overflow-hidden shadow-premium border border-white/50">
              <div className="relative h-[28rem]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10">
                  <div className="flex items-center space-x-4 mb-4">
                    <span className="px-4 py-2 glass-dark text-white rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">
                      {project.category}
                    </span>
                    <div className="flex items-center text-white/90">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span className="text-sm font-bold">{project.rating}</span>
                      <span className="text-xs text-white/60 ml-1">({project.reviews} đánh giá)</span>
                    </div>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                    {project.title}
                  </h1>
                </div>
              </div>

              {/* Tabs Integration */}
              <div className="p-10">
                <div className="flex space-x-10 border-b border-gray-100 mb-10 overflow-x-auto">
                  {[
                    { id: 'description', label: 'TỔNG QUAN GIẢI PHÁP' },
                    { id: 'requirements', label: 'YÊU CẦU TRIỂN KHAI' },
                    { id: 'includes', label: 'GÓI TÀI SẢN' },
                    { id: 'reviews', label: 'PHẢN HỒI KHÁCH HÀNG' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-4 text-xs font-black tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full animate-scale-in"></div>}
                    </button>
                  ))}
                </div>

                <div className="min-h-[30rem] animate-fade-in">
                  {activeTab === 'description' && (
                    <div className="prose prose-slate max-w-none text-gray-500 leading-loose prose-headings:text-primary prose-strong:text-primary">
                      <div className="whitespace-pre-line">
                        {project.fullDescription}
                      </div>
                    </div>
                  )}

                  {activeTab === 'requirements' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {project.requirements.map((req, index) => (
                        <div key={index} className="flex items-start p-6 bg-surface-muted rounded-3xl border border-gray-100">
                          <Zap className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                          <span className="text-sm font-bold text-primary italic uppercase tracking-wider">{req}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'includes' && (
                    <div className="space-y-4">
                      {project.includes.map((item, index) => (
                        <div key={index} className="flex items-center p-5 bg-white shadow-sm border border-gray-50 rounded-2xl">
                          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mr-5">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          </div>
                          <span className="text-sm font-semibold text-gray-600">{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-8">
                      {reviews.map((review) => (
                        <div key={review.id} className="p-8 glass rounded-[2rem] border border-white shadow-sm">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-4 shadow-premium leading-none text-white font-black">
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <h4 className="font-bold text-primary">{review.user}</h4>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.role}</p>
                              </div>
                            </div>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                            </div>
                          </div>
                          <p className="text-gray-500 italic leading-relaxed">"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-8">
            {/* Purchase Card */}
            <div className="glass p-10 rounded-[3rem] shadow-premium sticky top-32 border border-white/50">
              <div className="mb-10 text-center lg:text-left">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3 block">Mức giá sở hữu</span>
                <div className="flex items-center justify-center lg:justify-start space-x-4">
                  <h2 className="text-4xl font-black text-primary tracking-tighter">{project.price}₫</h2>
                  {project.originalPrice && (
                    <span className="text-xl text-gray-400 line-through font-medium opacity-50">{project.originalPrice}₫</span>
                  )}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <button disabled className="w-full bg-gray-200 text-gray-400 py-5 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center cursor-not-allowed">
                  CHƯA SẴN DÙNG
                </button>
                <button className="w-full bg-white text-primary border border-gray-100 py-5 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:bg-surface-muted transition-all duration-300">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  GỬI YÊU CẦU TƯ VẤN
                </button>
              </div>

              <div className="px-6 py-6 bg-amber-50 rounded-2xl border border-amber-100 mb-10">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 text-center flex items-center justify-center">
                  <Clock className="h-4 w-4 mr-2" /> ĐANG PHÁT TRIỂN
                </p>
                <p className="text-xs text-amber-700/70 text-center font-bold leading-relaxed">
                  Hệ thống PetCare đang được hoàn thiện mã nguồn. <br />
                  Chức năng tải code tạm thời bị khóa.
                </p>
              </div>

              <div className="space-y-4 pt-10 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-3 text-accent" />
                    Đã chuyển giao
                  </div>
                  <span className="text-primary">{project.downloads}+</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-3 text-accent" />
                    Cập nhật cuối
                  </div>
                  <span className="text-primary">{new Date(project.updatedAt).toLocaleDateString('vi-VN')}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 mr-3 text-accent" />
                    Đang quan tâm
                  </div>
                  <span className="text-primary">{Math.floor(Math.random() * 50) + 20} users</span>
                </div>
              </div>
            </div>

            {/* Author Card */}
            <div className="glass p-8 rounded-[2.5rem] shadow-premium border border-white/50 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-accent text-white p-2 rounded-xl">
                  <Star className="h-4 w-4 fill-current" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Development Team</h3>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mr-5 shadow-premium">
                  <span className="text-white font-black text-2xl">S</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary tracking-tight">{project.author.name}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400 mr-2">
                      <Star className="h-3 w-3 fill-current" />
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Elite Developer</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed italic mb-8 border-l-4 border-accent/20 pl-4">
                "Chúng tôi không chỉ bán code, chúng tôi cung cấp giải pháp kiến tạo sự nghiệp cho thế hệ lập trình viên mới."
              </p>
              <button className="w-full text-[10px] font-black tracking-widest text-primary uppercase hover:text-accent transition-colors flex items-center justify-center">
                XEM THÊM CÁC GIẢI PHÁP KHÁC
                <ChevronRight className="h-3 w-3 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
