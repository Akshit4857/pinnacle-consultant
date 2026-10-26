import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight, Zap, Users, Quote, Wrench, Layers } from 'lucide-react';
import { cn } from '../lib/utils';
import { CompanyLogo } from '../components/CompanyLogos';
import { ScrollReveal, staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import SEO from '../components/SEO';

export default function Impact() {
  const [filter, setFilter] = useState<'all' | 'maintenance' | 'parking' | 'epc'>('all');

  const clientPortfolios = [
    {
      id: 'ather',
      category: 'maintenance',
      name: 'Ather Energy',
      domain: 'atherenergy.com',
      solution: 'Charger Maintenance & Uptime SLA Support',
      industry: 'EV Fast Charging',
      badge: 'Charger Maintenance',
      scope: 'Providing certified high-voltage EV technicians and rapid-response mobile service vans across active fast-charging hubs to maintain a contractual 99.4% station uptime.',
      highlights: [
        'Scheduled preventive AMC, connector gun triage & power module swaps',
        'Rapid on-ground MTTR response for high-traffic city charging hubs',
        'Detailed health logs and telemetry error code resolutions',
      ],
    },
    {
      id: 'hero',
      category: 'epc',
      name: 'Hero MotoCorp',
      domain: 'heromotocorp.com',
      solution: 'Turnkey EPC & Charging Station Operations',
      industry: 'Automotive & Clean Mobility',
      badge: 'Turnkey EPC & AMC',
      scope: 'Turnkey execution of EV charging bays, parking lot electrical infrastructure, and trained station attendants across dealership and commercial transit points.',
      highlights: [
        'Civil works, cable ducting, transformer sizing & charger commissioning',
        'Trained attendants for daily vehicle turnover and driver assistance',
        'Milestone-based project handover within tight delivery schedules',
      ],
    },
    {
      id: 'magenta',
      category: 'parking',
      name: 'Magenta EV',
      domain: 'magentamobility.com',
      solution: 'Pan-India Charging & Parking Network Services',
      industry: 'Clean Fleet Logistics & Charging',
      badge: 'Charging & Parking Network',
      scope: 'Operating integrated charging and parking hubs across major commercial hubs and logistics corridors with live bay telemetry and turnover optimization.',
      highlights: [
        'Dedicated bay allocation and managed access for electric commercial fleets',
        '24/7 on-site attendant monitoring and queue mitigation protocols',
        'Scheduled electrical audits and power stability checks',
      ],
    },
    {
      id: 'fepl',
      category: 'parking',
      name: 'FEPL',
      domain: 'fepl.co',
      solution: 'Charging & Parking Facility Management',
      industry: 'Clean Power & EV Infra',
      badge: 'Parking & Charging',
      scope: 'Turnkey management of captive charging-parking facilities, handling daily operations, power connection monitoring, and customer assistance.',
      highlights: [
        'Direct integration with parking facility management systems',
        'Real-time bay turnover monitoring to prevent idle bay blocking',
        'Strict adherence to electrical safety and fire protection standards',
      ],
    },
    {
      id: 'vertiv',
      category: 'maintenance',
      name: 'Vertiv EV',
      domain: 'vertiv.com',
      solution: 'Charging Power Infrastructure & Preventive Maintenance',
      industry: 'Critical Digital & Power Infra',
      badge: 'Power & Infra AMC',
      scope: 'Coordinating field engineering support, electrical power conditioning, and preventive AMC for critical commercial charging parking installations.',
      highlights: [
        'Power backup and transformer load health diagnostics',
        'Scheduled preventative servicing to minimize unplanned outages',
        'Multi-city field engineering coordination',
      ],
    },
  ];

  const filtered =
    filter === 'all' ? clientPortfolios : clientPortfolios.filter((c) => c.category === filter);

  return (
    <div className="w-full">
      <SEO
        title="Client Impact & Case Studies | Pinnacle Consultant"
        description="Proven enterprise track record across 200+ EV charging locations and high-volume technical staffing deployments with Hero MotoCorp, Ather Energy, and Magenta EV."
        keywords="Pinnacle Consultant case studies, EV rollout success stories, enterprise staffing case study, charger maintenance track record"
        canonicalPath="/impact"
      />
      {/* Hero Header */}
      <section className="pt-36 pb-16 md:pt-44 md:pb-28 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <FloatingOrb className="bottom-0 left-0" size={320} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={2} />

        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-6 leading-[1.1] tracking-tight">
            {[
              <span key="l1" className="block">Enterprise Work Delivered for</span>,
              <span key="l2" className="block text-brand-light">India’s Clean Mobility &amp; Industrial Leaders.</span>,
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
            className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-medium mb-10"
          >
            Verified project deployments across nationwide EV charging and parking networks, charger maintenance with 99.4% uptime SLA, turnkey EPC rollouts, and specialized technical workforce staffing.
          </motion.p>
        </div>
      </section>

      {/* Visual Field Operations */}
      <section className="py-12 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* EV Infra Card */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="rounded-[2.5rem] overflow-hidden border border-brand-edge shadow-md relative group bg-brand-dark h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="/images/ev_charging_hub.jpg"
                      alt="EV Infrastructure Execution"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 outline outline-1 -outline-offset-1 outline-black/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-brand-light border border-white/20 uppercase tracking-wider">
                      Nationwide EV Charging &amp; Parking Network
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">Charging, Parking &amp; Charger Maintenance</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                      Turnkey EPC rollouts, parking network operations, and certified maintenance maintaining 99.4% station uptime for Ather Energy, Hero MotoCorp, Magenta EV, FEPL, and Vertiv EV.
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/10 mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-light tabular-nums">200+ Locations Supported</span>
                  <Link
                    to="/tech-ev"
                    className="text-xs font-bold text-white hover:text-brand-light inline-flex items-center gap-1 group py-2"
                  >
                    <span>Explore EV Solutions</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>

            {/* Manpower Staffing Card */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="rounded-[2.5rem] overflow-hidden border border-brand-edge shadow-md relative group bg-brand-dark h-full flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src="/images/corporate_staffing_team.jpg"
                      alt="Workforce Deployment Execution"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 outline outline-1 -outline-offset-1 outline-black/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-black/30" />
                    <div className="absolute top-4 left-4 bg-brand-dark/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-bold text-brand-light border border-white/20 uppercase tracking-wider">
                      Contractual Technical Workforce
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">High-Voltage Technicians &amp; Operations Teams</h3>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium mb-4">
                      Supplying screened diagnostic mechanics, depot shift supervisors, and on-ground field personnel for leading industrial and clean mobility partners with 100% statutory clearance.
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-white/10 mt-auto flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-light tabular-nums">500+ Technical Roles Placed</span>
                  <Link
                    to="/staffing"
                    className="text-xs font-bold text-white hover:text-brand-light inline-flex items-center gap-1 group py-2"
                  >
                    <span>Explore Staffing Solutions</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Client Portfolio Grid */}
      <section className="py-16 md:py-24 bg-dots-light relative">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" distance={20} className="flex flex-wrap justify-center gap-3 mb-16 border-b border-brand-edge pb-8">
            {[
              { id: 'all', label: 'All Five Client Partners' },
              { id: 'maintenance', label: 'Charger Maintenance & AMC' },
              { id: 'parking', label: 'Charging & Parking Network' },
              { id: 'epc', label: 'Turnkey EPC Services' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={cn(
                  'px-6 py-3 min-h-11 rounded-full font-bold text-xs sm:text-sm transition-colors duration-150 active:scale-[0.96] border shadow-sm cursor-pointer',
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    className="bg-brand-card rounded-[2.5rem] p-6 sm:p-8 border border-brand-edge shadow-sm hover:shadow-xl hover:border-brand-dark/30 transition-colors flex flex-col justify-between group h-full"
                  >
                    <div>
                      <div className="flex flex-wrap items-start justify-between mb-6 pb-6 border-b border-brand-edge gap-4">
                        <div className="flex items-center gap-4">
                          <CompanyLogo
                            domain={client.domain}
                            name={client.name}
                            size={52}
                            className="bg-brand-bg p-2 shrink-0"
                          />
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-brand-light/30 px-3 py-1 rounded-full mb-1 inline-block">
                              {client.industry}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-semibold text-brand-ink mt-0.5">{client.name}</h3>
                          </div>
                        </div>
                        <span className="text-xs font-semibold bg-brand-dark text-brand-light px-3 py-1.5 rounded-full shrink-0">
                          {client.badge}
                        </span>
                      </div>

                      <div className="mb-6">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                          Engagement Scope
                        </div>
                        <div className="text-sm font-bold text-brand-ink">{client.solution}</div>
                      </div>

                      <p className="text-brand-muted font-medium text-xs sm:text-[13px] leading-relaxed mb-6 bg-brand-bg p-4 rounded-2xl border border-brand-edge">
                        {client.scope}
                      </p>

                      <div className="space-y-2.5 mb-8">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                          Key Deliverables
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
                        className="text-xs font-bold text-brand-ink group-hover:text-emerald-700 inline-flex items-center gap-1 py-2 -my-2 group-hover:translate-x-1 transition-[color,transform] duration-200"
                      >
                        <span>Discuss Requirements</span>
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

      {/* Client Endorsements */}
      <section className="py-16 md:py-24 bg-brand-dark text-white border-t border-slate-800">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" distance={24} className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Endorsements
            </span>
            <WordReveal
              as="h2"
              text="Client Feedback & Ground Results"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-4"
            />
            <p className="text-slate-300 text-sm font-medium">
              Direct feedback from operations heads and clean mobility infrastructure leads.
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
                className="bg-brand-dark-2 p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative hover:bg-brand-dark-4 transition-colors group h-full flex flex-col justify-between"
              >
                <Quote className="w-10 h-10 text-brand-light/30 absolute top-8 right-8" />
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-8 relative z-10">
                  “Pinnacle's certified technicians and mobile vans keep our charging network running with high uptime. They handle civil works, electrical liaison, and daily charger maintenance with complete ownership.”
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center font-bold text-sm">
                    HM
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Infrastructure Lead</div>
                    <div className="text-xs text-brand-light">Hero MotoCorp Charging Division</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>

            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={4}
                lift={6}
                className="bg-brand-dark-2 p-6 sm:p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative hover:bg-brand-dark-4 transition-colors group h-full flex flex-col justify-between"
              >
                <Quote className="w-10 h-10 text-brand-light/30 absolute top-8 right-8" />
                <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium mb-8 relative z-10">
                  “Pinnacle manages our parking and fast-charging facility bays with complete discipline. Their live telemetry monitoring, queue management, and on-site staff have streamlined our operational turnaround across hubs.”
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-brand-light text-brand-onaccent flex items-center justify-center font-bold text-sm">
                    ME
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">Operations Head</div>
                    <div className="text-xs text-brand-light">Magenta EV Charging &amp; Parking Network</div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Consultation Banner */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal direction="up" distance={30}>
          <div className="bg-brand-light text-brand-onaccent rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <WordReveal
              as="h2"
              text="Have an upcoming deployment or staffing requirement?"
              className="text-2xl sm:text-3xl md:text-5xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-brand-ink/80 text-sm md:text-base max-w-xl mx-auto mb-8 font-medium">
              Speak with our practice leads about your project timeline, headcount numbers, or infrastructure specifications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-dark text-white pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-brand-dark-2 hover:text-brand-light transition-colors duration-150 active:scale-[0.96] shadow-lg"
                >
                  <span>Discuss Your Project With Us</span>
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

