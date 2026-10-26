import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight, HelpCircle, Users, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { ScrollReveal, staggerContainer, staggerChild } from '../components/ScrollReveal';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';
import SEO from '../components/SEO';

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState<'general' | 'staffing' | 'ev' | 'compliance'>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const categories = [
    { id: 'general', label: 'General', icon: HelpCircle },
    { id: 'staffing', label: 'Staffing Wing', icon: Users },
    { id: 'ev', label: 'EV & Tech Wing', icon: Zap },
    { id: 'compliance', label: 'Compliance & Legal', icon: Shield }
  ] as const;

  const faqs = {
    general: [
      {
        q: "What exactly does Pinnacle Consultant do?",
        a: "Pinnacle Consultant operates two distinct business wings under one roof. The Manpower & Staffing Division handles end-to-end talent acquisition, contractual workforce deployment, and 100% compliant payroll management for enterprises. The Tech & EV Infrastructure Division designs, deploys, and maintains Electric Vehicle charging networks, Industry 4.0 automation systems, and provides market feasibility research for industrial clients."
      },
      {
        q: "Who are your typical clients?",
        a: "We work with mid-to-large enterprises across India, including EV OEMs, charging network operators, IT firms, manufacturing plants, and retail groups. Our clients range from 50-person growth-stage startups needing their first tech team to Fortune 500 companies scaling field operations by the hundreds."
      },
      {
        q: "Are you a pan-India company?",
        a: "Yes. We operate across all major metro cities (Delhi NCR, Mumbai, Bangalore, Hyderabad, Chennai, Pune) and have executed large-scale hiring and EV infrastructure projects in Tier-2 cities as well. Our compliance infrastructure is set up for multi-state operations."
      },
      {
        q: "How do I get started with Pinnacle?",
        a: "Reach out via our Contact page or call our team directly. We will schedule a 30-minute discovery call to evaluate your requirement, whether staffing or EV infrastructure, and share a scoped proposal within 48 hours."
      }
    ],
    staffing: [
      {
        q: "How fast can you fill a staffing requirement?",
        a: "Most mandates are fulfilled within 5 to 15 working days depending on role complexity. IT staffing (developers, architects) typically takes 7 to 15 days due to technical screening. Field operations and administrative roles are often filled in as few as 5 days. We maintain a pre-vetted talent bench across all major categories."
      },
      {
        q: "Do you handle payroll and compliance for contractual staff?",
        a: "Absolutely. This is one of our core differentiators. We manage complete payroll processing, PF/ESI contributions, TDS deductions, statutory bonus, gratuity provisioning, and all labour law compliance for every contractual employee deployed through us. Your organization maintains zero legal exposure."
      },
      {
        q: "What industries do you staff for?",
        a: "We specialize in IT & Digital (software engineers, designers, DevOps), EV & Clean Mobility (BMS engineers, EV technicians, charger installation specialists), Sales & Field Operations (enterprise account executives, retail distribution), and Corporate Support (HR coordinators, billing officers, administrative assistants)."
      },
      {
        q: "Can you handle bulk hiring for large field teams?",
        a: "Yes. We have successfully deployed teams of 50 to 500+ field staff across multiple cities simultaneously. We use a location-based batch hiring model with unified onboarding, attendance tracking, and centralized reporting systems."
      },
      {
        q: "What is your candidate vetting process?",
        a: "Unlike keyword-matching agencies, we run domain-specific vetting. For tech roles, we conduct live code assessments. For EV roles, we run technical knowledge interviews covering BMS, high-voltage safety, and equipment handling. All candidates undergo background verification, reference checks, and credential verification before being presented to you."
      },
      {
        q: "What are your fees for staffing services?",
        a: "Our fee structure is transparent and role-dependent: a one-time placement fee for permanent hires, or a monthly management fee for contractual deployments that covers payroll, compliance, and account management. Contact us for a scoped quote based on your requirement."
      }
    ],
    ev: [
      {
        q: "What types of EV charging stations do you install?",
        a: "We install both AC slow chargers (3.3kW to 22kW) and DC fast chargers (30kW to 240kW) for commercial, fleet, and public infrastructure use. Our installations cover everything from single-point office charging bays to large-scale multi-station highway and commercial hub networks."
      },
      {
        q: "How long does a typical EV charging station deployment take?",
        a: "A standard commercial EV charging deployment (5 to 20 stations) takes 25 to 35 days from site audit to go-live. This covers electrical load auditing, civil foundation work, equipment delivery, grid coupling, and CMS software activation. Larger multi-location rollouts are phased accordingly."
      },
      {
        q: "Do your installations comply with Indian government standards?",
        a: "Yes, absolutely. All our EV infrastructure deployments meet Bureau of Indian Standards (BIS) and Central Electricity Authority (CEA) technical standards. We also manage the required electrical inspector approvals and DISCOMS grid interconnection paperwork as part of our delivery scope."
      },
      {
        q: "What does your Annual Maintenance Contract (AMC) include?",
        a: "Our AMC covers 24/7 CMS (Charger Management System) monitoring with automated alert routing, monthly preventive thermal audits, firmware synchronization updates, DC connector and cord refurbishments, and a guaranteed 24-hour SLA-backed onsite field dispatch for any critical failures. We guarantee 98.5% station uptime across contracted networks."
      },
      {
        q: "Can you handle Industry 4.0 / factory automation projects?",
        a: "Yes. Our tech division executes complete Industry 4.0 integration projects including PLC/SCADA programming and commissioning, IoT sensor array deployments (vibration, thermal, pressure), edge computing gateway integration, and centralized production yield dashboards built on AWS IoT Core."
      },
      {
        q: "Do you provide EV market feasibility reports before infrastructure investment?",
        a: "Yes. We deliver comprehensive feasibility studies covering local traffic density, grid capacity headroom audits, competitor charging density matrices, CAPEX/OPEX amortization models, and B2B fleet conversion forecasting, accompanied by GIS spatial data."
      }
    ],
    compliance: [
      {
        q: "Are you a registered company?",
        a: "Yes. Pinnacle Consultant is a legally registered entity operating under all applicable Indian business and labour laws. We hold all necessary registrations including GST, PF, ESI, and professional tax registrations across our operating states."
      },
      {
        q: "How do you ensure labour law compliance for deployed staff?",
        a: "We maintain complete compliance under the Contract Labour (Regulation & Abolition) Act, the Payment of Wages Act, the Employees Provident Fund Act, and the ESI Act. Monthly compliance reports covering PF challans, ESI payment receipts, and statutory registers are shared with every client."
      },
      {
        q: "What happens if a deployed employee needs to be replaced?",
        a: "We offer a free replacement guarantee within 30 days of deployment for contractual staff and within 90 days for permanent placements. Our attrition monitoring systems flag potential risks early, and we maintain a bench of pre-screened backups for critical roles."
      }
    ]
  };

  const currentFaqs = faqs[activeCategory];
  const activeCatData = categories.find(c => c.id === activeCategory);

  // Compile all 16 FAQs into schema.org/FAQPage JSON-LD
  const allFaqsList = [
    ...faqs.general,
    ...faqs.staffing,
    ...faqs.ev,
    ...faqs.compliance,
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqsList.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div className="w-full bg-brand-bg min-h-svh">
      <SEO
        title="Frequently Asked Questions (FAQ) | Pinnacle Consultant"
        description="Clear answers on our 5-15 day staffing turnaround, 100% PF/ESIC statutory labor compliance, turnkey EV charging station rollouts, and 24/7 AMC SLAs."
        keywords="Pinnacle Consultant FAQ, staffing turnaround time, EV charging installation timeline, contract labor compliance FAQ, EV AMC SLA"
        canonicalPath="/faq"
        schema={faqSchema}
      />
      {/* Hero Header */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-10 bg-brand-dark text-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size={384} blurClass="blur-3xl" delay={0} />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-3 leading-[1.1] tracking-tight">
            {[
              <span key="l1" className="block">
                Frequently Asked <span className="text-brand-light">Questions</span>
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
          <p className="text-sm sm:text-base text-slate-300 mx-auto leading-relaxed font-medium mb-6 max-w-xl text-pretty">
            Everything you need to know about our Staffing, EV Infrastructure, and Statutory Compliance services.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveCategory(c.id);
                  setOpenIndex(0);
                }}
                className={cn(
                  'flex items-center gap-2 px-5 py-2.5 min-h-11 rounded-full font-semibold text-xs sm:text-sm transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.96] border shadow-xs cursor-pointer',
                  activeCategory === c.id
                    ? 'bg-brand-light text-brand-onaccent border-brand-light shadow-md font-bold scale-[1.02]'
                    : 'bg-white/10 text-white border-white/15 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm'
                )}
              >
                <c.icon className="w-4 h-4" />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ScrollReveal direction="up" distance={15} className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-brand-edge">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-dark text-brand-light flex items-center justify-center shadow-xs">
                {activeCatData && <activeCatData.icon className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-xl font-bold text-brand-ink">{activeCatData?.label} FAQs</h2>
                <p className="text-xs font-medium text-slate-500 tabular-nums">
                  {currentFaqs.length} answered questions in this category
                </p>
              </div>
            </div>

            <Magnetic strength={0.2}>
              <Link
                to="/contact"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-ink hover:text-emerald-700 transition-colors"
              >
                <span>Have a specific query? Contact team</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </Magnetic>
          </ScrollReveal>

          <div className="space-y-4 min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                className="space-y-4"
              >
                {currentFaqs.map((faq, index) => {
                  const isOpen = openIndex === index;
                  return (
                    <motion.div 
                      key={index} 
                      variants={staggerChild}
                      className={cn(
                        "bg-brand-card border rounded-[1.5rem] overflow-hidden transition-colors duration-200 shadow-sm",
                        isOpen ? "border-brand-dark" : "border-brand-edge hover:border-brand-light"
                      )}
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        className="w-full px-6 md:px-8 py-6 flex items-start justify-between text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand-light cursor-pointer"
                      >
                        <span className="font-medium text-brand-ink text-lg pr-4 sm:pr-8 leading-tight">{faq.q}</span>
                        <span className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors",
                          isOpen ? "bg-brand-light text-brand-onaccent" : "bg-brand-bg text-slate-400"
                        )}>
                          {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 md:px-8 pb-8 text-slate-500 font-medium leading-relaxed text-base sm:text-lg text-pretty">
                              <div className="pt-4 border-t border-brand-edge">
                                {faq.a}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Contact Outro Panel */}
          <ScrollReveal direction="up" distance={30}>
            <div className="mt-12 sm:mt-16 bg-brand-dark text-white rounded-[2rem] p-6 sm:p-8 md:p-10 text-center border-t-8 border-brand-light shadow-xl">
              <WordReveal
                as="h3"
                text="Still have questions?"
                className="text-3xl font-medium mb-4"
              />
              <p className="text-slate-300 font-medium mb-8 max-w-lg mx-auto text-pretty">
                Our specialists are available to answer any specific question about your staffing mandate or EV infrastructure project.
              </p>
              <Magnetic>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent pl-8 pr-7 py-4 rounded-full font-bold text-base hover:bg-white transition-colors duration-150 active:scale-[0.96]"
                >
                  <span>Contact Our Team</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </Magnetic>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
