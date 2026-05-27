/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Heart, 
  MessageSquare, 
  Plus, 
  User, 
  Volume2, 
  Settings, 
  Compass, 
  Check, 
  X,
  Send,
  Sparkles,
  FileText,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Observation, ObservationComment } from '../types';

interface ObserveTabProps {
  observations: Observation[];
  onAddObservation: (obs: Omit<Observation, 'id' | 'likes' | 'commentsCount' | 'comments' | 'timeAgo' | 'isLikedByMe'>) => void;
  onToggleLike: (id: string) => void;
  onAddComment: (obsId: string, authorName: string, commentText: string) => void;
}

export default function ObserveTab({
  observations,
  onAddObservation,
  onToggleLike,
  onAddComment
}: ObserveTabProps) {
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedObsComments, setSelectedObsComments] = useState<Observation | null>(null);
  
  // New entry form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('First Bloom');
  const [sector, setSector] = useState('Fern Gully');
  const [authorName, setAuthorName] = useState('');
  const [avatarIndex, setAvatarIndex] = useState(0);

  // New comment input
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentText, setCommentText] = useState('');

  // Sample avatars matching earth-toned palette
  const AVATARS = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB5BCvg1k6inoEmarAAU05wLiWBb4Obm6_JQZoH5HpOJBvE_Cbpv0x8OjPwpnwVq8z_dFkRo4NKqZLEyyxIyxinsMz-CxSw7glp3ydaQz_E2_LT0eb43u0RVqQbpVR5lM7ZYF10W6cg54y7etwGAs1CRU-ft6Qp2Y1oPXv_wySkDrQlISMKeg8j8G4jx3L43G-5Xi2rFbVnfa9bgKRBKj34FU_lAzkLm2NOb8IRnu_X6a3-8_lO3V2xnR0UX8DFC6ytuF4Ay97-Xlzr',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA6EutqofybGZaLTnjvLNwrXO-z9l_B3X6YDfvx0D_LDcNu5uAMTV6XcICbI5upx2zsDXyWlWG-XyajB9fnkEoVrCSA_0nrA_b-nZgsYXge0_ZA6Bwai9AhRqYHo0ShQhK4VPEKVJBpiyl6Ayy1tEHjbGqbR9vIaMogA-0FeuknH4JybFBR_5EA80ZfFwovMPQb9eNBGjGyqSU83uKVeXzGi6V-Ju3ZBqKWmWsOsHVBOEmDVkW65g-GGCGQ5d1Mh2HLBtnCofWipK15',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lv7_hyFLqiZQ6qOIa67nuyWQ29ynjYZAChtRRiJRibxPn_T3Mj5mU879cciMK91lRr5-OBcBG2PShTTSNCLJdplvgd6rzh_PPlZfGF-EBUBQ6Pyu6H3qv6d6sEuQD0xZjspQuZ2yM0kTn__2VysLWkhTyyvXAr-uh72_4C0I6lCVaL33X9ognAVw1SIdKnGqJc8pzjbxwJcsBPS8rHlN4dI_YVekUpYXKeG9LsTWpp4vZACRyKAAHnNF6sjsZHqWfCdqkhtk1cDP',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRPRXv1cPfPe9gXUN85LwdReFtwrURNFwQRPSt5mbet1FTW1t7FKg7PergCxvLpcZqtCeC950kOUvjQ5og2Bv68_pXyLn8BCji0J41Ld0K2LA5Qvofq2LezM8BaBAvsElpsbu7W1yxODaEV1YwvZDD0LogVgOuKv5RAEiaZBiB0ywAywy0cyI694UByxyjS2oZddxQbz8fpGvV9FwVAy-ZsMlRa6rmKxjlPstVUWJMO2aVsTSkh4QdoAVkXaxuMF6_i5i-dCCI60Y'
  ];

  const handleSubmitObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !authorName) return;

    onAddObservation({
      title,
      description,
      category,
      sector,
      authorName,
      authorAvatar: AVATARS[avatarIndex]
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setAuthorName('');
    setShowLogModal(false);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedObsComments || !commentAuthor || !commentText) return;

    onAddComment(selectedObsComments.id, commentAuthor, commentText);
    
    // Refresh local details view
    const updated = observations.find(o => o.id === selectedObsComments.id);
    if (updated) {
      setSelectedObsComments(updated);
    }
    
    // Reset comment inputs
    setCommentText('');
    setCommentAuthor('');
  };

  return (
    <div className="space-y-12 pb-16 relative">
      {/* Page Title */}
      <section className="text-center md:text-left">
        <h2 className="font-serif font-bold text-3xl md:text-4xl text-primary mb-2">Community Observations</h2>
        <p className="text-on-surface-variant font-sans text-sm md:text-base max-w-2xl leading-relaxed">
          Listening to the rhythm of our valley. Shared notes from the field, tracking the subtle shifts of our shared ecosystem.
        </p>
      </section>

      {/* Observation Stones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {observations.map((obs) => (
          <div 
            key={obs.id}
            className={`stone-card p-6 rounded-3xl bg-surface/80 backdrop-blur-md flex flex-col justify-between hover:bg-surface-container/90 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${
              obs.image ? 'md:col-span-2' : ''
            }`}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant/30">
                    {obs.authorAvatar ? (
                      <img src={obs.authorAvatar} alt={obs.authorName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-primary-fixed text-primary flex items-center justify-center font-bold text-xs font-serif uppercase">
                        {obs.authorName[0]}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-xs text-primary leading-tight">{obs.authorName}</p>
                    <p className="font-sans text-[10px] text-outline mt-0.5">{obs.sector} • {obs.timeAgo}</p>
                  </div>
                </div>
                <span className="font-sans text-[10px] font-bold px-2.5 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded-full uppercase tracking-wider">
                  {obs.category}
                </span>
              </div>

              {/* Title & Body */}
              <div>
                <h3 className="font-serif font-bold text-xl text-primary tracking-tight leading-snug">{obs.title}</h3>
                <p className="font-sans text-xs text-on-surface-variant leading-relaxed mt-2 line-clamp-4">
                  {obs.description}
                </p>
              </div>

              {/* soundscape visualization bar representation if present */}
              {obs.soundscapeBars && (
                <div className="h-16 flex items-center justify-center gap-1.5 bg-surface-container-low rounded-2xl my-4 py-2 px-3 border border-outline-variant/10">
                  <Volume2 size={16} className="text-primary shrink-0 mr-1" />
                  <div className="flex items-end gap-1 h-12 flex-1 justify-center max-w-xs">
                    {obs.soundscapeBars.map((val, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-primary rounded-full transform hover:scale-y-110 transition-transform origin-bottom" 
                        style={{ height: `${val * 5}%` }} 
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Soil Metrics if present */}
              {obs.metrics && (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  {obs.metrics.map((met, i) => (
                    <div key={i} className="bg-surface-container-low p-2.5 rounded-xl text-center border border-outline-variant/10">
                      <p className="text-[10px] text-outline font-semibold uppercase">{met.label}</p>
                      <p className="text-sm font-serif font-bold text-primary">{met.value}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Image if present */}
              {obs.image && (
                <div className="mt-4 overflow-hidden rounded-2xl aspect-video border border-outline-variant/20 shadow-sm group">
                  <img 
                    alt={obs.title} 
                    className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-102" 
                    src={obs.image} 
                  />
                </div>
              )}
            </div>

            {/* Actions Footer */}
            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-outline-variant/30 text-outline">
              <button 
                onClick={() => onToggleLike(obs.id)}
                className={`flex items-center gap-1.5 cursor-pointer text-xs font-semibold hover:text-secondary hover:scale-105 transition-all ${
                  obs.isLikedByMe ? 'text-secondary font-bold' : ''
                }`}
              >
                <Heart size={16} fill={obs.isLikedByMe ? 'currentColor' : 'none'} />
                <span>{obs.likes}</span>
              </button>
              
              <button 
                onClick={() => setSelectedObsComments(obs)}
                className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold hover:text-primary hover:scale-105 transition-all"
              >
                <MessageSquare size={16} />
                <span>{obs.commentsCount || obs.comments.length}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pulsing FAB floating block at bottom-right */}
      <button 
        onClick={() => setShowLogModal(true)}
        className="fixed right-6 bottom-24 md:right-10 md:bottom-28 z-40 group focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full"
        aria-label="Log observation"
      >
        <div className="absolute inset-x-0 inset-y-0 bg-primary rounded-full fab-pulse pointer-events-none"></div>
        <div className="relative bg-primary text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-secondary active:scale-95 transition-all duration-300">
          <Plus size={28} />
        </div>
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-inverse-surface text-inverse-on-surface text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-full opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-50">
          Log Observation
        </span>
      </button>

      {/* Observation detail comments drawer */}
      <AnimatePresence>
        {selectedObsComments && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedObsComments(null)}
              className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-surface relative w-full max-w-lg h-[500px] flex flex-col justify-between rounded-3xl shadow-xl overflow-hidden p-6 stone-card"
            >
              <div>
                {/* Header detail */}
                <div className="flex justify-between items-start pb-4 border-b border-outline-variant">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-primary">{selectedObsComments.title}</h3>
                    <p className="text-xs text-outline font-sans">Comments ({selectedObsComments.comments.length})</p>
                  </div>
                  <button 
                    onClick={() => setSelectedObsComments(null)}
                    className="p-1.5 bg-surface-container hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Comment scroll lists */}
                <div className="max-h-[280px] overflow-y-auto py-4 space-y-4 pr-1 scroll-hide">
                  {selectedObsComments.comments.length === 0 ? (
                    <div className="text-center py-10 space-y-2">
                      <AlertCircle size={24} className="text-outline-variant mx-auto" />
                      <p className="text-xs text-outline font-medium italic">No echoes shared yet. Be the first to note a resonant spark.</p>
                    </div>
                  ) : (
                    selectedObsComments.comments.map((com) => (
                      <div key={com.id} className="bg-surface-container-low p-3.5 rounded-2xl border border-outline-variant/10 text-xs text-primary">
                        <div className="flex justify-between items-center mb-1 text-[11px] font-bold">
                          <span className="text-secondary">{com.authorName}</span>
                          <span className="text-outline font-normal font-sans">{com.timeAgo}</span>
                        </div>
                        <p className="text-on-surface-variant font-sans leading-relaxed">{com.commentText}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Post comment form */}
              <form onSubmit={handlePostComment} className="pt-4 border-t border-outline-variant space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="text" 
                    placeholder="Signature Name" 
                    value={commentAuthor} 
                    onChange={e => setCommentAuthor(e.target.value)}
                    required
                    className="col-span-1 px-3 py-2 bg-surface-container border border-outline-variant/25 rounded-xl text-xs text-primary placeholder-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/25"
                  />
                  <input 
                    type="text" 
                    placeholder="Share feedback on signal..." 
                    value={commentText} 
                    onChange={e => setCommentText(e.target.value)}
                    required
                    className="col-span-2 px-3 py-2 bg-surface-container border border-outline-variant/25 rounded-xl text-xs text-primary placeholder-outline focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/25"
                  />
                </div>
                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-full hover:bg-secondary shadow-sm active:scale-95 transition-all"
                  >
                    <Send size={12} />
                    <span>Echo Signal</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Log observation modal */}
      <AnimatePresence>
        {showLogModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLogModal(false)}
              className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              className="bg-surface relative w-full max-w-lg rounded-3xl shadow-xl overflow-hidden p-6 stone-card"
            >
              {/* Header */}
              <div className="flex justify-between items-start pb-4 border-b border-outline-variant">
                <div>
                  <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">Field Log Entry</span>
                  <h3 className="font-serif font-bold text-xl text-primary mt-0.5">Note a Rhythmic Signal</h3>
                </div>
                <button 
                  onClick={() => setShowLogModal(false)}
                  className="p-1 bg-surface-container hover:bg-surface-container-high rounded-full text-on-surface-variant hover:text-primary"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleSubmitObservation} className="py-4 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-outline uppercase tracking-wider mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Elena Rivers" 
                      value={authorName} 
                      onChange={e => setAuthorName(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                    />
                  </div>

                  <div>
                    <label className="block text-outline uppercase tracking-wider mb-1">Choose Guardian Identity</label>
                    <div className="flex gap-2 items-center pt-0.5">
                      {AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setAvatarIndex(idx)}
                          className={`w-8 h-8 rounded-full overflow-hidden border-2 transition-transform active:scale-95 ${
                            avatarIndex === idx ? 'border-secondary scale-110 shadow-sm' : 'border-transparent'
                          }`}
                        >
                          <img src={av} alt="avatar option" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-outline uppercase tracking-wider mb-1">Observation Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Unusual Fern Unfurling" 
                      value={title} 
                      onChange={e => setTitle(e.target.value)}
                      required
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-outline uppercase tracking-wider mb-1">Sector Area</label>
                    <select
                      value={sector}
                      onChange={e => setSector(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary font-sans text-xs focus:outline-none focus:border-secondary"
                    >
                      <option>Upper Creek Bend</option>
                      <option>Gorge Bridge</option>
                      <option>Fern Gully</option>
                      <option>North Sector</option>
                      <option>South Moss Ridge</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  <div>
                    <label className="block text-outline uppercase tracking-wider mb-1">System Category</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary font-sans text-xs focus:outline-none focus:border-secondary"
                    >
                      <option>First Bloom</option>
                      <option>Soil Resonance</option>
                      <option>Hydrometer shift</option>
                      <option>Fauna Signal</option>
                      <option>Soundscape</option>
                    </select>
                  </div>
                </div>

                <div className="text-xs font-semibold">
                  <label className="block text-outline uppercase tracking-wider mb-1">Detailed Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Briefly state observations of humidity gradients, seedling program shifts, or avian cycles..."
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-surface-container-low border border-outline-variant/30 rounded-xl text-primary focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20"
                  />
                </div>

                {/* Footer buttons */}
                <div className="flex justify-end gap-2.5 pt-4 border-t border-outline-variant">
                  <button 
                    type="button"
                    onClick={() => setShowLogModal(false)}
                    className="px-4 py-2 bg-surface-container hover:bg-surface-container-high rounded-full text-xs font-bold text-primary transition-all active:scale-95"
                  >
                    Discard
                  </button>
                  <button 
                    type="submit"
                    className="px-5 py-2 bg-primary text-white hover:bg-secondary rounded-full text-xs font-bold shadow-sm transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <Check size={14} />
                    <span>Post Field Log</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
