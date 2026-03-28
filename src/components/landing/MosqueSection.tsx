'use client';

import { useTranslations, useLocale } from 'next-intl';
import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, MapPin, ExternalLink } from 'lucide-react';

const MOSQUE_LOCATION_URL = 'https://www.google.com/maps/place/New+Administrative+Capital,+Cairo+Governorate+Desert,+Cairo+Governorate+4823401/@30.0282441,31.6785358,966m/data=!3m1!1e3!4m15!1m8!3m7!1s0x1457f4e36df84c5f:0x38e74a34f5f6f94a!2sNew+Administrative+Capital,+Cairo+Governorate+Desert,+Cairo+Governorate+4823401!3b1!8m2!3d30.0282441!4d31.6785358!16s%2Fg%2F11tk60tfn9!3m5!1s0x1457f4e36df84c5f:0x38e74a34f5f6f94a!8m2!3d30.0282441!4d31.6785358!16s%2Fg%2F11tk60tfn9!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDMyNC4wIKXMDSoASAFQAw%3D%3D';

export default function MosqueSection() {
  const t = useTranslations('mosque');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="mosque" className="relative py-20 overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className={clsx(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 mb-4 opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-down"
            )}
          >
            <span className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">{t('badge')}</span>
          </div>

          <h2
            className={clsx(
              "text-3xl md:text-4xl font-bold text-primary-900 mb-4 opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {t('title')}
          </h2>

          <p
            className={clsx(
              "text-lg text-primary-600 max-w-2xl mx-auto opacity-0",
              isRTL && "font-arabic",
              isLoaded && "animate-fade-in-up"
            )}
            style={{ animationDelay: '0.3s' }}
          >
            {t('subtitle')}
          </p>
        </div>

        {/* Video Container */}
        <div
          className={clsx(
            "max-w-5xl mx-auto opacity-0",
            isLoaded && "animate-fade-in-up"
          )}
          style={{ animationDelay: '0.4s' }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-primary-900">
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-auto aspect-video object-cover"
              muted={isMuted}
              loop
              playsInline
              poster="/assets/mosque.jpg"
            >
              <source src="/assets/mosque.mp4" type="video/mp4" />
              {t('videoNotSupported')}
            </video>

            {/* Video Overlay with Controls */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 via-transparent to-transparent pointer-events-none" />

            {/* Play/Pause Button Overlay */}
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center group cursor-pointer"
            >
              <div
                className={clsx(
                  "w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg transition-all duration-300",
                  "hover:bg-white hover:scale-110",
                  isPlaying && "opacity-0 group-hover:opacity-100"
                )}
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-primary-700" />
                ) : (
                  <Play className="w-8 h-8 text-primary-700 ml-1" />
                )}
              </div>
            </button>

            {/* Bottom Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between bg-gradient-to-t from-primary-900/80 to-transparent">
              <div className={clsx("text-white", isRTL && "font-arabic")}>
                <p className="font-semibold text-lg">{t('videoTitle')}</p>
                <p className="text-sm text-white/80">{t('videoDescription')}</p>
              </div>

              {/* Sound Toggle */}
              <button
                onClick={toggleMute}
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Location Card */}
        <div
          className={clsx(
            "max-w-5xl mx-auto mt-8 opacity-0",
            isLoaded && "animate-fade-in-up"
          )}
          style={{ animationDelay: '0.5s' }}
        >
          <a
            href={MOSQUE_LOCATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-all duration-300 border border-primary-100 hover:border-primary-200 group"
          >
            <div className={clsx("flex items-center justify-between", isRTL && "flex-row-reverse")}>
              <div className={clsx("flex items-center gap-4", isRTL && "flex-row-reverse")}>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <div className={clsx(isRTL && "text-right")}>
                  <h3 className={clsx("font-bold text-primary-900 text-lg", isRTL && "font-arabic")}>
                    {t('locationTitle')}
                  </h3>
                  <p className={clsx("text-primary-600", isRTL && "font-arabic")}>
                    {t('locationSubtitle')}
                  </p>
                </div>
              </div>
              <div className={clsx("flex items-center gap-2 text-primary-500 group-hover:text-primary-600 transition-colors", isRTL && "flex-row-reverse")}>
                <span className={clsx("hidden sm:inline font-medium", isRTL && "font-arabic")}>
                  {t('getDirections')}
                </span>
                <ExternalLink className={clsx("w-5 h-5 transition-transform", isRTL ? "group-hover:-translate-x-1" : "group-hover:translate-x-1")} />
              </div>
            </div>
          </a>
        </div>

        {/* Info Cards */}
        <div
          className={clsx(
            "grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12 opacity-0",
            isRTL && "md:grid-flow-dense",
            isLoaded && "animate-fade-in-up"
          )}
          style={{ animationDelay: '0.6s' }}
        >
          {/* Card 1 - Prayer Hall */}
          <div className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-shadow border border-primary-100">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className={clsx("font-bold text-primary-900 mb-2", isRTL && "font-arabic")}>
              {t('card1Title')}
            </h3>
            <p className={clsx("text-primary-600 text-sm", isRTL && "font-arabic")}>
              {t('card1Description')}
            </p>
          </div>

          {/* Card 2 - Prayer Times */}
          <div className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-shadow border border-primary-100">
            <div className="w-12 h-12 rounded-xl bg-secondary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-secondary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className={clsx("font-bold text-primary-900 mb-2", isRTL && "font-arabic")}>
              {t('card2Title')}
            </h3>
            <p className={clsx("text-primary-600 text-sm", isRTL && "font-arabic")}>
              {t('card2Description')}
            </p>
          </div>

          {/* Card 3 - Community Hub */}
          <div className="bg-white rounded-2xl p-6 shadow-elegant hover:shadow-lg transition-shadow border border-primary-100">
            <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className={clsx("font-bold text-primary-900 mb-2", isRTL && "font-arabic")}>
              {t('card3Title')}
            </h3>
            <p className={clsx("text-primary-600 text-sm", isRTL && "font-arabic")}>
              {t('card3Description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
