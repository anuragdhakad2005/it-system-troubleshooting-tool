import React, { useState } from 'react';
import {
  Wrench,
  Search,
  CheckCircle,
  Copy,
  Check,
  AlertTriangle,
  HelpCircle,
  Terminal,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
  RotateCcw,
  Globe,
  Cpu,
  HardDrive,
  AlertCircle,
  Wifi,
  Network
} from 'lucide-react';
import { TROUBLESHOOTING_TOPICS } from '../data/troubleshootingData';
import { TroubleshootingTopic } from '../types';

export const TroubleshootingView: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('internet-not-working');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const selectedTopic =
    TROUBLESHOOTING_TOPICS.find((t) => t.id === selectedTopicId) ||
    TROUBLESHOOTING_TOPICS[0];

  const handleToggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  const handleResetChecklist = () => {
    const updated = { ...completedSteps };
    selectedTopic.steps.forEach((_, idx) => {
      delete updated[`${selectedTopic.id}-${idx}`];
    });
    setCompletedSteps(updated);
  };

  const copyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  // Filter topics based on search
  const filteredTopics = TROUBLESHOOTING_TOPICS.filter((t) => {
    const query = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(query) ||
      t.shortDesc.toLowerCase().includes(query) ||
      t.possibleCauses.some((c) => c.toLowerCase().includes(query)) ||
      t.steps.some((s) => s.title.toLowerCase().includes(query) || s.description.toLowerCase().includes(query))
    );
  });

  const getIcon = (name: string) => {
    switch (name) {
      case 'Globe': return Globe;
      case 'Cpu': return Cpu;
      case 'HardDrive': return HardDrive;
      case 'AlertCircle': return AlertCircle;
      case 'Wifi': return Wifi;
      case 'Network': return Network;
      default: return Wrench;
    }
  };

  // Calculate completed steps for active topic
  const totalSteps = selectedTopic.steps.length;
  const completedCount = selectedTopic.steps.filter(
    (_, idx) => completedSteps[`${selectedTopic.id}-${idx}`]
  ).length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">IT Problem Troubleshooting</h1>
              <span className="rounded bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-800">
                Interactive Assistant
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Standardized step-by-step resolution pathways for the most frequent IT support helpdesk issues.
            </p>
          </div>

          {/* Search filter */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search problems, error codes, CLI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Grid Layout: Left Topics List, Right Problem Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Common IT Problems
          </div>

          <div className="space-y-1.5">
            {filteredTopics.map((topic) => {
              const Icon = getIcon(topic.icon);
              const isSelected = topic.id === selectedTopic.id;

              return (
                <button
                  key={topic.id}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`w-full rounded-xl p-3.5 text-left transition-all border ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold truncate ${
                            isSelected ? 'text-blue-950' : 'text-slate-900'
                          }`}
                        >
                          {topic.title}
                        </span>
                        <span className="text-[10px] uppercase font-semibold text-slate-400">
                          {topic.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                        {topic.shortDesc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredTopics.length === 0 && (
              <div className="rounded-xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-500">
                No matching problem found. Try searching for &quot;network&quot;, &quot;disk&quot;, or &quot;CPU&quot;.
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Problem Deep Dive & Interactive Checklist (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Problem Header */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {selectedTopic.category} Diagnostics
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">
                  {selectedTopic.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {selectedTopic.shortDesc}
                </p>
              </div>

              {/* Step completion progress */}
              <div className="shrink-0 text-right">
                <div className="text-xs font-semibold text-slate-700">
                  Progress: <span className="font-mono text-blue-600">{completedCount}/{totalSteps}</span>
                </div>
                <div className="w-24 bg-slate-100 rounded-full h-2 mt-1 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <button
                  onClick={handleResetChecklist}
                  className="mt-1 text-[10px] text-slate-400 hover:text-slate-600 inline-flex items-center gap-1"
                >
                  <RotateCcw className="h-2.5 w-2.5" />
                  <span>Reset checks</span>
                </button>
              </div>
            </div>

            {/* Possible Causes & Recommended Checks Grid */}
            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
                  <span>Possible Root Causes</span>
                </div>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedTopic.possibleCauses.map((cause, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">·</span>
                      <span>{cause}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg bg-slate-50 p-3.5 border border-slate-100">
                <div className="font-bold text-slate-800 flex items-center gap-1.5 mb-2">
                  <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                  <span>Recommended Quick Checks</span>
                </div>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedTopic.recommendedChecks.map((chk, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">·</span>
                      <span>{chk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Step-by-Step Troubleshooting Solution */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Step-by-Step Troubleshooting Solution
              </h3>
              <span className="text-xs text-slate-500">
                Click checkbox after completing each step
              </span>
            </div>

            <div className="space-y-3">
              {selectedTopic.steps.map((step, idx) => {
                const stepKey = `${selectedTopic.id}-${idx}`;
                const isDone = Boolean(completedSteps[stepKey]);

                return (
                  <div
                    key={idx}
                    className={`rounded-xl border p-4 transition-all ${
                      isDone
                        ? 'border-emerald-200 bg-emerald-50/40'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id={stepKey}
                        checked={isDone}
                        onChange={() => handleToggleStep(stepKey)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      />

                      <div className="flex-1">
                        <label
                          htmlFor={stepKey}
                          className={`text-xs font-bold cursor-pointer flex items-center gap-2 ${
                            isDone ? 'text-emerald-950 line-through' : 'text-slate-900'
                          }`}
                        >
                          <span>{step.title}</span>
                          {isDone && (
                            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                              Done
                            </span>
                          )}
                        </label>

                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {step.description}
                        </p>

                        {/* Diagnostic Command Box if applicable */}
                        {step.command && (
                          <div className="mt-2.5 rounded-lg bg-slate-900 p-2.5 text-xs text-slate-100 font-mono flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 overflow-x-auto">
                              <Terminal className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                              <span className="text-emerald-400 select-all">{step.command}</span>
                            </div>

                            <button
                              onClick={() => copyCommand(step.command!)}
                              className="shrink-0 rounded bg-slate-800 px-2 py-1 text-[11px] font-sans font-medium text-slate-300 hover:bg-slate-700 transition-colors inline-flex items-center gap-1"
                              title="Copy command to clipboard"
                            >
                              {copiedCommand === step.command ? (
                                <>
                                  <Check className="h-3 w-3 text-emerald-400" />
                                  <span>Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3 w-3" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}

                        {step.tip && (
                          <div className="mt-2 text-[11px] text-blue-700 bg-blue-50 border border-blue-100 rounded px-2.5 py-1">
                            <span className="font-semibold">Pro Tip: </span>
                            {step.tip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* When to Contact IT Support Section */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-6 shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <ShieldAlert className="h-4 w-4 text-amber-600" />
              <span>When to Escalate / Contact IT Support</span>
            </div>
            <p className="text-xs text-amber-800 mt-1">
              If the issue persists after attempting the steps above, escalate to departmental IT administrators when encountering any of the following conditions:
            </p>

            <ul className="mt-3 space-y-1.5 text-xs text-amber-900">
              {selectedTopic.whenToContactSupport.map((cond, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-600 font-bold">⚠</span>
                  <span>{cond}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
