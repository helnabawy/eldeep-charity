import { setRequestLocale } from 'next-intl/server';
import {
  Header,
  Hero,
  Stats,
  AboutSection,
  ProjectsSection,
  DonationSection,
  ContactSection,
  Footer,
} from '@/components/landing';

export default function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <AboutSection />
        <ProjectsSection />
        <DonationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
