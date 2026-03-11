'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin';
import { Button, Input } from '@/components/ui';
import { Save } from 'lucide-react';

interface Settings {
  site_name_ar: string;
  site_name_en: string;
  site_description_ar: string;
  site_description_en: string;
  vodafone_cash: string;
  instapay_link: string;
  address_ar: string;
  address_en: string;
  phone: string;
  email: string;
  facebook: string;
  whatsapp: string;
}

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<Settings>({
    site_name_ar: '',
    site_name_en: '',
    site_description_ar: '',
    site_description_en: '',
    vodafone_cash: '',
    instapay_link: '',
    address_ar: '',
    address_en: '',
    phone: '',
    email: '',
    facebook: '',
    whatsapp: '',
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchSettings();
    }
  }, [session]);

  const fetchSettings = async () => {
    try {
      // For now, use default values
      // In a real app, you would fetch from the database
      setSettings({
        site_name_ar: 'مؤسسة آل الديب الخيرية',
        site_name_en: 'Al Deeb Charity Foundation',
        site_description_ar: 'مؤسسة خيرية تسعى لخدمة المجتمع ودعم المحتاجين',
        site_description_en: 'A charitable foundation serving the community and supporting those in need',
        vodafone_cash: '01012345678',
        instapay_link: 'https://ipn.eg/alddeeb',
        address_ar: 'شارع المستشفي ، المقدام، الدقهلية ',
        address_en: 'Mosque Street, Matareya, Cairo, Egypt',
        phone: '+201012345678',
        email: 'info@aldeebcharity.org',
        facebook: 'https://facebook.com/aldeebcharity',
        whatsapp: '+201012345678',
      });
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, you would save to the database
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>

        {/* Site Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Site Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Site Name (Arabic)"
              value={settings.site_name_ar}
              onChange={(e) =>
                setSettings({ ...settings, site_name_ar: e.target.value })
              }
            />
            <Input
              label="Site Name (English)"
              value={settings.site_name_en}
              onChange={(e) =>
                setSettings({ ...settings, site_name_en: e.target.value })
              }
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (Arabic)
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-arabic"
                rows={3}
                value={settings.site_description_ar}
                onChange={(e) =>
                  setSettings({ ...settings, site_description_ar: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description (English)
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={3}
                value={settings.site_description_en}
                onChange={(e) =>
                  setSettings({ ...settings, site_description_en: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Vodafone Cash Number"
              value={settings.vodafone_cash}
              onChange={(e) =>
                setSettings({ ...settings, vodafone_cash: e.target.value })
              }
            />
            <Input
              label="InstaPay Link"
              value={settings.instapay_link}
              onChange={(e) =>
                setSettings({ ...settings, instapay_link: e.target.value })
              }
            />
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Address (Arabic)"
              value={settings.address_ar}
              onChange={(e) =>
                setSettings({ ...settings, address_ar: e.target.value })
              }
            />
            <Input
              label="Address (English)"
              value={settings.address_en}
              onChange={(e) =>
                setSettings({ ...settings, address_en: e.target.value })
              }
            />
            <Input
              label="Phone"
              value={settings.phone}
              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
            />
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Social Media</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Facebook"
              value={settings.facebook}
              onChange={(e) =>
                setSettings({ ...settings, facebook: e.target.value })
              }
            />
            <Input
              label="WhatsApp"
              value={settings.whatsapp}
              onChange={(e) =>
                setSettings({ ...settings, whatsapp: e.target.value })
              }
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save size={18} className="me-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
