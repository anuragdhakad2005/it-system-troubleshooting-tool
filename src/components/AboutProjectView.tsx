import React from 'react';
import {
  ShieldCheck,
  Server,
  Settings,
  Network,
  Wrench,
  Headphones,
  CheckCircle2,
  FileCode,
  GraduationCap,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export const AboutProjectView: React.FC = () => {
  const internshipAreas = [
    {
      title: 'IT Infrastructure',
      icon: Server,
      desc: 'Understanding client endpoint roles within enterprise computing environments, hardware resource boundaries, and system architectures.',
    },
    {
      title: 'System Configuration',
      icon: Settings,
      desc: 'Examining client OS environments, display configurations, memory constraints, and browser runtime capabilities.',
    },
    {
      title: 'Networking',
      icon: Network,
      desc: 'Local network connectivity, IP addressing, DNS resolution, and application-layer reachability testing.',
    },
    {
      title: 'Troubleshooting',
      icon: Wrench,
      desc: 'Systematic diagnosis pathways for slow systems, Wi-Fi drops, full disks, and software startup failures.',
    },
    {
      title: 'IT Support',
      icon: Headphones,
      desc: 'End-user guidance, Task Manager utilization, clean OS deployment procedures, and support escalation protocols.',
    },
  ];

  const vivaQuestions = [
    {
      q: 'Q1: Why cannot a browser application read physical hardware serial numbers or MAC addresses?',
      a: 'Web browsers execute JavaScript in a secure multi-process sandbox. Access to physical hardware serials, motherboard BIOS, or Network Interface Card (NIC) MAC addresses would allow any visited website to permanently track and fingerprint users across the web without consent, creating severe security and privacy vulnerabilities.',
    },
    {
      q: 'Q2: What is the difference between an ICMP Ping and the HTTP reachability check used here?',
      a: 'A true ICMP ping operates at OSI Layer 3 (Network Layer) using raw sockets to send ICMP Echo Request packets. Operating systems forbid web browsers from creating raw sockets for security reasons. Instead, this web tool uses an authentic HTTP HEAD fetch probe at Layer 7 (Application Layer) to verify two-way network connectivity and compute real round-trip latency without inventing fake ICMP metrics.',
    },
    {
      q: 'Q3: What does navigator.hardwareConcurrency actually report?',
      a: 'It returns the number of logical processor execution cores (threads) available to the browser user agent. On a CPU with Hyper-Threading or simultaneous multithreading (e.g. 4 cores / 8 threads), it typically reports 8. Browsers expose this so web applications can instantiate an optimal pool of Web Workers.',
    },
    {
      q: 'Q4: Why does navigator.deviceMemory only report coarse buckets like 4 GB or 8 GB?',
      a: 'The W3C Device Memory specification restricts values to powers of two (0.25, 0.5, 1, 2, 4, 8) with an upper cap of 8 GB. This coarse granularity was chosen specifically to protect against high-entropy browser fingerprinting while still allowing heavy web apps to tailor asset loading.',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Project Overview Card */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              College Internship Mini-Project
            </span>
            <h1 className="text-2xl font-bold text-slate-900">
              IT System Troubleshooting & Support Tool
            </h1>
          </div>
        </div>

        <div className="mt-6 rounded-xl bg-slate-50 border border-slate-200 p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Project Purpose
          </div>
          <p className="mt-2 text-sm text-slate-700 leading-relaxed font-medium">
            &quot;A web-based IT support utility designed to provide basic system information, network status, hardware-related browser information and troubleshooting guidance.&quot;
          </p>
        </div>

        <div className="mt-6 space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            Developed as a practical demonstration mini-project, this application delivers a clean, intuitive diagnostic dashboard that runs locally in modern desktop and laptop browsers. It addresses fundamental IT competencies including client configuration, network connectivity verification, and standardized troubleshooting workflows.
          </p>
          <p className="font-semibold text-slate-800">
            Design Philosophy: Absolute Academic Integrity. Unlike many student demo apps that populate fake hard drive sizes or fictitious processor models, this tool strictly observes browser sandbox limits, queries authentic W3C browser APIs, and transparently notes &quot;Not available in browser&quot; for all security-restricted attributes.
          </p>
        </div>
      </div>

      {/* 5 Internship Focus Areas */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
          Curriculum &amp; Internship Focus Domains
        </h2>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {internshipAreas.map((area, idx) => {
            const Icon = area.icon;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 bg-slate-50/50 p-4 transition-all hover:bg-slate-50"
              >
                <div className="flex items-center gap-2.5 font-bold text-slate-900 text-xs">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span>{area.title}</span>
                </div>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {area.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demonstration & Viva Presentation Preparation */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Viva &amp; Demonstration Discussion Questions
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            For College Faculty Review
          </span>
        </div>

        <div className="space-y-3">
          {vivaQuestions.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-slate-100 bg-slate-50 p-4 text-xs">
              <div className="font-bold text-slate-900 text-xs">
                {item.q}
              </div>
              <p className="mt-2 text-slate-600 leading-relaxed">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Stack Info */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 pb-3 border-b border-slate-100">
          Technical Architecture
        </h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
            <div className="font-bold text-slate-800">Frontend Technology</div>
            <p className="text-slate-600 mt-1">
              HTML5, Modern CSS / Tailwind, React 19, TypeScript. Completely client-side execution with no external database required.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
            <div className="font-bold text-slate-800">APIs Evaluated</div>
            <p className="text-slate-600 mt-1 font-mono text-[11px]">
              navigator.userAgent, navigator.hardwareConcurrency, navigator.deviceMemory, navigator.onLine, NetworkInformation, Screen API.
            </p>
          </div>

          <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
            <div className="font-bold text-slate-800">Deployment Target</div>
            <p className="text-slate-600 mt-1">
              Zero-install, instant local browser evaluation on laptops and desktops across Chrome, Edge, Firefox, and Safari.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
