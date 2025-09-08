export type AccountType = 'individual' | 'company';

// A conservative list of common public email providers. Not exhaustive, but good enough for client-side heuristics.
const PUBLIC_EMAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'yahoo.com',
  'yahoo.co.uk',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'msn.com',
  'icloud.com',
  'me.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
  'gmx.com',
  'yandex.com',
  'zoho.com',
  'mail.com',
  'pm.me',
  'hey.com'
]);

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  '10minutemail.com',
  'tempmail.com',
  'guerrillamail.com',
  'trashmail.com',
  'yopmail.com'
]);

export function getDomainFromEmail(email: string): string | null {
  const match = email.toLowerCase().trim().match(/^[^@]+@([^@]+)$/);
  return match ? match[1] : null;
}

export function isPublicEmailDomain(domain: string): boolean {
  return PUBLIC_EMAIL_DOMAINS.has(domain) || DISPOSABLE_EMAIL_DOMAINS.has(domain);
}

export function isCorporateDomain(domain: string): boolean {
  if (!domain) return false;
  if (isPublicEmailDomain(domain)) return false;
  // Basic heuristic: exclude very short TLD-only domains or single-labels
  // and treat anything not in our public/disposable list as corporate.
  return domain.includes('.') && domain.split('.').length >= 2;
}

export function inferAccountTypeFromEmail(email: string): AccountType {
  const domain = getDomainFromEmail(email || '');
  if (!domain) return 'individual';
  return isCorporateDomain(domain) ? 'company' : 'individual';
}
