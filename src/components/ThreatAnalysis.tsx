import React from 'react';
import { Mail, ShieldAlert, Zap, Skull, Globe, Server } from 'lucide-react';

const threats = [
  {
    id: 'phishing',
    name: 'Phishing Attacks',
    icon: Mail,
    color: 'text-blue-400',
    bg: 'bg-blue-400/10',
    howItWorks: 'Attackers send fraudulent communications (emails, SMS) that appear to come from a reputable source.',
    attackerMethod: 'Using social engineering to trick victims into revealing sensitive data like login credentials or credit card numbers.',
    impact: 'Credential theft, unauthorized access to corporate accounts, and financial loss.'
  },
  {
    id: 'ransomware',
    name: 'Ransomware Attacks',
    icon: Skull,
    color: 'text-red-400',
    bg: 'bg-red-400/10',
    howItWorks: 'Malicious software that encrypts a victim\'s files. The attacker then demands a ransom from the victim to restore access.',
    attackerMethod: 'Often delivered via phishing or exploiting unpatched vulnerabilities in network software.',
    impact: 'Complete business disruption, permanent data loss, and massive financial extortion.'
  },
  {
    id: 'ddos',
    name: 'DDoS Attacks',
    icon: Zap,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    howItWorks: 'Distributed Denial of Service aims to crash a server or network by flooding it with overwhelming traffic from multiple sources.',
    attackerMethod: 'Utilizing botnets (networks of compromised devices) to send massive amounts of requests simultaneously.',
    impact: 'Service unavailability, loss of customer trust, and operational downtime.'
  }
];

export default function ThreatAnalysis() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Cyber Threat Analysis</h2>
        <p className="text-slate-400 max-w-2xl">
          Understanding the mechanics of modern cyber attacks is the first step in building a robust defense. 
          Here we analyze the most prevalent threats monitored by our system.
        </p>
      </div>

      <div className="grid gap-6">
        {threats.map((threat) => (
          <div key={threat.id} className="p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3 space-y-4">
                <div className={`w-14 h-14 rounded-2xl ${threat.bg} flex items-center justify-center`}>
                  <threat.icon className={`w-7 h-7 ${threat.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-white">{threat.name}</h3>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                  <ShieldAlert className="w-3 h-3" />
                  High Severity
                </div>
              </div>
              
              <div className="md:w-2/3 grid sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300">How it Works</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{threat.howItWorks}</p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-300">Attacker Method</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{threat.attackerMethod}</p>
                </div>
                <div className="sm:col-span-2 p-4 rounded-xl bg-black/40 border border-white/5">
                  <h4 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-2">Organizational Impact</h4>
                  <p className="text-sm text-slate-300 italic">"{threat.impact}"</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
        <div className="flex items-center gap-4 mb-4">
          <Server className="w-6 h-6 text-emerald-400" />
          <h3 className="text-xl font-bold text-white">Monitoring Strategy</h3>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Our dashboard monitors these threats by correlating network logs with known IOCs and using OSINT 
          to identify infrastructure used by attackers before they launch their campaigns.
        </p>
      </div>
    </div>
  );
}
