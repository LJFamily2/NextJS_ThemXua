'use client';

import Header from './components/Header';
import Footer from './components/Footer';
import Button from './components/Button';
import Card from './components/Card';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/60 z-10"></div>
            {/* Replace with actual restaurant image */}
            <div className="w-full h-full bg-gradient-to-br from-primary to-secondary"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-neutral mb-6 leading-tight">
              Thềm Xưa
            </h1>
            <p className="font-body text-xl md:text-2xl text-neutral/90 mb-4 leading-relaxed">
              Trải nghiệm ẩm thực Việt Nam đích thực
            </p>
            <p className="font-body text-lg md:text-xl text-neutral/80 mb-8 max-w-2xl mx-auto">
              Trong không gian ấm cúng, truyền thống, nơi hương vị quê hương
              được gìn giữ qua từng món ăn
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button variant="primary" size="lg" href="/booking">
                Đặt Bàn Ngay
              </Button>
              <Button variant="outline" size="lg" href="/menu">
                Xem Menu
              </Button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="animate-bounce">
              <div className="w-6 h-10 border-2 border-neutral rounded-full flex justify-center">
                <div className="w-1 h-3 bg-neutral rounded-full mt-2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>{' '}
        {/* Features Section */}
        <section className="py-20 bg-light">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-primary mb-4">
                Tại Sao Chọn Thềm Xưa?
              </h2>
              <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến trải nghiệm ẩm thực đậm chất Việt Nam
                với chất lượng tốt nhất
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card
                variant="feature"
                icon="🍜"
                title="Món Ăn Truyền Thống"
                description="Công thức được truyền qua nhiều thế hệ, giữ nguyên hương vị đậm đà của quê hương"
              />
              <Card
                variant="feature"
                icon="🌿"
                title="Nguyên Liệu Tươi Ngon"
                description="Chọn lọc kỹ càng từ những nguồn nguyên liệu tự nhiên, tươi ngon nhất"
              />
              <Card
                variant="feature"
                icon="🏮"
                title="Không Gian Ấm Cúng"
                description="Thiết kế theo phong cách Việt Nam truyền thống, tạo cảm giác thân thuộc như ở nhà"
              />
            </div>
          </div>
        </section>
        {/* Menu Preview Section */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-primary mb-4">
                Món Ăn Nổi Bật
              </h2>
              <p className="font-body text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá những món ăn được yêu thích nhất tại Thềm Xưa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                variant="menu"
                title="Phở Bò Thềm Xưa"
                description="Tô phở truyền thống với nước dùng được ninh từ xương bò trong 12 tiếng, thịt bò tươi ngon"
                price="85.000 VNĐ"
                category="Món Chính"
                buttonText="Đặt Món"
                buttonHref="/menu"
              />
              <Card
                variant="menu"
                title="Bánh Mì Thịt Nướng"
                description="Bánh mì giòn thơm với thịt nướng than hoa, pate và rau củ tươi mát"
                price="45.000 VNĐ"
                category="Ăn Vặt"
                buttonText="Đặt Món"
                buttonHref="/menu"
              />
              <Card
                variant="menu"
                title="Chè Đậu Xanh"
                description="Chè đậu xanh thơm ngon, mát lạnh, là món tráng miệng hoàn hảo"
                price="25.000 VNĐ"
                category="Tráng Miệng"
                buttonText="Đặt Món"
                buttonHref="/menu"
              />
            </div>

            <div className="text-center mt-12">
              <Button variant="primary" size="lg" href="/menu">
                Xem Toàn Bộ Menu
              </Button>
            </div>
          </div>
        </section>
        {/* Testimonials Section */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl font-bold text-neutral mb-4">
                Khách Hàng Nói Gì Về Chúng Tôi
              </h2>
              <p className="font-body text-lg text-neutral/80 max-w-2xl mx-auto">
                Những phản hồi chân thực từ những người đã trải nghiệm tại Thềm
                Xưa
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card
                variant="testimonial"
                description="Món ăn ngon tuyệt vời, không gian ấm cúng. Cảm giác như được về thăm quê hương. Tôi sẽ quay lại nhiều lần nữa!"
                author="Nguyễn Minh Anh"
                rating={5}
              />
              <Card
                variant="testimonial"
                description="Phở ở đây ngon nhất mà tôi từng ăn. Nước dùng đậm đà, thịt bò tươi ngon. Dịch vụ cũng rất chu đáo."
                author="Trần Văn Đức"
                rating={5}
              />
              <Card
                variant="testimonial"
                description="Không gian rất đẹp, món ăn chất lượng cao. Giá cả hợp lý. Rất phù hợp để đi cùng gia đình."
                author="Lê Thị Hương"
                rating={4}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
