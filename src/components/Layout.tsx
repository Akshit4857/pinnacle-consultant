import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BrochureModal from './BrochureModal';
import ScrollToTop from './ScrollToTop';
import { useState } from 'react';
import { AnimatePresence } from 'motion/react';

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

      <AnimatePresence>
        {isModalOpen && <BrochureModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
