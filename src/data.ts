/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Observation, Anomaly, CycleMetric } from './types';

export const INITIAL_OBSERVATIONS: Observation[] = [
  {
    id: 'obs-1',
    title: 'The Wild Garlic is Awakening',
    description: 'Spotted the first green shoots of wild garlic near the old oak. The scent is faint but unmistakable. Spring is officially beginning its ascent.',
    category: 'First Bloom',
    sector: 'Upper Creek Bend',
    authorName: 'Elena Rivers',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvRPRXv1cPfPe9gXUN85LwdReFtwrURNFwQRPSt5mbet1FTW1t7FKg7PergCxvLpcZqtCeC950kOUvjQ5og2Bv68_pXyLn8BCji0J41Ld0K2LA5Qvofq2LezM8BaBAvsElpsbu7W1yxODaEV1YwvZDD0LogVgOuKv5RAEiaZBiB0ywAywy0cyI694UByxyjS2oZddxQbz8fpGvV9FwVAy-ZsMlRa6rmKxjlPstVUWJMO2aVsTSkh4QdoAVkXaxuMF6_i5i-dCCI60Y',
    timeAgo: '2h ago',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ54JLRT7OMLGjsXrHP4GNegEAnTT5fM4cFLqVyHAbv1XGgOQI6w0kFCINbND0pcBOrq1fHk2F7-5cnNip96JmuADqa1SIyJapaKKivM4rcVyS6bzbmoa61NhRXlcoQCfqf0RKKqGjLMbx_ug96raqF9-i6A8dMCDAIHmZgkiKZ8kz6cEogGH2NFD6HM5sFQcqCVcfuDAkBcn-TMioK4hJH9V3mrYEfgGRrV8u_Yo-ZFqEU31oPOYpQSuGCelhWHMwtytwXq1iJzyB',
    likes: 24,
    commentsCount: 8,
    comments: [
      { id: 'c-1', authorName: 'Marcus Thorne', commentText: 'This is remarkable! I felt the dampness in the air increase yesterday.', timeAgo: '1h ago' },
      { id: 'c-2', authorName: 'Luna Green', commentText: 'Perfect timing, I will begin the seasonal foraging plan.', timeAgo: '45m ago' }
    ],
    isLikedByMe: false
  },
  {
    id: 'obs-2',
    title: 'River Stability',
    description: 'Levels have stabilized at 1.2m after the recent thaw. Trout sightings are increasing near the eddies. The water is clearer than I\'ve seen it in years.',
    category: 'Aquatic Flow',
    sector: 'Gorge Bridge',
    authorName: 'Marcus Thorne',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7lv7_hyFLqiZQ6qOIa67nuyWQ29ynjYZAChtRRiJRibxPn_T3Mj5mU879cciMK91lRr5-OBcBG2PShTTSNCLJdplvgd6rzh_PPlZfGF-EBUBQ6Pyu6H3qv6d6sEuQD0xZjspQuZ2yM0kTn__2VysLWkhTyyvXAr-uh72_4C0I6lCVaL33X9ognAVw1SIdKnGqJc8pzjbxwJcsBPS8rHlN4dI_YVekUpYXKeG9LsTWpp4vZACRyKAAHnNF6sjsZHqWfCdqkhtk1cDP',
    timeAgo: '5h ago',
    likes: 12,
    commentsCount: 2,
    comments: [
      { id: 'c-3', authorName: 'Elena Rivers', commentText: 'The Clarity corresponds perfectly with reduced agricultural runoff upstream.', timeAgo: '4h ago' }
    ],
    isLikedByMe: false
  },
  {
    id: 'obs-3',
    title: 'Dawn Chorus Pulse',
    description: 'Intensity is peaking at 05:42 AM. Notable increase in Thrush calls compared to last week.',
    category: 'Soundscape',
    sector: 'Signal Archive',
    authorName: 'Signal Archive',
    authorAvatar: undefined,
    timeAgo: '12h ago',
    likes: 18,
    commentsCount: 0,
    comments: [],
    soundscapeBars: [8, 12, 16, 10, 14, 12, 18, 10, 6],
    isLikedByMe: false
  },
  {
    id: 'obs-4',
    title: 'Nitrogen Cycle Shift',
    description: 'The meadow\'s southern quadrant is showing a healthy spike in mineralization following the composting cycle.',
    category: 'Soil Health',
    sector: 'Sensor Alpha-7',
    authorName: 'Sensor Alpha-7',
    authorAvatar: undefined,
    timeAgo: '1d ago',
    likes: 9,
    commentsCount: 1,
    comments: [],
    metrics: [
      { label: 'Moisture', value: '42%' },
      { label: 'Temp', value: '12.4°C' }
    ],
    isLikedByMe: false
  }
];

export const INITIAL_ANOMALIES: Anomaly[] = [
  {
    id: 'anom-1',
    title: 'Creek Silt Increase',
    details: 'Detected 2h ago in North Sector',
    timeAgo: '2h ago',
    sector: 'North Sector',
    type: 'warning'
  },
  {
    id: 'anom-2',
    title: 'Unusual Fern Unfurling',
    details: 'Detected 5h ago in Fern Gully',
    timeAgo: '5h ago',
    sector: 'Fern Gully',
    type: 'leaf'
  }
];

export const INITIAL_CYCLE_METRICS: CycleMetric[] = [
  {
    name: 'Lunar Sap Ascent',
    currentValue: 88,
    peakValue: 100,
    status: 'Peaking',
    cycleLength: '29.5 Days',
    nextEpoch: 'In 3 days (Full Moon)',
    percentage: 88
  },
  {
    name: 'Mycelial Nutrient Flow',
    currentValue: 64,
    peakValue: 100,
    status: 'Rising',
    cycleLength: '14 Days',
    nextEpoch: 'In 5 days (Spore release)',
    percentage: 64
  },
  {
    name: 'Canopy Transpiration Peak',
    currentValue: 42,
    peakValue: 100,
    status: 'Waning',
    cycleLength: '24 Hours',
    nextEpoch: 'In 18 hours (Noon sun)',
    percentage: 42
  },
  {
    name: 'Soil Nitrogen Minima',
    currentValue: 92,
    peakValue: 100,
    status: 'Stable',
    cycleLength: '90 Days',
    nextEpoch: 'In 24 days (Summer shift)',
    percentage: 92
  }
];
