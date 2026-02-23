import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Star, Download, Eye, CheckCircle, Clock, ChevronLeft, Share2, ShieldCheck, Zap, MessageSquare } from 'lucide-react'

export default function ChiTietDoAn() {
  const [activeTab, setActiveTab] = useState('description')

  const project = {
    id: 1,
    title: "E-Commerce Enterprise Solution",
    description: "Hệ thống thương mại điện tử quy mô lớn với microservices architecture, tích hợp thanh toán đa phương thức và quản trị thông minh.",
    fullDescription: `Dự án E-Commerce Enterprise Solution là một bước tiến đột phá trong việc xây dựng nền tảng bán hàng trực tuyến cho doanh nghiệp. Với kiến trúc Microservices và ứng dụng các công nghệ hiện đại nhất, giải pháp này đảm bảo tính vươn tầm, bảo mật và hiệu suất tối ưu cho mọi quy mô kinh doanh.

## Điểm nhấn công nghệ:
- **Kiến trúc Microservices**: Tách biệt hoàn toàn phần dịch vụ, dễ dàng mở rộng và bảo trì.
- **Frontend Hiện đại**: Xây dựng trên React 18, Next.js 14 với Server Components tối ưu SEO.
- **Hệ quản trị thông minh**: Admin Dashboard tích hợp phân tích dữ liệu và báo cáo real-time.
- **Bảo mật đa tầng**: JWT, OAuth2 kết hợp với hệ thống lọc SQL Injection và XSS.

## Danh sách tính năng:
- **Hệ thống thanh toán**: Tích hợp VNPAY, MOMO, ZaloPay và Manual Bank Transfer.
- **Quản lý kho vận**: Tối ưu hóa quy trình nhập xuất và theo dõi tồn kho tự động.
- **Công cụ Marketing**: Tích hợp mã giảm giá, marketing email và tracking người dùng.
- **Đa ngôn ngữ & Tiền tệ**: Sẵn sàng cho thị trường quốc tế với cấu hình linh hoạt.

## Stack Công nghệ:
- **Phía người dùng**: React, Tailwind CSS, Framer Motion, Redux Toolkit.
- **Hệ thống lõi**: Node.js Enterprise, Express, Socket.io cho tính năng real-time.
- **Cơ sở dữ liệu**: MongoDB Cluster kết hợp Redis Caching cho tốc độ vượt trội.
- **Triển khai**: Dockerize hoàn toàn, sẵn sàng cho AWS, Google Cloud hoặc Vercel.`,
    price: "299,000",
    originalPrice: "399,000",
    rating: 4.8,
    reviews: 156,
    downloads: 1200,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1000&h=600&fit=crop",
    category: "Web Development",
    author: {
      name: "thaitienshop",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5.0,
      projects: 50
    },
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    tags: ["Enterprise", "Microservices", "React", "Node.js", "Scalable"],
    requirements: [
      "Node.js 18+ LTS",
      "MongoDB 6.0+",
      "Redis Server 7.0+",
      "Cơ bản về Docker & Kubernetes"
    ],
    includes: [
      "Toàn bộ Source Code (Frontend & Backend)",
      "Tài liệu kiến trúc Microservices chi tiết",
      "Kịch bản deploy Docker Compose",
      "Hỗ trợ cấu hình môi trường 1:1",
      "Bản cập nhật tính năng định kỳ",
      "Quyền truy cập cộng đồng Dev Enterprise"
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

              <div className="space-y-4 mb-10">
                <Link to="/payment" className="w-full bg-primary text-white py-5 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center shadow-glow hover:bg-accent transition-all duration-300 transform hover:scale-[1.02]">
                  SỞ HỮU NGAY
                </Link>
                <button className="w-full bg-white text-primary border border-gray-100 py-5 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:bg-surface-muted transition-all duration-300">
                  <MessageSquare className="h-5 w-5 mr-3" />
                  TƯ VẤN 1:1
                </button>
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
