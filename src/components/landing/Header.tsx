'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useState, useEffect } from 'react';
import { Menu, X, Globe, Heart } from 'lucide-react';
import clsx from 'clsx';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/projects', label: t('projects') },
    { href: '/donate', label: t('donate') },
    { href: '/contact', label: t('contact') },
  ];

  const otherLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <header 
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled 
          ? "bg-white/95 backdrop-blur-lg shadow-elegant py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href={`/${locale}`} 
            className="flex items-center gap-3 group"
          >
            <div className={clsx(
              "relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
              isScrolled 
                ? "bg-gradient-to-br from-primary-500 to-primary-700 shadow-glow-sm" 
                : "bg-white/20 backdrop-blur-sm border border-white/30"
            )}>
              <Heart className={clsx(
                "w-6 h-6 transition-colors",
                isScrolled ? "text-white" : "text-secondary-300"
              )} />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary-400 rounded-full flex items-center justify-center">
                <span className="text-primary-900 font-bold text-xs">أ</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className={clsx(
                "font-bold text-lg transition-colors",
                isScrolled ? "text-primary-900" : "text-white",
                isRTL && "font-arabic"
              )}>
                {locale === 'ar' ? 'آل الديب' : 'Al Deeb'}
              </span>
              <span className={clsx(
                "text-xs transition-colors",
                isScrolled ? "text-primary-600" : "text-primary-100",
                isRTL && "font-arabic"
              )}>
                {locale === 'ar' ? 'للأعمال الخيرية' : 'Charity'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className={clsx(
                  "relative px-4 py-2 font-medium transition-all duration-300 rounded-full",
                  isScrolled 
                    ? "text-primary-700 hover:text-primary-600 hover:bg-primary-50" 
                    : "text-white/90 hover:text-white hover:bg-white/10",
                  isRTL && "font-arabic"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Switcher & CTA */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <Link
              href={`/${otherLocale}`}
              className={clsx(
                "flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300",
                isScrolled 
                  ? "text-primary-600 hover:bg-primary-50 border border-primary-200" 
                  : "text-white/90 hover:text-white hover:bg-white/10 border border-white/20"
              )}
            >
              <Globe size={16} />
              <span className="text-sm font-medium">
                {locale === 'ar' ? 'EN' : 'ع'}
              </span>
            </Link>

            {/* Donate Button - Desktop */}
            <Link href={`/${locale}/donate`} className="hidden md:block">
              <button className="relative overflow-hidden bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold px-6 py-2.5 rounded-full shadow-gold-glow-sm hover:shadow-gold-glow-md transition-all duration-300 hover:scale-105">
                <span className="relative z-10">{t('donate')}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary-300 to-secondary-400 opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className={clsx(
                "md:hidden p-2 rounded-xl transition-all duration-300",
                isScrolled 
                  ? "text-primary-700 hover:bg-primary-50" 
                  : "text-white hover:bg-white/10"
              )}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={clsx(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
            isMenuOpen ? "max-h-[400px] opacity-100 mt-4" : "max-h-0 opacity-0"
          )}
        >
          <nav className={clsx(
            "py-4 px-2 rounded-2xl",
            isScrolled 
              ? "bg-primary-50 border border-primary-100" 
              : "bg-white/10 backdrop-blur-lg border border-white/20"
          )}>
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={`/${locale}${link.href === '/' ? '' : link.href}`}
                className={clsx(
                  "block px-4 py-3 rounded-xl transition-all duration-300",
                  isScrolled 
                    ? "text-primary-700 hover:text-primary-600 hover:bg-white" 
                    : "text-white/90 hover:text-white hover:bg-white/10",
                  isRTL && "font-arabic"
                )}
                onClick={() => setIsMenuOpen(false)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.label}
              </Link>
            ))}
            {/* Mobile Donate Button */}
            <div className="px-4 pt-4 mt-2 border-t border-white/10">
              <Link 
                href={`/${locale}/donate`} 
                onClick={() => setIsMenuOpen(false)}
                className="block"
              >
                <button className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold py-3 rounded-xl shadow-gold-glow-sm hover:shadow-gold-glow-md transition-all duration-300">
                  {t('donate')}
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
