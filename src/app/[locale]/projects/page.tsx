'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Header, Footer } from '@/components/landing';
import { Card, Button } from '@/components/ui';
import clsx from 'clsx';
import { useState, useEffect } from 'react';

interface Project {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  category: string;
  status: string;
  goalAmount: number | null;
  raisedAmount: number;
}

const categories = [
  { key: 'all', value: 'all' },
  { key: 'sponsorship', value: 'sponsorship' },
  { key: 'food', value: 'food' },
  { key: 'clothing', value: 'clothing' },
  { key: 'education', value: 'education' },
  { key: 'health', value: 'health' },
];

export default function ProjectsPage() {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

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

        {/* Category Filter */}
        <section className="py-8 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  variant={selectedCategory === cat.value ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  {t(`categories.${cat.key}`)}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="text-center py-12">
                <p className={clsx("text-gray-500", isRTL && "font-arabic")}>Loading...</p>
              </div>
            ) : filteredProjects.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                      <span className="text-white text-6xl opacity-50">
                        {project.category === 'sponsorship' && '💝'}
                        {project.category === 'food' && '🍽️'}
                        {project.category === 'clothing' && '👕'}
                        {project.category === 'education' && '📚'}
                        {project.category === 'health' && '🏥'}
                      </span>
                    </div>
                    <div className="p-6">
                      <span className={clsx(
                        "inline-block px-2 py-1 text-xs rounded-full mb-2",
                        project.status === 'ACTIVE' && "bg-green-100 text-green-700",
                        project.status === 'COMPLETED' && "bg-blue-100 text-blue-700",
                        project.status === 'PAUSED' && "bg-yellow-100 text-yellow-700"
                      )}>
                        {t(`status.${project.status.toLowerCase()}`)}
                      </span>
                      <h3 className={clsx("text-xl font-bold text-gray-800 mb-2", isRTL && "font-arabic")}>
                        {isRTL ? project.titleAr : project.titleEn}
                      </h3>
                      <p className={clsx("text-gray-600 mb-4 line-clamp-3", isRTL && "font-arabic")}>
                        {isRTL ? project.descriptionAr : project.descriptionEn}
                      </p>
                      {project.goalAmount && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-500">
                              {t('raised')}: {project.raisedAmount.toLocaleString()} EGP
                            </span>
                            <span className="text-gray-500">
                              {Math.round((project.raisedAmount / project.goalAmount) * 100)}%
                            </span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary-500 rounded-full"
                              style={{
                                width: `${Math.min((project.raisedAmount / project.goalAmount) * 100, 100)}%`
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {t('goal')}: {project.goalAmount.toLocaleString()} EGP
                          </p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className={clsx("text-gray-500", isRTL && "font-arabic")}>
                  No projects found
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
