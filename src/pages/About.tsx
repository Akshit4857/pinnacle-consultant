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
      tagline: 'We do what’s right — even when it’s hard.',
      desc: 'No shortcuts, no false promises. Just real work, honest conversations, and transparent partnerships that stand the test of time.',
    },
    {
      num: '02',
      icon: Lightbulb,
      title: 'Clarity Over Complexity',
      tagline: 'The world is complex enough — our role is to simplify.',
      desc: 'We bring structure to chaos, clarity to technical uncertainty, and executable direction to high-growth ambitions.',
    },
    {
      num: '03',
      icon: Rocket,
      title: 'Action with Ownership',
      tagline: 'Ideas are important — but execution is everything.',
      desc: 'We take complete ownership of every challenge, commit to delivery outcomes, and move fast without compromising quality or compliance.',
    },
    {
      num: '04',
      icon: GraduationCap,
      title: 'Always Learning',
      tagline: 'Every client, sector, and challenge teaches us something new.',
      desc: 'We are not afraid to ask hard questions, challenge legacy assumptions, and evolve dynamically alongside modern technologies.',
    },
    {
      num: '05',
      icon: HeartHandshake,
      title: 'People Before Profits',
      tagline: 'We are in the business of relationships — not transactions.',
      desc: 'We put human connection at the heart of everything: our team, our deployed workers, our enterprise clients, and community impact.',
    },
  ];

  const visionScenarios = {
    ev: {
      title: 'For a Startup or CPO in EV',
      text: 'Helping you build scalable infrastructure, access the right technical talent, navigate DISCOM approvals, and accelerate your go-to-market footprint.',
      badge: 'Speed to Market',
    },
    manufacturing: {
      title: 'For a Manufacturing Giant',
      text: 'Modernizing legacy operations through shopfloor automation, IoT predictive maintenance, zero-downtime retrofits, and a digitally skilled workforce.',
      badge: 'Smart Factory',
    },
    it: {
      title: 'For an IT or Logistics Enterprise',
      text: 'Unlocking peak operational efficiency through specialized workforce optimization, data-driven decisions, and cutting-edge market research.',
      badge: 'Operational Efficiency',
    },
  };

  return (
    <div className="w-full">
      {/* 1. Hero Section (Editorial Advisory & Purpose - 100% Viewport Height) */}
      <section className="bg-brand-dark text-white overflow-hidden min-h-svh lg:h-[100dvh] flex flex-col justify-center pt-28 pb-10 md:pt-36 md:pb-12 lg:pt-32 lg:pb-10 relative">
        {/* Editorial Executive Advisory Photo Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/about_hero_meeting.jpg"
            alt="Pinnacle Strategic Leadership & Advisory Team"
            className="w-full h-full object-cover object-[78%_center] md:object-[82%_center]"
          />
          <div className="absolute inset-0 hero-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-brand-dark/30 pointer-events-none" />
        </div>

        {/* Ambient Decorative Glows */}
        <FloatingOrb className="-top-40 right-[-10rem] hidden md:block" colorClass="bg-brand-light/15" delay={0} />
        <FloatingOrb className="bottom-[-14rem] left-[-12rem] hidden md:block" size={560} colorClass="bg-brand-dark-4/40" delay={2.5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl my-auto">
          <div className="max-w-3xl">

            <h1 className="text-3xl sm:text-6xl font-semibold mb-5 leading-[1.08] tracking-tight drop-shadow-md">
              {[
                <span key="l1" className="block">Driven by Purpose.</span>,
                <span key="l2" className="block">Built on Passion.</span>,
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
              className="text-slate-100 text-base sm:text-lg lg:text-xl font-medium max-w-2xl leading-relaxed mb-8 drop-shadow-sm"
            >
              At Pinnacle Consultant, we are practitioners, not theorists. Founded in Gurugram by operators with decades of leadership across EV megawatt charging corridors, SAP HCM consulting, and industrial automation — we partner with India’s leading enterprises to solve execution bottlenecks with speed, precision, and unshakable compliance.
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
                  className="btn btn-primary shadow-lg"
                >
                  <span>Partner With Us</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#story"
                  className="btn btn-ghost backdrop-blur-sm shadow-sm"
                >
                  <span>Read Our Story</span>
                  <ChevronRight className="w-4 h-4 text-brand-light" />
                </a>
              </Magnetic>
            </motion.div>

            {/* Clean Editorial Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/10 max-w-3xl"
            >
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Jan 2025
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  Founded in Gurugram
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
                  <CountUp to={24} duration={2} digitEffect="slide" />
                  <span>+ Yrs</span>
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  Combined Experience
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
                  <CountUp to={50} duration={2} digitEffect="slide" />
                  <span>MW+</span>
                </div>
                <div className="text-xs text-slate-300 uppercase tracking-wider font-medium mt-1">
                  EV Infra Capacity
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline">
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

      {/* 2. Founding Origin Story */}
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
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-brand-ink mb-2 tracking-tight">Jan 2025</div>
                <div className="text-xs font-semibold text-emerald-800 bg-brand-light/30 inline-block px-3 py-1 rounded-full uppercase tracking-wider mb-6">
                  Rapid Enterprise Trust
                </div>

                <div className="text-left space-y-3 pt-6 border-t border-brand-edge text-xs text-brand-muted font-medium">
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Ground execution, not corporate theory</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>100% statutory labor & PF compliance</span>
                  </div>
                  <div className="flex items-center gap-2 text-brand-ink font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Trusted by Fortune-500 & Top EV Brands</span>
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
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
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
                text="Redefining the consulting experience to make it faster, deeper, and more honest."
                className="text-3xl md:text-4xl font-semibold text-brand-ink tracking-tight mb-6"
              />
              <div className="space-y-4 text-brand-muted font-medium text-[15px] sm:text-base leading-relaxed">
                <p>
                  Pinnacle was born out of the belief that businesses today need partners who bring real industry experience, not just promises. Each founder comes from a background in Electric Mobility, Manufacturing, and Strategic Consulting — we’ve worked on the ground, solved real problems, and now we’re bringing those learnings to you.
                </p>
                <p>
                  We didn’t just open a company. We set out to fix what felt broken: consulting that was slow, misaligned, or disconnected from ground operational reality.
                </p>
                  <p className="bg-brand-bg p-5 rounded-2xl border-l-4 border-brand-dark text-brand-ink font-semibold text-[15px]">
                  In just a short span since January 2025, we’ve earned the trust of India’s evolving industrial leaders — Exponent Energy, Revfin, Gentari, Sun Mobility, and GoMechanic. We see this as a responsibility to deliver even more value.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* 3. Leadership Hub: Shikha Gupta & Ashu Gupta */}
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
              Complementary mastery across strategic talent acquisition and massive technical infrastructure.
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
                      alt="Shikha Gupta - Founder & Workforce Strategist"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shadow-md">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-1">Shikha Gupta</h3>
                    <span className="text-brand-light-3 text-xs font-bold tracking-wide block">
                      Founder & Workforce Strategist
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      MBA (HR) • 10+ Yrs HR Consulting
                    </span>
                  </div>
                </div>

                <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6">
                  A workforce strategist with a decade of experience across HR consulting, talent acquisition, SAP HCM implementation, and marketplace-driven hiring ecosystems. Having recruited 500+ professionals and led large-scale talent delivery mandates, she combines operational rigour with a deep understanding of how mobility and service networks truly function.
                </p>

                <h4 className="text-sm font-bold text-brand-ink tracking-wide mb-3 flex items-center gap-2">
                  <span aria-hidden="true" className="w-5 h-0.5 rounded-full bg-brand-light-3" />
                  Core Track Record
                </h4>
                <ul className="space-y-2.5 mb-8">
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>10+ years in HR consulting, recruitment & workforce solutions</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>5 years hands-on experience as SAP HCM Consultant</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Recruited 500+ candidates across technical & operational roles</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Expertise in marketplace dynamics & talent ecosystem scaling</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>MBA — HR & Marketing</span>
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
                      alt="Ashu Gupta - Co-Founder & EV Infrastructure Leader"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shadow-md">
                      <Zap className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-1">Ashu Gupta</h3>
                    <span className="text-brand-light-3 text-xs font-bold tracking-wide block">
                      Co-Founder & EV Infrastructure Leader
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      14+ Yrs Auto & Clean Mobility • 50MW+ Deployed
                    </span>
                  </div>
                </div>

                <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6">
                  An automotive and EV infrastructure leader with 14+ years of hands-on experience in building and scaling charging networks across India. He has led site acquisition, installation, and infrastructure expansion for major EV players, driving footprint growth across 200+ locations and managing 50MW+ charging infrastructure projects.
                </p>

                <h4 className="text-sm font-bold text-brand-ink tracking-wide mb-3 flex items-center gap-2">
                  <span aria-hidden="true" className="w-5 h-0.5 rounded-full bg-brand-light-3" />
                  Core Track Record
                </h4>
                <ul className="space-y-2.5 mb-8">
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>14+ years in Automotive & Electric Mobility ecosystem</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Led charging infra expansion across 200+ locations nationwide</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Managed installation of 50MW+ EV charging projects</span>
                  </li>
                  <li className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Contractor ecosystem management & electrical compliance</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-slate-500">
                <span>Infrastructure Execution Authority</span>
                <span className="font-bold text-brand-ink">50MW+ Commissioned</span>
              </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Lighthouse Vision Hub */}
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
              text="To become a Lighthouse Partner for industries navigating change."
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight mb-4"
            />
            <p className="text-slate-300 text-sm font-medium">
              In this fast-changing landscape, companies don’t need vendors — they need visionaries.
            </p>
          </ScrollReveal>

          {/* Interactive Scenario Switcher */}
          <ScrollReveal direction="up" distance={25} className="bg-white/5 border border-white/10 rounded-panel p-6 sm:p-8 md:p-12 mb-16 backdrop-blur-sm">
            <div className="text-xs font-bold text-brand-light uppercase tracking-wider mb-6">
              What does this vision mean in action?
            </div>

            <div
              role="tablist"
              aria-label="Strategic vision scenarios"
              className="inline-flex flex-wrap gap-1 p-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-sm mb-8"
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
                  className={`px-4 sm:px-5 py-2.5 min-h-11 sm:min-h-auto rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                    activeVisionTab === tab
                      ? 'bg-brand-light text-brand-onaccent shadow-md'
                      : 'text-white hover:bg-white/15'
                  }`}
                >
                  {tab === 'ev' && (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>EV Startups & CPOs</span>
                    </>
                  )}
                  {tab === 'manufacturing' && (
                    <>
                      <Factory className="w-3.5 h-3.5" />
                      <span>Manufacturing Giants</span>
                    </>
                  )}
                  {tab === 'it' && (
                    <>
                      <Cpu className="w-3.5 h-3.5" />
                      <span>IT & Logistics Firms</span>
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
              <p className="text-slate-200 text-[15px] md:text-base leading-relaxed font-medium">
                {visionScenarios[activeVisionTab].text}
              </p>
            </div>
          </ScrollReveal>

          {/* Future Outlook Points */}
          <div className="border-t border-white/10 pt-12">
            <h3 className="text-xl font-semibold text-white mb-6 text-center">
              We envision a future where:
            </h3>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            >
              {[
                'Every hire is not just a resource, but a cultural fit',
                'Every EV brand expands confidently with robust charging networks',
                'Every factory is smart, agile, and people-centric',
                'Every business decision is driven by data, not guesswork',
                'Every client feels like our only client',
                'Great partnerships build enduring futures',
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

      {/* 5. The 5 Core Values */}
      <section className="py-16 md:py-24 bg-brand-card bg-dots-light relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Ethical Compass
            </span>
            <WordReveal
              as="h2"
              text="Our 5 Core Values"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-sm">
              Rooted in integrity, Fueled by ambition, Guided by purpose.
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
                    <span className="text-brand-ink font-bold text-lg">{v.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-brand-card text-brand-ink group-hover:bg-brand-dark group-hover:text-brand-light flex items-center justify-center transition-colors shadow-sm">
                      <v.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-brand-ink mb-2">{v.title}</h3>
                  <div className="text-xs font-bold text-emerald-800 mb-3 leading-snug">
                    {v.tagline}
                  </div>
                  <p className="text-brand-muted font-medium text-[15px] md:text-xs leading-relaxed">
                    {v.desc}
                  </p>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Call to Action */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal direction="up" distance={30}>
          <div className="bg-brand-dark text-white rounded-panel p-6 sm:p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={0} />
            <h2 className="text-3xl md:text-4xl font-semibold mb-4 tracking-tight">
              Build your future with a partner who delivers.
            </h2>
            <p className="text-slate-300 text-sm max-w-xl mx-auto mb-8 font-medium">
              Join Exponent Energy, Revfin, Gentari, Sun Mobility, and Hero MotoCorp in building India's most resilient industrial operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="btn btn-primary shadow-lg"
                >
                  <span>Connect with Founders</span>
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
