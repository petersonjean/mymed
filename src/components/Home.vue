<template>
    <section class="screen" id="screen-list">
      <h2>Hello, Tony</h2>
      <h3>Today’s Meds</h3>
      <article v-for="med in meds" :key="med.id" class="med-card" @click="goScan(med.id)">
      <span>Scan {{ med.name }}</span><span>{{ med.dosage }}</span>
    </article>
      <button @click="$router.push('/tracking')">History</button>
      <!-- <button @click="$router.push('/scan')" style="margin-top:.75rem;">Scan Label</button> -->
    </section>
  </template>
  
  <script> 
  import { meds } from '@/store/meds';
  import { useRouter } from 'vue-router';
export default { name: 'HomePage', 
setup() {
  const medsList = meds;
    const router = useRouter();
    const goScan = (id) => router.push({ name: 'ScanPage', params: { id } });
    return { meds: medsList, goScan };
  }
   };
  
  </script>