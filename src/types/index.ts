/**
 * Types and interfaces for IT System Troubleshooting & Support Tool
 * College Internship Mini-Project
 */

export interface SystemInfoData {
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  browserLanguage: string;
  preferredLanguages: string[];
  screenResolution: string;
  availableScreenResolution: string;
  viewportSize: string;
  devicePixelRatio: number | string;
  colorDepth: string;
  deviceType: 'Desktop / Laptop' | 'Tablet' | 'Mobile' | 'Unknown';
  cpuCores: number | string;
  isOnline: boolean;
  timezone: string;
  cookiesEnabled: boolean;
  timestamp: string;
  rawUserAgent: string;
  pdfViewerSupported: boolean;
}

export interface HardwareInfoData {
  cpuLogicalCores: number | string;
  cpuArchitecture: string;
  deviceMemoryGiB: number | string;
  screenResolution: string;
  devicePixelRatio: number | string;
  touchSupport: boolean;
  maxTouchPoints: number;
  batterySupported: boolean;
  batteryLevel?: number;
  batteryCharging?: boolean;
  batteryChargingTime?: number;
  batteryDischargingTime?: number;
  platform: string;
}

export interface NetworkInfoData {
  isOnline: boolean;
  effectiveType: string;
  downlinkSpeedMbps: number | string;
  roundTripTimeMs: number | string;
  connectionType: string;
  saveDataMode: boolean | string;
  networkApiSupported: boolean;
  probeStatus: 'idle' | 'testing' | 'success' | 'failed';
  probeLatencyMs?: number;
  probeEndpoint?: string;
  probeMessage?: string;
  lastChecked: string;
}

export interface TroubleshootingTopic {
  id: string;
  title: string;
  shortDesc: string;
  category: 'Network' | 'System' | 'Storage' | 'Software' | 'Hardware';
  icon: string;
  possibleCauses: string[];
  recommendedChecks: string[];
  steps: {
    title: string;
    description: string;
    command?: string;
    commandOs?: 'Windows' | 'macOS' | 'Linux' | 'Universal';
    tip?: string;
  }[];
  whenToContactSupport: string[];
}

export interface SupportGuideTopic {
  id: string;
  title: string;
  summary: string;
  category: 'OS & System Tools' | 'Setup & Deployment' | 'Networking Infrastructure';
  sections: {
    heading: string;
    content?: string;
    bulletPoints?: string[];
    codeBlock?: string;
    note?: string;
  }[];
  practicalTip: string;
}
