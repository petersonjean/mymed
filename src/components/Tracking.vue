<template>
    <section class="screen" id="screen-tracker">
      <h2>Tracker</h2>
      <div id="ring" class="progress-ring" :style="`--pct:${pct}`">
        <span id="ring-text">{{ done }}/{{ total }}</span>
      </div>
      <form class="checklist">
        <label><input type="checkbox" value="morning" v-model="checked" />☀️ Morning</label>
        <label><input type="checkbox" value="midday" v-model="checked" />💊 Midday</label>
        <label><input type="checkbox" value="evening" v-model="checked" />🌙 Evening</label>
      </form>
      <button id="btn-to-list" @click="$router.push('/')">All Meds</button>
    </section>
  </template>
  
  <script>
  import { ref, computed } from 'vue';
  export default {
    name: 'TrackingPage',
    setup() {
      const total = 3;
      const checked = ref([]);
      const done = computed(() => checked.value.length);
      const pct = computed(() => (done.value/total)*100);
      return { checked, done, total, pct };
    }
  };
  </script>