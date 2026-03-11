import React, { useState } from 'react';
import { Copy, Check, Terminal, Code } from 'lucide-react';

const samples = [
  {
    id: 'lookup',
    title: 'Domain Lookup (WHOIS)',
    language: 'python',
    code: `import whois

def investigate_domain(domain_name):
    try:
        w = whois.whois(domain_name)
        print(f"Registrar: {w.registrar}")
        print(f"Creation Date: {w.creation_date}")
        print(f"Expiration Date: {w.expiration_date}")
        return w
    except Exception as e:
        print(f"Error investigating {domain_name}: {e}")

# Example Usage
investigate_domain("google.com")`
  },
  {
    id: 'ioc',
    title: 'IOC Storage (SQLite)',
    language: 'python',
    code: `import sqlite3

def init_db():
    conn = sqlite3.connect('threat_intel.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS iocs
                 (id INTEGER PRIMARY KEY, type TEXT, value TEXT, severity TEXT)''')
    conn.commit()
    conn.close()

def add_ioc(ioc_type, value, severity):
    conn = sqlite3.connect('threat_intel.db')
    c = conn.cursor()
    c.execute("INSERT INTO iocs (type, value, severity) VALUES (?, ?, ?)", 
              (ioc_type, value, severity))
    conn.commit()
    conn.close()

init_db()
add_ioc('IP', '192.168.1.100', 'High')`
  },
  {
    id: 'dashboard',
    title: 'Basic Monitoring Dashboard (Flask)',
    language: 'python',
    code: `from flask import Flask, render_template
import sqlite3

app = Flask(__name__)

@app.route('/')
def dashboard():
    conn = sqlite3.connect('threat_intel.db')
    c = conn.cursor()
    c.execute("SELECT * FROM iocs")
    iocs = c.fetchall()
    conn.close()
    return render_template('dashboard.html', iocs=iocs)

if __name__ == '__main__':
    app.run(debug=True)`
  }
];

export default function CodeSamples() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        <h2 className="text-3xl font-bold text-white">Sample Implementation Code</h2>
        <p className="text-slate-400 max-w-2xl">
          Practical Python examples demonstrating the core functionality of the Threat Monitoring System.
        </p>
      </div>

      <div className="space-y-8">
        {samples.map((sample) => (
          <div key={sample.id} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-lg font-bold text-white">{sample.title}</h3>
              </div>
              <button 
                onClick={() => copyToClipboard(sample.id, sample.code)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white transition-all"
              >
                {copiedId === sample.id ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-500" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    Copy Code
                  </>
                )}
              </button>
            </div>

            <div className="relative group">
              <div className="absolute -inset-px bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <pre className="relative p-6 rounded-xl bg-[#0D0D0F] border border-white/5 overflow-x-auto font-mono text-sm leading-relaxed text-slate-300">
                <code className="language-python">
                  {sample.code}
                </code>
              </pre>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Code className="w-5 h-5 text-emerald-500" />
          Future Improvements
        </h3>
        <ul className="space-y-4">
          {[
            { title: "AI Threat Detection", desc: "Integrate machine learning models to identify zero-day threats and behavioral anomalies." },
            { title: "Automated Threat Feeds", desc: "Connect to commercial and open-source TAXII/STIX feeds for real-time IOC updates." },
            { title: "Real-time Monitoring", desc: "Implement WebSocket-based alerting for immediate notification of critical threats." }
          ].map((item, i) => (
            <li key={i} className="space-y-1">
              <h4 className="text-sm font-bold text-slate-200">{item.title}</h4>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
