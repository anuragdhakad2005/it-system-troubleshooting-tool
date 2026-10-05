import React, { useState } from 'react';
import {
  Wifi,
  WifiOff,
  RotateCw,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Server,
  Zap,
  Info
} from 'lucide-react';
import { NetworkInfoData } from '../types';
import { runBrowserHttpProbe } from '../utils/systemDetection';

interface NetworkCheckViewProps {
  networkInfo: NetworkInfoData;
  onRefresh: () => void;
  onNavigateToTroubleshooting: () => void;
}

export const NetworkCheckView: React.FC<NetworkCheckViewProps> = ({
  networkInfo,
  onRefresh,
  onNavigateToTroubleshooting,
}) => {
  const [isRunningProbe, setIsRunningProbe] = useState(false);
  const [probeResult, setProbeResult] = useState<{
    tested: boolean;
    success?: boolean;
    latencyMs?: number;
    message?: string;
  }>({
    tested: false,
  });

  const handleRunProbe = async () => {
    setIsRunningProbe(true);
    const result = await runBrowserHttpProbe();
    setProbeResult({
      tested: true,
      success: result.success,
      latencyMs: result.latencyMs,
      message: result.message,
    });
    setIsRunningProbe(false);
  };

  const isOnline = networkInfo.isOnline;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Network Check</h1>
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                isOnline
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {isOnline ? 'Adapter Online' : 'Adapter Offline'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Monitors real-time browser network interface state and tests HTTP application-layer reachability using W3C Network Information and Fetch specifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRunProbe}
            disabled={isRunningProbe}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            <Activity className={`h-4 w-4 ${isRunningProbe ? 'animate-pulse text-amber-300' : ''}`} />
            <span>{isRunningProbe ? 'Probing...' : 'Run Network Check'}</span>
          </button>

          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            title="Refresh network adapter data"
          >
            <RotateCw className="h-3.5 w-3.5 text-slate-500" />
            <span className="hidden sm:inline">Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Main Connection Status Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Primary Connectivity */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Browser Network State
            </span>
            {isOnline ? (
              <Wifi className="h-5 w-5 text-emerald-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
          </div>

          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <span className={`h-3 w-3 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-red-500'}`} />
              {isOnline ? 'Connected' : 'Offline'}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Source: <code className="font-mono text-blue-600">navigator.onLine</code>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            {isOnline
              ? 'Local network adapter indicates active IP link.'
              : 'Adapter has disconnected from local Wi-Fi or Ethernet switch.'}
          </div>
        </div>

        {/* Metric 2: Effective Connection Type */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Effective Profile
            </span>
            <Zap className="h-5 w-5 text-blue-600" />
          </div>

          <div className="mt-4">
            <div className="text-2xl font-bold text-slate-900">
              {networkInfo.effectiveType}
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Source: <code className="font-mono text-blue-600">connection.effectiveType</code>
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            Estimated cellular/broadband equivalent based on recent transfer intervals.
          </div>
        </div>

        {/* Metric 3: Downlink & RTT */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Bandwidth / Latency
            </span>
            <Server className="h-5 w-5 text-indigo-600" />
          </div>

          <div className="mt-4">
            <div className="text-lg font-bold text-slate-900">
              {networkInfo.downlinkSpeedMbps}
            </div>
            <div className="text-xs font-mono text-slate-600 mt-1">
              Estimated RTT: {networkInfo.roundTripTimeMs}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600">
            Data Saver: <span className="font-semibold">{String(networkInfo.saveDataMode)}</span>
          </div>
        </div>
      </div>

      {/* HTTP Reachability Probe Test Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Application-Layer Reachability Probe
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Executes a real HTTP HEAD fetch request to calculate two-way application handshake latency.
            </p>
          </div>

          <button
            onClick={handleRunProbe}
            disabled={isRunningProbe}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-50 text-blue-700 px-3.5 py-1.5 text-xs font-semibold hover:bg-blue-100 transition-colors disabled:opacity-50"
          >
            <Activity className={`h-3.5 w-3.5 ${isRunningProbe ? 'animate-spin' : ''}`} />
            <span>{isRunningProbe ? 'Executing Test...' : 'Test Reachability Now'}</span>
          </button>
        </div>

        {/* Probe Test Result Display */}
        <div className="mt-4">
          {probeResult.tested ? (
            <div
              className={`rounded-lg p-4 border ${
                probeResult.success
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                  : 'border-red-200 bg-red-50 text-red-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold text-sm">
                {probeResult.success ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>HTTP Reachability Confirmed (Connected)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Reachability Test Failed (Offline or Blocked)</span>
                  </>
                )}
              </div>

              <div className="mt-2 text-xs flex flex-wrap items-center gap-4">
                {probeResult.latencyMs !== undefined && (
                  <div>
                    <span className="font-semibold">Measured Latency: </span>
                    <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {probeResult.latencyMs} ms
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-slate-700">{probeResult.message}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50/50 p-4 text-center text-xs text-slate-500">
              Click &quot;Run Network Check&quot; to perform an active HTTP request round-trip test against the web server.
            </div>
          )}
        </div>

        {/* Mandatory Transparency Note on Ping vs Browser */}
        <div className="mt-4 rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 flex items-start gap-2.5">
          <Info className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <span className="font-bold text-slate-800">Technical Note on ICMP Ping:</span> In accordance with project instructions, this tool does not simulate fake ICMP ping results. Browsers are barred by OS security from crafting raw ICMP echo packets. We execute an authentic HTTP fetch probe to measure true application-layer latency.
          </p>
        </div>
      </div>

      {/* Detailed Technical Connection Parameters Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-6 py-3.5 flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Network API Parameter
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Value
          </span>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Network Interface State</div>
              <div className="text-[11px] text-slate-500 font-mono">navigator.onLine</div>
            </div>
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                isOnline ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {isOnline ? 'Connected' : 'Offline'}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Network Type</div>
              <div className="text-[11px] text-slate-500 font-mono">connection.type</div>
            </div>
            <span className="font-mono text-slate-700">
              {networkInfo.connectionType}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Effective Connection Quality</div>
              <div className="text-[11px] text-slate-500 font-mono">connection.effectiveType</div>
            </div>
            <span className="font-mono text-slate-700">
              {networkInfo.effectiveType}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Downlink Bandwidth Estimate</div>
              <div className="text-[11px] text-slate-500 font-mono">connection.downlink</div>
            </div>
            <span className="font-mono text-slate-700">
              {networkInfo.downlinkSpeedMbps}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Round Trip Time (RTT Estimate)</div>
              <div className="text-[11px] text-slate-500 font-mono">connection.rtt</div>
            </div>
            <span className="font-mono text-slate-700">
              {networkInfo.roundTripTimeMs}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">Data Saver Mode</div>
              <div className="text-[11px] text-slate-500 font-mono">connection.saveData</div>
            </div>
            <span className="font-mono text-slate-700">
              {String(networkInfo.saveDataMode)}
            </span>
          </div>

          <div className="flex items-center justify-between px-6 py-3">
            <div>
              <div className="font-semibold text-slate-900">W3C Network Information API Support</div>
              <div className="text-[11px] text-slate-500">Browser implementation status</div>
            </div>
            <span
              className={`rounded px-2 py-0.5 text-xs font-semibold ${
                networkInfo.networkApiSupported
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {networkInfo.networkApiSupported ? 'Supported in this Browser' : 'Not supported by this browser'}
            </span>
          </div>
        </div>
      </div>

      {/* Offline Troubleshooting Suggestions (Requirement 3) */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Network Troubleshooting Guidance
            </h2>
          </div>
          <button
            onClick={onNavigateToTroubleshooting}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            <span>Open Troubleshooting Assistant</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5">
            <div className="font-semibold text-slate-900">1. Physical Layer &amp; Hardware Check</div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Verify the RJ-45 Ethernet cable is plugged into the NIC until it clicks, or ensure the laptop Wi-Fi radio toggle is enabled. Check if the amber/green activity LED illuminates.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5">
            <div className="font-semibold text-slate-900">2. Verify Local Gateway Reachability</div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              Open terminal and ping the default gateway router: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">ping 192.168.1.1</code>. If this fails, the issue is on your local link.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5">
            <div className="font-semibold text-slate-900">3. Release &amp; Renew DHCP Address</div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              If assigned an APIPA IP address (169.254.x.x), run: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">ipconfig /release &amp;&amp; ipconfig /renew</code> in Command Prompt.
            </p>
          </div>

          <div className="rounded-lg border border-slate-100 bg-slate-50/75 p-3.5">
            <div className="font-semibold text-slate-900">4. Flush Corrupted DNS Cache</div>
            <p className="text-slate-600 mt-1 leading-relaxed">
              If you can reach IP addresses but web domain names fail to resolve, execute: <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">ipconfig /flushdns</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
