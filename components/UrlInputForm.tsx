
import React, { useState } from 'react';
import { Send, Link2 } from 'lucide-react';

interface UrlInputFormProps {
  onAnalyze: (urls: string[]) => void;
  isLoading: boolean;
}

const UrlInputForm: React.FC<UrlInputFormProps> = ({ onAnalyze, isLoading }) => {
  const [urlInput, setUrlInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urls = urlInput
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0 && (u.startsWith('http') || u.includes('.')));
    
    if (urls.length > 0) {
      onAnalyze(urls);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100 transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-500/10">
        <div className="flex items-center gap-2 mb-4 text-slate-500 font-semibold text-sm px-2">
          <Link2 className="w-4 h-4" />
          <span>Enter one URL per line</span>
        </div>
        <textarea
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://example.com/products/item-1&#10;https://example.com/blog/how-to-seo&#10;https://example.com/about"
          disabled={isLoading}
          rows={8}
          className="block w-full p-4 border-2 border-slate-100 bg-slate-50 rounded-2xl text-lg transition-all duration-300 placeholder:text-slate-300 outline-none focus:border-blue-500 focus:bg-white resize-none font-mono text-sm"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={isLoading || !urlInput.trim()}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-5 w-5" />
            )}
            <span>Generate Structured Data</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UrlInputForm;
