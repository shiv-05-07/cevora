import { 
  LayoutDashboard, 
  Building2, 
  Map, 
  FileText, 
  Code, 
  Video, 
  Bot, 
  BarChart3, 
  Settings,
  Home,
  Star,
  Zap,
  Users,
  Compass,
  Info,
  BookOpen
} from 'lucide-react';

export const LANDING_NAVIGATION = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Features', href: '#features', icon: Star },
  { label: 'Solutions', href: '#solutions', icon: Zap },
  { label: 'Faculty', href: '#faculty', icon: Users },
  { label: 'Roadmap', href: '#roadmap', icon: Compass },
  { label: 'About', href: '#about', icon: Info },
];

export const MAIN_NAVIGATION = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Companies', href: '/companies', icon: Building2 },
  { label: 'Roadmaps', href: '/roadmaps', icon: Map },
  { label: 'Resume Analyzer', href: '/resume', icon: FileText },
  { label: 'OA Practice', href: '/oa-practice', icon: Code },
  { label: 'Study Assistant', href: '/study-assistant', icon: BookOpen },
  { label: 'AI Interview', href: '/interview', icon: Video },
  { label: 'AI Mentor', href: '/mentor', icon: Bot },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export const WORKSPACE_NAVIGATION = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Companies', href: '/companies', icon: Building2 },
  { label: 'Roadmaps', href: '/roadmaps', icon: Map },
  { label: 'Resume Analyzer', href: '/resume', icon: FileText },
  { label: 'OA Practice', href: '/oa-practice', icon: Code },
  { label: 'Study Assistant', href: '/study-assistant', icon: BookOpen },
  { label: 'AI Interview', href: '/interview', icon: Video },
  { label: 'AI Mentor', href: '/mentor', icon: Bot },
  { label: 'Analytics', href: '/analytics', icon: BarChart3 },
  { label: 'Settings', href: '/settings', icon: Settings },
];
