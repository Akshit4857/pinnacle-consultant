import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import {
  Home,
  Building2,
  Factory,
  Workflow,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Sparkles,
  ShieldCheck,
  Layers,
  Send,
  Mail,
  Phone,
  User,
  Building,
  Check,
  X,
  TrendingUp,
  Cpu,
  Zap,
  Search,
  Compass,
  FileCheck2,
  Activity,
  ArrowRight,
} from 'lucide-react';

export default function Industry40() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('Industrial Automation');
  const [selectedBudget, setSelectedBudget] = useState('₹5–20 lakh');
  const [activeStageFilter, setActiveStageFilter] = useState<string | null>(null);

  const stages = [
    {
      id: 'Stage 1',
      range: '01–02',
      tag: 'Stage 1 • Scoping & Architecture',
      title: 'Audit, Feasibility & Solution Design',
    },
    {
      id: 'Stage 2',
      range: '03–04',
      tag: 'Stage 2 • Engineering & Validation',
      title: 'Hardware Setup, Testing & Sign-off',
    },
    {
      id: 'Stage 3',
      range: '05–06',
      tag: 'Stage 3 • Rollout & Continuity',
      title: 'Commissioning, Handover & SLAs',
    },
  ];

  const capabilities = [
    {
      id: 'home',
      icon: Home,
      title: 'Home Automation',
      tag: 'Residential',
      subtitle: 'Smart Living & Connected Devices',
      desc: 'Make homes smarter, safer, and more convenient through integrated automation systems.',
      points: [
        'Smart lighting, switches, and appliance controls',
        'Automated curtains, climate schedules, and custom scenes',
        'Smart locks, intrusion sensors, and security integrations',
        'Centralized mobile/voice control and power monitoring',
      ],
      idealFor: 'Villas, modern residences, residential developments, and luxury apartments',
    },
    {
      id: 'building',
      icon: Building2,
      title: 'Building & Workplace Automation',
      tag: 'Commercial & Facilities',
      subtitle: 'Smart Offices & Commercial Spaces',
      desc: 'Improve comfort, energy efficiency, and operational control across corporate offices, facilities, and commercial buildings.',
      points: [
        'Centralized lighting and HVAC automation',
        'Occupancy-based climate and lighting controls',
        'Smart badge/biometric access control and surveillance integration',
        'Real-time energy sub-metering and facility management dashboards',
      ],
      idealFor: 'Corporate headquarters, IT parks, co-working facilities, and commercial institutions',
    },
    {
      id: 'industrial',
      icon: Factory,
      title: 'Industrial Automation',
      tag: 'Manufacturing & Plants',
      subtitle: 'Smart Manufacturing & Operations',
      desc: 'Enable more consistent, efficient, and data-driven industrial operations by connecting machinery, sensors, and shop-floor production lines.',
      points: [
        'PLC, SCADA, and control-system integration',
        'Machine telemetry logging and high-speed data acquisition',
        'Non-invasive IoT equipment monitoring without line shutdowns',
        'Predictive maintenance alerts, vibration analysis, and OEE tracking',
      ],
      idealFor: 'Automotive plants, tier-1 suppliers, assembly lines, and industrial manufacturing units',
    },
    {
      id: 'enterprise',
      icon: Workflow,
      title: 'Enterprise & Workflow Automation',
      tag: 'Business Operations',
      subtitle: 'Business Processes & Digital Operations',
      desc: 'Simplify repetitive business activities and connect workflows across teams, applications, and enterprise systems.',
      points: [
        'Automated data entry, reconciliation, and scheduled report delivery',
        'Multi-stage approval routing and document signing workflows',
        'Repetitive task automation using RPA or AI where practical',
        'Two-way API integrations with SAP, Oracle, Zoho, and custom ERPs',
      ],
      idealFor: 'Finance teams, procurement operations, HR departments, and growing enterprises',
    },
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Discover & Assess',
      stage: 'Stage 1',
      phase: 'Requirements Scoping',
      icon: Search,
      desc: 'We review your current operations, business bottlenecks, existing infrastructure, and automation targets.',
      deliverable: 'Requirements assessment and opportunity blueprint.',
    },
    {
      step: '02',
      title: 'Analyse & Design',
      stage: 'Stage 1',
      phase: 'Architecture Blueprint',
      icon: Compass,
      desc: 'We evaluate hardware/software options, network constraints, integration feasibility, and expected payback.',
      deliverable: 'Solution architecture and phased execution plan.',
    },
    {
      step: '03',
      title: 'Build & Integrate',
      stage: 'Stage 2',
      phase: 'Engineering & Setup',
      icon: Cpu,
      desc: 'We configure and program the agreed solution, integrate hardware, sensors, APIs, and coordinate field setup.',
      deliverable: 'Configured and integrated automation deployment.',
    },
    {
      step: '04',
      title: 'Test & Validate',
      stage: 'Stage 2',
      phase: 'Quality Assurance',
      icon: ShieldCheck,
      desc: 'We run live functional tests, fail-safe validations, and performance benchmark checks against agreed acceptance metrics.',
      deliverable: 'Validation report and formal acceptance sign-off.',
    },
    {
      step: '05',
      title: 'Deploy & Enable',
      stage: 'Stage 3',
      phase: 'Commissioning & Handover',
      icon: Zap,
      desc: 'We manage line commissioning, hand over standard operating procedures, and train facility teams and operators.',
      deliverable: 'Operational handover and user documentation.',
    },
    {
      step: '06',
      title: 'Support & Optimise',
      stage: 'Stage 3',
      phase: 'SLA & Continuous Tuning',
      icon: Activity,
      desc: 'We provide scheduled maintenance, troubleshooting, system health monitoring, and iterative performance tuning.',
      deliverable: 'Ongoing support SLAs and optimization reviews.',
    },
  ];

  const valueProps = [
    {
      icon: Clock,
      title: 'Reduce Repetitive Work',
      desc: 'Automate manual entry, routine switching, and procedural tasks to free your teams for higher-value responsibilities.',
    },
    {
      icon: TrendingUp,
      title: 'Improve Operational Visibility',
      desc: 'Connect isolated systems and sensors into clear dashboards so operational decisions rely on verified, live data.',
    },
    {
      icon: ShieldCheck,
      title: 'Improve Consistency & Control',
      desc: 'Standardize operations with automated checks and fail-safes that eliminate avoidable human oversight errors.',
    },
    {
      icon: Layers,
      title: 'Build for Scalability',
      desc: 'Deploy modular architectures sized for today’s needs with a clear, practical path for future expansion.',
    },
  ];

  const engagementModels = [
    {
      title: 'Consulting & Automation Assessment',
      desc: 'Independent evaluation of your processes and site layout to identify high-ROI opportunities and prioritize rollouts.',
      points: ['On-site feasibility walk', 'Technology gap analysis', 'ROI and payback roadmap'],
    },
    {
      title: 'End-to-End Solution Delivery',
      desc: 'Turnkey execution managing solution design, equipment selection, field wiring/integration, and commissioning.',
      points: ['Single point of accountability', 'Complete hardware & software setup', 'Acceptance testing and user training'],
    },
    {
      title: 'Technology & Implementation Partnerships',
      desc: 'Collaborating alongside your existing internal IT teams, OEM vendors, or mechanical contractors to deliver the mandate.',
      points: ['Vendor-neutral hardware evaluation', 'Direct API and SCADA integration', 'Specialized technical co-delivery'],
    },
    {
      title: 'Maintenance & Ongoing Support',
      desc: 'Structured post-deployment care, firmware patching, sensor calibrations, and continuous optimization support.',
      points: ['Guaranteed technical response times', 'Periodic system calibration', 'Emergency on-call resolution'],
    },
  ];

  const differentiators = [
    {
      title: 'Business-First Approach',
      desc: 'We begin with your practical operational bottleneck, never with a forced, pre-packaged vendor product.',
    },
    {
      title: 'Cross-Industry Experience',
      desc: 'Our background spans commercial technology, manufacturing plants, field logistics, and enterprise services.',
    },
    {
      title: 'Flexible, Pragmatic Execution',
      desc: 'Solutions are engineered around your active infrastructure, budget boundaries, and timeline constraints.',
    },
    {
      title: 'End-to-End Coordination',
      desc: 'From initial scoping to hardware commissioning and team training, we take full responsibility for outcomes.',
    },
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const selectedData = capabilities.find((c) => c.id === activeCategory);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-36 pb-20 md:pt-42 md:pb-24 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        {/* Background photo & overlay */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/industry_robotics_hero.jpg"
            alt="Pinnacle Intelligent Robotics & Industrial Automation"
            className="w-full h-full object-cover object-right lg:object-[82%_center] opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/95 via-45% to-brand-dark/25 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/70" />
        </div>

        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <FloatingOrb className="bottom-0 left-0" size={320} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={2} />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="max-w-2xl lg:max-w-3xl text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-[1.15] tracking-tight">
              {[
                <span key="l1" className="block">
                  Automate Smarter. Operate Better.
                </span>,
                <span key="l2" className="block text-brand-light">
                  Scale Faster
                </span>,
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
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal mb-8 max-w-2xl"
            >
              At Pinnacle Consultants, we help businesses transform daily operations through intelligent automation, connected devices, and customized digital workflows. From smart homes and commercial workplaces to enterprise processes and industrial shop floors, we identify practical opportunities to eliminate repetitive tasks, improve efficiency, and build connected environments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-10 max-w-2xl text-xs sm:text-sm text-slate-200 font-medium backdrop-blur-sm"
            >
              <span className="text-brand-light font-bold">One partner. Multiple possibilities.</span>{' '}
              Automation engineered around your specific operational needs.
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <button
                  onClick={() => scrollToSection('capabilities')}
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white transition-[background-color,color,transform] duration-150 active:scale-[0.96] shadow-lg cursor-pointer"
                >
                  <span>Explore Our Capabilities</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </Magnetic>

              <Magnetic strength={0.2}>
                <button
                  onClick={() => scrollToSection('inquiry')}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white/20 transition-[background-color,border-color,transform] duration-150 active:scale-[0.96] backdrop-blur-sm cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="capabilities" className="py-16 md:py-24 bg-grid-light relative z-20">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Scope of Solutions
            </span>
            <WordReveal
              as="h2"
              text="What Can We Automate?"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Explore four dedicated automation domains engineered for homes, commercial facilities, industrial plants, and business workflows.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((cap, idx) => (
              <ScrollReveal
                key={cap.id}
                direction="up"
                delay={idx * 0.1}
                className="h-full"
              >
                <TiltCard
                  maxTilt={4}
                  lift={6}
                  className="bg-brand-card rounded-[2rem] p-6 sm:p-8 md:p-10 border border-brand-edge shadow-sm hover:shadow-xl transition-[box-shadow,transform] duration-200 ease-out flex flex-col justify-between group h-full"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-brand-bg text-brand-ink flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-light transition-colors">
                        <cap.icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <span className="text-[10px] font-bold bg-brand-dark/10 text-brand-ink px-3 py-1 rounded-full uppercase tracking-wider">
                        {cap.tag}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-brand-ink mb-1">{cap.title}</h3>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-4">
                      {cap.subtitle}
                    </p>
                    <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6">
                      {cap.desc}
                    </p>

                    <div className="pt-4 border-t border-brand-edge mb-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                        Key Capabilities Included:
                      </h4>
                      <ul className="space-y-2.5">
                        {cap.points.map((pt, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs text-brand-muted font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-edge flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="text-[11px] text-slate-500 font-medium max-w-xs">
                      <span className="font-bold text-brand-ink">Typical Fit:</span> {cap.idealFor}
                    </div>
                    <button
                      onClick={() => {
                        setSelectedService(cap.title);
                        scrollToSection('inquiry');
                      }}
                      className="inline-flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] px-5 py-3 rounded-xl font-bold text-xs transition-colors shrink-0 cursor-pointer shadow-sm"
                    >
                      <span>Inquire for {cap.title}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation Workflow */}
      <section className="py-20 md:py-28 bg-brand-dark text-white relative overflow-hidden">
        {/* Ambient Glows */}
        <FloatingOrb className="-top-32 right-1/4" size={450} colorClass="bg-brand-light/10" blurClass="blur-3xl" delay={1} />
        <FloatingOrb className="bottom-10 left-10" size={350} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={3} />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-3 inline-flex items-center gap-2 bg-brand-light/10 border border-brand-light/25 px-3.5 py-1.5 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              Structured Six-Step Implementation
            </span>
            <WordReveal
              as="h2"
              text="From Business Challenge to Intelligent Automation"
              className="text-2xl sm:text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4"
            />
            <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl mx-auto">
              A requirement-driven delivery roadmap built around milestone sign-offs, safe commissioning, and zero unexpected production halts.
            </p>
          </ScrollReveal>

          {/* Infographic Stage Progress Tracker Bar */}
          <div className="mb-12">
            <div className="hidden lg:grid grid-cols-3 gap-4 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
              {stages.map((stg) => {
                const isSelected = activeStageFilter === stg.id;
                return (
                  <button
                    key={stg.id}
                    type="button"
                    onClick={() => setActiveStageFilter(isSelected ? null : stg.id)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl transition-[background-color,border-color,color,box-shadow,transform] duration-150 active:scale-[0.98] text-left cursor-pointer group ${isSelected
                        ? 'bg-brand-light/15 border border-brand-light shadow-md shadow-brand-light/10 ring-1 ring-brand-light/40'
                        : 'bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/15'
                      }`}
                  >
                    <span
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold text-xs tracking-tight shrink-0 transition-colors tabular-nums ${isSelected
                          ? 'bg-brand-light text-brand-onaccent shadow-sm'
                          : 'bg-white/10 text-brand-light group-hover:bg-brand-light/20'
                        }`}
                    >
                      {stg.range}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors ${isSelected ? 'text-brand-light' : 'text-slate-400 group-hover:text-slate-300'
                          }`}
                      >
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-light inline-block animate-pulse shrink-0" />
                        )}
                        <span className="truncate">{stg.tag}</span>
                      </div>
                      <div className="text-xs font-semibold text-white truncate">{stg.title}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile / Active Filter State Reset Pill */}
            {activeStageFilter && (
              <div className="mt-3 flex items-center justify-between text-xs px-2">
                <span className="text-slate-400">
                  Showing <strong className="text-brand-light">{activeStageFilter}</strong> steps only
                </span>
                <button
                  type="button"
                  onClick={() => setActiveStageFilter(null)}
                  className="text-brand-light hover:underline font-semibold"
                >
                  Show all six steps
                </button>
              </div>
            )}
          </div>

          {/* Connected Infographic Step Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {workflowSteps.map((step, idx) => {
              const StepIcon = step.icon;
              const isFiltered = activeStageFilter !== null;
              const isMatch = !isFiltered || step.stage === activeStageFilter;

              return (
                <ScrollReveal
                  key={step.step}
                  direction="up"
                  delay={idx * 0.08}
                  className={`relative group transition-[opacity,transform] duration-300 h-full ${
                    isMatch ? 'opacity-100 scale-100' : 'opacity-30 scale-[0.98] pointer-events-none'
                  }`}
                >
                  <TiltCard
                    maxTilt={3}
                    lift={6}
                    className={`h-full rounded-[2rem] p-6 sm:p-7 bg-white/[0.04] hover:bg-white/[0.07] border transition-[background-color,border-color,box-shadow] duration-200 ease-out flex flex-col justify-between relative shadow-xl backdrop-blur-sm overflow-hidden ${isFiltered && isMatch
                        ? 'border-brand-light shadow-[0_0_25px_rgba(212,175,55,0.18)]'
                        : 'border-white/10 hover:border-brand-light/50'
                      }`}
                  >
                    {/* Top ambient corner glow */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-brand-light/10 rounded-full blur-2xl pointer-events-none group-hover:bg-brand-light/20 transition-colors duration-500" />

                    <div>
                      {/* Step Header Badge & Stage indicator */}
                      <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-brand-light/15 text-brand-light border border-brand-light/30 flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform duration-300 tabular-nums">
                            {step.step}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-light block">
                              {step.stage}
                            </span>
                            <span className="text-xs font-medium text-slate-300">
                              {step.phase}
                            </span>
                          </div>
                        </div>

                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center group-hover:bg-brand-light group-hover:text-brand-onaccent transition-colors shrink-0">
                          <StepIcon className="w-5 h-5" />
                        </div>
                      </div>

                      {/* Step Title & Description */}
                      <h3 className="text-xl font-bold text-white mb-2.5 group-hover:text-brand-light transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-300 text-[14px] leading-relaxed font-normal mb-6">
                        {step.desc}
                      </p>
                    </div>

                    {/* Infographic Deliverable Capsule Box */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="rounded-xl p-3.5 bg-gradient-to-r from-emerald-950/40 via-black/30 to-emerald-950/20 border border-emerald-500/25 group-hover:border-brand-light/40 transition-colors">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-light mb-1.5">
                          <FileCheck2 className="w-3.5 h-3.5 text-brand-light shrink-0" />
                          <span>Output Deliverable</span>
                        </div>
                        <p className="text-xs font-semibold text-white leading-snug">
                          {step.deliverable}
                        </p>
                      </div>
                    </div>
                  </TiltCard>

                  {/* Flow Arrow Indicator on Desktop (between items 1->2, 2->3, 4->5, 5->6) */}
                  {(idx === 0 || idx === 1 || idx === 3 || idx === 4) && (
                    <div className="hidden lg:flex absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-brand-dark border border-brand-light/40 text-brand-light items-center justify-center shadow-lg pointer-events-none">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </ScrollReveal>
              );
            })}
          </div>

          {/* Bottom Reassurance Banner */}
          <div className="mt-14 p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-center flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-300">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0" />
              <span>Full statutory safety &amp; fail-safe testing</span>
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0" />
              <span>Zero unplanned line disruption</span>
            </span>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-white/20"></span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-light shrink-0" />
              <span>Documented SOPs &amp; operator training</span>
            </span>
          </div>
        </div>
      </section>

      {/* Business Value */}
      <section className="py-16 md:py-24 bg-brand-bg border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Business Outcomes
            </span>
            <WordReveal
              as="h2"
              text="How We Create Business Value"
              className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              We design every solution around clear operational payoffs, not technology for the sake of technology.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((val, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08} className="h-full">
                <TiltCard
                  maxTilt={4}
                  lift={4}
                  className="bg-brand-card p-6 sm:p-8 rounded-2xl border border-brand-edge shadow-sm flex flex-col justify-between h-full"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-brand-bg text-brand-ink flex items-center justify-center mb-5">
                      <val.icon className="w-6 h-6 text-emerald-700" />
                    </div>
                    <h3 className="text-lg font-bold text-brand-ink mb-2">{val.title}</h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-medium">{val.desc}</p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="py-16 md:py-24 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Flexible Collaboration
            </span>
            <WordReveal
              as="h2"
              text="Our Engagement Models"
              className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Choose the level of engagement that fits your project stage, internal team capacity, and budget.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {engagementModels.map((model, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.08} className="h-full">
                <TiltCard
                  maxTilt={4}
                  lift={5}
                  className="bg-brand-bg p-6 rounded-2xl border border-brand-edge flex flex-col justify-between hover:border-brand-dark transition-colors h-full"
                >
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-brand-light/30 px-2.5 py-1 rounded-full mb-3 inline-block tabular-nums">
                      Model 0{idx + 1}
                    </div>
                    <h3 className="text-base font-bold text-brand-ink mb-2">{model.title}</h3>
                    <p className="text-xs text-brand-muted leading-relaxed font-medium mb-6">
                      {model.desc}
                    </p>
                    <ul className="space-y-2 pt-4 border-t border-brand-edge">
                      {model.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-xs text-brand-muted font-medium">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-16 md:py-24 bg-brand-dark text-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={1} />
        <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
          <ScrollReveal direction="up" className="max-w-2xl mb-14">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Differentiators
            </span>
            <WordReveal
              as="h2"
              text="Beyond Automation. Towards Transformation."
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6"
            />
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-medium">
              At Pinnacle Consultants, we bring cross-industry experience spanning technology, consulting, manufacturing, and emerging mobility ecosystems. We focus on understanding the real problem before recommending a solution, aligning technology decisions with operational needs and business outcomes.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {differentiators.map((diff, idx) => (
              <ScrollReveal key={idx} direction="up" delay={idx * 0.1} className="h-full">
                <TiltCard
                  maxTilt={4}
                  lift={5}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-colors h-full"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-light text-brand-onaccent flex items-center justify-center font-bold shrink-0 text-sm tabular-nums">
                      0{idx + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{diff.title}</h3>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Inquiry */}
      <section id="inquiry" className="py-16 md:py-24 bg-brand-bg relative">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-emerald-800 font-bold text-xs uppercase tracking-widest bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Direct Inquiry
            </span>
            <WordReveal
              as="h2"
              text="Let's Automate What Matters"
              className="text-3xl sm:text-4xl font-bold text-brand-ink mt-4 mb-3"
            />
            <p className="text-brand-muted text-sm md:text-base font-medium">
              Have an idea, an operational challenge, or a process you want to simplify? Tell us what you are looking to achieve. Our team will connect with you to review your requirements and outline next steps.
            </p>
          </ScrollReveal>

          <ScrollReveal scale={0.98} duration={0.6} className="w-full">
            <div className="bg-brand-card rounded-[2rem] border border-brand-edge p-6 sm:p-10 md:p-12 shadow-xl">
            {!formSubmitted ? (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Company / Organisation
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Manufacturing or Facility Co."
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Business Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="rahul@company.com"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Contact Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-4 py-3.5 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    What would you like to automate? *
                  </label>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {[
                      'Home Automation',
                      'Building & Workplace Automation',
                      'Industrial Automation',
                      'Enterprise & Workflow Automation',
                      'IoT, AI or System Integration',
                      'Other / Not Sure Yet',
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setSelectedService(opt)}
                        className={`text-left p-3 rounded-xl border text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${selectedService === opt
                            ? 'bg-brand-dark text-white border-brand-dark'
                            : 'bg-brand-bg text-brand-ink border-brand-edge hover:border-brand-dark/40'
                          }`}
                      >
                        <span>{opt}</span>
                        {selectedService === opt && <Check className="w-3.5 h-3.5 text-brand-light" />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Briefly describe your requirement *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current setup, target equipment/space, key challenges, or launch timeframe..."
                    className="w-full bg-brand-bg border border-brand-edge rounded-xl p-4 text-sm font-medium text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                    Estimated Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Below ₹1 lakh', '₹1–5 lakh', '₹5–20 lakh', 'Above ₹20 lakh', 'To be discussed'].map(
                      (b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setSelectedBudget(b)}
                          className={`px-4 py-2 rounded-lg border text-xs font-semibold transition-colors cursor-pointer ${selectedBudget === b
                              ? 'bg-brand-dark text-brand-light border-brand-dark'
                              : 'bg-brand-bg text-brand-ink border-brand-edge hover:border-brand-dark/40'
                            }`}
                        >
                          {b}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] py-4 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="w-4 h-4" />
                </button>

                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 gap-2">
                  <span>Confidential inquiry • Reviewed within 24 hours</span>
                  <span>
                    Official contact:{' '}
                    <a
                      href="mailto:shikha@pinnacleconsultant.co.in"
                      className="text-brand-ink font-bold hover:underline"
                    >
                      shikha@pinnacleconsultant.co.in
                    </a>
                  </span>
                </div>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-brand-light/30 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-ink mb-2">Inquiry Submitted</h3>
                <p className="text-brand-muted text-sm max-w-md mx-auto mb-6">
                  Thank you for sharing your automation requirements. Our team will review the parameters and connect with you directly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="inline-flex items-center gap-2 bg-brand-dark text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </div>
            )}
          </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-dark text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={1} />
            <WordReveal
              as="h2"
              text="Your Next Step Towards Smarter Operations Starts Here."
              className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 tracking-tight"
            />
            <p className="text-slate-300 text-[15px] sm:text-base max-w-xl mx-auto mb-8 font-medium">
              Whether you want to automate a single process, create a connected environment, or transform an entire operation, Pinnacle Consultants can help you explore the right approach.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollToSection('inquiry')}
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg cursor-pointer"
                >
                  <span>Discuss Your Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="mailto:shikha@pinnacleconsultant.co.in"
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 px-8 py-4 rounded-full font-semibold text-sm hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
                >
                  <span>Email Our Team</span>
                </a>
              </Magnetic>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
