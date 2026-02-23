import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Filter, Star, Eye, Download, SlidersHorizontal, X, ChevronRight, LayoutGrid, List, Clock } from 'lucide-react'

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
      id: 'shop-mon-an',
      title: 'Hệ thống Đặt đồ ăn trực tuyến Shop Món Ăn (MERN Stack)',
      description: 'Đồ án Fullstack hoàn chỉnh: Đặt món, Giỏ hàng, Quản lý đơn hàng. Tích hợp trang Admin quản trị món ăn. Giao diện hiện đại, mượt mà và tối ưu hóa trải nghiệm người dùng.',
      price: '200.000',
      originalPrice: '300.000',
      category: 'web',
      tags: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
      rating: 5.0,
      downloads: 88,
      createdAt: '2024-05-15',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=450&fit=crop'
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
      case 'price-low': return parseInt(a.price.replace(/\D/g, '')) - parseInt(b.price.replace(/\D/g, ''))
      case 'price-high': return parseInt(b.price.replace(/\D/g, '')) - parseInt(a.price.replace(/\D/g, ''))
      default: return 0
    }
  })

  const clearAllFilters = () => {
    setSearchTerm('')
    setSelectedCategory('all')
  }

  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Page Header */}
        <div className="mb-16 animate-fade-in text-center lg:text-left">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between items-center space-y-6 lg:space-y-0">
            <div>
              <h1 className="text-5xl font-black text-primary tracking-tighter mb-4 uppercase">Thư viện Đồ án</h1>
              <div className="h-1.5 w-24 bg-accent rounded-full mx-auto lg:mx-0 mb-4"></div>
              <p className="text-gray-500 max-w-xl font-medium">Khám phá các giải pháp phần mềm đạt chuẩn doanh nghiệp, tối ưu hóa cho hiệu năng và mở rộng.</p>
            </div>
            <div className="flex bg-white p-1.5 rounded-2xl shadow-premium border border-gray-100">
              <button className="p-3 text-accent bg-accent/5 rounded-xl"><LayoutGrid className="h-5 w-5" /></button>
              <button className="p-3 text-gray-400 hover:text-gray-600 transition-colors"><List className="h-5 w-5" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-32 glass p-10 rounded-[3rem] shadow-premium border border-white/40">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl font-black text-primary uppercase tracking-tighter">Bộ lọc</h2>
                <button onClick={clearAllFilters} className="text-[10px] font-black text-accent uppercase tracking-widest hover:opacity-70 transition-opacity">Xóa hết</button>
              </div>

              {/* Search */}
              <div className="mb-12">
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5">Tìm kiếm</h3>
                <div className="relative group">
                  <Search className="absolute left-4 top-3.5 h-4 w-4 text-gray-400 group-focus-within:text-accent transition-colors" />
                  <input
                    type="text"
                    placeholder="Tên đồ án, công nghệ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-accent/20 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-5">Danh mục</h3>
                <div className="space-y-3">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black transition-all ${selectedCategory === category.id
                        ? 'bg-primary text-white shadow-premium'
                        : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                      <span className="uppercase tracking-widest">{category.name}</span>
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
            <div className="flex flex-col sm:flex-row justify-between items-center mb-10 space-y-4 sm:space-y-0 bg-white p-6 rounded-[2.5rem] shadow-premium border border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">
                Đang hiển thị <span className="text-primary">{filteredProjects.length}</span> giải pháp
              </p>
              <div className="flex items-center space-x-3">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-xs font-black text-primary focus:ring-0 cursor-pointer uppercase tracking-widest"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="popular">Phổ biến</option>
                  <option value="rating">Đánh giá</option>
                  <option value="price-low">Giá: Thấp-Cao</option>
                  <option value="price-high">Giá: Cao-Thấp</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="group bg-white rounded-[3rem] shadow-premium hover:shadow-glow hover:-translate-y-2 transition-all duration-700 overflow-hidden border border-gray-50 flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                        <Link to={`/project/${project.id}`} className="w-full py-4 bg-white text-primary rounded-2xl font-black text-[10px] uppercase tracking-widest text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                          Xem chi tiết
                        </Link>
                      </div>
                      <div className="absolute top-6 left-6 flex space-x-2">
                        {project.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-10 flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-xl font-black text-primary tracking-tighter uppercase leading-tight group-hover:text-accent transition-colors">{project.title}</h3>
                        <div className="flex items-center space-x-1 text-accent">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-xs font-black">{project.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-500 text-xs font-medium leading-relaxed mb-8 line-clamp-3 italic">
                        "{project.description}"
                      </p>
                      <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mb-1">Giá sở hữu</p>
                          <div className="flex items-baseline space-x-2">
                            <p className="text-2xl font-black text-primary tracking-tighter">{project.price} <span className="text-xs">VNĐ</span></p>
                            {project.originalPrice && (
                              <p className="text-xs font-bold text-gray-400 line-through italic">{project.originalPrice}đ</p>
                            )}
                          </div>
                        </div>
                        <Link to={`/project/${project.id}`} className="p-4 bg-accent/5 text-accent rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-500">
                          <ChevronRight className="h-5 w-5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="text-center py-32 bg-white rounded-[4rem] animate-fade-in shadow-premium border border-gray-100">
                <div className="w-24 h-24 bg-accent/5 rounded-[2rem] flex items-center justify-center mx-auto mb-10">
                  <Clock className="h-10 w-10 text-accent animate-pulse" />
                </div>
                <h3 className="text-3xl font-black text-primary mb-4 tracking-tighter uppercase">Không tìm thấy đồ án</h3>
                <p className="text-gray-400 mb-10 max-w-sm mx-auto font-medium italic">
                  Chúng tôi đang trong quá trình cập nhật thư viện. Vui lòng thử lại với từ khóa khác hoặc quay lại sau.
                </p>
                <button onClick={clearAllFilters} className="px-10 py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-premium hover:shadow-glow transition-all">Quay lại danh sách</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
