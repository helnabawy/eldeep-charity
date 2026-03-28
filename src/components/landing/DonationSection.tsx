'use client';

import { Smartphone, Link2, Building2, Copy, Check, Heart, Sparkles, CreditCard, Wallet, ExternalLink, ChevronDown, ChevronUp, ListChecks } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import paymentConfig from '@/config/payment.json';

export default function DonationSection() {
  const t = useTranslations('donate');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  interface BankTransferEntry {
    bankName: { en: string; ar: string };
    accountNumber: string;
    accountName: { en: string; ar: string };
    iban: string;
    swiftCode: string;
  }

  type PaymentMethod =
    | {
        key: 'instapay' | 'vodafoneCash';
        icon: typeof Link2 | typeof Smartphone;
        iconBg: string;
        value: string;
        hasInstructions: true;
      }
    | {
        key: string;
        icon: typeof Building2;
        iconBg: string;
        value: null;
        hasInstructions: boolean;
        bank: BankTransferEntry;
      };

  const bankTransferList: BankTransferEntry[] = paymentConfig.bankTransfer ?? [];

  const paymentMethods: PaymentMethod[] = [
    {
      key: 'instapay',
      icon: Link2,
      iconBg: 'bg-gradient-to-br from-purple-400 to-violet-500',
      value: paymentConfig.instapay.link,
      hasInstructions: true,
    },
    ...bankTransferList.map((bank, index) => ({
      key: `تحويل بنكي`,
      icon: Building2,
      iconBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
      value: null,
      hasInstructions: false,
      bank,
    })),
  ];

  const [copied, setCopied] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState<Record<string, boolean>>({});
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

  const toggleInstructions = (key: string) => {
    setShowInstructions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getBankName = (bank: BankTransferEntry) => {
    return locale === 'ar'
      ? bank.bankName.ar
      : bank.bankName.en;
  };

  const getAccountName = (bank: BankTransferEntry) => {
    return locale === 'ar'
      ? bank.accountName.ar
      : bank.accountName.en;
  };

  const getInstructions = (key: string) => {
    if (key === 'instapay') {
      return locale === 'ar' 
        ? paymentConfig.instapay.instructions.ar 
        : paymentConfig.instapay.instructions.en;
    }
    return [];
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
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paymentMethods.map((method, index) => (
            <div
              key={method.key}
              className={clsx(
                "group relative opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: `${0.2 + index * 0.15}s` }}
            >
              <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col min-h-[380px]">
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
                  {method.key}
                </h3>

                {/* Content */}
                {method.key === 'instapay' && method.value ? (
                  <div className="flex-1 flex flex-col">
                    {/* Instapay Link */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 mb-3 border border-white/10">
                      <code className="text-sm text-white/90 break-all font-mono">
                        {method.value}
                      </code>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mb-3">
                      <button
                        onClick={() => copyToClipboard(method.value!, method.key)}
                        className={clsx(
                          "flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm",
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
                      
                      <a
                        href={method.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-violet-500 text-white text-sm hover:opacity-90 transition-opacity"
                      >
                        <ExternalLink size={16} />
                        <span className={isRTL ? "font-arabic" : ""}>
                          {locale === 'ar' ? 'فتح' : 'Open'}
                        </span>
                      </a>
                    </div>

                    {/* Instructions Toggle */}
                    {method.hasInstructions && (
                      <div className="mt-auto">
                        <button
                          onClick={() => toggleInstructions(method.key)}
                          className={clsx(
                            "w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 text-sm bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10",
                            isRTL && "font-arabic"
                          )}
                        >
                          <ListChecks size={16} />
                          <span>{locale === 'ar' ? 'تعليمات' : 'Instructions'}</span>
                          {showInstructions[method.key] ? (
                            <ChevronUp size={16} className="ml-auto" />
                          ) : (
                            <ChevronDown size={16} className="ml-auto" />
                          )}
                        </button>
                        
                        {/* Instructions List */}
                        {showInstructions[method.key] && (
                          <div className={clsx(
                            "mt-3 p-3 bg-white/5 rounded-xl border border-white/10",
                            isRTL && "font-arabic"
                          )}>
                            <ol className="space-y-2">
                              {getInstructions(method.key).map((instruction, idx) => (
                                <li key={idx} className="text-sm text-white/80 flex items-start gap-2">
                                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-500/30 flex items-center justify-center text-xs text-purple-300">
                                    {idx + 1}
                                  </span>
                                  <span>{instruction}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className={clsx(
                    "flex-1 space-y-3 text-white/80",
                    isRTL && "font-arabic text-right"
                  )}>
                    {'bank' in method && method.bank ? (
                      <>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 size={14} className="text-secondary-400" />
                            <span className="text-xs text-white/60">{t('bankName')}</span>
                          </div>
                          <p className="font-semibold text-sm">{getBankName(method.bank)}</p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <CreditCard size={14} className="text-secondary-400" />
                            <span className="text-xs text-white/60">{t('accountNumber')}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="font-mono font-semibold text-sm">{method.bank.accountNumber}</p>
                            <button
                              onClick={() => copyToClipboard(method.bank.accountNumber, method.key)}
                              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                            >
                              {copied === method.key ? (
                                <Check size={14} className="text-secondary-400" />
                              ) : (
                                <Copy size={14} className="text-white/60" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                          <div className="flex items-center gap-2 mb-1">
                            <Wallet size={14} className="text-secondary-400" />
                            <span className="text-xs text-white/60">{t('accountName')}</span>
                          </div>
                          <p className="font-semibold text-xs">{getAccountName(method.bank)}</p>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-white/70">{t('bankInfo')}</p>
                    )}
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
