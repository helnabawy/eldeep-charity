'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header, Footer } from '@/components/landing';
import { Card, Button, Input, Select } from '@/components/ui';
import { Smartphone, Link2, Building2, Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';

export default function DonatePage() {
  const t = useTranslations('donate');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  const paymentMethods = [
    { key: 'vodafone_cash', value: 'vodafone_cash' },
    { key: 'instapay', value: 'instapay' },
    { key: 'bank_transfer', value: 'bank_transfer' },
  ];

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      donorName: formData.get('name'),
      donorEmail: formData.get('email'),
      donorPhone: formData.get('phone'),
      amount: parseFloat(formData.get('amount') as string),
      paymentMethod: formData.get('paymentMethod'),
      notes: formData.get('notes'),
    };

    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

        {/* Donation Methods */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className={clsx("text-2xl font-bold text-gray-800 mb-8 text-center", isRTL && "font-arabic")}>
              {t('methods.title')}
            </h2>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
              {/* Vodafone Cash */}
              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 text-red-600 rounded-full mb-4">
                  <Smartphone size={32} />
                </div>
                <h3 className={clsx("text-xl font-bold text-gray-800 mb-2", isRTL && "font-arabic")}>
                  {t('methods.vodafoneCash')}
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <code className="text-lg font-bold text-gray-700">01012345678</code>
                </div>
                <button
                  onClick={() => copyToClipboard('01012345678', 'vodafone')}
                  className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 mx-auto"
                >
                  {copied === 'vodafone' ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-sm">
                    {copied === 'vodafone' ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy')}
                  </span>
                </button>
              </Card>

              {/* InstaPay */}
              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 text-purple-600 rounded-full mb-4">
                  <Link2 size={32} />
                </div>
                <h3 className={clsx("text-xl font-bold text-gray-800 mb-2", isRTL && "font-arabic")}>
                  {t('methods.instapay')}
                </h3>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <code className="text-sm text-gray-700 break-all">https://ipn.eg/alddeeb</code>
                </div>
                <button
                  onClick={() => copyToClipboard('https://ipn.eg/alddeeb', 'instapay')}
                  className="flex items-center justify-center gap-2 text-primary-600 hover:text-primary-700 mx-auto"
                >
                  {copied === 'instapay' ? <Check size={16} /> : <Copy size={16} />}
                  <span className="text-sm">
                    {copied === 'instapay' ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy')}
                  </span>
                </button>
              </Card>

              {/* Bank Transfer */}
              <Card className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                  <Building2 size={32} />
                </div>
                <h3 className={clsx("text-xl font-bold text-gray-800 mb-2", isRTL && "font-arabic")}>
                  {t('methods.bankTransfer')}
                </h3>
                <div className={clsx("text-sm text-gray-600 space-y-1", isRTL && "font-arabic text-right")}>
                  <p><strong>{t('bankName')}:</strong> بنك مصر</p>
                  <p><strong>{t('accountNumber')}:</strong> 1234567890</p>
                  <p><strong>{t('accountName')}:</strong> {locale === 'ar' ? 'مؤسسة آل الديب الخيرية' : 'Al Deeb Charity Foundation'}</p>
                </div>
              </Card>
            </div>

            {/* Donation Form */}
            <Card className="max-w-2xl mx-auto p-6">
              <h3 className={clsx("text-xl font-bold text-gray-800 mb-6 text-center", isRTL && "font-arabic")}>
                {t('form.title')}
              </h3>

              {isSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="text-green-600" size={32} />
                  </div>
                  <p className={clsx("text-gray-600", isRTL && "font-arabic")}>
                    {locale === 'ar' ? 'تم تسجيل تبرعك بنجاح. شكراً لك!' : 'Your donation has been recorded. Thank you!'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      label={t('form.name')}
                    />
                    <Input
                      name="phone"
                      type="tel"
                      label={t('form.phone')}
                    />
                  </div>
                  <Input
                    name="email"
                    type="email"
                    label={t('form.email')}
                  />
                  <Input
                    name="amount"
                    type="number"
                    label={t('form.amount')}
                    required
                    min="1"
                  />
                  <Select
                    name="paymentMethod"
                    label={t('form.paymentMethod')}
                    options={paymentMethods.map((m) => ({
                      value: m.value,
                      label: t(`methods.${m.key === 'vodafone_cash' ? 'vodafoneCash' : m.key}`),
                    }))}
                    required
                  />
                  <Input
                    name="notes"
                    label={t('form.notes')}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '...' : t('form.submit')}
                  </Button>
                </form>
              )}
            </Card>

            <p className={clsx("text-center text-gray-600 mt-6", isRTL && "font-arabic")}>
              {t('note')}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
