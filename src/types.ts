/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AppTab = 'signals' | 'cycles' | 'wellbeing' | 'observe';

export interface ObservationComment {
  id: string;
  authorName: string;
  authorAvatar?: string;
  commentText: string;
  timeAgo: string;
}

export interface Observation {
  id: string;
  title: string;
  description: string;
  category: string;
  sector: string;
  authorName: string;
  authorAvatar?: string;
  timeAgo: string;
  image?: string;
  likes: number;
  commentsCount: number;
  comments: ObservationComment[];
  isLikedByMe?: boolean;
  metrics?: {
    label: string;
    value: string;
  }[];
  soundscapeBars?: number[];
}

export interface Anomaly {
  id: string;
  title: string;
  details: string;
  timeAgo: string;
  sector: string;
  type: 'warning' | 'leaf' | 'pulse';
}

export interface CycleMetric {
  name: string;
  currentValue: number;
  peakValue: number;
  status: 'Rising' | 'Peaking' | 'Waning' | 'Stable';
  cycleLength: string;
  nextEpoch: string;
  percentage: number;
}
