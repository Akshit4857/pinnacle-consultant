import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface Company {
  id: string;
  name: string;
  domain: string;
  tag: string;
  industry: string;
  scope?: string;
  badge?: string;
}

export const VERIFIED_COMPANIES: Company[] = [
  {
    id: 'hero',
    name: 'Hero MotoCorp',
    domain: 'heromotocorp.com',
    tag: 'Fortune-500 Automotive',
    industry: 'Automotive & EV',
    scope: 'EV Infra Deployment & Station Attendants',
    badge: 'Turnkey Rollout',
  },
  {
    id: 'exponent',
    name: 'Exponent Energy',
    domain: 'exponent.energy',
    tag: '15-Min Fast Charging',
    industry: 'Clean Mobility',
    scope: 'Technical On-Ground Staffing',
    badge: 'Rapid Deployment',
  },
  {
    id: 'sunmobility',
    name: 'Sun Mobility',
    domain: 'sunmobility.com',
    tag: 'Swapping Pioneer',
    industry: 'Battery Swapping Ecosystem',
    scope: 'Swapping Hub Shift Personnel & Ops',
    badge: 'Depot Operations',
  },
  {
    id: 'gentari',
    name: 'Gentari (Petronas)',
    domain: 'gentari.com',
    tag: 'Global Clean Energy',
    industry: 'Renewable Power',
    scope: 'Highway EV Corridor Backbone & AMC',
    badge: 'High Uptime SLA',
  },
  {
    id: 'gomechanic',
    name: 'GoMechanic',
    domain: 'gomechanic.in',
    tag: 'Auto Service Network',
    industry: 'Automobile Servicing',
    scope: 'EV Diagnostic Mechanics & Garage Triage',
    badge: 'Garage Triage',
  },
  {
    id: 'revfin',
    name: 'Revfin Services',
    domain: 'revfin.in',
    tag: 'EV Lending & Fleet Tech',
    industry: 'Mobility Fintech',
    scope: 'Telematics & Operations Field Force',
    badge: 'FTE Placement',
  },
];

/**
 * CompanyLogo Avatar with multi-tier API fallbacks
 * 1. unavatar.io
 * 2. google favicon v2
 * 3. initials monogram
 */
export function CompanyLogo({
  domain,
  name,
  size = 40,
  className = '',
}: {
  domain: string;
  name: string;
  size?: number;
  className?: string;
}) {
  const [imgSrcIndex, setImgSrcIndex] = useState(0);

  // Multi-tier API endpoints for official high-res logos
  const sources = [
    `https://unavatar.io/${domain}?fallback=false`,
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${domain}&size=128`,
  ];

  const handleImgError = () => {
    if (imgSrcIndex < sources.length - 1) {
      setImgSrcIndex((prev) => prev + 1);
    } else {
      setImgSrcIndex(-1); // Switch to monogram initials
    }
  };

  const getInitials = (text: string) => {
    return text
      .split(' ')
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div
      className={`relative shrink-0 rounded-xl bg-brand-card border border-brand-edge shadow-xs flex items-center justify-center overflow-hidden p-1.5 ${className}`}
      style={{ width: size, height: size }}
    >
      {imgSrcIndex >= 0 ? (
        <img
          src={sources[imgSrcIndex]}
          alt={`${name} Official Logo`}
          onError={handleImgError}
          className="w-full h-full object-contain filter group-hover:scale-105 transition-transform"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full rounded-lg bg-brand-dark text-brand-light font-bold text-xs flex items-center justify-center">
          {getInitials(name)}
        </div>
      )}
    </div>
  );
}

interface CompanyLogosProps {
  variant?: 'marquee' | 'grid' | 'strip';
  className?: string;
  showScopes?: boolean;
}

export default function CompanyLogos({
  variant = 'strip',
  className = '',
  showScopes = false,
}: CompanyLogosProps) {
  if (variant === 'marquee') {
    return (
      <div className={`w-full overflow-hidden py-4 marquee-mask ${className}`}>
        <div className="flex items-center gap-6 animate-marquee whitespace-nowrap">
          {[...VERIFIED_COMPANIES, ...VERIFIED_COMPANIES].map((company, idx) => (
            <div
              key={`${company.id}-${idx}`}
              className="inline-flex items-center gap-3 bg-brand-card border border-brand-edge hover:border-brand-dark/40 px-4 py-2.5 rounded-2xl shadow-xs transition-all shrink-0 group hover:shadow-md"
            >
              <CompanyLogo domain={company.domain} name={company.name} size={36} />
              <div className="text-left">
                <div className="text-xs font-bold text-brand-ink group-hover:text-emerald-800 transition-colors">
                  {company.name}
                </div>
                <div className="text-[10px] text-slate-500 font-medium">{company.tag}</div>
              </div>
              {company.badge && (
                <span className="ml-1 text-[9px] font-bold bg-brand-light/30 text-brand-ink px-2 py-0.5 rounded-full uppercase tracking-wider">
                  {company.badge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-4 ${className}`}>
        {VERIFIED_COMPANIES.map((company) => (
          <div
            key={company.id}
            className="bg-brand-bg border border-brand-edge hover:border-brand-dark p-5 rounded-2xl transition-all hover:shadow-md flex flex-col justify-between group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <CompanyLogo
                  domain={company.domain}
                  name={company.name}
                  size={46}
                  className="bg-brand-card p-2"
                />
                <div>
                  <h3 className="font-bold text-brand-ink text-base group-hover:text-emerald-800 transition-colors">
                    {company.name}
                  </h3>
                  <div className="text-[11px] text-slate-500 font-medium">{company.tag}</div>
                </div>
              </div>
              {company.badge && (
                <span className="text-[10px] font-bold bg-brand-light/40 text-brand-ink px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0">
                  {company.badge}
                </span>
              )}
            </div>

            {company.scope && (
              <div className="pt-3 border-t border-brand-edge text-xs font-medium text-brand-muted flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{company.scope}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default: 'strip'
  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full ${className}`}>
      {VERIFIED_COMPANIES.map((company) => (
        <div
          key={company.id}
          className="bg-brand-card border border-brand-edge rounded-2xl p-3 flex items-center gap-3 hover:border-brand-dark/40 hover:shadow-md transition-all group"
        >
          <CompanyLogo
            domain={company.domain}
            name={company.name}
            size={38}
            className="bg-brand-bg border-brand-edge p-1.5"
          />
          <div className="min-w-0 flex-1 text-left">
            <div className="text-xs font-bold text-brand-ink truncate group-hover:text-emerald-800 transition-colors">
              {company.name}
            </div>
            <div className="text-[10px] text-emerald-800 font-medium truncate">
              {company.tag}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
