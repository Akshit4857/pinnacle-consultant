import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import { setLenis } from '../lib/lenis';

export default function Layout() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      syncTouch: true,
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
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>

      <Footer />
    </>
  );
}
