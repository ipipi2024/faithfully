'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HomeSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    { type: 'video', duration: 16000 },
    { type: 'story', duration: 60000 },
    { type: 'logo', duration: 10000 }
  ];

  useEffect(() => {
    if (currentSlide === 0) {
      // Video slide - wait for video to end
      const video = videoRef.current;
      if (video) {
        const handleVideoEnd = () => {
          setCurrentSlide(1);
        };
        video.addEventListener('ended', handleVideoEnd);
        return () => video.removeEventListener('ended', handleVideoEnd);
      }
    } else {
      // Auto-advance for story and logo slides
      const timer = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, slides[currentSlide].duration);

      return () => clearTimeout(timer);
    }
  }, [currentSlide]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    if (index === 0 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Slide 1: Video */}
      <div
        className={`absolute inset-0 transition-transform duration-1000 ${
          currentSlide === 0 ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          playsInline
        >
          <source src="/videos/Faithfully Intro.mp4" type="video/mp4" />
        </video>
        {currentSlide === 0 && (
          <button
            onClick={toggleMute}
            className="absolute bottom-8 right-8 bg-black/50 text-white px-4 py-2 rounded-lg hover:bg-black/70 transition"
          >
            {isMuted ? '🔇 Unmute' : '🔊 Mute'}
          </button>
        )}
      </div>

      {/* Slide 2: Story */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${
          currentSlide === 1 ? 'translate-x-0' : currentSlide < 1 ? 'translate-x-full' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
        }}
      >
        <div className="max-w-4xl px-8 text-white text-center">
          <h2 className="text-5xl font-bold mb-8">Faithfully — Our Story</h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p>
              At Faithfully, we believe intimacy within marriage is a sacred gift—created by God, blessed by covenant, and strengthened through faith. Our lingerie is designed not to compete with the world's definition of desire, but to honor God's design for love, unity, and devotion between husband and wife.
            </p>
            <p>
              Rooted in Christian beliefs, Faithfully exists to celebrate marital intimacy where Christ is the center, fidelity is cherished, and love is expressed with purity of heart. We create pieces that are elegant, modestly sensual, and intentionally crafted to serve marriage—not culture.
            </p>
            <p>
              Marriage is holy. Desire is not shameful when it flows from love, commitment, and faith. Our collections are meant to inspire connection, confidence, and joy within the boundaries God lovingly established.
            </p>
            <div className="my-6">
              <p className="font-semibold mb-3">At Faithfully, we stand for:</p>
              <ul className="text-base space-y-2">
                <li>• Faith-based marriage</li>
                <li>• Lifelong fidelity</li>
                <li>• Intimacy rooted in love, not lust</li>
                <li>• Christ-centered homes</li>
              </ul>
            </div>
            <p>
              Every design is a reminder that when a marriage is built on Christ, even the most intimate moments become acts of love, trust, and grace.
            </p>
            <p className="italic text-xl mt-8">
              "Therefore what God has joined together, let no one separate." — Mark 10:9
            </p>
          </div>
        </div>
      </div>

      {/* Slide 3: Logo */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-transform duration-1000 ${
          currentSlide === 2 ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--background)' }}
      >
        <div className="text-center">
          <img
            src="/products/Shutterstock_1607407333 (14).png"
            alt="Faithfully Logo"
            className="max-w-md mx-auto mb-8"
          />
          <Link
            href="/products"
            className="inline-block px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
            style={{
              background: 'var(--primary)',
              color: 'white',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--primary)';
            }}
          >
            Browse Products
          </Link>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-10"
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition z-10"
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  );
}
