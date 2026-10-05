import React from 'react';
import { 
  Wifi, 
  WifiOff, 
  RotateCw, 
  FileText, 
  Monitor, 
  ShieldCheck,
  Menu
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  isOnline: boolean;
  onRefreshAll: () => void;
  onOpenReport: () => void;
  onToggleMobileMenu: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  isOnline,
  onRefreshAll,
  onOpenReport,
  onToggleMobileMenu,
  isRefreshing = false,
}) => {
  const getTabLabel = (id: string) => {
    switch (id) {
      case 'dashboard': return 'Dashboard Overview';
      case 'system-info': return 'System Information';
      case 'hardware-check': return 'Hardware Check & Sandbox Analysis';
      case 'network-check': return 'Network Check & Connectivity';
      case 'troubleshooting': return 'IT Problem Troubleshooting';
      case 'support-guide': return 'IT Support Knowledge Guide';
      case 'about': return 'About Mini-Project';
      default: return 'System Support Tool';
    }
  };

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      {/* Left zone: Mobile toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileMenu}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-slate-800 flex items-center gap-1.5">
            <Monitor className="h-4 w-4 text-blue-600 inline" />
            <span className="hidden sm:inline">IT Support Tool</span>
          </span>
          <span className="text-slate-400">/</span>
          <span className="font-medium text-slate-600 truncate max-w-[180px] sm:max-w-xs md:max-w-md">
            {getTabLabel(activeTab)}
          </span>
        </div>
      </div>

      {/* Right zone: Live Status, Refresh, and Export Report */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Real-time online/offline status badge */}
        <div
          className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${
            isOnline
              ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
              : 'border-red-200 bg-red-50 text-red-800'
          }`}
          title={isOnline ? 'Network adapter reports online' : 'Network adapter reports offline'}
        >
          {isOnline ? (
            <>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="hidden xs:inline">System:</span>
              <span className="font-semibold">Online</span>
            </>
          ) : (
            <>
              <span className="h-2 w-2 rounded-full bg-red-500"></span>
              <span className="hidden xs:inline">System:</span>
              <span className="font-semibold">Offline</span>
            </>
          )}
        </div>

        {/* Refresh All button */}
        <button
          onClick={onRefreshAll}
          disabled={isRefreshing}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
          title="Refresh all browser system and network checks"
        >
          <RotateCw className={`h-3.5 w-3.5 text-slate-500 ${isRefreshing ? 'animate-spin text-blue-600' : ''}`} />
          <span className="hidden sm:inline">Refresh All</span>
        </button>

        {/* Generate Diagnostic Report */}
        <button
          onClick={onOpenReport}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
          title="View and export complete IT diagnostic summary"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Diagnostic Report</span>
        </button>
      </div>
    </header>
  );
};
