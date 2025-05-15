<template>
    <section class="screen" id="screen-detail">
      <h2 id="med-name">{{ med.name }}</h2>
      <img :src="med.photo" class="med-photo" alt="Medication">
      <img :src="med.doctorPhoto" class="ai-avatar" alt="AI Doctor avatar">
      <div v-if="med.doctorVideo">
      <button @click="onPlay" class="play-button">▶️ Play Instruction Video</button>
      <div  :class="{'video-hidden': !showVideo}">
        <video id="med-video" ref="videoPlayer" width="100%" controls  style="display:block; margin:1rem auto;">
          <source :src="med.doctorVideo" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
    <p v-else class="no-video"  >No instruction video available.</p>

      <div class="tab-row" role="tablist">
        <button @click="activeTab='dosage'" :class="{ active: activeTab==='dosage' }" role="tab" class="tab-left">Dosage</button>
        <button @click="activeTab='sidefx'" :class="{ active: activeTab==='sidefx' }" role="tab" class="tab-right">Side Effects</button>
      </div>
      <div id="detail-body">
        <p v-if="activeTab==='dosage'">
          <strong>{{ med.dosageText }}</strong>
          <button
          class="med-button"
          :class="{ taken: taken }"
          @click="toggleTaken"
        >
          <span v-if="!taken">☑️ Take Pill</span>
          <span v-else>✅ Medicine Taken</span>
        </button></p>
        <div v-else>
          <ul >
            <li v-for="(fx, idx) in med.sideEffects" :key="idx">{{ fx }}</li>
          </ul>
          <label class="feel-label">How are you feeling?</label>
          <textarea
            v-model="feeling"
            class="feel-input"
            placeholder="e.g. Good, dizzy, tired..."
          ></textarea>
          <button class="med-button" @click="saveFeeling">
            💾 Save Feeling
          </button>
        </div>
        
      </div>
      <button id="btn-open-tracker" style="margin-top:1.25rem;" @click="$router.push('/tracking')">Done → Tracker</button>
    </section>
  </template>
  
  <script>
  import { ref, computed,nextTick } from 'vue';
  import { useRoute } from 'vue-router';
  import { meds } from '@/store/meds';
  
  export default {
    name: 'DetailPage',
    setup() {
      const route = useRoute();
      const activeTab = ref('dosage');
      const showVideo = ref(false);
      const feeling = ref(''); 
      const taken = ref(false);
      const med = computed(() => meds.find(m => m.id === route.params.id) || meds[0]);
      const onPlay = ()=>{
        showVideo.value = true;
        nextTick(() => {
          const video = document.querySelector('#med-video');
          if (video) video.play().catch(() => {  
    });
          console.log("video", video);
          
        });
      }

      // Dosage tracking
      const toggleTaken = () => {
        taken.value = !taken.value;
        // TODO: persist this in tracker/store
      };

      // Feeling input
      const saveFeeling = () => {
        console.log('Feeling saved for', med.value.id, feeling.value);
        // TODO: persist this in tracker/store
      };
      return { activeTab, med ,showVideo,onPlay, saveFeeling,toggleTaken,taken, feeling};
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

.video-hidden{
  display: none;
}

.med-button {
  background: #fff;
  color: var(--blue) ;
  border: 2px solid var(--blue);
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  font-weight: 600;
  cursor: pointer;
  margin: 0.5rem 0;
  width: 100%;
}
.med-button.taken {
  background: var(--gray-300);
  color: var(--gray-700);
}
.feel-label {
  display: block;
  margin-top: 1rem;
  font-weight: 600;
}
.feel-input {
  width: 96%;
  min-height: 3rem;
  border: 2px solid var(--gray-300);
  border-radius: var(--radius-md);
  padding: 0.5rem;
  margin: 0.5rem 0;
  resize: vertical;
}

.tab-left{
  border-radius: 8px 0 0 8px;
}
.tab-right{
  border-radius: 0px 8px 8px 0px;
}
  </style>