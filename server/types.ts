export type JobType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type WorkMode = 'On-site' | 'Remote' | 'Hybrid';
export type JobStatus = 'Active' | 'Inactive';

export interface Job {
  slug: string;
  title: string;
  department: string;
  location: string;
  jobType: JobType;
  workMode: WorkMode;
  experience: string;
  salaryRange?: string;
  openings: number;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string; // ISO date string or formatted date
  lastDateToApply?: string;
  status: JobStatus;
}

export interface ApplicationSubmission {
  jobSlug: string;
  fullName: string;
  email: string;
  phone: string;
  city?: string;
  experienceYears?: string;
  portfolioUrl?: string;
  coverNote?: string;
  agreedToPrivacy: boolean;
  honeypot?: string;
  formLoadTimestamp?: number;
  turnstileToken?: string;
}

export interface StoredApplication {
  timestamp: string;
  jobTitle: string;
  jobSlug: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  experience: string;
  portfolioUrl: string;
  message: string;
  resumeLink: string;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Rejected';
  whatsAppNotified: 'Yes' | 'No';
}
