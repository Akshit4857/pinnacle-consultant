import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import BrochureModal from '../components/BrochureModal';
import CompanyLogos from '../components/CompanyLogos';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import Magnetic from '../components/motion/Magnetic';
import TiltCard from '../components/motion/TiltCard';
import WordReveal from '../components/motion/WordReveal';
import { CountUp } from '@/components/ui/count-up';
import {
  Briefcase,
  Zap,
  Cpu,
  BarChart3,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users,
  Award,
  Sparkles,
  ChevronRight,
  Download,
  Check,
  MessageSquare,
  BadgeCheck,
} from 'lucide-react';

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const clients = [
    {
      name: 'Hero MotoCorp',
      tag: 'Fortune-500 Automotive',
      scope: 'EV Infra & Station Manpower',
      badge: 'Turnkey Rollout',
    },
    {
      name: 'Exponent Energy',
      tag: '15-Min Fast Charging',
      scope: 'Technical On-Ground Staffing',
      badge: 'Rapid Deployment',
    },
    {
      name: 'Sun Mobility',
      tag: 'Battery Swapping Ecosystem',
      scope: 'Swapping Hub Shift Personnel',
      badge: 'Depot Operations',
    },
    {
      name: 'Gentari (Petronas)',
      tag: 'Global Clean Energy',
      scope: 'Highway EV Charging Backbone',
      badge: 'High Uptime SLA',
    },
    {
      name: 'GoMechanic',
      tag: 'Auto Service Network',
      scope: 'EV Diagnostic Mechanics',
      badge: 'Garage Triage',
    },
    {
      name: 'Revfin Services',
      tag: 'EV Lending & Fintech',
      scope: 'Telematics & Risk Analysts',
      badge: 'FTE Placement',
    },
  ];

  const executionSteps = [
    {
      step: '01',
      title: 'Site & Feasibility Audit',
      subtitle: 'Days 1 - 3',
      desc: 'Rigorous ground verification: DISCOM load calculations, transformer capacity, site civil clearances, or customized technical role profiling.',
      deliverables: ['Load Sanction Liaison', 'CAD Station Layout', 'Role Profiling Spec'],
      image: '/images/ev_charging_hub.jpg',
      caption: 'Site Civil & Electrical Feasibility Audit',
    },
    {
      step: '02',
      title: 'Surge Deployment & Compliance',
      subtitle: 'Days 4 - 10',
      desc: 'Rapid execution pipeline: 100% statutory labor verification (PF, ESIC, insurance) and high-voltage electrical hardware commissioning.',
      deliverables: ['100% Statutory Cleared Staff', 'Hardware Grid Sync', 'Safety HSE Certification'],
      image: '/images/corporate_staffing_team.jpg',
      caption: 'Vetted Technical Teams & 100% Statutory Clearance',
    },
    {
      step: '03',
      title: 'SLA-Backed Operations & AMC',
      subtitle: 'Day 11 Onwards',
      desc: 'Continuous operational excellence: Trained shift supervisors on ground, 24/7 uptime monitoring, and zero-downtime preventive maintenance.',
      deliverables: ['99.4% Station Uptime', 'Periodic Statutory Audit', 'Dedicated Account Lead'],
      image: '/images/smart_factory_iot.jpg',
      caption: 'Zero-Downtime Shift Operations & Machine AMC',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Hub (Editorial Consulting Partner Boardroom) */}
      <section className="bg-brand-dark text-white overflow-hidden pt-32 pb-16 md:pt-44 md:pb-28 relative">
        {/* Boardroom Consulting Photo Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/hero_consulting_meeting.jpg"
            alt="Pinnacle Strategic Consulting Executive Boardroom"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Extended progressive fade: covers text area comfortably and smoothly feathers out towards the right edge */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Ambient floating orbs for depth */}
        <FloatingOrb className="-top-40 right-[-10rem] hidden md:block" colorClass="bg-brand-light/15" delay={0} />
        <FloatingOrb className="bottom-[-14rem] left-[-12rem] hidden md:block" size={560} colorClass="bg-brand-dark-4/40" delay={2.5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-black/30 rounded-full px-4 py-1.5 mb-6 border border-white/20 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-light" />
              <span className="text-brand-light font-bold text-xs uppercase tracking-wider">
                Industrial & Clean Mobility Consulting • Gurugram HQ
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight mb-6 drop-shadow-md">
              {[
                <span key="l1" className="block">Powering Industries</span>,
                <span key="l2" className="block">
                  with <span className="text-brand-light">Talent, Tech &</span>
                </span>,
                <span key="l3" className="block text-brand-light">Transformation.</span>,
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
              className="text-slate-100 text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-2xl drop-shadow-sm"
            >
              Founded in Jan 2025 by operators from EV and industrial consulting. We deliver vetted technical talent, 50MW+ EV charging networks, smart factory automation, and proprietary sector intelligence across India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-10"
            >
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
                >
                  <span>Commission Project Mandate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 text-brand-light" />
                  <span>Download Corporate Deck</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Verified Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/10 max-w-2xl mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
                  <CountUp to={50} duration={2} digitEffect="slide" />
                  <span>MW+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  EV Infra Capacity
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
                  <CountUp to={500} separator="," duration={2.2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Recruited Talent
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
                  <CountUp to={200} duration={2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Infra Locations
                </div>
              </div>
            </div>

            {/* Editorial Quick Practice Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                EV Infrastructure
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Strategic Staffing
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Industry 4.0
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Market Research
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Architectural Client Trust Marquee (Inspiration: Vercel / Ramp Spotlight Grid) */}
      <section className="py-16 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                Verified Client Engagements
              </span>
              <h2 className="text-2xl font-bold text-brand-ink">
                Trusted by India's High-Growth Industrial Leaders
              </h2>
            </div>
            <Link
              to="/impact"
              className="text-xs font-bold text-brand-ink hover:text-emerald-700 flex items-center gap-1.5 transition-colors group"
            >
              <span>Explore Verified Client Case Studies</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CompanyLogos variant="grid" />
          </ScrollReveal>
        </div>
      </section>

      {/* 3. The 4 Strategic Practices — Asymmetrical Master Bento Grid (Inspiration: Apple Pro & Linear) */}
      <section className="py-16 md:py-24 bg-dots-light relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="max-w-2xl mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Execution Architecture
            </span>
            <WordReveal
              as="h2"
              text="Our 4 Strategic Practices"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight leading-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-sm sm:text-base leading-relaxed">
              Every practice is led by verified domain operators with ground execution responsibility. No siloed theory — only measurable turnaround.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: Manpower Staffing */}
            <ScrollReveal direction="up" delay={0.05} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 01
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">Manpower Staffing</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      5-15 Days TAT
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-sm leading-relaxed mb-6">
                    Strategic CXO & specialized technical placements alongside contractual blue & white-collar workforce deployments. 100% statutory labor, PF, ESIC, and payroll compliance guaranteed.
                  </p>

                  {/* Sourcing Velocity Stepper Strip */}
                  <div className="bg-brand-bg border border-brand-edge rounded-2xl p-4.5 mb-6">
                    <div className="text-xs font-bold text-brand-ink mb-3 flex items-center justify-between">
                      <span>Talent Pipeline Velocity</span>
                      <span className="text-emerald-700 font-bold">100% Audited</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-semibold">
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">1. Sourced</div>
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">2. Tech Screened</div>
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">3. Statutory KYC</div>
                      <div className="bg-brand-dark text-brand-light py-2 rounded-xl font-bold flex items-center justify-center gap-1">
                        <span>4. On-Site</span>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2.5 text-xs font-semibold text-brand-muted mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Zero Labor Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Surge Scalability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>500+ Placed Roles</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <span className="text-xs text-brand-muted">Led by Shikha Gupta (MBA HR, 10+ Yrs)</span>
                  <Link
                    to="/staffing"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent px-6 py-3 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>Explore Staffing Solutions</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 2: EV Infrastructure & AMC */}
            <ScrollReveal direction="up" delay={0.1} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 02
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">EV Infrastructure & AMC</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      50MW+ Managed
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-sm leading-relaxed mb-6">
                    Turnkey site feasibility, DISCOM load approvals, DC fast charger commissioning, battery swapping station attendants, and 24/7 preventive maintenance.
                  </p>

                  {/* Real photo thumbnail with telemetry overlay */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 h-44 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src="/images/ev_charging_hub.jpg"
                      alt="EV Fast Charging Setup"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      <div className="text-white text-xs font-bold flex items-center justify-between w-full">
                        <span>200+ Footprint Locations</span>
                        <span className="text-brand-light">99.4% SLA</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-brand-muted mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>DISCOM liaison & transformer feasibility</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Trained station attendants & diagnostic technicians</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <span className="text-xs text-brand-muted">Hero • Sun Mobility • Gentari</span>
                  <Link
                    to="/tech-ev"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent px-6 py-3 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>Commission EV Hubs</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 3: Industry 4.0 & Smart Factory */}
            <ScrollReveal direction="up" delay={0.15} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold">
                        <Cpu className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 03
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">Industry 4.0 & Automation</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Zero Downtime
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-sm leading-relaxed mb-6">
                    Transforming manufacturing floors into agile, connected operations using non-invasive IoT sensors, SCADA dashboards, and predictive maintenance ML.
                  </p>

                  {/* Industrial photo thumbnail */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 h-44 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src="/images/smart_factory_iot.jpg"
                      alt="Smart Factory Automation"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                      <div className="text-white text-xs font-bold flex items-center justify-between w-full">
                        <span>Live OEE Monitoring</span>
                        <span className="text-brand-light">Acoustic / Vibration ML</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-brand-muted mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Real-time OEE, energy & line bottleneck telemetry</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Predictive vibration & anomaly triggers</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <span className="text-xs text-brand-muted">Brownfield & Greenfield Retrofit</span>
                  <Link
                    to="/industry-4-0"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent px-6 py-3 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>Factory Digital Audit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 4: Market Research Reports */}
            <ScrollReveal direction="up" delay={0.2} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 04
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">Strategic Market Research</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Primary Data
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-sm leading-relaxed mb-6">
                    Proprietary sectoral forecasts, OEM component benchmarking, battery chemistry comparative models, and Voice of Customer (VoC) studies to de-risk high-stakes capital decisions.
                  </p>

                  {/* Research Highlights Box */}
                  <div className="bg-brand-bg border border-brand-edge rounded-2xl p-4.5 mb-6">
                    <div className="grid sm:grid-cols-3 gap-3 text-xs font-medium text-brand-muted">
                      <div>
                        <div className="text-brand-ink font-bold text-sm mb-1">+28.4% CAGR</div>
                        <div className="text-[11px] text-brand-muted">Commercial EV Adoption</div>
                      </div>
                      <div>
                        <div className="text-brand-ink font-bold text-sm mb-1">OEM Benchmarks</div>
                        <div className="text-[11px] text-brand-muted">Tier-1 Sourcing Audits</div>
                      </div>
                      <div>
                        <div className="text-brand-ink font-bold text-sm mb-1">OPEX Models</div>
                        <div className="text-[11px] text-brand-muted">Swapping vs Charging</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2.5 text-xs font-semibold text-brand-muted mb-6">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Ground OEM Surveys</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>DISCOM Tariff Models</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Custom Dossiers</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <span className="text-xs text-brand-muted">Commission Proprietary Study</span>
                  <Link
                    to="/market-research"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent px-6 py-3 rounded-full font-bold text-xs transition-colors shadow-sm"
                  >
                    <span>Explore Research Scopes</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. The Pinnacle Execution Runway (Exact Reference Match: Expanding Cards with Compact Height) */}
      <section className="py-14 md:py-20 bg-brand-card border-y border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          {/* Header styled exactly like reference image */}
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight leading-tight">
                Proven Blueprint <br />
                for <span className="text-brand-light-2">Ground Turnaround</span>
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-ink hover:text-brand-light-2 transition-colors group mb-1"
            >
              <span>Read More</span>
              <div className="w-8 h-8 rounded-full border border-brand-edge flex items-center justify-center group-hover:border-brand-light-2 group-hover:bg-brand-light-2 group-hover:text-white transition-all">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </ScrollReveal>

          {/* Horizontal Expanding Cards with Compact Height (lg:h-[350px]) */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex flex-col lg:flex-row gap-5 items-stretch lg:h-[350px]">
              {executionSteps.map((s, idx) => {
                const isExpanded = activeStep === idx;
                return (
                  <div
                    key={s.step}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    className={`rounded-[2.25rem] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden relative group ${
                      isExpanded
                        ? 'h-[520px] sm:h-[420px] lg:h-[350px] lg:flex-[2.6] bg-brand-card border border-brand-edge shadow-xl'
                        : 'h-[220px] lg:h-[350px] lg:flex-1 bg-gradient-to-b from-brand-tint-1 via-brand-tint-2 to-brand-tint-3 border border-brand-tint-4 hover:border-brand-tint-5'
                    }`}
                  >
                    <AnimatePresence initial={false}>
                      {isExpanded ? (
                        /* Expanded Card (Matches reference card 2/3: Title, Desc, Read More button + Rounded Image on Right) */
                        <motion.div
                          key={`expanded-${s.step}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="absolute inset-0 p-6 sm:p-7 lg:p-8 flex items-center justify-between overflow-hidden w-full lg:min-w-[560px]"
                        >
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 h-full w-full">
                            {/* Left Details */}
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.35, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                              className="flex-1 flex flex-col justify-between h-full py-0.5 w-full"
                            >
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-[11px] font-bold text-brand-light-2 uppercase tracking-wider font-mono">
                                    Phase {s.step}
                                  </span>
                                  <span className="text-[10px] font-bold bg-slate-100 text-brand-muted px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    {s.subtitle}
                                  </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-brand-ink leading-snug tracking-tight mb-2.5">
                                  {s.title}
                                </h3>

                                <p className="text-xs sm:text-[13px] text-slate-500 font-normal leading-relaxed max-w-sm line-clamp-3 mb-3.5">
                                  {s.desc}
                                </p>

                                <div className="flex items-center gap-2 text-[11px] font-semibold text-brand-muted bg-slate-50 border border-brand-edge rounded-lg px-2.5 py-1 w-fit mb-2">
                                  <Check className="w-3 h-3 text-brand-light-2 stroke-[3]" />
                                  <span>Core: {s.deliverables[0]}</span>
                                </div>
                              </div>

                              <div className="pt-2 flex items-center">
                                <Link
                                  to="/contact"
                                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-ink hover:text-brand-light-2 transition-colors group/btn"
                                >
                                  <span>Read More</span>
                                  <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold shadow-sm group-hover/btn:bg-brand-light-2 group-hover/btn:text-white transition-all">
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                  </div>
                                </Link>
                              </div>
                            </motion.div>

                            {/* Right Squircle Image (Smooth Scale and Fade Entrance) */}
                            <motion.div
                              initial={{ opacity: 0, scale: 0.94 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.38, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                              className="w-full sm:w-[200px] lg:w-[230px] h-[170px] sm:h-full shrink-0 relative rounded-[1.75rem] overflow-hidden shadow-sm bg-slate-100"
                            >
                              <img
                                src={s.image}
                                alt={s.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3.5">
                                <span className="text-[11px] font-semibold text-white/95 leading-tight drop-shadow-sm">
                                  {s.caption}
                                </span>
                              </div>
                            </motion.div>
                          </div>
                        </motion.div>
                      ) : (
                        /* Collapsed Card (Matches reference card 1/3: Soft lime background, bold title, watermark circles, Read More + circle arrow button) */
                        <motion.div
                          key={`collapsed-${s.step}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute inset-0 p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden"
                        >
                          {/* Subtle watermark circle art matching reference */}
                          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/25 pointer-events-none" />
                          <div className="absolute bottom-3 left-14 w-24 h-24 rounded-full bg-white/20 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="text-[11px] font-bold text-brand-light-3 uppercase tracking-wider mb-2.5">
                              Phase {s.step} • {s.subtitle}
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-brand-ink leading-snug tracking-tight max-w-[210px]">
                              {s.title}
                            </h3>
                          </div>

                          <div className="pt-6 flex items-center gap-2 relative z-10">
                            <span className="text-xs font-bold text-brand-muted group-hover:text-brand-ink transition-colors">
                              Read More
                            </span>
                            <div className="w-8 h-8 rounded-full bg-white/90 text-slate-800 border border-white/60 flex items-center justify-center font-bold group-hover:bg-brand-light-2 group-hover:text-white transition-colors shadow-sm">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5. Editorial Leadership Showcase (Inspiration: McKinsey / Financial Times Magazine Layout) */}
      <section className="py-16 md:py-24 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-light/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Sticky Editorial Narrative */}
            <ScrollReveal direction="left" className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-3 block">
                Executive Leadership
              </span>
              <WordReveal
                text="Built by operators who’ve built networks — not theoretical consultants."
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-6"
                stagger={0.04}
              />
              <p className="text-slate-300 font-medium text-sm sm:text-base leading-relaxed mb-6">
                Pinnacle Consultant was founded in January 2025 in Gurugram, India. We bring together a rare convergence of deep workforce strategy and heavy automotive/clean mobility infrastructure authority.
              </p>

              <div className="mb-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-7 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
                >
                  <span>Read Complete Founding Story</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm space-y-3 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Building2 className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Headquartered in Gurugram, Haryana</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-light shrink-0" />
                  <span>100% Statutory Labor Code & PF Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Founders Personally Lead Key Enterprise Accounts</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Staggered Executive Profiles */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shikha Gupta Profile */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="bg-brand-dark-2/90 border border-white/10 rounded-[2.5rem] p-7 sm:p-9 md:p-10 backdrop-blur-md hover:bg-brand-dark-4 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-light/40 shadow-lg">
                      <img
                        src="/images/shikha_gupta.jpg"
                        alt="Shikha Gupta - Founder & Workforce Strategist"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center shadow-md">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Shikha Gupta</h3>
                      <div className="text-xs font-bold text-brand-light uppercase tracking-wider">
                        Founder & Workforce Strategist
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-1">
                        MBA (HR) • 10+ Yrs Workforce Architecture
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                    A workforce strategist with a decade of expertise across HR consulting, talent acquisition, SAP HCM implementation, and marketplace-driven hiring ecosystems. Having recruited 500+ professionals, she blends operational rigour with an innate understanding of how mobility and service networks operate.
                  </p>

                  {/* Horizontal Credential Pills with clear breathing room */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-1">
                    <span className="bg-black/30 border border-white/10 text-brand-light text-[11px] font-semibold px-3 py-1 rounded-full">
                      MBA — HR & Marketing
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      10+ Yrs HR Consulting
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      5 Yrs SAP HCM Consultant
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      500+ Recruited Talent
                    </span>
                  </div>

                  <div className="bg-white/5 border-l-2 border-brand-light p-4 rounded-r-xl text-xs text-slate-200 font-medium italic">
                    “We are in the business of enduring relationships — not transactional placement. Compliance and cultural fit come before everything.”
                  </div>
                </div>
              </ScrollReveal>

              {/* Ashu Gupta Profile */}
              <ScrollReveal direction="right" delay={0.2}>
                <div className="bg-brand-dark-2/90 border border-white/10 rounded-[2.5rem] p-7 sm:p-9 md:p-10 backdrop-blur-md hover:bg-brand-dark-4 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-light/40 shadow-lg">
                      <img
                        src="/images/ashu_gupta.jpg"
                        alt="Ashu Gupta - Co-Founder & EV Infrastructure Leader"
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center shadow-md">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Ashu Gupta</h3>
                      <div className="text-xs font-bold text-brand-light uppercase tracking-wider">
                        Co-Founder & EV Infrastructure Leader
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-1">
                        14+ Yrs Auto & Clean Mobility • 50MW+ Deployed
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-medium text-xs sm:text-sm leading-relaxed mb-6">
                    An automotive and EV infrastructure authority with 14+ years of hands-on experience in building and scaling charging networks across India. He has led site acquisition, installation, and infrastructure expansion across 200+ locations, managing 50MW+ charging projects.
                  </p>

                  {/* Horizontal Credential Pills with clear breathing room */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-1">
                    <span className="bg-black/30 border border-white/10 text-brand-light text-[11px] font-semibold px-3 py-1 rounded-full">
                      14+ Yrs Auto & EV
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      200+ Charging Locations
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      50MW+ Projects Managed
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      DISCOM & Grid Authority
                    </span>
                  </div>

                  <div className="bg-white/5 border-l-2 border-brand-light p-4 rounded-r-xl text-xs text-slate-200 font-medium italic">
                    “EV charging isn't just bolting hardware into the ground. It’s power quality, DISCOM coordination, and highly trained technicians ensuring 99%+ uptime.”
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Numbers That Matter (Inspiration: Ramp Minimalist Stat Wall) */}
      <section className="py-14 md:py-20 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center"
          >
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center">
                <CountUp to={50} duration={2} digitEffect="slide" />
                <span>MW+</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">EV Charging Managed</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center">
                <CountUp to={500} separator="," duration={2.2} digitEffect="slide" />
                <span>+</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professionals Recruited</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center">
                <CountUp to={200} duration={2} digitEffect="slide" />
                <span>+</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nationwide Hubs</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center">
                <CountUp to={100} duration={2} digitEffect="slide" />
                <span>%</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statutory Compliance</div>
            </motion.div>
            <motion.div variants={staggerChild} className="col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center">
                <CountUp to={5} duration={1.8} digitEffect="slide" />
                <span>-</span>
                <CountUp to={15} duration={2} digitEffect="slide" />
                <span>d</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Deployment TAT</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 7. Final Consultation Command Console */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8 max-w-6xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-light text-brand-onaccent rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-brand-ink font-bold text-xs uppercase tracking-widest mb-3 block">
              Direct Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 tracking-tight leading-tight">
              Get in touch with us today to grow <br className="hidden md:block" /> your business the smart way.
            </h2>
            <p className="text-brand-ink/85 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Deploy surge teams, scale EV charging corridors, automate shop-floor operations, or commission proprietary market research with Gurugram's fastest-moving practitioners.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-brand-onaccent transition-all shadow-xl"
                >
                  <span>Submit Project Mandate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://wa.me/917879716775"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 text-brand-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white transition-all border border-brand-dark/15 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp: +91-7879716775</span>
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-transparent text-brand-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-black/5 transition-colors border border-brand-dark/25"
                >
                  <Download className="w-4 h-4 text-brand-dark" />
                  <span>Get Corporate Deck</span>
                </button>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Brochure Download Modal */}
      {isBrochureOpen && <BrochureModal onClose={() => setIsBrochureOpen(false)} />}
    </div>
  );
}
