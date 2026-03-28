'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header, Footer } from '@/components/landing';
import { Card, Button, Input, Select } from '@/components/ui';
import { Link2, Building2, Copy, Check, ExternalLink, ListChecks, ChevronUp, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useState } from 'react';
import paymentConfig from '@/config/payment.json';

export default function DonatePage() {
  const t = useTranslations('donate');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [showInstructions, setShowInstructions] = useState<Record<string, boolean>>({});

  interface BankTransferEntry {
    bankName: { en: string; ar: string };
    accountNumber: string;
    accountName: { en: string; ar: string };
    iban: string;
    swiftCode: string;
  }

  const bankTransferList: BankTransferEntry[] = paymentConfig.bankTransfer ?? [];

  interface PaymentMethodBase {
    key: string;
    icon: typeof Link2 | typeof Building2;
    iconBg: string;
    value: string | null;
    hasInstructions: boolean;
    bank?: BankTransferEntry;
  }

  const paymentMethods: PaymentMethodBase[] = [
    {
      key: 'instapay',
      icon: Link2,
      iconBg: 'bg-gradient-to-br from-purple-400 to-violet-500',
      value: paymentConfig.instapay.link,
      hasInstructions: true,
    },
    ...bankTransferList.map((bank) => ({
      key: bank.bankName.en,
      icon: Building2,
      iconBg: 'bg-gradient-to-br from-indigo-400 to-blue-500',
      value: null,
      hasInstructions: false,
      bank,
    })),
  ];

  const getBankName = (bank: BankTransferEntry) => (locale === 'ar' ? bank.bankName.ar : bank.bankName.en);
  const getAccountName = (bank: BankTransferEntry) => (locale === 'ar' ? bank.accountName.ar : bank.accountName.en);
  const getInstructions = (key: string) => {
    if (key === 'instapay') {
      return locale === 'ar' ? paymentConfig.instapay.instructions.ar : paymentConfig.instapay.instructions.en;
    }
    return [];
  };

  const toggleInstructions = (key: string) => {
    setShowInstructions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
              {paymentMethods.map((method) => (
                <Card key={method.key} className="p-6 text-center">
                  <div className={clsx("inline-flex items-center justify-center w-16 h-16 rounded-full mb-4", method.iconBg)}>
                    <method.icon size={32} />
                  </div>
                  <h3 className={clsx("text-xl font-bold text-gray-800 mb-2", isRTL && "font-arabic")}>
                    {method.key === 'instapay'
                      ? t('methods.instapay')
                      : method.bank
                      ? getBankName(method.bank)
                      : method.key}
                  </h3>

                  {method.key === 'instapay' && method.value ? (
                    <>
                      <div className="bg-gray-50 rounded-lg p-3 mb-3">
                        <code className="text-sm text-gray-700 break-all">{method.value}</code>
                      </div>
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => copyToClipboard(method.value!, 'instapay')}
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                        >
                          {copied === 'instapay' ? <Check size={16} /> : <Copy size={16} />}
                          <span className="text-sm">{copied === 'instapay' ? (isRTL ? 'تم النسخ!' : 'Copied!') : (isRTL ? 'نسخ' : 'Copy')}</span>
                        </button>
                        <a
                          href={method.value}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-700"
                        >
                          <ExternalLink size={16} />
                          <span className="text-sm">{isRTL ? 'فتح' : 'Open'}</span>
                        </a>
                      </div>
                      <button
                        onClick={() => toggleInstructions('instapay')}
                        className="mt-3 flex items-center justify-center gap-2 text-sm text-primary-700"
                      >
                        <ListChecks size={16} />
                        {isRTL ? 'تعليمات' : 'Instructions'}
                        {showInstructions['instapay'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {showInstructions['instapay'] && (
                        <ul className="mt-2 text-sm text-gray-600 text-left space-y-1">
                          {getInstructions('instapay').map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : method.bank ? (
                    <div className={clsx("text-sm text-gray-600 space-y-1", isRTL && "font-arabic text-right")}> 
                      <p><strong>{t('bankName')}:</strong> {getBankName(method.bank)}</p>
                      <p><strong>{t('accountNumber')}:</strong> {method.bank.accountNumber}</p>
                      <p><strong>{t('accountName')}:</strong> {getAccountName(method.bank)}</p>
                    </div>
                  ) : null}
                </Card>
              ))}
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
                    options={paymentMethods
                      .filter((m): m is (typeof m & { value: string }) => Boolean(m.value))
                      .map((m) => ({
                        value: m.key,
                        label: m.key === 'instapay'
                          ? t('methods.instapay')
                          : t('methods.bankTransfer'),
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
