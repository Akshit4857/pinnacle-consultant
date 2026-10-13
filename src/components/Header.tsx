import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, CheckCircle2, Mail, Phone, ChevronDown, Linkedin, Users, Zap, Cpu, BarChart3, ArrowUpRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import ThemeSwitcher from './ThemeSwitcher';
import VerticalSwitcher from './VerticalSwitcher';

interface HeaderProps {
  onOpenBrochure?: () => void;
}

export default function Header({ onOpenBrochure }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [location.pathname]);

  const serviceItems = [
    { name: 'Manpower Staffing', path: '/staffing', desc: 'Corporate & Contractual talent', icon: Users },
    { name: 'EV Solutions', path: '/tech-ev', desc: 'Charging infra & maintenance AMC', icon: Zap },
    { name: 'Industry 4.0', path: '/industry-4-0', desc: 'IoT, smart factory & robotics', icon: Cpu },
    { name: 'Market Research', path: '/market-research', desc: 'Sectoral intelligence & reports', icon: BarChart3 },
  ];

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top Bar */}
        <div
          className={cn(
            'bg-brand-light text-brand-onaccent text-xs font-semibold hidden md:block border-b border-brand-line transition-all duration-300',
            isScrolled ? 'py-1.5' : 'py-2'
          )}
        >
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
            <div className="flex items-center gap-4 lg:gap-6">
              <span className="hidden lg:flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Trusted by Hero, Exponent, Sun Mobility, Gentari
              </span>
              <a
                href="mailto:shikha@pinnacleconsultant.co.in"
                className="flex items-center gap-1.5 hover:underline"
              >
                <Mail className="w-3.5 h-3.5" /> shikha@pinnacleconsultant.co.in
              </a>
              <a href="tel:+917879716775" className="flex items-center gap-1.5 hover:underline">
                <Phone className="w-3.5 h-3.5" /> +91-7879716775
              </a>
            </div>
            <div className="flex items-center gap-3">
              {onOpenBrochure && (
                <button
                  onClick={onOpenBrochure}
                  className="hover:opacity-85 flex items-center gap-1.5 text-xs font-bold transition-opacity bg-black/10 px-2.5 py-1 rounded-full text-brand-onaccent"
                >
                  <FileText className="w-3.5 h-3.5" /> Company Profile
                </button>
              )}
              <ThemeSwitcher inline />
              <span className="uppercase tracking-widest text-xs font-bold">Connect —</span>
              <a
                href="https://www.linkedin.com/company/pinnacleconsultant-india/"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-75 flex items-center gap-1 text-xs font-bold transition-opacity"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Main Nav */}
        <header
          className={cn(
            'transition-all duration-300 ease-in-out',
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
                    Pinnacle<span className="text-brand-light">.</span>
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
                              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-brand-light group-hover:bg-brand-light text-brand-onaccent transition-all shrink-0 mt-0.5">
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
                  className="inline-flex items-center gap-2 bg-brand-light text-brand-onaccent px-5 py-2.5 rounded-full font-bold text-xs hover:bg-white transition-all shadow-md"
                >
                  <span>Request Mandate</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Mobile Toggle */}
              <button
                className="xl:hidden text-white p-2"
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
                  <VerticalSwitcher className="self-start mb-1" />
                  <Link to="/" className="text-sm font-semibold text-white py-1">
                    Home
                  </Link>
                  <div className="text-xs uppercase text-brand-light font-bold tracking-wider pt-2">
                    Services
                  </div>
                  {serviceItems.map((s) => (
                    <Link
                      key={s.path}
                      to={s.path}
                      className="text-sm font-medium text-slate-300 pl-3 py-1 hover:text-white"
                    >
                      • {s.name}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 pt-2 mt-2 flex flex-col gap-2">
                    <Link to="/impact" className="text-sm font-semibold text-white py-1">
                      Clients & Impact
                    </Link>
                    <Link to="/about" className="text-sm font-semibold text-white py-1">
                      About Us (Vision & Values)
                    </Link>
                    <Link to="/faq" className="text-sm font-semibold text-white py-1">
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
