export const projects = {
    'shop-mon-an': {
        id: 'shop-mon-an',
        title: 'Hệ thống Đặt đồ ăn trực tuyến Shop Món Ăn (MERN Stack)',
        description: 'Hệ thống thương mại điện tử hoàn chỉnh cho lĩnh vực ẩm thực với đầy đủ tính năng đặt món, quản lý giỏ hàng và admin backend.',
        fullDescription: `Shop Món Ăn là đồ án Fullstack chuyên nghiệp được xây dựng trên nền tảng MERN Stack (MongoDB, Express, React, Node.js), cung cấp một giải pháp toàn diện cho việc kinh doanh đồ ăn trực tuyến.

## Tính năng nổi bật của dự án:
- **Giao diện người dùng (Frontend)**: Thiết kế hiện đại, responsive hoàn toàn trên mọi thiết bị.
- **Quản lý thực đơn**: Hiển thị danh sách món ăn theo danh mục, tính năng tìm kiếm và lọc thông minh.
- **Giỏ hàng & Đặt hàng**: Quy trình thêm món, cập nhật số lượng và đặt hàng mượt mà.
- **Trang Quản trị (Admin Panel)**: Quản lý món ăn (Thêm/Sửa/Xóa), quản lý trạng thái đơn hàng.
- **Bảo mật**: Hệ thống xác thực người dùng sử dụng JWT, bảo mật dữ liệu khách hàng.

## Cấu trúc dự án:
- **Backend API**: Node.js & Express.js xử lý logic nghiệp vụ và kết nối Database.
- **Frontend Client**: React.js kết hợp Vite cho tốc độ tải trang cực nhanh.
- **Database**: MongoDB lưu trữ dữ liệu món ăn, người dùng và đơn hàng linh hoạt.

## Stack Công nghệ:
- **Frontend**: React.js, Tailwind CSS, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas/Local)
- **Auth**: JWT (JSON Web Token)`,
        price: "100.000",
        originalPrice: "300.000",
        rating: 5.0,
        reviews: 88,
        downloads: 125,
        image: "/tranghome.png",
        category: "Web Development",
        author: {
            name: "thaitienshop",
            avatar: "/avtar.png",
            rating: 5.0,
            projects: 20
        },
        createdAt: "2024-05-15",
        updatedAt: "2024-05-20",
        tags: ["React.js", "Node.js", "MongoDB", "JWT"],
        previews: [
            { title: "Giao diện Trang chủ", image: "/tranghome.png" },
            { title: "Giao diện Quản trị (Admin)", image: "/admin.png" }
        ],
        requirements: [
            "Node.js phiên bản 18 trở lên",
            "MongoDB (Local hoặc Atlas)",
            "Trình duyệt Web hiện đại (Chrome/Edge)",
            "NPM hoặc Yarn để cài đặt thư viện"
        ],
        includes: [
            "Full Source Code (Frontend, Backend, Admin)",
            "Cơ sở dữ liệu MongoDB chuẩn hóa",
            "Hướng dẫn cài đặt chi tiết (File MD)",
            "Hỗ trợ kỹ thuật qua Ultraview/Zalo"
        ]
    }
};
