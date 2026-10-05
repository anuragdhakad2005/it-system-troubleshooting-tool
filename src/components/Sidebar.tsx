import React from 'react';
import {
  LayoutDashboard,
  Info,
  Cpu,
  Wifi,
  Wrench,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  X,
  Sparkles
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: 'Home' },
    { id: 'system-info', label: 'System Information', icon: Info, count: 'OS/Browser' },
    { id: 'hardware-check', label: 'Hardware Check', icon: Cpu, badge: 'Specs' },
    { id: 'network-check', label: 'Network Check', icon: Wifi, badge: 'Live' },
    { id: 'troubleshooting', label: 'Troubleshooting', icon: Wrench, count: '6 Topics' },
    { id: 'support-guide', label: 'IT Support Guide', icon: BookOpen, count: '6 Guides' },
    { id: 'about', label: 'About Project', icon: HelpCircle, badge: 'Internship' },
  ];

  const handleSelectTab = (id: string) => {
    setActiveTab(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand lockup */}
        <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shadow-xs">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-slate-900">
                IT Support Tool
              </div>
              <div className="text-[11px] font-medium text-slate-500">
                System Diagnostics v1.2
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation items */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Diagnostics & Support
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`group flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${
                        isActive
                          ? 'bg-blue-200/60 text-blue-800'
                          : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.count && (
                    <span className="text-[10px] text-slate-400 font-normal">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* College Mini-Project Notice Card */}
          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>College Internship Project</span>
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-blue-700/90">
              Practical demonstration utility for IT Infrastructure, Network diagnostics, and Hardware sandbox security boundaries.
            </p>
            <div className="mt-2 text-[10px] font-mono text-blue-800">
              Zero Mock Data · 100% Real Browser APIs
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Client Environment</span>
            <span className="font-mono text-emerald-600 font-medium">Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
