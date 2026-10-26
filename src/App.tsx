/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';

// Lazy-loaded route chunks to minimize initial bundle size and maximize LCP
const Staffing = lazy(() => import('./pages/Staffing'));
const TechEv = lazy(() => import('./pages/TechEv'));
const Impact = lazy(() => import('./pages/Impact'));
const About = lazy(() => import('./pages/About'));
const Faq = lazy(() => import('./pages/Faq'));
const Contact = lazy(() => import('./pages/Contact'));
const Industry40 = lazy(() => import('./pages/Industry40'));
const MarketResearch = lazy(() => import('./pages/MarketResearch'));
const Careers = lazy(() => import('./pages/Careers'));
const JobDetail = lazy(() => import('./pages/JobDetail'));
const Privacy = lazy(() => import('./pages/Privacy'));

function PageLoader() {
  return (
    <div className="w-full min-h-[50vh] flex items-center justify-center">
      <div className="w-7 h-7 border-2 border-brand-teal border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="staffing" element={<Staffing />} />
              <Route path="tech-ev" element={<TechEv />} />
              <Route path="industry-4-0" element={<Industry40 />} />
              <Route path="market-research" element={<MarketResearch />} />
              <Route path="impact" element={<Impact />} />
              <Route path="about" element={<About />} />
              <Route path="careers" element={<Careers />} />
              <Route path="careers/:slug" element={<JobDetail />} />
              <Route path="privacy" element={<Privacy />} />
              <Route path="faq" element={<Faq />} />
              <Route path="contact" element={<Contact />} />
            </Route>
          </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}
