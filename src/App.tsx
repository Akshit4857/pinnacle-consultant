/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Staffing from './pages/Staffing';
import TechEv from './pages/TechEv';
import Impact from './pages/Impact';
import About from './pages/About';
import Faq from './pages/Faq';
import Contact from './pages/Contact';

import Industry40 from './pages/Industry40';
import MarketResearch from './pages/MarketResearch';

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="staffing" element={<Staffing />} />
            <Route path="tech-ev" element={<TechEv />} />
            <Route path="industry-4-0" element={<Industry40 />} />
            <Route path="market-research" element={<MarketResearch />} />
            <Route path="impact" element={<Impact />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<Faq />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
