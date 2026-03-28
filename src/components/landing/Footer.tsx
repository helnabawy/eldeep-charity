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

      <div className="container mx-auto px-4 pt-16 pb-8 relative z-10">
        <div className={clsx("grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12", isRTL && "lg:grid-flow-col-dense")}>
          {/* Brand Section */}
          <div className={clsx("lg:col-span-1", isRTL && "lg:col-start-4")}>
            <Link href={`/${locale}`} className={clsx("flex items-center gap-3 mb-6 group", isRTL && "flex-row-reverse")}>
              <div className="relative w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center shadow-glow-sm group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-white" />
                <div className={clsx("absolute -bottom-1 w-5 h-5 bg-secondary-400 rounded-full flex items-center justify-center shadow-gold-glow-sm", isRTL ? "-left-1" : "-right-1")}>
                  <span className="text-primary-900 font-bold text-xs">أ</span>
                </div>
              </div>
              <div className={clsx(isRTL && "text-right")}>
                <span className={clsx("font-bold text-xl block", isRTL && "font-arabic")}>
                  {locale === 'ar' ? 'آل الديب' : 'Al Deeb'}
                </span>
                <span className={clsx("text-sm text-primary-300", isRTL && "font-arabic")}>
                  {locale === 'ar' ? 'للأعمال الخيرية' : 'Charity'}
                </span>
              </div>
            </Link>
            <p className={clsx("text-primary-200/80 leading-relaxed mb-6", isRTL && "font-arabic text-right")}>
              {t('description')}
            </p>
            {/* Social Links */}
            <div className={clsx("flex gap-3", isRTL && "flex-row-reverse justify-end")}>
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
          <div className={clsx(isRTL && "lg:col-start-3")}>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic flex-row-reverse justify-end")}>
              {t('quickLinks')}
              <span className={clsx("w-8 h-0.5 rounded-full", isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r", "from-secondary-400 to-transparent")} />
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link, index) => (
                <li key={link.href} style={{ animationDelay: `${index * 0.1}s` }}>
                  <Link
                    href={`/${locale}${link.href === '/' ? '' : link.href}`}
                    className={clsx(
                      "text-primary-200/80 hover:text-secondary-300 transition-all duration-300 flex items-center gap-2 group",
                      isRTL && "font-arabic flex-row-reverse justify-end"
                    )}
                  >
                    <span className={clsx(
                      "w-1.5 h-1.5 bg-secondary-400/50 rounded-full transition-all duration-300 group-hover:bg-secondary-400 group-hover:scale-150",
                      isRTL ? "order-first" : "order-last"
                    )} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={clsx(isRTL && "lg:col-start-2")}>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic flex-row-reverse justify-end")}>
              {t('contactUs')}
              <span className={clsx("w-8 h-0.5 rounded-full", isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r", "from-secondary-400 to-transparent")} />
            </h3>
            <ul className="space-y-4">
              <li className={clsx("flex items-start gap-3 text-primary-200/80", isRTL && "flex-row-reverse justify-end")}>
                <span className={clsx(isRTL && "font-arabic text-right")}>
                  {locale === 'ar' ? ' الدقهلية ميت غمر كفر المقدام  ' : 'Matareya, Cairo, Egypt'}
                </span>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-secondary-400" />
                </div>
              </li>
              <li className={clsx("flex items-center gap-3 text-primary-200/80", isRTL && "flex-row-reverse justify-end")}>
                <a href="tel:+201012345678" className="hover:text-secondary-300 transition-colors">
                  +20 101 234 5678
                </a>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-secondary-400" />
                </div>
              </li>
              <li className={clsx("flex items-center gap-3 text-primary-200/80", isRTL && "flex-row-reverse justify-end")}>
                <a href="mailto:info@aldeebcharity.org" className="hover:text-secondary-300 transition-colors">
                  info@aldeebcharity.org
                </a>
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-secondary-400" />
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={clsx(isRTL && "lg:col-start-1")}>
            <h3 className={clsx("text-lg font-bold mb-6 flex items-center gap-2", isRTL && "font-arabic flex-row-reverse justify-end")}>
              {locale === 'ar' ? 'النشرة البريدية' : 'Newsletter'}
              <span className={clsx("w-8 h-0.5 rounded-full", isRTL ? "bg-gradient-to-l" : "bg-gradient-to-r", "from-secondary-400 to-transparent")} />
            </h3>
            <p className={clsx("text-primary-200/80 mb-4", isRTL && "font-arabic text-right")}>
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
                className={clsx("w-full bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold py-3 rounded-xl shadow-gold-glow-sm hover:shadow-gold-glow-md transition-all duration-300 hover:scale-[1.02]", isRTL && "font-arabic")}
              >
                {locale === 'ar' ? 'اشترك الآن' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Section */}
        <div className={clsx("flex flex-col md:flex-row items-center justify-between gap-4", isRTL && "md:flex-row-reverse")}>
          <p className={clsx("text-primary-300/60 text-sm", isRTL && "font-arabic")}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className={clsx("flex items-center gap-6 text-sm text-primary-300/60", isRTL && "flex-row-reverse")}>
            <Link href={`/${locale}/privacy`} className={clsx("hover:text-secondary-300 transition-colors", isRTL && "font-arabic")}>
              {locale === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </Link>
            <Link href={`/${locale}/terms`} className={clsx("hover:text-secondary-300 transition-colors", isRTL && "font-arabic")}>
              {locale === 'ar' ? 'الشروط والأحكام' : 'Terms of Service'}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={clsx(
          "fixed bottom-8 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-glow-md transition-all duration-500 hover:scale-110 hover:shadow-glow-lg z-50",
          isRTL ? "left-8" : "right-8",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} className="text-white" />
      </button>
    </footer>
  );
}
