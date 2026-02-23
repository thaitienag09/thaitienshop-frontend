import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search, ChevronRight, Clock, Phone, User, LogOut, LayoutDashboard, LogIn, AlertCircle } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../lib/firebase'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { currentUser, isAdmin } = useAuth()
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
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass shadow-premium' : 'bg-transparent'
        }`}
    >
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
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center space-x-2 text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-all border border-blue-100 animate-pulse"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Admin</span>
              </Link>
            )}
          </nav>

          {/* Search & Action */}
          <div className="hidden md:flex items-center space-x-6">
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-1 py-2 rounded-xl hover:opacity-80 transition-all"
                >
                  <span className="text-sm font-black text-primary truncate max-w-[150px]">
                    {currentUser.displayName || 'Tài khoản'}
                  </span>
                </button>

                {isUserMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-50" onClick={() => setIsUserMenuOpen(false)}></div>
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-fade-in z-[60]">
                      <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Tài khoản</p>
                        <p className="text-sm font-bold text-gray-900 truncate">{currentUser.email}</p>
                      </div>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 transition-colors"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          <span>Bảng điều khiển</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut(auth);
                          setIsUserMenuOpen(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Đăng xuất</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full text-sm font-black shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:scale-105 transition-all duration-300 active:scale-95"
              >
                <LogIn className="h-4 w-4" />
                <span>Đăng nhập</span>
              </Link>
            )}
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
          <div className="md:hidden mt-4 glass rounded-3xl p-6 shadow-2xl animate-fade-in border border-white/20">
            <div className="flex flex-col space-y-4">
              {currentUser && (
                <div className="flex items-center space-x-4 pb-4 border-b border-gray-100">
                  <div className="h-12 w-12 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {currentUser.displayName ? currentUser.displayName.charAt(0).toUpperCase() : <User />}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-900">{currentUser.displayName || 'Người dùng'}</p>
                    <p className="text-xs text-gray-500 font-medium truncate max-w-[150px]">{currentUser.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-bold transition-colors ${location.pathname === link.path ? 'text-accent' : 'text-gray-700'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center space-x-3 text-lg font-black text-blue-600 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Trang quản trị</span>
                </Link>
              )}

              <div className="pt-4 space-y-3">
                {currentUser ? (
                  <button
                    onClick={() => {
                      signOut(auth);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-red-50 text-red-600 py-3.5 rounded-2xl flex items-center justify-center space-x-2 font-black transition-all active:scale-95"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Đăng xuất</span>
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    className="w-full bg-primary text-white py-3.5 rounded-2xl flex items-center justify-center space-x-2 font-black shadow-lg shadow-primary/20 transition-all active:scale-95"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LogIn className="h-5 w-5" />
                    <span>Đăng nhập ngay</span>
                  </Link>
                )}

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
          </div>
        )}
      </div>
    </header>
  )
}
