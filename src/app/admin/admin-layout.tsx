
'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sidebar,
  SidebarProvider,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Users,
  Settings,
  Bell,
  UserCircle,
  LogOut,
  DollarSign,
  ShieldCheck,
  Briefcase,
  ArrowLeft,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { Logo } from '@/components/icons';

type AdminLayoutProps = {
    children: React.ReactNode;
    active: 'dashboard' | 'audit' | 'users' | 'clients' | 'monetization';
}

export function AdminLayout({ children, active }: AdminLayoutProps) {
  const pageTitle = {
    dashboard: 'Dashboard',
    audit: 'Address Audit',
    users: 'User Management',
    clients: 'B2B Clients',
    monetization: 'Monetization'
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href="/admin/dashboard" className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">Admin Portal</h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                 <Link href="/admin/dashboard">
                    <SidebarMenuButton isActive={active === 'dashboard'}>
                        <LayoutDashboard />
                        Dashboard
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <SidebarMenuButton href="#" disabled>
                  <Users />
                  User Management
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/admin/b2b-clients">
                  <SidebarMenuButton isActive={active === 'clients'}>
                    <Briefcase />
                    B2B Clients
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/admin/address-audit">
                    <SidebarMenuButton isActive={active === 'audit'}>
                    <ShieldCheck />
                    Address Audit
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                 <Link href="/admin/monetization">
                    <SidebarMenuButton isActive={active === 'monetization'}>
                        <DollarSign />
                        Monetization
                    </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="#">
                  <Settings />
                  Platform Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              {active !== 'dashboard' && (
                <Link href="/admin/dashboard">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Button>
                </Link>
              )}
              <h1 className="text-2xl font-headline font-semibold capitalize">
                {pageTitle[active]}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="https://placehold.co/100x100.png" alt="Admin avatar" data-ai-hint="person avatar"/>
                      <AvatarFallback>SA</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Nicholas C.</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        nicholas@digitaladdress.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
