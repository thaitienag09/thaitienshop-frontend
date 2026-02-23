import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Zap, Globe, Cpu, Layers, BarChart3, ChevronRight } from 'lucide-react'

export default function Trangchu() {
  const bentoItems = [
    {
      title: "Chất lượng Enterprise",
      desc: "Source code được đóng gói theo tiêu chuẩn công nghiệp, cấu trúc rõ ràng và dễ dàng mở rộng.",
      icon: Shield,
      color: "accent",
      span: "md:col-span-2"
    },
    {
      title: "Công nghệ lõi",
      desc: "Làm chủ các framework hiện đại nhất: Laravel, Next.js, AI Integration.",
      icon: Cpu,
      color: "accent",
      span: ""
    },
    {
      title: "Triển khai thần tốc",
      desc: "Hệ thống tự động hóa bàn giao và hỗ trợ cài đặt chuyên nghiệp trong 24h.",
      icon: Zap,
      color: "accent",
      span: ""
    },
    {
      title: "Bảo trì & Hỗ trợ",
      desc: "Cam kết đồng hành và hỗ trợ kỹ thuật 24/7 từ đội ngũ lập trình viên chuyên nghiệp.",
      icon: Globe,
      color: "accent",
      span: "md:col-span-2"
    }
  ]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* Hero Section - Dark & Impactful */}
      <section className="relative pt-40 pb-32 bg-[#0f172a] overflow-hidden">
        {/* Advanced Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-accent/20 rounded-full blur-[150px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            <div className="inline-flex items-center space-x-3 px-6 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl animate-fade-in-up">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-white/80">Premium Software Ecosystem</span>
            </div>

            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] animate-fade-in-up">
              KIẾN TẠO <br />
              <span className="text-accent underline decoration-white/5 underline-offset-10">TƯƠNG LAI</span> <br />
              DIGITAL.
            </h1>

            <p className="text-lg sm:text-2xl text-white/50 max-w-3xl mx-auto font-medium leading-relaxed italic animate-fade-in-up delay-200">
              Chuyên cung cấp các giải pháp phần mềm quản trị doanh nghiệp và hệ sinh thái E-commerce đạt chuẩn công nghệ quốc tế.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 animate-fade-in-up delay-300">
              <Link
                to="/projects"
                className="w-full sm:w-auto px-16 py-6 bg-white text-primary rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-premium hover:shadow-glow hover:-translate-y-2 transition-all duration-500 group overflow-hidden relative"
              >
                <span className="relative z-10 uppercase">Khám phá thư viện</span>
                <div className="absolute inset-x-0 bottom-0 h-0 bg-accent group-hover:h-full transition-all duration-500 opacity-10"></div>
              </Link>
              <Link
                to="/projects"
                className="w-full sm:w-auto px-16 py-6 bg-white/5 backdrop-blur-xl text-white border border-white/10 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all duration-500"
              >
                Khám phá ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features - Enterprise Level */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-8">
            <div className="max-w-3xl space-y-6">
              <h2 className="text-xs font-black text-accent uppercase tracking-[0.5em]">GIÁ TRỊ CỐT LÕI</h2>
              <h3 className="text-4xl sm:text-6xl font-black text-primary tracking-tighter leading-tight">
                TẠI SAO CÁC DOANH NGHIỆP <br />
                <span className="text-gray-300 italic">CHỌN THAITIENSHOP?</span>
              </h3>
            </div>
            <Link to="/projects" className="inline-flex items-center text-primary font-black text-xs uppercase tracking-widest group border-b-2 border-accent pb-2">
              Xem chi tiết dịch vụ <ArrowRight className="ml-3 h-4 w-4 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {bentoItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className={`${item.span} bg-[#f8fafc] p-12 rounded-[3.5rem] border border-gray-100 hover:border-accent/30 hover:shadow-premium hover:-translate-y-2 transition-all duration-700 group`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-10 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <Icon className="h-8 w-8 text-accent group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-3xl font-black text-primary mb-6 tracking-tighter uppercase">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium italic">"{item.desc}"</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats - Dark Matrix Style */}
      <section className="py-32 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 opacity-50 skew-y-12 translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16">
            {[
              { label: "Dự án bàn giao", value: "500+" },
              { label: "Chỉ số hài lòng", value: "99%" },
              { label: "Năm kinh nghiệm", value: "05+" },
              { label: "Sản phẩm Digital", value: "150+" }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-5xl md:text-7xl font-black mb-4 text-white tracking-tighter group-hover:text-accent transition-colors duration-500">{stat.value}</div>
                <div className="text-accent/40 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Trusted By - Minimalist Branding */}
      <section className="py-32 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.5em] mb-20">ĐỐI TÁC CHIẾN LƯỢC</h2>
          <div className="flex flex-wrap justify-center gap-16 md:gap-32 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            {['VIB', 'TECHCOMBANK', 'FPT SOFTWARE', 'VINFAST', 'VIETTEL'].map(logo => (
              <span key={logo} className="text-3xl font-black text-primary italic tracking-widest">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - High-end Cards */}
      <section className="py-32 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto text-center mb-24 space-y-6">
            <h2 className="text-xs font-black text-accent uppercase tracking-[0.5em]">TÍN NHIỆM</h2>
            <h3 className="text-4xl sm:text-6xl font-black text-primary tracking-tighter">ĐÁNH GIÁ TỪ CHUYÊN GIA</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                text: "Tôi đánh giá rất cao quy trình làm việc và chất lượng source code của Tiến. Các dự án được tối ưu hóa cực kỳ tốt, đạt chuẩn ERP chuyên nghiệp.",
                author: "TS. Hoàng Long",
                role: "Senior Lead Engineer @ FPT Software",
                initial: "H"
              },
              {
                text: "Hệ thống Thanh toán và kiến trúc UI của thaitienshop rất bài bản, đây là giải pháp tối ưu cho khối doanh nghiệp vừa và nhỏ.",
                author: "Lê Minh Dương",
                role: "Technical Architect @ VinGroup",
                initial: "L"
              }
            ].map((test, i) => (
              <div key={i} className="bg-white p-12 sm:p-16 rounded-[4rem] shadow-premium hover:shadow-glow transition-all duration-700 relative group">
                <Star className="absolute top-12 right-12 h-12 w-12 text-accent/5 group-hover:text-accent/10 transition-colors" />
                <p className="text-xl sm:text-2xl text-primary font-medium italic leading-relaxed mb-12 relative z-10">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-[#0f172a] text-white flex items-center justify-center rounded-[1.5rem] font-black text-2xl group-hover:scale-110 transition-transform duration-500">
                    {test.initial}
                  </div>
                  <div className="ml-6">
                    <h4 className="font-black text-primary text-xl tracking-tight">{test.author}</h4>
                    <p className="text-accent text-[10px] font-black uppercase tracking-widest">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High-end CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#0f172a] rounded-[5rem] p-16 md:p-32 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-accent/5 animate-pulse"></div>
            <div className="relative z-10 space-y-12">
              <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-none">
                SẴN SÀNG CHO <br />
                <span className="text-accent">DỰ ÁN TIẾP THEO?</span>
              </h2>
              <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto font-medium italic px-4">
                Đồng hành cùng bạn kiến tạo những giải pháp công nghệ bền vững và hiệu quả nhất.
              </p>
              <div className="pt-8">
                <Link
                  to="/projects"
                  className="inline-flex items-center bg-white text-primary px-16 py-7 rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-premium hover:shadow-glow hover:-translate-y-2 transition-all duration-500"
                >
                  Bắt đầu ngay <ChevronRight className="ml-4 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
