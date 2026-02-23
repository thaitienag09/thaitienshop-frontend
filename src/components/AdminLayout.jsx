import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    ChevronRight,
    Search,
    Bell,
    Home,
    Package,
    ClipboardList
} from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

const menuItems = [
    { title: 'Trang chủ', icon: Home, path: '/' },
    { title: 'Tổng quan', icon: LayoutDashboard, path: '/admin' },
    { title: 'Đơn hàng', icon: ClipboardList, path: '/admin/orders' },
    { title: 'Sản phẩm', icon: Package, path: '/admin/products' },
    { title: 'Người dùng', icon: Users, path: '/admin/users' },
    { title: 'Cài đặt', icon: Settings, path: '/admin/settings' },
];

export default function AdminLayout() {
    const location = useLocation();

    const handleLogout = () => {
        signOut(auth);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 flex items-center space-x-3 border-b border-gray-100">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">A</span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">TiếnCode Admin</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-500 hover:bg-gray-100'
                                    }`}
                            >
                                <div className="flex items-center space-x-3">
                                    <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                                    <span className="font-semibold">{item.title}</span>
                                </div>
                                {isActive && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all group"
                    >
                        <LogOut className="h-5 w-5 text-gray-400 group-hover:text-red-600" />
                        <span className="font-semibold">Đăng xuất</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-xl border border-gray-100 w-96">
                        <Search className="h-4 w-4 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm nhanh..."
                            className="bg-transparent border-none focus:ring-0 text-sm w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg relative">
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200"></div>
                        <div className="flex items-center space-x-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900">Admin</p>
                                <p className="text-[10px] text-gray-500 font-medium">Toàn quyền</p>
                            </div>
                            <div className="h-10 w-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
                                AD
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
