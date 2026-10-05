import React, { useState } from 'react';
import {
  X,
  Copy,
  Check,
  Printer,
  Download,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { SystemInfoData, HardwareInfoData, NetworkInfoData } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  systemInfo: SystemInfoData;
  hardwareInfo: HardwareInfoData;
  networkInfo: NetworkInfoData;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  systemInfo,
  hardwareInfo,
  networkInfo,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const generateReportText = () => {
    return `=====================================================
IT SYSTEM TROUBLESHOOTING & SUPPORT TOOL - DIAGNOSTIC REPORT
Generated: ${systemInfo.timestamp}
=====================================================

1. SYSTEM & OPERATING ENVIRONMENT
-----------------------------------------------------
Operating System    : ${systemInfo.osName} (${systemInfo.osVersion})
Platform String     : ${hardwareInfo.platform}
Device Category     : ${systemInfo.deviceType}
Browser Engine      : ${systemInfo.browserName} v${systemInfo.browserVersion}
Primary Locale      : ${systemInfo.browserLanguage}
Timezone            : ${systemInfo.timezone}
Cookies Enabled     : ${systemInfo.cookiesEnabled ? 'Yes' : 'No'}

2. DISPLAY METRICS
-----------------------------------------------------
Physical Resolution : ${systemInfo.screenResolution}
Available Workspace : ${systemInfo.availableScreenResolution}
Viewport Size       : ${systemInfo.viewportSize}
Pixel Scale Ratio   : ${systemInfo.devicePixelRatio}x
Color Depth         : ${systemInfo.colorDepth}

3. HARDWARE CAPABILITIES (BROWSER DETECTABLE)
-----------------------------------------------------
CPU Logical Threads : ${hardwareInfo.cpuLogicalCores}
Device Memory (RAM) : ${hardwareInfo.deviceMemoryGiB}
Touch Input Support : ${hardwareInfo.touchSupport ? `Yes (${hardwareInfo.maxTouchPoints} points)` : 'No (Mouse/Trackpad)'}
Battery Status API  : ${hardwareInfo.batterySupported ? `${hardwareInfo.batteryLevel}% (${hardwareInfo.batteryCharging ? 'Charging' : 'Discharging'})` : 'Not available in browser'}
Physical Motherboard: Not available in browser (Security Sandbox Protected)
Hard Drive S.M.A.R.T: Not available in browser (Security Sandbox Protected)

4. NETWORK & CONNECTIVITY STATUS
-----------------------------------------------------
Interface Status    : ${networkInfo.isOnline ? 'ONLINE' : 'OFFLINE'}
Effective Type      : ${networkInfo.effectiveType}
Downlink Speed      : ${networkInfo.downlinkSpeedMbps}
Round Trip Time     : ${networkInfo.roundTripTimeMs}
Data Saver Active   : ${networkInfo.saveDataMode}
Last Status Poll    : ${networkInfo.lastChecked}

5. SECURITY & ACADEMIC INTEGRITY NOTICE
-----------------------------------------------------
Note: In accordance with browser security specifications,
physical hardware serial numbers, MAC addresses, and low-level
BIOS parameters are inaccessible to client-side web applications
to defend against cross-site user fingerprinting.

=====================================================
End of Report - IT System Support & Diagnostics Mini-Project
=====================================================`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateReportText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `IT_Diagnostic_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <FileText className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                System Diagnostic Report
              </h2>
              <p className="text-[11px] text-slate-500">
                IT Helpdesk Ticket Summary Format
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content - Formatted Monospace Report */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
            <span>Plain-Text Diagnostic Output:</span>
            <span className="font-mono text-[11px]">Ready for export / ticketing</span>
          </div>

          <pre className="rounded-xl border border-slate-200 bg-slate-900 p-5 font-mono text-[11px] text-emerald-400 overflow-x-auto whitespace-pre leading-relaxed select-all">
            {generateReportText()}
          </pre>
        </div>

        {/* Modal Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-3.5 bg-slate-50">
          <span className="text-xs text-slate-500 hidden sm:inline">
            Attach this text to IT support tickets or lab journals.
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Printer className="h-3.5 w-3.5 text-slate-500" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Download className="h-3.5 w-3.5 text-slate-500" />
              <span>Download .txt</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Report</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
