
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Bell,
  UserCircle,
  LogOut,
  Wallet,
  Settings,
  ArrowLeft,
  HelpCircle,
  ChevronDown,
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
import { Separator } from '@/components/ui/separator';
import { adminNav, mainNav, type NavItem } from '@/config/nav';

interface AppLayoutProps {
  children: React.ReactNode;
  nav?: 'main' | 'admin';
}

export function AppLayout({ children, nav = 'main' }: AppLayoutProps) {
  const pathname = usePathname();
  const [userName, setUserName] = useState('stephen mwang');
  const [userInitial, setUserInitial] = useState('SM');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedName = localStorage.getItem('loggedInUserName');
      if (storedName) {
        setUserName(storedName);
        setUserInitial(storedName.split(' ').map(n => n[0]).join(''));
      }
    }
  }, []);


  const navItems = nav === 'admin' ? adminNav : mainNav;
  const isUserAdmin = nav === 'admin';

  const user = isUserAdmin
    ? { name: 'Nicholas C.', email: 'nicholas@digitaladdress.com', fallback: 'NC' }
    : { name: userName, email: `${userName.toLowerCase().replace(/\s/g, '.')}@digitaladdress.com`, fallback: userInitial };

  const getPageTitle = () => {
    for (const section of navItems) {
      if (section.href === pathname) return section.title;
      if (section.items) {
        for (const item of section.items) {
          if (item.href === pathname) return item.title;
        }
      }
    }
    const pathParts = pathname.split('/').filter(Boolean);
    const lastPart = pathParts[pathParts.length - 1];
    return lastPart ? lastPart.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Dashboard';
  };
  
  const pageTitle = getPageTitle();
  const isDashboard = pathname.endsWith('/dashboard');


  const renderNavItems = (items: NavItem[]) => (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.href}>
            <Link href={item.href}>
              <SidebarMenuButton isActive={pathname === item.href}>
                <Icon />
                {item.title}
                {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
          <SidebarHeader>
            <Link href={isUserAdmin ? '/admin/dashboard' : '/dashboard'} className="flex items-center gap-2 p-2">
              <Logo className="w-8 h-8 text-primary" />
              <h1 className="text-xl font-headline font-semibold">
                {isUserAdmin ? 'Admin Portal' : 'Digital Address'}
              </h1>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {renderNavItems(navItems.filter(item => !item.isFooter && !item.isBottomSeparator))}
          </SidebarContent>
          <SidebarFooter>
            {navItems.some(item => item.isBottomSeparator) && <Separator className="my-1" />}
            {renderNavItems(navItems.filter(item => item.isFooter))}
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              {!isDashboard && isUserAdmin && (
                <Link href="/admin/dashboard">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        <ArrowLeft className="h-4 w-4" />
                        <span className="sr-only">Back to Dashboard</span>
                    </Button>
                </Link>
              )}
              <h1 className="text-2xl font-headline font-semibold">
                {pageTitle}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-auto rounded-md px-2 py-1 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://placehold.co/100x100.png" alt="User avatar" data-ai-hint="person avatar"/>
                      <AvatarFallback>{user.fallback}</AvatarFallback>
                    </Avatar>
                     <span className="hidden md:inline-block">{user.name}</span>
                    <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:inline-block"/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <UserCircle className="mr-2 h-4 w-4" />
                      <span>{isUserAdmin ? 'Admin Profile' : 'Profile'}</span>
                    </DropdownMenuItem>
                    {!isUserAdmin && (
                      <DropdownMenuItem>
                        <Wallet className="mr-2 h-4 w-4" />
                        <span>Wallet</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <Link href="/support">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          <span>Support & Feedback</span>
                        </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
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
