import React from 'react';
import {
  Cpu,
  HardDrive,
  Monitor,
  Layers,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Battery,
  BatteryCharging,
  Fingerprint,
  Info
} from 'lucide-react';
import { HardwareInfoData } from '../types';

interface HardwareCheckViewProps {
  hardwareInfo: HardwareInfoData;
}

export const HardwareCheckView: React.FC<HardwareCheckViewProps> = ({
  hardwareInfo,
}) => {
  // Check if device memory is available
  const isMemoryAvailable =
    typeof hardwareInfo.deviceMemoryGiB === 'string' &&
    !hardwareInfo.deviceMemoryGiB.includes('Not available');

  // Check if CPU concurrency is available
  const isCpuAvailable = typeof hardwareInfo.cpuLogicalCores === 'number';

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900">Hardware Check</h1>
          <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
            Sandbox Inspected
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1 max-w-3xl leading-relaxed">
          Evaluates detectable hardware parameters exposed by standard browser APIs. In compliance with web platform privacy standards, physical motherboard serials, exact CPU models, and storage volumes are isolated from browser execution.
        </p>
      </div>

      {/* Mandatory Prominent Note (Requirement 2) */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-bold">Security & Privacy Notice: </span>
          Some hardware information cannot be accessed directly by a web browser because of security restrictions. Browsers deliberately sandbox web applications to prevent cross-site hardware fingerprinting and protect system integrity.
        </div>
      </div>

      {/* 4 Primary Status Cards: CPU, Memory, Display, System */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Card 1: CPU */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                CPU Status
              </span>
              <Cpu className="h-5 w-5 text-blue-600" />
            </div>

            <div className="mt-4">
              <div className="text-xl font-bold text-slate-900">
                {isCpuAvailable ? `${hardwareInfo.cpuLogicalCores} Logical Cores` : 'Not available in browser'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Logical processor execution threads available to web worker thread pool.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Physical Model:</span>
              <span className="font-mono text-slate-600 font-medium">Not available in browser</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Clock Frequency:</span>
              <span className="font-mono text-slate-600 font-medium">Not available in browser</span>
            </div>
          </div>
        </div>

        {/* Status Card 2: Memory */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Memory Status
              </span>
              <HardDrive className="h-5 w-5 text-amber-600" />
            </div>

            <div className="mt-4">
              <div className="text-lg font-bold text-slate-900 truncate" title={String(hardwareInfo.deviceMemoryGiB)}>
                {isMemoryAvailable ? hardwareInfo.deviceMemoryGiB : 'Not available in browser'}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {isMemoryAvailable
                  ? 'Coarse client device RAM bucket reported by Chromium.'
                  : 'Browser security restriction: Device Memory API is not supported in this browser engine.'}
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">RAM Model/Speed:</span>
              <span className="font-mono text-slate-600 font-medium">Not available in browser</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Storage Size (Disk):</span>
              <span className="font-mono text-slate-600 font-medium">Not available in browser</span>
            </div>
          </div>
        </div>

        {/* Status Card 3: Display */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Display Status
              </span>
              <Monitor className="h-5 w-5 text-indigo-600" />
            </div>

            <div className="mt-4">
              <div className="text-xl font-bold text-slate-900">
                {hardwareInfo.screenResolution}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Physical display pixel matrix reported by the OS graphics compositor.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Pixel Ratio:</span>
              <span className="font-mono text-slate-800 font-medium">{hardwareInfo.devicePixelRatio}x Scale</span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Touch Support:</span>
              <span className="font-medium text-slate-800">
                {hardwareInfo.touchSupport ? `Yes (${hardwareInfo.maxTouchPoints} points)` : 'Mouse / Trackpad Only'}
              </span>
            </div>
          </div>
        </div>

        {/* Status Card 4: System */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                System Platform
              </span>
              <Layers className="h-5 w-5 text-emerald-600" />
            </div>

            <div className="mt-4">
              <div className="text-xl font-bold text-slate-900 truncate">
                {hardwareInfo.platform}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Reported client platform architecture and execution environment.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Battery API:</span>
              <span className="font-medium text-slate-800">
                {hardwareInfo.batterySupported ? `${hardwareInfo.batteryLevel}% (${hardwareInfo.batteryCharging ? 'Charging' : 'Discharging'})` : 'Not available in browser'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] mt-1">
              <span className="text-slate-500">Motherboard / BIOS:</span>
              <span className="font-mono text-slate-600 font-medium">Not available in browser</span>
            </div>
          </div>
        </div>
      </div>

      {/* Browser Hardware Access & Sandbox Security Matrix */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
          <div className="flex items-center gap-2">
            <Fingerprint className="h-4 w-4 text-slate-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">
              Browser Hardware Access & Security Sandbox Matrix
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Technical explanation of why certain hardware attributes can be inspected while others are strictly prohibited.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50/50 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-3">Hardware Parameter</th>
                <th className="px-6 py-3">Browser Status</th>
                <th className="px-6 py-3">Standard API Used</th>
                <th className="px-6 py-3">Security & Privacy Rationale</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">CPU Logical Cores (Threads)</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-3 w-3" />
                    Available
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-blue-600">
                  navigator.hardwareConcurrency
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Exposed so web apps can spawn appropriate number of Web Workers for background computation.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">Display Resolution & Scale</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                    <CheckCircle2 className="h-3 w-3" />
                    Available
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-blue-600">
                  window.screen / devicePixelRatio
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Required by CSS layout rendering engines to adapt responsive interfaces to retina displays.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">Approximate Device Memory (RAM)</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-amber-100 text-amber-800">
                    <AlertTriangle className="h-3 w-3" />
                    Chromium Only
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-blue-600">
                  navigator.deviceMemory
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Rounded to powers of two (0.5, 1, 2, 4, 8 GB) to prevent exact fingerprinting. Blocked in Safari &amp; Firefox.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">Physical Motherboard &amp; BIOS Model</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3" />
                    Blocked
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">
                  Not available in browser
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Accessing motherboard SMBIOS requires low-level kernel driver privileges (WMI / /dev/mem) which would allow malicious websites to uniquely identify a user.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">Hard Drive Model &amp; S.M.A.R.T. Health</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3" />
                    Blocked
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">
                  Not available in browser
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Drive serial numbers and raw ATA bus commands are isolated from web browsers to prevent unauthorized file system telemetry.
                </td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="px-6 py-3.5 font-medium text-slate-900">CPU Temperature &amp; Fan Speeds</td>
                <td className="px-6 py-3.5">
                  <span className="inline-flex items-center gap-1 rounded px-2 py-0.5 text-[11px] font-semibold bg-red-100 text-red-800">
                    <XCircle className="h-3 w-3" />
                    Blocked
                  </span>
                </td>
                <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">
                  Not available in browser
                </td>
                <td className="px-6 py-3.5 text-slate-500">
                  Thermal sensors require ACPI bus polling. Browsers restrict timing and thermal access to defend against microarchitectural side-channel attacks (like Spectre).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
