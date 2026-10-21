import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mail, Phone, ChevronDown, Linkedin, Users, Zap, Cpu, BarChart3, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import VerticalSwitcher from './VerticalSwitcher';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.888 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function XTwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/pinnacleconsultant-india/posts/',
    icon: Linkedin,
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/917000081129',
    icon: WhatsAppIcon,
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com',
    icon: XTwitterIcon,
  },
];

interface HeaderProps {
  onOpenBrochure?: () => void;
}

export default function Header({ onOpenBrochure: _onOpenBrochure }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const next = window.scrollY > 40;
          setIsScrolled((prev) => (prev !== next ? next : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const serviceItems = [
    { name: 'Manpower Staffing', path: '/staffing', desc: 'Corporate & Contractual talent', icon: Users },
    { name: 'EV Solutions', path: '/tech-ev', desc: 'Charging infra & maintenance AMC', icon: Zap },
    { name: 'Industrial Automation Solutions', path: '/industry-4-0', desc: 'IoT, smart factory & robotics', icon: Cpu },
    { name: 'Market Research', path: '/market-research', desc: 'Sectoral intelligence & reports', icon: BarChart3 },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Top Bar - Email, Mobile & Social Logos */}
        <div
          className={cn(
            'bg-brand-light text-brand-onaccent text-xs font-semibold border-b border-brand-line transition-[padding] duration-300 shadow-xs',
            isScrolled ? 'py-1 sm:py-1.5' : 'py-1.5 sm:py-2'
          )}
        >
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center gap-3">
            {/* Email & Mobile */}
            <div className="flex items-center gap-3 sm:gap-6 shrink-0">
              <a
                href="mailto:info@pinnacleconsultant.co.in"
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                title="Email: info@pinnacleconsultant.co.in"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">info@pinnacleconsultant.co.in</span>
                <span className="sm:hidden text-[11px]">info@pinnacleconsultant.co.in</span>
              </a>

              <a
                href="tel:+917000081129"
                className="flex items-center gap-1.5 hover:opacity-75 transition-opacity"
                title="Call: +91-7000081129"
              >
                <Phone className="w-3.5 h-3.5 shrink-0" />
                <span>+91-7000081129</span>
              </a>
            </div>

            {/* All Social Logos */}
            <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
              <span className="hidden lg:inline text-[11px] font-bold uppercase tracking-wider opacity-70 mr-1 select-none">
                Follow Us:
              </span>
              {SOCIAL_LINKS.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.name}
                    title={item.name}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-black/10 transition-[transform,background-color] duration-150 text-brand-onaccent hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <header
          className={cn(
            'transition-[padding,background-color,border-color] duration-300 ease-in-out',
            isScrolled
              ? 'bg-brand-dark/95 backdrop-blur-md py-3.5 shadow-xl border-b border-white/10'
              : 'bg-brand-dark py-5'
          )}
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <span className="relative inline-flex items-center justify-center">
                  <span
                    aria-hidden="true"
                    className="absolute -inset-1 rounded-xl bg-brand-light/15 blur-md opacity-40 group-hover:opacity-70 transition-opacity duration-300"
                  />
                  <img
                    src="/images/pinnacle-icon-transparent.png"
                    alt="Pinnacle Consultant"
                    className="relative w-8 h-8 object-contain rounded-lg drop-shadow-[0_0_4px_var(--color-brand-light)] group-hover:scale-105 transition-transform"
                  />
                </span>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold text-white tracking-tight leading-none">
                    Pinnacle
                  </span>
                  <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold mt-0.5">
                    Consultant
                  </span>
                </div>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden xl:flex items-center gap-7">
                <Link
                  to="/"
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    location.pathname === '/' ? 'text-brand-light' : 'text-white hover:text-brand-light'
                  )}
                >
                  Home
                </Link>

                {/* Services Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                >
                  <button
                    onClick={() => setServicesDropdown((o) => !o)}
                    aria-expanded={servicesDropdown}
                    className={cn(
                      'text-sm font-semibold transition-colors flex items-center gap-1.5 py-2',
                      ['/staffing', '/tech-ev', '/industry-4-0', '/market-research'].includes(
                        location.pathname
                      )
                        ? 'text-brand-light'
                        : 'text-white hover:text-brand-light'
                    )}
                  >
                    Services <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                  </button>

                  <AnimatePresence>
                    {servicesDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 w-72 bg-brand-dark border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-lg"
                      >
                        {serviceItems.map((s) => {
                          const Icon = s.icon;
                          return (
                            <Link
                              key={s.path}
                              to={s.path}
                              className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-light group-hover:bg-brand-light group-hover:text-brand-onaccent transition-colors duration-150 shrink-0 mt-0.5">
                                <Icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-white text-xs font-semibold group-hover:text-brand-light transition-colors">
                                  {s.name}
                                </div>
                                <div className="text-xs text-slate-400 mt-0.5 font-normal">
                                  {s.desc}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link
                  to="/impact"
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    location.pathname === '/impact'
                      ? 'text-brand-light'
                      : 'text-white hover:text-brand-light'
                  )}
                >
                  Clients & Impact
                </Link>

                <Link
                  to="/about"
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    location.pathname === '/about'
                      ? 'text-brand-light'
                      : 'text-white hover:text-brand-light'
                  )}
                >
                  About Us
                </Link>

                <Link
                  to="/careers"
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    location.pathname.startsWith('/careers')
                      ? 'text-brand-light'
                      : 'text-white hover:text-brand-light'
                  )}
                >
                  Careers
                </Link>

                <Link
                  to="/faq"
                  className={cn(
                    'text-sm font-semibold transition-colors',
                    location.pathname === '/faq'
                      ? 'text-brand-light'
                      : 'text-white hover:text-brand-light'
                  )}
                >
                  FAQ
                </Link>
              </nav>

              {/* Desktop CTA */}
              <div className="hidden lg:flex items-center gap-3">
                <VerticalSwitcher />
                <Link
                  to="/contact"
                  className="inline-flex min-h-11 items-center gap-2 bg-brand-light text-brand-onaccent px-5 py-2.5 rounded-full font-bold text-xs hover:bg-white transition-colors duration-150 active:scale-95 shadow-md"
                >
                  <span>Request Mandate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                className="xl:hidden text-white p-3 -m-1"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="xl:hidden bg-brand-dark border-t border-white/10 overflow-hidden absolute w-full shadow-2xl"
              >
                <div className="px-5 py-6 flex flex-col gap-3">
                  <VerticalSwitcher idPrefix="mobile" className="self-start mb-1" />
                  <Link to="/" className="flex min-h-11 items-center text-sm font-semibold text-white py-1">
                    Home
                  </Link>
                  <div className="text-xs uppercase text-brand-light font-bold tracking-wider pt-2">
                    Services
                  </div>
                  {serviceItems.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      className="flex min-h-11 items-center text-sm font-medium text-slate-300 pl-3 py-1 hover:text-white"
                    >
                      • {s.name}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 pt-2 mt-2 flex flex-col gap-2">
                    <Link to="/impact" className="flex min-h-11 items-center text-sm font-semibold text-white py-1">
                      Clients & Impact
                    </Link>
                    <Link to="/about" className="flex min-h-11 items-center text-sm font-semibold text-white py-1">
                      About Us (Vision & Values)
                    </Link>
                    <Link to="/careers" className="flex min-h-11 items-center text-sm font-semibold text-white py-1">
                      Careers (We're Hiring)
                    </Link>
                    <Link to="/faq" className="flex min-h-11 items-center text-sm font-semibold text-white py-1">
                      FAQ
                    </Link>
                    <Link
                      to="/contact"
                      className="mt-3 inline-flex items-center justify-center gap-2 bg-brand-light text-brand-onaccent px-6 py-3.5 rounded-full font-bold text-sm"
                    >
                      <span>Get in Touch</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      </div>
    </>
  );
}
