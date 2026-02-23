import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ChevronRight, Clock, Phone } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Sản phẩm', path: '/projects' },
    { name: 'Về chúng tôi', path: '/about' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-premium' : 'bg-transparent'
        }`}
    >
      {/* Top Bar */}
      <div className={`bg-primary transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-10 opacity-100'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex justify-between items-center text-white/80 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
          <div className="flex items-center space-x-6">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-2 text-accent" />
              <span>Giờ mở cửa: 07:00 - 22:00</span>
            </div>
            <div className="flex items-center hidden sm:flex">
              <Phone className="h-3.5 w-3.5 mr-2 text-accent" />
              <span>Hỗ trợ: +84 123 456 789</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:block">Chất lượng hàng đầu cho chuyên gia</span>
          </div>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-xl shadow-premium transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-primary">thaitienshop</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-gray-500">Enterprise Solutions</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-accent ${location.pathname === link.path ? 'text-accent' : 'text-gray-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Search & Action */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="w-48 pl-10 pr-4 py-2 text-sm bg-gray-100/50 border-none rounded-full focus:ring-2 focus:ring-accent/20 focus:w-64 transition-all duration-300"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 group-hover:text-accent transition-colors" />
            </div>
            <Link
              to="/projects"
              className="flex items-center space-x-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-premium hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Bắt đầu</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass rounded-2xl p-6 shadow-premium animate-fade-in">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-lg font-semibold text-gray-700 hover:text-accent transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100">
                <Link
                  to="/projects"
                  className="w-full bg-primary text-white py-3 rounded-xl flex items-center justify-center space-x-2 font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>Xem dự án</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
