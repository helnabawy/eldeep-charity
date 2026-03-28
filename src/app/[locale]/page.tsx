import { setRequestLocale } from 'next-intl/server';
import {
  Header,
  Hero,
  Stats,
  AboutSection,
  MosqueSection,
  ProjectsSection,
  DonationSection,
  ContactSection,
  Footer,
} from '@/components/landing';
import { Project } from '@/components/landing/ProjectsSection';
import prisma from '@/lib/prisma';

// Fetch projects at build time
async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return projects.map((p) => ({
      id: p.id,
      titleAr: p.titleAr,
      titleEn: p.titleEn,
      descriptionAr: p.descriptionAr,
      descriptionEn: p.descriptionEn,
      category: p.category,
      status: p.status,
      goalAmount: p.goalAmount,
      raisedAmount: p.raisedAmount,
    }));
  } catch (error) {
    console.error('Failed to fetch projects:', error);
    return [];
  }
}

export default async function HomePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const projects = await getProjects();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <AboutSection />
        <MosqueSection />
        <ProjectsSection projects={projects} />
        <DonationSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
