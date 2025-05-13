<template>
    <section class="screen" id="screen-list">
      <h2>Hello, Tony</h2>
      <h3>Today’s Meds</h3>
      <article v-for="med in todaysMeds" :key="med.id" class="med-card">
        <span>{{ med.name }}</span><span>{{ med.dosage }}</span>
      </article>
      <button @click="$router.push('/tracking')">History</button>
      <button @click="$router.push('/scan')" style="margin-top:.75rem;">Scan Label</button>
    </section>
  </template>
  
  <script>
  import { ref } from 'vue';
  export default {
    name: 'HomePage',
    setup() {
      const todaysMeds = ref([
        { id: 1, name: 'Antibiotic', dosage: '1 pill' },
        { id: 2, name: 'Vitamin D', dosage: '1 pill' },
        { id: 3, name: 'Lorazepam', dosage: '0.5 mg' },
      ]);
      return { todaysMeds };
    }
  };
  </script>