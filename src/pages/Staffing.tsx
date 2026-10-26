import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CountUp } from '@/components/ui/count-up';
import BrochureModal from '../components/BrochureModal';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import {
  Clock,
  TrendingUp,
  ShieldCheck,
  Code2,
  Zap,
  MapPin,
  Briefcase,
  ChevronRight,
  X,
  ArrowUpRight,
  UserCheck,
  CheckCircle2,
  Download,
  Users,
  Check,
  Cpu,
  FileText,
  BadgeCheck,
  SlidersHorizontal,
} from 'lucide-react';

import SEO from '../components/SEO';

export default function Staffing() {
  const [hiresCount, setHiresCount] = useState(50);
  const [staffingModel, setStaffingModel] = useState<'contractual' | 'lateral'>('contractual');
  const [activeVertical, setActiveVertical] = useState<string | null>(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const staffingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Specialized Technical & Contract Staffing',
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
    description: 'High-volume technical recruitment and contract staffing across EV, Clean Mobility, IT, and Industry 4.0 with 100% statutory labor compliance (PF, ESIC).',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Scoped proposal with guaranteed 5 to 15 day fulfillment and 48-hour backfill SLA.',
    },
  };

  const verticals = [
    {
      id: 'ev',
      icon: Zap,
      title: 'EV & Clean Mobility',
      subtitle: 'High-voltage technicians & battery engineers',
      badge: 'Pan-India EV Network',
      desc: 'Specialized electrical, mechanical, and BMS engineers trained to operate in high-voltage charging networks, OEM plants, and testing depots.',
      tat: '7-14 Days',
      profiles: [
        'BMS & Firmware Calibration Engineers',
        'High-Voltage DC Charger Technicians',
        'Battery Pack Assembly Specialists',
        'CPO Station Supervisors & Site Leads',
      ],
      onboarding: 'HSE Safety Certified & High-Voltage Cleared',
    },
    {
      id: 'it',
      icon: Code2,
      title: 'IT & Cloud Architecture',
      subtitle: 'Developers, architects & digital creators',
      badge: 'Top 3% Technical Screening',
      desc: 'Pre-vetted software engineering teams proficient across modern enterprise stacks, cloud migrations, mobile ecosystems, and API integrations.',
      tat: '5-12 Days',
      profiles: [
        'Full-Stack Engineers (React, Node, Go)',
        'AWS & Azure Cloud DevOps Architects',
        'Data Engineers & BI Analysts',
        'QA Automation & Performance Testers',
      ],
      onboarding: 'Git Portfolio & Live Coding Benchmark Passed',
    },
    {
      id: 'automation',
      icon: Cpu,
      title: 'Industry 4.0 & Plant Automation',
      subtitle: 'Factory supervisors & PLC programmers',
      badge: 'Zero-Downtime Certified',
      desc: 'Hands-on industrial automation operators, SCADA integrators, and plant floor supervisors ensuring 24/7 continuous manufacturing runtimes.',
      tat: '7-15 Days',
      profiles: [
        'Siemens & Allen-Bradley PLC Programmers',
        'Industrial SCADA & IoT Integrators',
        'Plant Shift Maintenance Supervisors',
        'Electro-Mechanical Service Engineers',
      ],
      onboarding: 'OSHA & Machine Safety Standard Compliant',
    },
    {
      id: 'field',
      icon: MapPin,
      title: 'Field Operations & Corporate',
      subtitle: 'On-ground expansion & back-office support',
      badge: 'Pan-India Ground Footprint',
      desc: 'Target-driven sales representatives, field audit technicians, procurement specialists, and enterprise support staff for fast rollouts.',
      tat: '3-10 Days',
      profiles: [
        'B2B Territory Account Managers',
        'Site Acquisition & Field Surveyors',
        'Supply Chain & Billing Specialists',
        'Executive Assistants & HR Coordinators',
      ],
      onboarding: 'Rigorous Background & Police Verification',
    },
  ];

  const selectedVerticalData = verticals.find((v) => v.id === activeVertical);

  // Dynamic ROI calculation metrics
  const multiplier = staffingModel === 'contractual' ? 7.5 : 12;
  const costSavingsThousands = Math.round(hiresCount * multiplier);
  const timeSavedHours = Math.round(hiresCount * 4.5);

  const vettingStages = [
    {
      step: '01',
      title: 'Technical & Domain Screen',
      desc: 'Two-round assessment evaluating practical problem solving, code quality, or hands-on machine experience.',
      metric: 'Top 8% Selected',
    },
    {
      step: '02',
      title: '100% Statutory Clearance',
      desc: 'Full compliance vetting: UAN & PF verification, ESIC documentation, police background verification, and Aadhaar-linked KYC.',
      metric: 'Audit-Ready Compliance',
    },
    {
      step: '03',
      title: 'Client Culture & HSE Induction',
      desc: 'Pre-deployment briefing on client workplace safety protocols, NDA agreements, equipment handling, and day-1 SLA expectations.',
      metric: 'Day 1 Productive',
    },
    {
      step: '04',
      title: 'Dedicated HRBP & Digital Timesheet',
      desc: 'Biometric attendance tracking, dedicated on-ground account manager, monthly payroll processing, and 48-hour backfill replacements.',
      metric: '48h Backfill SLA',
    },
  ];

  const comparisonRows = [
    {
      feature: 'Statutory Compliance Liability',
      traditional: 'Client remains liable for PF/ESIC penalties & labor disputes',
      pinnacle: '100% Pinnacle indemnity with zero statutory liability on client books',
    },
    {
      feature: 'Placement & Onboarding Turnaround',
      traditional: '30 to 45 business days with frequent no-shows',
      pinnacle: '5 to 15 business days guaranteed with verified pre-screened talent',
    },
    {
      feature: 'Attrition Replacement Guarantee',
      traditional: '30-60 day lag, often requiring separate billing',
      pinnacle: 'Guaranteed 48-hour replacement SLA at zero extra fee',
    },
    {
      feature: 'Payroll & Timesheet Management',
      traditional: 'Manual paper timesheets, delayed payouts & compliance gaps',
      pinnacle: 'Single unified monthly GST invoice with biometric attendance sync',
    },
    {
      feature: 'Labor Department Audit Support',
      traditional: 'Client internal HR must face state inspectors',
      pinnacle: 'Full legal representation & audit closure handled by Pinnacle',
    },
  ];

  return (
    <div className="w-full">
      <SEO
        title="Specialized Technical Staffing & Workforce Solutions | Pinnacle Consultant"
        description="Pan-India technical recruitment and contract staffing across EV, Clean Mobility, IT, and Industry 4.0 with 100% statutory labor compliance (PF, ESIC)."
        keywords="contract staffing India, EV technician hiring, IT staffing Gurugram, technical workforce solutions, labor compliance outsourcing, high-volume recruitment"
        canonicalPath="/staffing"
        schema={staffingSchema}
      />
      {/* Hero Section */}
      <section className="bg-brand-dark text-white overflow-hidden pt-28 pb-16 md:pt-44 md:pb-28 relative">
        {/* Background Editorial Photo */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/staffing_hero_talent_hub.jpg"
            alt="Pinnacle Strategic Workforce Acquisition Boardroom"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Extended progressive fade: covers text area comfortably and smoothly feathers out towards the right edge */}
          <div className="absolute inset-0 hero-overlay" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[2.65rem] xl:text-[3rem] font-semibold leading-[1.14] tracking-tight mb-5 drop-shadow-md">
              {[
                <span key="l1" className="block">Deploy Pre-Vetted,</span>,
                <span key="l2" className="block">
                  High-Performance <span className="text-brand-light">Technical Teams</span>
                </span>,
                <span key="l3" className="block text-brand-light">with Zero Compliance Risk</span>,
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
              Led by workforce specialists with 10+ years in enterprise placement and HR operations. We connect mobility, clean energy, and manufacturing businesses with pre-screened talent while handling 100% statutory labor compliance, PF, ESIC, and monthly payroll.
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
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg"
                >
                  <span>Discuss Your Staffing Needs</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-6 pr-5 py-4 rounded-full font-semibold text-sm hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 text-brand-light" />
                  <span>Download Compliance & Rate Matrix</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Live Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-2xl mb-8">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={500} separator="," duration={2.2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Professionals Placed
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={5} duration={1.2} digitEffect="slide" />
                  <span>-</span>
                  <CountUp to={15} duration={1.5} digitEffect="slide" />
                  <span>d</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Average Placement Time
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={100} duration={2} digitEffect="slide" />
                  <span>%</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Statutory Compliance
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={48} duration={2} digitEffect="slide" />
                  <span>h</span>
                </div>
                <div className="text-[11px] text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Replacement Guarantee
                </div>
              </div>
            </div>

            {/* Editorial Quick Practice Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Flexi-Staffing & Payroll
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                EV BMS Technicians
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Industry 4.0 Engineers
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-4 py-2 rounded-full text-xs font-semibold text-slate-200">
                Lateral Executive Search
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Workforce ROI & Savings Calculator */}
      <section className="py-16 md:py-24 relative z-20 -mt-10">
        <ScrollReveal scale={0.98} delay={0.05} className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="bg-brand-card rounded-[2.5rem] shadow-2xl border border-brand-edge p-6 sm:p-8 md:p-14">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              {/* Left Configuration Panel */}
              <div className="flex-1 w-full">
                <div className="inline-flex items-center gap-2 bg-brand-light/20 text-brand-ink px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wider uppercase">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Workforce Cost Calculator</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-3">
                  Estimate Your Staffing Cost Savings
                </h2>
                <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-8">
                  Select your team size to estimate monthly administrative hours saved, hiring cost reductions, and statutory compliance protection.
                </p>

                {/* Staffing Model Toggle */}
                <div className="bg-brand-bg p-1.5 rounded-2xl flex items-center gap-1.5 border border-brand-edge mb-8 max-w-md relative select-none">
                  <button
                    type="button"
                    onClick={() => setStaffingModel('contractual')}
                    className={`relative flex-1 py-2.5 min-h-11 px-4 rounded-xl text-xs transition-colors duration-150 active:scale-[0.97] text-center cursor-pointer ${
                      staffingModel === 'contractual'
                        ? 'text-brand-light font-extrabold'
                        : 'text-brand-muted hover:text-brand-ink font-semibold'
                    }`}
                  >
                    {staffingModel === 'contractual' && (
                      <motion.span
                        layoutId="staffing-model-pill"
                        className="absolute inset-0 rounded-xl bg-brand-dark shadow-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.7 }}
                      />
                    )}
                    <span className="relative z-10">Contractual Flexi-Staffing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStaffingModel('lateral')}
                    className={`relative flex-1 py-2.5 min-h-11 px-4 rounded-xl text-xs transition-colors duration-150 active:scale-[0.97] text-center cursor-pointer ${
                      staffingModel === 'lateral'
                        ? 'text-brand-light font-extrabold'
                        : 'text-brand-muted hover:text-brand-ink font-semibold'
                    }`}
                  >
                    {staffingModel === 'lateral' && (
                      <motion.span
                        layoutId="staffing-model-pill"
                        className="absolute inset-0 rounded-xl bg-brand-dark shadow-md"
                        transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.7 }}
                      />
                    )}
                    <span className="relative z-10">Lateral Technical Search</span>
                  </button>
                </div>

                {/* Workforce Size Slider */}
                <div className="mb-10 bg-brand-bg p-6 rounded-2xl border border-brand-edge">
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-4">
                    <span className="font-bold text-brand-ink text-sm uppercase tracking-wider">
                      Target Deployment Size
                    </span>
                    <span className="text-3xl font-bold text-brand-ink tabular-nums">
                      {hiresCount} <span className="text-base text-slate-500 font-semibold">Specialists</span>
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    list="staffing-tickmarks"
                    value={hiresCount}
                    onChange={(e) => setHiresCount(Number(e.target.value))}
                    aria-label="Target deployment cohort size"
                    className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-dark"
                  />
                  <datalist id="staffing-tickmarks">
                    <option value="10" label="10"></option>
                    <option value="150" label="150"></option>
                    <option value="500" label="500"></option>
                  </datalist>
                  <div className="flex justify-between gap-1 text-xs text-slate-500 font-bold mt-3 px-1 uppercase tracking-wider">
                    <span>10 Staff (Pilot)</span>
                    <span>150 Staff (Plant Scale)</span>
                    <span>500+ Staff (Enterprise)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white pl-7 pr-6 py-3.5 rounded-full font-bold text-sm hover:bg-brand-light hover:text-brand-onaccent transition-[background-color,color,transform] duration-150 active:scale-[0.96] shadow-lg w-full sm:w-auto"
                  >
                    <span>Request a Detailed Quote</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => setIsBrochureOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-brand-edge bg-brand-bg hover:bg-white text-brand-ink text-sm font-semibold transition-[background-color,transform] duration-150 active:scale-[0.96] w-full sm:w-auto cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Download Rate & SLA Matrix</span>
                  </button>
                </div>
              </div>

              {/* Right Live Simulation Output Metrics */}
              <div className="w-full lg:w-[420px] bg-brand-dark text-white rounded-[2rem] p-7 md:p-8 flex flex-col gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />

                <div className="border-b border-white/10 pb-4">
                  <span className="text-brand-light text-xs font-bold uppercase tracking-wider block mb-1">
                    Estimated Monthly Impact
                  </span>
                  <h3 className="text-xl font-bold text-white">Monthly Savings & Protection</h3>
                </div>

                {/* Metric 1: Cost Saved */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300 font-medium">Estimated Sourcing & Overhead Saved</span>
                    <div className="w-8 h-8 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-brand-light break-words tabular-nums">
                    ₹{costSavingsThousands.toLocaleString('en-IN')},000
                    <span className="text-xs text-slate-300 font-normal"> / mo</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Saved on agency markups, job portals, and internal HR screening cycles.
                  </p>
                </div>

                {/* Metric 2: Time Saved */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-300 font-medium">Internal Recruiter Hours Saved</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 text-brand-light flex items-center justify-center">
                      <Clock className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                    {timeSavedHours} <span className="text-base font-semibold text-slate-300">Hours</span>
                    <span className="text-xs text-slate-300 font-normal"> / mo</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Equivalent to ~{Math.max(1, Math.round(timeSavedHours / 160))} full-time in-house recruiters freed up.
                  </p>
                </div>

                {/* Metric 3: Statutory Shield */}
                <div className="bg-brand-light text-brand-onaccent p-5 rounded-2xl flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-ink/70 mb-0.5">
                      Statutory Indemnity
                    </div>
                    <div className="text-xl font-bold text-brand-ink">100% Zero-Liability Guarantee</div>
                    <p className="text-xs text-brand-ink/80 font-medium mt-1">
                      Full PF, ESIC, minimum wage, and contractor compliance indemnified by Pinnacle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Domain Specializations */}
      <section className="py-16 md:py-24 bg-grid-light relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Domain Specializations
            </span>
            <WordReveal
              as="h2"
              text="Our Staffing Specializations"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink mb-4 tracking-tight"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-base">
              Pre-screened technical talent deployed across clean mobility, software engineering, and smart manufacturing.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
          >
            {verticals.map((v) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.id}
                  variants={staggerChild}
                >
                  <TiltCard
                    maxTilt={5}
                    lift={6}
                    className="bg-brand-card rounded-[2rem] p-6 sm:p-7 md:p-8 border border-brand-edge hover:border-brand-light hover:shadow-2xl transition-colors group flex flex-col justify-between"
                  >
                  <div>
                    <div className="w-14 h-14 bg-brand-dark text-brand-light rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" strokeWidth={1.75} />
                    </div>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full mb-3 inline-block uppercase tracking-wider">
                      {v.badge}
                    </span>
                    <h3 className="text-xl font-bold text-brand-ink mb-1">{v.title}</h3>
                    <h4 className="text-xs text-slate-500 font-medium mb-4">{v.subtitle}</h4>
                    <p className="text-brand-muted font-medium text-[15px] sm:text-xs leading-relaxed mb-6">{v.desc}</p>
                  </div>

                  <div className="flex flex-col gap-3 mt-auto pt-6 border-t border-brand-edge">
                    <div className="flex items-center justify-between text-xs font-semibold text-brand-muted bg-brand-bg px-3.5 py-2 rounded-xl">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 text-brand-ink" />
                        Deployment TAT:
                      </span>
                      <span className="text-brand-ink font-bold">{v.tat}</span>
                    </div>
                    <button
                      onClick={() => setActiveVertical(v.id)}
                      className="flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] px-5 py-3 min-h-11 rounded-xl font-bold text-xs transition-colors w-full shadow-sm"
                    >
                      <span>View Available Profiles</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Slide-out Scope Breakdown Drawer */}
        <AnimatePresence>
          {activeVertical && selectedVerticalData && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveVertical(null)}
                className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-50"
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-card z-50 shadow-2xl border-l border-brand-edge flex flex-col"
              >
                <div className="p-6 md:p-8 border-b border-brand-edge flex items-center justify-between bg-brand-dark text-white">
                  <div>
                    <span className="bg-brand-light text-brand-onaccent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-2 inline-block">
                      Vertical Scope Breakdown
                    </span>
                    <h2 className="text-2xl font-bold">{selectedVerticalData.title}</h2>
                  </div>
                  <button
                    onClick={() => setActiveVertical(null)}
                    className="p-3 bg-white/10 rounded-full text-white hover:bg-brand-light hover:text-brand-onaccent transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-8">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Practice Overview</h3>
                    <p className="text-brand-muted font-medium leading-relaxed text-[15px] sm:text-sm">
                      {selectedVerticalData.desc}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-4 border-b border-brand-edge pb-2">
                      Key Profiles Ready for Fast Rollout
                    </h3>
                    <ul className="space-y-3">
                      {selectedVerticalData.profiles.map((profile, i) => (
                        <li key={i} className="flex items-start gap-3 bg-brand-bg p-3.5 rounded-xl border border-brand-edge">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="font-semibold text-xs text-brand-ink">{profile}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-brand-bg rounded-2xl p-5 border border-brand-edge">
                    <h3 className="text-xs font-bold text-brand-ink uppercase tracking-wider mb-2 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Onboarding & Vetting Standard</span>
                    </h3>
                    <p className="text-xs text-brand-muted font-medium leading-relaxed">
                      {selectedVerticalData.onboarding}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8 border-t border-brand-edge bg-brand-bg">
                  <Link
                    to="/contact"
                    className="flex items-center justify-center w-full gap-2 bg-brand-dark text-white py-4 rounded-full font-bold text-sm hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] transition-all shadow-lg"
                  >
                    <span>Request Candidate Profiles</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* Vetting & Screening Process */}
      <section className="py-16 md:py-24 bg-brand-card border-y border-brand-edge relative">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-800 font-bold text-xs tracking-widest uppercase mb-2 block">
              Our Screening Process
            </span>
            <WordReveal
              as="h2"
              text="Our Four-Stage Screening & Onboarding Process"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-base">
              How we verify technical skills, conduct background checks, and guarantee compliance before day one.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {vettingStages.map((stage) => (
              <motion.div
                key={stage.step}
                variants={staggerChild}
              >
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-brand-bg rounded-[2rem] p-6 sm:p-7 border border-brand-edge hover:bg-white hover:shadow-xl transition-colors flex flex-col justify-between"
                >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-extrabold text-brand-ink tabular-nums">{stage.step}</span>
                    <span className="bg-brand-light text-brand-onaccent font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      {stage.metric}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{stage.title}</h3>
                  <p className="text-brand-muted font-medium text-[15px] sm:text-xs leading-relaxed mb-6">{stage.desc}</p>
                </div>

                <div className="pt-4 border-t border-brand-edge flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <BadgeCheck className="w-4 h-4" />
                  <span>Verified Stage</span>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Traditional Agencies vs Pinnacle Managed Staffing */}
      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-800 font-bold text-xs tracking-widest uppercase mb-2 block">
              How We Compare
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4">
              Traditional Agencies vs. Pinnacle Managed Staffing
            </h2>
            <p className="text-brand-muted font-medium text-[15px] sm:text-base">
              Why growing mobility and industrial companies choose our fully compliant, SLA-backed staffing model.
            </p>
          </ScrollReveal>

          <ScrollReveal scale={0.98} delay={0.1}>
            <div className="bg-brand-card rounded-[2.5rem] border border-brand-edge shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-dark text-white">
                      <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider w-1/3">Key Operational Parameter</th>
                      <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider w-1/3 text-white">
                        Traditional Staffing Agencies
                      </th>
                      <th className="py-5 px-6 font-bold text-xs uppercase tracking-wider w-1/3 text-brand-light bg-white/5 border-b-2 border-brand-light">
                        Pinnacle Managed Workforce
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                    {comparisonRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4.5 px-6 font-bold text-brand-ink">{row.feature}</td>
                        <td className="py-4.5 px-6 text-brand-muted font-medium">
                          <div className="flex items-start gap-2.5">
                            <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span>{row.traditional}</span>
                          </div>
                        </td>
                        <td className="py-4.5 px-6 font-semibold text-brand-ink bg-emerald-50/50 border-l border-r border-emerald-100/80">
                          <div className="flex items-start gap-2.5">
                            <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                            <span>{row.pinnacle}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Commitment */}
      <section className="py-16 md:py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/10 rounded-full blur-3xl pointer-events-none" />

        <ScrollReveal scale={0.96} duration={0.7} className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <div className="bg-brand-dark-2 rounded-[2.5rem] border border-white/10 p-6 sm:p-8 md:p-14 shadow-2xl">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              <div className="lg:col-span-8">
                <span className="text-brand-light text-xs font-bold uppercase tracking-wider block mb-3">
                  Our Commitment
                </span>
                <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold leading-snug mb-6 text-white">
                  “We build long-term partnerships rather than filling transactional headcounts. Complete statutory compliance, safety readiness, and fast backfills guide every deployment.”
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-brand-light/40 outline outline-1 -outline-offset-1 outline-black/10 shrink-0">
                    <img
                      src="/images/shikha_gupta.jpg"
                      alt="Shikha Gupta - Founder & Workforce Strategist"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div>
                    <div className="text-base font-bold text-white">Shikha Gupta</div>
                    <div className="text-xs text-brand-light font-semibold">Founder & Workforce Strategist • MBA (HR)</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-brand-dark p-6 sm:p-7 rounded-2xl border border-white/10 flex flex-col gap-4 text-center">
                <div className="w-12 h-12 rounded-2xl bg-brand-light text-brand-onaccent flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white">Need to Hire Technical Talent?</h3>
                <p className="text-xs text-slate-300 font-medium">
                  Receive pre-screened candidate profiles within 5 to 15 business days.
                </p>
                <Link
                  to="/contact"
                  className="bg-brand-light text-brand-onaccent py-3.5 px-6 rounded-full font-bold text-xs hover:bg-white active:scale-[0.96] transition-all shadow-md mt-2"
                >
                  Talk to Our Staffing Team
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Brochure Modal Trigger */}
      <AnimatePresence>
        {isBrochureOpen && <BrochureModal onClose={() => setIsBrochureOpen(false)} />}
      </AnimatePresence>
    </div>
  );
}
