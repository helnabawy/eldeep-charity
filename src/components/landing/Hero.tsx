'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/mosque.jpg"
          alt="Islamic Pattern"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay with Green Tint */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/85 to-primary-700/80" />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-500/10 rounded-full blur-3xl animate-pulse" />

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-secondary-400/40 rounded-full animate-float"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${5 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-down"
            )}
          >
            <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
            <span className="text-secondary-200 text-sm font-medium">
              {locale === 'ar' ? 'معاً نحو مستقبل أفضل' : 'Together for a Better Future'}
            </span>
          </div>

          {/* Main Title */}
          <h1 
            className={clsx(
              "text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="block text-white">{t('title')}</span>
            <span className="block mt-2 bg-gradient-to-r from-secondary-300 via-secondary-200 to-secondary-400 bg-clip-text text-transparent">
              {locale === 'ar' ? 'الأمل يبدأ من هنا' : 'Hope Starts Here'}
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className={clsx(
              "text-base md:text-lg lg:text-xl text-primary-100/90 mb-10 max-w-2xl mx-auto leading-relaxed opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.4s' }}
          >
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div 
            className={clsx(
              "flex flex-wrap justify-center gap-4 opacity-0",
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.6s' }}
          >
            <Link href={`/${locale}/donate`} className="group">
              <Button 
                variant="secondary" 
                size="lg"
                className="relative overflow-hidden bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold px-6 py-3 rounded-full shadow-gold-glow-md hover:shadow-gold-glow-lg transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10">{t('cta')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-300 to-secondary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </Link>
            <Link href={`/${locale}/about`} className="group">
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:border-secondary-400/50"
              >
                {t('learnMore')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            className="fill-white"
          />
        </svg>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle z-20">
        <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-secondary-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}
