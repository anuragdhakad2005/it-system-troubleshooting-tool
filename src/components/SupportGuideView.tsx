import React, { useState } from 'react';
import {
  BookOpen,
  Monitor,
  HardDrive,
  DownloadCloud,
  Share2,
  Network,
  Globe,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Search
} from 'lucide-react';
import { SUPPORT_GUIDE_TOPICS } from '../data/supportGuideData';

export const SupportGuideView: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>('task-manager');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'All',
    'OS & System Tools',
    'Setup & Deployment',
    'Networking Infrastructure',
  ];

  const filteredTopics = SUPPORT_GUIDE_TOPICS.filter((topic) => {
    const matchesCategory = filterCategory === 'All' || topic.category === filterCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.sections.some(
        (s) =>
          s.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.content && s.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
          s.bulletPoints?.some((bp) => bp.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    return matchesCategory && matchesSearch;
  });

  const activeTopic =
    filteredTopics.find((t) => t.id === selectedTopicId) ||
    filteredTopics[0] ||
    SUPPORT_GUIDE_TOPICS[0];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">IT Support Guide</h1>
              <span className="rounded bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-800">
                Foundations
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Beginner-friendly technical reference manual covering operating system management, safe software deployment, and networking equipment.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search concepts, commands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-slate-200 pl-9 pr-3 py-1.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 mr-2 uppercase tracking-wider">
            Category:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Topics Selector (4 Cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Guide Modules ({filteredTopics.length})
          </div>

          <div className="space-y-1.5">
            {filteredTopics.map((topic) => {
              const isSelected = topic.id === activeTopic.id;
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
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {topic.title}
                    </span>
                    <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                      {topic.category.split(' ')[0]}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {topic.summary}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Educational Content Display (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {activeTopic ? (
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs space-y-6">
              {/* Topic Header */}
              <div className="pb-4 border-b border-slate-100">
                <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600">
                  {activeTopic.category}
                </div>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  {activeTopic.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {activeTopic.summary}
                </p>

                {/* Practical Tip Callout */}
                <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200/80 p-3 text-xs text-amber-900 flex items-start gap-2.5">
                  <Lightbulb className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Technician Tip: </span>
                    <span>{activeTopic.practicalTip}</span>
                  </div>
                </div>
              </div>

              {/* Topic Subsections */}
              <div className="space-y-6">
                {activeTopic.sections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-2">
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold">
                        {sIdx + 1}
                      </span>
                      <span>{section.heading}</span>
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed pl-7">
                      {section.content}
                    </p>

                    {section.bulletPoints && (
                      <ul className="pl-7 space-y-1.5 pt-1 text-xs text-slate-700">
                        {section.bulletPoints.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold shrink-0">·</span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {section.note && (
                      <div className="ml-7 text-[11px] text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100">
                        {section.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
              No matching guide found. Try adjusting your search query.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
