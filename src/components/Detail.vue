<template>
    <section class="screen" id="screen-detail">
      <h2 id="med-name">{{ med.name }}</h2>
      <img :src="med.photo" class="med-photo" alt="Medication">
      <img :src="med.doctorPhoto" class="ai-avatar" alt="AI Doctor avatar">
      <div class="tab-row" role="tablist">
        <button @click="activeTab='dosage'" :class="{ active: activeTab==='dosage' }" role="tab">Dosage</button>
        <button @click="activeTab='sidefx'" :class="{ active: activeTab==='sidefx' }" role="tab">Side Effects</button>
      </div>
      <div id="detail-body">
        <p v-if="activeTab==='dosage'"><strong>{{ med.dosageText }}</strong></p>
        <ul v-else>
          <li v-for="(fx, idx) in med.sideEffects" :key="idx">{{ fx }}</li>
        </ul>
      </div>
      <button id="btn-open-tracker" style="margin-top:1.25rem;" @click="$router.push('/tracking')">Done → Tracker</button>
    </section>
  </template>
  
  <script>
  export default {
    name: 'DetailPage',
    data() {
      return {
        activeTab: 'dosage',
        med: {
          name: 'Antibiotic',
          photo: require('@/assets/Amoxicillin.jpg'),
          doctorPhoto: 'https://place-hold.it/96x96/007aff/fff?text=Dr',
          dosageText: 'Take 1 pill with food.',
          sideEffects: ['Nausea', 'Headache'],
        }
      };
    }
  };
  </script>