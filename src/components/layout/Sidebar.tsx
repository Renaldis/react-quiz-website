import { useAuthStore } from '@/store/authStore';
import {
  Gamepad2,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  Trophy,
  UserCircle,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: 'Quiz & Categories',
    path: '/dashboard/quizz',
    icon: Gamepad2,
    // end: false (default), akan aktif juga di /dashboard/quizz/123
  },
  {
    name: 'History',
    path: '/dashboard/history',
    icon: History,
  },
  {
    name: 'Leaderboard',
    path: '/dashboard/leaderboard',
    icon: Trophy,
  },
  {
    name: 'Settings',
    path: '/dashboard/settings',
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="flex flex-col h-screen w-64 bg-[#020817] border-r border-slate-800 text-slate-100 shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <h1 className="text-xl font-bold tracking-tight">
          Quizz<span className="text-blue-500">ly</span>
        </h1>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {sidebarLinks.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800',
                )
              }
            >
              <Icon size={20} strokeWidth={1.5} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="bg-slate-800 p-2 rounded-full">
            <UserCircle className="text-slate-400" size={24} />
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium truncate text-white">
              {user?.name || 'Guest User'}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 border-slate-700 text-slate-300 hover:text-white hover:bg-red-900/20 hover:border-red-800 transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={16} />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
