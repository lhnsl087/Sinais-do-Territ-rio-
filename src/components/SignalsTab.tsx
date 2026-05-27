/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Droplets,
  Wind,
  Thermometer,
  Shield, 
  Map, 
  ArrowRight, 
  AlertTriangle, 
  Leaf, 
  Activity, 
  Compass, 
  Sun, 
  CloudRain, 
  Flame, 
  CloudLightning,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Anomaly } from '../types';

interface SignalsTabProps {
  moistureUpper: number;
  moistureBedrock: number;
  aqi: number;
  oxygenYield: number; // 0 - 100
  vitalityIndex: number;
  syncFrequency: number;
  scenarioName: 'Standard' | 'Dry Spelt' | 'Heavy Inundation' | 'Morning Mist';
  scenarioDescription: string;
  onSelectScenario: (scenario: 'Normal' | 'Drought' | 'Rain' | 'Mist') => void;
  anomalies: Anomaly[];
  onSelectAnomaly: (anomaly: Anomaly) => void;
  onNavigateTab: (tab: 'signals' | 'cycles' | 'wellbeing' | 'observe') => void;
}

export default function SignalsTab({
  moistureUpper,
  moistureBedrock,
  aqi,
  oxygenYield,
  vitalityIndex,
  syncFrequency,
  scenarioName,
  scenarioDescription,
  onSelectScenario,
  anomalies,
  onSelectAnomaly,
  onNavigateTab
}: SignalsTabProps) {
  const [showMap, setShowMap] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [selectedMapNode, setSelectedMapNode] = useState<{ name: string; info: string; signal: string } | null>(null);

  // Growth Ring dash arrays & offsets
  // Ring 1 (hydration upper, radius 45, circ = ~282.7)
  const circ1 = 282.7;
  const offset1 = circ1 - (moistureUpper / 100) * circ1;

  // Ring 2 (hydration bedrock, radius 35, circ = ~219.9)
  const circ2 = 219.9;
  const offset2 = circ2 - (moistureBedrock / 100) * circ2;

  // Ring 3 (sync wave / vitality, radius 25, circ = ~157.1)
  const circ3 = 157.1;
  const offset3 = circ3 - (vitalityIndex / 100) * circ3;

  // Simulated map nodes
  const MAP_NODES = [
    { id: 'node-1', name: 'Ancient Oak Grove', x: '35%', y: '42%', info: 'Sap pressure spiking. High mycelial transfer rates.', signal: 'Active Roots' },
    { id: 'node-2', name: 'Gorge Water Inlet', x: '68%', y: '25%', info: 'Silt content stabilizing since morning thaw.', signal: 'Laminar Flow' },
    { id: 'node-3', name: 'Fern Gully Shrubland', x: '50%', y: '75%', info: 'Intense seedling unfurling. Undergrowth saturation 88%.', signal: 'Vigorous' },
    { id: 'node-4', name: 'Ridge Peak Atmosphere', x: '22%', y: '68%', info: 'Excellent ozone profile. Wind direction holding NNW.', signal: 'Pristine Air' }
  ];

  return (
    <div className="space-y-12">
      {/* Territory's Breath Visualization Banner */}
      <section className="relative flex flex-col items-center justify-center min-h-[440px] px-4 text-center rounded-3xl overflow-hidden bg-gradient-to-b from-surface-container-low/40 to-transparent">
        {/* Organic Pulsating Blobs */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
          <div 
            className="organic-pulse blob-shape w-[280px] h-[280px] md:w-[480px] md:h-[480px] bg-primary-fixed/20 blur-3xl transition-all duration-1000"
            style={{ transform: `scale(${1 + vitalityIndex / 300})` }}
          />
          <div 
            className="organic-pulse blob-shape w-[220px] h-[220px] md:w-[380px] md:h-[380px] bg-secondary-fixed/15 blur-2xl transition-all duration-1000" 
            style={{ animationDelay: '2s', transform: `scale(${1 + moistureUpper / 300})` }}
          />
        </div>

        {/* Quick Presets / Ecosystem Tides Selector */}
        <div className="absolute top-4 flex flex-wrap justify-center gap-2 px-4 py-2 bg-surface-container-low/70 backdrop-blur-md rounded-full shadow-sm">
          <span className="text-xs text-outline font-semibold uppercase tracking-wider self-center mr-2 hidden sm:inline">Set Rhythm:</span>
          <button 
            onClick={() => onSelectScenario('Normal')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${scenarioName === 'Standard' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface-variant'}`}
          >
            <Compass size={13} />
            <span>Normal</span>
          </button>
          <button 
            onClick={() => onSelectScenario('Mist')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${scenarioName === 'Morning Mist' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface-variant'}`}
          >
            <Wind size={13} />
            <span>Mist</span>
          </button>
          <button 
            onClick={() => onSelectScenario('Rain')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${scenarioName === 'Heavy Inundation' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface-variant'}`}
          >
            <CloudRain size={13} />
            <span>Inundation</span>
          </button>
          <button 
            onClick={() => onSelectScenario('Drought')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all ${scenarioName === 'Dry Spelt' ? 'bg-primary text-white' : 'hover:bg-surface-container text-on-surface-variant'}`}
          >
            <Flame size={13} />
            <span>Drought</span>
          </button>
        </div>

        <div className="space-y-4 max-w-2xl mt-12">
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary leading-tight">The Valley's Breath</h2>
          <p className="font-sans italic text-base md:text-lg text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            {scenarioDescription}
          </p>

          <div className="flex justify-center items-center gap-10 md:gap-14 pt-6">
            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-5xl md:text-6xl text-primary tracking-tight">{vitalityIndex}</span>
              <span className="font-sans font-bold text-xs text-secondary uppercase tracking-widest mt-2">Vitality Index</span>
            </div>
            
            <div className="h-16 w-[0.5px] bg-outline-variant"></div>

            <div className="flex flex-col items-center">
              <span className="font-serif font-bold text-5xl md:text-6xl text-primary tracking-tight">
                {syncFrequency}<span className="text-xl md:text-2xl font-semibold ml-0.5">Hz</span>
              </span>
              <span className="font-sans font-bold text-xs text-secondary uppercase tracking-widest mt-2">Sync Frequency</span>
            </div>
          </div>
        </div>

        {/* Floating Ambient Info Cards */}
        <div className="absolute left-6 bottom-10 stone-card bg-surface-container-low/75 backdrop-blur-md p-4 rounded-2xl shadow-sm hidden lg:block hover:bg-surface-container-high transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-fixed/30 rounded-full text-primary">
              <Wind size={16} />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-outline uppercase tracking-wider">Atmospheric shift</p>
              <p className="font-serif font-bold text-lg text-primary">
                {scenarioName === 'Heavy Inundation' ? 'WNW 18km/h' : scenarioName === 'Morning Mist' ? 'Quiet Calm' : 'NNW 4km/h'}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-6 bottom-10 stone-card bg-surface-container-low/75 backdrop-blur-md p-4 rounded-2xl shadow-sm hidden lg:block hover:bg-surface-container-high transition-colors">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-fixed/50 rounded-full text-on-secondary-container">
              <Thermometer size={16} />
            </div>
            <div>
              <p className="font-sans text-[11px] font-bold text-outline uppercase tracking-wider">Ambient Thermal</p>
              <p className="font-serif font-bold text-lg text-primary">
                {scenarioName === 'Dry Spelt' ? '28.6°C' : scenarioName === 'Heavy Inundation' ? '15.2°C' : '21.4°C'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid: Soil Moisture & Oxygen Atmosphere Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Soil Moisture growth ring visualizer */}
        <div 
          onMouseEnter={() => setHoveredCard('moisture')}
          onMouseLeave={() => setHoveredCard(null)}
          className="md:col-span-12 lg:col-span-7 stone-card bg-surface-container rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row gap-8 items-center relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
        >
          <div className="flex-1 space-y-5">
            <div>
              <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest">Hydration Status</span>
              <h3 className="font-serif font-bold text-2xl text-primary mt-1">Soil Moisture Tides</h3>
            </div>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Subsurface capillary distribution is optimum for active growth cycles. Deep root saturation rates prevent wilt vectors.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm">
                <span className="block text-[11px] font-bold text-outline uppercase tracking-wider">Upper Layer (A0)</span>
                <span className="text-2xl font-serif font-bold text-primary">{moistureUpper}%</span>
              </div>
              <div className="bg-surface-container-low p-4 rounded-2xl shadow-sm">
                <span className="block text-[11px] font-bold text-outline uppercase tracking-wider">Bedrock Tap (B2)</span>
                <span className="text-2xl font-serif font-bold text-primary">{moistureBedrock}%</span>
              </div>
            </div>
          </div>

          <div className="relative w-44 h-44 flex items-center justify-center">
            {/* Concentric Growth Rings SVG */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Outer Layer Ring */}
              <circle className="text-outline-variant/20" cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4"></circle>
              <circle 
                className="text-primary transition-all duration-1000 ease-out" 
                cx="50" cy="50" fill="none" r="45" 
                stroke="currentColor" 
                strokeWidth="4.5"
                strokeDasharray={circ1} 
                strokeDashoffset={offset1} 
                strokeLinecap="round"
              ></circle>
              
              {/* Middle Layer Ring */}
              <circle className="text-outline-variant/20" cx="50" cy="50" fill="none" r="35" stroke="currentColor" strokeWidth="6"></circle>
              <circle 
                className="text-secondary-container transition-all duration-1000 ease-out" 
                cx="50" cy="50" fill="none" r="35" 
                stroke="currentColor" 
                strokeWidth="6.5"
                strokeDasharray={circ2} 
                strokeDashoffset={offset2} 
                strokeLinecap="round"
              ></circle>
              
              {/* Inner Vitality Ring */}
              <circle className="text-outline-variant/20" cx="50" cy="50" fill="none" r="25" stroke="currentColor" strokeWidth="8"></circle>
              <circle 
                className="text-tertiary-fixed-dim transition-all duration-1000 ease-out" 
                cx="50" cy="50" fill="none" r="25" 
                stroke="currentColor" 
                strokeWidth="8"
                strokeDasharray={circ3} 
                strokeDashoffset={offset3} 
                strokeLinecap="round"
              ></circle>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <Droplets className="text-primary" size={26} />
            </div>
          </div>
        </div>

        {/* Atmosphere Air Purity Card */}
        <div 
          onMouseEnter={() => setHoveredCard('purity')}
          onMouseLeave={() => setHoveredCard(null)}
          className="md:col-span-12 lg:col-span-5 stone-card bg-primary text-on-primary rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative transition-all duration-300 hover:scale-[1.01]"
        >
          {/* Subtle top decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 blob-shape translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-4">
            <div>
              <span className="font-sans text-xs font-bold text-primary-fixed uppercase tracking-widest opacity-90">Atmosphere Profile</span>
              <h3 className="font-serif font-bold text-2xl mt-1 text-surface">Canopy Purity</h3>
            </div>
            
            <div className="flex items-baseline gap-1 pt-2">
              <span className="font-serif font-bold text-[54px] leading-none text-surface">0{aqi}</span>
              <span className="font-serif font-bold text-lg opacity-80 text-primary-fixed-dim">AQI</span>
            </div>
            <p className="font-sans text-sm text-on-primary-container leading-relaxed">
              {aqi <= 5 ? 'Pristine. Ozone filtration is optimal while photosynthetic yield reaches daily peak output.' : 'Excellent. CO2 level respiration indexes point to rich oxygen output along the western mountain gap.'}
            </p>
          </div>

          <div className="relative z-10 pt-8 mt-auto">
            <div className="flex justify-between text-xs font-semibold mb-2">
              <span className="opacity-90 text-primary-fixed">Oxygen Yield</span>
              <span className="text-[#a9cfb9]">{oxygenYield >= 90 ? 'Extreme' : 'Optimal'}</span>
            </div>
            <div className="w-full h-1.5 bg-on-primary/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-fixed transition-all duration-1000"
                style={{ width: `${oxygenYield}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Vegetation State Card */}
      <section className="stone-card bg-surface-container-low rounded-3xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div>
            <span className="font-sans text-xs font-bold text-secondary uppercase tracking-widest">Vegetative State</span>
            <h3 className="font-serif font-bold text-2xl text-primary mt-1">Flora Pulse Status</h3>
          </div>
          
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
            Local oak groves show high fluid core sap pressure. Fungal mycelial channels actively propagate micronutrients from the water basins across dry forest sections.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <span className="px-4 py-1.5 bg-surface-container text-xs font-semibold rounded-full text-primary border border-outline-variant/10">
              Photosynthesis: Active
            </span>
            <span className="px-4 py-1.5 bg-surface-container text-xs font-semibold rounded-full text-primary border border-outline-variant/10">
              Transpiration: Low
            </span>
            <span className="px-4 py-1.5 bg-surface-container text-xs font-semibold rounded-full text-primary border border-outline-variant/10">
              Pollinator Activity: Moderate
            </span>
          </div>

          <button 
            onClick={() => setShowMap(true)}
            className="group flex items-center gap-2 font-sans font-bold text-xs text-secondary hover:text-primary transition-all uppercase tracking-wider pt-4"
          >
            <span>View Detailed Species Map</span>
            <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Forest canopy cover image */}
        <div 
          onClick={() => setShowMap(true)}
          className="rounded-2xl overflow-hidden aspect-[4/3] md:aspect-auto md:h-72 stone-card group relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10" />
          <img 
            alt="Ancient Oak Canopy" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1800ms] brightness-95"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAde5wYfnnLxiCEaBxgto21PPMbckdFBLf8yMzPjale67SdReSVOw6febtlVS1NPmtEdUUcdOB_IqMYiYpJGO_F5JZrmOmynn_3B6KK_xosQ7Eg8TmzjrymtQalv-pVGe1KwNfhCOS9lYErkb9IEkfnvxw-7WaWRnn7Ig9jWClFvuMqx7W3M1i4WoCSmhFPrBDF8rQxDrDAZQLa1486WzJKqQSz8-JMV_zpzdErAw76FMngu0_YhenDlIBR3NBlsz_adIeQ1iiLJ0ex"
          />
          <div className="absolute bottom-4 left-4 z-20 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase text-primary flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Live Forest Cam
          </div>
        </div>
      </section>

      {/* Section Transition Wave Divider */}
      <div className="py-6 flex justify-center">
        <svg fill="none" height="40" viewBox="0 0 200 40" width="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 20C50 20 50 10 100 10C150 10 150 30 200 30" stroke="#c1c8c2" strokeDasharray="4 4" strokeWidth="1"></path>
        </svg>
      </div>

      {/* Recent Anomalies Tracker */}
      <section className="space-y-6">
        <h4 className="font-sans text-xs font-bold text-outline uppercase tracking-widest text-center">Recent Anomalies</h4>
        <div className="flex flex-col gap-3">
          {anomalies.map((anomaly) => (
            <div 
              key={anomaly.id}
              onClick={() => onSelectAnomaly(anomaly)}
              className="stone-card bg-surface p-4 rounded-2xl flex items-center justify-between hover:bg-surface-container-high transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${anomaly.type === 'warning' ? 'bg-secondary-fixed/50 text-secondary' : 'bg-primary-fixed/40 text-primary'}`}>
                  {anomaly.type === 'warning' ? <AlertTriangle size={18} /> : <Leaf size={18} />}
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-primary group-hover:text-secondary transition-colors">{anomaly.title}</p>
                  <p className="text-xs text-outline">{anomaly.details}</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-outline-variant group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>
      </section>

      {/* Map modal with gorgeous active nodes */}
      <AnimatePresence>
        {showMap && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMap(false)}
              className="absolute inset-0 bg-inverse-surface/50 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-surface relative w-full max-w-2xl h-[560px] rounded-3xl overflow-hidden p-6 stone-card shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-outline-variant">
                <div>
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Cartographic Blueprint</span>
                  <h3 className="font-serif font-bold text-xl text-primary mt-0.5">Valley Species distribution</h3>
                </div>
                <button 
                  onClick={() => setShowMap(false)}
                  className="px-3 py-1.5 text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-primary rounded-full transition-colors"
                >
                  Close
                </button>
              </div>

              {/* Map Canvas Background Vector style */}
              <div className="relative flex-1 bg-surface-container-low rounded-2xl border border-outline-variant/30 my-4 overflow-hidden shadow-inner">
                {/* SVG topographical waves */}
                <svg className="absolute inset-0 w-full h-full text-outline-variant/10" pointerEvents="none">
                  <path d="M0,100 C150,150 250,50 400,180 T800,100" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M0,200 C300,280 150,300 500,220 T900,250" fill="none" stroke="currentColor" strokeWidth="1" />
                  <path d="M0,50 C200,90 400,10 600,120 T1000,80" fill="none" stroke="currentColor" strokeWidth="1" />
                  <circle cx="200" cy="200" r="140" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
                  <circle cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                </svg>

                {/* Simulated Nodes */}
                {MAP_NODES.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => setSelectedMapNode(node)}
                    style={{ left: node.x, top: node.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group flex items-center justify-center"
                  >
                    <span className="absolute w-8 h-8 bg-primary-fixed/40 rounded-full animate-ping pointer-events-none" />
                    <span className="w-4 h-4 rounded-full bg-primary border-2 border-white group-hover:bg-secondary transition-colors" />
                    
                    {/* Tooltip on hover */}
                    <span className="absolute left-6 ml-1 bg-primary text-white text-[10px] px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-sans font-semibold">
                      {node.name}
                    </span>
                  </button>
                ))}

                {/* Popover Card */}
                {selectedMapNode ? (
                  <div className="absolute bottom-4 left-4 right-4 bg-surface/90 backdrop-blur-md p-4 rounded-2xl stone-card border-l-4 border-secondary shadow-lg z-20">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-serif font-bold text-sm text-primary">{selectedMapNode.name}</h4>
                        <p className="text-xs text-on-surface-variant mt-1">{selectedMapNode.info}</p>
                      </div>
                      <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-secondary-fixed text-on-secondary-fixed rounded-full whitespace-nowrap">
                        {selectedMapNode.signal}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center bg-transparent pointer-events-none">
                    <p className="text-xs text-outline font-medium italic select-none max-w-xs">
                      Tap any highlight point on the grid to filter live vegetative signals.
                    </p>
                  </div>
                )}
              </div>

              {/* Legend footer */}
              <div className="flex items-center gap-6 text-xs text-outline justify-center font-semibold pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span>Oak & Shrub Woods</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
                  <span>Basin Hydrology</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#f9bc50]" />
                  <span>Atmosphere Grid</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
