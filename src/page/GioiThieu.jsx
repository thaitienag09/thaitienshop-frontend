import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code,
  Award,
  Users,
  Clock,
  Star,
  ArrowRight,
  Globe,
  Smartphone,
  Cpu,
  Brain,
  ShieldCheck,
  Zap,
  Target,
  ExternalLink,
  CheckCircle,
  Terminal
} from 'lucide-react'

export default function GioiThieu() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const achievements = [
    {
      icon: Code,
      value: '500+',
      label: 'DỰ ÁN HOÀN THÀNH',
      description: 'Hệ thống phần mềm và website chất lượng cao.'
    },
    {
      icon: Users,
      value: '1000+',
      label: 'NGƯỜI DÙNG TIN TƯỞNG',
      description: 'Đối tác và sinh viên trên toàn quốc.'
    },
    {
      icon: Award,
      value: '5+',
      label: 'NĂM KINH NGHIỆM',
      description: 'Chuyên sâu trong phát triển giải pháp Enterprise.'
    },
    {
      icon: Zap,
      value: '4.9/5',
      label: 'CHỈ SỐ HÀI LÒNG',
      description: 'Cam kết chất lượng và hỗ trợ kỹ thuật tận tâm.'
    }
  ]

  const coreValues = [
    {
      icon: Target,
      title: 'Tầm nhìn',
      description: 'Trở thành đơn vị cung cấp giải pháp chuyển đổi số hàng đầu cho lĩnh vực kinh doanh thú y và quản lý cửa hàng.'
    },
    {
      icon: ShieldCheck,
      title: 'Sứ mệnh',
      description: 'Mang đến những bộ mã nguồn đạt chuẩn công nghiệp, bảo mật cao và dễ dàng mở rộng cho mọi doanh nghiệp.'
    },
    {
      icon: Brain,
      title: 'Giá trị cốt lõi',
      description: 'Sáng tạo không ngừng, lấy trải nghiệm người dùng làm trung tâm và luôn tuân thủ các tiêu chuẩn lập trình quốc tế.'
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section - Dark & Professional */}
      <section className="relative pt-32 pb-20 bg-[#0f172a] overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 skew-x-12 translate-x-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-10 transition-all duration-1000">
            <div className={`space-y-8 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center space-x-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mx-auto">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">Expert Developer Profile</span>
              </div>

              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tighter leading-none">
                GIỚI THIỆU <br />
                <span className="text-accent underline decoration-white/10 underline-offset-8 transition-colors duration-500 hover:text-white">
                  THAITIENSHOP
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto font-medium leading-relaxed italic">
                Cung cấp hệ sinh thái giải pháp lập trình chất lượng cao, chuyên sâu vào hệ thống quản lý doanh nghiệp (ERP) và thương mại điện tử.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto bg-white text-primary px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-premium hover:shadow-glow hover:-translate-y-1 transition-all duration-500"
                >
                  XEM THƯ VIỆN DỰ ÁN
                </Link>
                <a
                  href="#contact"
                  className="w-full sm:w-auto text-white/70 hover:text-white font-black text-xs uppercase tracking-widest flex items-center justify-center transition-colors px-10 py-5 border border-white/10 rounded-2xl bg-white/5"
                >
                  LIÊN HỆ TƯ VẤN <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Clean & Geometric */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[3rem] shadow-premium border border-gray-100 hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 bg-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                  <item.icon className="h-6 w-6 text-accent group-hover:text-white" />
                </div>
                <p className="text-4xl font-black text-primary tracking-tighter mb-2">{item.value}</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">{item.label}</p>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Project - PetCare Veterinary System */}
      <section className="py-32 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-[#0f172a] rounded-[4rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[100px]"></div>

            <div className="lg:w-1/2 p-12 sm:p-20 space-y-10 relative z-10">
              <div className="inline-flex items-center space-x-3 text-accent">
                <Terminal className="h-5 w-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Core Architecture Beta</span>
              </div>

              <h3 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none uppercase">
                PETCARE <br />
                <span className="text-accent underline decoration-white/10 underline-offset-8">FOUNDATION</span> SYSTEM
              </h3>

              <p className="text-white/40 text-sm font-medium leading-relaxed italic">
                Khung quản lý thú y hiện đại được xây dựng trên nền tảng Laravel. Hệ thống hiện đang tập trung vào các luồng xử lý giỏ hàng, đặt hàng và tích hợp khung thanh toán chuẩn.
              </p>

              <div className="space-y-4">
                {[
                  'Khung thanh toán: VNPAY (nội địa) & Stripe (quốc tế) đã sẵn sàng.',
                  'Quản lý giỏ hàng và danh mục sản phẩm hoàn chỉnh.',
                  'Hồ sơ người dùng và hệ thống Auth bảo mật.',
                  'Module Blog & Bài viết đang được hoàn thiện các tính năng phụ.'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center space-x-4 text-white/70 text-xs font-bold">
                    <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Link to="/project/vet-management" className="inline-flex items-center text-white font-black text-[10px] uppercase tracking-widest group border-b-2 border-accent pb-2">
                  Khám phá kiến trúc hệ thống <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>

            <div className="lg:w-1/2 bg-accent/5 p-12 flex items-center justify-center border-l border-white/5">
              <div className="relative w-full aspect-square max-w-md">
                <div className="absolute inset-0 bg-accent/20 rounded-[3rem] blur-3xl animate-pulse"></div>
                <div className="relative glass-dark p-10 rounded-[3rem] border border-white/10 h-full flex flex-col justify-between">
                  {/* Tech Stack Visualization */}
                  <div className="space-y-8">
                    <div className="flex justify-between items-center opacity-40">
                      <div className="h-2 w-12 bg-white rounded-full"></div>
                      <div className="h-2 w-24 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {['Laravel 10', 'MySQL PRO', 'VNPAY API', 'Stripe SDK'].map((tech, i) => (
                        <div key={i} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black text-white/50 text-center uppercase tracking-widest">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <p className="text-[3rem] font-black text-white tracking-tighter leading-none">500+</p>
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Giao dịch đã xử lý</p>
                    </div>
                    <ShieldCheck className="h-16 w-16 text-accent/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-white py-32 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mb-20">
            <h2 className="text-xs font-black text-accent uppercase tracking-[0.4em] mb-4">TRIẾT LÝ PHÁT TRIỂN</h2>
            <h3 className="text-4xl sm:text-5xl font-black text-primary tracking-tighter leading-tight">
              TIÊU CHUẨN CÔNG NGHIỆP <br />
              <span className="text-gray-300">TRONG TỪNG DÒNG CODE.</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {coreValues.map((value, idx) => (
              <div key={idx} className="space-y-6">
                <div className="text-primary/20 font-black text-5xl">0{idx + 1}</div>
                <h4 className="text-xl font-bold text-primary">{value.title}</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed italic">
                  "{value.description}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Stack - Minimalist Monochrome */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-black text-primary tracking-tighter uppercase">KỸ NĂNG CHUYÊN MÔN</h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Chúng tôi sử dụng những bộ công cụ hiện đại và ổn định nhất để xây dựng hệ thống.
                Đặc biệt tối ưu hóa cho môi trường Laravel và giải pháp cơ sở dữ liệu MySQL.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {['Laravel 10+', 'React / Next.js', 'MySQL Professional', 'RESTful API', 'AWS / DigitalOcean', 'System Architecture'].map((skill, i) => (
                  <div key={i} className="flex items-center space-x-3 text-sm font-bold text-primary">
                    <CheckCircle className="h-4 w-4 text-accent" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { name: 'Laravel', level: 'Expert' },
                { name: 'React', level: 'Advanced' },
                { name: 'MySQL', level: 'Expert' },
                { name: 'Node.js', level: 'Senior' },
                { name: 'Python', level: 'Senior' },
                { name: 'Unity', level: 'Mid' }
              ].map((s, i) => (
                <div key={i} className="bg-white border border-gray-100 p-6 rounded-3xl text-center shadow-sm hover:border-accent/40 transition-colors">
                  <p className="text-lg font-black text-primary tracking-tighter">{s.name}</p>
                  <p className="text-[10px] font-black text-accent uppercase tracking-widest">{s.level}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Professional Grade */}
      <section className="py-24 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0f172a] rounded-[4rem] p-12 sm:p-20 relative overflow-hidden text-center shadow-glow">
            <div className="absolute top-0 left-0 w-full h-full bg-accent/5 pointer-events-none"></div>
            <div className="relative z-10 space-y-10">
              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none">
                SẴN SÀNG CHO <br />
                <span className="text-accent">DỰ ÁN TIẾP THEO?</span>
              </h2>
              <p className="text-white/40 text-sm max-w-xl mx-auto font-medium leading-relaxed italic">
                Hỗ trợ tư vấn giải pháp từ A-Z. Đảm bảo bàn giao mã nguồn sạch, tài liệu đầy đủ và bảo mật tuyệt đối.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Link
                  to="/projects"
                  className="w-full sm:w-auto px-12 py-5 bg-white text-primary rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-500 shadow-premium"
                >
                  XEM SẢN PHẨM
                </Link>
                <button className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-colors">
                  LIÊN HỆ TRỰC TIẾP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section - Understated */}
      <section className="py-20 bg-[#fafafa]">
        <div className="max-w-4xl mx-auto px-8 text-center space-y-8">
          <div className="inline-flex items-center px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-400">
            Support the Developer
          </div>
          <h4 className="text-xl font-bold text-primary uppercase tracking-widest">Ủng hộ thaitienshop</h4>
          <p className="text-gray-500 text-xs italic max-w-lg mx-auto leading-relaxed">
            Nếu bạn thấy những giải pháp của chúng tôi hữu ích, mọi sự đóng góp sẽ được sử dụng để phát triển thêm nhiều dự án Open Source chất lượng.
          </p>
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center">
                <Smartphone className="h-8 w-8 text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Số tài khoản VIB</p>
                <p className="text-xl font-black text-primary tracking-tighter">913 263 053</p>
                <p className="text-xs font-bold text-accent uppercase tracking-widest mt-1">DUONG THAI TIEN</p>
              </div>
            </div>
            <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-premium hover:shadow-glow transition-all">
              <span>SAO CHÉP STK</span>
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
