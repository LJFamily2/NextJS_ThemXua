# Thềm Xưa Restaurant Website

A modern, multilingual restaurant website built with Next.js for Quán Thềm Xưa, a Vietnamese seafood restaurant in Tây Ninh, Vietnam. The website features comprehensive SEO optimization, multilingual support, and a responsive design.

## Description

This is a professional restaurant website that showcases Thềm Xưa's seafood cuisine, dining areas, VIP rooms, and booking services. The website is designed to attract families, young adults, tourist groups, and corporate events with an emphasis on Vietnamese seafood dining experiences. The site features advanced SEO implementation targeting Vietnamese search engines and local business optimization.

## Tech Stack

### Frontend

- **Next.js 15.3.3** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Keen Slider** - Touch slider library

### Backend & Server

- **Express.js** - Node.js web framework
- **Mongoose** - MongoDB object modeling
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing
- **Express Rate Limit** - API rate limiting

### SEO & Analytics

- **Vercel Analytics** - Web analytics
- **Vercel Speed Insights** - Performance monitoring
- **Custom SEO Implementation** - Structured data, sitemaps, robots.txt
- **Multi-language SEO** - Vietnamese, English, Chinese, Khmer

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

### Deployment

- **Vercel** - Hosting and deployment platform
- **Custom Express Server** - Production server configuration

## Features

### 🌐 Multilingual Support

- 4 languages: Vietnamese (default), English, Chinese, Khmer
- Dynamic language switching
- SEO-optimized language routing
- Localized content management

### 🍽️ Restaurant Features

- **Hero Section** - Eye-catching landing page
- **Menu Showcase** - Interactive food gallery
- **Dining Areas** - Outdoor, private rooms, banquet halls
- **VIP Rooms** - Luxury dining spaces (5 different rooms)
- **Booking System** - Table reservation functionality
- **Events & News** - Latest updates and announcements

### 🔍 Advanced SEO

- **Technical SEO** - Optimized meta tags, structured data
- **Local Business Schema** - Google Business integration
- **Multilingual Sitemaps** - Dynamic XML sitemaps
- **Robots.txt Optimization** - Search engine directives
- **Performance Optimization** - Image optimization, lazy loading

### 📱 Responsive Design

- Mobile-first approach
- Cross-device compatibility
- Touch-friendly interactions
- Optimized images for different screen sizes

### 🚀 Performance

- Server-side rendering (SSR)
- Static site generation (SSG)
- Image optimization
- Code splitting and lazy loading
- Compression and caching

## Prerequisites

Before running this project, make sure you have the following installed:

- **Node.js** - Version 18.0 or higher
- **npm** or **yarn** - Package manager
- **MongoDB** - Database (local or cloud instance)
- **Git** - Version control

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Server Configuration
NODE_ENV=production
PORT=3000

# SEO & Analytics
NEXT_PUBLIC_SITE_URL=https://yourwebsite.com
VERCEL_ANALYTICS_ID=your_vercel_analytics_id

# Contact Information
NEXT_PUBLIC_PHONE=+84971807272
NEXT_PUBLIC_EMAIL=themxuaintn@gmail.com
```

## Installation & Setup

Follow these steps to set up the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/NextJS_ThemXua.git
cd NextJS_ThemXua/themxua
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Environment Variables

```bash
# Copy the environment template
cp .env.example .env.local

# Edit the .env.local file with your actual values
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

### 5. Build for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

The application will be available at `http://localhost:3000`.

## Usage

### Development Mode

- Visit `http://localhost:3000` to view the website
- Use the language switcher in the header to test multilingual functionality
- Navigate through different sections: Menu, VIP Rooms, Booking, Events

### Production Deployment

- The site uses a custom Express.js server for production
- Deploy to Vercel or your preferred hosting platform
- Configure environment variables in your hosting platform

### Content Management

- Update translations in `app/translations/` directory
- Modify SEO settings in `app/lib/seo.ts`
- Add new images to `public/images/`
- Update menu items and content in respective component files

## Folder Structure

```
themxua/
├── app/                          # Next.js App Router
│   ├── [lang]/                   # Dynamic language routing
│   ├── api/                      # API routes
│   │   ├── robots/              # Dynamic robots.txt
│   │   └── sitemap/             # Dynamic sitemap
│   ├── booking/                  # Booking page
│   ├── components/              # React components
│   │   ├── sections/            # Page sections
│   │   └── ui/                  # UI components
│   ├── contexts/                # React contexts
│   ├── events/                  # Events page
│   ├── lib/                     # Utility libraries
│   │   ├── analytics.ts         # Analytics configuration
│   │   ├── seo.ts              # SEO configuration
│   │   └── structured-data.ts   # Schema markup
│   ├── menu/                    # Menu page
│   ├── news/                    # News page
│   ├── party/                   # Party/Events page
│   ├── translations/            # Language files
│   │   ├── en.json             # English translations
│   │   ├── vi.json             # Vietnamese translations
│   │   ├── zh.json             # Chinese translations
│   │   └── km.json             # Khmer translations
│   ├── utils/                   # Utility functions
│   ├── vip/                     # VIP rooms page
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Homepage
├── lib/                         # Shared utilities
├── public/                      # Static assets
│   ├── images/                  # Image assets
│   └── robots.txt              # Static robots.txt
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── package.json                # Dependencies and scripts
├── server.js                   # Custom Express server
├── tsconfig.json               # TypeScript configuration
└── SEO_GUIDE.md               # SEO implementation guide
```

## Contributing

We welcome contributions to improve the website! Please follow these guidelines:

### Getting Started

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Write meaningful commit messages

### Areas for Contribution

- Translation improvements
- SEO enhancements
- Performance optimizations
- Accessibility improvements
- New features and components
- Bug fixes and testing

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

### Project Information

- **Restaurant**: Quán Thềm Xưa Tây Ninh
- **Address**: 23 Hoàng Lê Kha, Phường 3, Tây Ninh, Vietnam
- **Phone**: [+84 971 807 272](tel:+84971807272)
- **Email**: [themxuaintn@gmail.com](mailto:themxuaintn@gmail.com)

### Development Team

- **GitHub**: [LJFamily2](https://github.com/LJFamily2)
- **Repository**: [NextJS_ThemXua](https://github.com/LJFamily2/NextJS_ThemXua)

### Website

- **Production**: [https://themxuatayninh.com](https://themxuatayninh.com)

---

**Made with ❤️ for Quán Thềm Xưa Tây Ninh**
