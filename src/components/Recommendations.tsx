import React from 'react';
import { ShieldCheck, Users, Mail, Network, RefreshCw, Database, CheckCircle2 } from 'lucide-react';

const recs = [
  {
    title: "Employee Security Awareness Training",
    desc: "Educate staff on identifying phishing attempts and social engineering tactics.",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-400/10"
  },
  {
    title: "Email Filtering & Security",
    desc: "Implement advanced email security solutions to block malicious attachments and links.",
    icon: Mail,
    color: "text-emerald-400",
    bg: "bg-emerald-400/10"
  },
  {
    title: "Continuous Network Monitoring",
    desc: "Deploy IDS/IPS and SIEM solutions to detect and respond to anomalies in real-time.",
    icon: Network,
    color: "text-purple-400",
    bg: "bg-purple-400/10"
  },
  {
    title: "Regular Security Updates",
    desc: "Maintain a strict patching schedule for all software, operating systems, and firmware.",
    icon: RefreshCw,
    color: "text-amber-400",
    bg: "bg-amber-400/10"
  },
  {
    title: "Robust Data Backup Strategy",
    desc: "Implement the 3-2-1 backup rule with offline, immutable backups to defend against ransomware.",
    icon: Database,
    color: "text-red-400",
    bg: "bg-red-400/10"
  }
];

export default function Recommendations() {
  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Threat Monitoring Summary & Recommendations</h2>
        <p className="text-slate-400 max-w-2xl">
          Based on our threat analysis and monitoring data, we recommend the following defensive measures 
          to harden the organizational security posture.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {recs.map((rec, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all flex gap-6">
            <div className={`shrink-0 w-12 h-12 rounded-xl ${rec.bg} flex items-center justify-center`}>
              <rec.icon className={`w-6 h-6 ${rec.color}`} />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{rec.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{rec.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="text-xl font-bold text-white">Implementation Checklist</h3>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {[
            "Enable Multi-Factor Authentication (MFA) everywhere",
            "Implement Least Privilege Access Control",
            "Conduct regular vulnerability assessments",
            "Establish an Incident Response Plan",
            "Monitor for leaked credentials on the Dark Web",
            "Segment the network to contain potential breaches"
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-xs text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
