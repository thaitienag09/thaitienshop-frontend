import { useEffect, useState } from 'react'
import { rtdb as db, db as firestore } from '../../config/firebase'
import { ref, onValue, update } from 'firebase/database'
import { collection, getDocs } from 'firebase/firestore'
import {
    Search,
    Filter,
    CheckCircle,
    XCircle,
    ShoppingBag,
    Download,
    AlertCircle
} from 'lucide-react'
import type { Transaction } from '../../types'

export default function OrderManagement() {
    const [orders, setOrders] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [productsMap, setProductsMap] = useState<Record<string, number>>({})

    useEffect(() => {
        // Lấy danh sách sản phẩm để đối soát giá
        const fetchProductsMap = async () => {
            try {
                const querySnapshot = await getDocs(collection(firestore, 'projects'))
                const mapping: Record<string, number> = {}
                querySnapshot.forEach((doc) => {
                    mapping[doc.id] = doc.data().price
                })
                setProductsMap(mapping)
            } catch (error) {
                console.error('Lỗi lấy danh sách sản phẩm:', error)
            }
        }

        fetchProductsMap()

        const ordersRef = ref(db, 'transactions')
        const unsubscribe = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const ordersList = Object.entries(data).map(([id, value]) => ({
                    id,
                    ...(value as any)
                })).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
                setOrders(ordersList)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        try {
            await update(ref(db, `transactions/${orderId}`), {
                status: newStatus,
                updatedAt: Date.now()
            })
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error)
        }
    }

    const filteredOrders = orders.filter(order =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'success': return 'bg-green-100 text-green-700 border-green-200'
            case 'failed': return 'bg-red-100 text-red-700 border-red-200'
            case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200'
            default: return 'bg-gray-100 text-gray-700 border-gray-200'
        }
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý đơn hàng</h1>
                    <p className="text-gray-500 font-medium text-sm">Quản lý và cập nhật trạng thái thanh toán của khách hàng.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                        <Download className="h-4 w-4" />
                        <span>Xuất báo cáo</span>
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
                        Tạo đơn mới
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm theo Mã GD hoặc Email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl flex items-center space-x-2 text-sm font-bold text-gray-600 hover:bg-white transition-all">
                        <Filter className="h-4 w-4" />
                        <span>Bộ lọc</span>
                    </button>
                </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden min-h-[400px]">
                {loading ? (
                    <div className="flex items-center justify-center h-[400px]">
                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
                    </div>
                ) : filteredOrders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-400">
                        <ShoppingBag className="h-16 w-16 mb-4 opacity-20" />
                        <p className="font-bold">Chưa có đơn hàng nào</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Mã Giao dịch</th>
                                    <th className="px-6 py-4">Khách hàng</th>
                                    <th className="px-6 py-4">Sản phẩm / Giá</th>
                                    <th className="px-6 py-4">Thời gian</th>
                                    <th className="px-6 py-4">Trạng thái</th>
                                    <th className="px-6 py-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-bold text-gray-900 font-mono tracking-tight">{order.id}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900">{order.email}</span>
                                                <span className="text-[10px] text-gray-400 font-medium">Customer ID: {order.userId || 'Guest'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-gray-900 truncate max-w-[200px]">{order.projectName}</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`text-[10px] font-black ${productsMap[order.projectId] && Number(order.price) !== Number(productsMap[order.projectId])
                                                        ? 'text-red-500 bg-red-50 px-2 py-0.5 rounded'
                                                        : 'text-blue-600'
                                                        }`}>
                                                        {order.price}đ
                                                    </span>
                                                    {productsMap[order.projectId] && Number(order.price) !== Number(productsMap[order.projectId]) && (
                                                        <div className="group relative">
                                                            <AlertCircle className="h-3 w-3 text-red-500 animate-pulse cursor-help" />
                                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-red-600 text-white text-[9px] font-bold rounded-lg shadow-xl z-50">
                                                                CẢNH BÁO: Giá gốc là {productsMap[order.projectId]}đ. Khách hàng đã gửi giá sai!
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-gray-500 font-medium">
                                                {order.createdAt ? new Date(order.createdAt).toLocaleString('vi-VN') : 'Đang xử lý...'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider border ${getStatusStyle(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={() => handleUpdateStatus(order.id, 'success')}
                                                    className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    title="Xác nhận"
                                                >
                                                    <CheckCircle className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleUpdateStatus(order.id, 'failed')}
                                                    className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                    title="Hủy đơn"
                                                >
                                                    <XCircle className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
