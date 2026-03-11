'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Users, FolderOpen, Heart, Banknote, TrendingUp, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { 
    icon: Users, 
    value: 500, 
    suffix: '+',
    key: 'donors',
    gradient: 'from-primary-400 to-primary-600',
    bgLight: 'bg-primary-50',
    textColor: 'text-primary-600',
  },
  { 
    icon: FolderOpen, 
    value: 25, 
    suffix: '+',
    key: 'projects',
    gradient: 'from-secondary-400 to-secondary-600',
    bgLight: 'bg-secondary-50',
    textColor: 'text-secondary-600',
  },
  { 
    icon: Heart, 
    value: 1000, 
    suffix: '+',
    key: 'beneficiaries',
    gradient: 'from-pink-400 to-rose-500',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-600',
  },
  { 
    icon: Banknote, 
    value: 2, 
    suffix: 'M+',
    key: 'funds',
    gradient: 'from-emerald-400 to-teal-500',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Stats() {
  const t = useTranslations('stats');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden bg-white">
      {/* Background Decorations */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-primary-100/50 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-secondary-100/50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={clsx(
          "text-center mb-10 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <span className={clsx(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4",
            isRTL && "font-arabic"
          )}>
            <TrendingUp size={16} className="text-secondary-500" />
            {locale === 'ar' ? 'إنجازاتنا' : 'Our Impact'}
          </span>
          <h2 className={clsx(
            "text-2xl md:text-3xl font-bold text-primary-900 mb-3",
            isRTL && "font-arabic"
          )}>
            {locale === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Numbers That Speak'}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 mx-auto rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.key}
              className={clsx(
                "group relative opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <div className="relative bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-elegant hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2">
                {/* Icon */}
                <div className={clsx(
                  "w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                  stat.gradient
                )}>
                  <stat.icon size={24} className="text-white" />
                </div>

                {/* Value */}
                <div className="text-2xl md:text-3xl font-bold text-primary-900 mb-1">
                  <AnimatedCounter 
                    value={stat.value} 
                    suffix={stat.suffix} 
                    isVisible={isVisible} 
                  />
                </div>

                {/* Label */}
                <div className={clsx(
                  "text-sm text-gray-600 font-medium",
                  isRTL && "font-arabic"
                )}>
                  {t(stat.key)}
                </div>

                {/* Sparkle Effect on Hover */}
                <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Sparkles size={16} className="text-secondary-400 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div 
          className={clsx(
            "mt-10 text-center opacity-0",
            isVisible && "animate-fade-in-up"
          )}
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href={`/${locale}/about`}
            className={clsx(
              "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105",
              isRTL && "flex-row-reverse font-arabic"
            )}
          >
            <span>{locale === 'ar' ? 'اكتشف المزيد' : 'Learn More'}</span>
            <Sparkles size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
