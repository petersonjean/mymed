<template>
    <section class="screen" id="screen-detail">
      <h2 id="med-name">{{ med.name }}</h2>
      <img :src="med.photo" class="med-photo" alt="Medication">
      <img :src="med.doctorPhoto" class="ai-avatar" alt="AI Doctor avatar">
      <div v-if="med.doctorVideo">
      <button @click="showVideo = true" class="play-button">▶️ Play Instruction Video</button>
      <div v-if="showVideo">
        <video ref="videoPlayer" width="100%" controls @play="onPlay" style="display:block; margin:1rem auto;">
          <source :src="med.doctorVideo" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <p v-else class="no-video">No instruction video available.</p>

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
  import { ref, computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { meds } from '@/store/meds';
  
  export default {
    name: 'DetailPage',
    setup() {
      const route = useRoute();
      const activeTab = ref('dosage');
      const showVideo = ref(false);
      const med = computed(() => meds.find(m => m.id === route.params.id) || meds[0]);
      const playVideo =() =>{

      }
      return { activeTab, med ,showVideo};
    }
  };
  </script>
  <style scoped>
  .no-video {
    color: #666;
    font-style: italic;
    text-align: center;
    margin: 1rem 0;
  }
  #med-video{

width:100%;border-radius:var(--radius-md);margin-top:1rem;

}
  </style>