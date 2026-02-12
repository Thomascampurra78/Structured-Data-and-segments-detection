
import React, { useState } from 'react';
import { Search, Globe } from 'lucide-react';

interface DomainFormProps {
  onAnalyze: (domain: string) => void;
  isLoading: boolean;
}

const DomainForm: React.FC<DomainFormProps> = ({ onAnalyze, isLoading }) => {
  const [domain, setDomain] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain.trim()) {
      onAnalyze(domain.trim());
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Globe className="h-5 w-5 text-slate-400" />
        </div>
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter domain (e.g., amazon.com, apple.com)..."
          disabled={isLoading}
          className="block w-full pl-11 pr-32 py-4 border-none bg-white rounded-2xl shadow-xl focus:ring-4 focus:ring-blue-500/20 text-lg transition-all duration-300 placeholder:text-slate-400 outline-none"
        />
        <button
          type="submit"
          disabled={isLoading || !domain.trim()}
          className="absolute right-2 top-2 bottom-2 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
          <span>Analyze</span>
        </button>
      </form>
    </div>
  );
};

export default DomainForm;
