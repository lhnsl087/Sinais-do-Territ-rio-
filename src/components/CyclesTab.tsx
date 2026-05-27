/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { RefreshCw, Clock, Moon, Layers, Sun, Zap, Sparkles, ChevronRight, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CycleMetric } from '../types';

interface CyclesTabProps {
  timeShiftHours: number;
  onAdvanceHours: (hours: number) => void;
  cycleMetrics: CycleMetric[];
}

export default function CyclesTab({ timeShiftHours, onAdvanceHours, cycleMetrics }: CyclesTabProps) {
  const [selectedCycle, setSelectedCycle] = useState<CycleMetric | null>(cycleMetrics[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = (hours: number) => {
    setIsSimulating(true);
    onAdvanceHours(hours);
    setTimeout(() => {
      setIsSimulating(false);
    }, 600);
  };

  // Safe cyclic coordinate calculate helper for wave
  const createSinePath = (amp: number, freq: number, phase: number) => {
    let points = [];
    for (let x = 0; x <= 400; x += 10) {
      const y = 50 + Math.sin((x * freq + phase) * (Math.PI / 180)) * amp;
      points.push(`${x},${y}`);
    }
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="space-y-12">
      {/* Title Header */}
      <section className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 bg-secondary-fixed text-on-secondary-fixed text-xs font-bold rounded-full uppercase tracking-widest">
          <Moon size={12} className="text-secondary animate-pulse" />
          <span>Active Cycles</span>
        </div>
        <h2 className="font-serif font-bold text-3xl text-primary md:text-4xl tracking-tight">Ecosystem Rhythms</h2>
        <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
          The natural territory breathes in cyclical tides. By aligning with solar, lunar, and atmospheric waveforms, we measure the biological pulse of the soil and canopy.
        </p>
      </section>

      {/* Time Advance Simulation Deck */}
      <div className="stone-card bg-surface-container-low p-6 rounded-3xl space-y-4 relative overflow-hidden">
        {/* Abstract design dots */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#ff8f6f]/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="text-[10px] font-bold text-outline uppercase tracking-wider">Fast-Forward Engine</span>
            <h3 className="font-serif font-bold text-lg text-primary mt-0.5">Time Resonator</h3>
            <p className="text-xs text-on-surface-variant max-w-md mt-1">
              Advance the simulated system through seasons or lunar transitions. Watch moisture rings, sap pressures, and active pulses synch.
            </p>
          </div>
          
          <div className="flex gap-2.5">
            <button
              onClick={() => handleSimulate(6)}
              disabled={isSimulating}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 hover:bg-primary-container"
            >
              +6 Hours
            </button>
            <button
              onClick={() => handleSimulate(24)}
              disabled={isSimulating}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 hover:bg-primary-container"
            >
              +1 Day
            </button>
            <button
              onClick={() => handleSimulate(168)}
              disabled={isSimulating}
              className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-full transition-all active:scale-95 disabled:opacity-50 hover:bg-primary-container"
            >
              +1 Week
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-outline-variant/30 flex items-center justify-between font-mono text-xs">
          <span className="text-outline">CUMULATIVE TEMPORAL DRAG:</span>
          <span className="font-bold text-secondary text-right">
            {timeShiftHours === 0 ? 'Synchronous (0h deviation)' : `+${timeShiftHours} hours advanced`}
          </span>
        </div>
      </div>

      {/* Rhythmic Waves display */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Live Sine Wave Graphics */}
        <div className="md:col-span-8 bg-white/30 rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative min-h-[320px] stone-card">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Oscillosphere Feed</span>
              <h3 className="font-serif font-bold text-xl text-primary">Canopy Resonant Wave</h3>
            </div>
            {selectedCycle && (
              <span className="px-2.5 py-1 bg-primary/10 backdrop-blur-md rounded-full text-[10px] font-bold text-primary uppercase tracking-wider border border-primary/15">
                {selectedCycle.nextEpoch}
              </span>
            )}
          </div>

          {/* Core Wave Animation */}
          <div className="relative h-28 my-4 flex items-center justify-center">
            <svg className="w-full h-full text-primary/40" viewBox="0 0 400 100" preserveAspectRatio="none">
              <path 
                d={createSinePath(15, 1.5, timeShiftHours * 6)} 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
              />
              <path 
                d={createSinePath(25, 2.5, timeShiftHours * 4 + 45)} 
                fill="none" 
                stroke="var(--color-secondary)" 
                strokeWidth="2.5" 
                className="opacity-70"
              />
              <path 
                d={createSinePath(8, 0.8, timeShiftHours * 8 + 90)} 
                fill="none" 
                stroke="var(--color-tertiary)" 
                strokeWidth="1" 
                className="opacity-80"
              />
            </svg>
            
            <div className="absolute left-6 h-12 w-0.5 bg-secondary-container rounded-full animate-pulse top-1/2 -translate-y-1/2 shadow-lg" />
            <span className="absolute left-8 text-[9px] font-mono text-primary uppercase tracking-widest">
              Live Phase Align
            </span>
          </div>

          {/* Wave descriptor bar */}
          <div className="relative z-10 grid grid-cols-3 gap-2 pt-4 border-t border-outline font-sans text-xs">
            <div>
              <span className="block opacity-65 text-[10px] uppercase">Rhythm Speed</span>
              <span className="font-serif text-sm text-secondary font-semibold">Daily Peak</span>
            </div>
            <div>
              <span className="block opacity-65 text-[10px] uppercase">Phase Lag</span>
              <span className="font-serif text-sm text-primary font-semibold">0.02ms delta</span>
            </div>
            <div>
              <span className="block opacity-65 text-[10px] uppercase">Frequency Drift</span>
              <span className="font-serif text-sm text-tertiary font-semibold">Stable</span>
            </div>
          </div>
        </div>

        {/* Selected cycle detailed card */}
        <div className="md:col-span-4 bg-surface-container rounded-3xl p-6 flex flex-col justify-between shadow-sm stone-card">
          <div className="space-y-4">
            <h4 className="font-serif font-bold text-lg text-primary">{selectedCycle?.name}</h4>
            <div className="space-y-2">
              <span className="block text-[10px] font-semibold text-outline uppercase tracking-wider">Metrics</span>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Mean Period:</span>
                <span className="font-mono text-primary font-bold">{selectedCycle?.cycleLength}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Synchronization:</span>
                <span className="font-mono text-primary font-bold">{selectedCycle?.percentage}%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-on-surface-variant font-medium">Trend:</span>
                <span className={`font-semibold px-2 py-0.5 text-[10px] rounded-full uppercase ${selectedCycle?.status === 'Peaking' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-primary-fixed text-primary'}`}>
                  {selectedCycle?.status}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <div className="bg-surface-container-low p-3.5 rounded-2xl flex items-start gap-2 border border-outline-variant/10">
              <Sparkles size={14} className="text-[#f9bc50] shrink-0 mt-0.5" />
              <p className="text-[11px] text-on-surface-variant leading-relaxed">
                {selectedCycle?.name === 'Lunar Sap Ascent' ? 'During full moon cycles, soil water rises due to tidal gravitational pull' : 'Soil and tree respiration cycles influence overall valley nutrient transfer speeds.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cumulative Metrics Grid */}
      <section className="space-y-5">
        <h4 className="font-sans text-xs font-bold text-outline uppercase tracking-wider">Rhythmic Metadynamics</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cycleMetrics.map((metric) => (
            <div
              key={metric.name}
              onClick={() => setSelectedCycle(metric)}
              className={`stone-card p-5 rounded-2xl flex flex-col justify-between cursor-pointer transition-all ${
                selectedCycle?.name === metric.name ? 'bg-surface border-l-4 border-secondary shadow-md' : 'bg-surface-container hover:bg-surface-container-high'
              }`}
            >
              <div className="flex justify-between items-start pb-2">
                <h3 className="font-serif font-bold text-sm text-primary">{metric.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${metric.status === 'Peaking' ? 'bg-secondary-fixed text-on-secondary-fixed' : 'bg-primary-fixed text-primary'}`}>
                  {metric.status}
                </span>
              </div>

              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-outline">Sync Ratio</span>
                  <span className="text-primary">{metric.percentage}%</span>
                </div>
                <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary transition-all duration-700" style={{ width: `${metric.percentage}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
