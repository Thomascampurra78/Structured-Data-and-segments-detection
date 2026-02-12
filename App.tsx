
import React, { useState } from 'react';
import DomainForm from './components/DomainForm';
import ResultsView from './components/ResultsView';
import ExportButtons from './components/ExportButtons';
import { analyzeDomain } from './services/geminiService';
import { WebsiteSegment } from './types';
// Fixed: Added missing 'Layout' icon to the lucide-react import
import { AlertCircle, Zap, ShieldCheck, BarChart3, Layout } from 'lucide-react';

const App: React.FC = () => {
  const [segments, setSegments] = useState<WebsiteSegment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentDomain, setCurrentDomain] = useState<string>('');

  const handleAnalyze = async (domain: string) => {
    setIsLoading(true);
    setError(null);
    setCurrentDomain(domain);
    try {
      const result = await analyzeDomain(domain);
      setSegments(result.segments);
    } catch (err) {
      console.error(err);
      setError('An error occurred while analyzing the domain. Please try again.');
      setSegments([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-24">
      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent pointer-events-none" />

      {/* Header */}
      <header className="pt-16 pb-12 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap className="w-3 h-3 fill-current" />
          <span>SEO Analysis Engine</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
          Structured Data tool <br />
          <span className="text-blue-600">& Segment overview</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg">
          Instantly detect key website structures and generate validated JSON-LD schema for every segment of your domain.
        </p>
      </header>

      <main className="px-4">
        {/* Input Section */}
        <DomainForm onAnalyze={handleAnalyze} isLoading={isLoading} />

        {/* Status Messaging */}
        {isLoading && (
          <div className="max-w-2xl mx-auto mt-20 text-center animate-pulse">
            <div className="inline-block p-4 rounded-full bg-blue-50 text-blue-600 mb-4">
              <BarChart3 className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Analyzing Domain Architecture...</h2>
            <p className="text-slate-500">Detecting segments and generating structured data snippets.</p>
          </div>
        )}

        {error && (
          <div className="max-w-2xl mx-auto mt-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-center gap-4 text-red-700">
            <AlertCircle className="w-6 h-6 shrink-0" />
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && segments.length > 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <ExportButtons segments={segments} domain={currentDomain} />
            <ResultsView segments={segments} />
            
            {/* Footer Trust Indicator */}
            <div className="mt-20 flex flex-col items-center justify-center gap-6 opacity-40 grayscale pointer-events-none select-none">
              <div className="flex gap-12 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">SEO VALIDATED</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layout className="w-5 h-5" />
                  <span className="font-bold text-xl uppercase tracking-tighter">SCHEMA.ORG</span>
                </div>
              </div>
              <p className="text-xs font-medium">Automated Structured Data Architect v1.0</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && segments.length === 0 && !error && (
          <div className="mt-20 max-w-lg mx-auto grid grid-cols-2 gap-4">
            {[
              { label: 'Segment Detection', desc: 'Auto-identify categories' },
              { label: 'URL Mapping', desc: 'Pattern-based examples' },
              { label: 'JSON-LD', desc: 'W3C Compliant code' },
              { label: 'Batch Export', desc: 'XLSX & PPT ready' },
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <h4 className="font-bold text-slate-800 mb-1">{feature.label}</h4>
                <p className="text-sm text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
