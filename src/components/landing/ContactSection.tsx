'use client';

import { useTranslations, useLocale } from 'next-intl';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

export default function ContactSection() {
  const t = useTranslations('contact');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: t('info.address'),
      value: locale === 'ar' ? 'شارع المستشفي ، المقدام، الدقهلية ' : 'Mosque Street, Matareya, Cairo, Egypt',
      gradient: 'from-primary-400 to-primary-500',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+20 101 234 5678',
      href: 'tel:+201012345678',
      gradient: 'from-secondary-400 to-secondary-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'info@aldeebcharity.org',
      href: 'mailto:info@aldeebcharity.org',
      gradient: 'from-blue-400 to-indigo-500',
    },
    {
      icon: Clock,
      label: locale === 'ar' ? 'ساعات العمل' : 'Working Hours',
      value: locale === 'ar' ? 'السبت - الخميس: 9 ص - 5 م' : 'Sat - Thu: 9 AM - 5 PM',
      gradient: 'from-purple-400 to-violet-500',
    },
  ];

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden" id="contact">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-primary-50/30 to-white" />
      <div className="absolute top-20 right-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={clsx(
          "text-center max-w-3xl mx-auto mb-16 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <span className={clsx(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-6",
            isRTL && "font-arabic"
          )}>
            <MessageCircle size={16} className="text-secondary-500" />
            {locale === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
          </span>
          <h2 className={clsx(
            "text-3xl md:text-4xl lg:text-5xl font-bold mb-6",
            isRTL ? "font-arabic text-primary-900" : "text-primary-900"
          )}>
            {t('title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 via-secondary-400 to-primary-500 mx-auto rounded-full mb-6" />
          <p className={clsx(
            "text-lg text-gray-600 leading-relaxed",
            isRTL && "font-arabic"
          )}>
            {t('subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div 
            className={clsx(
              "opacity-0",
              isVisible && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.2s' }}
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-elegant hover:shadow-elegant-lg transition-all duration-500">
              {/* Decorative Element */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-bl-[100px] rounded-tr-3xl opacity-50" />
              
              <div className="relative z-10">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                      <CheckCircle className="text-primary-600" size={40} />
                    </div>
                    <h3 className={clsx("text-2xl font-bold text-primary-900 mb-4", isRTL && "font-arabic")}>
                      {locale === 'ar' ? 'تم الإرسال بنجاح!' : 'Message Sent!'}
                    </h3>
                    <p className={clsx("text-gray-600", isRTL && "font-arabic")}>
                      {t('success')}
                    </p>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-6 px-6 py-3 bg-primary-100 text-primary-700 rounded-xl hover:bg-primary-200 transition-colors"
                    >
                      {locale === 'ar' ? 'إرسال رسالة أخرى' : 'Send Another Message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={clsx("text-sm font-medium text-gray-700", isRTL && "font-arabic")}>
                          {t('form.name')} *
                        </label>
                        <input
                          name="name"
                          required
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-300",
                            isRTL && "font-arabic text-right"
                          )}
                          placeholder={locale === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={clsx("text-sm font-medium text-gray-700", isRTL && "font-arabic")}>
                          {t('form.email')} *
                        </label>
                        <input
                          name="email"
                          type="email"
                          required
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-300",
                            isRTL && "font-arabic text-right"
                          )}
                          placeholder={locale === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={clsx("text-sm font-medium text-gray-700", isRTL && "font-arabic")}>
                          {t('form.phone')}
                        </label>
                        <input
                          name="phone"
                          type="tel"
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-300",
                            isRTL && "font-arabic text-right"
                          )}
                          placeholder={locale === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone'}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className={clsx("text-sm font-medium text-gray-700", isRTL && "font-arabic")}>
                          {t('form.subject')} *
                        </label>
                        <input
                          name="subject"
                          required
                          className={clsx(
                            "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-300",
                            isRTL && "font-arabic text-right"
                          )}
                          placeholder={locale === 'ar' ? 'موضوع الرسالة' : 'Message subject'}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className={clsx("text-sm font-medium text-gray-700", isRTL && "font-arabic")}>
                        {t('form.message')} *
                      </label>
                      <textarea
                        name="message"
                        rows={5}
                        required
                        className={clsx(
                          "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 transition-all duration-300 resize-none",
                          isRTL && "font-arabic text-right"
                        )}
                        placeholder={locale === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...'}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={clsx(
                        "w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100",
                        isRTL && "flex-row-reverse font-arabic"
                      )}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>{locale === 'ar' ? 'جاري الإرسال...' : 'Sending...'}</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>{t('form.submit')}</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Contact Info & Map */}
          <div className="space-y-6">
            {/* Contact Info Cards */}
            <div 
              className={clsx(
                "grid grid-cols-2 gap-4 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: '0.3s' }}
            >
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-5 shadow-elegant hover:shadow-elegant-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={clsx(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-3 bg-gradient-to-br",
                    info.gradient
                  )}>
                    <info.icon size={22} className="text-white" />
                  </div>
                  <h4 className={clsx("text-sm font-medium text-gray-500 mb-1", isRTL && "font-arabic")}>
                    {info.label}
                  </h4>
                  {info.href ? (
                    <a 
                      href={info.href}
                      className="text-gray-800 font-semibold hover:text-primary-600 transition-colors text-sm"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className={clsx("text-gray-800 font-semibold text-sm", isRTL && "font-arabic")}>
                      {info.value}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Google Map */}
            <div 
              className={clsx(
                "relative overflow-hidden rounded-3xl shadow-elegant opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 pointer-events-none z-10" />
             
             <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1057.9733445733225!2d31.355439490928735!3d30.675901108128276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7edd54bf31205%3A0x314277db32816bb8!2z2YXYs9is2K8g2KfZhNi02YfZitivINir2KfYqNiq!5e1!3m2!1sen!2seg!4v1774723191524!5m2!1sen!2seg" width="100%"
                height="280"
                style={{ border: 0 }}
                allowFullScreen loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>

            {/* Quick Contact CTA */}
            <div 
              className={clsx(
                "relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl p-6 shadow-glow-sm opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: '0.6s' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h4 className={clsx("text-white font-bold text-lg mb-1", isRTL && "font-arabic")}>
                    {locale === 'ar' ? 'هل تحتاج مساعدة؟' : 'Need Help?'}
                  </h4>
                  <p className={clsx("text-primary-100 text-sm", isRTL && "font-arabic")}>
                    {locale === 'ar' ? 'تواصل معنا مباشرة' : 'Contact us directly'}
                  </p>
                </div>
                <a
                  href="tel:+201012345678"
                  className="flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-primary-50 transition-colors"
                >
                  <Phone size={18} />
                  <span>{locale === 'ar' ? 'اتصل الآن' : 'Call Now'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

