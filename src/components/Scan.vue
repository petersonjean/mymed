<template>
<section class="screen" id="screen-scan">
    <h2>Scan {{ med.name }}</h2>
    <div id="camera-view">
      <!-- html5-qrcode injects its own video into this div -->
      <div id="camera-stream"></div>
      <div id="camera-frame"></div>
    </div>
    <div style="margin:.75rem 0; display:flex; gap:1rem;">
      <label><input type="radio" value="qr" v-model="mode"> QR Code</label>
      <label><input type="radio" value="rfid" v-model="mode"> RFID</label>
    </div>
    <p>Please scan the QR code on your <strong>{{ med.name }}</strong> packaging.</p>
    <button id="btn-scan" @click="startScan">📷 Scan</button>
  </section>
  </template>
  
  <script> 
/* eslint-disable no-unused-vars, no-undef */
  import { ref, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { meds } from '@/store/meds';
  import { Html5Qrcode } from 'html5-qrcode';
 
export default {
  name: 'ScanPage',
  setup() {
    const route = useRoute();
    const router = useRouter();
    console.log("params", route.params);
    
    const med = meds.find(m => m.id === route.params.id) || meds[0];
    let html5QrCode;

    const handleResult = (text) => {
      const match = text.match(/^https:\/\/mymed-puce\.vercel\.app\/(\d+)/);
      if (match && match[1] === med.id) {
        html5QrCode.stop().catch(() => {});
        router.push({ name: 'MedicationDetail', params: { id: med.id } });
      } else {
        alert('Scanned code does not match this medication.');
      }
    };

    const startScan = () => {
      if (html5QrCode) html5QrCode.stop().catch(() => {});
      html5QrCode = new Html5Qrcode('camera-stream');
      html5QrCode.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 250 },
        (decoded) => handleResult(decoded),
        (err) => console.warn(err)
      ).catch(console.error);
    };

    onMounted(() => {
      startScan();
    });


    return { med, startScan };
  }
}; 

  </script>