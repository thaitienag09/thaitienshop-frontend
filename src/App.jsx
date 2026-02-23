import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Trangchu from './page/Trangchu'
import DanhSachDoAn from './page/DanhSachDoAn'
import ChiTietDoAn from './page/ChiTietDoAn'
import ThanhToan from './page/ThanhToan'
import DonHang from './page/DonHang'
import Auth from './page/Auth'
import GioiThieu from './page/GioiThieu'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-24">
          <Routes>
            <Route path="/" element={<Trangchu />} />
            <Route path="/projects" element={<DanhSachDoAn />} />
            <Route path="/project/:id" element={<ChiTietDoAn />} />
            <Route path="/payment" element={<ThanhToan />} />
            <Route path="/about" element={<GioiThieu />} />
            <Route path="*" element={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><h1 className="text-2xl font-bold text-gray-900">404 - Trang không tìm thấy</h1></div>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

