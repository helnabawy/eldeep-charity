'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminLayout } from '@/components/admin';
import { Button } from '@/components/ui';
import { Eye, X, Send } from 'lucide-react';
interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  reply: string | null;
  createdAt: string;
}

export default function InquiriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [reply, setReply] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session) {
      fetchInquiries();
    }
  }, [session]);

  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/inquiries');
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true }),
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error marking inquiry as read:', error);
    }
  };

  const sendReply = async () => {
    if (!selectedInquiry || !reply.trim()) return;

    try {
      await fetch(`/api/inquiries/${selectedInquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply, isRead: true }),
      });
      setSelectedInquiry(null);
      setReply('');
      fetchInquiries();
    } catch (error) {
      console.error('Error sending reply:', error);
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
        <h1 className="text-2xl font-bold text-gray-800">Inquiries</h1>

        {/* Inquiries List */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">From</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Subject</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Status</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Date</th>
                  <th className="text-start py-4 px-6 text-gray-600 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr key={inquiry.id} className="border-t">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium">{inquiry.name}</p>
                        <p className="text-sm text-gray-500">{inquiry.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">{inquiry.subject}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          inquiry.isRead
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {inquiry.isRead ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-500">
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedInquiry(inquiry);
                            setReply(inquiry.reply || '');
                            if (!inquiry.isRead) {
                              markAsRead(inquiry.id);
                            }
                          }}
                        >
                          <Eye size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {inquiries.length === 0 && (
            <div className="text-center py-12 text-gray-500">No inquiries found</div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedInquiry && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl w-full max-w-lg">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Inquiry Details</h2>
                <button
                  onClick={() => setSelectedInquiry(null)}
                  className="text-gray-400"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">From</p>
                  <p className="font-medium">{selectedInquiry.name}</p>
                  <p className="text-sm text-gray-500">{selectedInquiry.email}</p>
                  {selectedInquiry.phone && (
                    <p className="text-sm text-gray-500">{selectedInquiry.phone}</p>
                  )}
                </div>

                <div>
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{selectedInquiry.subject}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Message</p>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                {selectedInquiry.reply && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500 mb-1">Reply</p>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {selectedInquiry.reply}
                    </p>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reply
                  </label>
                  <textarea
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={4}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <Button variant="ghost" onClick={() => setSelectedInquiry(null)}>
                    Cancel
                  </Button>
                  <Button onClick={sendReply} disabled={!reply.trim()}>
                    <Send size={16} className="me-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
