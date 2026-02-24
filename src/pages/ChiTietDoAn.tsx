import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Star, Download, Eye, CheckCircle, Clock, ChevronLeft, Share2, ShieldCheck, MessageSquare, ChevronRight, QrCode, Zap } from 'lucide-react'
import { db, rtdb } from '@/config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { ref, onValue, query, orderByChild, equalTo } from 'firebase/database'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import PaymentModal from '@/components/payment/PaymentModal'
import LoginRequiredModal from '@/components/modals/LoginRequiredModal'
import SEO from '@/components/common/SEO'
import type { Project } from '@/types'

const getOptimizedImage = (url: string, width = 1200) => {
    if (!url || !url.includes('cloudinary.com')) return url;
    const parts = url.split('/upload/');
    return `${parts[0]}/upload/w_${width},q_auto,f_auto/${parts[1]}`;
};

interface Review {
    id: number;
    user: string;
    role: string;
    rating: number;
    comment: string;
    date: string;
}

export default function ChiTietDoAn() {
    const { id } = useParams<{ id: string }>()
    const [activeTab, setActiveTab] = useState('description')
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [project, setProject] = useState<Project | null>(null)
    const [loading, setLoading] = useState(true)
    const { currentUser, isAdmin } = useAuth()
    const [isPurchased, setIsPurchased] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'projects', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProject({ id: docSnap.id, ...docSnap.data() } as Project);
                }
            } catch (error) {
                console.error('Error fetching project:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();

        if (!currentUser || !id) {
            setIsPurchased(false)
            return
        }

        const transactionsRef = ref(rtdb, 'transactions')
        const purchaseQuery = query(
            transactionsRef,
            orderByChild('userId'),
            equalTo(currentUser.uid)
        )

        const unsubscribe = onValue(purchaseQuery, (snapshot) => {
            const data = snapshot.val()
            if (data) {
                const purchased = Object.values(data).some((tx: any) =>
                    tx.projectId === id && tx.status === 'success'
                )
                setIsPurchased(purchased)
            } else {
                setIsPurchased(false)
            }
        })

        return () => unsubscribe()
    }, [id, currentUser])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface-muted">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-surface-muted text-center p-6">
                <h1 className="text-3xl font-black text-primary mb-4">KHÔNG TÌM THẤY DỰ ÁN</h1>
                <p className="text-gray-500 max-w-md mb-8">Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ.</p>
                <Link to="/projects" className="px-8 py-3 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-xs">Quay lại thư viện</Link>
            </div>
        );
    }

    const reviews: Review[] = [
        {
            id: 1,
            user: "Nguyễn Minh Tùng",
            role: "CTO @ TechGlobal",
            rating: 5,
            comment: "Cấu trúc code cực kỳ chuyên nghiệp. Đây là đồ án chất lượng nhất tôi từng thấy trên thị trường Việt Nam.",
            date: "2024-01-18"
        },
        {
            id: 2,
            user: "Lê Hoàng Nam",
            role: "Senior Developer",
            rating: 5,
            comment: "Tài liệu đi kèm rất chi tiết, giúp đội ngũ của tôi triển khai chỉ trong vài giờ.",
            date: "2024-01-16"
        }
    ]

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <SEO
                title={project.title}
                description={project.description?.substring(0, 160)}
                ogImage={project.image}
            />
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
                {/* Navigation & Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0">
                    <Link to="/projects" className="flex items-center text-sm font-bold text-gray-400 hover:text-primary transition-colors group">
                        <ChevronLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                        QUAY LẠI THƯ VIỆN
                    </Link>
                    <div className="flex items-center space-x-4">
                        <button className="p-3 glass rounded-2xl text-gray-400 hover:text-accent transition-colors shadow-sm">
                            <Share2 className="h-5 w-5" />
                        </button>
                        <span className="h-8 w-[1px] bg-gray-200 hidden md:block"></span>
                        <div className="flex items-center bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                            <ShieldCheck className="h-5 w-5 text-green-500 mr-2" />
                            <span className="text-xs font-bold text-gray-600 uppercase tracking-widest leading-none">Verified Asset</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {/* Project Hero */}
                        <div className="glass rounded-[3rem] overflow-hidden shadow-premium border border-white/50">
                            <div className="relative h-[28rem]">
                                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent"></div>
                                <div className="absolute bottom-10 left-10 right-10">
                                    <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-2">
                                        {project.title}
                                    </h1>
                                </div>
                            </div>

                            {/* Tabs Integration */}
                            <div className="p-10">
                                <div className="flex space-x-10 border-b border-gray-100 mb-10 overflow-x-auto">
                                    {[
                                        { id: 'description', label: 'TỔNG QUAN GIẢI PHÁP' },
                                        { id: 'previews', label: 'HÌNH ẢNH GIAO DIỆN' },
                                        { id: 'requirements', label: 'YÊU CẦU TRIỂN KHAI' },
                                        { id: 'includes', label: 'GÓI TÀI SẢN' },
                                        { id: 'reviews', label: 'PHẢN HỒI KHÁCH HÀNG' }
                                    ].map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`pb-4 text-xs font-black tracking-[0.2em] transition-all relative ${activeTab === tab.id ? 'text-primary' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                        >
                                            {tab.label}
                                            {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent rounded-full animate-scale-in"></div>}
                                        </button>
                                    ))}
                                </div>

                                <div className="min-h-[30rem] animate-fade-in">
                                    {activeTab === 'description' && (
                                        <div className="prose prose-slate max-w-none text-gray-600 leading-relaxed prose-headings:text-primary prose-strong:text-primary prose-a:text-accent prose-code:text-accent prose-code:bg-accent/5 prose-code:px-1 prose-code:rounded prose-img:rounded-3xl prose-pre:bg-gray-900 prose-pre:text-white">
                                            <ReactMarkdown>
                                                {project.fullDescription}
                                            </ReactMarkdown>
                                        </div>
                                    )}

                                    {activeTab === 'previews' && (
                                        <div className="space-y-12">
                                            {project.previews?.map((preview, index) => (
                                                <div key={index} className="space-y-4">
                                                    <h3 className="text-lg font-black text-primary uppercase tracking-widest border-l-4 border-accent pl-4">
                                                        {preview.title}
                                                    </h3>
                                                    <div className="rounded-[2rem] overflow-hidden shadow-premium border border-gray-100 group">
                                                        <img
                                                            src={getOptimizedImage(preview.image)}
                                                            alt={preview.title}
                                                            className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700"
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'requirements' && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {project.requirements && project.requirements.length > 0 ? (
                                                project.requirements.map((req, index) => (
                                                    <div key={index} className="flex items-start p-6 bg-surface-muted rounded-3xl border border-gray-100">
                                                        <Zap className="h-6 w-6 text-accent mr-4 flex-shrink-0" />
                                                        <span className="text-sm font-bold text-primary italic uppercase tracking-wider">{req}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="col-span-full py-12 text-center text-gray-400 font-bold italic uppercase tracking-widest">
                                                    Dự án này không yêu cầu cấu hình đặc biệt.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'includes' && (
                                        <div className="space-y-4">
                                            {project.includes && project.includes.length > 0 ? (
                                                project.includes.map((item, index) => (
                                                    <div key={index} className="flex items-center p-5 bg-white shadow-sm border border-gray-50 rounded-2xl">
                                                        <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mr-5">
                                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-600">{item}</span>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="py-12 text-center text-gray-400 font-bold italic uppercase tracking-widest">
                                                    Gói tài sản đang được cập nhật.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {activeTab === 'reviews' && (
                                        <div className="space-y-8">
                                            {reviews.map((review) => (
                                                <div key={review.id} className="p-8 glass rounded-[2rem] border border-white shadow-sm">
                                                    <div className="flex items-center justify-between mb-6">
                                                        <div className="flex items-center">
                                                            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mr-4 shadow-premium leading-none text-white font-black">
                                                                {review.user.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-primary">{review.user}</h4>
                                                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{review.role}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex text-yellow-400">
                                                            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                                                        </div>
                                                    </div>
                                                    <p className="text-gray-500 italic leading-relaxed">"{review.comment}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="lg:col-span-4">
                        {/* Purchase Card */}
                        <div className="bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-2 bg-accent"></div>
                            <div className="mb-10 text-center lg:text-left">
                                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] mb-3 block">Mức giá sở hữu</span>
                                <div className="flex items-center justify-center lg:justify-start space-x-4 mb-6">
                                    <h2 className="text-4xl font-black text-primary tracking-tighter">{project.price}₫</h2>
                                    {project.originalPrice && (
                                        <span className="text-xl text-gray-400 line-through font-medium opacity-50">{project.originalPrice}₫</span>
                                    )}
                                </div>

                                {/* Project Specs & Tech - Sidebar consolidation */}
                                <div className="mt-8 pt-6 border-t border-gray-100 space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Loại dự án</p>
                                            <p className="text-xs font-black text-primary uppercase">{project.category}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Đánh giá chung</p>
                                            <div className="flex items-center">
                                                <Star className="h-3 w-3 text-yellow-500 fill-current mr-1" />
                                                <span className="text-xs font-black text-primary">{project.rating}</span>
                                                <span className="text-[8px] text-gray-300 font-bold ml-1 uppercase">({project.reviews || 0})</span>
                                            </div>
                                        </div>
                                    </div>

                                    {project.tags && project.tags.length > 0 && (
                                        <div className="space-y-3">
                                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Stack Công nghệ</p>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tags.map((tag, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-black uppercase tracking-widest border border-blue-100/50">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                {isPurchased ? (
                                    <a
                                        href={project.sourceCodeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full bg-green-600 text-white py-6 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:bg-green-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <Download className="h-5 w-5 mr-3" />
                                        TẢI MÃ NGUỒN (ĐÃ MUA)
                                    </a>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (!currentUser) {
                                                setIsLoginModalOpen(true)
                                                return
                                            }
                                            if (isAdmin) {
                                                alert('Admin không thể mua sản phẩm của chính mình.')
                                                return
                                            }
                                            setIsPaymentModalOpen(true)
                                        }}
                                        className="w-full bg-blue-600 text-white py-6 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:bg-blue-700 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                                    >
                                        <QrCode className="h-5 w-5 mr-3" />
                                        MUA NGAY (QUÉT MÃ QR)
                                    </button>
                                )}
                                <button className="w-full bg-surface-muted text-primary border border-gray-100 py-6 px-8 rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center justify-center hover:bg-gray-100 transition-all duration-300">
                                    <MessageSquare className="h-5 w-5 mr-3" />
                                    GỬI YÊU CẦU TƯ VẤN
                                </button>
                            </div>

                            <div className="px-6 py-6 bg-amber-50 rounded-2xl border border-amber-100 mb-10">
                                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-2 text-center flex items-center justify-center">
                                    <ShieldCheck className="h-4 w-4 mr-2" /> SẴN SÀNG CHUYỂN GIAO
                                </p>
                                <p className="text-xs text-amber-700/70 text-center font-bold leading-relaxed">
                                    Đồ án Shop Món Ăn đã hoàn thiện và kiểm thử lỗi. <br />
                                    Vui lòng liên hệ để được hỗ trợ cài đặt.
                                </p>
                            </div>

                            <div className="space-y-4 pt-10 border-t border-gray-100">
                                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center">
                                        <Download className="h-4 w-4 mr-3 text-accent" />
                                        Đã chuyển giao
                                    </div>
                                    <span className="text-primary">{project.downloads}+</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 mr-3 text-accent" />
                                        Cập nhật cuối
                                    </div>
                                    <span className="text-primary">{new Date(project.updatedAt).toLocaleDateString('vi-VN')}</span>
                                </div>
                                <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center">
                                        <Eye className="h-4 w-4 mr-3 text-accent" />
                                        Đang quan tâm
                                    </div>
                                    <span className="text-primary">{Math.floor(Math.random() * 50) + 20} users</span>
                                </div>
                            </div>
                        </div>

                        {/* Author Card */}
                        <div className="glass p-8 rounded-[2.5rem] shadow-premium border border-white/50 overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4">
                                <div className="bg-accent text-white p-2 rounded-xl">
                                    <Star className="h-4 w-4 fill-current" />
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-primary mb-6 uppercase tracking-widest">Development Team</h3>
                            <div className="flex items-center mb-6">
                                <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center mr-5 shadow-premium">
                                    <span className="text-white font-black text-2xl">S</span>
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-primary tracking-tight">{project.author.name}</h4>
                                    <div className="flex items-center mt-1">
                                        <div className="flex text-yellow-400 mr-2">
                                            <Star className="h-3 w-3 fill-current" />
                                        </div>
                                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Elite Developer</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed italic mb-8 border-l-4 border-accent/20 pl-4">
                                "Chúng tôi không chỉ bán code, chúng tôi cung cấp giải pháp kiến tạo sự nghiệp cho thế hệ lập trình viên mới."
                            </p>
                            <button className="w-full text-[10px] font-black tracking-widest text-primary uppercase hover:text-accent transition-colors flex items-center justify-center">
                                XEM THÊM CÁC GIẢI PHÁP KHÁC
                                <ChevronRight className="h-3 w-3 ml-2" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <PaymentModal
                isOpen={isPaymentModalOpen}
                onClose={() => setIsPaymentModalOpen(false)}
                project={project}
            />

            <LoginRequiredModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
            />
        </div>
    )
}
