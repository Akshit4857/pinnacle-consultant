import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

export default function Layout() {
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
