import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FolderTree, 
  MapPin, 
  BarChart3, 
  FileText, 
  CheckCircle, 
  Users, 
  Settings,
  Waves,
  Leaf
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from '@/components/ui/sidebar';

const navigationItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Projects',
    url: '/projects',
    icon: FolderTree,
  },
  {
    title: 'Sites',
    url: '/sites',
    icon: MapPin,
  },
  {
    title: 'Monitoring',
    url: '/monitoring',
    icon: BarChart3,
  },
  {
    title: 'Reports',
    url: '/reports',
    icon: FileText,
  },
  {
    title: 'Verification',
    url: '/verification',
    icon: CheckCircle,
  },
  {
    title: 'Users',
    url: '/users',
    icon: Users,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'bg-accent text-accent-foreground font-medium' : 'hover:bg-accent/50';

  return (
    <Sidebar className={state === 'collapsed' ? 'w-14' : 'w-64'} collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className={`flex items-center ${state === 'collapsed' ? 'justify-center' : 'space-x-2 px-4'} py-4`}>
          <div className="flex items-center space-x-1">
            <Waves className="h-6 w-6 text-primary" />
            <Leaf className="h-6 w-6 text-accent" />
          </div>
          {state !== 'collapsed' && (
            <div>
              <h2 className="text-lg font-semibold text-sidebar-foreground">Blue Carbon MRV</h2>
              <p className="text-xs text-sidebar-foreground/60">Marine Ecosystem Management</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={getNavClass}
                      title={state === 'collapsed' ? item.title : undefined}
                    >
                      <item.icon className={`h-4 w-4 ${state === 'collapsed' ? '' : 'mr-2'}`} />
                      {state !== 'collapsed' && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}