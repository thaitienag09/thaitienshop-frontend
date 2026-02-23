import { Link } from 'react-router-dom'
import { ArrowRight, Star, Shield, Zap, Globe, Cpu, Layers, BarChart3, ChevronRight } from 'lucide-react'

export default function Trangchu() {
  const bentoItems = [
    {
      title: "Chất lượng doanh nghiệp",
      desc: "Tất cả đồ án được phát triển theo tiêu chuẩn công nghiệp với cấu trúc source code rõ ràng.",
      icon: Shield,
      color: "blue",
      span: "md:col-span-2"
    },
    {
      title: "Công nghệ hiện đại",
      desc: "React, Next.js, Node.js, AI/ML.",
      icon: Cpu,
      color: "purple",
      span: ""
    },
    {
      title: "Triển khai nhanh",
      desc: "Giao hàng và hỗ trợ cài đặt trong 24h.",
      icon: Zap,
      color: "orange",
      span: ""
    },
    {
      title: "Hỗ trợ kỹ thuật",
      desc: "Đội ngũ chuyên gia sẵn sàng hỗ trợ bạn 24/7.",
      icon: Globe,
      color: "green",
      span: "md:col-span-2"
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
              <span>Đẳng cấp doanh nghiệp</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-primary mb-8 leading-[1.1]">
              Kiến tạo tương lai với <span className="text-gradient">Giải pháp Đồ án</span> chuyên nghiệp
            </h1>
            <p className="text-xl text-gray-500 mb-12 leading-relaxed">
              thaitienshop cung cấp hệ sinh thái đồ án công nghệ thông tin cao cấp,
              được tối ưu hóa cho doanh nghiệp và sinh viên xuất sắc.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link
                to="/projects"
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-premium hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
              >
                <span>Khám phá ngay</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="bg-white text-primary border border-gray-200 px-10 py-4 rounded-2xl font-bold text-lg shadow-sm hover:bg-gray-50 transition-all duration-300"
              >
                Về chúng tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features */}
      <section className="py-24 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Tại sao khách hàng tin tưởng chúng tôi?</h2>
              <p className="text-gray-500">Chúng tôi không chỉ bán source code, chúng tôi cung cấp giải pháp hoàn thiện và hỗ trợ tận tâm.</p>
            </div>
            <Link to="/projects" className="text-accent font-bold flex items-center group">
              Xem chi tiết dịch vụ <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoItems.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className={`${item.span} glass p-8 rounded-[2rem] shadow-premium hover:shadow-glow hover:-translate-y-1 transition-all duration-500 group`}
                >
                  <div className={`w-14 h-14 rounded-2xl bg-${item.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-7 w-7 text-${item.color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 p-20 opacity-10">
          <Layers className="w-64 h-64" />
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: "Dự án hoàn thành", value: "500+" },
              { label: "Khách hàng hài lòng", value: "98%" },
              { label: "Năm kinh nghiệm", value: "5+" },
              { label: "Số lượng đồ án", value: "150+" }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2 text-accent">{stat.value}</div>
                <div className="text-gray-400 text-sm font-semibold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Social Proof */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em] mb-4">Các đơn vị đã tin tưởng</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
            {['VIB', 'TECHCOMBANK', 'FPT SOFTWARE', 'VINFAST', 'VIETTEL'].map(logo => (
              <span key={logo} className="text-2xl font-black text-primary italic tracking-tighter">{logo}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Testimonials */}
      <section className="py-24 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Phản hồi từ chuyên gia</h2>
            <div className="w-20 h-1.5 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                text: "Tôi đánh giá rất cao quy trình làm việc và chất lượng source code của Tiến. Các dự án AI được tối ưu hóa cực kỳ tốt.",
                author: "TS. Hoàng Long",
                role: "Senior Lead Engineer @ FPT",
                avatar: "H"
              },
              {
                text: "Hệ thống Thanh toán và UI của các đồ án eCommerce rất chuyên nghiệp, sát với yêu cầu thực tế của các doanh nghiệp hiện nay.",
                author: "Lê Minh Dương",
                role: "Technical Architect @ VinGroup",
                avatar: "L"
              }
            ].map((test, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-premium relative group">
                <Star className="absolute top-8 right-10 h-10 w-10 text-accent/10 group-hover:text-accent/20 transition-colors" />
                <p className="text-xl text-gray-600 italic mb-8 relative z-10">"{test.text}"</p>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl font-bold text-xl mr-5">
                    {test.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">{test.author}</h4>
                    <p className="text-sm text-gray-500">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="bg-primary rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-glow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 blur-[100px]"></div>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Sẵn sàng để đưa đồ án của bạn <br />lên tầm cao mới?</h2>
            <p className="text-blue-100 text-xl mb-12 max-w-2xl mx-auto font-medium">Bắt đầu ngay hôm nay để nhận được những giải pháp công nghệ tốt nhất từ chúng tôi.</p>
            <Link
              to="/projects"
              className="inline-flex items-center bg-accent text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-premium hover:shadow-accent-glow hover:-translate-y-1 transition-all duration-300"
            >
              Xem danh sách đồ án
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
