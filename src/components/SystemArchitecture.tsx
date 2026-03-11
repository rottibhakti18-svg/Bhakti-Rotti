import React from 'react';
import { Layers, Database, Search, Activity, FileText, ArrowRight } from 'lucide-react';

const modules = [
  {
    id: 'monitoring',
    name: 'Threat Monitoring Module',
    icon: Activity,
    desc: 'Continuously monitors network traffic and logs for suspicious patterns.'
  },
  {
    id: 'osint',
    name: 'OSINT Data Collection',
    icon: Search,
    desc: 'Gathers external intelligence from WHOIS, Shodan, and VirusTotal APIs.'
  },
  {
    id: 'database',
    name: 'IOC Database',
    icon: Database,
    desc: 'Stores and categorizes malicious IPs, domains, and file hashes.'
  },
  {
    id: 'analysis',
    name: 'Threat Analysis Engine',
    icon: Layers,
    desc: 'Correlates monitored data with IOCs and OSINT to identify active threats.'
  },
  {
    id: 'reporting',
    name: 'Reporting Dashboard',
    icon: FileText,
    desc: 'Visualizes threats and provides actionable insights for security teams.'
  }
];

export default function SystemArchitecture() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">System Architecture</h2>
        <p className="text-slate-400 max-w-2xl">
          The system is built using a modular architecture that separates data collection, 
          storage, analysis, and visualization.
        </p>
      </div>

      <div className="relative">
        {/* Visual Flow */}
        <div className="grid md:grid-cols-5 gap-4">
          {modules.map((module, i) => (
            <div key={module.id} className="relative flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                <module.icon className="w-8 h-8 text-emerald-500" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">{module.name}</h4>
                <p className="text-[10px] text-slate-500 leading-tight px-2">{module.desc}</p>
              </div>
              {i < modules.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 z-10">
                  <ArrowRight className="w-4 h-4 text-slate-700" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Connecting Line */}
        <div className="hidden md:block absolute top-8 left-8 right-8 h-px bg-slate-800 -z-10" />
      </div>

      <div className="grid md:grid-cols-2 gap-8 pt-8">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4">
          <h3 className="text-xl font-bold text-white">Data Flow</h3>
          <ol className="space-y-4">
            {[
              { step: "1", title: "Ingestion", desc: "Network logs and external feeds are ingested into the system." },
              { step: "2", title: "Enrichment", desc: "OSINT Module enriches raw data with registrar and reputation info." },
              { step: "3", title: "Correlation", desc: "Analysis Engine matches enriched data against the IOC Database." },
              { step: "4", title: "Visualization", desc: "Results are pushed to the Dashboard for human review." }
            ].map((item) => (
              <li key={item.step} className="flex gap-4">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {item.step}
                </span>
                <div>
                  <h5 className="text-sm font-bold text-slate-200">{item.title}</h5>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-6">
          <h3 className="text-xl font-bold text-white">Technologies Used</h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Language", value: "Python / TypeScript" },
              { label: "Frontend", value: "React / Tailwind" },
              { label: "Database", value: "SQLite / Firestore" },
              { label: "APIs", value: "WHOIS, Shodan, VT" },
              { label: "Framework", value: "Flask / Express" },
              { label: "Intelligence", value: "Gemini AI" }
            ].map((tech) => (
              <div key={tech.label} className="p-3 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">{tech.label}</p>
                <p className="text-sm text-emerald-400 font-medium">{tech.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
