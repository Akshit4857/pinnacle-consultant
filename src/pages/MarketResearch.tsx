import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import {
  BarChart3,
  Search,
  Compass,
  FileText,
  TrendingUp,
  Target,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  X,
  Download,
} from 'lucide-react';

export default function MarketResearch() {
  const [activeResearch, setActiveResearch] = useState<string | null>(null);

  const pillars = [
    {
      id: 'sectoral',
      icon: BarChart3,
      title: 'Sectoral Research Reports',
      tag: 'Strategic Outlook',
      headline: 'In-depth reports for stakeholders, investors, and decision-makers',
      desc: 'Deep-dive qualitative and quantitative landscape studies charting market expansion curves, supply chain hurdles, and technological inflections across India.',
      points: [
        'EV adoption trends & policy impact assessments',
        'Battery technology outlook & gigafactory roadmaps',
        'OEM supplier ecosystem maps & capacity analysis',
        'Logistics tech benchmarking & freight electrification',
        'Pharma & healthcare industry growth forecasts',
      ],
      targetAudience: 'Venture Capitalists, CPOs, Fleet Operators, Strategy Heads',
    },
    {
      id: 'competitor',
      icon: Search,
      title: 'Competitor & Market Analysis',
      tag: 'Competitive Intelligence',
      headline: 'Detailed studies for product launch, pricing, and expansion',
      desc: 'Actionable competitive benchmarking designed to identify market white spaces, optimize unit economics, and validate new territory launches.',
      points: [
        'Comprehensive SWOT & PESTEL environmental frameworks',
        'Go-to-market strategy assessment & pricing benchmarks',
        'Voice of Customer (VoC) surveys & feedback synthesis',
        'Distribution channel mapping & margin structure analysis',
      ],
      targetAudience: 'Brand Leaders, Growth Strategists, Product Managers',
    },
    {
      id: 'custom',
      icon: Compass,
      title: 'Custom Research Projects',
      tag: 'Tailored Advisory',
      headline: 'Tailored studies to address your unique business questions',
      desc: 'Bespoke intelligence mandates addressing high-stakes commercial dilemmas, capital deployment decisions, and vendor network verification.',
      points: [
        'Commercial & technical feasibility studies',
        'Demand forecasting & capacity planning models',
        'Partner, supplier & vendor landscape vetting',
        'Regulatory policy advisory & incentive qualification',
      ],
      targetAudience: 'Founders, MDs, Procurement Committees, Board Advisors',
    },
  ];

  const sampleReports = [
    {
      title: 'India EV Charging Infrastructure Outlook 2025-2030',
      category: 'Clean Mobility',
      pages: '48 Pages',
      highlights: 'MW Charging Hubs • DISCOM Grid Capacity • Fleet Electrification Economics',
    },
    {
      title: 'Battery Swapping vs High-Speed DC Fast Charging in Commercial Fleets',
      category: 'E-Mobility',
      pages: '36 Pages',
      highlights: 'Total Cost of Ownership (TCO) • Uptime Comparison • B2B Adoption Rates',
    },
    {
      title: 'Smart Factory & Industrial IoT Adoption Across Indian MSMEs',
      category: 'Industry 4.0',
      pages: '42 Pages',
      highlights: 'OEE Benchmarks • Sensor Retrofit Cost Models • ROI Payback Periods',
    },
  ];

  const selectedData = pillars.find((p) => p.id === activeResearch);

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <section className="pt-36 pb-16 md:pt-40 md:pb-20 bg-brand-dark bg-grid-dark text-white overflow-hidden relative">
        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight">
                {[
                  <span key="l1" className="block">Data-backed decisions</span>,
                  <span key="l2" className="block text-brand-light">start with deep insights.</span>,
                ].map((line, i) => (
                  <span key={`w-${i}`} className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
                    <motion.span
                      className="block"
                      initial={{ y: '110%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-medium mb-8"
              >
                We offer customized research and intelligence for emerging and traditional sectors. Cut through market noise with ground-verified data, competitive intelligence, and predictive sector forecasts.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Magnetic>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
                  >
                    <span>Commission Custom Research</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href="mailto:info@pinnacleconsultant.co.in"
                    className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <span>info@pinnacleconsultant.co.in</span>
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="/images/market_research_analyst.jpg"
                  alt="Industrial Market Research & Competitive Intelligence"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-brand-light font-semibold">
                    Proprietary Sector Reports
                  </span>
                  <span className="text-white font-medium">95%+ Forecast Precision</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Core Pillars Grid */}
      <section className="py-16 md:py-24 bg-grid-light relative z-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Market Intelligence
            </span>
            <WordReveal
              as="h2"
              text="Intelligence That Shapes High-Stakes Strategy"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Customized research solutions designed for emerging mobility, manufacturing, and industrial ecosystems.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-8"
          >
            {pillars.map((pillar) => (
              <motion.div key={pillar.id} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-brand-card rounded-[2rem] p-6 sm:p-8 md:p-10 border border-brand-edge shadow-sm hover:shadow-xl transition-colors group flex flex-col justify-between"
                >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-brand-bg text-brand-ink flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-light transition-colors">
                      <pillar.icon className="w-7 h-7" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-bold bg-brand-dark/10 text-brand-ink px-3 py-1 rounded-full uppercase tracking-wider">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl font-semibold text-brand-ink mb-2">{pillar.title}</h3>
                  <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
                    {pillar.headline}
                  </p>
                  <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6">
                    {pillar.desc}
                  </p>

                  <ul className="space-y-3 mb-8 pt-4 border-t border-brand-edge">
                    {pillar.points.map((pt, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-[15px] sm:text-xs text-brand-muted">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-col gap-3">
                  <div className="text-[11px] text-slate-500 font-medium">
                    <span className="text-brand-ink font-semibold">Ideal for:</span> {pillar.targetAudience}
                  </div>
                  <button
                    onClick={() => setActiveResearch(pillar.id)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent py-3 rounded-xl font-medium text-xs transition-colors"
                  >
                    View Report Structure <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Industry Reports Showcase */}
      <section className="py-14 md:py-20 bg-brand-card border-t border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
                Knowledge Products
              </span>
              <WordReveal
                as="h2"
                text="Featured Industry Intelligence Briefs"
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-ink tracking-tight"
              />
            </div>
            <p className="text-slate-500 text-[15px] md:text-sm font-medium max-w-sm">
              Proprietary market dossiers authored by our senior energy and mobility researchers.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-6"
          >
            {sampleReports.map((report, idx) => (
              <motion.div key={idx} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-brand-bg rounded-2xl p-6 border border-brand-edge group flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-4">
                    <span className="bg-brand-card px-2.5 py-1 rounded-md text-brand-ink border border-brand-edge">
                      {report.category}
                    </span>
                    <span>{report.pages}</span>
                  </div>
                  <h3 className="text-base font-semibold text-brand-ink mb-3 leading-snug">
                    {report.title}
                  </h3>
                  <p className="text-[15px] sm:text-xs text-brand-muted font-medium mb-6 leading-relaxed">
                    Key Modules: {report.highlights}
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-ink hover:text-emerald-700 transition-colors pt-4 border-t border-brand-edge"
                >
                  <span>Request Sample Executive Summary</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Slide-Out Detail Drawer */}
      <AnimatePresence>
        {activeResearch && selectedData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveResearch(null)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-card z-50 shadow-2xl border-l border-brand-edge flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-brand-edge flex items-center justify-between gap-4 bg-brand-bg">
                <div className="min-w-0">
                  <span className="bg-brand-light text-brand-onaccent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    Research Mandate
                  </span>
                  <h2 className="text-2xl font-semibold text-brand-ink">{selectedData.title}</h2>
                </div>
                <button
                  onClick={() => setActiveResearch(null)}
                  className="shrink-0 min-h-11 min-w-11 flex items-center justify-center p-2 bg-brand-card rounded-full text-brand-ink hover:bg-brand-light shadow-sm transition-colors border border-brand-edge"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <p className="text-brand-muted font-medium leading-relaxed mb-8 text-[15px] sm:text-sm">
                  {selectedData.desc}
                </p>

                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-brand-edge pb-2">
                    Methodological Depth
                  </h3>
                  <ul className="space-y-3 pt-2">
                    {selectedData.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-brand-ink text-[15px] sm:text-xs">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-dark text-white p-6 rounded-2xl">
                  <h4 className="text-xs font-bold text-brand-light uppercase tracking-wider mb-1">
                    Stakeholder Focus
                  </h4>
                  <p className="text-xs font-medium text-slate-200">{selectedData.targetAudience}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-brand-edge bg-brand-card">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full gap-2 bg-brand-dark text-white py-4 rounded-full font-semibold text-sm hover:bg-brand-light hover:text-brand-onaccent transition-colors shadow-lg"
                >
                  Inquire For Research Mandate <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 5. Bottom Consultation Banner */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-dark text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={1} />
            <WordReveal
              as="h2"
              text="Have a specialized business dilemma?"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-slate-300 text-[15px] sm:text-base max-w-xl mx-auto mb-8 font-medium">
              Speak directly with our research practice heads to commission tailored market intelligence, partner landscape analysis, or feasibility studies.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
                >
                  <span>Consult Market Researchers</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
