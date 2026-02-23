import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, Eye, Calendar, CreditCard, CheckCircle, Clock, X } from 'lucide-react'

export default function DonHang() {
  const [selectedOrder, setSelectedOrder] = useState(null)

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'completed',
      statusText: 'Hoàn thành',
      total: '299,000',
      paymentMethod: 'banking',
      items: [
        {
          id: 1,
          title: "E-Commerce Website với React & Node.js",
          price: "299,000",
          originalPrice: "399,000",
          image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop",
          downloadLink: "#"
        }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      status: 'completed',
      statusText: 'Hoàn thành',
      total: '399,000',
      paymentMethod: 'card',
      items: [
        {
          id: 2,
          title: "Mobile App Quản lý Nhà hàng",
          price: "399,000",
          originalPrice: "499,000",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&h=100&fit=crop",
          downloadLink: "#"
        }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-15',
      status: 'completed',
      statusText: 'Hoàn thành',
      total: '199,000',
      paymentMethod: 'banking',
      items: [
        {
          id: 3,
          title: "Website Portfolio với Next.js",
          price: "199,000",
          image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=100&h=100&fit=crop",
          downloadLink: "#"
        }
      ]
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentIcon = (method) => {
    switch (method) {
      case 'banking':
        return '🏦'
      case 'card':
        return '💳'
      default:
        return '💰'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Trang chủ
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Đơn hàng của tôi</h1>
          <p className="text-gray-600 mt-2">Quản lý và theo dõi các đơn hàng đã mua</p>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Đơn hàng #{order.id}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(order.date).toLocaleDateString('vi-VN')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.statusText}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-red-600">{order.total}₫</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <span className="mr-1">{getPaymentIcon(order.paymentMethod)}</span>
                      {order.paymentMethod === 'banking' ? 'Chuyển khoản' : 'Thẻ tín dụng'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-red-600">{item.price}₫</span>
                          {item.originalPrice && (
                            <>
                              <span className="text-sm text-gray-500 line-through">{item.originalPrice}₫</span>
                              <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded text-xs font-medium">
                                -{Math.round((1 - parseInt(item.price.replace(',', '')) / parseInt(item.originalPrice.replace(',', ''))) * 100)}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/project/${item.id}`}
                          className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <button
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="Tải xuống"
                        >
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-600 mb-6">Bạn chưa mua đồ án nào. Hãy khám phá các đồ án chất lượng cao!</p>
            <Link
              to="/projects"
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-600 transition-colors"
            >
              Xem đồ án
            </Link>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tổng kết</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <div className="text-sm text-gray-500">Tổng đơn hàng</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'completed').length}
              </div>
              <div className="text-sm text-gray-500">Đã hoàn thành</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">
                {orders.reduce((sum, order) => sum + parseInt(order.total.replace(',', '')), 0).toLocaleString()}₫
              </div>
              <div className="text-sm text-gray-500">Tổng chi tiêu</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
