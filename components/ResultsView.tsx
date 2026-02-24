
import React, { useMemo } from 'react';
import { Code2, ExternalLink, Box, Info } from 'lucide-react';
import { UrlAnalysis } from '../types';

interface ResultsViewProps {
  results: UrlAnalysis[];
}

const ResultsView: React.FC<ResultsViewProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-1 gap-8 w-full max-w-5xl mx-auto">
      {results.map((item, idx) => (
        <JsonLdCard key={idx} item={item} index={idx} />
      ))}
    </div>
  );
};

const JsonLdCard: React.FC<{ item: UrlAnalysis; index: number }> = ({ item, index }) => {
  // Ensure the JSON-LD is perfectly formatted even if the API returns a compact string
  const formattedJson = useMemo(() => {
    try {
      // Handle the case where the string might be wrapped in markdown or have escaped chars
      const cleaned = item.jsonLd.trim();
      const parsed = JSON.parse(cleaned);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      // Fallback to original string if parsing fails
      return item.jsonLd;
    }
  }, [item.jsonLd]);

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 transition-all hover:shadow-2xl">
      <div className="bg-slate-900 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Box className="w-5 h-5 text-blue-400" />
          <h3 className="text-white font-bold text-lg truncate max-w-md">{item.url}</h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-blue-500/20 rounded-full text-blue-400 text-xs font-mono uppercase tracking-wider">
            {item.schemaType}
          </div>
          <div className="px-3 py-1 bg-slate-700 rounded-full text-slate-300 text-xs font-mono uppercase tracking-wider">
            {item.segment}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-widest">
            <ExternalLink className="w-3 h-3" />
            <span>Target URL</span>
          </div>
          <a 
            href={item.url.startsWith('http') ? item.url : `https://${item.url}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all block text-lg font-medium"
          >
            {item.url}
          </a>
        </div>

        <div className="mb-6 bg-slate-50 rounded-xl p-4 flex gap-3 border border-slate-200">
          <Info className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-slate-900 mb-1">Implementation Note</p>
            <p className="text-sm text-slate-600 leading-relaxed italic">
              {item.explanation}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2 text-slate-500 uppercase text-xs font-bold tracking-widest">
            <Code2 className="w-3 h-3" />
            <span>JSON-LD Output</span>
          </div>
          <div className="relative group">
            <pre className="bg-slate-900 rounded-2xl p-6 overflow-x-auto text-sm font-mono text-blue-100 leading-7 border border-slate-800 whitespace-pre shadow-inner custom-scrollbar">
              {formattedJson}
            </pre>
            <button 
              onClick={() => navigator.clipboard.writeText(formattedJson)}
              className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            >
              Copy JSON
            </button>
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e293b;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #334155;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #475569;
        }
      `}</style>
    </div>
  );
};

export default ResultsView;
