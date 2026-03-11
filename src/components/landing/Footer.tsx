'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Twitter, Instagram, Youtube, Heart, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/projects', label: tNav('projects') },
    { href: '/donate', label: tNav('donate') },
    { href: '/contact', label: tNav('contact') },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/aldeebcharity', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, href: 'https://twitter.com/aldeebcharity', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, href: 'https://instagram.com/aldeebcharity', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, href: 'https://youtube.com/aldeebcharity', label: 'Youtube', color: 'hover:bg-red-600' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-secondary-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-400/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-secondary-500/5 to-transparent rounded-full" />
      </div>

      {/* Top Wave */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 pt-24 pb-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href={`/${locale}`} className="flex items-center gap-3 mb-6 group">
              <div className="relative w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary-400 rounded-full flex items-center justify-center shadow-gold-glow-sm">
                  <span className="text-primary-900 font-bold text-xs">أ</span>
                </div>
              </div>
              <div>
                <span className={clsx("font-bold text-xl block", isRTL && "font-arabic")}>
                  {locale === 'ar' ? 'آل الديب' : 'Al Deeb'}
                </span>
                <span className={clsx("text-sm text-primary-300", isRTL && "font-arabic")}>
                  {locale === 'ar' ? 'للأعمال الخيرية' : 'Charity'}
                </span>
              </div>
            </Link>
            <p className={clsx("text-primary-200/80 leading-relaxed mb-6", isRTL && "font-arabic")}>
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={clsx(
                    "w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic")}>
              <span className="w-8 h-0.5 bg-gradient-to-r from-secondary-400 to-transparent rounded-full" />
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={link.href} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className={clsx(
                      "text-primary-200/80 hover:text-secondary-300 transition-all duration-300 flex items-center gap-2 group",
                      isRTL && "font-arabic flex-row-reverse"
                    )}
                  >
                    <span className={clsx(
                      "w-1.5 h-1.5 bg-secondary-400/50 rounded-full transition-all duration-300 group-hover:bg-secondary-400 group-hover:scale-150",
                      isRTL && "order-last"
                    )} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic")}>
              <span className="w-8 h-0.5 bg-gradient-to-r from-secondary-400 to-transparent rounded-full" />
              {t('contactUs')}
            </h3>
            <ul className="space-y-4">
              <li className={clsx("flex items-start gap-3 text-primary-200/80", isRTL && "flex-row-reverse")}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-secondary-400" />
                </div>
                <span className={clsx(isRTL && "font-arabic text-right")}>
                  {locale === 'ar' ? 'المطرية، القاهرة، مصر' : 'Matareya, Cairo, Egypt'}
                </span>
              </li>
              <li className={clsx("flex items-center gap-3 text-primary-200/80", isRTL && "flex-row-reverse")}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-secondary-400" />
                </div>
                <a href="tel:+201012345678" className="hover:text-secondary-300 transition-colors">
                  +20 101 234 5678
                </a>
              </li>
              <li className={clsx("flex items-center gap-3 text-primary-200/80", isRTL && "flex-row-reverse")}>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-secondary-400" />
                </div>
                <a href="mailto:info@aldeebcharity.org" className="hover:text-secondary-300 transition-colors">
                  info@aldeebcharity.org
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic")}>
              <span className="w-8 h-0.5 bg-gradient-to-r from-secondary-400 to-transparent rounded-full" />
              {locale === 'ar' ? 'النشرة البريدية' : 'Newsletter'}
            </h3>
            <p className={clsx("text-primary-200/80 mb-4", isRTL && "font-arabic")}>
              {locale === 'ar' ? 'اشترك ليصلك كل جديد' : 'Subscribe to get updates'}
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder={locale === 'ar' ? 'بريدك الإلكتروني' : 'Your email'}
                  className={clsx(
                    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-primary-300/50 focus:outline-none focus:border-secondary-400/50 focus:bg-white/10 transition-all duration-300",
                    isRTL && "font-arabic text-right"
                  )}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold py-3 rounded-xl shadow-gold-glow-sm hover:shadow-gold-glow-md transition-all duration-300 hover:scale-[1.02]"
              >
                {locale === 'ar' ? 'اشترك الآن' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={clsx("text-primary-300/60 text-sm", isRTL && "font-arabic")}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className="flex items-center gap-6 text-sm text-primary-300/60">
            <Link href={`/${locale}/privacy`} className="hover:text-secondary-300 transition-colors">
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-secondary-300 transition-colors">
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={clsx(
          "fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-glow-md transition-all duration-500 hover:scale-110 hover:shadow-glow-lg z-50",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="text-white" />
      </button>
    </footer>
  );
}
