import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { db } from '../../config/firebase'
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import {
    ChevronLeft,
    Save,
    Image as ImageIcon,
    Tag,
    DollarSign,
    Layers,
    Type,
    FileText,
    Plus,
    X,
    Clock,
    Loader2,
    User,
} from 'lucide-react'
import type { Project, Author, Preview } from '../../types'

const CATEGORIES = [
    'Web Development',
    'Mobile Application',
    'Desktop Software',
    'Tools & Utilities',
    'AI & Machine Learning'
]

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

interface ProductFormData extends Omit<Project, 'id' | 'createdAt' | 'updatedAt'> {
    id?: string;
}

export default function ProductForm() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isEditMode = !!id

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(isEditMode)
    const [uploadProgress, setUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const [formData, setFormData] = useState<ProductFormData>({
        title: '',
        description: '',
        fullDescription: '',
        price: 0,
        originalPrice: 0,
        category: CATEGORIES[0],
        image: '',
        previews: [],
        tags: [],
        requirements: [],
        includes: [],
        rating: 5.0,
        downloads: 0,
        reviews: 0,
        author: {
            name: 'thaitienshop',
            avatar: '/avtar.png',
            rating: 5.0,
            projects: 20
        }
    })

    const [newTag, setNewTag] = useState('')
    const [newRequirement, setNewRequirement] = useState('')
    const [newInclude, setNewInclude] = useState('')

    useEffect(() => {
        if (isEditMode && id) {
            fetchProduct(id)
        }
    }, [id, isEditMode])

    const fetchProduct = async (projectId: string) => {
        try {
            const docRef = doc(db, 'projects', projectId)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                const data = docSnap.data() as Project
                setFormData({
                    title: data.title || '',
                    description: data.description || '',
                    fullDescription: data.fullDescription || '',
                    price: Number(data.price) || 0,
                    originalPrice: Number(data.originalPrice) || 0,
                    category: data.category || CATEGORIES[0],
                    image: data.image || '',
                    previews: data.previews || [],
                    tags: data.tags || [],
                    requirements: data.requirements || [],
                    includes: data.includes || [],
                    rating: data.rating || 5.0,
                    downloads: data.downloads || 0,
                    reviews: data.reviews || 0,
                    author: data.author || {
                        name: 'thaitienshop',
                        avatar: '/avtar.png',
                        rating: 5.0,
                        projects: 20
                    },
                    id: projectId
                })
            } else {
                alert('Không tìm thấy sản phẩm!')
                navigate('/admin/products')
            }
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setFetching(false)
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const uploadToCloudinary = async (file: File) => {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
        const data = new FormData()
        data.append('file', file)
        data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

        const response = await fetch(cloudinaryUrl, {
            method: 'POST',
            body: data,
        })

        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.error?.message || 'Lỗi khi tải ảnh lên Cloudinary')
        }

        const result = await response.json()
        return result.secure_url
    }

    const uploadImage = async () => {
        if (!selectedFile) return formData.image
        setIsUploading(true)
        setUploadProgress(10)
        try {
            const url = await uploadToCloudinary(selectedFile)
            setUploadProgress(100)
            setIsUploading(false)
            return url
        } catch (error) {
            setIsUploading(false)
            throw error
        }
    }

    const handlePreviewUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0]
        if (!file) return

        setLoading(true)
        try {
            const url = await uploadToCloudinary(file)
            setFormData(prev => {
                const newPreviews = [...prev.previews]
                newPreviews[index] = { ...newPreviews[index], image: url }
                return { ...prev, previews: newPreviews }
            })
        } catch (error: any) {
            alert('Lỗi tải ảnh preview: ' + error.message)
        } finally {
            setLoading(false)
        }
    }

    const addPreviewField = () => {
        setFormData(prev => ({
            ...prev,
            previews: [...prev.previews, { title: '', image: '' }]
        }))
    }

    const removePreviewField = (index: number) => {
        setFormData(prev => ({
            ...prev,
            previews: prev.previews.filter((_, i) => i !== index)
        }))
    }

    const handlePreviewTitleChange = (index: number, value: string) => {
        setFormData(prev => {
            const newPreviews = [...prev.previews]
            newPreviews[index] = { ...newPreviews[index], title: value }
            return { ...prev, previews: newPreviews }
        })
    }

    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            author: { ...prev.author, [name]: value }
        }))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => {
            const val = (name === 'price' || name === 'originalPrice' || name === 'downloads' || name === 'rating' || name === 'reviews')
                ? Number(value)
                : value
            const newData = { ...prev, [name]: val }
            if (name === 'title' && !isEditMode) {
                newData.id = value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
            }
            return newData
        })
    }

    const addItem = (field: 'tags' | 'requirements' | 'includes', value: string, setValue: React.Dispatch<React.SetStateAction<string>>) => {
        if (!value.trim()) return
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], value.trim()]
        }))
        setValue('')
    }

    const removeItem = (field: 'tags' | 'requirements' | 'includes', index: number) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const imageUrl = await uploadImage()

            const dataToSave = {
                ...formData,
                image: imageUrl,
                updatedAt: new Date().toISOString()
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { id: docId, ...cleanedData } = dataToSave
            const finalData = { ...cleanedData }

            if (isEditMode && id) {
                await updateDoc(doc(db, 'projects', id), finalData)
            } else {
                (finalData as any).createdAt = new Date().toISOString()
                const customId = formData.id || formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
                await setDoc(doc(db, 'projects', customId), finalData)
            }

            navigate('/admin/products')
        } catch (error: any) {
            console.error('Error in handleSubmit:', error)
            alert('Đã có lỗi xảy ra. ' + (error.message || 'Vui lòng thử lại.'))
        } finally {
            setLoading(false)
        }
    }

    if (fetching) {
        return (
            <div className="flex items-center justify-center h-64 text-blue-600">
                <Loader2 className="animate-spin h-8 w-8" />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/admin/products')}
                        className="p-2 hover:bg-gray-100 rounded-xl transition-all"
                    >
                        <ChevronLeft className="h-6 w-6 text-gray-500" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            {isEditMode ? 'Chỉnh sửa sản phẩm' : 'Đăng sản phẩm mới'}
                        </h1>
                        <p className="text-sm text-gray-500 font-medium">Cung cấp đầy đủ thông tin để thu hút người mua.</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 pb-20">
                {/* Basic Info */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <Type className="h-5 w-5 text-blue-600" />
                        <h2 className="font-bold text-gray-900">Thông tin cơ bản</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Tên sản phẩm</label>
                                <input
                                    required
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ví dụ: Hệ thống Quản lý Nhà hàng (MERN)"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mã sản phẩm (Slug / URL)</label>
                                <input
                                    required
                                    name="id"
                                    value={formData.id || ''}
                                    onChange={handleChange}
                                    disabled={isEditMode}
                                    placeholder="Ví dụ: shop-mon-an"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold disabled:opacity-50"
                                />
                                {!isEditMode && <p className="text-[10px] text-gray-400 italic">Dùng để tạo đường dẫn: /project/{"{mã}"}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Danh mục</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                                >
                                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Hình ảnh đồ án</label>
                                <div className="flex flex-col sm:flex-row gap-6">
                                    <div className="w-full sm:w-48 h-32 bg-gray-50 border-2 border-dashed border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center relative group">
                                        {imagePreview || formData.image ? (
                                            <>
                                                <img
                                                    src={imagePreview || formData.image}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <p className="text-[10px] text-white font-black uppercase">Thay đổi ảnh</p>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center p-4">
                                                <ImageIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                                                <p className="text-[8px] text-gray-400 font-black uppercase">Chưa có ảnh</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <div className="flex-1 space-y-3">
                                        <p className="text-[10px] text-gray-400 font-medium">Bạn nên tải lên hình ảnh có tỉ lệ 16:9 để hiển thị tốt nhất trên website.</p>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    name="image"
                                                    value={formData.image}
                                                    onChange={handleChange}
                                                    placeholder="Hoặc nhập link ảnh trực tiếp..."
                                                    className="flex-1 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs focus:bg-white"
                                                />
                                            </div>
                                            {isUploading && (
                                                <div className="space-y-1">
                                                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                                        <div
                                                            className="bg-blue-600 h-full transition-all duration-300"
                                                            style={{ width: `${uploadProgress}%` }}
                                                        ></div>
                                                    </div>
                                                    <p className="text-[9px] text-blue-600 font-bold">Đang tải: {Math.round(uploadProgress)}%</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Mô tả ngắn</label>
                            <textarea
                                required
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Tóm tắt ngắn gọn về sản phẩm..."
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Pricing & Stats */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <DollarSign className="h-5 w-5 text-blue-600" />
                        <h2 className="font-bold text-gray-900">Giá & Thống kê</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Giá khuyến mãi (VNĐ)</label>
                            <input
                                required
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Ví dụ: 100000"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-black text-blue-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Giá gốc (VNĐ)</label>
                            <input
                                type="number"
                                name="originalPrice"
                                value={formData.originalPrice || ''}
                                onChange={handleChange}
                                placeholder="Ví dụ: 300000"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-gray-400"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Số lượt chuyển giao (Ảo)</label>
                            <input
                                type="number"
                                name="downloads"
                                value={formData.downloads}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Số sao (1 - 5.0)</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold text-yellow-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">Số lượng đánh giá (Ảo)</label>
                            <input
                                type="number"
                                name="reviews"
                                value={formData.reviews}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* Lists (Tags, Requirements, etc) */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-8">
                    {/* Tags */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                            <Tag className="h-4 w-4 mr-2" /> Công nghệ (Tags)
                        </label>
                        <div className="flex flex-wrap gap-2 mb-3">
                            {formData.tags.map((tag, i) => (
                                <span key={i} className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100 animate-scale-in">
                                    <span>{tag}</span>
                                    <button type="button" onClick={() => removeItem('tags', i)}><X className="h-3 w-3 hover:text-red-500" /></button>
                                </span>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addItem('tags', newTag, setNewTag))}
                                placeholder="Thêm tag (React, Node...)"
                                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('tags', newTag, setNewTag)}
                                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                            <Clock className="h-4 w-4 mr-2" /> Yêu cầu triển khai
                        </label>
                        <div className="space-y-2 mb-3">
                            {formData.requirements.map((req, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-700">
                                    <span>{req}</span>
                                    <button type="button" onClick={() => removeItem('requirements', i)}><X className="h-4 w-4 text-gray-400 hover:text-red-500" /></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                value={newRequirement}
                                onChange={(e) => setNewRequirement(e.target.value)}
                                placeholder="Ví dụ: Node.js v18 trở lên"
                                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('requirements', newRequirement, setNewRequirement)}
                                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Includes */}
                    <div className="space-y-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center">
                            <Layers className="h-4 w-4 mr-2" /> Gói tài sản bao gồm
                        </label>
                        <div className="space-y-2 mb-3">
                            {formData.includes.map((inc, i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs font-bold text-gray-700">
                                    <span>{inc}</span>
                                    <button type="button" onClick={() => removeItem('includes', i)}><X className="h-4 w-4 text-gray-400 hover:text-red-500" /></button>
                                </div>
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <input
                                value={newInclude}
                                onChange={(e) => setNewInclude(e.target.value)}
                                placeholder="Ví dụ: Full Source Code"
                                className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:bg-white"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('includes', newInclude, setNewInclude)}
                                className="p-2.5 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                            >
                                <Plus className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* UI Previews / Gallery */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                            <ImageIcon className="h-5 w-5 text-blue-600" />
                            <h2 className="font-bold text-gray-900">Hình ảnh giao diện (UI Previews)</h2>
                        </div>
                        <button
                            type="button"
                            onClick={addPreviewField}
                            className="text-[10px] font-black bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition-all flex items-center uppercase tracking-widest"
                        >
                            <Plus className="h-4 w-4 mr-2" /> THÊM ẢNH GIAO DIỆN
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.previews.map((preview, index) => (
                            <div key={index} className="flex flex-col sm:flex-row gap-6 p-6 bg-gray-50 rounded-2xl relative group">
                                <button
                                    type="button"
                                    onClick={() => removePreviewField(index)}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                >
                                    <X className="h-4 w-4" />
                                </button>

                                <div className="w-full sm:w-48 h-32 bg-white rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center relative shadow-sm">
                                    {preview.image ? (
                                        <img src={preview.image} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-center">
                                            <ImageIcon className="h-6 w-6 text-gray-200 mx-auto mb-1" />
                                            <p className="text-[8px] text-gray-300 font-bold uppercase tracking-tight">CHƯA CÓ ẢNH</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handlePreviewUpload(e, index)}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <div className="absolute inset-0 bg-black/5 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer pointer-events-none">
                                        <p className="text-[9px] text-primary bg-white/90 px-2 py-1 rounded-md font-bold shadow-sm">TẢI ẢNH LÊN</p>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tiêu đề ảnh (Ví dụ: Trang Chủ, Dashboard...)</label>
                                        <input
                                            value={preview.title}
                                            onChange={(e) => handlePreviewTitleChange(index, e.target.value)}
                                            placeholder="Nhập tiêu đề hoặc mô tả ngắn cho ảnh này"
                                            className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Link ảnh preview (Tự động cập nhật sau khi tải)</label>
                                        <input
                                            value={preview.image}
                                            onChange={(e) => {
                                                const newPreviews = [...formData.previews]
                                                newPreviews[index].image = e.target.value
                                                setFormData({ ...formData, previews: newPreviews })
                                            }}
                                            placeholder="https://..."
                                            className="w-full px-4 py-2 bg-white border border-gray-100 rounded-xl text-xs text-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}

                        {formData.previews.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-gray-100 rounded-[2.5rem]">
                                <ImageIcon className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                                <p className="text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">Chưa có ảnh preview nào được thêm.</p>
                                <button type="button" onClick={addPreviewField} className="mt-4 text-[10px] font-black text-blue-600 hover:underline">NHẤN ĐỂ THÊM ẢNH ĐẦU TIÊN</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Author Info */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <h2 className="font-bold text-gray-900">Thông tin tác giả & Quản trị</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Tên tác giả / Đội ngũ phát triển</label>
                            <input
                                name="name"
                                value={formData.author.name}
                                onChange={handleAuthorChange}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Link Avatar Tác giả</label>
                            <input
                                name="avatar"
                                value={formData.author.avatar}
                                onChange={handleAuthorChange}
                                placeholder="/avatar.png"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* Full Description */}
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center space-x-3 mb-2">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <h2 className="font-bold text-gray-900">Chi tiết bài viết (Markdown hỗ trợ)</h2>
                    </div>
                    <textarea
                        required
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        rows={15}
                        placeholder="Mô tả chi tiết về dự án, tính năng, cấu trúc..."
                        className="w-full px-6 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all font-medium leading-loose"
                    ></textarea>
                </div>

                {/* Footer Actions */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-white/80 backdrop-blur-xl border-t border-gray-100 flex items-center justify-center space-x-4 z-50">
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="px-8 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-200 transition-all"
                    >
                        Hủy bỏ
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-12 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 hover:-translate-y-1 transition-all disabled:opacity-50 flex items-center"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        {isEditMode ? 'Cập nhật sản phẩm' : 'Đăng sản phẩm ngay'}
                    </button>
                </div>
            </form>
        </div>
    )
}
