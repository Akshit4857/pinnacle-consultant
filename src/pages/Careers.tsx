import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  BriefcaseBusiness,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingOrb from '../components/motion/FloatingOrb';
import { cn } from '../lib/utils';

export interface JobItem {
  slug: string;
  title: string;
  department: string;
  location: string;
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  workMode: 'On-site' | 'Remote' | 'Hybrid';
  experience: string;
  salaryRange?: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  lastDateToApply?: string;
  status: 'Active' | 'Inactive';
}

export default function Careers() {
  const [jobs, setJobs] = useState<JobItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedWorkMode, setSelectedWorkMode] = useState('All');

  // Fetch active jobs from Google Sheets API
  useEffect(() => {
    let isMounted = true;
    async function loadJobs() {
      try {
        setLoading(true);
        const res = await fetch('/api/jobs', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setJobs(Array.isArray(data?.data) ? data.data : []);
            return;
          }
        }
        if (isMounted) {
          setJobs([]);
        }
      } catch (_err) {
        if (isMounted) {
          setJobs([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute unique filter options from actual jobs
  const departments = useMemo(() => {
    const defaultDepts = ['All', 'Manpower Staffing', 'EV Solutions', 'Industrial Automation Solutions', 'Market Research'];
    if (!jobs || jobs.length === 0) return defaultDepts;
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.department));
    defaultDepts.forEach((d) => set.add(d));
    return Array.from(set);
  }, [jobs]);

  const jobTypes = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.jobType));
    return ['All', 'Full-time', 'Part-time', 'Internship', 'Contract', ...Array.from(set)];
  }, [jobs]);

  const workModes = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => set.add(j.workMode));
    return ['All', 'On-site', 'Remote', 'Hybrid', ...Array.from(set)];
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        (job.skills && job.skills.some((s) => s.toLowerCase().includes(q))) ||
        job.description.toLowerCase().includes(q);

      const matchesDept = selectedDept === 'All' || job.department === selectedDept;
      const matchesType = selectedType === 'All' || job.jobType === selectedType;
      const matchesWorkMode = selectedWorkMode === 'All' || job.workMode === selectedWorkMode;

      return matchesSearch && matchesDept && matchesType && matchesWorkMode;
    });
  }, [jobs, searchQuery, selectedDept, selectedType, selectedWorkMode]);

  // JSON-LD JobPosting schema for SEO
  const structuredData = useMemo(() => {
    if (!jobs || jobs.length === 0) return null;
    return {
      '@context': 'https://schema.org',
      '@graph': jobs.map((job) => ({
        '@type': 'JobPosting',
        title: job.title,
        description: job.description,
        datePosted: job.postedDate,
        validThrough: job.lastDateToApply || '2026-12-31',
        employmentType: job.jobType.toUpperCase().replace('-', '_'),
        hiringOrganization: {
          '@type': 'Organization',
          name: 'Pinnacle Consultant',
          sameAs: 'https://pinnacleconsultant.co.in',
          logo: 'https://pinnacleconsultant.co.in/images/pinnacle-icon-transparent.png',
        },
        jobLocation: {
          '@type': 'Place',
          address: {
            '@type': 'PostalAddress',
            addressLocality: job.location,
            addressCountry: 'IN',
          },
        },
        applicantLocationRequirements: {
          '@type': 'Country',
          name: 'India',
        },
        jobLocationType: job.workMode === 'Remote' ? 'TELECOMMUTE' : undefined,
      })),
    };
  }, [jobs]);

  return (
    <div className="w-full bg-brand-bg min-h-svh">
      {/* Inject Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      {/* Hero Header - Compact & Integrated (Exact FAQ Style) */}
      <section className="pt-28 md:pt-36 pb-8 md:pb-10 bg-brand-dark text-white relative overflow-hidden">
        <FloatingOrb className="top-0 right-0" size={384} blurClass="blur-3xl" delay={0} />
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold mb-3 leading-[1.1] tracking-tight">
            {[
              <span key="l1" className="block">
                Open Career <span className="text-brand-light">Opportunities</span>
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
          <p className="text-sm sm:text-base text-slate-300 mx-auto leading-relaxed font-medium mb-6 max-w-xl">
            Explore active mandates across Manpower Staffing, EV Infrastructure, Industry 4.0, and Market Intelligence.
          </p>

          {/* Integrated Category Filter Pills directly in the Hero */}
          {jobs.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={cn(
                    'flex items-center gap-2 px-5 py-2.5 min-h-11 rounded-full font-semibold text-xs sm:text-sm transition-[color,background-color,border-color,transform] duration-150 active:scale-[0.96] border shadow-xs cursor-pointer',
                    selectedDept === dept
                      ? 'bg-brand-light text-brand-onaccent border-brand-light shadow-md font-bold scale-[1.02]'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm'
                  )}
                >
                  <span>{dept}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          {/* Controls Bar: Search & Sub-filters - Only displayed when jobs exist */}
          {jobs.length > 0 && (
            <>
              <div className="bg-brand-card rounded-2xl border border-brand-edge p-4 sm:p-5 shadow-xs mb-8">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search openings by role, title, or keywords..."
                      className="w-full bg-brand-bg border border-brand-edge rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-light focus:border-brand-light text-brand-ink"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-white px-2 py-0.5 rounded cursor-pointer"
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {/* Work Mode & Type Filters */}
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center gap-2 bg-brand-bg border border-brand-edge rounded-xl px-3 py-2 text-xs font-semibold text-slate-600">
                      <Filter className="w-3.5 h-3.5 text-slate-400" />
                      <span className="text-slate-400">Type:</span>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="bg-transparent text-brand-ink font-bold focus:outline-none cursor-pointer"
                      >
                        {jobTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2 bg-brand-bg border border-brand-edge rounded-xl px-3 py-2 text-xs font-semibold text-slate-600">
                      <span className="text-slate-400">Mode:</span>
                      <select
                        value={selectedWorkMode}
                        onChange={(e) => setSelectedWorkMode(e.target.value)}
                        className="bg-transparent text-brand-ink font-bold focus:outline-none cursor-pointer"
                      >
                        {workModes.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {loading ? (
                    'Loading positions...'
                  ) : (
                    <>
                      Showing <span className="tabular-nums font-bold text-brand-dark">{filteredJobs.length}</span> active position{filteredJobs.length === 1 ? '' : 's'}
                    </>
                  )}
                </div>
                {(searchQuery || selectedDept !== 'All' || selectedType !== 'All' || selectedWorkMode !== 'All') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDept('All');
                      setSelectedType('All');
                      setSelectedWorkMode('All');
                    }}
                    className="text-xs font-semibold text-brand-dark hover:underline cursor-pointer"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </>
          )}

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[1, 2].map((n) => (
                <div
                  key={n}
                  className="bg-brand-card rounded-2xl border border-brand-edge p-6 animate-pulse space-y-4"
                >
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-2/3" />
                  <div className="h-3 bg-slate-200 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          {/* Clean Empty State (When no jobs active or sheet is empty) */}
          {!loading && filteredJobs.length === 0 && (
            <div className="py-14 sm:py-20 text-center max-w-xl mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-white/70 text-brand-dark flex items-center justify-center mx-auto mb-4 border border-brand-edge shadow-xs">
                <BriefcaseBusiness className="w-6 h-6 text-brand-dark" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-ink mb-2">
                No active openings right now
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto font-medium mb-6">
                We are currently reviewing upcoming client workforce mandates across Clean Mobility, Industrial Automation, and Technical Staffing. Openings will appear here automatically once published.
              </p>
              <div className="inline-flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/contact"
                  className="btn btn-primary text-xs py-2.5 px-5 shadow-sm"
                >
                  Submit Spontaneous Application
                </Link>
                <a
                  href="mailto:info@pinnacleconsultant.co.in"
                  className="btn btn-outline text-xs py-2.5 px-5"
                >
                  info@pinnacleconsultant.co.in
                </a>
              </div>
              {(searchQuery || selectedDept !== 'All' || selectedType !== 'All' || selectedWorkMode !== 'All') && (
                <div className="mt-6">
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDept('All');
                      setSelectedType('All');
                      setSelectedWorkMode('All');
                    }}
                    className="text-xs font-semibold text-brand-dark hover:underline cursor-pointer"
                  >
                    Clear Active Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Job Cards Grid */}
          {!loading && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <AnimatePresence>
                {filteredJobs.map((job) => (
                  <motion.div
                    key={job.slug}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="bg-brand-card rounded-2xl border border-brand-edge p-6 shadow-xs hover:shadow-md hover:border-brand-line transition-[box-shadow,border-color] flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-light-3 bg-brand-light/15 px-3 py-1 rounded-full">
                          {job.department}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                          <span className="bg-brand-bg border border-brand-edge px-2 py-0.5 rounded-md">
                            {job.jobType}
                          </span>
                          <span className="bg-brand-bg border border-brand-edge px-2 py-0.5 rounded-md">
                            {job.workMode}
                          </span>
                        </div>
                      </div>

                      <h2 className="text-lg font-bold text-brand-ink mb-1.5 group-hover:text-brand-dark transition-colors">
                        <Link to={`/careers/${job.slug}`}>{job.title}</Link>
                      </h2>

                      <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500 font-medium mb-3.5">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          {job.experience}
                        </span>
                        {job.openings > 1 && (
                          <span className="text-brand-dark-2 font-semibold tabular-nums">
                            {job.openings} Openings
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal text-pretty">
                        {job.description}
                      </p>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {job.skills.slice(0, 4).map((s) => (
                            <span
                              key={s}
                              className="text-[10px] font-semibold bg-brand-bg text-slate-600 border border-brand-edge px-2.5 py-0.5 rounded-full"
                            >
                              {s}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="text-[10px] font-semibold text-slate-400 self-center tabular-nums">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="pt-3.5 border-t border-brand-edge/60 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1 tabular-nums">
                        <Clock className="w-3 h-3" />
                        Posted {job.postedDate}
                      </span>
                      <Link
                        to={`/careers/${job.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-onaccent bg-brand-light hover:bg-brand-light-4 pl-4 pr-3 py-2 rounded-xl transition-[background-color,transform] duration-150 active:scale-[0.96] shadow-xs group-hover:translate-x-0.5"
                      >
                        <span>View & Apply</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
