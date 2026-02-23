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

  const projects = []

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
              <p className="text-gray-500 max-w-xl">Hệ thống đang được cập nhật các giải pháp công nghệ mới nhất.</p>
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
                Hiện tại <span className="text-primary">0</span> sản phẩm sẵn có
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
                  {/* Project image and content hidden for now */}
                </div>
              ))}
            </div>

            {/* Empty State */}
            <div className="text-center py-32 glass rounded-[3rem] animate-fade-in shadow-premium">
              <div className="w-20 h-20 bg-accent/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-accent animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 italic">Sản phẩm đang trong quá trình phát triển</h3>
              <p className="text-gray-500 mb-8 max-w-md mx-auto">
                Hiện tại chúng tôi chưa có sản phẩm nào sẵn dùng. Hệ thống quản lý thú y PetCare (Laravel & MySQL) đang được hoàn thiện.
                Vui lòng quay lại sau!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
