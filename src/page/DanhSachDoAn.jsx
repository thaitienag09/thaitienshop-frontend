import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Eye, Download, SlidersHorizontal, X, ChevronRight, LayoutGrid, List } from 'lucide-react'

export default function DanhSachDoAn() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const categories = [
    { id: 'all', name: 'Tất cả dự án' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Application' },
    { id: 'desktop', name: 'Desktop Software' },
    { id: 'tools', name: 'Tools & Utilities' }
  ]

  const projects = [
    {
      id: 1,
      title: "E-Commerce Enterprise Solution",
      description: "Hệ thống thương mại điện tử quy mô lớn với microservices architecture, tích hợp thanh toán đa phương thức và quản trị thông minh.",
      price: "299,000",
      originalPrice: "399,000",
      rating: 4.8,
      reviews: 156,
      downloads: 1200,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      category: "web",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-15",
      tags: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 2,
      title: "Restaurant Management System",
      description: "Giải pháp quản lý nhà hàng 4.0 hỗ trợ order tại bàn, quản lý kho và báo cáo doanh thu thời gian thực.",
      price: "399,000",
      originalPrice: "499,000",
      rating: 4.9,
      reviews: 89,
      downloads: 800,
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop",
      category: "mobile",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-10",
      tags: ["React Native", "Firebase", "Redux"]
    },
    {
      id: 3,
      title: "Corporate News Portal",
      description: "Cổng thông tin doanh nghiệp với hệ thống CMS tùy biến cao, tối ưu SEO và tốc độ tải trang vượt trội.",
      price: "299,000",
      rating: 4.7,
      reviews: 203,
      downloads: 1500,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      category: "web",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-08",
      tags: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 10,
      title: "Enterprise Real-time Chat",
      description: "Ứng dụng nhắn tin nội bộ doanh nghiệp với độ bảo mật cao, hỗ trợ video call và chia sẻ tệp tin dung lượng lớn.",
      price: "449,000",
      rating: 4.8,
      reviews: 156,
      downloads: 1200,
      image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop",
      category: "mobile",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-12",
      tags: ["React Native", "Socket.io", "Firebase"]
    },
    {
      id: 11,
      title: "HR & Payroll Management",
      description: "Phần mềm quản trị nhân sự và tiền lương tự động, tích hợp chấm công khuôn mặt và quản lý KPI.",
      price: "329,000",
      rating: 4.6,
      reviews: 78,
      downloads: 550,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
      category: "desktop",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-10",
      tags: ["C#", "WPF", "SQL Server"]
    },
    {
      id: 12,
      title: "Next.js Professional Portfolio",
      description: "Mẫu portfolio cao cấp cho chuyên gia công nghệ, tích hợp blog và giới thiệu dự án chuyên nghiệp.",
      price: "199,000",
      rating: 4.7,
      reviews: 112,
      downloads: 800,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
      category: "web",
      author: "Dương Thái Tiến",
      createdAt: "2024-01-08",
      tags: ["Next.js", "React", "Tailwind CSS"]
    }
  ]

  const filteredProjects = projects.filter(project => {
    const searchLower = searchTerm.toLowerCase().trim()
    const matchesSearch = searchLower === '' ||
      project.title.toLowerCase().includes(searchLower) ||
      project.description.toLowerCase().includes(searchLower) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchLower))

    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest': return new Date(b.createdAt) - new Date(a.createdAt)
      case 'popular': return b.downloads - a.downloads
      case 'rating': return b.rating - a.rating
      case 'price-low': return parseInt(a.price.replace(',', '')) - parseInt(b.price.replace(',', ''))
      case 'price-high': return parseInt(b.price.replace(',', '')) - parseInt(a.price.replace(',', ''))
      default: return 0
    }
  })

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  return (
    <div className="min-h-screen bg-surface-muted pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-3">Thư viện Dự án</h1>
              <p className="text-gray-500 max-w-xl">Khám phá các giải pháp công nghệ cao cấp được phát triển bởi thaitienshop.</p>
            </div>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100">
              <button className="p-2 text-accent bg-accent/5 rounded-lg"><LayoutGrid className="h-5 w-5" /></button>
              <button className="p-2 text-gray-400 hover:text-gray-600"><List className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 space-y-10">
            <div className={`lg:block ${isSidebarOpen ? 'block' : 'hidden'} glass p-8 rounded-[2rem] shadow-premium`}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-primary">Bộ lọc</h2>
                <button onClick={clearAllFilters} className="text-xs font-bold text-accent uppercase tracking-wider hover:opacity-70 transition-opacity">Xóa hết</button>
              </div>

              {/* Search */}
              <div className="mb-10">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Tìm kiếm</h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Tên dự án, công nghệ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-surface-muted border-none rounded-2xl text-sm focus:ring-2 focus:ring-accent/20 transition-all"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Danh mục</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${selectedCategory === category.id
                        ? 'bg-primary text-white shadow-premium'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <span>{category.name}</span>
                      {selectedCategory === category.id && <ChevronRight className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 space-y-4 sm:space-y-0 bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-white/50 shadow-sm">
              <p className="text-sm font-semibold text-gray-500">
                Hiển thị <span className="text-primary">{filteredProjects.length}</span> giải pháp phù hợp
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400 font-medium">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm font-bold text-primary focus:ring-0 cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến nhất</option>
                  <option value="rating">Đánh giá cao</option>
                  <option value="price-low">Giá thấp dần</option>
                  <option value="price-high">Giá cao dần</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="group glass rounded-[2.5rem] shadow-premium hover:shadow-glow hover:-translate-y-2 transition-all duration-500 overflow-hidden border border-white/40">
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 glass-dark text-white rounded-full text-[10px] font-bold uppercase tracking-widest leading-none">
                        {categories.find(c => c.id === project.category)?.name}
                      </span>
                    </div>
                  </div>

                  <div className="p-10">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-primary line-clamp-1 group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-8 h-10">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-bold text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100 uppercase tracking-wider italic">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-4 pt-8 border-t border-gray-100/50">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Giá sở hữu</span>
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl font-black text-primary">{project.price}₫</span>
                            {project.originalPrice && (
                              <span className="text-sm text-gray-400 line-through font-medium">{project.originalPrice}₫</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end text-xs font-bold text-gray-400 uppercase tracking-widest space-y-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-primary">{project.rating}</span>
                          </div>
                          <span>{project.downloads}+ lượt tải</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Link
                          to={`/project/${project.id}`}
                          className="bg-white text-primary border border-gray-100 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-gray-50 transition-all duration-300 shadow-sm"
                        >
                          CHI TIẾT
                        </Link>
                        <Link
                          to="/payment"
                          className="bg-primary text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center hover:bg-accent transition-all duration-300 shadow-premium hover:shadow-glow"
                        >
                          SỞ HỮU NGAY
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
              <div className="text-center py-32 glass rounded-[3rem] animate-fade-in shadow-premium">
                <Search className="h-20 w-20 mx-auto text-gray-200 mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-3">Không tìm thấy kết quả</h3>
                <p className="text-gray-500 mb-8">Hãy thử với từ khóa khác hoặc xóa bớt bộ lọc.</p>
                <button onClick={clearAllFilters} className="bg-primary text-white px-8 py-3 rounded-2xl font-bold shadow-premium hover:shadow-glow transition-all">Làm mới bộ lọc</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
