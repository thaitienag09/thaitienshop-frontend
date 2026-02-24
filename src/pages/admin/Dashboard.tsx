import {
    Users,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    LucideIcon
} from 'lucide-react'

interface StatItem {
    title: string;
    value: string;
    icon: LucideIcon;
    change: string;
    isUp: boolean;
}

const stats: StatItem[] = [
    { title: 'Tổng người dùng', value: '156', icon: Users, change: '+12%', isUp: true },
    { title: 'Lượt truy cập', value: '3,240', icon: TrendingUp, change: '+15%', isUp: true },
]

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Tổng quan hệ thống</h1>
                <p className="text-gray-500 font-medium">Chào mừng trở lại, Admin. Đây là những gì đang diễn ra hôm nay.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-50 rounded-xl">
                                <stat.icon className="h-6 w-6 text-blue-600" />
                            </div>
                            <div className={`flex items-center space-x-1 text-sm font-bold ${stat.isUp ? 'text-green-600' : 'text-red-600'}`}>
                                <span>{stat.change}</span>
                                {stat.isUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">{stat.title}</p>
                            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Notifications/Activity */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <h2 className="font-bold text-gray-900 mb-6">Hoạt động mới nhất</h2>
                    <div className="space-y-6">
                        {[1, 2, 3, 4].map((_, i) => (
                            <div key={i} className="flex items-start space-x-4">
                                <div className="w-2 h-2 mt-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Mới đăng ký</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Người dùng <span className="text-blue-600 font-semibold">ThaiTien{i}</span> vừa tạo tài khoản</p>
                                    <p className="text-[10px] text-gray-400 mt-1 font-medium">10 phút trước</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
