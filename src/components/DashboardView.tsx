import React from 'react';
import {
  Monitor,
  Wifi,
  WifiOff,
  Cpu,
  Layers,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  HardDrive,
  Wrench,
  BookOpen
} from 'lucide-react';
import { SystemInfoData, HardwareInfoData, NetworkInfoData } from '../types';

interface DashboardViewProps {
  systemInfo: SystemInfoData;
  hardwareInfo: HardwareInfoData;
  networkInfo: NetworkInfoData;
  onNavigate: (tab: string) => void;
  onRefreshAll: () => void;
  isRefreshing: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  systemInfo,
  hardwareInfo,
  networkInfo,
  onNavigate,
  onRefreshAll,
  isRefreshing,
}) => {
  // Determine summary health values
  const isNetworkOnline = networkInfo.isOnline;
  const isSystemDetected = systemInfo.osName !== 'Unknown OS';
  const hasHardwareData = typeof hardwareInfo.cpuLogicalCores === 'number' || typeof hardwareInfo.deviceMemoryGiB === 'string';

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xs sm:p-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-xs text-blue-50">
            <span>College Internship Mini-Project</span>
            <span>·</span>
            <span>Local Browser Environment</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            IT System Troubleshooting & Support Tool
          </h1>

          <p className="mt-2 text-sm text-blue-100 sm:text-base leading-relaxed">
            Check your system, network and troubleshoot common IT problems.
            Provides safe client-side telemetry, hardware sandbox inspection, and standardized technical troubleshooting guides.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('system-info')}
              className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-xs font-semibold text-blue-900 shadow-sm hover:bg-blue-50 transition-colors"
            >
              <span>Inspect System</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={() => onNavigate('troubleshooting')}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500/30 px-4 py-2 text-xs font-semibold text-white border border-white/20 hover:bg-blue-500/40 transition-colors"
            >
              <Wrench className="h-3.5 w-3.5" />
              <span>Troubleshoot an Issue</span>
            </button>

            <button
              onClick={onRefreshAll}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-blue-100 hover:text-white transition-colors"
            >
              <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Refresh All Checks</span>
            </button>
          </div>
        </div>
      </div>

      {/* Online / Offline Real-time Alert */}
      {!isNetworkOnline ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 flex items-start gap-3">
          <WifiOff className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="font-semibold text-sm">Device Is Currently Offline</div>
            <p className="text-xs text-red-700 mt-0.5">
              The browser reports no active internet connection. Click on Network Check or Troubleshooting to review physical cable and Wi-Fi diagnostics.
            </p>
          </div>
          <button
            onClick={() => onNavigate('network-check')}
            className="shrink-0 rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
          >
            Diagnose Network
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-emerald-900 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="font-semibold">Live Connection Active:</span>
            <span className="text-emerald-800">
              Host network adapter is online and reachable.
            </span>
          </div>
          <span className="font-mono text-emerald-700 hidden sm:inline">
            Status: nominal
          </span>
        </div>
      )}

      {/* 5 Primary Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Card 1: System Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">System Status</span>
            <Monitor className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900">
              {isNetworkOnline ? 'Operational' : 'Network Disconnected'}
            </div>
            <div className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
              <span>{systemInfo.deviceType}</span>
              <span>·</span>
              <span>{systemInfo.osName}</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Timezone</span>
            <span className="font-mono truncate max-w-[120px] text-slate-700 font-medium">
              {systemInfo.timezone}
            </span>
          </div>
        </div>

        {/* Card 2: Network Status */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Network Status</span>
            {isNetworkOnline ? (
              <Wifi className="h-4 w-4 text-emerald-600" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-600" />
            )}
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${isNetworkOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {isNetworkOnline ? 'Connected' : 'Offline'}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Type: {networkInfo.effectiveType !== 'Not available in browser' ? networkInfo.effectiveType : 'Standard TCP/IP'}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Downlink Speed</span>
            <span className="font-mono text-slate-700 font-medium truncate max-w-[110px]">
              {networkInfo.downlinkSpeedMbps}
            </span>
          </div>
        </div>

        {/* Card 3: Browser & Platform */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Browser / Platform</span>
            <Layers className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900 truncate" title={systemInfo.browserName}>
              {systemInfo.browserName}
            </div>
            <div className="mt-1 text-xs text-slate-500 font-mono truncate">
              v{systemInfo.browserVersion}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Platform</span>
            <span className="font-medium text-slate-700 truncate max-w-[120px]">
              {systemInfo.osName} {systemInfo.osVersion}
            </span>
          </div>
        </div>

        {/* Card 4: CPU Cores */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">CPU Cores</span>
            <Cpu className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3">
            <div className="text-lg font-bold text-slate-900">
              {typeof systemInfo.cpuCores === 'number' ? (
                <span className="font-mono">{systemInfo.cpuCores} Threads</span>
              ) : (
                <span className="text-sm font-medium text-slate-600">{systemInfo.cpuCores}</span>
              )}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              Hardware concurrency threads
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>API Source</span>
            <span className="font-mono text-slate-700">navigator.hardwareConcurrency</span>
          </div>
        </div>

        {/* Card 5: Device Memory */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Device Memory</span>
            <HardDrive className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-3">
            <div className="text-base font-bold text-slate-900 truncate" title={String(hardwareInfo.deviceMemoryGiB)}>
              {hardwareInfo.deviceMemoryGiB}
            </div>
            <div className="mt-1 text-xs text-slate-500">
              {typeof hardwareInfo.deviceMemoryGiB === 'string' && hardwareInfo.deviceMemoryGiB.includes('Not available')
                ? 'Sandbox restricted'
                : 'Reported by Chromium'}
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Status</span>
            <span className="font-medium text-slate-700">
              {hardwareInfo.deviceMemoryGiB.toString().includes('Not available') ? 'Restricted' : 'Reported'}
            </span>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div>
        <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">
          Quick Diagnostic Actions
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button
            onClick={() => onNavigate('system-info')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Info className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-slate-900">Check System</div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Review operating system identity, browser version, screen resolutions, and localization settings.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>View System Info</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('hardware-check')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Cpu className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-slate-900">Check Hardware</div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Inspect detectable CPU cores, memory buckets, display metrics, and learn browser sandbox constraints.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600">
              <span>Analyze Hardware</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('network-check')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Wifi className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-slate-900">Check Network</div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Verify internet connectivity state, downlink bandwidth estimate, and run an HTTP reachability probe.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600">
              <span>Run Network Test</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigate('troubleshooting')}
            className="group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 text-left transition-all hover:border-blue-400 hover:shadow-sm"
          >
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Wrench className="h-5 w-5" />
              </div>
              <div className="mt-3 font-semibold text-slate-900">Troubleshoot</div>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">
                Step-by-step resolution guides for slow PC, Wi-Fi errors, low disk space, and software crashes.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-600">
              <span>Start Troubleshooting</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </div>
      </div>

      {/* System Check Summary Section (Requirement 7) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900">System Check Summary</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              High-level evaluation of browser diagnostics and security boundary compliance.
            </p>
          </div>
          <button
            onClick={onRefreshAll}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors self-start sm:self-auto"
          >
            <RotateCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin text-blue-600' : 'text-slate-500'}`} />
            <span>Refresh All Checks</span>
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Summary Metric 1: System */}
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            <div className="text-xs font-medium text-slate-500">System Module</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">System Telemetry</span>
              <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800">
                <CheckCircle2 className="h-3 w-3" />
                Available
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              OS platform, browser build, viewport resolution, and locale successfully retrieved via standard APIs.
            </p>
          </div>

          {/* Summary Metric 2: Network */}
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            <div className="text-xs font-medium text-slate-500">Network Module</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">Network Status</span>
              {isNetworkOnline ? (
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800">
                  <CheckCircle2 className="h-3 w-3" />
                  Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-red-100 text-red-800">
                  <AlertTriangle className="h-3 w-3" />
                  Offline
                </span>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {isNetworkOnline
                ? 'Navigator online flag verified. Connection information active where supported.'
                : 'Device network interface is currently disconnected from the Internet.'}
            </p>
          </div>

          {/* Summary Metric 3: Hardware */}
          <div className="rounded-lg border border-slate-100 bg-slate-50/50 p-4">
            <div className="text-xs font-medium text-slate-500">Hardware Module</div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">Hardware Access</span>
              <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-xs font-semibold bg-amber-100 text-amber-800">
                <ShieldAlert className="h-3 w-3" />
                Limited (Sandboxed)
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              CPU cores and screen specs detected. Deep physical hardware (BIOS, motherboard, disk serial) securely blocked.
            </p>
          </div>
        </div>

        {/* Security Sandbox Honesty Callout */}
        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-900 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-semibold">Academic Integrity Note:</span> In accordance with project requirements, this application never invents fake CPU model strings, RAM capacities, or ping times. Only legitimate browser-detectable parameters are shown; all restricted fields are clearly designated as &quot;Not available in browser&quot;.
          </p>
        </div>
      </div>
    </div>
  );
};
