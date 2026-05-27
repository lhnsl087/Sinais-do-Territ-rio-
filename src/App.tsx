/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  Leaf, 
  RefreshCw, 
  HeartPulse, 
  Eye, 
  X, 
  AlertTriangle, 
  Info,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Type imports
import { AppTab, Observation, Anomaly, CycleMetric, ObservationComment } from './types';

// Components
import Sidebar from './components/Sidebar';
import SignalsTab from './components/SignalsTab';
import CyclesTab from './components/CyclesTab';
import WellbeingTab from './components/WellbeingTab';
import ObserveTab from './components/ObserveTab';

// Initial default dataset
import { 
  INITIAL_OBSERVATIONS, 
  INITIAL_ANOMALIES, 
  INITIAL_CYCLE_METRICS 
} from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('signals');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Simulation scenario states
  const [scenario, setScenario] = useState<'Normal' | 'Drought' | 'Rain' | 'Mist'>('Normal');
  const [moistureUpper, setMoistureUpper] = useState(64);
  const [moistureBedrock, setMoistureBedrock] = useState(88);
  const [aqi, setAqi] = useState(8);
  const [oxygenYield, setOxygenYield] = useState(80);
  const [vitalityIndex, setVitalityIndex] = useState(72);
  const [syncFrequency, setSyncFrequency] = useState(0.4);
  const [scenarioName, setScenarioName] = useState<'Standard' | 'Dry Spelt' | 'Heavy Inundation' | 'Morning Mist'>('Standard');
  const [scenarioDescription, setScenarioDescription] = useState('The territory is currently in a steady state of inhalation. Moisture levels are rising in the lower canopy.');

  // Simulated Time drag
  const [timeShiftHours, setTimeShiftHours] = useState(0);

  // Dynamic system metrics list
  const [cycleMetrics, setCycleMetrics] = useState<CycleMetric[]>(INITIAL_CYCLE_METRICS);
  const [anomalies, setAnomalies] = useState<Anomaly[]>(INITIAL_ANOMALIES);
  const [observations, setObservations] = useState<Observation[]>(() => {
    const saved = localStorage.getItem('territory_observations');
    return saved ? JSON.parse(saved) : INITIAL_OBSERVATIONS;
  });

  // Selected anomaly modal state
  const [selectedAnomaly, setSelectedAnomaly] = useState<Anomaly | null>(null);

  // Quick info alert bar state
  const [systemAlert, setSystemAlert] = useState<string | null>(
    'Morning dew levels point to optimized canopy respiration cycles.'
  );

  // Save observations with localStorage persistence
  useEffect(() => {
    localStorage.setItem('territory_observations', JSON.stringify(observations));
  }, [observations]);

  // Adjust system biometrics based on environment scenario changes
  useEffect(() => {
    switch (scenario) {
      case 'Normal':
        setMoistureUpper(64);
        setMoistureBedrock(88);
        setAqi(8);
        setOxygenYield(80);
        setVitalityIndex(72);
        setSyncFrequency(0.4);
        setScenarioName('Standard');
        setScenarioDescription('The territory is currently in a steady state of inhalation. Moisture levels are rising in the lower canopy.');
        break;
      case 'Drought':
        setMoistureUpper(22);
        setMoistureBedrock(46);
        setAqi(34);
        setOxygenYield(45);
        setVitalityIndex(44);
        setSyncFrequency(0.18);
        setScenarioName('Dry Spelt');
        setScenarioDescription('High solar radiation has accelerated transpiration loss. Soil layers are constricting hydration vectors to safeguard core roots.');
        break;
      case 'Rain':
        setMoistureUpper(96);
        setMoistureBedrock(92);
        setAqi(2);
        setOxygenYield(95);
        setVitalityIndex(88);
        setSyncFrequency(0.68);
        setScenarioName('Heavy Inundation');
        setScenarioDescription('Active heavy rainfall has saturated the superficial humus. Silt channels are flowing, rapidly refilling bed aquifer zones.');
        break;
      case 'Mist':
        setMoistureUpper(78);
        setMoistureBedrock(85);
        setAqi(4);
        setOxygenYield(86);
        setVitalityIndex(81);
        setSyncFrequency(0.52);
        setScenarioName('Morning Mist');
        setScenarioDescription('High density fog has blanketted the pine basin. Atmospheric moisture has minimized direct vegetation water loss.');
        break;
    }
  }, [scenario]);

  // Handle time advance simulator
  const handleAdvanceHours = (hours: number) => {
    setTimeShiftHours(prev => prev + hours);

    // Dynamic wave shift calculates: slightly cycle soil layers and sap metrics
    setMoistureUpper(prev => {
      const delta = Math.sin(hours / 12) * 5;
      return Math.min(100, Math.max(10, Math.round(prev + delta)));
    });

    setVitalityIndex(prev => {
      const delta = Math.cos(hours / 24) * 4;
      return Math.min(100, Math.max(20, Math.round(prev + delta)));
    });

    // Cycle internal statuses list based on timeShift hours
    setCycleMetrics(prev => 
      prev.map(metric => {
        let newPercent = metric.percentage + Math.round(Math.sin((hours + timeShiftHours) / 10) * 8);
        newPercent = Math.min(100, Math.max(15, newPercent));
        
        // Pick new status dynamically
        let stat = metric.status;
        if (newPercent > 80) stat = 'Peaking';
        else if (newPercent < 45) stat = 'Waning';
        else stat = 'Rising';

        return {
          ...metric,
          percentage: newPercent,
          status: stat
        };
      })
    );

    // Trigger notification
    setSystemAlert(`System rhythms updated. Resonator successfully simulated +${hours} hours temporal shift.`);
    setTimeout(() => {
      setSystemAlert(null);
    }, 5000);
  };

  // Observations handlings
  const handleAddObservation = (newObs: Omit<Observation, 'id' | 'likes' | 'commentsCount' | 'comments' | 'timeAgo' | 'isLikedByMe'>) => {
    const fresh: Observation = {
      ...newObs,
      id: `obs-${Date.now()}`,
      likes: 0,
      commentsCount: 0,
      comments: [],
      timeAgo: 'Just now',
      isLikedByMe: false
    };

    setObservations(prev => [fresh, ...prev]);
    setSystemAlert(`Success! Logged field observation in Sector "${fresh.sector}"!`);
    setTimeout(() => {
      setSystemAlert(null);
    }, 4500);
  };

  const handleToggleLike = (id: string) => {
    setObservations(prev => 
      prev.map(obs => {
        if (obs.id === id) {
          const isLiked = !obs.isLikedByMe;
          return {
            ...obs,
            isLikedByMe: isLiked,
            likes: isLiked ? obs.likes + 1 : obs.likes - 1
          };
        }
        return obs;
      })
    );
  };

  const handleAddComment = (obsId: string, authorName: string, commentText: string) => {
    setObservations(prev => 
      prev.map(obs => {
        if (obs.id === obsId) {
          const freshComment: ObservationComment = {
            id: `com-${Date.now()}`,
            authorName,
            commentText,
            timeAgo: 'Just now'
          };
          return {
            ...obs,
            comments: [...obs.comments, freshComment],
            commentsCount: obs.comments.length + 1
          };
        }
        return obs;
      })
    );
  };

  return (
    <div className="relative bg-white text-[#111c15] min-h-[100dvh] font-sans pb-32 flex flex-col justify-between selection:bg-[#2a5235]/10 selection:text-[#2a5235] overflow-x-hidden">
      
      {/* Animated-style Mesh Background for Frosted Glass Theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-200 rounded-full blur-[120px] opacity-25"></div>
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-green-200 rounded-full blur-[160px] opacity-20"></div>
        <div className="absolute -bottom-48 left-1/3 w-[600px] h-[600px] bg-teal-200 rounded-full blur-[140px] opacity-25"></div>
      </div>

      {/* TopAppBar Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-white/40 backdrop-blur-xl flex justify-between items-center px-6 md:px-14 py-4 border-b border-outline shadow-sm relative z-40">
        <div className="flex items-center gap-4 relative z-50">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-primary hover:text-secondary transition-colors duration-300 p-1 rounded-full hover:bg-black/5"
            aria-label="Open menu"
            id="menu-btn"
          >
            <Menu size={22} />
          </button>
          <h1 className="font-serif font-bold text-lg md:text-xl text-primary tracking-tight">Territory Signals</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6 items-center">
            <button 
              onClick={() => setActiveTab('observe')}
              className="font-sans text-xs font-semibold text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-wider"
            >
              Archive
            </button>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="font-sans text-xs font-semibold text-on-surface-variant hover:text-secondary transition-colors uppercase tracking-wider"
            >
              Guidelines
            </button>
          </div>

          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="w-9 h-9 rounded-full overflow-hidden border border-outline-variant pointer-events-auto hover:ring-2 hover:ring-secondary/50 transition-all shadow-sm"
          >
            <img 
              alt="Community member profile" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5BCvg1k6inoEmarAAU05wLiWBb4Obm6_JQZoH5HpOJBvE_Cbpv0x8OjPwpnwVq8z_dFkRo4NKqZLEyyxIyxinsMz-CxSw7glp3ydaQz_E2_LT0eb43u0RVqQbpVR5lM7ZYF10W6cg54y7etwGAs1CRU-ft6Qp2Y1oPXv_wySkDrQlISMKeg8j8G4jx3L43G-5Xi2rFbVnfa9bgKRBKj34FU_lAzkLm2NOb8IRnu_X6a3-8_lO3V2xnR0UX8DFC6ytuF4Ay97-Xlzr"
            />
          </button>
        </div>
      </header>

      {/* Floating System-wide notifications banner */}
      <AnimatePresence>
        {systemAlert && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-full max-w-md px-4 pointer-events-none"
          >
            <div className="bg-slate-900/80 backdrop-blur-xl text-white p-3.5 rounded-full shadow-lg text-xs font-semibold flex items-center justify-between pointer-events-auto gap-3 border border-white/10">
              <div className="flex items-center gap-2">
                <Leaf size={14} className="text-secondary shrink-0" />
                <span className="line-clamp-1">{systemAlert}</span>
              </div>
              <button 
                onClick={() => setSystemAlert(null)}
                className="p-1 hover:bg-white/15 rounded-full text-white/80"
              >
                <X size={12} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Sidebar guidelines/Archive */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigateTab={(tab) => setActiveTab(tab)}
      />

      {/* Main Canvas Segment */}
      <main className="pt-24 pb-16 px-6 md:px-14 max-w-6xl mx-auto w-full flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            {activeTab === 'signals' && (
              <SignalsTab 
                moistureUpper={moistureUpper}
                moistureBedrock={moistureBedrock}
                aqi={aqi}
                oxygenYield={oxygenYield}
                vitalityIndex={vitalityIndex}
                syncFrequency={syncFrequency}
                scenarioName={scenarioName}
                scenarioDescription={scenarioDescription}
                onSelectScenario={(preset) => setScenario(preset)}
                anomalies={anomalies}
                onSelectAnomaly={(anom) => setSelectedAnomaly(anom)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'cycles' && (
              <CyclesTab 
                timeShiftHours={timeShiftHours}
                onAdvanceHours={handleAdvanceHours}
                cycleMetrics={cycleMetrics}
              />
            )}

            {activeTab === 'wellbeing' && (
              <WellbeingTab />
            )}

            {activeTab === 'observe' && (
              <ObserveTab 
                observations={observations}
                onAddObservation={handleAddObservation}
                onToggleLike={handleToggleLike}
                onAddComment={handleAddComment}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Menu Footer */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-white/70 backdrop-blur-xl flex justify-around items-center px-4 pb-7 pt-3.5 rounded-t-3xl border-t border-outline/30 shadow-lg">
        <button 
          onClick={() => setActiveTab('signals')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'signals' 
              ? 'bg-primary/10 text-primary border border-primary/20 px-5 py-1 rounded-full scale-105 shadow-md shadow-emerald-500/5' 
              : 'text-[#415347] hover:text-primary'
          }`}
          id="tab-signals"
        >
          <Leaf size={18} />
          <span className="font-sans font-bold text-[10px] mt-1 tracking-wider uppercase">Signals</span>
        </button>

        <button 
          onClick={() => setActiveTab('cycles')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'cycles' 
              ? 'bg-primary/10 text-primary border border-primary/20 px-5 py-1 rounded-full scale-105 shadow-md shadow-emerald-500/5' 
              : 'text-[#415347] hover:text-primary'
          }`}
          id="tab-cycles"
        >
          <RefreshCw size={18} />
          <span className="font-sans font-bold text-[10px] mt-1 tracking-wider uppercase">Cycles</span>
        </button>

        <button 
          onClick={() => setActiveTab('wellbeing')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'wellbeing' 
              ? 'bg-primary/10 text-primary border border-primary/20 px-5 py-1 rounded-full scale-105 shadow-md shadow-emerald-500/5' 
              : 'text-[#415347] hover:text-primary'
          }`}
          id="tab-wellbeing"
        >
          <HeartPulse size={18} />
          <span className="font-sans font-bold text-[10px] mt-1 tracking-wider uppercase">Wellbeing</span>
        </button>

        <button 
          onClick={() => setActiveTab('observe')}
          className={`flex flex-col items-center justify-center transition-all cursor-pointer ${
            activeTab === 'observe' 
              ? 'bg-primary/10 text-primary border border-primary/20 px-5 py-1 rounded-full scale-105 shadow-md shadow-emerald-500/5' 
              : 'text-[#415347] hover:text-primary'
          }`}
          id="tab-observe"
        >
          <Eye size={18} />
          <span className="font-sans font-bold text-[10px] mt-1 tracking-wider uppercase">Observe</span>
        </button>
      </nav>

      {/* Selected anomaly detail modal/sheet */}
      <AnimatePresence>
        {selectedAnomaly && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAnomaly(null)}
              className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-surface relative w-full max-w-sm rounded-3xl p-6 stone-card shadow-2xl space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 bg-secondary-fixed text-on-secondary-fixed rounded-full">
                    <AlertTriangle size={18} />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-primary">Anomaly Signal Alert</h3>
                    <p className="font-mono text-[9px] text-outline uppercase">Area: {selectedAnomaly.sector}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedAnomaly(null)}
                  className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="bg-surface-container p-4 rounded-2xl space-y-2">
                <p className="text-[13px] font-sans font-bold text-primary">{selectedAnomaly.title}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {selectedAnomaly.title === 'Creek Silt Increase' 
                    ? 'A rapid surge in particulate sediment detected at the Gorge Bend inlet. This indicates a high rate of spring frost melt water erosion upstream.'
                    : 'The ferns in gully sector G2 are expanding their core leaf structures 48 hours earlier than standard solar indexes prediction.'}
                </p>
              </div>

              <div className="bg-primary-fixed/20 p-3 rounded-xl border border-primary/10 flex gap-2 items-start">
                <Info size={14} className="text-primary mt-0.5 shrink-0" />
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  <strong>Guardian Action:</strong> Inspect nearby channels for blockages or consider entering a manual soil hydration sample.
                </p>
              </div>

              <div className="flex justify-end gap-2 text-xs font-semibold pt-2">
                <button 
                  onClick={() => setSelectedAnomaly(null)}
                  className="px-4 py-1.5 bg-surface-container hover:bg-surface-container-high rounded-full text-primary"
                >
                  Dismiss
                </button>
                <button 
                  onClick={() => { setSelectedAnomaly(null); setActiveTab('observe'); }}
                  className="px-4 py-1.5 bg-primary hover:bg-secondary text-white rounded-full flex items-center gap-1.5 shadow-sm"
                >
                  <span>Read Field logs</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
