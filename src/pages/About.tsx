import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Compass,
  Lightbulb,
  Rocket,
  GraduationCap,
  HeartHandshake,
  ArrowUpRight,
  CheckCircle2,
  Users,
  Zap,
  ChevronRight,
  Factory,
  Cpu,
} from 'lucide-react';
import { ScrollReveal, staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import { CountUp } from '@/components/ui/count-up';

export default function About() {
  const [activeVisionTab, setActiveVisionTab] = useState<'ev' | 'manufacturing' | 'it'>('ev');

  const values = [
    {
      num: '01',
      icon: Compass,
      title: 'Integrity First',
      tagline: 'We do what is right, even when it is hard.',
      desc: 'No shortcuts or inflated promises. Just honest scoping, transparent terms, and dependable delivery.',
    },
    {
      num: '02',
      icon: Lightbulb,
      title: 'Clarity Over Complexity',
      tagline: 'Simple, direct communication cuts through ambiguity.',
      desc: 'We bring defined processes, clear communication, and structured execution to complex rollout schedules.',
    },
    {
      num: '03',
      icon: Rocket,
      title: 'Action with Ownership',
      tagline: 'Taking direct ownership of schedules, safety, and outcomes.',
      desc: 'We take direct accountability for staffing SLAs, technical uptime, and statutory compliance across every mandate.',
    },
    {
      num: '04',
      icon: GraduationCap,
      title: 'Continuous Refinement',
      tagline: 'Learning from every site deployment to improve delivery.',
      desc: 'We review field feedback, track shift telemetry, and adapt our operating models to changing client requirements.',
    },
    {
      num: '05',
      icon: HeartHandshake,
      title: 'Partnerships Over Placements',
      tagline: 'Long-term operational partnerships matter more than one-off transactions.',
      desc: 'We focus on long-term relationships with clients, ground workers, technicians, and community stakeholders.',
    },
  ];

  const visionScenarios = {
    ev: {
      title: 'For a Startup or CPO in EV',
      text: 'Helping you build reliable charging networks, hire skilled technicians, clear DISCOM approvals, and expand into new cities on schedule.',
      badge: 'Speed to Market',
    },
    manufacturing: {
      title: 'For a Manufacturing Company',
      text: 'Upgrading plant operations through shopfloor automation, IoT predictive maintenance, non-invasive retrofits, and trained machine operators.',
      badge: 'Smart Factory',
    },
    it: {
      title: 'For an IT or Logistics Enterprise',
      text: 'Strengthening operational efficiency through specialized technical staffing, dependable project management, and verified market intelligence.',
      badge: 'Operational Efficiency',
    },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-brand-dark text-white overflow-hidden min-h-svh lg:h-[100dvh] flex flex-col justify-center pt-28 pb-10 md:pt-36 md:pb-12 lg:pt-32 lg:pb-10 relative">
        {/* Advisory photo backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/about_hero_meeting.jpg"
            alt="Pinnacle Strategic Leadership & Advisory Team"
            className="w-full h-full object-cover object-[78%_center] md:object-[82%_center]"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/30 pointer-events-none" />
        </div>

        {/* Ambient decorative glow */}
        <FloatingOrb className="-top-40 right-[-10rem] hidden md:block" colorClass="bg-brand-light/15" delay={0} />
        <FloatingOrb className="bottom-[-14rem] left-[-12rem] hidden md:block" size={560} colorClass="bg-brand-dark-4/40" delay={2.5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl my-auto">
          <div className="max-w-3xl">

            <h1 className="text-3xl sm:text-6xl font-semibold mb-5 leading-[1.08] tracking-tight drop-shadow-md">
              {[
                <span key="l1" className="block">Built by Industry Operators.</span>,
                <span key="l2" className="block">Delivering on the Ground.</span>,
                <span key="l3" className="block text-brand-light">Powered by People.</span>,
              ].map((line, i) => (
                <span key={`w-${i}`} className="block overflow-hidden pb-[0.05em] -mb-[0.05em]">
                  <motion.span
                    className="block"
                    initial={{ y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.12 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
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
              className="text-slate-100 text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed mb-8 drop-shadow-sm text-pretty"
            >
              Founded in Gurugram by operators in EV charging infrastructure, HR consulting, and industrial automation, Pinnacle Consultant partners with Indian enterprises to resolve execution bottlenecks through dependable staffing, site operations, and complete statutory compliance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 mb-8"
            >
              <Magnetic>
                <Link
                  to="/contact"
                  className="btn btn-primary shadow-lg pl-8 pr-7 py-4"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#story"
                  className="btn btn-ghost backdrop-blur-sm shadow-sm pl-6 pr-5 py-4"
                >
                  <span>Read Our Story</span>
                  <ChevronRight className="w-4 h-4 text-brand-light" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Editorial Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 max-w-3xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight tabular-nums">
                  Jan 2025
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  Founded in Gurugram
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={24} duration={2} digitEffect="slide" />
                  <span>+ Yrs</span>
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  Combined Experience
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={50} duration={2} digitEffect="slide" />
                  <span>MW+</span>
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  EV Charging Managed
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={100} duration={2} digitEffect="slide" />
                  <span>%</span>
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  Statutory Compliance
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Founding Origin Story */}
      <section id="story" className="py-16 md:py-24 bg-brand-card bg-grid-light border-b border-brand-edge relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <ScrollReveal direction="right" distance={25} className="md:col-span-5 space-y-6">
              <TiltCard
                maxTilt={4}
                lift={5}
                className="bg-brand-bg rounded-panel p-6 sm:p-8 md:p-10 border border-brand-edge text-center shadow-sm relative overflow-hidden group"
              >
                <FloatingOrb className="top-0 right-0" size={128} colorClass="bg-brand-light/20" blurClass="blur-2xl" delay={1} />
                <span className="text-brand-ink text-xs font-bold uppercase tracking-widest block mb-2">
                  Established
                </span>
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-ink mb-2 tracking-tight tabular-nums">Jan 2025</div>
                <div className="text-xs font-semibold text-emerald-800 bg-brand-light/30 inline-block px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                  Trusted Operating Partner
                </div>

                <div className="text-left space-y-3 pt-6 border-t border-brand-edge text-xs text-brand-muted font-medium">
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ground execution over corporate theory</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% statutory labor &amp; PF compliance</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trusted by Leading EV &amp; Industrial Brands</span>
                  </div>
                </div>
              </TiltCard>

              {/* Creative Photo Inset */}
              <div className="rounded-card overflow-hidden border border-brand-edge shadow-sm relative group">
                <img
                  src="/images/gurugram_corporate_hq.jpg"
                  alt="Gurugram Corporate Headquarters"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500 outline outline-1 -outline-offset-1 outline-black/10"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold">
                    Registered Headquarters • Gurugram, Haryana
                  </span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" distance={25} className="md:col-span-7">
              <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
                The Origin
              </span>
              <WordReveal
                as="h2"
                text="Practical operational consulting built for fast-moving industries."
                className="text-3xl md:text-4xl font-semibold text-brand-ink tracking-tight mb-6"
              />
              <div className="space-y-4 text-brand-muted font-medium text-[15px] sm:text-base leading-relaxed text-pretty">
                <p>
                  Pinnacle was founded to give growing enterprises access to operators with hands-on domain experience. Our founders come from backgrounds in electric mobility, manufacturing operations, and enterprise human capital consulting.
                </p>
                <p>
                  Our focus is removing operational friction, aligning talent delivery with ground project schedules, and ensuring compliance on every site.
                </p>
                <p className="bg-brand-bg p-5 rounded-2xl border-l-4 border-brand-dark text-brand-ink font-semibold text-[15px]">
                  Since launch in January 2025, we have partnered with industrial and mobility leaders including Ather Energy, Hero MotoCorp, Magenta EV, FEPL, and Vertiv EV.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Leadership
            </span>
            <WordReveal
              as="h2"
              text="Meet the Founders"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-sm">
              Hands-on leadership across technical workforce recruitment and large-scale EV infrastructure.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Shikha Gupta */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="bg-brand-card rounded-panel p-6 sm:p-8 md:p-12 border border-brand-edge shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow group h-full"
              >
              <div>
                <div className="flex items-center gap-4 sm:gap-5 mb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-600/30 shadow-md">
                    <img
                      src="/images/shikha_gupta.jpg"
                      alt="Shikha Gupta - Founder &amp; Workforce Strategist"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shadow-md">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-1">Shikha Gupta</h3>
                    <span className="text-brand-light-3 text-xs font-bold tracking-wide block">
                      Founder &amp; Workforce Strategist
                    </span>
                    <span className="text-xs text-slate-500 font-medium tabular-nums">
                      MBA (HR) • 10+ Yrs HR Consulting
                    </span>
                  </div>
                </div>

                <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6 text-pretty">
                  A workforce strategist with 10+ years of experience across HR consulting, talent acquisition, and SAP HCM implementation. Having placed more than 500 professionals and led high-volume hiring mandates, she brings disciplined execution and clear compliance standards to field and corporate recruitment.
                </p>

                <h4 className="text-sm font-bold text-brand-ink tracking-wide mb-3 flex items-center gap-2">
                  <span aria-hidden="true" className="w-5 h-0.5 rounded-full bg-brand-light-3" />
                  Core Track Record
                </h4>
                <ul className="space-y-2.5 mb-8 tabular-nums">
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>10+ years in HR consulting, recruitment &amp; workforce solutions</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>5 years hands-on experience as SAP HCM Consultant</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Recruited 500+ candidates across technical &amp; operational roles</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Specialist in contractual workforce compliance &amp; fast-turnaround hiring</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500 tabular-nums">
                <span>MBA in HR &amp; Marketing</span>
                <span className="font-bold text-brand-ink">500+ Placements</span>
              </div>
              </TiltCard>
            </motion.div>

            {/* Ashu Gupta */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="bg-brand-card rounded-panel p-6 sm:p-8 md:p-12 border border-brand-edge shadow-sm flex flex-col justify-between hover:shadow-xl transition-shadow group h-full"
              >
              <div>
                <div className="flex items-center gap-4 sm:gap-5 mb-6">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-emerald-600/30 shadow-md">
                    <img
                      src="/images/ashu_gupta.jpg"
                      alt="Ashu Gupta - Co-Founder &amp; EV Infrastructure Leader"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top outline outline-1 -outline-offset-1 outline-black/10"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shadow-md">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-1">Ashu Gupta</h3>
                    <span className="text-brand-light-3 text-xs font-bold tracking-wide block">
                      Co-Founder &amp; EV Infrastructure Leader
                    </span>
                    <span className="text-xs text-slate-500 font-medium tabular-nums">
                      14+ Yrs Auto &amp; Clean Mobility • Pan-India EV Network
                    </span>
                  </div>
                </div>

                <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6 text-pretty">
                  An automotive and clean energy leader with 14+ years of hands-on experience building and operating charging networks across India. He has directed site acquisition, electrical approvals, and installation across 200+ locations, managing turnkey EPC rollouts, charger maintenance, and nationwide charging parking networks.
                </p>

                <h4 className="text-sm font-bold text-brand-ink tracking-wide mb-3 flex items-center gap-2">
                  <span aria-hidden="true" className="w-5 h-0.5 rounded-full bg-brand-light-3" />
                  Core Track Record
                </h4>
                <ul className="space-y-2.5 mb-8 tabular-nums">
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>14+ years in automotive and clean mobility operations</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Led charging infra expansion across 200+ locations nationwide</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Turnkey EPC delivery, charger maintenance &amp; nationwide parking networks</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>DISCOM power sanctions, transformer approvals &amp; vendor management</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500 tabular-nums">
                <span>EV Infrastructure Leader</span>
                <span className="font-bold text-brand-ink">Pan-India Network</span>
              </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-16 md:py-24 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size={500} delay={0} />
        <FloatingOrb className="bottom-0 left-0" size={320} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={2} />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Strategic Vision
            </span>
            <WordReveal
              as="h2"
              text="To be the trusted execution partner for industries scaling across India."
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4"
            />
            <p className="text-slate-300 text-sm font-medium">
              Companies operating at scale need partners who understand ground execution.
            </p>
          </ScrollReveal>

          {/* Interactive Scenario Switcher */}
          <ScrollReveal direction="up" distance={25} className="bg-white/5 border border-white/10 rounded-panel p-6 sm:p-8 md:p-12 mb-16 backdrop-blur-sm">
            <div className="text-xs font-bold text-brand-light uppercase tracking-wider mb-6">
              What this means in practice:
            </div>

            <div
              role="tablist"
              aria-label="Strategic vision scenarios"
              className="inline-flex flex-wrap gap-1.5 p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md mb-8 relative select-none"
            >
              {(['ev', 'manufacturing', 'it'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  id={`vision-tab-${tab}`}
                  aria-selected={activeVisionTab === tab}
                  aria-controls="vision-panel"
                  onClick={() => setActiveVisionTab(tab)}
                  className={`relative px-4 sm:px-5 py-2.5 min-h-11 sm:min-h-auto rounded-full text-xs transition-colors duration-150 active:scale-[0.97] flex items-center gap-2 cursor-pointer ${
                    activeVisionTab === tab
                      ? 'text-brand-onaccent font-extrabold'
                      : 'text-white/80 hover:text-white font-semibold'
                  }`}
                >
                  {activeVisionTab === tab && (
                    <motion.span
                      layoutId="about-vision-pill"
                      className="absolute inset-0 rounded-full bg-brand-light shadow-md"
                      transition={{ type: 'spring', stiffness: 380, damping: 30, mass: 0.7 }}
                    />
                  )}
                  {tab === 'ev' && (
                    <>
                      <Zap className="relative z-10 w-3.5 h-3.5" />
                      <span className="relative z-10">EV Startups &amp; CPOs</span>
                    </>
                  )}
                  {tab === 'manufacturing' && (
                    <>
                      <Factory className="relative z-10 w-3.5 h-3.5" />
                      <span className="relative z-10">Manufacturing Companies</span>
                    </>
                  )}
                  {tab === 'it' && (
                    <>
                      <Cpu className="relative z-10 w-3.5 h-3.5" />
                      <span className="relative z-10">IT &amp; Logistics Firms</span>
                    </>
                  )}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id="vision-panel"
              aria-labelledby={`vision-tab-${activeVisionTab}`}
              className="bg-brand-dark-2/80 backdrop-blur-md rounded-card p-6 md:p-8 border border-white/15"
            >
              <span className="text-xs font-bold bg-brand-light text-brand-onaccent px-3 py-1 rounded-lg uppercase tracking-wider inline-block mb-3">
                {visionScenarios[activeVisionTab].badge}
              </span>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {visionScenarios[activeVisionTab].title}
              </h3>
              <p className="text-slate-200 text-[15px] md:text-base leading-relaxed font-medium text-pretty">
                {visionScenarios[activeVisionTab].text}
              </p>
            </div>
          </ScrollReveal>

          {/* Future Outlook Points */}
          <div className="border-t border-white/10 pt-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              What guides our day-to-day work:
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[
                'Every hire combines proven capability with safety readiness',
                'EV networks operate with high electrical reliability and uptime',
                'Factories run efficiently with clear data and trained technicians',
                'Business decisions are backed by primary field data',
                'Every client engagement receives direct attention from senior partners',
                'Long-term partnerships take priority over quick transactional fees',
              ].map((item, idx) => (
                <motion.div key={idx} variants={staggerChild}>
                  <TiltCard
                    maxTilt={4}
                    lift={4}
                    className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm hover:bg-white/10 transition-colors group h-full"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0" />
                    <span className="text-xs text-slate-200 font-medium">{item}</span>
                  </TiltCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-brand-card bg-dots-light relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Operating Principles
            </span>
            <WordReveal
              as="h2"
              text="Five Core Values"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-sm">
              Practical principles that guide how we work with clients, workers, and partners.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 items-stretch auto-rows-fr"
          >
            {values.map((v) => (
              <motion.div key={v.num} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-brand-bg rounded-card p-6 border border-brand-edge hover:shadow-lg hover:border-brand-dark transition-colors flex flex-col justify-between group h-full"
                >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-11 h-11 rounded-xl bg-brand-card text-brand-ink group-hover:bg-brand-dark group-hover:text-brand-light flex items-center justify-center transition-colors shadow-sm">
                      <v.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{v.title}</h3>
                  <div className="text-xs font-bold text-emerald-800 mb-3 leading-snug">
                    {v.tagline}
                  </div>
                  <p className="text-brand-muted font-medium text-[15px] md:text-xs leading-relaxed text-pretty">
                    {v.desc}
                  </p>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal direction="up" distance={30}>
          <div className="bg-brand-dark text-white rounded-panel p-6 sm:p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={0} />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Build your operations with a partner who delivers on the ground.
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-medium text-pretty">
              Partner with our team in Gurugram to deploy technical talent, install EV charging hubs, or automate manufacturing operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="btn btn-primary shadow-lg pl-8 pr-7 py-4"
                >
                  <span>Speak with Our Founders</span>
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
