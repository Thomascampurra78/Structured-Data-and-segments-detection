
import React, { useState } from 'react';
import UrlInputForm from './components/UrlInputForm';
import ResultsView from './components/ResultsView';
import ExportButtons from './components/ExportButtons';
import { analyzeUrls } from './services/geminiService';
import { UrlAnalysis } from './types';
import { AlertCircle, Zap, ShieldCheck, Box, Settings2 } from 'lucide-react';

const App: React.FC = () => {
  const [results, setResults] = useState<UrlAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (urls: string[]) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeUrls(urls);
      setResults(result.results);
    } catch (err) {
      console.error(err);
      setError('An error occurred while generating structured data. Please check your URLs and try again.');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />

      <header className="pt-16 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 fill-current" />
          <span>SEO Batch Processor</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
          Structured Data tool <br />
          <span className="text-blue-600">& Segment overview</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Paste a list of URLs to automatically generate tailored, high-performance JSON-LD structured data for each page.
        </p>
      </header>

      <main className="px-4">
        <UrlInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {isLoading && (
          <div className="max-w-2xl mx-auto mt-20 text-center animate-pulse">
            <div className="inline-block p-4 rounded-full bg-blue-50 text-blue-600 mb-4">
              <Settings2 className="w-12 h-12 animate-spin-slow" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing URL Content...</h2>
            <p className="text-slate-500">Mapping paths to Schema.org standards and writing optimized code.</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-700">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ExportButtons results={results} />
            <ResultsView results={results} />
            
            <div className="mt-20 flex flex-col items-center justify-center gap-6 opacity-40 grayscale pointer-events-none select-none">
              <div className="flex gap-12 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">SEO VALIDATED</span>
                </div>
                <div className="flex items-center gap-2">
                  <Box className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">BATCH PROCESSED</span>
                </div>
              </div>
              <p className="text-xs font-medium">Bulk Structured Data Architect v2.0</p>
            </div>
          </div>
        )}

        {!isLoading && results.length === 0 && !error && (
          <div className="mt-20 max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Bulk Input', desc: 'Process multiple URLs at once' },
              { label: 'Smart Detection', desc: 'Auto-maps URL type to Schema' },
              { label: 'JSON-LD', desc: 'W3C compliant code output' },
              { label: 'Pro Exports', desc: 'Ready for Excel & PPT reporting' },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h4 className="font-bold text-slate-800 mb-1">{feature.label}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
      
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
