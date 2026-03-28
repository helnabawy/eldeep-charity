'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminLayout, StatsCard } from '@/components/admin';
import { Banknote, Clock, FolderOpen, Mail } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface RecentDonation {
  id: string;
  donorName?: string;
  amount: number;
  paymentMethod: string;
  status: 'CONFIRMED' | 'PENDING' | 'FAILED' | string;
  createdAt: string;
}

interface Stats {
  totalDonations: number;
  pendingDonations: number;
  totalProjects: number;
  unreadInquiries: number;
  totalAmount: number;
  recentDonations: RecentDonation[];
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchStats();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
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

  // Mock chart data
  const chartData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 5000 },
    { month: 'Apr', amount: 4500 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 5500 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Total Donations"
            value={stats?.totalDonations || 0}
            icon={<Banknote className="text-primary-600" size={24} />}
            color="bg-primary-100"
          />
          <StatsCard
            title="Pending Donations"
            value={stats?.pendingDonations || 0}
            icon={<Clock className="text-yellow-600" size={24} />}
            color="bg-yellow-100"
          />
          <StatsCard
            title="Total Projects"
            value={stats?.totalProjects || 0}
            icon={<FolderOpen className="text-blue-600" size={24} />}
            color="bg-blue-100"
          />
          <StatsCard
            title="Unread Inquiries"
            value={stats?.unreadInquiries || 0}
            icon={<Mail className="text-red-600" size={24} />}
            color="bg-red-100"
          />
        </div>

        {/* Total Amount */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Total Amount Collected</h2>
          <p className="text-4xl font-bold text-primary-600">
            {stats?.totalAmount?.toLocaleString() || 0} EGP
          </p>
        </div>

        {/* Donation Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Monthly Donations</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#16a34a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Donations */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Donations</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-start py-3 text-gray-600 font-medium">Donor</th>
                  <th className="text-start py-3 text-gray-600 font-medium">Amount</th>
                  <th className="text-start py-3 text-gray-600 font-medium">Method</th>
                  <th className="text-start py-3 text-gray-600 font-medium">Status</th>
                  <th className="text-start py-3 text-gray-600 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentDonations?.map((donation) => (
                  <tr key={donation.id} className="border-b">
                    <td className="py-3">{donation.donorName || 'Anonymous'}</td>
                    <td className="py-3">{donation.amount} EGP</td>
                    <td className="py-3">{donation.paymentMethod}</td>
                    <td className="py-3">
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
                    <td className="py-3">
                      {new Date(donation.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
