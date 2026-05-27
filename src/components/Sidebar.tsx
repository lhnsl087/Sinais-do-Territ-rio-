/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X, BookOpen, Clock, Heart, Shield, RefreshCw, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: 'signals' | 'cycles' | 'wellbeing' | 'observe') => void;
}

export default function Sidebar({ isOpen, onClose, onNavigateTab }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-white/85 backdrop-blur-2xl p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-outline text-[#111c15]"
          >
            <div>
               {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-outline">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-full bg-[#2a5235]/10 text-[#2a5235] border border-[#2a5235]/20">
                    <Leaf size={20} />
                  </div>
                  <div>
                    <h2 className="font-serif font-bold text-xl tracking-tight text-[#111c15]">Territory Signals</h2>
                    <p className="text-xs text-on-surface-variant font-sans">Ecosystem Guide v1.2</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-full hover:bg-black/5 transition-colors text-on-surface-variant hover:text-primary"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="py-6 space-y-2">
                <span className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest px-3 mb-2">Primary Domains</span>
                <button
                  onClick={() => { onNavigateTab('signals'); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium hover:bg-[#2a5235]/5 transition-colors cursor-pointer"
                >
                  <Leaf size={18} className="text-primary" />
                  <div>
                    <p className="font-semibold text-[#111c15]">Territory Signals</p>
                    <p className="text-xs text-on-surface-variant">Real-time biometrics & atmospheric metrics</p>
                  </div>
                </button>

                <button
                  onClick={() => { onNavigateTab('cycles'); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium hover:bg-[#2a5235]/5 transition-colors cursor-pointer"
                >
                  <RefreshCw size={18} className="text-secondary animate-spin-slow" style={{ animationDuration: '8s' }} />
                  <div>
                    <p className="font-semibold text-[#111c15]">Ecosystem Cycles</p>
                    <p className="text-xs text-on-surface-variant">Lunar sap ascent & metabolic tide rhythms</p>
                  </div>
                </button>

                <button
                  onClick={() => { onNavigateTab('wellbeing'); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium hover:bg-[#2a5235]/5 transition-colors cursor-pointer"
                >
                  <Heart size={18} className="text-secondary" />
                  <div>
                    <p className="font-semibold text-[#111c15]">Community Wellbeing</p>
                    <p className="text-xs text-on-surface-variant">Qualitative coherence & seedling indicators</p>
                  </div>
                </button>

                <button
                  onClick={() => { onNavigateTab('observe'); onClose(); }}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium hover:bg-[#2a5235]/5 transition-colors cursor-pointer"
                >
                  <BookOpen size={18} className="text-tertiary" />
                  <div>
                    <p className="font-semibold text-[#111c15]">Shared Observations</p>
                    <p className="text-xs text-on-surface-variant">Live narrative logging & field data entries</p>
                  </div>
                </button>
              </div>

              {/* Guidelines Segment */}
              <div className="pt-4 border-t border-outline space-y-4">
                <span className="block text-xs font-semibold text-on-surface-variant uppercase tracking-widest px-3">Ecosystem Rules</span>
                
                <div className="bg-[#2a5235]/5 p-4 rounded-xl space-y-3 border border-[#2a5235]/10">
                  <div className="flex gap-2.5 items-start">
                    <Shield className="text-primary mt-0.5" size={16} />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#111c15]">Organic Minimalism</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        We prioritize deep respect, reciprocal exchange, and peaceful observations of nature. Technology should follow natural flow.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-start">
                    <Clock className="text-secondary mt-0.5" size={16} />
                    <div>
                      <h4 className="font-serif font-bold text-sm text-[#111c15]">Circadian Cadence</h4>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Measurements are modulated by seasons and lunar gravity, rather than human mechanical intervals.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-outline">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-outline">
                  <img
                    alt="Current Guardian Profile"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5BCvg1k6inoEmarAAU05wLiWBb4Obm6_JQZoH5HpOJBvE_Cbpv0x8OjPwpnwVq8z_dFkRo4NKqZLEyyxIyxinsMz-CxSw7glp3ydaQz_E2_LT0eb43u0RVqQbpVR5lM7ZYF10W6cg54y7etwGAs1CRU-ft6Qp2Y1oPXv_wySkDrQlISMKeg8j8G4jx3L43G-5Xi2rFbVnfa9bgKRBKj34FU_lAzkLm2NOb8IRnu_X6a3-8_lO3V2xnR0UX8DFC6ytuF4Ay97-Xlzr"
                  />
                </div>
                <div>
                  <p className="font-sans font-bold text-xs text-[#111c15]">Guardian Active</p>
                  <p className="font-mono text-[10px] text-on-surface-variant">ID: G-40092-ALPHA</p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
