import React, { useState } from 'react';
import { Database, Plus, Trash2, ShieldAlert, Globe, Hash, Search, Filter } from 'lucide-react';
import { IOC } from '../types';

const initialIOCs: IOC[] = [
  {
    id: '1',
    type: 'IP',
    value: '185.123.45.67',
    description: 'Known Cobalt Strike C2 server',
    severity: 'Critical',
    timestamp: '2026-03-11 09:00:00'
  },
  {
    id: '2',
    type: 'Domain',
    value: 'secure-login-bank.xyz',
    description: 'Phishing domain targeting financial institutions',
    severity: 'High',
    timestamp: '2026-03-11 10:15:00'
  },
  {
    id: '3',
    type: 'Hash',
    value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    description: 'SHA-256 of LockBit ransomware variant',
    severity: 'Critical',
    timestamp: '2026-03-11 11:30:00'
  }
];

export default function IOCTracker() {
  const [iocs, setIocs] = useState<IOC[]>(initialIOCs);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredIOCs = iocs.filter(ioc => 
    ioc.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ioc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      default: return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IP': return <Globe className="w-4 h-4" />;
      case 'Domain': return <Search className="w-4 h-4" />;
      case 'Hash': return <Hash className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white">IOC Collection Module</h2>
          <p className="text-slate-400">Track and manage Indicators of Compromise used for threat detection.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black font-bold rounded-xl hover:bg-emerald-600 transition-all">
          <Plus className="w-4 h-4" />
          Add New IOC
        </button>
      </div>

      <div className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search IOCs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400 hover:text-white flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/5">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/5">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Value</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Severity</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredIOCs.map((ioc) => (
              <tr key={ioc.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-slate-300">
                    <div className="p-1.5 rounded-lg bg-white/5 text-slate-500 group-hover:text-emerald-500 transition-colors">
                      {getTypeIcon(ioc.type)}
                    </div>
                    <span className="text-sm font-medium">{ioc.type}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-mono text-emerald-400">{ioc.value}</span>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-slate-400 max-w-xs truncate">{ioc.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${getSeverityColor(ioc.severity)}`}>
                    {ioc.severity}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex gap-6 items-start">
        <div className="p-3 rounded-xl bg-blue-500/10">
          <ShieldAlert className="w-6 h-6 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h4 className="text-lg font-bold text-white">SOC Team Usage</h4>
          <p className="text-sm text-slate-400 leading-relaxed">
            Security Operations Center (SOC) teams use these IOCs to configure SIEM rules, firewall blocks, 
            and endpoint detection (EDR) policies. When a match is found, an alert is triggered for immediate investigation.
          </p>
        </div>
      </div>
    </div>
  );
}
