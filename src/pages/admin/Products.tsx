import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { db } from '../../config/firebase'
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore'
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Package,
    Box,
    ExternalLink
} from 'lucide-react'
import type { Project } from '../../types'

export default function ProductManagement() {
    const [products, setProducts] = useState<Project[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        const productsRef = collection(db, 'projects')
        const q = query(productsRef, orderBy('createdAt', 'desc'))

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const productList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...(doc.data() as any)
            }))
            setProducts(productList)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này? Thao tác này không thể hoàn tác.')) {
            try {
                await deleteDoc(doc(db, 'projects', id))
            } catch (error) {
                console.error('Error deleting product:', error)
                alert('Đã có lỗi xảy ra khi xóa sản phẩm.')
            }
        }
    }

    const filteredProducts = products.filter(p =>
        p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
                    <p className="text-gray-500 font-medium text-sm">Đăng bài, chỉnh sửa và quản lý các đồ án trong thư viện.</p>
                </div>
                <Link
                    to="/admin/products/new"
                    className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                    <Plus className="h-5 w-5" />
                    <span>Đăng sản phẩm mới</span>
                </Link>
            </div>

            {/* Search and Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm theo tên hoặc danh mục..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
                    />
                </div>
            </div>

            {/* Products List */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-64 text-blue-600">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-current"></div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="p-12 text-center text-gray-400">
                        <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p className="font-bold">Không tìm thấy sản phẩm nào</p>
                        <p className="text-sm">Hãy thử thay đổi từ khóa tìm kiếm hoặc đăng sản phẩm mới.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4">Sản phẩm</th>
                                    <th className="px-6 py-4">Giá bán</th>
                                    <th className="px-6 py-4">Danh mục</th>
                                    <th className="px-6 py-4">Số lượt mua</th>
                                    <th className="px-6 py-4 text-center">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredProducts.map((p) => (
                                    <tr key={p.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="h-14 w-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                    {p.image ? (
                                                        <img src={p.image} alt="" className="h-full w-full object-cover" />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-gray-300">
                                                            <Box className="h-6 w-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="max-w-[250px]">
                                                    <p className="text-sm font-bold text-gray-900 truncate">{p.title}</p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">ID: {p.id.substring(0, 8)}...</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-blue-600">{p.price}đ</span>
                                                {p.originalPrice && (
                                                    <span className="text-[10px] text-gray-400 line-through">{p.originalPrice}đ</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase rounded-lg border border-gray-200">
                                                {p.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center space-x-1 text-sm font-bold text-gray-700">
                                                <span>{p.downloads || 0}</span>
                                                <span className="text-[10px] text-gray-400 uppercase font-black">lượt</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center space-x-1">
                                                <Link
                                                    to={`/project/${p.id}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                                                    title="Xem trên trang khách"
                                                >
                                                    <ExternalLink className="h-4 w-4" />
                                                </Link>
                                                <Link
                                                    to={`/admin/products/edit/${p.id}`}
                                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                                    title="Chỉnh sửa"
                                                >
                                                    <Edit2 className="h-4 w-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(p.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Xóa sản phẩm"
                                                >
                                                    <Trash2 className="h-4 w-4" />
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
