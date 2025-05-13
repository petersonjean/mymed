<template>
    <section class="screen" id="screen-scan">
      <h2>Scan Medication</h2>
      <div id="camera-view">
        <video id="camera-stream" autoplay playsinline></video>
        <div id="camera-frame"></div>
      </div>
      <div style="margin:.75rem 0; display:flex; gap:1rem;">
        <label><input type="radio" value="qr" v-model="mode"> QR Code</label>
        <label><input type="radio" value="rfid" v-model="mode"> RFID</label>
      </div>
      <button id="btn-scan" @click="goDetail">📷 Scan</button>
    </section>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  export default {
    name: 'ScanPage',
    setup() {
      const mode = ref('qr');
      const router = useRouter();
      const goDetail = () => router.push('/detail');
      onMounted(() => {
        // TODO: integrate actual QR/RFID scan logic
      });
      return { mode, goDetail };
    }
  };
  </script>