
import React from 'react';
import { Code2, ExternalLink, Layout, Info } from 'lucide-react';
import { WebsiteSegment } from '../types';

interface ResultsViewProps {
  segments: WebsiteSegment[];
}

const ResultsView: React.FC<ResultsViewProps> = ({ segments }) => {
  return (
    <div className="grid grid-cols-1 gap-8 w-full max-w-5xl mx-auto">
      {segments.map((segment, idx) => (
        <div 
          key={idx} 
          className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl"
        >
          <div className="bg-slate-900 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layout className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-bold text-xl">{segment.segmentName}</h3>
            </div>
            <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-xs font-mono uppercase tracking-wider">
              Segment {idx + 1}
            </div>
          </div>
          
          <div className="p-8">
            {/* Example URL section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-widest">
                <ExternalLink className="w-3 h-3" />
                <span>Example URL</span>
              </div>
              <a 
                href={segment.urlExample} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all block text-lg"
              >
                {segment.urlExample}
              </a>
            </div>

            {/* Description / Info section */}
            <div className="mb-6 bg-blue-50 rounded-xl p-4 flex gap-3 border border-blue-100">
              <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-900 mb-1">JSON-LD Strategy</p>
                <p className="text-sm text-blue-700 leading-relaxed">
                  {segment.description}
                </p>
              </div>
            </div>

            {/* JSON-LD section */}
            <div>
              <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-widest">
                <Code2 className="w-3 h-3" />
                <span>Structured Data (JSON-LD)</span>
              </div>
              <div className="relative group">
                <pre className="bg-slate-50 rounded-2xl p-6 overflow-x-auto text-sm font-mono text-slate-700 leading-relaxed border border-slate-200">
                  {segment.jsonLd}
                </pre>
                <button 
                  onClick={() => navigator.clipboard.writeText(segment.jsonLd)}
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50 transition-all"
                >
                  Copy Code
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultsView;
