'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header, Footer, AboutSection } from '@/components/landing';
import clsx from 'clsx';

export default function AboutPage() {
  const t = useTranslations('about');
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
              {t('title')}
            </h1>
            <p className={clsx("text-xl opacity-90", isRTL && "font-arabic")}>
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* About Content */}
        <AboutSection />

        {/* Extended Content */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className={clsx("prose prose-lg max-w-none", isRTL && "prose-rtl font-arabic text-right")}>
                {locale === 'ar' ? (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">تاريخ المؤسسة</h2>
                    <p className="text-gray-600 mb-6">
                      تأسست مؤسسة آل الديب الخيرية بهدف خدمة المجتمع ودعم المحتاجين. نعمل منذ سنوات على تقديم المساعدات
                      للمستحقين من خلال برامج متنوعة تشمل كفالة الأيتام، إطعام المحتاجين، ومساعدة الأسر المعسرة.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">أهدافنا</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>كفالة الأيتام ورعايتهم</li>
                      <li>تقديم المساعدات الغذائية للمحتاجين</li>
                      <li>دعم التعليم للطلاب المحتاجين</li>
                      <li>مساعدة المرضى وتوفير العلاج</li>
                      <li>توزيع كسوة العيد على الأسر المحتاجة</li>
                    </ul>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our History</h2>
                    <p className="text-gray-600 mb-6">
                      Al Deeb Charity Foundation was established to serve the community and support those in need.
                      We have been working for years to provide assistance to deserving recipients through various
                      programs including orphan sponsorship, feeding the needy, and helping struggling families.
                    </p>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Goals</h2>
                    <ul className="list-disc list-inside text-gray-600 space-y-2">
                      <li>Sponsor and care for orphans</li>
                      <li>Provide food assistance to those in need</li>
                      <li>Support education for underprivileged students</li>
                      <li>Help patients access medical treatment</li>
                      <li>Distribute Eid clothing to needy families</li>
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
