/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  Database, 
  AlertTriangle, 
  FileText, 
  Code, 
  LayoutDashboard,
  Info,
  ChevronRight,
  Menu,
  X,
  Lock,
  Globe,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Overview from './components/Overview';
import ThreatAnalysis from './components/ThreatAnalysis';
import OSINTModule from './components/OSINTModule';
import IOCTracker from './components/IOCTracker';
import SystemArchitecture from './components/SystemArchitecture';
import CodeSamples from './components/CodeSamples';
import Recommendations from './components/Recommendations';

type Tab = 'overview' | 'threats' | 'osint' | 'ioc' | 'arch' | 'code' | 'recs';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'overview', label: 'Project Overview', icon: Info },
    { id: 'threats', label: 'Threat Analysis', icon: AlertTriangle },
    { id: 'osint', label: 'OSINT Investigation', icon: Search },
    { id: 'ioc', label: 'IOC Collection', icon: Database },
    { id: 'arch', label: 'System Architecture', icon: Activity },
    { id: 'code', label: 'Implementation Code', icon: Code },
    { id: 'recs', label: 'Recommendations', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <Overview />;
      case 'threats': return <ThreatAnalysis />;
      case 'osint': return <OSINTModule />;
      case 'ioc': return <IOCTracker />;
      case 'arch': return <SystemArchitecture />;
      case 'code': return <CodeSamples />;
      case 'recs': return <Recommendations />;
      default: return <Overview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-200 font-sans selection:bg-emerald-500/30">
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-40 h-screen transition-transform bg-[#111113] border-r border-white/5 ${
          isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-0'
        }`}
      >
        <div className="flex flex-col h-full px-3 py-4 overflow-y-auto">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">ThreatMonitor</span>
          </div>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={`flex items-center w-full gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === item.id 
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                <item.icon className={`w-4 h-4 ${activeTab === item.id ? 'text-emerald-400' : ''}`} />
                {item.label}
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="ml-auto"
                  >
                    <ChevronRight className="w-3 h-3" />
                  </motion.div>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <div className="px-3 py-4 bg-white/5 rounded-xl border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-2">Intern Status</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-300 font-medium">Monitoring Active</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-4 bg-[#0A0A0B]/80 backdrop-blur-md border-bottom border-white/5">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isSidebarOpen ? <Menu className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h1 className="text-sm font-semibold text-slate-400 uppercase tracking-widest">
              {navItems.find(i => i.id === activeTab)?.label}
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-xs text-slate-400">Global Intel Feed: <span className="text-emerald-400 font-mono">STABLE</span></span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-xs font-bold text-black">
              TI
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
