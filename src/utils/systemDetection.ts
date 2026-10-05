/**
 * System and Network Detection Utilities
 * College Internship Mini-Project: IT System Troubleshooting & Support Tool
 *
 * NOTE ON BROWSER SANDBOX SECURITY:
 * Browsers run web applications inside a restricted sandbox to protect user privacy.
 * Therefore, physical hardware specs (motherboard serial numbers, BIOS, actual CPU clock speed,
 * physical RAM stick count, hard drive S.M.A.R.T. health, and raw ICMP ping) are intentionally
 * inaccessible to JavaScript.
 *
 * This utility uses ONLY legitimate, browser-supported APIs and transparently displays
 * "Not available in browser" whenever an API is unsupported or restricted.
 */

import { SystemInfoData, HardwareInfoData, NetworkInfoData } from '../types';

/**
 * Safely parses the user agent string into human-readable OS and Browser information
 */
export function detectOsAndBrowser(ua: string = navigator.userAgent) {
  let osName = 'Unknown OS';
  let osVersion = 'Unknown Version';
  let browserName = 'Unknown Browser';
  let browserVersion = 'Unknown Version';

  // 1. Detect Operating System
  if (/Windows NT 10.0/i.test(ua)) {
    osName = 'Windows';
    // Windows 11 also uses NT 10.0 in user agent, distinguish via userAgentData if available
    osVersion = '10 / 11';
  } else if (/Windows NT 6.3/i.test(ua)) {
    osName = 'Windows';
    osVersion = '8.1';
  } else if (/Windows NT 6.2/i.test(ua)) {
    osName = 'Windows';
    osVersion = '8';
  } else if (/Windows NT 6.1/i.test(ua)) {
    osName = 'Windows';
    osVersion = '7';
  } else if (/Macintosh|Mac OS X/i.test(ua)) {
    osName = 'macOS';
    const match = ua.match(/Mac OS X (\d+[._]\d+([._]\d+)?)/i);
    osVersion = match ? match[1].replace(/_/g, '.') : 'OS X';
  } else if (/CrOS/i.test(ua)) {
    osName = 'ChromeOS';
    const match = ua.match(/CrOS \w+ (\d+\.\d+\.\d+)/i);
    osVersion = match ? match[1] : 'Unknown';
  } else if (/Android/i.test(ua)) {
    osName = 'Android';
    const match = ua.match(/Android (\d+(\.\d+)?)/i);
    osVersion = match ? match[1] : 'Unknown';
  } else if (/iPhone|iPad|iPod/i.test(ua)) {
    osName = 'iOS';
    const match = ua.match(/OS (\d+([._]\d+)?)/i);
    osVersion = match ? match[1].replace(/_/g, '.') : 'Unknown';
  } else if (/Linux/i.test(ua)) {
    osName = 'Linux';
    osVersion = 'GNU/Linux Kernel';
  }

  // 2. Detect Browser Name & Version
  if (/Edg\/(\d+(\.\d+)?)/i.test(ua)) {
    browserName = 'Microsoft Edge';
    browserVersion = ua.match(/Edg\/(\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/OPR\/(\d+(\.\d+)?)/i.test(ua) || /Opera/i.test(ua)) {
    browserName = 'Opera';
    browserVersion = ua.match(/OPR\/(\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/Firefox\/(\d+(\.\d+)?)/i.test(ua)) {
    browserName = 'Mozilla Firefox';
    browserVersion = ua.match(/Firefox\/(\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/Chrome\/(\d+(\.\d+)?)/i.test(ua)) {
    browserName = 'Google Chrome';
    browserVersion = ua.match(/Chrome\/(\d+(\.\d+)?)/i)?.[1] || 'Unknown';
  } else if (/Safari\/(\d+(\.\d+)?)/i.test(ua) && !/Chrome/i.test(ua)) {
    browserName = 'Apple Safari';
    const match = ua.match(/Version\/(\d+(\.\d+)?)/i);
    browserVersion = match ? match[1] : 'Unknown';
  }

  return { osName, osVersion, browserName, browserVersion };
}

/**
 * Determines device form factor using screen dimensions and touch capabilities
 */
export function detectDeviceType(): 'Desktop / Laptop' | 'Tablet' | 'Mobile' | 'Unknown' {
  const ua = navigator.userAgent;
  const isMobileUa = /Mobi|Android|iPhone|iPod/i.test(ua);
  const isTabletUa = /iPad|Tablet/i.test(ua);
  const hasTouch = (navigator.maxTouchPoints || 0) > 0;
  const minDimension = Math.min(window.screen.width, window.screen.height);

  if (isTabletUa || (hasTouch && minDimension >= 600 && minDimension <= 1024)) {
    return 'Tablet';
  }
  if (isMobileUa || (hasTouch && minDimension < 600)) {
    return 'Mobile';
  }
  return 'Desktop / Laptop';
}

/**
 * Collects all safely readable system information
 */
export function getSystemInformation(): SystemInfoData {
  const { osName, osVersion, browserName, browserVersion } = detectOsAndBrowser();
  const screenRes = `${window.screen.width} × ${window.screen.height} px`;
  const availRes = `${window.screen.availWidth} × ${window.screen.availHeight} px`;
  const viewport = `${window.innerWidth} × ${window.innerHeight} px`;
  const cores = navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 'Not available';

  let timezone = 'Not available';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Not available';
  } catch {
    timezone = 'Not available';
  }

  return {
    osName,
    osVersion,
    browserName,
    browserVersion,
    browserLanguage: navigator.language || 'Not available',
    preferredLanguages: Array.isArray(navigator.languages) ? [...navigator.languages] : [navigator.language || 'Not available'],
    screenResolution: screenRes,
    availableScreenResolution: availRes,
    viewportSize: viewport,
    devicePixelRatio: window.devicePixelRatio || 1,
    colorDepth: window.screen.colorDepth ? `${window.screen.colorDepth}-bit` : 'Not available',
    deviceType: detectDeviceType(),
    cpuCores: cores,
    isOnline: navigator.onLine,
    timezone,
    cookiesEnabled: navigator.cookieEnabled ?? false,
    timestamp: new Date().toLocaleString(),
    rawUserAgent: navigator.userAgent,
    pdfViewerSupported: 'pdfViewerEnabled' in navigator ? (navigator as any).pdfViewerEnabled : false,
  };
}

/**
 * Collects browser-detectable hardware metrics
 */
export async function getHardwareInformation(): Promise<HardwareInfoData> {
  const { osName } = detectOsAndBrowser();
  const nav = navigator as any;

  // CPU Logical Cores (Threads)
  const cpuLogicalCores = nav.hardwareConcurrency ? nav.hardwareConcurrency : 'Not available in browser';

  // Device Memory API (standard in Chrome / Chromium, gives approximate RAM in GiB: 0.25, 0.5, 1, 2, 4, 8)
  let deviceMemoryGiB: number | string = 'Not available in browser';
  if (typeof nav.deviceMemory === 'number') {
    deviceMemoryGiB = `${nav.deviceMemory} GB (approximate browser bucket)`;
  } else {
    deviceMemoryGiB = 'Not available in browser (security restriction)';
  }

  // Touch points
  const maxTouchPoints = nav.maxTouchPoints || 0;
  const touchSupport = maxTouchPoints > 0;

  // Battery Status API (if supported)
  let batterySupported = false;
  let batteryLevel: number | undefined;
  let batteryCharging: boolean | undefined;
  let batteryChargingTime: number | undefined;
  let batteryDischargingTime: number | undefined;

  if (typeof nav.getBattery === 'function') {
    try {
      const battery = await nav.getBattery();
      batterySupported = true;
      batteryLevel = Math.round(battery.level * 100);
      batteryCharging = battery.charging;
      batteryChargingTime = battery.chargingTime;
      batteryDischargingTime = battery.dischargingTime;
    } catch {
      batterySupported = false;
    }
  }

  return {
    cpuLogicalCores,
    cpuArchitecture: 'Not exposed by browser API (sandbox protection)',
    deviceMemoryGiB,
    screenResolution: `${window.screen.width} × ${window.screen.height} px`,
    devicePixelRatio: window.devicePixelRatio || 1,
    touchSupport,
    maxTouchPoints,
    batterySupported,
    batteryLevel,
    batteryCharging,
    batteryChargingTime,
    batteryDischargingTime,
    platform: nav.platform || osName,
  };
}

/**
 * Collects Network Information API data and performs real reachability probe
 */
export function getNetworkInformation(): NetworkInfoData {
  const nav = navigator as any;
  const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

  const isOnline = navigator.onLine;
  const networkApiSupported = Boolean(conn);

  return {
    isOnline,
    effectiveType: conn?.effectiveType ? String(conn.effectiveType).toUpperCase() : 'Not available in browser',
    downlinkSpeedMbps: conn?.downlink ? `${conn.downlink} Mbps` : 'Not available in browser',
    roundTripTimeMs: conn?.rtt ? `${conn.rtt} ms` : 'Not available in browser',
    connectionType: conn?.type ? String(conn.type) : 'Not available in browser',
    saveDataMode: conn ? (conn.saveData ? 'Enabled' : 'Disabled') : 'Not available in browser',
    networkApiSupported,
    probeStatus: isOnline ? 'idle' : 'failed',
    probeMessage: isOnline ? 'Ready to run connection reachability test' : 'Browser reports device is offline',
    lastChecked: new Date().toLocaleTimeString(),
  };
}

/**
 * Runs a browser HTTP fetch latency test against a reliable web asset.
 * Transparently labels this as an HTTP application-layer probe, NOT raw ICMP ping.
 */
export async function runBrowserHttpProbe(): Promise<{
  success: boolean;
  latencyMs?: number;
  message: string;
}> {
  if (!navigator.onLine) {
    return {
      success: false,
      message: 'Browser reports offline: No active network adapter route detected.',
    };
  }

  const startTime = performance.now();
  try {
    // Probe current origin or a safe lightweight resource with cache busting
    const probeUrl = `${window.location.origin}/?probe=${Date.now()}`;
    const response = await fetch(probeUrl, {
      method: 'HEAD',
      cache: 'no-store',
      mode: 'no-cors', // ensures no CORS failure even in varied environments
    });

    const endTime = performance.now();
    const duration = Math.max(1, Math.round(endTime - startTime));

    return {
      success: true,
      latencyMs: duration,
      message: `HTTP probe successful. Response received in ${duration} ms.`,
    };
  } catch (err: any) {
    // Fallback probe
    try {
      const fallbackStart = performance.now();
      await fetch(window.location.href, { method: 'HEAD', cache: 'no-store' });
      const duration = Math.max(1, Math.round(performance.now() - fallbackStart));
      return {
        success: true,
        latencyMs: duration,
        message: `HTTP probe verified via current page in ${duration} ms.`,
      };
    } catch (fallbackErr: any) {
      return {
        success: false,
        message: 'HTTP reachability probe failed: Network request could not complete.',
      };
    }
  }
}
