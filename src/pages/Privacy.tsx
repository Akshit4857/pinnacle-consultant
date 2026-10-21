import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, ArrowUpRight } from 'lucide-react';
import FloatingOrb from '../components/motion/FloatingOrb';

export default function Privacy() {
  return (
    <div className="w-full bg-brand-bg min-h-screen">
      {/* Hero Header */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-brand-dark bg-grid-dark text-white relative overflow-hidden">
        <FloatingOrb className="-top-40 -left-40" size={500} delay={0} />
        <FloatingOrb className="bottom-0 right-0" size={350} colorClass="bg-brand-light/10" delay={1.5} />

        <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-4xl">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-brand-light transition-colors duration-150 active:scale-[0.96] mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Careers
          </Link>

          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-1.5 text-brand-light text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
            <ShieldCheck className="w-4 h-4 text-brand-light" />
            Candidate &amp; Client Data Privacy
          </span>

          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4 leading-tight">
            Privacy Policy &amp; <span className="text-brand-light">Applicant Data Protection</span>
          </h1>

          <p className="text-slate-300 text-sm md:text-base leading-relaxed text-pretty">
            <span className="tabular-nums">Effective Date: January 1, 2025 · Last Updated: October 2026.</span>{' '}
            At Pinnacle Consultant, we are committed to safeguarding the personal information and confidentiality
            of job applicants, corporate clients, and platform visitors.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="bg-brand-card rounded-3xl border border-brand-edge p-6 sm:p-10 md:p-12 shadow-sm space-y-10 text-brand-ink">
            {/* Candidate Information Scope */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light/15 text-brand-dark flex items-center justify-center font-bold text-sm tabular-nums">
                  1
                </div>
                <h2 className="text-xl font-bold text-brand-ink">Information We Collect From Candidates</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-11 mb-3 text-pretty">
                When you apply for a position via our Careers portal, we collect only the necessary data needed to evaluate your application:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-11 text-pretty">
                <li>Full Name, Email Address, and Contact / WhatsApp Number.</li>
                <li>Current City, Years of Professional Experience, and Portfolio/LinkedIn URL.</li>
                <li>Curriculum Vitae / Resume file (PDF, DOC, DOCX format).</li>
                <li>Cover message and job-specific qualifications submitted through the form.</li>
                <li>Technical telemetry strictly for anti-abuse and rate limiting (masked IP address, timestamp).</li>
              </ul>
            </div>

            {/* Purpose & Usage */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light/15 text-brand-dark flex items-center justify-center font-bold text-sm tabular-nums">
                  2
                </div>
                <h2 className="text-xl font-bold text-brand-ink">How Your Data Is Used</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-11 mb-3 text-pretty">
                Your submitted details and resume are strictly utilized for legitimate recruitment and employment evaluation purposes:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-11 text-pretty">
                <li>Assessing your skills and background against open roles at Pinnacle Consultant or our contracted enterprise clients.</li>
                <li>Communicating with you regarding interview scheduling, status updates, or profile clarifications.</li>
                <li>We <strong className="text-brand-ink font-semibold">NEVER</strong> sell, rent, commercialize, or trade applicant personal data with third-party advertisers or lead brokers.</li>
              </ul>
            </div>

            {/* Security Standards */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light/15 text-brand-dark flex items-center justify-center font-bold text-sm tabular-nums">
                  3
                </div>
                <h2 className="text-xl font-bold text-brand-ink">Storage &amp; Security Standards</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-11 mb-3 text-pretty">
                We employ enterprise-grade security practices to protect your data in transit and at rest:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-slate-600 pl-11 text-pretty">
                <li>All submissions are encrypted in transit via standard TLS / HTTPS encryption.</li>
                <li>Candidate resumes are stored in private, restricted-access Google Drive vaults accessible only by authorized talent acquisition leads. Resumes are never shared publicly or indexed by search engines.</li>
                <li>Application records are maintained within encrypted, access-controlled databases with strict role-based authentication.</li>
              </ul>
            </div>

            {/* Data Deletion Rights */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-light/15 text-brand-dark flex items-center justify-center font-bold text-sm tabular-nums">
                  4
                </div>
                <h2 className="text-xl font-bold text-brand-ink">Data Retention &amp; Your Deletion Rights</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed pl-11 mb-3 text-pretty">
                We retain candidate records for up to 12 months for active consideration across upcoming mandates, unless requested otherwise.
                You have the legal right to request inspection, modification, or complete deletion of your resume and applicant data at any time.
              </p>
              <div className="bg-brand-bg rounded-2xl p-5 ml-11 border border-brand-edge flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="font-bold text-xs uppercase tracking-wider text-slate-500">GDPR / Data Deletion Requests</div>
                  <div className="text-sm font-semibold text-brand-ink mt-0.5">Email our Privacy Officer directly</div>
                </div>
                <a
                  href="mailto:info@pinnacleconsultant.co.in?subject=Data%20Deletion%20Request"
                  className="btn btn-primary text-xs shrink-0 py-2.5 pl-4 pr-3.5 inline-flex items-center gap-1.5 active:scale-[0.96]"
                >
                  <span>Request Data Removal</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Contact Information */}
            <div className="border-t border-brand-edge pt-8">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Contact Pinnacle Consultant</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pinnacle Consultant, Gurugram, Haryana, India · Email:{' '}
                <a href="mailto:info@pinnacleconsultant.co.in" className="text-brand-dark font-semibold underline">
                  info@pinnacleconsultant.co.in
                </a>{' '}
                · Phone: +91-7000081129.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
