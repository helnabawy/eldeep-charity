'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Target, Eye, Heart, Sparkles, Shield, Users } from 'lucide-react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function AboutSection() {
  const t = useTranslations('about');
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const values = [
    { key: 'transparency', icon: Shield },
    { key: 'credibility', icon: Sparkles },
    { key: 'commitment', icon: Sparkles },
    { key: 'cooperation', icon: Users },
  ];

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="about">
      {/* Background Decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="absolute top-20 left-0 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={clsx(
          "text-center max-w-3xl mx-auto mb-12 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <span className={clsx(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4",
            isRTL && "font-arabic"
          )}>
            <Sparkles size={16} className="text-secondary-500" />
            {locale === 'ar' ? 'تعرف علينا' : 'About Us'}
          </span>
          <h2 className={clsx(
            "text-2xl md:text-3xl lg:text-4xl font-bold mb-4",
            isRTL ? "font-arabic text-primary-900" : "text-primary-900"
          )}>
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 mx-auto rounded-full mb-4" />
          <p className={clsx(
            "text-base text-gray-600 leading-relaxed",
            isRTL && "font-arabic"
          )}>
            {t('subtitle')}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Mission Card */}
          <div 
            className={clsx(
              "group relative opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative bg-white rounded-2xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target size={28} className="text-primary-600" />
              </div>
              {/* Content */}
              <h3 className={clsx(
                "text-lg font-bold text-primary-900 mb-3",
                isRTL && "font-arabic"
              )}>
                {t('mission.title')}
              </h3>
              <p className={clsx(
                "text-sm text-gray-600 leading-relaxed",
                isRTL && "font-arabic"
              )}>
                {t('mission.description')}
              </p>
            </div>
          </div>

          {/* Vision Card */}
          <div 
            className={clsx(
              "group relative opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-2xl transform -rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative bg-white rounded-2xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Eye size={28} className="text-secondary-600" />
              </div>
              {/* Content */}
              <h3 className={clsx(
                "text-lg font-bold text-primary-900 mb-3",
                isRTL && "font-arabic"
              )}>
                {t('vision.title')}
              </h3>
              <p className={clsx(
                "text-sm text-gray-600 leading-relaxed",
                isRTL && "font-arabic"
              )}>
                {t('vision.description')}
              </p>
            </div>
          </div>

          {/* Values Card */}
          <div 
            className={clsx(
              "group relative md:row-span-1 opacity-0",
              isVisible && "animate-fade-in-up",
              isRTL ? "text-right" : "text-left"
            )}
            style={{ animationDelay: '0.4s' }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-secondary-400 rounded-2xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative bg-white rounded-2xl p-6 shadow-elegant hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2 h-full">
              {/* Icon */}
              <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-red-200 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart size={28} className="text-red-500" />
              </div>
              {/* Content */}
              <h3 className={clsx(
                "text-lg font-bold text-primary-900 mb-4",
                isRTL ? "font-arabic text-right" : "text-left"
              )}>
                {t('values.title')}
              </h3>
              <ul className={clsx("space-y-3", isRTL ? "text-right" : "text-left")} dir={isRTL ? "rtl" : "ltr"}>
                {values.map((value, index) => (
                  <li 
                    key={value.key} 
                    className={clsx(
                      "flex items-start gap-2 group/item",
                      isRTL ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={clsx("w-7 h-7 bg-primary-100 rounded-lg flex items-center justify-center shrink-0 group-hover/item:bg-primary-200 transition-colors duration-300", isRTL ? "order-2" : "order-1")}>
                      <value.icon size={14} className="text-primary-600" />
                    </div>
                    <div className={clsx(isRTL ? "text-right order-1" : "text-left order-2", isRTL && "font-arabic") }>
                      <span className="block font-semibold text-primary-800 text-sm">
                        {t(`values.${value.key}`)}:
                      </span>
                      <span className={clsx("block text-gray-600 text-sm", isRTL ? "mr-0 ml-1" : "mr-1")}>
                        {t(`values.${value.key}Desc`)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
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
              isRTL && "font-arabic flex-row-reverse"
            )}
          >
            {locale === 'ar' ? 'اقرأ المزيد عنا' : 'Learn More About Us'}
            <Sparkles size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
