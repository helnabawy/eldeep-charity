'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, Sparkles, Heart, Utensils, Shirt, BookOpen, Stethoscope, Users } from 'lucide-react';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';

export interface Project {
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

const categoryIcons: Record<string, React.ElementType> = {
  sponsorship: Heart,
  food: Utensils,
  clothing: Shirt,
  education: BookOpen,
  health: Stethoscope,
};

const categoryColors: Record<string, string> = {
  sponsorship: 'from-pink-500 to-rose-500',
  food: 'from-orange-500 to-amber-500',
  clothing: 'from-blue-500 to-indigo-500',
  education: 'from-purple-500 to-violet-500',
  health: 'from-red-500 to-pink-500',
};

interface ProjectsSectionProps {
  projects?: Project[];
}

export default function ProjectsSection({ projects: initialProjects = [] }: ProjectsSectionProps) {
  const t = useTranslations('projects');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter projects to only show active ones and limit to 6
  const projects = initialProjects
    .filter((p) => p.status === 'ACTIVE')
    .slice(0, 6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden" id="projects">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-secondary-50/20 to-white" />
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className={clsx(
          "text-center max-w-3xl mx-auto mb-12 opacity-0",
          isVisible && "animate-fade-in-up"
        )}>
          <span className={clsx(
            "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-100 text-secondary-700 text-sm font-medium mb-4",
            isRTL && "font-arabic"
          )}>
            <Sparkles size={16} className="text-primary-500" />
            {locale === 'ar' ? 'مشاريعنا' : 'Our Projects'}
          </span>
          <h2 className={clsx(
            "text-2xl md:text-3xl lg:text-4xl font-bold mb-4",
            isRTL ? "font-arabic text-primary-900" : "text-primary-900"
          )}>
            {t('title')}
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-secondary-400 via-primary-500 to-secondary-400 mx-auto rounded-full mb-4" />
          <p className={clsx(
            "text-base text-gray-600 leading-relaxed",
            isRTL && "font-arabic"
          )}>
            {t('subtitle')}
          </p>
        </div>

        {projects.length > 0 ? (
          <>
            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => {
                const IconComponent = categoryIcons[project.category] || Heart;
                const gradientClass = categoryColors[project.category] || 'from-primary-500 to-primary-600';
                const progress = project.goalAmount 
                  ? Math.min((project.raisedAmount / project.goalAmount) * 100, 100) 
                  : 0;

                return (
                  <div
                    key={project.id}
                    className={clsx(
                      "group opacity-0",
                      isVisible && "animate-fade-in-up"
                    )}
                    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden shadow-elegant hover:shadow-elegant-lg transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                      {/* Image/Header Section */}
                      <div className={clsx(
                        "relative h-36 bg-gradient-to-br flex items-center justify-center overflow-hidden",
                        gradientClass
                      )}>
                        {/* Decorative Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute inset-0" style={{ 
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '24px'
                          }} />
                        </div>
                        
                        {/* Floating Icon */}
                        <div className="relative z-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                          <IconComponent size={32} className="text-white" />
                        </div>

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                          {project.category}
                        </div>

                        {/* Decorative Circles */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full" />
                      </div>

                      {/* Content Section */}
                      <div className="p-5 flex-1 flex flex-col">
                        <h3 className={clsx(
                          "text-base font-bold text-primary-900 mb-2",
                          isRTL && "font-arabic"
                        )}>
                          {isRTL ? project.titleAr : project.titleEn}
                        </h3>
                        <p className={clsx(
                          "text-sm text-gray-600 mb-3 line-clamp-2 flex-1",
                          isRTL && "font-arabic"
                        )}>
                          {isRTL ? project.descriptionAr : project.descriptionEn}
                        </p>

                        {/* Progress Bar */}
                        {project.goalAmount && (
                          <div className="mb-3">
                            <div className={clsx(
                              "flex justify-between text-xs mb-1",
                              isRTL && "flex-row-reverse"
                            )}>
                              <span className={clsx("text-gray-500 font-medium", isRTL && "font-arabic")}>
                                {t('raised')}: {project.raisedAmount.toLocaleString()} EGP
                              </span>
                              <span className="text-primary-600 font-bold">
                                {Math.round(progress)}%
                              </span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                className={clsx(
                                  "h-full rounded-full transition-all duration-1000 ease-out",
                                  progress >= 100 
                                    ? "bg-gradient-to-r from-secondary-400 to-secondary-500" 
                                    : "bg-gradient-to-r from-primary-400 to-primary-500"
                                )}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <Link href={`/${locale}/projects`} className="block mt-auto">
                          <button className={clsx(
                            "w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-primary-200 text-primary-700 font-semibold rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-all duration-300 group-hover:bg-primary-500 group-hover:text-white group-hover:border-primary-500 text-sm",
                            isRTL && "flex-row-reverse"
                          )}>
                            <span className={isRTL ? "font-arabic" : ""}>{t('viewDetails')}</span>
                            <ArrowRight size={14} className={clsx(isRTL && "rotate-180")} />
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View All Button */}
            <div 
              className={clsx(
                "text-center mt-10 opacity-0",
                isVisible && "animate-fade-in-up"
              )}
              style={{ animationDelay: '0.8s' }}
            >
              <Link href={`/${locale}/projects`}>
                <button className={clsx(
                  "inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-glow-sm hover:shadow-glow-md transition-all duration-300 hover:scale-105",
                  isRTL && "flex-row-reverse font-arabic"
                )}>
                  {locale === 'ar' ? 'عرض جميع المشاريع' : 'View All Projects'}
                  <ArrowRight size={16} className={clsx(isRTL && "rotate-180")} />
                </button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-gray-400" />
            </div>
            <p className={clsx("text-gray-500", isRTL && "font-arabic")}>
              {t('noProjects')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
