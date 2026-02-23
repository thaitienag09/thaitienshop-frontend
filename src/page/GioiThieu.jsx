import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Code,
  Award,
  Users,
  Clock,
  CheckCircle,
  Star,
  ArrowRight,
  Heart,
  Lightbulb,
  Target,
  Zap,
  Shield,
  Globe,
  Smartphone,
  Cpu,
  Gamepad2,
  GraduationCap,
  Rocket,
  Brain
} from 'lucide-react'

export default function GioiThieu() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const skills = [
    { name: 'JavaScript', icon: 'fab fa-js-square', color: 'text-yellow-400' },
    { name: 'React', icon: 'fab fa-react', color: 'text-blue-400' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: 'text-green-600' },
    { name: 'Python', icon: 'fab fa-python', color: 'text-blue-600' },
    { name: 'HTML5', icon: 'fab fa-html5', color: 'text-orange-500' },
    { name: 'Laravel', icon: 'fab fa-laravel', color: 'text-red-500' },
    { name: 'Git', icon: 'fab fa-git-alt', color: 'text-orange-600' },
    { name: 'MongoDB', icon: 'fas fa-database', color: 'text-green-500' }
  ]

  const achievements = [
    {
      icon: Award,
      title: '500+ Đồ án hoàn thành',
      description: 'Đã tạo ra hơn 500 đồ án chất lượng cao cho sinh viên',
      color: 'text-yellow-500'
    },
    {
      icon: Users,
      title: '1000+ Sinh viên hài lòng',
      description: 'Nhận được phản hồi tích cực từ hàng nghìn sinh viên',
      color: 'text-blue-500'
    },
    {
      icon: Star,
      title: '4.9/5 Đánh giá trung bình',
      description: 'Luôn duy trì chất lượng dịch vụ ở mức cao nhất',
      color: 'text-purple-500'
    },
    {
      icon: Clock,
      title: '5+ Năm kinh nghiệm',
      description: 'Kinh nghiệm dày dặn trong lĩnh vực phát triển phần mềm',
      color: 'text-green-500'
    }
  ]

  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Website responsive, SPA, E-commerce với React, Vue, Angular',
      features: ['React.js', 'Next.js', 'Tailwind CSS', 'API Integration']
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Ứng dụng di động cross-platform với React Native, Flutter',
      features: ['React Native', 'Flutter', 'iOS/Android', 'Push Notifications']
    },
    {
      icon: Cpu,
      title: 'AI/ML Projects',
      description: 'Dự án trí tuệ nhân tạo và machine learning với Python',
      features: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis']
    },
    {
      icon: Gamepad2,
      title: 'Game Development',
      description: 'Game 2D/3D với Unity, Unreal Engine và web games',
      features: ['Unity', 'C#', 'JavaScript', 'WebGL']
    }
  ]

  const timeline = [
    {
      year: '2021',
      title: 'Bắt đầu sự nghiệp',
      description: 'Tốt nghiệp đại học và bắt đầu làm việc với các dự án CNTT',
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      year: '2022',
      title: 'Chuyên sâu Web Development',
      description: 'Tập trung phát triển kỹ năng React.js và Node.js',
      icon: Code,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      year: '2023',
      title: 'Mở rộng sang Mobile',
      description: 'Học React Native và bắt đầu phát triển ứng dụng di động',
      icon: Smartphone,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      year: '2024',
      title: 'Tham gia AI/ML',
      description: 'Khám phá lĩnh vực trí tuệ nhân tạo và machine learning',
      icon: Brain,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      year: '2025',
      title: 'TiếnCode Platform',
      description: 'Ra mắt nền tảng TiếnCode để phục vụ sinh viên',
      icon: Rocket,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="w-32 h-32 bg-white p-1 rounded-full mx-auto mb-8 shadow-premium overflow-hidden">
              <img src="/avtar.png" alt="Dương Thái Tiến" className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Xin chào, tôi là Thái Tiến
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Full Stack Developer với hơn 5 năm kinh nghiệm trong lĩnh vực CNTT.
              Tôi chuyên tạo ra các đồ án chất lượng cao cho sinh viên.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/projects"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Xem đồ án của tôi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/#contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Về tôi
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Tôi là một developer đam mê công nghệ với hơn 5 năm kinh nghiệm trong lĩnh vực CNTT.
                Tôi bắt đầu sự nghiệp với việc phát triển web và dần mở rộng sang các lĩnh vực khác
                như mobile app, AI/ML và game development.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Với mong muốn giúp đỡ các bạn sinh viên có được những đồ án chất lượng cao,
                tôi đã tạo ra thaitienshop - nền tảng cung cấp đồ án CNTT tốt nhất cho sinh viên.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-lg">
                  <Heart className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-blue-800 font-medium">Đam mê công nghệ</span>
                </div>
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-lg">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                  <span className="text-green-800 font-medium">Sáng tạo</span>
                </div>
                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-lg">
                  <Target className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="text-purple-800 font-medium">Tập trung chất lượng</span>
                </div>
              </div>
            </div>
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-4">Thống kê của tôi</h3>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">500+</div>
                      <div className="text-sm text-blue-100">Đồ án hoàn thành</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">1000+</div>
                      <div className="text-sm text-blue-100">Sinh viên hài lòng</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">5+</div>
                      <div className="text-sm text-blue-100">Năm kinh nghiệm</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-2">4.9/5</div>
                      <div className="text-sm text-blue-100">Đánh giá trung bình</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kỹ năng của tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Các công nghệ và ngôn ngữ lập trình tôi thành thạo
            </p>
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden marquee-container">
            <div className="flex animate-marquee">
              {/* First set of skills */}
              {skills.map((skill, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-8 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4 min-w-[200px]"
                >
                  <i className={`${skill.icon} text-3xl ${skill.color} icon-hover`}></i>
                  <span className="text-lg font-semibold text-gray-900">{skill.name}</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {skills.map((skill, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-8 bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-4 min-w-[200px]"
                >
                  <i className={`${skill.icon} text-3xl ${skill.color} icon-hover`}></i>
                  <span className="text-lg font-semibold text-gray-900">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Thành tích nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những con số ấn tượng trong sự nghiệp của tôi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div
                key={achievement.title}
                className={`text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              >
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${achievement.color.replace('text-', 'bg-').replace('-500', '-100')}`}>
                  <achievement.icon className={`h-8 w-8 ${achievement.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Hành trình của tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Những cột mốc quan trọng trong sự nghiệp phát triển của tôi
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600"></div>
            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className={`bg-white rounded-xl p-6 shadow-lg transition-all duration-500 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center mb-4">
                      <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center mr-4`}>
                        <item.icon className={`h-6 w-6 ${item.color}`} />
                      </div>
                      <div>
                        <div className={`${item.color} font-bold text-lg`}>{item.year}</div>
                        <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                      </div>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 ${item.color.replace('text-', 'bg-')} rounded-full border-4 border-white shadow-lg`}></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Sẵn sàng bắt đầu dự án của bạn?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Hãy liên hệ với tôi ngay để được tư vấn miễn phí về đồ án CNTT của bạn
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center"
              >
                Liên hệ ngay
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/projects"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-colors"
              >
                Xem đồ án của tôi
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Ủng hộ tôi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Nếu bạn thấy các đồ án của tôi hữu ích, hãy ủng hộ để tôi có thể tiếp tục tạo ra nhiều sản phẩm chất lượng hơn
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-heart text-3xl text-white"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Cảm ơn bạn đã ủng hộ!</h3>
              <p className="text-gray-600 mb-6">
                Mỗi khoản ủng hộ của bạn sẽ giúp tôi duy trì và phát triển thêm nhiều đồ án chất lượng cao
              </p>
            </div>

            {/* Donate Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { amount: '50,000', label: 'Cà phê' },
                { amount: '100,000', label: 'Bữa ăn' },
                { amount: '200,000', label: 'Sách' },
                { amount: '500,000', label: 'Khóa học' }
              ].map((item, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${index === 1
                      ? 'border-red-500 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:border-red-300 text-gray-700'
                    }`}
                >
                  <div className="text-lg font-bold">{item.amount}₫</div>
                  <div className="text-sm">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số tiền tùy chỉnh
              </label>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Nhập số tiền..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg"
                />
                <span className="absolute right-4 top-3 text-gray-500">₫</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Phương thức thanh toán</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                  <i className="fas fa-university text-2xl text-blue-600 mr-3"></i>
                  <div className="text-left">
                    <div className="font-medium">Chuyển khoản ngân hàng</div>
                    <div className="text-sm text-gray-500">Vietcombank, BIDV, Techcombank</div>
                  </div>
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-300 rounded-lg hover:border-red-500 hover:bg-red-50 transition-colors">
                  <i className="fas fa-mobile-alt text-2xl text-green-600 mr-3"></i>
                  <div className="text-left">
                    <div className="font-medium">Ví điện tử</div>
                    <div className="text-sm text-gray-500">Momo, ZaloPay, VNPay</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Donate Button */}
            <div className="text-center">
              <button className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                <i className="fas fa-heart mr-2"></i>
                Ủng hộ ngay
              </button>
              <p className="text-sm text-gray-500 mt-4">
                💝 Mọi khoản ủng hộ đều được ghi nhận và cảm ơn chân thành
              </p>
            </div>

            {/* Bank Info */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Thông tin chuyển khoản</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Ngân hàng:</span>
                  <span className="font-medium">VIB (Ngân hàng Quốc tế)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Số tài khoản:</span>
                  <span className="font-medium font-mono text-lg">913263053</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Chủ tài khoản:</span>
                  <span className="font-medium">DUONG THAI TIEN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nội dung:</span>
                  <span className="font-medium text-red-600">UNG HO THAITIENSHOP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
