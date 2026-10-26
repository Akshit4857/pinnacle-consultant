import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Calendar,
  Sparkles,
  UploadCloud,
  FileCheck,
  AlertCircle,
  ShieldCheck,
  Send,
  Loader2,
  Check,
  X,
  DollarSign,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import FloatingOrb from '../components/motion/FloatingOrb';
import { JobItem } from './Careers';
import SEO from '../components/SEO';

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();

  const [job, setJob] = useState<JobItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const formRef = useRef<HTMLDivElement>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [agreedToPrivacy, setAgreedToPrivacy] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [formLoadTime] = useState<number>(() => Date.now());

  // Turnstile token
  const [turnstileToken, setTurnstileToken] = useState<string>('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Load Job Details
  useEffect(() => {
    let isMounted = true;
    async function fetchJob() {
      try {
        setLoading(true);
        setNotFound(false);
        setErrorMsg(null);

        const res = await fetch(`/api/jobs/${encodeURIComponent(slug || '')}`, { cache: 'no-store' });
        if (res.status === 404) {
          if (isMounted) setNotFound(true);
          return;
        }
        if (!res.ok) {
          throw new Error('Unable to retrieve position details');
        }
        const data = await res.json();
        if (isMounted) {
          if (!data.data) {
            setNotFound(true);
          } else {
            setJob(data.data);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setErrorMsg(err.message || 'Error loading job details');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    if (slug) {
      fetchJob();
    }
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Scroll to application form
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Resume File Selection & Client Validation
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setResumeError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 5 MB)
    if (file.size > 5 * 1024 * 1024) {
      setResumeError('Resume file exceeds the 5 MB maximum limit.');
      setResumeFile(null);
      return;
    }

    // Validate extension
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'doc', 'docx'].includes(ext)) {
      setResumeError('Only PDF, DOC, and DOCX formats are supported.');
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
  };

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsDuplicate(false);

    if (!resumeFile) {
      setResumeError('Please upload your resume (PDF, DOC, or DOCX).');
      return;
    }

    if (!agreedToPrivacy) {
      setSubmitError('Please check the box to agree to our Privacy Policy.');
      return;
    }

    // Basic URL format validation if provided
    if (portfolioUrl.trim()) {
      try {
        const u = new URL(portfolioUrl.trim());
        if (u.protocol !== 'http:' && u.protocol !== 'https:') {
          setSubmitError('Portfolio URL must start with http:// or https://');
          return;
        }
      } catch {
        setSubmitError('Please enter a valid website URL.');
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append('jobSlug', slug || '');
      formData.append('fullName', fullName.trim());
      formData.append('email', email.trim().toLowerCase());
      formData.append('phone', phone.trim());
      formData.append('city', city.trim());
      formData.append('experienceYears', experienceYears.trim());
      formData.append('portfolioUrl', portfolioUrl.trim());
      formData.append('coverNote', coverNote.trim());
      formData.append('agreedToPrivacy', String(agreedToPrivacy));
      formData.append('formLoadTimestamp', String(formLoadTime));
      formData.append('website_url_hp', honeypot); // Honeypot field
      if (turnstileToken) {
        formData.append('turnstileToken', turnstileToken);
      }
      formData.append('resume', resumeFile);

      const res = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      });

      let data: any = {};
      try {
        data = await res.json();
      } catch (_e) {
        throw new Error(
          res.ok
            ? 'Application submitted, but received an unexpected server response.'
            : `Unable to submit application (Server error ${res.status}). Please try again or email us directly at info@pinnacleconsultant.co.in`
        );
      }

      if (res.status === 409) {
        setIsDuplicate(true);
        setSubmitError(
          data.error || 'You have already applied for this role. We have received your profile!'
        );
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed. Please check your information.');
      }

      // Success
      setSubmitSuccess(true);
      // Reset inputs
      setFullName('');
      setEmail('');
      setPhone('');
      setCity('');
      setExperienceYears('');
      setPortfolioUrl('');
      setCoverNote('');
      setResumeFile(null);
      setAgreedToPrivacy(false);
    } catch (err: any) {
      setSubmitError(err.message || 'Unable to submit application. Please check your network.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Structured Data Schema for Single JobPosting
  const singleJobSchema = job
    ? {
        '@context': 'https://schema.org',
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
        jobLocationType: job.workMode === 'Remote' ? 'TELECOMMUTE' : undefined,
      }
    : null;

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-brand-bg flex items-center justify-center pt-24">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-brand-dark animate-spin" />
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Loading position details...
          </span>
        </div>
      </div>
    );
  }

  // Load failure (network / server error) — distinct from a genuinely closed position
  if (errorMsg && !job) {
    return (
      <div className="w-full min-h-screen bg-brand-bg pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <div role="alert" className="bg-brand-card rounded-3xl border border-brand-edge p-8 sm:p-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-5 border border-amber-200">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-ink mb-2">
              Couldn&apos;t Load This Position
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
              {errorMsg} You can also email your resume to{' '}
              <a href="mailto:info@pinnacleconsultant.co.in" className="font-semibold text-brand-dark underline">
                info@pinnacleconsultant.co.in
              </a>
              .
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="btn btn-primary text-xs py-3 px-6"
              >
                Retry
              </button>
              <Link to="/careers" className="btn text-xs py-3 px-6 bg-brand-bg border border-brand-edge text-brand-ink hover:bg-white">
                <ArrowLeft className="w-4 h-4" /> View All Open Positions
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Inactive / Expired / 404 state
  if (notFound || !job) {
    return (
      <div className="w-full min-h-screen bg-brand-bg pt-32 pb-20">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl text-center">
          <div className="bg-brand-card rounded-3xl border border-brand-edge p-8 sm:p-12 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-brand-ink mb-2">
              Position No Longer Accepting Applications
            </h1>
            <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto mb-8">
              This job mandate has either been filled, expired, or is currently inactive. Please explore our other active career opportunities.
            </p>
            <Link to="/careers" className="btn btn-primary text-xs py-3 px-6">
              <ArrowLeft className="w-4 h-4" /> View All Open Positions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-brand-bg min-h-screen">
      <SEO
        title={`${job.title} | Careers at Pinnacle Consultant`}
        description={`Apply for ${job.title} (${job.location}) at Pinnacle Consultant. ${job.description.slice(0, 130)}...`}
        canonicalPath={`/careers/${job.slug}`}
      />
      {/* Inject Structured Data */}
      {singleJobSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(singleJobSchema) }}
        />
      )}

      {/* Hero Header */}
      <section className="pt-28 pb-14 md:pt-36 md:pb-18 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <FloatingOrb className="-top-32 -right-32" size={550} delay={0} />
        <FloatingOrb className="bottom-0 left-[-100px]" size={400} colorClass="bg-brand-light/10" delay={2} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-brand-light transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Openings
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-onaccent bg-brand-light px-3 py-1 rounded-full">
              {job.department}
            </span>
            <span className="text-xs font-semibold bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full">
              {job.jobType}
            </span>
            <span className="text-xs font-semibold bg-white/10 text-white border border-white/15 px-3 py-1 rounded-full">
              {job.workMode}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6 leading-tight">
            {job.title}
          </h1>

          {/* Quick Details Strip */}
          <div className="flex flex-wrap items-center gap-y-2.5 gap-x-6 text-xs sm:text-sm text-slate-300 font-medium mb-8 pb-6 border-b border-white/15">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-light" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-brand-light" />
              {job.experience} Required
            </span>
            {job.salaryRange && (
              <span className="flex items-center gap-1.5 text-brand-light font-semibold tabular-nums">
                <DollarSign className="w-4 h-4" />
                {job.salaryRange}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-brand-light" />
              <span className="tabular-nums font-semibold">{job.openings}</span> Open Position{job.openings > 1 ? 's' : ''}
            </span>
            {job.lastDateToApply && (
              <span className="flex items-center gap-1.5 text-slate-400 tabular-nums">
                <Calendar className="w-4 h-4 text-slate-400" />
                Apply by {job.lastDateToApply}
              </span>
            )}
          </div>

          {/* Prominent CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={scrollToForm}
              className="btn btn-primary shadow-lg active:scale-[0.96] transition-transform cursor-pointer"
            >
              <span>Apply for this Position</span>
              <Send className="w-4 h-4" />
            </button>
            <span className="text-xs text-slate-400 font-medium">
              Takes less than 2 minutes · No account creation required
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Job Description & Details */}
            <div className="lg:col-span-7 space-y-10">
              {/* Full Description */}
              <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-xs">
                <h2 className="text-xl font-bold text-brand-ink mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-brand-light-3" />
                  Role Overview
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                  {job.description}
                </p>
              </div>

              {/* Responsibilities */}
              {job.responsibilities && job.responsibilities.length > 0 && (
                <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-xs">
                  <h2 className="text-xl font-bold text-brand-ink mb-4">Key Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-brand-light/20 text-brand-onaccent flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Requirements */}
              {job.requirements && job.requirements.length > 0 && (
                <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-xs">
                  <h2 className="text-xl font-bold text-brand-ink mb-4">Required Experience & Qualifications</h2>
                  <ul className="space-y-3">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-brand-light-2 shrink-0 mt-2" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills Tags */}
              {job.skills && job.skills.length > 0 && (
                <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-xs">
                  <h2 className="text-xl font-bold text-brand-ink mb-4">Target Core Competencies</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-bold bg-brand-bg text-brand-ink border border-brand-edge px-3.5 py-1.5 rounded-xl"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {job.benefits && job.benefits.length > 0 && (
                <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-xs">
                  <h2 className="text-xl font-bold text-brand-ink mb-4">What We Offer</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {job.benefits.map((b, i) => (
                      <div
                        key={i}
                        className="bg-brand-bg border border-brand-edge rounded-2xl p-4 flex items-start gap-3"
                      >
                        <ShieldCheck className="w-5 h-5 text-brand-light-2 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-snug">
                          {b}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Application Form */}
            <div className="lg:col-span-5" ref={formRef}>
              <div className="sticky top-28 bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-8 shadow-lg text-brand-ink">
                <div className="mb-6 pb-4 border-b border-brand-edge">
                  <h2 className="text-2xl font-bold text-brand-ink">Apply for this Role</h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Direct submission to practice leads · 24–48h profile review
                  </p>
                </div>

                {/* Success Screen */}
                <AnimatePresence>
                  {submitSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <Check className="w-7 h-7 stroke-[2.5]" />
                      </div>
                      <h3 className="text-lg font-bold text-emerald-950">Application Submitted!</h3>
                      <p className="text-xs text-emerald-800 leading-relaxed">
                        Thank you for your interest in joining Pinnacle Consultant. Your application and resume have been securely received. Our talent acquisition lead will evaluate your profile and contact you directly if there is an alignment.
                      </p>
                      <button
                        onClick={() => setSubmitSuccess(false)}
                        className="text-xs font-bold text-emerald-900 bg-emerald-200/80 hover:bg-emerald-200 px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Submit another application
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Application Form */}
                {!submitSuccess && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot hidden input */}
                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website_url_hp">Leave this empty</label>
                      <input
                        id="website_url_hp"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                      />
                    </div>

                    {/* Submit Error Banner */}
                    {submitError && (
                      <div
                        className={`text-xs p-3.5 rounded-xl border flex items-start gap-2.5 ${
                          isDuplicate
                            ? 'bg-amber-50 border-amber-200 text-amber-900'
                            : 'bg-red-50 border-red-200 text-red-800'
                        }`}
                      >
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="priya@example.com"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91-9876543210"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Current City
                        </label>
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="e.g. Gurugram"
                          className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          Experience
                        </label>
                        <input
                          type="text"
                          value={experienceYears}
                          onChange={(e) => setExperienceYears(e.target.value)}
                          placeholder="e.g. 4.5 Years"
                          className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        LinkedIn / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://linkedin.com/in/username"
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl px-3.5 py-2.5 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Short Cover Note / Message
                      </label>
                      <textarea
                        rows={3}
                        value={coverNote}
                        onChange={(e) => setCoverNote(e.target.value)}
                        placeholder="Briefly highlight your relevant achievements or notice period..."
                        className="w-full bg-brand-bg border border-brand-edge rounded-xl p-3 text-sm text-brand-ink focus:outline-none focus:ring-2 focus:ring-brand-light resize-none"
                      />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                        <span>Resume (PDF, DOC, DOCX) *</span>
                        <span className="text-[10px] text-slate-400 font-normal">Max 5 MB</span>
                      </label>

                      {!resumeFile ? (
                        <label className="border-2 border-dashed border-brand-edge hover:border-brand-line bg-brand-bg/70 hover:bg-brand-bg rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer transition-colors text-center">
                          <UploadCloud className="w-6 h-6 text-slate-400 mb-1" />
                          <span className="text-xs font-semibold text-brand-ink">
                            Click to browse or drag & drop resume
                          </span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            PDF, DOC, DOCX up to 5 MB
                          </span>
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                        </label>
                      ) : (
                        <div className="bg-brand-bg border border-brand-edge rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                            <div className="truncate">
                              <div className="text-xs font-bold text-brand-ink truncate">
                                {resumeFile.name}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setResumeFile(null)}
                            className="text-slate-400 hover:text-red-600 p-1 rounded-md transition-colors"
                            title="Remove file"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}

                      {resumeError && (
                        <p className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {resumeError}
                        </p>
                      )}
                    </div>

                    {/* Privacy Consent Checkbox */}
                    <div className="pt-2">
                      <label className="flex items-start gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          required
                          checked={agreedToPrivacy}
                          onChange={(e) => setAgreedToPrivacy(e.target.checked)}
                          className="w-4 h-4 rounded border-brand-edge text-brand-light focus:ring-brand-light mt-0.5"
                        />
                        <span className="text-xs text-slate-600 leading-snug">
                          I agree to the{' '}
                          <Link
                            to="/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-dark font-bold underline hover:text-brand-dark-2"
                          >
                            Privacy Policy
                          </Link>{' '}
                          and consent to Pinnacle Consultant processing my details for recruitment evaluation.
                        </span>
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn btn-primary mt-3 py-3.5 justify-center shadow-md active:scale-[0.98] transition-transform disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Submitting Application...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Application</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <p className="text-[11px] text-center text-slate-400 pt-1 flex items-center justify-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>Resumes are stored in private vaults and never shared publicly.</span>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
