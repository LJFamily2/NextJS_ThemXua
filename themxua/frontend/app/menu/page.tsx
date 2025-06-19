'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

// Sample menu data - this would typically come from an API or database
const menuData = {
  'mon-chinh': [
    {
      id: 1,
      title: 'Phở Bò Thềm Xưa',
      description:
        'Tô phở truyền thống với nước dùng được ninh từ xương bò trong 12 tiếng, thịt bò tươi ngon, bánh phở dai ngon',
      price: '85.000 VNĐ',
      category: 'Món Chính',
      image: '/images/pho-bo.jpg',
    },
    {
      id: 2,
      title: 'Bún Bò Huế',
      description:
        'Bún bò Huế chuẩn vị miền Trung với nước dùng đậm đà, thịt bò, chả cua, giò heo thơm ngon',
      price: '75.000 VNĐ',
      category: 'Món Chính',
      image: '/images/bun-bo-hue.jpg',
    },
    {
      id: 3,
      title: 'Cơm Tấm Sài Gòn',
      description:
        'Cơm tấm với sườn nướng than hoa, bì, chả, trứng ốp la và nước mắm pha chuẩn vị Sài Gòn',
      price: '65.000 VNĐ',
      category: 'Món Chính',
      image: '/images/com-tam.jpg',
    },
    {
      id: 4,
      title: 'Bánh Xèo Miền Tây',
      description:
        'Bánh xèo giòn rụm với tôm thịt, giá đỗ, rau thơm và nước chấm đặc biệt',
      price: '55.000 VNĐ',
      category: 'Món Chính',
      image: '/images/banh-xeo.jpg',
    },
  ],
  'an-vat': [
    {
      id: 5,
      title: 'Bánh Mì Thịt Nướng',
      description:
        'Bánh mì giòn thơm với thịt nướng than hoa, pate, rau củ tươi mát và gia vị đặc biệt',
      price: '45.000 VNĐ',
      category: 'Ăn Vặt',
      image: '/images/banh-mi.jpg',
    },
    {
      id: 6,
      title: 'Gỏi Cuốn Tôm Thịt',
      description:
        'Gỏi cuốn tươi với tôm, thịt luộc, bún tươi, rau thơm và nước chấm đậm đà',
      price: '35.000 VNĐ',
      category: 'Ăn Vặt',
      image: '/images/goi-cuon.jpg',
    },
    {
      id: 7,
      title: 'Chả Cá Lã Vọng',
      description:
        'Chả cá truyền thống Hà Nội với cá thác lác, nghệ, thì là và bún tươi',
      price: '95.000 VNĐ',
      category: 'Ăn Vặt',
      image: '/images/cha-ca.jpg',
    },
  ],
  'trang-mieng': [
    {
      id: 8,
      title: 'Chè Đậu Xanh',
      description: 'Chè đậu xanh thơm ngon, mát lạnh với nước cốt dừa béo ngậy',
      price: '25.000 VNĐ',
      category: 'Tráng Miệng',
      image: '/images/che-dau-xanh.jpg',
    },
    {
      id: 9,
      title: 'Bánh Flan Caramen',
      description: 'Bánh flan mềm mịn với lớp caramen đắng ngọt hài hòa',
      price: '30.000 VNĐ',
      category: 'Tráng Miệng',
      image: '/images/banh-flan.jpg',
    },
    {
      id: 10,
      title: 'Chè Ba Màu',
      description:
        'Chè ba màu truyền thống với đậu xanh, đậu đỏ, thạch rau câu và nước cốt dừa',
      price: '28.000 VNĐ',
      category: 'Tráng Miệng',
      image: '/images/che-ba-mau.jpg',
    },
  ],
  'do-uong': [
    {
      id: 11,
      title: 'Cà Phê Sữa Đá',
      description:
        'Cà phê phin truyền thống với sữa đặc ngọt ngào, đá lạnh sảng khoái',
      price: '20.000 VNĐ',
      category: 'Đồ Uống',
      image: '/images/ca-phe-sua-da.jpg',
    },
    {
      id: 12,
      title: 'Nước Mía Tươi',
      description:
        'Nước mía vắt tươi mát lạnh, ngọt tự nhiên, bổ sung năng lượng',
      price: '15.000 VNĐ',
      category: 'Đồ Uống',
      image: '/images/nuoc-mia.jpg',
    },
    {
      id: 13,
      title: 'Trà Đá Chanh',
      description:
        'Trà đá chanh tươi mát, chua ngọt hài hòa, giải khát tuyệt vời',
      price: '12.000 VNĐ',
      category: 'Đồ Uống',
      image: '/images/tra-da-chanh.jpg',
    },
  ],
};

const categories = [
  { id: 'tat-ca', name: 'Tất Cả', key: 'all' },
  { id: 'mon-chinh', name: 'Món Chính', key: 'mon-chinh' },
  { id: 'an-vat', name: 'Ăn Vặt', key: 'an-vat' },
  { id: 'trang-mieng', name: 'Tráng Miệng', key: 'trang-mieng' },
  { id: 'do-uong', name: 'Đồ Uống', key: 'do-uong' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const getFilteredItems = () => {
    if (activeCategory === 'all') {
      return Object.values(menuData).flat();
    }
    return menuData[activeCategory as keyof typeof menuData] || [];
  };

  const filteredItems = getFilteredItems();

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        {/* Menu Hero Section */}
        <section className="relative h-96 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary"></div>

          <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral mb-4">
              Menu Thềm Xưa
            </h1>
            <p className="font-body text-xl md:text-2xl text-neutral/90 leading-relaxed">
              Khám phá hương vị đặc trưng của ẩm thực Việt Nam
            </p>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-12 bg-light">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-6 py-3 rounded-full font-body font-semibold text-lg transition-all duration-300 ${
                    activeCategory === category.key
                      ? 'bg-accent text-white shadow-lg scale-105'
                      : 'bg-white text-primary hover:bg-accent/10 hover:scale-105 border border-primary/20'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Items */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="font-heading text-3xl font-bold text-primary mb-4">
                {activeCategory === 'all'
                  ? 'Tất Cả Món Ăn'
                  : categories.find(c => c.key === activeCategory)?.name}
              </h2>
              <p className="font-body text-lg text-gray-600">
                {filteredItems.length} món ăn được tìm thấy
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredItems.map(item => (
                <Card
                  key={item.id}
                  variant="menu"
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  category={item.category}
                  image={item.image}
                  imageAlt={item.title}
                  buttonText="Đặt Món"
                  buttonHref="/booking"
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <p className="font-body text-xl text-gray-500">
                  Không tìm thấy món ăn nào trong danh mục này.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-primary">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-heading text-4xl font-bold text-neutral mb-6">
              Sẵn Sàng Thưởng Thức?
            </h2>
            <p className="font-body text-xl text-neutral/90 mb-8 max-w-2xl mx-auto">
              Đặt bàn ngay hôm nay để trải nghiệm những món ăn tuyệt vời tại
              Thềm Xưa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" href="/booking">
                Đặt Bàn Ngay
              </Button>
              <Button variant="outline" size="lg" href="tel:+84123456789">
                Gọi Điện Đặt Bàn
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
