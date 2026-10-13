import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import {
  Cpu,
  Activity,
  Bot,
  Zap,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  X,
  Gauge,
  Layers,
  BarChart3,
} from 'lucide-react';

export default function Industry40() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const pillars = [
    {
      id: 'iot',
      icon: Cpu,
      title: 'IoT / Industry 4.0 Implementation',
      tag: 'Smart Connectivity',
      headline: 'Smart device integration across assets and operations',
      desc: 'Seamless sensor integration and edge connectivity bridging physical machinery with enterprise systems for real-time visibility and control.',
      points: [
        'Energy monitoring, asset tracking & OEE optimization',
        'Real-time shopfloor dashboards & edge analytics',
        'Two-way integration with cloud platforms & ERP systems (SAP, Oracle)',
        'Machine telemetry and environmental parameter monitoring',
      ],
      metrics: 'Up to 24% boost in Overall Equipment Effectiveness (OEE)',
    },
    {
      id: 'automation',
      icon: Bot,
      title: 'Automation & Robotic Advisory',
      tag: 'Shopfloor Modernization',
      headline: 'From shop floor automation to lights-out manufacturing',
      desc: 'End-to-end strategic advisory for automating high-mix, high-precision industrial processes with cutting-edge robotics and vision systems.',
      points: [
        'Use-case scoping, techno-commercial validation & ROI analysis',
        'Independent vendor selection & turnkey commissioning support',
        'PLC/SCADA architectures, collaborative robots (Cobots)',
        'Optical inspection & computer-vision defect rejection',
      ],
      metrics: '35-50% reduction in cycle time & rework defects',
    },
    {
      id: 'predictive',
      icon: Activity,
      title: 'Predictive Maintenance',
      tag: 'Zero Downtime',
      headline: 'Reduce downtime, extend asset life',
      desc: 'Machine learning algorithms continuously analyzing vibration, acoustics, and temperature telemetry to preempt critical equipment failures.',
      points: [
        'Multi-axis vibration & thermal condition monitoring sensors',
        'Acoustic anomaly detection and early warning alert systems',
        'Automated maintenance work-order generation & parts scheduling',
        'Residual Useful Life (RUL) modeling for heavy rotary equipment',
      ],
      metrics: '70% reduction in catastrophic breakdowns & unplanned downtime',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Plant Digital Maturity Audit',
      desc: 'On-site assessment of machinery legacy, sensor gaps, network topography, and data collection bottlenecks.',
    },
    {
      step: '02',
      title: 'Non-Invasive IoT Retrofitting',
      desc: 'Deploying plug-and-play non-invasive sensors and edge gateways without shutting down running production lines.',
    },
    {
      step: '03',
      title: 'Real-Time SCADA & Cloud Analytics',
      desc: 'Custom OEE dashboards, energy heatmaps, and threshold alerts calibrated to your plant KPIs.',
    },
    {
      step: '04',
      title: 'Autonomous Closed-Loop Control',
      desc: 'Progressing from descriptive dashboards to predictive maintenance and robotic closed-loop automation.',
    },
  ];

  const selectedData = pillars.find((p) => p.id === activeFeature);

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
                  <span key="l1" className="block">We make factories</span>,
                  <span key="l2" className="block text-brand-light">smarter, leaner, &amp; future-ready.</span>,
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
                Bridging legacy industrial assets with intelligent IoT telemetries, predictive maintenance, and robotic automation to drive unmatched productivity across manufacturing plants.
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
                    <span>Schedule Plant Digital Audit</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <a
                    href="tel:+917879716775"
                    className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-6 py-4 rounded-full font-semibold text-sm hover:bg-white/20 transition-colors backdrop-blur-sm"
                  >
                    <span>Hotline: +91-7879716775</span>
                  </a>
                </Magnetic>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src="/images/smart_factory_iot.jpg"
                  alt="Industrial Automation and Smart Factory IIoT Architecture"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-brand-light font-semibold">
                    Live PLC & SCADA Sync
                  </span>
                  <span className="text-white font-medium">99.4% Uptime Target</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Pillars Grid */}
      <section className="py-16 md:py-24 bg-grid-light relative z-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Core Capabilities
            </span>
            <WordReveal
              as="h2"
              text="End-to-End Smart Manufacturing"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              From shop floor IoT retrofits to autonomous robotic workflows and predictive analytics.
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
                  <div className="bg-brand-bg p-3 rounded-xl text-xs font-medium text-brand-ink flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{pillar.metrics}</span>
                  </div>
                  <button
                    onClick={() => setActiveFeature(pillar.id)}
                    className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent py-3 rounded-xl font-medium text-xs transition-colors"
                  >
                    Deep Dive Scope <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Transformation Workflow */}
      <section className="py-14 md:py-20 bg-brand-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Methodology
            </span>
            <WordReveal
              as="h2"
              text="How We Digitize Your Plant Without Downtime"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4"
            />
            <p className="text-slate-300 text-sm font-medium">
              A 4-step pragmatic roadmap built by practitioners who understand plant floor realities.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-4 gap-6"
          >
            {workflowSteps.map((step) => (
              <motion.div key={step.step} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <span className="text-brand-light text-3xl font-bold block mb-4">{step.step}</span>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-300 text-[15px] sm:text-xs leading-relaxed font-normal">{step.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4. Slide-Out Deep Dive Drawer */}
      <AnimatePresence>
        {activeFeature && selectedData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveFeature(null)}
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
                    Technical Scope
                  </span>
                  <h2 className="text-2xl font-semibold text-brand-ink">{selectedData.title}</h2>
                </div>
                <button
                  onClick={() => setActiveFeature(null)}
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
                    Scope of Deliverables
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
                    Expected ROI Impact
                  </h4>
                  <p className="text-sm font-medium text-slate-200">{selectedData.metrics}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-brand-edge bg-brand-card">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full gap-2 bg-brand-dark text-white py-4 rounded-full font-semibold text-sm hover:bg-brand-light hover:text-brand-onaccent transition-colors shadow-lg"
                >
                  Request Technical Proposal <ArrowUpRight className="w-4 h-4" />
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
              text="Ready to upgrade your manufacturing infrastructure?"
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-slate-300 text-[15px] sm:text-base max-w-xl mx-auto mb-8 font-medium">
              Contact our engineering specialists today for an on-site feasibility study and tailored Industry 4.0 roadmap.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-8 py-4 rounded-full font-bold text-sm hover:bg-white transition-colors shadow-lg"
                >
                  <span>Connect with Solution Architects</span>
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
