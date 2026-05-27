/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Heart, Brain, Users, Leaf, Sparkles, TrendingUp, Compass, Activity } from 'lucide-react';
import { motion } from 'motion/react';

export default function WellbeingTab() {
  return (
    <div className="space-y-12">
      {/* Hero Header */}
      <section className="mb-8 text-center md:text-left">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-2">Community Reciprocity</h2>
        <p className="text-on-surface-variant font-sans text-base md:text-lg italic max-w-xl">
          Nurturing the threads that bind the valley together.
        </p>
      </section>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Signal Quality Card */}
        <div className="md:col-span-12 lg:col-span-8 bg-surface-container-low rounded-3xl p-6 md:p-8 relative overflow-hidden group stone-card">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-secondary-container/10 rounded-full blur-3xl group-hover:bg-secondary-container/20 transition-all duration-700 pointer-events-none"></div>
          
          <div className="relative z-10 space-y-6">
            <h3 className="font-serif font-bold text-xl text-primary">Signal Quality Metrics</h3>
            
            <div className="flex flex-col gap-6">
              {/* Vibrancy Index Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Vibrancy Index</span>
                  <span className="font-serif font-bold text-lg text-secondary">84%</span>
                </div>
                <div className="h-6 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                  <div className="h-full bg-secondary-container rounded-full w-[84%] transition-all duration-1000 ease-out shadow-sm shadow-secondary/10"></div>
                </div>
              </div>

              {/* Response Latency Progress */}
              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="font-sans text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Response Latency</span>
                  <span className="font-serif font-bold text-lg text-primary">High Accuracy</span>
                </div>
                <div className="h-6 w-full bg-surface-container-high rounded-full overflow-hidden p-1">
                  <div className="h-full bg-primary-fixed-dim rounded-full w-[92%] transition-all duration-1000 ease-out shadow-sm shadow-primary/10"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Terracotta Pulse Tracker Card */}
        <div className="md:col-span-12 lg:col-span-4 bg-secondary text-on-secondary rounded-3xl p-6 md:p-8 flex flex-col justify-between overflow-hidden relative stone-card">
          <div className="absolute inset-0 opacity-10 parched-texture pointer-events-none"></div>
          
          <div className="relative z-10">
            <Heart className="text-secondary-fixed text-4xl mb-4" size={32} />
            <h3 className="font-serif font-bold text-xl mb-1">Active Pulse</h3>
            <p className="text-secondary-fixed/80 text-xs font-semibold tracking-wider uppercase">Current Community Heartbeat</p>
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex items-end gap-1.5 h-16">
              <div className="w-2.5 bg-secondary-fixed/30 rounded-t-full h-8 animate-pulse"></div>
              <div className="w-2.5 bg-secondary-fixed/60 rounded-t-full h-12 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2.5 bg-secondary-fixed rounded-t-full h-16 animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              <div className="w-2.5 bg-secondary-fixed/60 rounded-t-full h-10 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
              <div className="w-2.5 bg-secondary-fixed/30 rounded-t-full h-14 animate-pulse" style={{ animationDelay: '0.8s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Community Wellbeing section */}
      <section className="space-y-6 pt-6 mb-12">
        <div className="topographical-line mb-8"></div>
        <h3 className="font-serif font-bold text-2xl text-primary mb-4 text-center">Community Wellbeing</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Mental Clarity */}
          <div className="bg-surface-container rounded-3xl p-6 border-b-2 border-secondary/20 hover:border-secondary transition-all cursor-default space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-secondary-container/20 rounded-full flex items-center justify-center">
              <Brain className="text-secondary" size={24} />
            </div>
            <h4 className="font-serif font-bold text-lg text-primary">Mental Clarity</h4>
            <p className="text-on-surface-variant font-sans text-xs leading-relaxed">
              Measured through narrative depth and clarity in community archives. Currently trending toward focus.
            </p>
            <div className="flex gap-1.5 pt-2">
              <span className="px-3 py-1 bg-secondary-fixed text-on-secondary-fixed rounded-full text-[10px] font-bold uppercase tracking-wider">
                Increasing
              </span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">
                Narrative
              </span>
            </div>
          </div>

          {/* Card 2: Social Cohesion */}
          <div className="bg-surface-container rounded-3xl p-6 border-b-2 border-primary/20 hover:border-primary transition-all cursor-default space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-primary-fixed-dim/20 rounded-full flex items-center justify-center">
              <Users className="text-primary" size={24} />
            </div>
            <h4 className="font-serif font-bold text-lg text-primary">Social Cohesion</h4>
            <p className="text-on-surface-variant font-sans text-xs leading-relaxed">
              Reflects frequency and quality of non-transactional reciprocal exchanges between members.
            </p>
            <div className="flex gap-1.5 pt-2">
              <span className="px-3 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-[10px] font-bold uppercase tracking-wider">
                Stable
              </span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">
                Exchange
              </span>
            </div>
          </div>

          {/* Card 3: Ecological Trust */}
          <div className="bg-surface-container rounded-3xl p-6 border-b-2 border-tertiary/20 hover:border-tertiary transition-all cursor-default space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-tertiary-fixed/20 rounded-full flex items-center justify-center">
              <Leaf className="text-tertiary" size={24} />
            </div>
            <h4 className="font-serif font-bold text-lg text-primary">Ecological Trust</h4>
            <p className="text-on-surface-variant font-sans text-xs leading-relaxed">
              Collective confidence in the valley's autonomous signals and long-term forest vitality levels.
            </p>
            <div className="flex gap-1.5 pt-2">
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[10px] font-bold uppercase tracking-wider">
                Optimistic
              </span>
              <span className="px-3 py-1 bg-surface-container-high text-on-surface-variant rounded-full text-[10px] font-bold uppercase tracking-wider">
                Confidence
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Seedlings & Resonance segment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-8">
        {/* Seedling Program Card */}
        <div className="lg:col-span-5 bg-surface-container-highest rounded-3xl p-6 md:p-8 relative overflow-hidden min-h-[300px] shadow-sm flex flex-col justify-between stone-card">
          <img 
            alt="Moss details" 
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-multiply pointer-events-none select-none brightness-95" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKZAxS-5NQEJWXqj-n5Q0MdJKhLO1mJxDRSZGpHIlk83bttlqrQRkC6Mycp4tCHn1mRv1mT_lgon5s7VgcUU5zPA-FTzW8OQkA_OSjkg9lfZQ9uK-3os5AAAPTWQGIQEY6mIQrOZsJoPn7VTHwGDl6RBRHvALcgY03HdQmNBBZRgBwdTwBn2OqgkFFglifLeFUFMmz86v4AZQtWeK_4CQJMOmfRnQtyjV1QgYjTy4gzDM_NC6qUwNDWxEnKjMVIs-nTXFyrtFycHcI"
          />
          <div className="relative z-10 h-full flex flex-col justify-between space-y-6">
            <div>
              <h3 className="font-serif font-bold text-xl text-primary">Seedling Program</h3>
              <p className="text-on-surface-variant text-xs font-semibold uppercase tracking-wider mt-1">Goal: 1,200 New Observants</p>
            </div>

            <div className="mt-6">
              <svg className="w-full h-20" viewBox="0 0 400 100">
                <path d="M0,80 Q100,20 200,80 T400,80" fill="none" stroke="#e5e2dd" strokeLinecap="round" strokeWidth="12"></path>
                {/* Dynamically drawing the path in Terracotta color resembling screenshot */}
                <path 
                  d="M0,80 Q100,20 200,80 T400,80" 
                  fill="none" 
                  stroke="#ff8f6f" 
                  strokeLinecap="round" 
                  strokeWidth="12"
                  strokeDasharray="240 1000" // Fills the progress beautifully
                ></path>
              </svg>
              
              <div className="flex justify-between items-center mt-2 font-mono">
                <span className="font-serif font-bold text-2xl text-secondary">712</span>
                <span className="text-xs text-on-surface-variant font-semibold">Remaining: 488</span>
              </div>
            </div>
          </div>
        </div>

        {/* Growth Rings Seasonal Resonance Card */}
        <div className="lg:col-span-7 bg-surface-container-low rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-center gap-8 shadow-sm stone-card">
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <div className="absolute inset-0 rounded-full border-[10px] border-primary/5"></div>
            <div className="absolute inset-4 rounded-full border-[10px] border-secondary/10 pointer-events-none"></div>
            <div className="absolute inset-8 rounded-full border-[10px] border-tertiary/15 pointer-events-none"></div>
            <div className="absolute inset-12 rounded-full border-[10px] border-primary-container/20 pointer-events-none"></div>
            <Leaf className="text-primary" size={28} />
          </div>

          <div className="flex-1 space-y-4">
            <h3 className="font-serif font-bold text-lg text-primary">Seasonal Resonances</h3>
            <ul className="space-y-3 text-xs font-semibold">
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary shrink-0" />
                <span className="text-on-surface">Soil Quality Resonance: 92%</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-secondary shrink-0" />
                <span className="text-on-surface">Water Retention Index: 74%</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-tertiary shrink-0" />
                <span className="text-on-surface">Biodiversity Shift: +12%</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
