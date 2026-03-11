export interface IOC {
  id: string;
  type: 'IP' | 'Domain' | 'Hash';
  value: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  timestamp: string;
}

export interface ThreatInfo {
  name: string;
  description: string;
  howItWorks: string;
  attackerMethod: string;
  impact: string;
}
