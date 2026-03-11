import React from 'react';
import { Shield, Target, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Overview() {
  return (
    <div className="space-y-12">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
          <Shield className="w-3 h-3" />
          Project Overview
        </div>
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Cyber Threat Monitoring & <br />
          <span className="text-emerald-500">OSINT Intelligence Dashboard</span>
        </h2>
        <p className="text-lg text-slate-400 leading-relaxed max-w-3xl">
          A Threat Monitoring System is a critical security infrastructure designed to continuously observe, 
          detect, and analyze potential security threats in real-time. By integrating OSINT (Open Source Intelligence) 
          and IOC (Indicators of Compromise) tracking, organizations can shift from reactive to proactive defense.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Problem Statement</h3>
          <p className="text-slate-400 leading-relaxed">
            Modern organizations face a barrage of cyber threats daily. Without a centralized system to monitor 
            malicious activities, investigate suspicious domains, and track IOCs, security teams are often 
            overwhelmed, leading to delayed detection and increased risk of data breaches.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
            <Target className="w-6 h-6 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-white">Project Objectives</h3>
          <ul className="space-y-3">
            {[
              "Monitor real-time cyber threats and anomalies",
              "Perform deep OSINT-based domain investigations",
              "Maintain a centralized IOC tracking database",
              "Provide actionable security recommendations"
            ].map((obj, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-sm">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <section className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 space-y-6">
        <h3 className="text-xl font-bold text-white">Use Case: Monitoring Suspicious Domain Activity</h3>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Actors</h4>
              <p className="text-sm text-slate-300">Threat Monitoring Intern, SOC Team</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Preconditions</h4>
              <p className="text-sm text-slate-300">System is active; Domain intelligence feeds are connected.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Main Flow</h4>
              <ol className="list-decimal list-inside text-sm text-slate-300 space-y-1">
                <li>System detects a new domain communicating with the network.</li>
                <li>Intern initiates OSINT investigation via the dashboard.</li>
                <li>System retrieves WHOIS, IP, and reputation data.</li>
                <li>SOC Team reviews findings and marks domain as Malicious/Safe.</li>
              </ol>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Postconditions</h4>
              <p className="text-sm text-slate-300">Domain is added to IOC database; Firewall rules updated if malicious.</p>
            </div>
            <div>
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-1">Benefits</h4>
              <p className="text-sm text-slate-300">Early detection of C2 (Command & Control) servers; reduced dwell time of attackers.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
