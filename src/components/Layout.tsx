import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BrochureModal from './BrochureModal';
import ScrollToTop from './ScrollToTop';
import ThemeSwitcher from './ThemeSwitcher';
import ThemeEffects from './ThemeEffects';
import { useState, useEffect } from 'react';
import { FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { setLenis } from '../lib/lenis';

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenis(lenis);

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col font-sans selection:bg-brand-light text-brand-onaccent">
        <ScrollToTop />
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>

      {/* Footer — rendered as its own separate section, outside the app shell */}
      <Footer />

      {/* Global Theme Switcher + effects (wipe, toast) */}
      <ThemeSwitcher />
      <ThemeEffects />

      {/* Global Floating Action Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 bg-brand-light text-brand-onaccent p-4 md:px-5 rounded-full shadow-2xl hover:scale-105 hover:bg-white transition-all group flex items-center gap-2 border border-brand-dark/10"
        aria-label="Download Profile"
      >
        <FileText className="w-6 h-6" />
        <span className="hidden md:inline-block max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-medium text-sm opacity-0 group-hover:opacity-100 group-hover:ml-2">
          Download Profile
        </span>
        <span className="inline-block md:hidden font-medium text-sm">
          Brochure
        </span>
      </button>

      <AnimatePresence>
        {isModalOpen && <BrochureModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
