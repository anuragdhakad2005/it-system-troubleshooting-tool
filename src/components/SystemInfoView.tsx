import React from 'react';
import {
  RotateCw,
  Monitor,
  Globe,
  Clock,
  Laptop,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  ShieldCheck,
  Maximize2,
  Eye,
  Info
} from 'lucide-react';
import { SystemInfoData } from '../types';

interface SystemInfoViewProps {
  systemInfo: SystemInfoData;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const SystemInfoView: React.FC<SystemInfoViewProps> = ({
  systemInfo,
  onRefresh,
  isRefreshing,
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const infoRows = [
    {
      label: 'Operating System',
      value: `${systemInfo.osName} (${systemInfo.osVersion})`,
      api: 'navigator.userAgent / userAgentData',
      category: 'OS Environment',
    },
    {
      label: 'Browser Name',
      value: systemInfo.browserName,
      api: 'navigator.userAgent parsing',
      category: 'Browser Environment',
    },
    {
      label: 'Browser Version',
      value: systemInfo.browserVersion,
      api: 'navigator.userAgent regex',
      category: 'Browser Environment',
    },
    {
      label: 'Primary Language',
      value: systemInfo.browserLanguage,
      api: 'navigator.language',
      category: 'Localization',
    },
    {
      label: 'Preferred Languages',
      value: systemInfo.preferredLanguages.join(', '),
      api: 'navigator.languages',
      category: 'Localization',
    },
    {
      label: 'Screen Resolution',
      value: systemInfo.screenResolution,
      api: 'window.screen.width × height',
      category: 'Display',
    },
    {
      label: 'Available Workspace Resolution',
      value: systemInfo.availableScreenResolution,
      api: 'window.screen.availWidth × availHeight',
      category: 'Display',
      description: 'Screen area minus OS taskbar, dock, or menu bars',
    },
    {
      label: 'Current Viewport Size',
      value: systemInfo.viewportSize,
      api: 'window.innerWidth × innerHeight',
      category: 'Display',
      description: 'Active browser inner frame rendering area',
    },
    {
      label: 'Display Pixel Ratio',
      value: `${systemInfo.devicePixelRatio}x (HiDPI / Retina scale)`,
      api: 'window.devicePixelRatio',
      category: 'Display',
    },
    {
      label: 'Color Depth',
      value: systemInfo.colorDepth,
      api: 'window.screen.colorDepth',
      category: 'Display',
    },
    {
      label: 'Detected Device Type',
      value: systemInfo.deviceType,
      api: 'Touch points & screen heuristics',
      category: 'Hardware Category',
    },
    {
      label: 'CPU Logical Cores (Concurrency)',
      value: typeof systemInfo.cpuCores === 'number' ? `${systemInfo.cpuCores} Cores / Threads` : systemInfo.cpuCores,
      api: 'navigator.hardwareConcurrency',
      category: 'Processor',
    },
    {
      label: 'Network Connectivity Status',
      value: systemInfo.isOnline ? 'Online (Connected)' : 'Offline (Disconnected)',
      isBadge: true,
      badgePositive: systemInfo.isOnline,
      api: 'navigator.onLine',
      category: 'Network State',
    },
    {
      label: 'System Timezone',
      value: systemInfo.timezone,
      api: 'Intl.DateTimeFormat().resolvedOptions().timeZone',
      category: 'Localization',
    },
    {
      label: 'Cookies Enabled in Browser',
      value: systemInfo.cookiesEnabled ? 'Yes (Enabled)' : 'No (Blocked)',
      isBadge: true,
      badgePositive: systemInfo.cookiesEnabled,
      api: 'navigator.cookieEnabled',
      category: 'Browser Security',
    },
    {
      label: 'Built-in PDF Viewer Available',
      value: systemInfo.pdfViewerSupported ? 'Supported' : 'Not reported by browser',
      isBadge: true,
      badgePositive: systemInfo.pdfViewerSupported,
      api: 'navigator.pdfViewerEnabled',
      category: 'Browser Capability',
    },
    {
      label: 'Report Timestamp',
      value: systemInfo.timestamp,
      api: 'new Date().toLocaleString()',
      category: 'Telemetry',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">System Information</h1>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
              Live APIs
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl">
            Displays operating system, browser engine, display dimensions, and localization attributes safely queryable through W3C standard JavaScript APIs.
          </p>
        </div>

        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors disabled:opacity-50 self-start sm:self-auto"
        >
          <RotateCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Information</span>
        </button>
      </div>

      {/* Structured Information Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50/75 px-6 py-3.5 flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Detected Parameter
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600 hidden sm:block">
            Browser API Source
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {infoRows.map((row, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 py-3.5 text-xs hover:bg-slate-50/50 transition-colors"
            >
              <div className="sm:w-1/3 pr-4">
                <div className="font-semibold text-slate-900">{row.label}</div>
                {row.description && (
                  <div className="text-[11px] text-slate-400 mt-0.5">{row.description}</div>
                )}
                <div className="text-[11px] font-mono text-blue-600 sm:hidden mt-0.5">
                  {row.api}
                </div>
              </div>

              <div className="sm:w-1/3 my-1.5 sm:my-0">
                {row.isBadge ? (
                  <span
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${
                      row.badgePositive
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {row.badgePositive ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      <XCircle className="h-3 w-3" />
                    )}
                    {String(row.value)}
                  </span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-800 font-mono">
                      {String(row.value)}
                    </span>
                    <button
                      onClick={() => copyToClipboard(String(row.value), row.label)}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                      title="Copy value"
                    >
                      {copiedKey === row.label ? (
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="sm:w-1/3 text-right hidden sm:block">
                <span className="font-mono text-[11px] text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  {row.api}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Raw User Agent Inspection Box */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Raw User Agent String (navigator.userAgent)
          </div>
          <button
            onClick={() => copyToClipboard(systemInfo.rawUserAgent, 'ua')}
            className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {copiedKey === 'ua' ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy User Agent</span>
              </>
            )}
          </button>
        </div>
        <p className="mt-3 font-mono text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200 break-all leading-relaxed select-all">
          {systemInfo.rawUserAgent}
        </p>
        <p className="mt-2 text-[11px] text-slate-500">
          Note: Modern browsers increasingly freeze or reduce the user agent to prevent device fingerprinting, relying instead on Client Hints.
        </p>
      </div>

      {/* Educational Sandbox Note */}
      <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-4 text-xs text-blue-900 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">What browser APIs can and cannot read:</span> Web browsers execute client code within a secure process sandbox. They purposefully restrict JavaScript from reading physical hardware serial numbers, MAC addresses, motherboard models, and BIOS information to protect user privacy. All information displayed above is obtained strictly through legitimate browser API specifications.
        </div>
      </div>
    </div>
  );
};
