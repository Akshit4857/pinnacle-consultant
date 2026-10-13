import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BrochureModal from './BrochureModal';
import ScrollToTop from './ScrollToTop';
import ThemeEffects from './ThemeEffects';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
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
      <div className="min-h-svh flex flex-col font-sans selection:bg-brand-light text-brand-onaccent">
        <ScrollToTop />
        <Header onOpenBrochure={() => setIsModalOpen(true)} />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>

      {/* Footer — rendered as its own separate section, outside the app shell */}
      <Footer />

      {/* Global Theme effects (wipe, toast) */}
      <ThemeEffects />

      <AnimatePresence>
        {isModalOpen && <BrochureModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
