import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { CountUp } from '@/components/ui/count-up';
import BrochureModal from '../components/BrochureModal';
import CompanyLogos from '../components/CompanyLogos';
import ScrollReveal, { staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import {
  Zap,
  Wrench,
  Layers,
  ShieldCheck,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  ChevronDown,
  X,
  Download,
  Activity,
  Gauge,
  Check,
  Award,
  Cpu,
} from 'lucide-react';
import SEO from '../components/SEO';

export default function TechEv() {
  const [activeTech, setActiveTech] = useState<string | null>(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const techEvSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Electric Vehicle Infrastructure EPC & AMC',
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
    description: 'Turnkey EV charging station rollouts, DISCOM power sanctions, HT transformer installations, and 24/7 AMC with a committed 99.4% charger uptime SLA.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
      description: 'Turnkey EPC and AMC service packages with 18-35 day deployment SLA.',
    },
  };

  const evFaqs = [
    {
      q: 'How fast can Pinnacle deploy a commercial EV charging or swapping hub?',
      a: 'A standard turnkey rollout takes 18 to 35 business days from site feasibility to live grid synchronization. This covers DISCOM load calculation, transformer civil pad work, cabling ducting, charger commissioning, and CMS cloud integration.',
    },
    {
      q: 'Do you handle DISCOM load sanctions and CEIG electrical safety approvals?',
      a: 'Yes, end-to-end. We manage complete liaison with state electricity distribution companies (DISCOMs), power load sanctions (HT/LT), sub-station feeder approvals, and statutory Chief Electrical Inspector to Government (CEIG) clearance certificates.',
    },
    {
      q: 'How is the 99.4% uptime SLA guaranteed under your AMC contract?',
      a: 'Our AMC combines 24/7 remote IoT telemetry monitoring with pre-scheduled monthly preventive maintenance and dedicated mobile service vans operating across key highway and city corridors with a guaranteed 4-hour breakdown MTTR response.',
    },
    {
      q: 'What ground manpower is deployed for station and depot operations?',
      a: 'We deploy trained station attendants, certified high-voltage EV mechanics, and depot shift supervisors, backed by 100% Pinnacle statutory compliance indemnity covering PF, ESIC, insurance, and electrical safety standards.',
    },
  ];

  // Interactive EV Hub Sizing Calculator State
  const [hubType, setHubType] = useState<'highway' | 'commercial' | 'fleet' | 'swapping'>('highway');
  const [chargerBays, setChargerBays] = useState<number>(6);

  // Dynamic EV Hub calculation metrics
  const getHubMetrics = () => {
    switch (hubType) {
      case 'highway': {
        const powerPerBay = 120; // 120kW per bay avg
        const totalPower = chargerBays * powerPerBay;
        const dailyTurnaround = chargerBays * 24; // ~24 charges/bay/day
        const tatDays = Math.min(45, 20 + Math.round(chargerBays * 1.5));
        const attendants = Math.max(2, Math.ceil(chargerBays / 3));
        return {
          powerKva: totalPower,
          dailyTurnaround,
          tatDays,
          attendants,
          label: 'Highway Ultra-Fast Corridor (120-240kW DC)',
          chargerSpec: 'Dual-Gun 120kW / 240kW CCS-2 DC Fast Chargers',
          transformer: `${Math.ceil((totalPower * 1.15) / 100) * 100} kVA HT Transformer`,
        };
      }
      case 'commercial': {
        const powerPerBay = 60; // 60kW avg
        const totalPower = chargerBays * powerPerBay;
        const dailyTurnaround = chargerBays * 18;
        const tatDays = Math.min(30, 15 + Math.round(chargerBays * 1.2));
        const attendants = Math.max(1, Math.ceil(chargerBays / 4));
        return {
          powerKva: totalPower,
          dailyTurnaround,
          tatDays,
          attendants,
          label: 'Urban Commercial Mall / Office Hub (30-60kW DC/AC)',
          chargerSpec: '60kW DC Fast + 22kW Type-2 AC Destination Chargers',
          transformer: `${Math.ceil((totalPower * 1.1) / 100) * 100} kVA Substation Load`,
        };
      }
      case 'fleet': {
        const powerPerBay = 40; // 40kW avg for 3W/4W cargo
        const totalPower = chargerBays * powerPerBay;
        const dailyTurnaround = chargerBays * 30;
        const tatDays = Math.min(28, 14 + Math.round(chargerBays * 1.0));
        const attendants = Math.max(2, Math.ceil(chargerBays / 4));
        return {
          powerKva: totalPower,
          dailyTurnaround,
          tatDays,
          attendants,
          label: 'B2B Logistics & Last-Mile Fleet Depot (3W / 4W Cargo)',
          chargerSpec: 'High-Density 30kW Dual DC Guns + Scheduled Night Charging',
          transformer: `${Math.ceil((totalPower * 1.1) / 50) * 50} kVA Dedicated Grid Feed`,
        };
      }
      case 'swapping': {
        const powerPerBay = 15; // 15kW per 8-pack swapping cabinet
        const totalPower = chargerBays * powerPerBay;
        const dailyTurnaround = chargerBays * 55; // rapid 90-sec swaps
        const tatDays = Math.min(21, 10 + Math.round(chargerBays * 0.8));
        const attendants = Math.max(2, Math.ceil(chargerBays / 3));
        return {
          powerKva: totalPower,
          dailyTurnaround,
          tatDays,
          attendants,
          label: 'Automated Battery Swapping Station (2W / 3W)',
          chargerSpec: 'Modular 8 to 16 Slot IoT Swapping Kiosks with Active Thermal Cooling',
          transformer: `${Math.ceil((totalPower * 1.2) / 25) * 25} kVA Dedicated Line`,
        };
      }
    }
  };

  const calculatedMetrics = getHubMetrics();

  const clientEcosystem = [
    { name: 'Ather Energy', tag: 'Fast-Charging Pioneer', role: 'Charger Maintenance & Grid Operations' },
    { name: 'Hero MotoCorp', tag: 'Fortune-500 Automotive', role: 'Turnkey EPC Rollouts & Charger Maintenance' },
    { name: 'Magenta EV', tag: 'Clean Fleet & Charging', role: 'Charging & Parking Network Across India' },
    { name: 'FEPL', tag: 'EV Infrastructure', role: 'Charging Parking Station Network Services' },
    { name: 'Vertiv EV', tag: 'Critical Digital Infra', role: 'Charging Parking Power Solutions & AMC' },
  ];

  const pillars = [
    {
      id: 'charger-maintenance',
      icon: Wrench,
      title: 'Charger Maintenance Services',
      subtitle: 'Preventive Care & Rapid SLA Repairs',
      headline: 'Certified EV technicians and rapid maintenance keeping 99.4% uptime',
      badge: '99.4% Uptime SLA',
      desc: 'High-speed diagnostic teams, certified high-voltage EV mechanics, and preventive AMC process workflows. Partnered with leading EV OEMs including Ather Energy and Hero MotoCorp for round-the-clock charger health.',
      deliverables: [
        'Dedicated mobile quick-response service vans for rapid field triage',
        'Certified high-voltage EV mechanics & diagnostic field engineers',
        'Power module replacement, gun connector repair & liquid-cooling maintenance',
        'Pre-scheduled preventive inspection & emergency breakdown triage workflows',
        '24/7 CMS error code diagnostics and remote firmware reboot support',
      ],
      compliance: 'Contractual 99.4% Station Uptime SLA Guarantee',
      sla: '4-Hour Emergency Breakdown MTTR Response',
    },
    {
      id: 'charging-parking',
      icon: Layers,
      title: 'Charging & Parking Services',
      subtitle: 'Pan-India Charging & Parking Network',
      headline: 'Nationwide charging and parking network across the country',
      badge: 'Pan-India Network',
      desc: 'End-to-end charging and parking facility management across the country. Supporting leading charging networks including Magenta EV, FEPL, and Vertiv EV with real-time bay telemetry, automated access, and turnover management.',
      deliverables: [
        'Nationwide charging parking network operations across prime urban & highway hubs',
        'IoT-based live bay and charger telemetry monitoring',
        'Physical access control, security attendants & automated ticketing',
        'Bay turnover optimization & queue reduction protocols',
        'Tailored models for shopping malls, fleet depots & highway rest stops',
      ],
      compliance: 'Pan-India Charging Parking Network Across 200+ Locations',
      sla: 'Zero Bay Hogging & <3 Min Attendant Response',
    },
    {
      id: 'epc-services',
      icon: Zap,
      title: 'EPC Services (Installation & Commissioning)',
      subtitle: 'Turnkey Engineering, Procurement & Commissioning',
      headline: 'Complete site civil engineering, DISCOM sanctions, and hardware commissioning',
      badge: 'Turnkey EPC Delivery',
      desc: 'Turnkey EPC delivery for DC Fast Chargers, AC destination hubs, and high-voltage fleet depots, backed by site acquisition, DISCOM high-tension liaison, and CEIG electrical clearances.',
      deliverables: [
        'Site feasibility, ground topography, and grid capacity audit',
        'DISCOM power load sanctions, transformer sizing & CEIG electrical approvals',
        'Civil pad mounting, trenching, earthing pits & charger hardware commissioning',
        'OCPP 1.6J / 2.0.1 cloud CMS integration & payment gateway sync',
        'Deployment of trained ground staff for 24/7 charging operations',
      ],
      compliance: 'Turnkey Civil & Electrical EPC Standards Across India',
      sla: 'Guaranteed On-Schedule Rollout TAT',
    },
  ];

  const deploymentTimeline = [
    {
      step: '01',
      title: 'Site Feasibility & Grid Audit',
      time: 'Days 1 - 5',
      desc: 'Detailed electrical load analysis, transformer capacity checking, CAD layout drafting, municipal zoning clearances, and DISCOM load feasibility review.',
      metrics: 'DISCOM & CEIG Approvals',
    },
    {
      step: '02',
      title: 'Civil & Electrical Engineering',
      time: 'Days 6 - 14',
      desc: 'Reinforced concrete pad pouring, fire safety trenches, cable ducting, chemical earthing pits, HT switchgear, and safety isolators installation.',
      metrics: 'Civil & Electrical Works',
    },
    {
      step: '03',
      title: 'Hardware Commissioning & CMS Sync',
      time: 'Days 15 - 20',
      desc: 'Mounting DC fast chargers, OCPP 1.6J/2.0.1 CMS pairing, tariff billing sync, high-current load bank testing, and safety trip calibration.',
      metrics: 'Load Bank Testing',
    },
    {
      step: '04',
      title: 'Manpower Onboarding & AMC Live',
      time: 'Day 21 Onward',
      desc: 'Deploying trained station attendants, handover of preventive maintenance protocols, mobile service van linkage, and 24/7 uptime monitoring.',
      metrics: '99.4% Uptime SLA Handover',
    },
  ];

  const comparisonRows = [
    {
      parameter: 'Grid & DISCOM Sanctions',
      traditional: 'Client must liaise with state electricity boards; 60-90 days delays common',
      pinnacle: 'Turnkey liaison: HT transformer sanctions & CEIG approvals handled by Pinnacle',
    },
    {
      parameter: 'Hardware & CMS Agnostic',
      traditional: 'Proprietary lock-in with a single OEM charger brand',
      pinnacle: 'Agnostic deployment: Works directly with Delta, Exicom, ABB, Servotech, and custom CMS platforms',
    },
    {
      parameter: 'Network Uptime SLA',
      traditional: 'Best-effort repair with 48-72h lag; average Indian charger uptime is <82%',
      pinnacle: '99.4% contractually committed SLA with dedicated mobile service vans & rapid MTTR',
    },
    {
      parameter: 'On-Ground Manpower & Attendants',
      traditional: 'Untrained security guards unable to assist drivers or handle cable trips',
      pinnacle: 'HSE & High-voltage certified attendants trained in connector handling & safety protocols',
    },
    {
      parameter: 'Statutory & Labor Compliance',
      traditional: 'Casual subcontractor labour leading to PF, ESIC & electrical safety liabilities',
      pinnacle: '100% Pinnacle statutory indemnity with zero client liability on labor or safety compliance',
    },
  ];

  const technicalSpecs = [
    {
      category: 'Charging Protocols',
      detail: 'CCS Type-2, CHAdeMO, Type-2 AC, GB/T & 15-Minute Flash Charging',
      icon: Zap,
    },
    {
      category: 'Power Capabilities',
      detail: '30kW to 240kW DC Fast Chargers with dynamic power-sharing between guns',
      icon: Gauge,
    },
    {
      category: 'Cloud Telemetry',
      detail: 'OCPP 1.6J / 2.0.1 compliant with real-time remote telemetry & automated billing',
      icon: Cpu,
    },
    {
      category: 'Safety Compliance',
      detail: 'AIS 138, IEC 61851, CEIG electrical clearances & dual chemical earthing standard',
      icon: ShieldCheck,
    },
    {
      category: 'Mobile Field Service',
      detail: 'Dedicated emergency quick-response vans equipped with spares & portable load banks',
      icon: Wrench,
    },
    {
      category: 'Network Operations',
      detail: '24/7 Network Operations Center (NOC) monitoring voltage fluctuations & gun heat',
      icon: Activity,
    },
  ];

  const activeTechData = pillars.find((c) => c.id === activeTech);

  return (
    <div className="w-full">
      <SEO
        title="EV Charging Infrastructure EPC & AMC Services | Pinnacle Consultant"
        description="Turnkey EV charging station rollouts, DISCOM power sanctions, transformer approvals, and 24/7 AMC with 99.4% charger uptime SLA across India."
        keywords="EV charging EPC India, charger maintenance AMC, DISCOM load sanction EV, EV charging station installation, CPO network operations, EV charging hub Gurugram"
        canonicalPath="/tech-ev"
        schema={techEvSchema}
      />
      {/* 1. Hero Section (Editorial Clean Mobility Hub - 100% Viewport Height) */}
      <section className="bg-brand-dark text-white overflow-hidden min-h-svh lg:h-[100dvh] flex flex-col justify-center pt-28 pb-10 md:pt-36 md:pb-12 lg:pt-32 lg:pb-10 relative">
        {/* Background Editorial Photo with Multi-Stop Gradient Feathering */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="/images/ev_charging_hub.jpg"
            alt="Pinnacle High-Density EV Fast Charging Hub Deployment"
            className="w-full h-full object-cover object-[center_35%]"
          />
          {/* Extended progressive fade: covers text area comfortably and smoothly feathers out towards the right edge */}
          <div className="absolute inset-0 hero-overlay-strong" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl my-auto">
          <div className="max-w-4xl xl:max-w-5xl">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] xl:text-[2.85rem] font-semibold leading-[1.15] tracking-tight mb-4 sm:mb-5 drop-shadow-md">
              {[
                <span key="l1" className="block">
                  Reliable EV Charging
                </span>,
                <span key="l2" className="block md:whitespace-nowrap">
                  Infrastructure Across India
                </span>,
                <span key="l3" className="block text-brand-light whitespace-nowrap">
                  with 99.4% Uptime
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
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-slate-100 text-[15px] sm:text-base lg:text-lg font-medium leading-relaxed mb-6 max-w-2xl drop-shadow-sm"
            >
              We plan, deploy, and maintain EV charging infrastructure across India. From DISCOM power approvals and site civil works to 240kW fast charger installation and round-the-clock maintenance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-7 pr-6 py-3.5 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg"
                >
                  <span>Plan Your EV Infrastructure</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsBrochureOpen(true)}
                  className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-6 pr-5 py-3.5 rounded-full font-semibold text-sm hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
                >
                  <Download className="w-4 h-4 text-brand-light" />
                  <span>Download EV Technical Deck</span>
                </button>
              </Magnetic>
            </motion.div>

            {/* Institutional Trust Metrics */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 pt-5 sm:pt-6 border-t border-white/10 max-w-xl mb-5 sm:mb-6">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={200} duration={2.2} digitEffect="slide" />
                  <span>+</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Charging Locations
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={99.4} decimals={1} duration={2} digitEffect="slide" />
                  <span>%</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Uptime Guarantee
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-brand-light inline-flex items-baseline tabular-nums">
                  <CountUp to={14} duration={1.8} digitEffect="slide" />
                  <span>+ Yrs</span>
                </div>
                <div className="text-[11px] sm:text-xs text-slate-300 uppercase tracking-wider font-medium mt-0.5">
                  Industry Experience
                </div>
              </div>
            </div>

            {/* Quick Trust Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-200">
                DISCOM Approvals Handled
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-200">
                CEIG Safety Compliance
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-200">
                OCPP 1.6J & 2.0.1 Ready
              </span>
              <span className="bg-black/35 backdrop-blur-md border border-white/15 px-3 py-1 rounded-full text-[11px] font-semibold text-slate-200">
                24/7 Quick-Response Vans
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Trust Strip */}
      <section className="py-12 bg-brand-card border-b border-brand-edge overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="flex flex-col items-center text-center gap-6">
            <div className="shrink-0">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                Trusted Clean Mobility Ecosystem
              </span>
              <p className="text-sm font-semibold text-brand-ink">
                Deployed with leading OEMs, CPOs & Fleet Innovators
              </p>
            </div>
            <div className="w-full -mx-4 md:-mx-8">
              <CompanyLogos variant="marquee" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core EV Pillars */}
      <section className="py-16 md:py-24 bg-grid-light relative z-20">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Core Capabilities
            </span>
            <WordReveal
              as="h2"
              text="End-to-End EV Infrastructure Services"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold text-brand-ink tracking-tight mb-4"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Planning, installing, and maintaining EV charging networks backed by a contractual 99.4% uptime guarantee.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((c, i) => (
              <ScrollReveal
                key={c.id}
                direction="up"
                delay={i * 0.1}
                className="flex flex-col"
              >
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="h-full bg-brand-card rounded-[2rem] p-6 sm:p-8 md:p-10 border border-brand-edge shadow-sm hover:shadow-xl transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                      <div className="w-14 h-14 bg-brand-bg text-brand-ink rounded-2xl flex items-center justify-center group-hover:bg-brand-dark group-hover:text-brand-light transition-colors">
                        <c.icon className="w-7 h-7" strokeWidth={1.5} />
                      </div>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        {c.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl font-semibold text-brand-ink mb-2">{c.title}</h3>
                    <div className="text-[10px] font-bold text-brand-ink bg-brand-light inline-block px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                      {c.subtitle}
                    </div>
                    <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-3">
                      {c.headline}
                    </p>
                    <p className="text-brand-muted font-medium text-[15px] sm:text-sm leading-relaxed mb-6">
                      {c.desc}
                    </p>

                    <ul className="space-y-3 mb-8 pt-4 border-t border-brand-edge">
                      {c.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-[15px] sm:text-xs text-brand-muted">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-6 border-t border-brand-edge flex flex-col gap-3">
                    <div className="bg-brand-bg p-3 rounded-xl text-xs font-semibold text-brand-ink flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span>{c.sla}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveTech(c.id)}
                      className="w-full flex items-center justify-center gap-2 bg-brand-dark text-white hover:bg-brand-light hover:text-brand-onaccent py-3.5 rounded-xl font-medium text-xs transition-colors"
                    >
                      View Service Details <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive EV Hub Feasibility & Sizing Calculator */}
      <section className="py-16 md:py-24 bg-brand-dark text-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size={550} delay={0} />
        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <ScrollReveal direction="up" className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Interactive Planning Tool
            </span>
            <WordReveal
              as="h2"
              text="Plan Your EV Charging Hub"
              className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            />
            <p className="text-slate-300 text-[15px] sm:text-base font-medium">
              Estimate electrical load requirements, daily vehicle turnaround, and deployment timelines for your site.
            </p>
          </ScrollReveal>

          <ScrollReveal scale={0.98} delay={0.1}>
            <div className="bg-brand-dark-3 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
              {/* Hub Archetype Selector */}
              <div className="mb-8">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-3">
                  1. Select Hub Archetype
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'highway', title: 'Highway Ultra-Fast Corridor', sub: '120-240kW DC Fast' },
                    { id: 'commercial', title: 'Urban Commercial Mall / Hub', sub: '30-60kW Fast + AC' },
                    { id: 'fleet', title: 'B2B Logistics Fleet Depot', sub: '3W / 4W Cargo Fleets' },
                    { id: 'swapping', title: 'Smart Battery Swapping', sub: '2W / 3W Rapid Swap' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setHubType(item.id as any)}
                      className={`p-4 rounded-2xl text-left border transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98] ${hubType === item.id
                          ? 'bg-brand-light text-brand-onaccent border-brand-light font-bold shadow-lg scale-[1.02]'
                          : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                        }`}
                    >
                      <div className="text-sm font-bold mb-1">{item.title}</div>
                      <div
                        className={`text-xs ${hubType === item.id ? 'text-brand-ink/80 font-medium' : 'text-slate-400'
                          }`}
                      >
                        {item.sub}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bays / Dispenser Count Slider */}
              <div className="mb-10 bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                      2. Planned Charging Bays / Gun Dispensers
                    </label>
                    <p className="text-xs text-slate-400 font-medium">
                      Adjust the physical vehicle charging capacity for this location
                    </p>
                  </div>
                  <div className="bg-brand-light text-brand-onaccent px-4 py-2 rounded-xl text-lg font-bold tabular-nums">
                    {chargerBays} Charging Bays
                  </div>
                </div>

                <input
                  type="range"
                  min="2"
                  max="24"
                  step="2"
                  value={chargerBays}
                  onChange={(e) => setChargerBays(Number(e.target.value))}
                  className="w-full h-2.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-light"
                />
                <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-[11px] text-slate-400 mt-2">
                  <span>2 Bays (Pilot Hub)</span>
                  <span>8 Bays (Medium Station)</span>
                  <span>16 Bays (Highway Superhub)</span>
                  <span>24 Bays (Mega Depot)</span>
                </div>
              </div>

              {/* Dynamic Output Cards Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <div className="text-xs text-slate-300 font-medium mb-1">Sanctioned Power</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-light tabular-nums">
                    {calculatedMetrics.powerKva} kVA
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 truncate">
                    {calculatedMetrics.transformer}
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <div className="text-xs text-slate-300 font-medium mb-1">Daily EV Turnaround</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-light tabular-nums">
                    ~{calculatedMetrics.dailyTurnaround}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">Vehicles Serviced / Day</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <div className="text-xs text-slate-300 font-medium mb-1">Turnkey Rollout TAT</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-light tabular-nums">
                    {calculatedMetrics.tatDays} Days
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">From Civil to Live Grid</div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 text-center">
                  <div className="text-xs text-slate-300 font-medium mb-1">On-Ground Shift Staff</div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-brand-light tabular-nums">
                    {calculatedMetrics.attendants} Staff
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">24/7 Station Attendants & Techs</div>
                </div>
              </div>

              {/* Hub Recommendation Summary Bar */}
              <div className="bg-black/40 border border-white/10 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-light/20 flex items-center justify-center text-brand-light shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Recommended Engineering Architecture</div>
                    <div className="text-xs text-slate-300">{calculatedMetrics.chargerSpec}</div>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-6 pr-5 py-3.5 rounded-full font-bold text-xs hover:bg-white active:scale-[0.96] transition-all shrink-0 shadow-lg"
                >
                  <span>Request a Site Feasibility Plan</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Co-Founder Profile: Ashu Gupta */}
      <section className="py-14 md:py-20 bg-brand-card border-y border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="bg-brand-bg rounded-[2.5rem] border border-brand-edge p-6 sm:p-8 md:p-12 overflow-hidden relative">
            <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
              <ScrollReveal direction="left" className="md:col-span-4">
                <div className="relative rounded-3xl overflow-hidden border border-brand-edge outline outline-1 -outline-offset-1 outline-black/10 shadow-xl max-w-xs mx-auto">
                  <img
                    src="/images/ashu_gupta.jpg"
                    alt="Ashu Gupta - Co-Founder & EV Infrastructure Leader"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-64 sm:h-80 object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <div className="text-white font-bold text-base">Ashu Gupta</div>
                    <div className="text-brand-light text-xs font-medium">Co-Founder & EV Practice Head</div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay={0.1} className="md:col-span-8">
                <div className="inline-flex items-center gap-2 bg-brand-dark/10 rounded-full px-3.5 py-1 mb-4">
                  <Award className="w-3.5 h-3.5 text-brand-ink" />
                  <span className="text-brand-ink font-bold text-xs uppercase tracking-wider">
                    Co-Founder Profile • Automotive & EV Network Leadership
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-semibold text-brand-ink mb-4 tracking-tight leading-snug">
                  "In the EV charging business, downtime costs revenue and driver trust. We design and maintain our stations for consistent 99.4% uptime."
                </h3>

                <p className="text-brand-muted text-[15px] sm:text-sm leading-relaxed mb-6 font-medium">
                  With 14+ years of automotive and infrastructure leadership across India, Ashu Gupta has directed site acquisition, electrical installations, and high-voltage grid liaison across 200+ EV charging and swapping locations, managing turnkey EPC rollouts, charger maintenance, and nationwide charging parking networks.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-brand-edge tabular-nums">
                  <div>
                    <div className="text-xl font-bold text-brand-ink">14+ Years</div>
                    <div className="text-[11px] text-slate-500 font-medium">Automotive & Clean Energy</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brand-ink">200+ Locations</div>
                    <div className="text-[11px] text-slate-500 font-medium">Locations Supported</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-brand-ink">Pan-India</div>
                    <div className="text-[11px] text-slate-500 font-medium">Charging & Parking Network</div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Hardware & Ecosystem Standards */}
      <section className="py-16 md:py-24 bg-brand-card">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-4">
              Hardware-Agnostic & Grid-Compliant
            </h2>
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              We deploy and support every major industrial standard, connector protocol, and grid compliance requirement in the Indian clean mobility sector.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {technicalSpecs.map((spec, i) => (
              <motion.div key={i} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-brand-bg border border-brand-edge rounded-2xl p-6 hover:border-brand-dark/30 transition-colors hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-card text-brand-ink flex items-center justify-center mb-4 group-hover:bg-brand-dark group-hover:text-brand-light transition-colors shadow-sm">
                    <spec.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-brand-ink mb-2">{spec.category}</h4>
                  <p className="text-[15px] sm:text-xs text-brand-muted font-medium leading-relaxed">{spec.detail}</p>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Rollout Execution Methodology */}
      <section className="py-16 md:py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-light font-bold text-xs tracking-widest uppercase mb-2 block">
              Execution Methodology
            </span>
            <WordReveal
              as="h2"
              text="Our Four-Step Deployment Process"
              className="text-3xl md:text-4xl font-semibold text-white tracking-tight mb-4"
            />
            <p className="text-slate-300 text-[15px] sm:text-sm font-medium">
              Developed across 200+ sites to streamline electrical approvals and bring stations online on schedule.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {deploymentTimeline.map((step) => (
              <motion.div key={step.step} variants={staggerChild}>
                <TiltCard
                  maxTilt={5}
                  lift={6}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-brand-light text-3xl font-bold tabular-nums">{step.step}</span>
                      <span className="text-[10px] bg-white/10 text-slate-300 px-2.5 py-1 rounded-full font-bold">
                        {step.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-300 text-[15px] sm:text-xs leading-relaxed font-normal mb-6">{step.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-white/10">
                    <span className="text-[11px] text-brand-light font-semibold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{step.metrics}</span>
                    </span>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contractor vs Pinnacle Comparison */}
      <section className="py-16 md:py-24 bg-brand-bg">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              How We Compare
            </span>
            <h2 className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-4">
              Traditional Contractors vs. Pinnacle Turnkey Delivery
            </h2>
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Compare standard electrical subcontractors with Pinnacle's integrated EV deployment and maintenance model.
            </p>
          </ScrollReveal>

          <ScrollReveal scale={0.98} delay={0.1}>
            <div className="bg-brand-card rounded-3xl border border-brand-edge shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-dark text-white text-xs uppercase tracking-wider">
                      <th className="py-4 px-6 font-semibold w-1/4">Operational Parameter</th>
                      <th className="py-4 px-6 font-semibold w-3/8 text-slate-300">
                        Fragmented EPC Subcontractors
                      </th>
                      <th className="py-4 px-6 font-semibold w-3/8 text-brand-light">
                        Pinnacle Turnkey EV Infrastructure
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    {comparisonRows.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-4 px-6 font-bold text-brand-ink">{row.parameter}</td>
                        <td className="py-4 px-6 text-slate-500 font-medium leading-relaxed">
                          <div className="flex items-start gap-2">
                            <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span>{row.traditional}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-brand-ink font-semibold bg-emerald-50/30 leading-relaxed">
                          <div className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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

      {/* EV Infrastructure FAQs */}
      <section className="py-14 md:py-20 bg-brand-card border-t border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ScrollReveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-brand-ink font-bold text-xs tracking-widest uppercase mb-2 block">
              Frequently Asked Questions
            </span>
            <WordReveal
              as="h2"
              text="EV Infrastructure FAQs"
              className="text-3xl sm:text-4xl font-semibold text-brand-ink tracking-tight mb-3"
            />
            <p className="text-brand-muted font-medium text-[15px] sm:text-sm">
              Answers to common questions about station installation, grid sanctions, and maintenance SLAs.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="space-y-3.5">
            {evFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-brand-bg rounded-2xl border transition-colors duration-200 overflow-hidden ${isOpen ? 'border-brand-dark shadow-sm' : 'border-brand-edge hover:border-brand-dark/40'
                    }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-brand-ink hover:text-emerald-800 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand-ink' : ''
                        }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[15px] sm:text-sm text-brand-muted font-medium leading-relaxed border-t border-brand-edge pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </ScrollReveal>

          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="inline-flex items-center min-h-11 gap-1.5 text-xs font-bold text-brand-ink hover:text-emerald-700 transition-colors underline underline-offset-4"
            >
              <span>View all corporate & compliance FAQs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Service Details Drawer */}
      <AnimatePresence>
        {activeTech && activeTechData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveTech(null)}
              className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-brand-card z-50 shadow-2xl border-l border-brand-edge flex flex-col"
            >
              <div className="p-6 md:p-8 border-b border-brand-edge flex items-center justify-between bg-brand-bg">
                <div>
                  <span className="bg-brand-light text-brand-onaccent px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    Operational Scope
                  </span>
                  <h2 className="text-2xl font-semibold text-brand-ink">{activeTechData.title}</h2>
                </div>
                <button
                  onClick={() => setActiveTech(null)}
                  className="p-3 bg-brand-card rounded-full text-brand-ink hover:bg-brand-light shadow-sm transition-colors border border-brand-edge"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                <p className="text-brand-muted font-medium leading-relaxed mb-8 text-[15px] sm:text-sm">
                  {activeTechData.desc}
                </p>

                <div className="mb-8">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-brand-edge pb-2">
                    Key Execution Modules
                  </h3>
                  <ul className="space-y-3 pt-2">
                    {activeTechData.deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-dark text-brand-light flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-medium text-brand-ink text-[15px] sm:text-xs">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-brand-dark text-white p-6 rounded-2xl mb-6">
                  <h4 className="text-xs font-bold text-brand-light uppercase tracking-wider mb-1">
                    Standard Track Record
                  </h4>
                  <p className="text-xs font-medium text-slate-200">{activeTechData.compliance}</p>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 p-5 rounded-2xl">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                    Guaranteed SLA
                  </h4>
                  <p className="text-xs font-medium text-emerald-800">{activeTechData.sla}</p>
                </div>
              </div>

              <div className="p-6 md:p-8 border-t border-brand-edge bg-brand-card">
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-full gap-2 bg-brand-dark text-white py-4 rounded-full font-semibold text-sm hover:bg-brand-light hover:text-brand-onaccent active:scale-[0.98] transition-all shadow-lg"
                >
                  Discuss This Service <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Consultation Callout */}
      <section className="py-14 md:py-20 container mx-auto px-4 md:px-8 max-w-5xl">
        <ScrollReveal scale={0.96} duration={0.7} className="w-full">
          <div className="bg-brand-dark text-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 text-center relative overflow-hidden shadow-2xl">
            <FloatingOrb className="top-0 right-0" size={320} blurClass="blur-3xl" delay={1} />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 tracking-tight">
              Planning to Expand Your EV Charging Network?
            </h2>
            <p className="text-slate-300 text-[15px] sm:text-base max-w-2xl mx-auto mb-8 font-medium">
              Work with our engineering team to accelerate grid approvals, complete turnkey station civil work, and secure 99.4% uptime maintenance across India.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-sm hover:bg-white active:scale-[0.96] transition-all shadow-lg"
                >
                  <span>Schedule a Technical Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </Magnetic>
              <button
                onClick={() => setIsBrochureOpen(true)}
                className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 pl-8 pr-7 py-4 rounded-full font-semibold text-sm hover:bg-white/20 active:scale-[0.96] transition-all backdrop-blur-sm"
              >
                <Download className="w-4 h-4 text-brand-light" />
                <span>Download EV Technical Deck</span>
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Brochure Download Modal */}
      {isBrochureOpen && <BrochureModal onClose={() => setIsBrochureOpen(false)} />}
    </div>
  );
}

