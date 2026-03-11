'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin';
import { Button } from '@/components/ui';
import { Check, X, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

interface Donation {
  id: string;
  donorName: string | null;
  donorEmail: string | null;
  donorPhone: string | null;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  notes: string | null;
  createdAt: string;
  project: { titleEn: string; titleAr: string } | null;
}

export default function DonationsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchDonations();
    }
  }, [session]);

  const fetchDonations = async () => {
    try {
      const response = await fetch('/api/donations');
      const data = await response.json();
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await fetch(`/api/donations/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      fetchDonations();
    } catch (error) {
      console.error('Error updating donation:', error);
    }
  };

  const exportToExcel = () => {
    const data = donations.map((d) => ({
      Donor: d.donorName || 'Anonymous',
      Email: d.donorEmail || '',
      Phone: d.donorPhone || '',
      Amount: d.amount,
      Currency: d.currency,
      'Payment Method': d.paymentMethod,
      Status: d.status,
      Date: new Date(d.createdAt).toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Donations');
    XLSX.writeFile(wb, 'donations.xlsx');
  };

  const filteredDonations = filter === 'all'
    ? donations
    : donations.filter((d) => d.status === filter);

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Donations</h1>
          <Button onClick={exportToExcel} variant="outline">
            <Download size={16} className="me-2" />
            Export to Excel
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {['all', 'PENDING', 'CONFIRMED', 'REJECTED'].map((status) => (
            <Button
              key={status}
              variant={filter === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status === 'all' ? 'All' : status}
            </Button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Donor</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Amount</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Method</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Status</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Date</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation) => (
                  <tr key={donation.id} className="border-t">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{donation.donorName || 'Anonymous'}</p>
                        <p className="text-sm text-gray-500">{donation.donorEmail}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium">
                      {donation.amount.toLocaleString()} {donation.currency}
                    </td>
                    <td className="py-4 px-6">{donation.paymentMethod}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          donation.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-700'
                            : donation.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      {donation.status === 'PENDING' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => updateStatus(donation.id, 'CONFIRMED')}
                          >
                            <Check size={14} />
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => updateStatus(donation.id, 'REJECTED')}
                          >
                            <X size={14} />
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDonations.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No donations found
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
