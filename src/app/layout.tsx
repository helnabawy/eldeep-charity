import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '@/app/globals.css';

const almarai = localFont({
  src: [
    { path: '../../fonts/Almarai-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../fonts/Almarai-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-almarai',
});

export const metadata: Metadata = {
  title: 'مؤسسة آل الديب الخيرية | Al Deeb Charity Foundation',
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
  return (
    <html lang="ar" dir="rtl" className={almarai.variable}>
      <body className="font-almarai">
        {children}
      </body>
    </html>
  );
}
