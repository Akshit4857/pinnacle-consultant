import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight, Zap, Users, Sparkles, Quote } from 'lucide-react';
import { cn } from '../lib/utils';
import { CompanyLogo } from '../components/CompanyLogos';
import { ScrollReveal, staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';

export default function Impact() {
  const [filter, setFilter] = useState<'all' | 'ev' | 'staffing'>('all');

  const clientPortfolios = [
    {
      id: 'hero',
      category: 'ev',
      name: 'Hero MotoCorp',
      domain: 'heromotocorp.com',
      solution: 'EV Infrastructure & Contractual Manpower Supply',
      industry: 'Automotive',
      badge: 'Fortune-500 Leader',
      scope: 'Designed and deployed end-to-end EV enablement for Hero, including charging infrastructure, parking operations, and skilled service teams to accelerate market rollout.',
      highlights: [
        'End-to-end charging station civil & electrical setup',
        'Trained parking & operational station attendants',
        'Turnkey market rollout acceleration',
      ],
    },
    {
      id: 'exponent',
      category: 'staffing',
      name: 'Exponent Energy',
      domain: 'exponent.energy',
      solution: 'Contractual Manpower Supply',
      industry: 'EV Fast Charging',
      badge: 'Rapid Deployment',
      scope: 'Supporting Exponent with skilled on-ground personnel to power their rapid 15-minute charging network deployment goals across Indian metropolitan hubs.',
      highlights: [
        'Vetted technical on-ground personnel',
        'Zero-lag ramp-up for urgent deployment milestones',
        '100% statutory payroll & labor compliance managed',
      ],
    },
    {
      id: 'gomechanic',
      category: 'staffing',
      name: 'GoMechanic',
      domain: 'gomechanic.in',
      solution: 'EV Repair & Maintenance Staffing',
      industry: 'Automobile Servicing',
      badge: 'Garage Diagnostics',
      scope: 'Supporting EV garage operations with trained manpower for diagnostics, servicing, high-voltage component triage, and professional customer handling.',
      highlights: [
        'EV-certified diagnostic mechanics & technicians',
        'Preventive inspection & breakdown triage workflows',
        'Enhanced customer satisfaction and garage turnaround',
      ],
    },
    {
      id: 'sunmobility',
      category: 'ev',
      name: 'Sun Mobility',
      domain: 'sunmobility.com',
      solution: 'Contractual Workforce Deployment & Swapping Operations',
      industry: 'Battery Swapping Ecosystem',
      badge: 'Clean Mobility at Scale',
      scope: 'Enabling smooth operations and servicing at scale for clean mobility infrastructure, battery swapping stations, and depot operations.',
      highlights: [
        'High-density battery swapping attendants & supervisors',
        'Safety-certified high-voltage handling protocols',
        'Zero-downtime operational shift coverage',
      ],
    },
    {
      id: 'gentari',
      category: 'ev',
      name: 'Gentari (Petronas)',
      domain: 'gentari.com',
      solution: 'EV Charging Infrastructure Support',
      industry: 'Clean Energy & Sustainability',
      badge: 'Global Energy Backbone',
      scope: 'Strategic deployment of skilled resources and infrastructure support for building India’s premier commercial EV charging backbone.',
      highlights: [
        'Strategic resource deployment across charging hubs',
        'Highway corridor electrical infrastructure liaison',
        'Rigorous uptime standards & HSE adherence',
      ],
    },
    {
      id: 'revfin',
      category: 'staffing',
      name: 'Revfin Services',
      domain: 'revfin.in',
      solution: 'Fixed-Term Employment (FTE) Staffing',
      industry: 'EV Finance & Telematics',
      badge: 'Fintech & Mobility',
      scope: 'Delivering focused hiring support for specialized roles in EV lending, credit assessment, telemetry monitoring, and financial underwriting.',
      highlights: [
        'Targeted hiring for specialized telematics roles',
        'EV lending credit and field verification teams',
        'Reduced recruitment cycle time and higher retention',
      ],
    },
  ];

  const filtered =
    filter === 'all' ? clientPortfolios : clientPortfolios.filter((c) => c.category === filter);

  return (
    <div className="w-full">
      {/* 1. Hero Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-28 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        {/* Ambient Decorative Glows */}
        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <FloatingOrb className="bottom-0 left-0" size={320} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={2} />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-6 border border-white/15 backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-light" />
            <span className="text-brand-light font-bold text-xs uppercase tracking-wider">
              Customer Success & Real Impact
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-6xl md:text-7xl font-semibold mb-6 leading-[1.1] tracking-tight">
            {[
              <span key="l1" className="block">We are proud to have worked with India’s</span>,
              <span key="l2" className="block text-brand-light">most forward-thinking companies.</span>,
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
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            Our industry-first approach, fast turnaround, and people-centric mindset have helped us deliver real impact — across manpower, mobility, and infrastructure.
          </motion.p>
        </div>
      </section>

      {/* 2. Visual Field Operations Showcase */}
      <section className="py-12 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* EV Infra Creative */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="rounded-[2.5rem] overflow-hidden border border-brand-edge shadow-md relative group bg-brand-dark h-full"
              >
              <div className="relative h-60 overflow-hidden">
                <img
                  src="/images/ev_charging_hub.jpg"
                  alt="EV Infrastructure Execution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/30" />
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-brand-light border border-white/20 uppercase tracking-wider">
                  EV Infra & Swapping Ops
                </div>
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">High-Voltage Charging & Depot Deployment</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Supporting Hero MotoCorp, Sun Mobility, and Gentari with station planning, electrical liaison, and trained station attendants.
                </p>
              </div>
              </TiltCard>
            </motion.div>

            {/* Manpower Staffing Creative */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="rounded-[2.5rem] overflow-hidden border border-brand-edge shadow-md relative group bg-brand-dark h-full"
              >
              <div className="relative h-60 overflow-hidden">
                <img
                  src="/images/corporate_staffing_team.jpg"
                  alt="Workforce Deployment Execution"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/30" />
                <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-brand-light border border-white/20 uppercase tracking-wider">
                  Technical & Contractual Manpower
                </div>
              </div>
              <div className="p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Diagnostic Technicians & Surge Placements</h3>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  Enabling Exponent Energy, Revfin, and GoMechanic with skilled diagnostic mechanics, fintech analysts, and zero-lag surge teams.
                </p>
              </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 3. Client Grid with Filters */}
      <section className="py-16 md:py-24 bg-dots-light relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          {/* Filters */}
          <ScrollReveal direction="up" distance={20} className="flex flex-wrap justify-center gap-3 mb-16 border-b border-brand-edge pb-8">
            {[
              { id: 'all', label: 'All Client Partners' },
              { id: 'ev', label: 'EV Infrastructure & Clean Energy' },
              { id: 'staffing', label: 'Workforce & Technical Staffing' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={cn(
                  'px-6 py-3 rounded-full font-bold text-xs sm:text-sm transition-all border shadow-sm',
                  filter === f.id
                    ? 'bg-brand-dark text-brand-light border-brand-dark'
                    : 'bg-brand-card text-brand-ink border-brand-edge hover:border-brand-dark hover:bg-brand-bg'
                )}
              >
                {f.label}
              </button>
            ))}
          </ScrollReveal>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filtered.map((client) => (
                <motion.div
                  key={client.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4 }}
                >
                  <TiltCard
                    maxTilt={4}
                    lift={6}
                    className="bg-brand-card rounded-[2.5rem] p-6 sm:p-8 md:p-10 border border-brand-edge shadow-sm hover:shadow-xl hover:border-brand-dark/30 transition-colors flex flex-col justify-between group h-full"
                  >
                  <div>
                    <div className="flex flex-wrap items-start justify-between mb-6 pb-6 border-b border-brand-edge gap-4">
                      <div className="flex items-center gap-4">
                        <CompanyLogo
                          domain={client.domain}
                          name={client.name}
                          size={52}
                          className="bg-brand-bg p-2"
                        />
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-brand-light/30 px-3 py-1 rounded-full mb-1 inline-block">
                            {client.industry}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mt-0.5">{client.name}</h3>
                        </div>
                      </div>
                      <span className="text-xs font-semibold bg-brand-dark text-brand-light px-3 py-1.5 rounded-full shrink-0">
                        {client.badge}
                      </span>
                    </div>

                    <div className="mb-6">
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                        Mandate Solution
                      </div>
                      <div className="text-base font-bold text-brand-ink">{client.solution}</div>
                    </div>

                    <p className="text-brand-muted font-medium text-sm leading-relaxed mb-6 bg-brand-bg p-4 rounded-2xl border border-brand-edge">
                      {client.scope}
                    </p>

                    <div className="space-y-2.5 mb-8">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                        Execution Highlights
                      </h4>
                      {client.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-edge flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-400">Verified Client Partner</span>
                    <Link
                      to="/contact"
                      className="text-xs font-bold text-brand-ink group-hover:text-emerald-700 inline-flex items-center gap-1 group-hover:translate-x-1 transition-all"
                    >
                      <span>Request Similar Mandate</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. Verified Client Testimonials */}
      <section className="py-16 md:py-24 bg-brand-dark text-white border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Endorsements
            </span>
            <WordReveal
              as="h2"
              text="What Industry Partners Say"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
            />
            <p className="text-slate-300 text-sm font-medium">
              Real testimonials from operations heads and founders scaling with Pinnacle.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="bg-brand-dark-2 p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative hover:bg-brand-dark-4 transition-colors group h-full"
              >
              <Quote className="w-10 h-10 text-brand-light/30 absolute top-8 right-8" />
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-8 relative z-10">
                “Pinnacle resolved our scaling bottleneck by deploying skilled operational personnel for our battery swapping operations with 100% compliance accuracy. Their operational speed is remarkable.”
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center font-bold text-sm">
                  SM
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Operations Lead</div>
                  <div className="text-xs text-brand-light">Sun Mobility Ecosystem</div>
                </div>
              </div>
              </TiltCard>
            </motion.div>

            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="bg-brand-dark-2 p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative hover:bg-brand-dark-4 transition-colors group h-full"
              >
              <Quote className="w-10 h-10 text-brand-light/30 absolute top-8 right-8" />
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-8 relative z-10">
                “Finding EV mechanics with hands-on diagnostic experience was our biggest bottleneck. Pinnacle supplied thoroughly screened technical teams who hit the ground running on Day 1.”
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <div className="w-12 h-12 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center font-bold text-sm">
                  GM
                </div>
                <div>
                  <div className="font-bold text-white text-sm">Service Operations Head</div>
                  <div className="text-xs text-brand-light">GoMechanic EV Division</div>
                </div>
              </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Bottom Consultation Banner */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal direction="up" distance={30}>
          <div className="bg-brand-light text-brand-onaccent rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <WordReveal
              as="h2"
              text="Ready to accelerate your company’s growth?"
              className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-brand-ink/80 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium">
              Join India’s top EV, manufacturing, and technology companies who trust Pinnacle for rapid deployment and guaranteed compliance.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-dark text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-brand-dark-2 hover:text-brand-light transition-all shadow-lg"
                >
                  <span>Discuss Your Mandate With Us</span>
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
