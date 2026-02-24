import { BrowserRouter as Router, Routes, Route, Link, Outlet } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import Trangchu from '@/pages/Trangchu'
import DanhSachDoAn from '@/pages/DanhSachDoAn'
import ChiTietDoAn from '@/pages/ChiTietDoAn'
import Auth from '@/pages/Auth'
import ProtectedRoute from '@/components/layout/ProtectedRoute'
import AdminLayout from '@/components/layout/AdminLayout'
import AdminDashboard from '@/pages/admin/Dashboard'
import OrderManagement from '@/pages/admin/Orders'
import UserManagement from '@/pages/admin/Users'
import ProductManagement from '@/pages/admin/Products'
import ProductForm from '@/pages/admin/ProductForm'

// Layout for public pages with Header and Footer
function PublicLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                {/* Public Routes with Header & Footer */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Trangchu />} />
                    <Route path="/projects" element={<DanhSachDoAn />} />
                    <Route path="/project/:id" element={<ChiTietDoAn />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/forgot-password" element={
                        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
                            <h1 className="text-3xl font-black text-primary mb-4">QUÊN MẬT KHẨU?</h1>
                            <p className="text-gray-500 max-w-md mb-8">Tính năng này đang được phát triển. Vui lòng liên hệ quản trị viên để được hỗ trợ khôi phục mật khẩu.</p>
                            <Link to="/auth" className="px-8 py-3 bg-[#0f172a] text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all">Quay lại đăng nhập</Link>
                        </div>
                    } />
                    <Route path="*" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">404 - Trang không tìm thấy</h1></div>} />
                </Route>

                {/* Admin Routes - Completely separate layout */}
                <Route path="/admin" element={
                    <ProtectedRoute adminOnly={true}>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="users" element={<UserManagement />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="products/new" element={<ProductForm />} />
                    <Route path="products/edit/:id" element={<ProductForm />} />
                    <Route path="settings" element={<div>Đang phát triển: Cài đặt hệ thống</div>} />
                </Route>
            </Routes>
        </Router>
    )
}
