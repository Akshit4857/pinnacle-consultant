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
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  X,
} from 'lucide-react';
import SEO from '../components/SEO';

export default function MarketResearch() {
  const [activeResearch, setActiveResearch] = useState<string | null>(null);

  const pillars = [
    {
      id: 'sectoral',
      icon: BarChart3,
      title: 'Sectoral Research Reports',
      tag: 'Sector Reports',
      headline: 'Quarterly deep dives into capacity, policy, and technology adoption',
      desc: 'Detailed studies on domestic manufacturing capability, raw material supply, and policy shifts across Indian states.',
      points: [
        'State-by-state EV subsidies, tariff shifts, and registration numbers',
        'Cell chemistry adoption, domestic pack assembly, and gigafactory timelines',
        'Tier-1 and Tier-2 supplier footprints and monthly manufacturing output',
        'Commercial fleet electrification economics and route viability',
        'Specialty packaging, cold chain capacity, and regional pharma corridors',
      ],
      targetAudience: 'Fleet operators, component manufacturers, and energy investors',
    },
    {
      id: 'competitor',
      icon: Search,
      title: 'Competitor & Pricing Studies',
      tag: 'Pricing & Competition',
      headline: 'Compare pricing, dealer margins, and feature sets across competitors',
      desc: 'We benchmark competing product specs, discount structures, and distribution channels to help you price and position effectively.',
      points: [
        'Feature-by-feature product comparisons and teardown notes',
        'Distributor margins, retail price points, and promotional structures',
        'Interviews with fleet buyers, plant heads, and commercial users',
        'Regional dealership terms, credit cycles, and warehouse requirements',
      ],
      targetAudience: 'Product heads, commercial directors, and founders',
    },
    {
      id: 'custom',
      icon: Compass,
      title: 'Custom Research Briefs',
      tag: 'Custom Mandates',
      headline: 'Targeted studies for joint ventures, plant investments, and vendor diligence',
      desc: 'Confidential investigations when you need to verify a supplier’s actual floor capacity, evaluate an acquisition target, or test market demand before committing capital.',
      points: [
        'Independent technical and commercial feasibility assessments',
        'Unit economics, addressable market size, and 3-year demand curves',
        'Physical plant visits and supplier background verification',
        'State industrial policy, PLI eligibility, and local clearance requirements',
      ],
      targetAudience: 'Managing directors, investment committees, and corporate strategy teams',
    },
  ];

  const sampleReports = [
    {
      title: 'India EV Charging Infrastructure Outlook 2025–2030',
      category: 'Clean Mobility',
      pages: '48 Pages',
      highlights: 'High-power highway hubs, DISCOM power approvals, and fleet charging economics',
    },
    {
      title: 'Commercial Fleet Battery Swapping vs Fast Charging',
      category: 'E-Mobility',
      pages: '36 Pages',
      highlights: 'Capex comparison, battery lease models, and 3-wheeler turnaround times',
    },
    {
      title: 'Shop-Floor IoT and Predictive Maintenance Adoption',
      category: 'Industry 4.0',
      pages: '42 Pages',
      highlights: 'Typical payback periods, sensor retrofit costs, and downtime reduction rates',
    },
  ];

  const researchSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Industrial Market Research & EV Feasibility Studies',
    provider: {
      '@type': 'ConsultingService',
      name: 'Pinnacle Consultant',
      url: 'https://www.pinnacleconsultant.co.in/',
      logo: 'https://www.pinnacleconsultant.co.in/logo.png',
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    description: 'Primary market intelligence, EV charging site feasibility audits, DISCOM grid capacity analysis, and CAPEX/OPEX financial modeling.',
  };

  const selectedData = pillars.find((p) => p.id === activeResearch);

  return (
    <div className="w-full">
      <SEO
        title="Industrial Market Research & EV Feasibility Studies | Pinnacle Consultant"
        description="Primary market intelligence, EV charging site feasibility audits, DISCOM grid capacity analysis, and CAPEX/OPEX financial modeling across India."
        keywords="EV feasibility study India, industrial market research, charging station traffic audit, clean mobility market intelligence, B2B fleet electrification analysis"
        canonicalPath="/market-research"
        schema={researchSchema}
      />
      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-40 md:pb-20 bg-brand-dark bg-grid-dark text-white overflow-hidden relative">
        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-6xl md:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight">
                {[
                  <span key="l1" className="block">Industry Research Built on</span>,
                  <span key="l2" className="block text-brand-light">Direct Supplier and Field Interviews.</span>,
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
                We conduct ground-level interviews, track supplier capacities, and model cost economics across Indian EV, clean energy, and manufacturing sectors so your capital decisions are backed by evidence.
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
                    className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg"
                  >
                    <span>Discuss a Custom Research Brief</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href="mailto:info@pinnacleconsultant.co.in"
                    className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-6 pr-5 py-4 rounded-full font-semibold text-sm hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
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
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700 outline outline-1 -outline-offset-1 outline-black/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-brand-light font-semibold">
                    Primary Field Research
                  </span>
                  <span className="text-white font-medium">Ground-Level Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Research Pillars */}
      <section className="py-16 md:py-24 bg-grid-light relative z-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Market Intelligence
            </span>
            <WordReveal
              as="h2"
              text="Research Formats Built for Decision Makers"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Custom studies and sector benchmarks designed for clean mobility, component manufacturing, and industrial operations.
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
                    className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] py-3 rounded-xl font-medium text-xs transition-colors"
                  >
                    Review Methodology &amp; Details <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Industry Reports */}
      <section className="py-14 md:py-20 bg-brand-card border-t border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
                Knowledge Products
              </span>
              <WordReveal
                as="h2"
                text="Available Research Briefs"
                className="text-2xl sm:text-3xl md:text-4xl font-semibold text-brand-ink tracking-tight"
              />
            </div>
            <p className="text-slate-500 text-[15px] md:text-sm font-medium max-w-sm">
              Sample research summaries prepared by our mobility and industrial research team.
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
                    <span className="tabular-nums">{report.pages}</span>
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
                  <span>Request Summary &amp; Table of Contents</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Research Detail Drawer */}
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
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedData.title} brief overview`}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-card z-50 shadow-2xl border-l border-brand-edge flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-brand-edge flex items-center justify-between gap-4 bg-brand-bg">
                <div className="min-w-0">
                  <span className="bg-brand-light text-brand-onaccent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    Brief Overview
                  </span>
                  <h2 className="text-2xl font-semibold text-brand-ink">{selectedData.title}</h2>
                </div>
                <button
                  onClick={() => setActiveResearch(null)}
                  aria-label="Close brief overview"
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
                    What the Study Covers
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
                    Relevant Stakeholders
                  </h4>
                  <p className="text-xs font-medium text-slate-200">{selectedData.targetAudience}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-brand-edge bg-brand-card">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full gap-2 bg-brand-dark text-white py-4 rounded-full font-semibold text-sm hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] transition-all shadow-lg"
                >
                  Request a Proposal for This Study <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scoping Callout */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-dark text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={1} />
            <WordReveal
              as="h2"
              text="Need Specific Market or Supplier Data?"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-slate-300 text-[15px] sm:text-base max-w-xl mx-auto mb-8 font-medium">
              Talk with our research leads to discuss your scope, target sectors, and required turnaround time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg"
                >
                  <span>Schedule a Research Scoping Call</span>
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
