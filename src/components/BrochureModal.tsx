import React, { useState } from 'react';
import { X, User, Mail, Download, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Props {
  onClose: () => void;
}

export default function BrochureModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      // In a real app, trigger PDF download here
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
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-md max-h-[85dvh] overflow-y-auto bg-brand-card rounded-[2rem] shadow-2xl"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 min-h-11 min-w-11 flex items-center justify-center p-2 text-slate-400 hover:text-brand-ink transition-colors rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {!submitted ? (
            <>
              <h3 className="text-2xl font-medium text-brand-ink mb-2">Get Corporate Profile</h3>
              <p className="text-slate-500 mb-8 text-sm font-medium">
                Enter your professional details to download our complete proposal.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-brand-edge rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-all font-medium text-brand-ink"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 pr-3 py-3 border border-brand-edge rounded-xl focus:ring-2 focus:ring-brand-light focus:border-brand-light outline-none transition-all font-medium text-brand-ink"
                      placeholder="e.g. john@company.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-brand-dark hover:bg-brand-light text-white hover:text-brand-ink font-medium py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-brand-light text-brand-onaccent rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-medium text-brand-ink mb-2">Lead Confirmed!</h3>
              <p className="text-slate-500 mb-8 font-medium">
                Thank you, <span className="font-medium text-brand-ink">{name}</span>. Your download has started automatically.
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
