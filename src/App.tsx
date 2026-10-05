/**
 * IT System Troubleshooting & Support Tool
 * College Internship Mini-Project
 *
 * Designed to provide:
 * 1. Safe, client-side system information querying
 * 2. Authentic hardware metric inspection and sandbox security analysis
 * 3. Real-time network interface monitoring & HTTP reachability probe
 * 4. Interactive troubleshooting trees for common IT issues
 * 5. Educational IT Support Knowledge Guide
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { SystemInfoView } from './components/SystemInfoView';
import { HardwareCheckView } from './components/HardwareCheckView';
import { NetworkCheckView } from './components/NetworkCheckView';
import { TroubleshootingView } from './components/TroubleshootingView';
import { SupportGuideView } from './components/SupportGuideView';
import { AboutProjectView } from './components/AboutProjectView';
import { ReportModal } from './components/ReportModal';
import {
  getSystemInformation,
  getHardwareInformation,
  getNetworkInformation,
} from './utils/systemDetection';
import { SystemInfoData, HardwareInfoData, NetworkInfoData } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // System, Hardware, and Network state initialized with live browser values
  const [systemInfo, setSystemInfo] = useState<SystemInfoData>(() => getSystemInformation());
  const [hardwareInfo, setHardwareInfo] = useState<HardwareInfoData>({
    cpuLogicalCores: navigator.hardwareConcurrency || 'Not available in browser',
    cpuArchitecture: 'Not exposed by browser API (sandbox protection)',
    deviceMemoryGiB: 'Detecting...',
    screenResolution: `${window.screen.width} × ${window.screen.height} px`,
    devicePixelRatio: window.devicePixelRatio || 1,
    touchSupport: (navigator.maxTouchPoints || 0) > 0,
    maxTouchPoints: navigator.maxTouchPoints || 0,
    batterySupported: false,
    platform: navigator.platform || 'Client Host',
  });
  const [networkInfo, setNetworkInfo] = useState<NetworkInfoData>(() => getNetworkInformation());

  // Refresh all state from browser APIs
  const refreshAllData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const sys = getSystemInformation();
      const hw = await getHardwareInformation();
      const net = getNetworkInformation();

      setSystemInfo(sys);
      setHardwareInfo(hw);
      setNetworkInfo(net);
    } catch (err) {
      console.error('Error refreshing system data:', err);
    } finally {
      setTimeout(() => setIsRefreshing(false), 400);
    }
  }, []);

  // Initial load: fetch asynchronous hardware info (like battery if available)
  useEffect(() => {
    refreshAllData();
  }, [refreshAllData]);

  // Real-time network online/offline listeners
  useEffect(() => {
    const handleOnline = () => {
      setNetworkInfo(getNetworkInformation());
      setSystemInfo((prev) => ({ ...prev, isOnline: true }));
    };

    const handleOffline = () => {
      setNetworkInfo(getNetworkInformation());
      setSystemInfo((prev) => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Also update on window resize (e.g. user rotates device or resizes browser window)
    const handleResize = () => {
      setSystemInfo((prev) => ({
        ...prev,
        viewportSize: `${window.innerWidth} × ${window.innerHeight} px`,
        screenResolution: `${window.screen.width} × ${window.screen.height} px`,
        availableScreenResolution: `${window.screen.availWidth} × ${window.screen.availHeight} px`,
        devicePixelRatio: window.devicePixelRatio || 1,
      }));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Plus_Jakarta_Sans',sans-serif] text-slate-800">
      {/* Desktop & Mobile Responsive Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        <Header
          activeTab={activeTab}
          isOnline={networkInfo.isOnline}
          onRefreshAll={refreshAllData}
          onOpenReport={() => setIsReportModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isRefreshing={isRefreshing}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <DashboardView
              systemInfo={systemInfo}
              hardwareInfo={hardwareInfo}
              networkInfo={networkInfo}
              onNavigate={setActiveTab}
              onRefreshAll={refreshAllData}
              isRefreshing={isRefreshing}
            />
          )}

          {activeTab === 'system-info' && (
            <SystemInfoView
              systemInfo={systemInfo}
              onRefresh={refreshAllData}
              isRefreshing={isRefreshing}
            />
          )}

          {activeTab === 'hardware-check' && (
            <HardwareCheckView hardwareInfo={hardwareInfo} />
          )}

          {activeTab === 'network-check' && (
            <NetworkCheckView
              networkInfo={networkInfo}
              onRefresh={refreshAllData}
              onNavigateToTroubleshooting={() => setActiveTab('troubleshooting')}
            />
          )}

          {activeTab === 'troubleshooting' && <TroubleshootingView />}

          {activeTab === 'support-guide' && <SupportGuideView />}

          {activeTab === 'about' && <AboutProjectView />}
        </main>

        {/* Minimal, Professional Tech Footer */}
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-xs text-slate-500">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-slate-700">
                IT System Troubleshooting &amp; Support Tool
              </span>{' '}
              · College Internship Mini-Project
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <span>Client-side execution</span>
              <span>·</span>
              <span>W3C Standard APIs</span>
              <span>·</span>
              <span>Zero Mock Data</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Diagnostic Ticket Report Modal */}
      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        systemInfo={systemInfo}
        hardwareInfo={hardwareInfo}
        networkInfo={networkInfo}
      />
    </div>
  );
}
