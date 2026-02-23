import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, CheckCircle, AlertCircle, ShieldCheck, Github } from 'lucide-react'
import { auth, db, googleProvider } from '../lib/firebase'
import { useAuth } from '../contexts/AuthContext'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile
} from 'firebase/auth'
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore'

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser } = useAuth()

  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/'
      navigate(from, { replace: true })
    }
  }, [currentUser, navigate, location])

  const getErrorMessage = (code) => {
    switch (code) {
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email hoặc mật khẩu không chính xác.'
      case 'auth/email-already-in-use':
        return 'Email này đã được sử dụng bởi một tài khoản khác.'
      case 'auth/invalid-email':
        return 'Địa chỉ email không hợp lệ.'
      case 'auth/weak-password':
        return 'Mật khẩu quá yếu (tối thiểu 6 ký tự).'
      case 'auth/network-request-failed':
        return 'Lỗi kết nối mạng. Vui lòng kiểm tra lại internet.'
      case 'auth/too-many-requests':
        return 'Tài khoản tạm khóa do đăng nhập sai nhiều lần. Thử lại sau.'
      default:
        return 'Đã có lỗi xảy ra. Vui lòng thử lại sau.'
    }
  }

  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  })

  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      const user = userCredential.user

      const userDoc = await getDoc(doc(db, 'users', user.uid))
      if (userDoc.exists() && userDoc.data().role === 'admin') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error(err)
      setError(getErrorMessage(err.code))
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Pre-submission validation
    if (!registerData.fullName) {
      setError('Vui lòng nhập họ và tên.')
      setIsLoading(false)
      return
    }
    if (!isPasswordValid) {
      setError('Mật khẩu không đáp ứng yêu cầu bảo mật.')
      setIsLoading(false)
      return
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Xác nhận mật khẩu không khớp.')
      setIsLoading(false)
      return
    }
    if (!registerData.agreeToTerms) {
      setError('Bạn cần đồng ý với điều khoản sử dụng.')
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerData.email, registerData.password)
      const user = userCredential.user

      await updateProfile(user, { displayName: registerData.fullName })

      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: registerData.fullName,
        email: registerData.email,
        role: 'user',
        createdAt: serverTimestamp()
      })

      navigate('/')
    } catch (err) {
      console.error(err)
      setError(getErrorMessage(err.code))
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    setError('')
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const userDocRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userDocRef)

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          role: 'user',
          createdAt: serverTimestamp()
        })
        navigate('/')
      } else {
        if (userDoc.data().role === 'admin') {
          navigate('/admin')
        } else {
          navigate('/')
        }
      }
    } catch (err) {
      console.error(err)
      setError(getErrorMessage(err.code || 'default'))
    } finally {
      setIsLoading(false)
    }
  }

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    })
  }

  const handleRegisterChange = (e) => {
    const { name, value, type, checked } = e.target
    setRegisterData({
      ...registerData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const passwordRequirements = [
    { text: 'Ít nhất 8 ký tự', met: registerData.password.length >= 8 },
    { text: 'Gồm chữ cái và số', met: /[a-zA-Z]/.test(registerData.password) && /\d/.test(registerData.password) }
  ]

  const isPasswordValid = passwordRequirements.every(req => req.met)
  const isRegisterFormValid = registerData.fullName && registerData.email && isPasswordValid &&
    registerData.password === registerData.confirmPassword && registerData.agreeToTerms

  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Left Side: Visual & Branding */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 bg-[#0f172a] relative overflow-hidden items-center justify-center p-12 lg:p-24">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 w-full max-w-lg">
          <Link to="/" className="inline-flex items-center space-x-3 mb-12 group transition-all hover:opacity-80">
            <div className="w-12 h-12 bg-white flex items-center justify-center rounded-2xl shadow-2xl">
              <span className="text-[#0f172a] font-black text-2xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white uppercase">thaitienshop</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-blue-400">Enterprise Solutions</span>
            </div>
          </Link>

          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
              Kiến tạo tương lai <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">qua từng dòng code.</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-md font-medium">
              Chào mừng bạn đến với thaitienshop. Nền tảng cung cấp giải pháp đồ án chuyên nghiệp, giúp bạn bứt phá trong sự nghiệp lập trình.
            </p>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0f172a] bg-slate-700 flex items-center justify-center overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-slate-400 font-bold">
                <span className="text-white">+1,200</span> thành viên đã tham gia
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Graphic Element */}
        <div className="absolute bottom-12 right-12 opacity-20 hidden lg:block">
          <ShieldCheck className="w-64 h-64 text-white" strokeWidth={0.5} />
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="md:hidden flex flex-col items-center mb-12">
            <Link to="/" className="w-16 h-16 bg-[#0f172a] flex items-center justify-center rounded-2xl shadow-xl mb-4">
              <span className="text-white font-black text-3xl">S</span>
            </Link>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">thaitienshop</h1>
          </div>

          <div className="mb-10 text-center md:text-left">
            <h2 className="text-4xl font-black text-slate-900 mb-3 tracking-tight">
              {isLogin ? 'Chào mừng trở lại' : 'Bắt đầu hành trình'}
            </h2>
            <p className="text-slate-500 font-medium">
              {isLogin
                ? 'Nhập thông tin truy cập để tiếp tục phiên làm việc của bạn.'
                : 'Tham gia hệ thống để trải nghiệm những dự án cao cấp nhất.'}
            </p>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start animate-shake">
              <AlertCircle className="h-5 w-5 text-rose-500 mr-3 mt-0.5 shrink-0" />
              <p className="text-sm text-rose-700 font-bold leading-relaxed">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <form onSubmit={isLogin ? handleLoginSubmit : handleRegisterSubmit} className="space-y-5">
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Họ và tên</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      name="fullName"
                      type="text"
                      required
                      value={registerData.fullName}
                      onChange={handleRegisterChange}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 sm:text-sm"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Địa chỉ Email</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={isLogin ? loginData.email : registerData.email}
                    onChange={isLogin ? handleLoginChange : handleRegisterChange}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 sm:text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500">Mật khẩu</label>
                  {isLogin && (
                    <Link to="/forgot-password" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors">
                      Quên mật khẩu?
                    </Link>
                  )}
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={isLogin ? loginData.password : registerData.password}
                    onChange={isLogin ? handleLoginChange : handleRegisterChange}
                    className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 sm:text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {!isLogin && registerData.password && (
                  <div className="flex space-x-2 pt-1 px-1">
                    {passwordRequirements.map((req, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`h-1.5 w-8 rounded-full ${req.met ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Xác nhận mật khẩu</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                    </div>
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={registerData.confirmPassword}
                      onChange={handleRegisterChange}
                      className="w-full pl-12 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold placeholder:text-slate-400 outline-none transition-all focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5 sm:text-sm"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex items-center px-1">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded-lg focus:ring-blue-600 transition-all cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-3 text-sm font-bold text-slate-600 cursor-pointer">Ghi nhớ đăng nhập</label>
                </div>
              )}

              {/* Terms Checkbox for Registration */}
              {!isLogin && (
                <div className="flex items-start px-1 pt-2">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    required
                    checked={registerData.agreeToTerms}
                    onChange={handleRegisterChange}
                    className="mt-1 h-4 w-4 text-blue-600 border-slate-300 rounded-lg focus:ring-blue-600 transition-all cursor-pointer"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-xs font-bold text-slate-600 leading-relaxed">
                    Tôi đồng ý với <Link to="/terms" className="text-blue-600 hover:underline">Điều khoản</Link> và <Link to="/privacy" className="text-blue-600 hover:underline">Chính sách bảo mật</Link> của thaitienshop.
                  </label>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0f172a] text-white py-4 rounded-2xl font-black shadow-xl shadow-slate-200 hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:translate-y-0 disabled:shadow-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="h-4 w-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                    {isLogin ? 'Xác thực...' : 'Đang xử lý...'}
                  </div>
                ) : (
                  isLogin ? 'Đăng nhập ngay' : 'Đăng ký tài khoản'
                )}
              </button>
            </form>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                <span className="bg-white px-6">Pháp thức khác</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="flex items-center justify-center space-x-3 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 group font-bold text-slate-700 disabled:opacity-50"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </button>
              <button
                disabled={isLoading}
                className="flex items-center justify-center space-x-3 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all active:scale-95 group font-bold text-slate-700 disabled:opacity-50"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Github</span>
              </button>
            </div>

            <div className="text-center mt-10">
              <p className="text-sm font-bold text-slate-500">
                {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  {isLogin ? 'Đăng ký ngay' : 'Đăng nhập tại đây'}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer info for Auth page */}
        <div className="mt-12 text-center">
          <Link to="/" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">
            <ArrowLeft className="w-3 h-3 mr-2" />
            Quay lại thaitienshop
          </Link>
        </div>
      </div>
    </div>
  )
}
