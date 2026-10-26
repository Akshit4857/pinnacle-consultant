import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowUp, Phone } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const practices = [
  { to: '/staffing', label: 'Manpower Staffing', sub: 'Corporate & Contractual' },
  { to: '/tech-ev', label: 'EV Infrastructure', sub: 'Charging, AMC & Maintenance' },
  { to: '/industry-4-0', label: 'Intelligent Automation Solutions', sub: 'Enterprises, Homes & Industrial' },
  { to: '/market-research', label: 'Market Research', sub: 'Strategic Intelligence' },
];

const company = [
  { to: '/about', label: 'About Us', sub: 'Vision & Values' },
  { to: '/careers', label: 'Careers', sub: 'Active Opportunities' },
  { to: '/impact', label: 'Clients & Impact', sub: 'Case Studies' },
  { to: '/faq', label: 'Compliance FAQ', sub: 'Hiring & Labor Queries' },
  { to: '/privacy', label: 'Privacy Policy', sub: 'Data & Privacy' },
  { to: '/contact', label: 'Contact', sub: 'Submit Workforce Mandate' },
];

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-dark bg-grid-dark-subtle text-slate-300 pt-24 pb-8 border-t border-brand-light/40 relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[34rem] h-[34rem] rounded-full blur-3xl opacity-40"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-brand-light) 35%, transparent) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -right-40 w-[28rem] h-[28rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            'radial-gradient(circle, color-mix(in srgb, var(--color-brand-light-2) 45%, transparent) 0%, transparent 70%)',
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Section 1: Outro CTA */}
        <ScrollReveal direction="up" className="mb-20">
          <div className="relative rounded-panel border border-white/10 bg-white/[0.04] backdrop-blur-sm px-6 py-12 sm:px-10 sm:py-14 md:px-14 md:py-16 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                background:
                  'radial-gradient(ellipse 60% 100% at 100% 0%, color-mix(in srgb, var(--color-brand-light) 28%, transparent), transparent 65%)',
              }}
            />
            <div className="relative flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-brand-light" />
                  <span className="text-brand-light font-bold text-xs tracking-widest uppercase">
                    Strategic Partnership
                  </span>
                </span>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white mb-5 leading-[1.08] tracking-tight">
                  Ready to scale your{' '}
                  <span className="text-brand-light">workforce & operations?</span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg font-medium leading-relaxed">
                  Partner with Pinnacle to deploy elite talent, roll out EV charging hubs,
                  automate factories, and commission proprietary market research.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 shrink-0">
                <Link
                  to="/contact"
                  className="btn btn-primary shadow-md shrink-0 active:scale-[0.98] transition-transform duration-150"
                >
                  <span>Request Mandate</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <a
                  href="tel:+917000081129"
                  className="btn btn-ghost backdrop-blur-sm shrink-0 active:scale-[0.98] transition-transform duration-150"
                >
                  <Phone className="w-4 h-4 text-brand-light" /> Talk to us
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Section 2: Trust strip */}
        <ScrollReveal direction="up" delay={0.05} className="mb-16 pb-12 border-b border-white/25">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8">
            {[
              { k: 'Jan 2025', v: 'Founded by operators' },
              { k: '4 Practices', v: 'Staffing · EV · Ind 4.0 · Intel' },
              { k: '100%', v: 'Statutory compliance' },
              { k: 'Enterprise', v: 'Hero · Ather · Magenta EV · FEPL · Vertiv EV' },
            ].map((item) => (
              <div key={item.k} className="border-l-2 border-brand-light/50 pl-4">
                <div className="text-white font-bold text-lg md:text-xl tracking-tight">{item.k}</div>
                <div className="text-xs uppercase tracking-widest text-slate-400 font-semibold mt-1.5 leading-relaxed">
                  {item.v}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Section 3: Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 mb-16">
          {/* Brand Info */}
          <ScrollReveal direction="up" delay={0.05}>
            <Link to="/" className="flex items-center gap-3 mb-5 group">
              <span className="relative inline-flex items-center justify-center">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-xl bg-brand-light/15 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                />
                <img
                  src="/images/pinnacle-icon-transparent.png"
                  alt="Pinnacle Consultant"
                  width={36}
                  height={36}
                  loading="lazy"
                  decoding="async"
                  className="relative w-9 h-9 object-contain rounded-lg drop-shadow-[0_0_4px_var(--color-brand-light)] group-hover:scale-105 transition-transform"
                />
              </span>
              <span className="text-2xl font-bold text-white tracking-tight">
                Pinnacle<span className="text-brand-light">.</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed font-medium mb-6">
              Gurugram-based operational consulting firm founded in 2025 by industry practitioners.
              Supporting Indian enterprises across Manpower Staffing, EV Infrastructure, Industry 4.0, and
              Market Intelligence.
            </p>
          </ScrollReveal>

          {/* Practice Areas */}
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                Practice Areas
              </h3>
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <ul className="space-y-1">
              {practices.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2 hover:bg-white/5 transition-colors"
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-200 group-hover:text-brand-light transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-slate-500 font-medium mt-0.5">
                        {item.sub}
                      </span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 mt-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Company */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">Company</h3>
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <ul className="space-y-1">
              {company.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="group flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2 hover:bg-white/5 transition-colors"
                  >
                    <span>
                      <span className="block text-xs font-semibold text-slate-200 group-hover:text-brand-light transition-colors">
                        {item.label}
                      </span>
                      <span className="block text-xs text-slate-500 font-medium mt-0.5">
                        {item.sub}
                      </span>
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 mt-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal direction="up" delay={0.2}>
            <div className="flex items-center gap-3 mb-5">
              <h3 className="text-white font-bold text-xs uppercase tracking-widest">
                Direct Contact
              </h3>
              <span className="h-px flex-1 bg-white/20" />
            </div>
            <ul className="space-y-1">
              <li>
                <a
                  href="mailto:info@pinnacleconsultant.co.in"
                  className="group flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2 hover:bg-white/5 transition-colors"
                >
                  <span>
                    <span className="block text-xs font-semibold text-slate-200 group-hover:text-brand-light transition-colors break-all">
                      info@pinnacleconsultant.co.in
                    </span>
                    <span className="block text-xs text-slate-500 font-medium mt-0.5">Email</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 mt-0.5" />
                </a>
              </li>
              <li>
                <a
                  href="tel:+917000081129"
                  className="group flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2 hover:bg-white/5 transition-colors"
                >
                  <span>
                    <span className="block text-xs font-semibold text-slate-200 group-hover:text-brand-light transition-colors">
                      +91-7000081129
                    </span>
                    <span className="block text-xs text-slate-500 font-medium mt-0.5">Call</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 mt-0.5" />
                </a>
              </li>
              <li>
                <div className="flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2">
                  <span>
                    <span className="block text-xs font-semibold text-slate-200 leading-relaxed">
                      Pinnacle Consultant, Gurugram, Haryana, India
                    </span>
                    <span className="block text-xs text-slate-500 font-medium mt-0.5">Office</span>
                  </span>
                </div>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/pinnacleconsultant-india/posts/"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-start justify-between gap-3 py-2.5 rounded-lg -mx-2 px-2 hover:bg-white/5 transition-colors"
                >
                  <span>
                    <span className="block text-xs font-semibold text-slate-200 group-hover:text-brand-light transition-colors">
                      LinkedIn Company Page
                    </span>
                    <span className="block text-xs text-slate-500 font-medium mt-0.5">Follow us</span>
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-slate-600 group-hover:text-brand-light group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200 mt-0.5" />
                </a>
              </li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Section 4: Copyright Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8 border-t border-white/25 text-xs text-slate-400 font-medium">
          <p className="text-center md:text-left">
            © {currentYear} Pinnacle Consultant. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 order-last md:order-none">
            <span>Founded Jan 2025</span>
            <span className="w-1 h-1 rounded-full bg-brand-light/60" />
            <span>100% Statutory Compliance</span>
          </div>
          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group inline-flex items-center gap-2.5 min-h-11 text-slate-400 hover:text-brand-light transition-colors active:scale-95"
          >
            <span className="text-xs uppercase tracking-widest font-bold">Back to top</span>
            <span className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center group-hover:bg-brand-light group-hover:border-brand-light group-hover:text-brand-onaccent group-hover:-translate-y-0.5 transition-[color,background-color,border-color,transform] duration-200">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
