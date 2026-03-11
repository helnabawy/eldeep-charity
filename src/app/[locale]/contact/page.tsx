'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header, Footer, ContactSection } from '@/components/landing';
import clsx from 'clsx';

export default function ContactPage() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className={clsx("text-4xl md:text-5xl font-bold mb-4", isRTL && "font-arabic")}>
              {locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </h1>
            <p className={clsx("text-xl opacity-90", isRTL && "font-arabic")}>
              {locale === 'ar' ? 'نسعد بتواصلكم معنا' : "We'd love to hear from you"}
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
