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
  ChevronRight,
  Download,
  Check,
  MessageSquare,
  BadgeCheck,
  Wrench,
  Layers,
  Clock,
} from 'lucide-react';
import SEO from '../components/SEO';

export default function Home() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const clients = [
    {
      name: 'Ather Energy',
      tag: 'Fast-Charging Pioneer',
      scope: 'Charger Maintenance & Grid Operations',
      badge: 'Charger Maintenance',
    },
    {
      name: 'Hero MotoCorp',
      tag: 'Fortune-500 Automotive',
      scope: 'Turnkey EPC Rollouts & Charger Maintenance',
      badge: 'Turnkey EPC',
    },
    {
      name: 'Magenta EV',
      tag: 'Clean Fleet & Charging',
      scope: 'Pan-India Charging & Parking Network Services',
      badge: 'Parking & Charging',
    },
    {
      name: 'FEPL',
      tag: 'EV Infrastructure',
      scope: 'Charging Parking Station Network Services',
      badge: 'Parking & Charging',
    },
    {
      name: 'Vertiv EV',
      tag: 'Critical Digital Infra',
      scope: 'Charging Parking Power Solutions & AMC',
      badge: 'Power & Infra',
    },
  ];

  const executionSteps = [
    {
      step: '01',
      title: 'Site & Feasibility Audit',
      subtitle: 'Days 1 - 3',
      desc: 'On-ground site assessment: DISCOM load calculations, transformer capacity, site civil clearances, or customized technical role profiling.',
      deliverables: ['DISCOM Load Clearance', 'CAD Station Layout', 'Role Specification'],
      image: '/images/ev_charging_hub.jpg',
      caption: 'Site Civil & Electrical Feasibility Audit',
    },
    {
      step: '02',
      title: 'Surge Deployment & Compliance',
      subtitle: 'Days 4 - 10',
      desc: 'Deployment and compliance: complete statutory labor verification (PF, ESIC, insurance) and high-voltage electrical hardware commissioning.',
      deliverables: ['Statutory Verified Staff', 'Hardware Grid Sync', 'HSE Safety Certification'],
      image: '/images/corporate_staffing_team.jpg',
      caption: 'Vetted Technical Teams & 100% Statutory Clearance',
    },
    {
      step: '03',
      title: 'SLA-Backed Operations & AMC',
      subtitle: 'Day 11 Onwards',
      desc: 'Ongoing operations: dedicated shift supervisors on site, 24/7 uptime monitoring, and scheduled preventive maintenance.',
      deliverables: ['99.4% Station Uptime', 'Monthly Compliance Audits', 'Dedicated Account Lead'],
      image: '/images/smart_factory_iot.jpg',
      caption: 'Zero-Downtime Shift Operations & Machine AMC',
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="Pinnacle Consultant | Industrial Staffing & Clean Mobility Solutions"
        description="Pinnacle Consultant is an industrial & clean mobility consulting firm specializing in Manpower Staffing, EV Infrastructure & AMC, Industry 4.0 Automation, and Market Research."
        keywords="manpower staffing India, contract staffing EV sector, EV charging infrastructure consultants, Industry 4.0 consulting India, smart factory IoT, market research reports, Pinnacle Consultant Gurugram"
        canonicalPath="/"
      />
      {/* Hero Section */}
      <section className="bg-brand-dark text-white overflow-hidden pt-32 pb-16 md:pt-44 md:pb-28 relative">
        {/* Background photo & overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/hero_consulting_meeting.jpg"
            alt="Pinnacle Strategic Consulting Executive Boardroom"
            className="w-full h-full object-cover object-[center_35%]"
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>

        {/* Ambient decorative glow */}
        <FloatingOrb className="-top-40 right-[-10rem] hidden md:block" colorClass="bg-brand-light/15" delay={0} />
        <FloatingOrb className="bottom-[-14rem] left-[-12rem] hidden md:block" size={560} colorClass="bg-brand-dark-4/40" delay={2.5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.08] tracking-tight mb-6 drop-shadow-md">
              {[
                <span key="l1" className="block">Powering Industries</span>,
                <span key="l2" className="block">
                  with <span className="text-brand-light">Talent, Tech &amp;</span>
                </span>,
                <span key="l3" className="block text-brand-light">Field Execution.</span>,
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
              className="text-slate-100 text-lg sm:text-xl font-medium leading-relaxed mb-8 max-w-2xl drop-shadow-sm text-pretty"
            >
              Founded by operators with 14+ years across automotive, clean mobility, and HR consulting. We deliver nationwide EV charging and parking networks, specialized technical staffing, intelligent automation solutions, and primary market research across India.
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
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors duration-150 active:scale-[0.96] shadow-lg"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-6 pr-5 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors duration-150 active:scale-[0.96] backdrop-blur-sm cursor-pointer"
                >
                  <Download className="w-4 h-4 text-brand-light" />
                  <span>Download Corporate Deck</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Verified Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 border-t border-white/10 max-w-2xl mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={200} duration={2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Locations Supported
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={99.4} decimals={1} duration={2} digitEffect="slide" />
                  <span>%</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Charger Uptime SLA
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={500} separator="," duration={2.2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Talent Recruited
                </div>
              </div>
            </div>

            {/* Practice Badges with Refined Monoline Icons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-brand-light text-brand-onaccent px-4 py-2 rounded-full text-xs font-bold shadow-md inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>EV Charging &amp; Parking Network</span>
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-brand-light" />
                <span>Charger Maintenance &amp; AMC</span>
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-brand-light" />
                <span>Turnkey EPC Services</span>
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-brand-light" />
                <span>Strategic Staffing</span>
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200 inline-flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-brand-light" />
                <span>Intelligent Automation Solutions</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Client Trust Marquee */}
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
              className="text-xs font-bold text-brand-ink hover:text-emerald-700 flex items-center gap-1.5 transition-colors group py-2"
            >
              <span>Explore Client Case Studies</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CompanyLogos variant="grid" />
          </ScrollReveal>
        </div>
      </section>

      {/* Strategic Practices */}
      <section className="py-16 md:py-24 bg-dots-light relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="max-w-2xl mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Execution Architecture
            </span>
            <WordReveal
              as="h2"
              text="Our 4 Core Practices"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight leading-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-base leading-relaxed">
              Each practice is led by experienced domain operators with direct responsibility for on-ground execution.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* Card 1: EV Charging, Parking & EPC Services (Flagship Spotlight) */}
            <ScrollReveal direction="up" delay={0.05} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-brand-light/40 shadow-lg hover:shadow-2xl transition-[box-shadow,border-color,transform] duration-200 ease-out flex flex-col justify-between group relative overflow-hidden"
              >
                {/* Subtle top ambient glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-brand-light/10 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold shadow-sm">
                        <Zap className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 01 • Flagship Focus
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">EV Charging &amp; Parking Network</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Pan-India Network
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-[15px] leading-relaxed mb-6">
                    Nationwide charging and parking network operations, SLA-backed charger maintenance, and turnkey EPC installations across prime urban and highway hubs.
                  </p>

                  {/* Real photo thumbnail with telemetry overlay */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 h-44 group-hover:scale-[1.02] transition-transform duration-500">
                    <img
                      src="/images/ev_charging_hub.jpg"
                      alt="EV Fast Charging Setup"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-black/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex items-end p-4">
                      <div className="text-white text-xs font-bold flex items-center justify-between w-full tabular-nums">
                        <span>200+ Footprint Locations</span>
                        <span className="text-brand-light font-extrabold">99.4% Uptime SLA</span>
                      </div>
                    </div>
                  </div>

                  {/* Three Core EV Services Breakdown */}
                  <div className="space-y-2.5 mb-6">
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-start gap-2.5">
                      <Wrench className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-brand-ink block">1. Charger Maintenance Services</span>
                        <span className="text-[11px] text-brand-muted">Certified EV technicians &amp; mobile vans keeping 99.4% uptime (Ather, Hero MotoCorp).</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-start gap-2.5">
                      <Layers className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-brand-ink block">2. Parking &amp; Charging Services</span>
                        <span className="text-[11px] text-brand-muted">Nationwide charging parking network across the country (Magenta EV, FEPL, Vertiv EV).</span>
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-brand-ink block">3. EPC Services (Installation &amp; Commissioning)</span>
                        <span className="text-[11px] text-brand-muted">Turnkey civil engineering, DISCOM load liaison, transformer sizing &amp; CMS pairing.</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-3 mt-auto">
                  <span className="text-xs font-medium text-brand-muted">Ather • Hero • Magenta EV • FEPL • Vertiv EV</span>
                  <Link
                    to="/tech-ev"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent pl-6 pr-5 py-3 min-h-11 rounded-full font-bold text-xs transition-colors duration-150 active:scale-[0.96] shadow-sm"
                  >
                    <span>Explore EV Solutions</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 2: Manpower Staffing */}
            <ScrollReveal direction="up" delay={0.1} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-brand-dark text-brand-light flex items-center justify-center font-bold">
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block">
                          Practice 02
                        </span>
                        <h3 className="text-2xl font-bold text-brand-ink">Manpower Staffing</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider tabular-nums">
                      5-15 Days TAT
                    </span>
                  </div>

                  <p className="text-brand-muted font-medium text-[15px] leading-relaxed mb-6 text-pretty">
                    Specialized technical recruitment and contractual workforce deployment across India. Complete statutory compliance for PF, ESIC, and payroll guaranteed.
                  </p>

                  {/* Sourcing Velocity Stepper Strip */}
                  <div className="bg-brand-bg border border-brand-edge rounded-2xl p-4.5 mb-6">
                    <div className="text-xs font-bold text-brand-ink mb-3 flex items-center justify-between">
                      <span>Deployment Pipeline</span>
                      <span className="text-emerald-700 font-bold">100% Verified</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-semibold tabular-nums">
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">1. Sourced</div>
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">2. Tech Screened</div>
                      <div className="bg-white border border-brand-edge py-2 rounded-xl text-brand-ink">3. Statutory KYC</div>
                      <div className="bg-brand-dark text-brand-light py-2 rounded-xl font-bold flex items-center justify-center gap-1">
                        <span>4. On-Site</span>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-2.5 text-xs font-semibold text-brand-muted mb-6 tabular-nums">
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
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent pl-6 pr-5 py-3 min-h-11 rounded-full font-bold text-xs transition-colors duration-150 active:scale-[0.96] shadow-sm"
                  >
                    <span>Explore Staffing Solutions</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 3: Intelligent Automation Solutions */}
            <ScrollReveal direction="up" delay={0.15} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between group"
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
                        <h3 className="text-2xl font-bold text-brand-ink">Intelligent Automation Solutions</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      SMARTER OPERATIONS. BETTER OUTCOMES.
                    </span>
                  </div>

                  <div className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-3">
                    Automation for enterprises, workplaces, homes and industrial environments
                  </div>

                  <p className="text-brand-muted font-medium text-[15px] leading-relaxed mb-6 text-pretty">
                    We design and enable intelligent automation solutions that simplify processes, connect systems, reduce manual effort and improve operational efficiency — from smart homes and corporate offices to enterprise workflows and industrial environments.
                  </p>

                  {/* Multi-Domain Coverage Breakdown */}
                  <div className="grid grid-cols-2 gap-2.5 mb-6 text-xs font-semibold text-brand-muted">
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-brand-ink text-[11px] font-bold">Smart Homes &amp; Living</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-brand-ink text-[11px] font-bold">Offices &amp; Facilities</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-brand-ink text-[11px] font-bold">Industrial Plant IoT</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-brand-bg border border-brand-edge flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="text-brand-ink text-[11px] font-bold">Enterprise Workflows</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-brand-edge flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto">
                  <div className="flex items-center gap-2 text-xs text-brand-muted">
                    <Clock className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Solution deployment: <strong className="font-bold text-brand-ink">Based on scope</strong></span>
                  </div>
                  <Link
                    to="/industry-4-0"
                    className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent pl-6 pr-5 py-3 min-h-11 rounded-full font-bold text-xs transition-colors duration-150 active:scale-[0.96] shadow-sm"
                  >
                    <span>Explore Automation Solutions</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>

            {/* Card 4: Market Research Reports */}
            <ScrollReveal direction="up" delay={0.2} className="flex flex-col">
              <TiltCard
                maxTilt={4}
                lift={8}
                className="bg-brand-card rounded-3xl p-6 sm:p-8 md:p-10 border border-brand-edge shadow-md hover:shadow-xl transition-shadow duration-200 flex flex-col justify-between group"
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

                  <p className="text-brand-muted font-medium text-[15px] leading-relaxed mb-6 text-pretty">
                    Proprietary sectoral forecasts, OEM component benchmarking, battery chemistry comparative models, and Voice of Customer (VoC) studies to de-risk high-stakes capital decisions.
                  </p>

                  {/* Research Highlights Box */}
                  <div className="bg-brand-bg border border-brand-edge rounded-2xl p-4.5 mb-6">
                    <div className="grid sm:grid-cols-3 gap-3 text-xs font-medium text-brand-muted">
                      <div>
                        <div className="text-brand-ink font-bold text-sm mb-1 tabular-nums">+28.4% CAGR</div>
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
                  <span className="text-xs text-brand-muted">Primary Field Data</span>
                  <Link
                    to="/market-research"
                    className="inline-flex items-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent pl-6 pr-5 py-3 min-h-11 rounded-full font-bold text-xs transition-colors duration-150 active:scale-[0.96] shadow-sm"
                  >
                    <span>View Research Services</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </TiltCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Execution Runway */}
      <section className="py-14 md:py-20 bg-brand-card border-y border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">
                Our Process
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight leading-tight">
                How We Deliver <br />
                on <span className="text-brand-ink underline decoration-brand-light decoration-4 underline-offset-4">the Ground</span>
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-xs font-bold text-brand-ink hover:text-brand-light-2 transition-colors group mb-1 py-2"
            >
              <span>Talk to Our Team</span>
              <div className="w-8 h-8 rounded-full border border-brand-edge flex items-center justify-center group-hover:border-brand-light-2 group-hover:bg-brand-light-2 group-hover:text-white transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.96]">
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
                    role="button"
                    tabIndex={0}
                    aria-pressed={activeStep === idx}
                    onMouseEnter={() => setActiveStep(idx)}
                    onClick={() => setActiveStep(idx)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveStep(idx);
                      }
                    }}
                    className={`rounded-[2.25rem] transition-[flex,height,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer overflow-hidden relative group ${isExpanded
                        ? 'h-[540px] sm:h-[420px] lg:h-[350px] lg:flex-[2.6] bg-brand-card border border-brand-edge shadow-xl'
                        : 'h-[220px] lg:h-[350px] lg:flex-1 bg-gradient-to-b from-brand-tint-1 via-brand-tint-2 to-brand-tint-3 border border-brand-tint-4 hover:border-brand-tint-5'
                      }`}
                  >
                    <AnimatePresence initial={false}>
                      {isExpanded ? (
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
                                  <span className="text-[11px] font-bold text-brand-light-2 uppercase tracking-wider">
                                    Phase {s.step}
                                  </span>
                                  <span className="text-[10px] font-bold bg-slate-100 text-brand-muted px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                                    {s.subtitle}
                                  </span>
                                </div>

                                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-brand-ink leading-snug tracking-tight mb-2.5">
                                  {s.title}
                                </h3>

                                <p className="text-[13px] text-slate-500 font-normal leading-relaxed max-w-sm line-clamp-3 mb-3.5">
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
                                  className="inline-flex items-center gap-2 text-xs font-bold text-brand-ink hover:text-brand-light-2 transition-colors group/btn py-2"
                                >
                                  <span>Get in Touch</span>
                                  <div className="w-8 h-8 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold shadow-sm group-hover/btn:bg-brand-light-2 group-hover/btn:text-white transition-[color,background-color,transform] duration-200 active:scale-[0.96]">
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
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 outline outline-1 -outline-offset-1 outline-black/10"
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
                        <motion.div
                          key={`collapsed-${s.step}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="absolute inset-0 p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden"
                        >
                          <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/25 pointer-events-none" />
                          <div className="absolute bottom-3 left-14 w-24 h-24 rounded-full bg-white/20 pointer-events-none" />

                          <div className="relative z-10">
                            <div className="text-[11px] font-bold text-brand-light-3 uppercase tracking-wider mb-2.5 tabular-nums">
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
                            <div className="w-8 h-8 rounded-full bg-white/90 text-slate-800 border border-white/60 flex items-center justify-center font-bold group-hover:bg-brand-light-2 group-hover:text-white transition-colors duration-150 active:scale-[0.96] shadow-sm">
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

      {/* Executive Leadership */}
      <section className="py-16 md:py-24 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-light/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Left Editorial Narrative */}
            <ScrollReveal direction="left" className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-3 block">
                Executive Leadership
              </span>
              <WordReveal
                text="Founded by industry operators with direct field experience."
                className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight mb-6"
                stagger={0.04}
              />
              <p className="text-slate-300 font-medium text-[15px] sm:text-base leading-relaxed mb-6 text-pretty">
                Pinnacle Consultant was founded in January 2025 in Gurugram, Haryana. We combine experienced workforce management with hands-on automotive and clean mobility infrastructure expertise.
              </p>

              <div className="mb-8">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-7 pr-6 py-3.5 rounded-full font-bold text-sm hover:bg-white transition-colors duration-150 active:scale-[0.96] shadow-lg"
                >
                  <span>About Our Founders</span>
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
                  <span>100% Statutory Labor Code &amp; PF Compliance</span>
                </div>
                <div className="flex items-center gap-3">
                  <BadgeCheck className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Founders Personally Oversee Key Client Accounts</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Executive Profiles */}
            <div className="lg:col-span-7 space-y-8">
              {/* Shikha Gupta Profile */}
              <ScrollReveal direction="right" delay={0.1}>
                <div className="bg-brand-dark-2/90 border border-white/10 rounded-[2.5rem] p-7 sm:p-9 md:p-10 backdrop-blur-md hover:bg-brand-dark-4 transition-colors">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-brand-light/40 shadow-lg">
                      <img
                        src="/images/shikha_gupta.jpg"
                        alt="Shikha Gupta - Founder &amp; Workforce Strategist"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10"
                      />
                      <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center shadow-md">
                        <Users className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Shikha Gupta</h3>
                      <div className="text-xs font-bold text-brand-light uppercase tracking-wider">
                        Founder &amp; Workforce Strategist
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-1 tabular-nums">
                        MBA (HR) • 10+ Yrs Workforce Architecture
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-medium text-[15px] sm:text-sm leading-relaxed mb-6 text-pretty">
                    A workforce strategist with 10+ years of experience across HR consulting, talent acquisition, and SAP HCM implementation. Having placed more than 500 professionals, she brings practical operational discipline to technical and field recruitment.
                  </p>

                  {/* Horizontal Credential Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-1 tabular-nums">
                    <span className="bg-black/30 border border-white/10 text-brand-light text-[11px] font-semibold px-3 py-1 rounded-full">
                      MBA in HR &amp; Marketing
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
                    “We focus on long-term operating partnerships rather than transactional placements. Statutory compliance and role readiness guide every hire.”
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
                        alt="Ashu Gupta - Co-Founder &amp; EV Infrastructure Leader"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10"
                      />
                      <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center shadow-md">
                        <Zap className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1">Ashu Gupta</h3>
                      <div className="text-xs font-bold text-brand-light uppercase tracking-wider">
                        Co-Founder &amp; EV Infrastructure Leader
                      </div>
                      <div className="text-[11px] text-slate-300 font-medium mt-1 tabular-nums">
                        14+ Yrs Auto &amp; Clean Mobility • Pan-India EV Network
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-300 font-medium text-[15px] sm:text-sm leading-relaxed mb-6 text-pretty">
                    An automotive and clean energy leader with 14+ years of hands-on experience building and operating charging networks across India. He has led site acquisition, power liaison, and turnkey infrastructure installations across 200+ locations nationwide.
                  </p>

                  {/* Horizontal Credential Pills */}
                  <div className="flex flex-wrap gap-2 mb-6 pt-1 tabular-nums">
                    <span className="bg-black/30 border border-white/10 text-brand-light text-[11px] font-semibold px-3 py-1 rounded-full">
                      14+ Yrs Auto &amp; EV
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      200+ Charging Locations
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      Pan-India Network
                    </span>
                    <span className="bg-black/30 border border-white/10 text-slate-200 text-[11px] font-semibold px-3 py-1 rounded-full">
                      DISCOM &amp; Grid Authority
                    </span>
                  </div>

                  <div className="bg-white/5 border-l-2 border-brand-light p-4 rounded-r-xl text-xs text-slate-200 font-medium italic">
                    “Reliable EV charging comes down to disciplined electrical liaison, quality hardware setup, and trained field technicians maintaining high uptime.”
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Operational Metrics */}
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
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center tabular-nums">
                <CountUp to={99.4} decimals={1} duration={2} digitEffect="slide" />
                <span>%</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Charger Uptime SLA</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center tabular-nums">
                <CountUp to={500} separator="," duration={2.2} digitEffect="slide" />
                <span>+</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professionals Recruited</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center tabular-nums">
                <CountUp to={200} duration={2} digitEffect="slide" />
                <span>+</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nationwide Hubs</div>
            </motion.div>
            <motion.div variants={staggerChild}>
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center tabular-nums">
                <CountUp to={100} duration={2} digitEffect="slide" />
                <span>%</span>
              </div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Statutory Compliance</div>
            </motion.div>
            <motion.div variants={staggerChild} className="col-span-2 lg:col-span-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-ink mb-2 tracking-tight inline-flex items-baseline justify-center tabular-nums">
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

      {/* Consultation Partnership */}
      <section className="py-16 md:py-24 container mx-auto px-4 md:px-8 max-w-6xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-light text-brand-onaccent rounded-[2.5rem] p-6 sm:p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/20 rounded-full blur-2xl pointer-events-none" />

            <span className="text-brand-ink font-bold text-xs uppercase tracking-widest mb-3 block">
              Direct Partnership
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-6 tracking-tight leading-tight">
              Ready to scale your workforce <br className="hidden md:block" /> or clean mobility infrastructure?
            </h2>
            <p className="text-brand-ink/85 text-base md:text-lg max-w-2xl mx-auto mb-10 font-medium leading-relaxed text-pretty">
              Deploy surge teams, build EV charging hubs, automate shop-floor operations, or commission targeted market research with our experienced team in Gurugram.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-dark text-white pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white hover:text-brand-onaccent transition-[color,background-color,transform] duration-200 active:scale-[0.96] shadow-xl"
                >
                  <span>Contact Our Team</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://wa.me/917000081129"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-white/90 text-brand-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-white transition-[color,background-color,transform] duration-200 active:scale-[0.96] border border-brand-dark/15 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span className="tabular-nums">WhatsApp: +91-7000081129</span>
                </a>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-transparent text-brand-dark px-6 py-3.5 rounded-full font-semibold text-sm hover:bg-black/5 transition-colors duration-200 active:scale-[0.96] border border-brand-dark/25 cursor-pointer"
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
