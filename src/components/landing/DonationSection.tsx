'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Smartphone, Link2, Building2, Copy, Check, Heart, Sparkles, CreditCard, Wallet } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

const paymentMethods = [
  {
    key: 'vodafoneCash',
    icon: Smartphone,
    iconBg: 'bg-gradient-to-br from-red-400 to-rose-500',
    value: '01012345678',
  },
  {
    key: 'instapay',
    icon: Link2,
    iconBg: 'bg-gradient-to-br from-purple-400 to-violet-500',
    value: 'https://ipn.eg/alddeeb',
  },
  {
    key: 'bankTransfer',
    icon: Building2,
    iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    value: null,
  },
];

export default function DonationSection() {
  const t = useTranslations('donate');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [copied, setCopied] = useState<string | null>(null);
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

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="donate">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("/pattern.svg")', backgroundSize: '40px' }} />
        <div className="absolute top-0 left-0 w-72 h-72 bg-secondary-400/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={clsx(
          "text-center max-w-3xl mx-auto mb-10 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <span className={clsx(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-secondary-200 text-sm font-medium mb-6",
            isRTL && "font-arabic"
          )}>
            <Heart size={16} className="text-secondary-400" />
            <span className="text-secondary-200">
              {locale === 'ar' ? 'ساهم معنا' : 'Support Us'}
            </span>
          </span>
          <h2 className={clsx(
            "text-2xl md:text-3xl font-bold mb-4 text-white",
            isRTL && "font-arabic"
          )}>
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-secondary-400 to-transparent mx-auto rounded-full mb-4" />
          <p className={clsx(
            "text-base text-primary-100/80 leading-relaxed",
            isRTL && "font-arabic"
          )}>
            {t('subtitle')}
          </p>
        </div>

        {/* Payment Methods */}
        <div
          className={clsx(
            "max-w-5xl mx-auto",
            isRTL
              ? "flex flex-row-reverse gap-6 overflow-x-auto py-4" // RTL: side-by-side, scrollable
              : "grid md:grid-cols-3 gap-6"
          )}
        >
          {paymentMethods.map((method, index) => (
            <div
              key={method.key}
              className={clsx(
                "group relative opacity-0",
                isVisible && "animate-fade-in-up",
                isRTL && "flex-shrink-0 min-w-[250px]" // keep a reasonable width
              )}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
                {/* Decorative Corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-3xl rounded-tr-3xl" />
                
                {/* Icon */}
                <div className={clsx(
                  "w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br shadow-lg group-hover:scale-110 transition-transform duration-300",
                  method.iconBg
                )}>
                  <method.icon size={24} className="text-white" />
                </div>

                {/* Title */}
                <h3 className={clsx(
                  "text-base font-bold text-white mb-3",
                  isRTL && "font-arabic"
                )}>
                  {t(`methods.${method.key}`)}
                </h3>

                {/* Content */}
                {method.value ? (
                  <div className="flex-1 flex flex-col">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/10">
                      <code className="text-sm text-white/90 break-all font-mono">
                        {method.value}
                      </code>
                    </div>
                    <button
                      onClick={() => copyToClipboard(method.value!, method.key)}
                      className={clsx(
                        "flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 mt-auto text-sm",
                        copied === method.key 
                          ? "bg-secondary-400 text-primary-900" 
                          : "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                      )}
                    >
                      {copied === method.key ? (
                        <>
                          <Check size={16} />
                          <span className={isRTL ? "font-arabic" : ""}>
                            {locale === 'ar' ? 'تم النسخ!' : 'Copied!'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          <span className={isRTL ? "font-arabic" : ""}>
                            {locale === 'ar' ? 'نسخ' : 'Copy'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className={clsx(
                    "flex-1 space-y-3 text-white/80",
                    isRTL && "font-arabic text-right"
                  )}>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Building2 size={14} className="text-secondary-400" />
                        <span className="text-xs text-white/60">{t('bankName')}</span>
                      </div>
                      <p className="font-semibold text-sm">{locale === 'ar' ? 'بنك مصر' : 'Bank of Egypt'}</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <CreditCard size={14} className="text-secondary-400" />
                        <span className="text-xs text-white/60">{t('accountNumber')}</span>
                      </div>
                      <p className="font-mono font-semibold text-sm">1234567890</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                      <div className="flex items-center gap-2 mb-1">
                        <Wallet size={14} className="text-secondary-400" />
                        <span className="text-xs text-white/60">{t('accountName')}</span>
                      </div>
                      <p className="font-semibold text-xs">
                        {locale === 'ar' ? 'مؤسسة آل الديب الخيرية' : 'Al Deeb Charity Foundation'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className={clsx(
          "mt-8 text-center opacity-0",
          isVisible && "animate-fade-in-up"
        )}
          style={{ animationDelay: '0.6s' }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl">
            <Sparkles size={16} className="text-secondary-400" />
            <p className={clsx("text-sm text-primary-100/90", isRTL && "font-arabic")}>
              {t('note')}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className={clsx(
          "mt-6 text-center opacity-0",
          isVisible && "animate-fade-in-up"
        )}
          style={{ animationDelay: '0.8s' }}
        >
          <a
            href={`/${locale}/donate`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary-400 to-secondary-500 text-primary-900 font-bold rounded-full shadow-gold-glow-md hover:shadow-gold-glow-lg transition-all duration-300 hover:scale-105"
          >
            <Heart size={16} />
            <span className={isRTL ? "font-arabic" : ""}>
              {locale === 'ar' ? 'تبرع الآن' : 'Donate Now'}
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
