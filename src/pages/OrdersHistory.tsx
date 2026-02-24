import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { rtdb as db, db as firestore } from '@/config/firebase'
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database'
import { doc, getDoc } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { ClipboardList, Download, ExternalLink, Clock, Package, CheckCircle, XCircle, Loader2 } from 'lucide-react'
import type { Transaction, Project } from '@/types'

export default function OrdersHistory() {
    const { currentUser } = useAuth()
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [projectsData, setProjectsData] = useState<Record<string, Project>>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!currentUser) return

        const transactionsRef = ref(db, 'transactions')
        const userQuery = query(
            transactionsRef,
            orderByChild('userId'),
            equalTo(currentUser.uid)
        )

        const unsubscribe = onValue(userQuery, async (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const txList = Object.values(data) as Transaction[]
                // Sort by createdAt descending
                txList.sort((a, b) => b.createdAt - a.createdAt)
                setTransactions(txList)

                // Fetch sourceCodeUrls for successful projects
                const projectIds = Array.from(new Set(txList.map(tx => tx.projectId)))
                const newProjectsData: Record<string, Project> = { ...projectsData }

                for (const pid of projectIds) {
                    if (!newProjectsData[pid]) {
                        try {
                            const pDoc = await getDoc(doc(firestore, 'projects', pid))
                            if (pDoc.exists()) {
                                newProjectsData[pid] = { id: pDoc.id, ...pDoc.data() } as Project
                            }
                        } catch (err) {
                            console.error(`Error fetching project ${pid}:`, err)
                        }
                    }
                }
                setProjectsData(newProjectsData)
            } else {
                setTransactions([])
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [currentUser])

    if (!currentUser) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-surface-muted">
                <h1 className="text-2xl font-black text-primary mb-4">BẠN CẦN ĐĂNG NHẬP</h1>
                <Link to="/auth" className="bg-primary text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Đăng nhập ngay</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-surface-muted pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-6">
                <div className="flex items-center space-x-4 mb-10">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-premium">
                        <ClipboardList className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-primary tracking-tighter uppercase">Lịch sử đơn hàng</h1>
                        <p className="text-gray-500 font-medium italic text-xs uppercase tracking-widest">Theo dõi và tải mã nguồn đã mua</p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-premium border border-gray-100">
                        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                        <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest">Đang tải lịch sử giao dịch...</p>
                    </div>
                ) : transactions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6">
                        {transactions.map((tx) => (
                            <div key={tx.id} className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between transition-all hover:shadow-premium group">
                                <div className="flex items-start space-x-5 mb-6 md:mb-0">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tx.status === 'success' ? 'bg-green-50 text-green-500' :
                                            tx.status === 'failed' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                        }`}>
                                        <Package className="h-6 w-6" />
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-3">
                                            <h3 className="font-black text-primary tracking-tight text-lg">{tx.projectName}</h3>
                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${tx.status === 'success' ? 'bg-green-100 text-green-600' :
                                                    tx.status === 'failed' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                                                }`}>
                                                {tx.status === 'success' ? 'Đã duyệt' : tx.status === 'failed' ? 'Từ chối' : 'Chờ duyệt'}
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center">
                                                <Clock className="h-3 w-3 mr-1.5" />
                                                {new Date(tx.createdAt).toLocaleDateString('vi-VN')}
                                            </div>
                                            <div className="text-primary">{tx.price} VNĐ</div>
                                        </div>
                                        <p className="text-[10px] text-gray-300 font-medium">Mã giao dịch: {tx.id}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    {tx.status === 'success' ? (
                                        projectsData[tx.projectId]?.sourceCodeUrl ? (
                                            <a
                                                href={projectsData[tx.projectId].sourceCodeUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-green-100"
                                            >
                                                <Download className="h-4 w-4" />
                                                <span>Tải mã nguồn</span>
                                            </a>
                                        ) : (
                                            <div className="text-[10px] font-bold text-amber-500 bg-amber-50 px-4 py-3 rounded-xl border border-amber-100 italic">
                                                Đang cập nhật link tải...
                                            </div>
                                        )
                                    ) : tx.status === 'pending' ? (
                                        <div className="flex items-center text-blue-500 text-[10px] font-black uppercase tracking-widest bg-blue-50 px-4 py-3 rounded-xl">
                                            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
                                            Đang chờ Admin xác nhận
                                        </div>
                                    ) : (
                                        <div className="flex items-center text-red-500 text-[10px] font-black uppercase tracking-widest bg-red-50 px-4 py-3 rounded-xl">
                                            <XCircle className="h-3 w-3 mr-2" />
                                            Giao dịch bị từ chối
                                        </div>
                                    )}

                                    <Link
                                        to={`/projects/${tx.projectId}`}
                                        className="p-3.5 bg-gray-50 text-gray-400 hover:text-primary hover:bg-gray-100 rounded-xl transition-all"
                                        title="Xem chi tiết dự án"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2.5rem] shadow-premium border border-gray-100 text-center px-6">
                        <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center mb-6">
                            <ClipboardList className="h-10 w-10 text-gray-300" />
                        </div>
                        <h2 className="text-xl font-black text-primary uppercase mb-2">Bạn chưa có đơn hàng nào</h2>
                        <p className="text-gray-400 font-medium mb-8 max-w-sm ml-auto mr-auto">Bắt đầu khám phá thư viện đồ án chất lượng cao của chúng tôi ngay hôm nay.</p>
                        <Link to="/projects" className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all shadow-premium">
                            Khám phá thư viện
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
