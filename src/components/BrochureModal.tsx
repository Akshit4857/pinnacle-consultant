import React, { useEffect, useRef, useState } from 'react';
import { X, User, Mail, FileText, CheckCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onClose: () => void;
}

export default function BrochureModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    firstInputRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'corporate-deck',
          name,
          email,
          serviceInterest: 'Corporate Profile / Proposal Request',
          message: 'Requested the corporate profile deck from the website.',
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setSubmitted(true);
      } else {
        setError(data?.error || 'Unable to process your request right now. Please email info@pinnacleconsultant.co.in.');
      }
    } catch {
      setError('Network error — please email info@pinnacleconsultant.co.in to request the deck.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="brochure-modal-title"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md max-h-[85dvh] overflow-y-auto bg-brand-card rounded-[2rem] shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close corporate profile dialog"
          className="absolute top-3 right-3 z-10 min-h-11 min-w-11 flex items-center justify-center p-2 text-slate-400 hover:text-brand-ink transition-colors rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              <h3 id="brochure-modal-title" className="text-2xl font-medium text-brand-ink mb-2">
                Get Corporate Profile
              </h3>
              <p className="text-slate-500 mb-8 text-sm font-medium">
                Enter your professional details and our team will send the complete proposal to your inbox.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="brochure-name" className="sr-only">
                    Full name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="brochure-name"
                      ref={firstInputRef}
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-brand-edge rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-colors duration-150 font-medium text-brand-ink"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="brochure-email" className="sr-only">
                    Work email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      id="brochure-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-brand-edge rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-colors duration-150 font-medium text-brand-ink"
                      placeholder="e.g. john@company.com"
                    />
                  </div>
                </div>

                {error && (
                  <div role="alert" className="text-xs p-3 rounded-xl border border-red-200 bg-red-50 text-red-700 font-medium">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-brand-dark hover:bg-brand-light text-white hover:text-brand-ink font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-150 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FileText className="w-5 h-5" />
                      Request Proposal
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div role="status" className="text-center py-6">
              <div className="w-16 h-16 bg-brand-light text-brand-onaccent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-medium text-brand-ink mb-2">Request Received</h3>
              <p className="text-slate-500 mb-8 font-medium">
                Thank you, <span className="font-medium text-brand-ink">{name}</span>. Our team will email the
                corporate profile to you shortly.
              </p>
              <button
                onClick={onClose}
                className="inline-flex items-center justify-center min-h-11 font-medium text-brand-ink hover:text-brand-light transition-colors underline underline-offset-4"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
