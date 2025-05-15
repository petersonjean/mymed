// src/store/meds.js
import { reactive } from 'vue';
const videoBaseUrl = process.env.VUE_APP_VIDEO_BASE_URL || 'https://mymed-puce.vercel.app/videos';
export const meds = reactive([
  {
    id: '1', name: 'Antibiotic', dosage: '1 pill',
    photo: require('@/assets/Amoxicillin.jpg'),
    doctorPhoto: 'https://place-hold.it/96x96/007aff/fff?text=Dr',
    doctorVideo:`${videoBaseUrl}/1.mp4`,
    dosageText: 'Take 1 pill with food.',
    sideEffects: ['Nausea', 'Headache'],
  },
  {
    id: '2', name: 'Vitamin D', dosage: '1 pill',
    photo: require('@/assets/Amoxicillin.jpg'),
    doctorPhoto: 'https://place-hold.it/96x96/007aff/fff?text=Dr',
    doctorVideo:`${videoBaseUrl}/1.mp4`,
    dosageText: 'Take 1 pill in morning.',
    sideEffects: ['No common side effects'],
  },
  {
    id: '3', name: 'Lorazepam', dosage: '0.5 mg',
    photo: require('@/assets/Amoxicillin.jpg'),
    doctorPhoto: 'https://place-hold.it/96x96/007aff/fff?text=Dr',
    doctorVideo:`${videoBaseUrl}/1.mp4`,
    dosageText: 'Take half pill when anxious.',
    sideEffects: ['Drowsiness'],
  },
]);