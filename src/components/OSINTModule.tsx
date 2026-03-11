import React, { useState } from 'react';
import { Search, Globe, ShieldCheck, AlertTriangle, Loader2, Info, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function OSINTModule() {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleInvestigate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain) return;

    setLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Act as a Cybersecurity OSINT Analyst. Provide a simulated OSINT investigation report for the domain: "${domain}". 
        Include:
        1. Simulated WHOIS data (Registrar, Creation Date, Expiry).
        2. Potential Subdomains (list 3-5 common ones).
        3. Public IP Information (simulated).
        4. Security Assessment (Risk level: Low/Medium/High).
        5. How an attacker might misuse this info.
        
        Format the response as a JSON object with keys: whois, subdomains, ipInfo, riskLevel, securityAssessment, attackerMisuse.`,
        config: {
          responseMimeType: "application/json"
        }
      });

      const data = JSON.parse(response.text || '{}');
      setResult(data);
    } catch (error) {
      console.error("OSINT Investigation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">OSINT Domain Investigation</h2>
        <p className="text-slate-400 max-w-2xl">
          Collect publicly available data to identify potential threats. This module simulates the collection 
          of WHOIS, subdomains, and IP information used in real-world investigations.
        </p>
      </div>

      <form onSubmit={handleInvestigate} className="flex gap-4 p-6 rounded-2xl bg-white/5 border border-white/5">
        <div className="relative flex-1">
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Enter domain (e.g., example.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        <button 
          disabled={loading}
          className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold rounded-xl transition-all flex items-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          Investigate
        </button>
      </form>

      {result && (
        <div className="grid md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-500" />
                WHOIS & IP Info
              </h3>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                result.riskLevel === 'High' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                result.riskLevel === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
              }`}>
                Risk: {result.riskLevel}
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(result.whois || {}).map(([key, value]: [string, any]) => (
                  <div key={key}>
                    <p className="text-[10px] text-slate-500 uppercase font-bold">{key}</p>
                    <p className="text-sm text-slate-300">{value}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Public IP Address</p>
                <p className="text-sm font-mono text-emerald-400">{result.ipInfo}</p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              Subdomains Found
            </h3>
            <div className="grid gap-2">
              {result.subdomains?.map((sub: string, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5 group hover:border-emerald-500/30 transition-all">
                  <span className="text-sm text-slate-300 font-mono">{sub}</span>
                  <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-emerald-500" />
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="text-lg font-bold text-white">Security Assessment</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">{result.securityAssessment}</p>
            
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-amber-500">How attackers misuse this info</h4>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed italic">{result.attackerMisuse}</p>
            </div>
          </div>
        </div>
      )}

      {!result && !loading && (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4 opacity-50">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-slate-500">Enter a domain above to start an OSINT investigation.</p>
        </div>
      )}
    </div>
  );
}
