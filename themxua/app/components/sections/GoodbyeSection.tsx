'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function GoodbyeSection() {
  const [videoEnded, setVideoEnded] = useState(false);
  const [typedText, setTypedText] = useState('');
  const textRef = useRef<HTMLDivElement>(null);

  const fullText =
    'Cảm ơn quý khách đã luôn yêu thương và ủng hộ Thềm Xưa trong suốt thời gian qua. Cảm ơn và tạm biệt!';

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;

    if (videoEnded) {
      // Small delay before starting to type for more impact
      timer = setTimeout(() => {
        let currentIndex = 0;
        interval = setInterval(() => {
          setTypedText(fullText.slice(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex === fullText.length) {
            clearInterval(interval);
          }
        }, 50);
      }, 800);

      // Smooth scroll to focus on the text
      setTimeout(() => {
        if (textRef.current) {
          textRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        }
      }, 500);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [videoEnded]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden bg-themxua-background">
      {/* ── Background: Complex Soft Gradient ── */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#FAF3E8] via-[#FBF4EC] to-[#F1E1CD]" />

      {/* ── Dynamic Floating Blobs ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -right-[10%] w-[40vw] h-[40vw] rounded-full blur-[100px] opacity-40 animate-soft-float bg-themxua-accent/30" />
        <div className="absolute top-[20%] -left-[10%] w-[35vw] h-[35vw] rounded-full blur-[80px] opacity-20 animate-soft-float-reverse bg-themxua-orange/20" />
        <div className="absolute -bottom-[10%] right-[10%] w-[45vw] h-[45vw] rounded-full blur-[120px] opacity-30 animate-soft-float bg-themxua-primary/10" />
      </div>

      {/* ── Fine Grain Texture Overlay ── */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.05] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content Wrapper with Entrance Animation ── */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center space-y-12 md:space-y-16 animate-content-reveal">
        {/* Header Section */}
        <div className="flex flex-col items-center space-y-6 md:space-y-8">
          {/* Brand Logo */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 opacity-90 drop-shadow-md animate-content-reveal delay-200">
            <Image
              src="/images/logoTransparentNauDo.png"
              alt="Thềm Xưa Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="text-center space-y-4 md:space-y-6 text-themxua-primary">
            <div className="flex items-center justify-center gap-6 animate-content-reveal delay-400">
              <span className="h-px w-12 md:w-20 bg-themxua-primary/20" />
              <span className="font-bold tracking-[0.4em] text-[10px] md:text-sm uppercase whitespace-nowrap">
                2016 – 2026
              </span>
              <span className="h-px w-12 md:w-20 bg-themxua-primary/20" />
            </div>

            <h1 className="font-black tracking-tighter leading-[1.4] animate-content-reveal delay-600">
              <span className="text-1xl md:text-4xl block opacity-90 mb-4 font-medium">
                Lời Tạm Biệt Từ
              </span>
              <span className="text-5xl md:text-8xl text-themxua-orange">
                Thềm Xưa
              </span>
            </h1>

            <p className="text-xs md:text-base text-themxua-gray font-semibold tracking-[0.25em] uppercase opacity-70 animate-content-reveal delay-800">
              Khép lại một chặng đường đầy ắp kỷ niệm
            </p>
          </div>
        </div>

        {/* Video Player Section */}
        <div className="relative w-full aspect-video md:max-w-4xl group animate-content-reveal delay-1000">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-themxua-accent/30 via-themxua-primary/5 to-themxua-orange/20 rounded-[40px] blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-1000" />

          <div className="relative h-full overflow-hidden rounded-[24px] md:rounded-[32px] bg-black shadow-2xl ring-1 ring-white/10">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              preload="auto"
              poster="/images/heroDesktop.jpg"
              onEnded={() => setVideoEnded(true)}
              onPlay={() => {
                if (videoEnded) {
                  setVideoEnded(false);
                  setTypedText('');
                }
              }}
            >
              <source src="/Thềm Xưa Cảm ơn và Tạm biệt(2).mp4" type="video/mp4" />
              Trình duyệt của bạn không hỗ trợ thẻ video.
            </video>
          </div>
        </div>

        {/* Dynamic Typing Message Area */}
        <div className="min-h-[140px] md:min-h-[180px] flex items-start justify-center w-full px-4 text-center">
          {videoEnded ? (
            <div className="space-y-8 animate-content-reveal" ref={textRef}>
              <p
                className="text-lg md:text-xl font-sans text-themxua-primary leading-relaxed max-w-3xl font-medium italic opacity-90"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,0.02)' }}
              >
                &ldquo;{typedText}&rdquo;
                <span className="inline-block w-[2px] md:w-[3px] h-[0.9em] ml-2 bg-themxua-orange align-middle animate-pulse" />
              </p>

              <div
                className="pt-4 md:pt-8 opacity-0 animate-content-reveal fill-mode-forwards"
                style={{ animationDelay: '1.2s' }}
              >
                <p className="text-themxua-gray text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
                  Trân trọng, Đội ngũ Thềm Xưa
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-3 opacity-30 animate-pulse">
              <span className="text-[10px] md:text-xs uppercase tracking-widest font-bold text-themxua-primary">
                Phát video để xem lời nhắn nhủ trân trọng
              </span>
              <div className="w-12 h-px bg-themxua-primary/40" />
            </div>
          )}
        </div>
      </div>

      {/* ── Fixed Decorative Layout Elements ── */}
      <div className="fixed inset-8 pointer-events-none border border-themxua-primary/5 rounded-[40px] z-40 hidden md:block" />

      {/* ── Subtle Background Copyright ── */}
      <div className="fixed bottom-6 left-0 right-0 z-50 text-center opacity-30 text-[9px] md:text-[11px] tracking-[0.4em] uppercase text-themxua-primary pointer-events-none">
        Thềm Xưa &copy; 2016 – 2026 • Tây Ninh
      </div>
    </section>
  );
}
