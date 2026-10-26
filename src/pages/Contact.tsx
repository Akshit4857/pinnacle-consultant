import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Copy,
  Check,
  Building,
  User,
  Linkedin,
  MessageSquare,
  Clock,
  Users,
  ShieldCheck,
  Zap,
  ArrowUpRight,
  ChevronDown,
  Sparkles,
  FileCheck2,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { ScrollReveal, staggerContainer, staggerChild } from '../components/ScrollReveal';
import TiltCard from '../components/motion/TiltCard';
import Magnetic from '../components/motion/Magnetic';
import WordReveal from '../components/motion/WordReveal';
import FloatingOrb from '../components/motion/FloatingOrb';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const faqs = [
    {
      q: 'How fast can Pinnacle deploy manpower for our operations?',
      a: 'For contractual and field operations (EV technicians, retail staff, warehouse workers, and assembly operators), deployments begin within 7 to 14 days of agreement sign-off. For lateral and leadership executive roles, candidate profiles are delivered within 48 to 72 hours.',
    },
    {
      q: 'Do you manage statutory compliance and payroll?',
      a: 'Yes. For contractual staffing, Pinnacle acts as the employer of record, handling PF, ESIC, Professional Tax, monthly payroll, and state labor registrations directly.',
    },
    {
      q: 'What is your operational footprint for EV infrastructure AMC?',
      a: 'We support EV infrastructure across industrial belts, transit corridors, and fleet depots in North, West, and South India, backed by on-call field technicians.',
    },
    {
      q: 'Can we sign an NDA prior to discussing technical requirements?',
      a: 'Yes. We routinely execute mutual NDAs before reviewing proprietary charging blueprints, plant layouts, or confidential hiring searches.',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero & Contact Section */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <FloatingOrb className="-top-[275px] right-[-275px]" size={550} delay={0} />
        <FloatingOrb className="bottom-0 left-0" size={320} colorClass="bg-brand-light/5" blurClass="blur-3xl" delay={2} />

        <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Direct Reach & Credentials */}
            <div className="lg:col-span-5 flex flex-col justify-start">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-4 leading-[1.15] tracking-tight">
                {[
                  <span key="l1" className="block">
                    Get in Touch with Our <span className="text-brand-light">Practice Leads.</span>
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
                transition={{ duration: 0.5, delay: 0.15 }}
                className="text-base md:text-lg text-slate-300 leading-relaxed font-normal mb-6 text-pretty"
              >
                Tell us about your hiring numbers, EV charging targets, or research questions. Our practice leads review your details and respond within one business day.
              </motion.p>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 text-xs font-semibold text-slate-200"
              >
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-brand-light shrink-0" />
                  <span className="tabular-nums">24h Response SLA</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-brand-light shrink-0" />
                  <span className="tabular-nums">100% Compliant</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm flex items-center gap-2.5">
                  <Users className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Founder Engagement</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-3 rounded-xl backdrop-blur-sm flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-light shrink-0" />
                  <span>Pan-India Presence</span>
                </div>
              </motion.div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden flex-wrap gap-2.5 mb-6">
                <a
                  href="https://wa.me/917000081129"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] min-h-11 inline-flex items-center justify-center gap-2 bg-brand-light text-brand-onaccent py-3 px-4 rounded-xl font-bold text-xs hover:bg-white transition-colors duration-150 active:scale-[0.96] shadow-md"
                >
                  <MessageSquare className="w-4 h-4" /> WhatsApp Chat
                </a>
                <a
                  href="tel:+917000081129"
                  className="flex-1 min-w-[140px] min-h-11 inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3 px-4 rounded-xl font-bold text-xs hover:bg-white/20 transition-colors duration-150 active:scale-[0.96]"
                >
                  <Phone className="w-4 h-4 text-brand-light" /> Call Us Direct
                </a>
              </div>

              {/* Desktop Direct Contact Cards */}
              <div className="hidden lg:flex flex-col gap-4">
                {/* Email Card */}
                <TiltCard
                  maxTilt={5}
                  lift={5}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 cursor-pointer group transition-colors"
                >
                  <div onClick={() => copyToClipboard('info@pinnacleconsultant.co.in', 'email')} className="h-full">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-light/15 text-brand-light flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Official Desk Email</div>
                        <div className="text-sm font-bold text-white group-hover:text-brand-light transition-colors">
                          info@pinnacleconsultant.co.in
                        </div>
                      </div>
                    </div>
                    {copiedField === 'email' ? (
                      <span className="bg-brand-light text-brand-onaccent text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <Copy className="w-4 h-4 text-slate-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                    )}
                    </div>
                  </div>
                </TiltCard>

                {/* Phone & WhatsApp Card */}
                <TiltCard
                  maxTilt={5}
                  lift={5}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div
                      onClick={() => copyToClipboard('+91-7000081129', 'phone')}
                      className="flex items-center gap-3.5 cursor-pointer group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-brand-light/15 text-brand-light flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 font-medium">Direct Line / WhatsApp</div>
                        <div className="text-sm font-bold text-white group-hover:text-brand-light transition-colors">
                          +91-7000081129
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href="https://wa.me/917000081129"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 bg-brand-light text-brand-onaccent text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-white transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </TiltCard>

                {/* Office & HQ Card */}
                <TiltCard
                  maxTilt={5}
                  lift={5}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-brand-light/15 text-brand-light flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-slate-400 font-medium">Registered Office</div>
                      <div className="text-sm font-bold text-white mb-2">
                        Pinnacle Consultant, Gurugram, Haryana, India
                      </div>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
                        <span>Pan-India Presence</span>
                        <a
                          href="https://www.linkedin.com/company/pinnacleconsultant-india/posts/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-light font-bold hover:underline flex items-center gap-1"
                        >
                          <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </div>

            {/* Ingestion Form */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-brand-card text-brand-ink rounded-[2rem] shadow-2xl border border-brand-edge p-6 sm:p-8 md:p-10 relative"
              >
                <div className="mb-6 border-b border-brand-edge pb-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-brand-ink">Tell Us About Your Project</h2>
                      <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                        Share your project parameters and we will get back to you within 24 hours.
                      </p>
                    </div>
                    <span className="hidden sm:inline-flex items-center gap-1 bg-brand-light/20 text-brand-ink text-[11px] font-bold px-3 py-1 rounded-full">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-800" /> Fast Turnaround
                    </span>
                  </div>
                </div>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-3.5 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 font-medium text-brand-ink"
                            placeholder="e.g. Rahul Sharma"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Company / Organization *
                        </label>
                        <div className="relative">
                          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            required
                            className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-3.5 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 font-medium text-brand-ink"
                            placeholder="e.g. Hero MotoCorp / Ather Energy"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-5">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Work Email *
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="email"
                            required
                            className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-3.5 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 font-medium text-brand-ink"
                            placeholder="rahul@company.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Phone / WhatsApp *
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                          <input
                            type="tel"
                            required
                            className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-3.5 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 font-medium text-brand-ink"
                            placeholder="+91 XXXXX XXXXX"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Practice Area / Solution Required *
                      </label>
                      <select className="w-full bg-brand-bg border border-brand-edge rounded-xl px-4 py-3.5 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 font-semibold text-brand-ink">
                        <option>Manpower Staffing (Corporate &amp; Contractual)</option>
                        <option>EV Infrastructure Setup &amp; Maintenance (AMC)</option>
                        <option>Intelligent Automation Solutions</option>
                        <option>Market Research &amp; Sectoral Intelligence Reports</option>
                        <option>Executive Search / Direct Founder Advisory</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Describe Requirements &amp; Scope *
                      </label>
                      <textarea
                        rows={4}
                        required
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl px-4 py-3 text-base md:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light transition-colors duration-150 resize-none font-medium text-brand-ink"
                        placeholder="Detail your estimated staffing count, target locations, EV charger specifications, or project launch timeline..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-brand-dark text-white py-4 pl-6 pr-5 rounded-xl font-bold text-sm sm:text-base hover:bg-brand-light hover:text-brand-onaccent transition-[color,background-color,transform] duration-200 active:scale-[0.96] flex items-center justify-center gap-2 group shadow-lg cursor-pointer"
                    >
                      <span>Send Project Details</span>
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center justify-center gap-2 text-center text-xs text-slate-500 pt-2 font-medium">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Your details are kept confidential. No spam or marketing lists.</span>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 bg-brand-light/25 text-brand-ink rounded-full flex items-center justify-center mb-5">
                      <CheckCircle className="w-9 h-9 text-emerald-700" />
                    </div>
                    <h3 className="text-2xl font-bold text-brand-ink mb-2">Message Received</h3>
                    <p className="text-brand-muted font-medium mb-6 max-w-md text-[15px] sm:text-sm leading-relaxed">
                      Thank you for reaching out. We have received your project details and will follow up within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-flex items-center gap-2 bg-brand-dark text-white text-xs font-bold px-5 py-2.5 min-h-11 rounded-xl hover:bg-brand-light hover:text-brand-onaccent transition-colors duration-150 active:scale-[0.96] cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Contact Channels */}
      <section className="lg:hidden py-10 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
            Direct Reach Channels
          </h3>
          <div className="grid sm:grid-cols-2 gap-3.5">
            <TiltCard
              maxTilt={4}
              lift={4}
              className="bg-brand-bg rounded-xl border border-brand-edge"
            >
              <div
                onClick={() => copyToClipboard('info@pinnacleconsultant.co.in', 'email-mob')}
                className="p-4 flex items-center justify-between h-full cursor-pointer"
              >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-dark text-brand-light flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Email</div>
                  <div className="text-xs font-bold text-brand-ink break-all">
                    info@pinnacleconsultant.co.in
                  </div>
                </div>
              </div>
              {copiedField === 'email-mob' && (
                <span className="text-[10px] text-emerald-700 font-bold">Copied!</span>
              )}
              </div>
            </TiltCard>

            <TiltCard
              maxTilt={4}
              lift={4}
              className="bg-brand-bg rounded-xl border border-brand-edge"
            >
              <div
                onClick={() => copyToClipboard('+91-7000081129', 'phone-mob')}
                className="p-4 flex items-center justify-between h-full cursor-pointer"
              >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-dark text-brand-light flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase">Phone</div>
                  <div className="text-xs font-bold text-brand-ink">+91-7000081129</div>
                </div>
              </div>
              {copiedField === 'phone-mob' && (
                <span className="text-[10px] text-emerald-700 font-bold">Copied!</span>
              )}
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* Engagement Process */}
      <section className="py-14 md:py-20 bg-brand-card border-b border-brand-edge">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <ScrollReveal direction="up" distance={20} className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Next Steps
            </span>
            <WordReveal
              as="h2"
              text="What Happens Next?"
              className="text-3xl md:text-4xl font-bold text-brand-ink mt-3 mb-3"
            />
            <p className="text-brand-muted text-sm md:text-base font-medium">
              What to expect after you share your requirements with us.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid md:grid-cols-3 gap-8 relative"
          >
            {/* Step 1 */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={5}
                lift={6}
                className="bg-brand-bg rounded-2xl p-6 sm:p-8 border border-brand-edge relative group hover:border-brand-dark transition-colors h-full"
              >
              <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-light font-bold text-lg flex items-center justify-center mb-6 shadow-md tabular-nums">
                01
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">Requirement Scoping</h3>
              <p className="text-[15px] sm:text-sm text-brand-muted leading-relaxed font-medium mb-4 text-pretty">
                We review your submission and contact you within 24 hours to clarify headcount targets, location requirements, compliance needs, or charger specs.
              </p>
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 tabular-nums">
                <Clock className="w-3.5 h-3.5" /> Response within 24 hours
              </div>
              </TiltCard>
            </motion.div>

            {/* Step 2 */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={5}
                lift={6}
                className="bg-brand-bg rounded-2xl p-6 sm:p-8 border border-brand-edge relative group hover:border-brand-dark transition-colors h-full"
              >
              <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-light font-bold text-lg flex items-center justify-center mb-6 shadow-md tabular-nums">
                02
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">Commercial Proposal</h3>
              <p className="text-[15px] sm:text-sm text-brand-muted leading-relaxed font-medium mb-4 text-pretty">
                We share a clear commercial estimate detailing wage structures, statutory benefits (PF, ESIC), and deployment schedules.
              </p>
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5 tabular-nums">
                <FileCheck2 className="w-3.5 h-3.5" /> Turnaround: 48 hours
              </div>
              </TiltCard>
            </motion.div>

            {/* Step 3 */}
            <motion.div variants={staggerChild}>
              <TiltCard
                maxTilt={5}
                lift={6}
                className="bg-brand-bg rounded-2xl p-6 sm:p-8 border border-brand-edge relative group hover:border-brand-dark transition-colors h-full"
              >
              <div className="w-12 h-12 rounded-xl bg-brand-dark text-brand-light font-bold text-lg flex items-center justify-center mb-6 shadow-md tabular-nums">
                03
              </div>
              <h3 className="text-lg font-bold text-brand-ink mb-2">On-Ground Mobilization</h3>
              <p className="text-[15px] sm:text-sm text-brand-muted leading-relaxed font-medium mb-4 text-pretty">
                Once agreements are signed, we begin sourcing and deployment with a dedicated account manager tracking daily shifts and SLAs.
              </p>
              <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Dedicated account manager
              </div>
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Frequently Asked Inquiries */}
      <section className="py-14 md:py-20 bg-brand-bg">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <ScrollReveal direction="up" distance={20} className="text-center mb-12">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              Clear Answers
            </span>
            <WordReveal
              as="h2"
              text="Frequently Asked Questions"
              className="text-3xl md:text-4xl font-bold text-brand-ink mt-3 mb-2"
            />
            <p className="text-brand-muted text-sm md:text-base font-medium">
              Common questions about working with Pinnacle.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-3.5"
          >
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={staggerChild}
                className="bg-brand-card rounded-2xl border border-brand-edge overflow-hidden shadow-sm transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full text-left p-5 sm:p-6 flex items-start justify-between gap-4 font-bold text-base text-brand-ink hover:text-emerald-800 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      'w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200',
                      openFaq === index && 'rotate-180 text-brand-ink'
                    )}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-[15px] sm:text-sm text-brand-muted font-medium leading-relaxed border-t border-brand-edge pt-3 text-pretty">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>

          {/* Direct Connect Banner */}
          <ScrollReveal direction="up" distance={25}>
            <div className="mt-12 bg-brand-dark text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h4 className="text-lg font-bold text-white mb-1">Prefer to speak with someone right now?</h4>
                <p className="text-xs sm:text-sm text-slate-300 font-medium text-pretty">
                  Our practice coordinators are available directly by phone or WhatsApp during business hours.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
                <Magnetic>
                  <a
                    href="https://wa.me/917000081129"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent font-bold text-xs sm:text-sm px-5 py-3 min-h-11 rounded-xl hover:bg-white transition-colors duration-150 active:scale-[0.96]"
                  >
                    <MessageSquare className="w-4 h-4" /> Message on WhatsApp
                  </a>
                </Magnetic>
                <a
                  href="tel:+917000081129"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm px-5 py-3 min-h-11 rounded-xl transition-colors duration-150 active:scale-[0.96] border border-white/20"
                >
                  <Phone className="w-4 h-4 text-brand-light" /> +91-7000081129
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
