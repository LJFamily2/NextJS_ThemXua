'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: '#FBF7F4', // Matching the theme's cream color
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background decoration */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          opacity: 0.1,
          zIndex: 1,
        }}
      >
        <Image
          src="/images/logoTransparentNauDo.png"
          alt="Them Xua Watermark"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '2rem',
        }}
      >
        <h1
          style={{
            fontSize: '6rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            color: '#8B4513', // Warm brown color
            fontFamily: 'var(--font-playfair)',
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            color: '#5C3D2E',
            marginBottom: '2rem',
            fontFamily: 'var(--font-montserrat)',
          }}
        >
          Xin lỗi, trang này không tồn tại
          <br />
          Sorry, this page does not exist
        </p>

        <Link
          href="/"
          className="not-found-home-link"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: '#8B4513',
            color: '#FFF',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            fontFamily: 'var(--font-montserrat)',
          }}
        >
          Về trang chủ • Return Home
        </Link>
        <style jsx>{`
          .not-found-home-link:hover {
            background: #5c3d2e !important;
          }
        `}</style>
      </div>
    </div>
  );
}
