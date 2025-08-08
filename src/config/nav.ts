
import {
  LayoutDashboard,
  MapPin,
  PlusCircle,
  Users,
  CandlestickChart,
  Settings,
  LogOut,
  Briefcase,
  ShieldCheck,
  DollarSign,
  ShieldAlert,
  Mail,
  HelpCircle,
  MessageSquare,
  FileText,
  KeyRound,
  BarChart2,
  Phone,
  PackagePlus,
  Building,
} from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import React from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
  badge?: string | number;
  isFooter?: boolean;
  isBottomSeparator?: boolean;
  items?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'My Addresses',
    href: '/my-addresses',
    icon: MapPin,
  },
  {
    title: 'Register New Address',
    href: '/register',
    icon: PlusCircle,
  },
  {
    title: 'Access Requests',
    href: '/access-requests',
    icon: Users,
    badge: 3,
  },
  {
    title: 'Address Marketplace',
    href: '/exchange',
    icon: CandlestickChart,
  },
   {
    title: 'Company Tools',
    href: '/company/tokenize-shares',
    icon: Building,
    isBottomSeparator: true,
  },
  {
    title: 'Settings',
    href: '#',
    icon: Settings,
    isFooter: true,
  },
];

export const adminNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'User Management',
    href: '/admin/user-management',
    icon: Users,
  },
  {
    title: 'B2B Clients',
    href: '/admin/b2b-clients',
    icon: Briefcase,
  },
  {
    title: 'Address Audit',
    href: '/admin/address-audit',
    icon: ShieldCheck,
  },
  {
    title: 'User Feedback',
    href: '/admin/feedback',
    icon: MessageSquare,
  },
  {
    title: 'Monetization',
    href: '/admin/monetization',
    icon: DollarSign,
  },
  {
    title: 'Incident Response',
    href: '/admin/incident-response',
    icon: ShieldAlert,
  },
  {
    title: 'USSD Gateway',
    href: '/admin/ussd-gateway',
    icon: Phone,
  },
  {
    title: 'Platform Settings',
    href: '/admin/platform-settings',
    icon: Settings,
    isFooter: true,
  },
  {
    title: 'Exit Portal',
    href: '/admin/login',
    icon: LogOut,
    isFooter: true,
    isBottomSeparator: true,
  },
];

export const businessNav: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/business/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'API Usage',
    href: '/business/api-usage',
    icon: BarChart2,
  },
  {
    title: 'API Keys',
    href: '/business/api-keys',
    icon: KeyRound,
  },
  {
    title: 'Billing',
    href: '/business/billing',
    icon: DollarSign,
  },
  {
    title: 'Documentation',
    href: '/docs',
    icon: FileText,
  },
];

export const companyNav: NavItem[] = [
   {
    title: 'My Company Addresses',
    href: '/my-addresses?type=company',
    icon: Briefcase,
  },
  {
    title: 'Tokenize Shares',
    href: '/company/tokenize-shares',
    icon: PackagePlus,
  },
   {
    title: 'User Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    isFooter: true,
    isBottomSeparator: true,
  },
];
