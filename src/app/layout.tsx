import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Al Deeb Charity Foundation | مؤسسة آل الديب الخيرية',
  description: 'A charitable foundation serving the community and supporting those in need | مؤسسة خيرية تسعى لخدمة المجتمع ودعم المحتاجين',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
