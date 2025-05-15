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
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="scanTips" class="tips">{{ scanTips }}</p> 
    </section>
    </template>
  <script>
  /* eslint-disable no-unused-vars, no-undef */
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { meds } from '@/store/meds';
  import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
  
  export default {
    name: 'ScanPage',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const med = meds.find(m=>m.id===route.params.id) || meds[0];
      const mode = ref('qr');
      const isScanning = ref(false);
      const errorMessage = ref('');
      const scanTips = ref('Hold device steady, ensure lighting, fill frame.');
      let qr;
      const cfg = { fps: 10, qrbox: 250 };
  
      const onScan = decoded => {
        console.log("decoded:", decoded);
        
        const match = decoded.match(/^https:\/\/mymed-puce\.vercel\.app\/med\/(\d+)/);
        if (match && match[1] === med.id) {
          // Stop the scanner, then navigate
          qr
            .stop()                 // returns a Promise
            .catch(() => {})        // swallow any “not running” errors
            .then(() => {
              isScanning.value = false;
              console.log("finished stop", med.id);
              
              router.push({ name: 'DetailPage', params: { id: med.id } });
            });
          
        } else {
          errorMessage.value = 'This code does not match the selected medication.';
        }
      };
  
      const startScanner = async () => {
        try {
          errorMessage.value = '';
          isScanning.value = true;
          qr = new Html5Qrcode('camera-stream');
          // prefer back camera
          await qr.start(
            { facingMode: { exact: 'environment' } },
            cfg,
            onScan,
            err => { if (!err.includes('NotFoundException')) console.warn(err); }
          );
        } catch {
          // fallback to any camera
          try {
            const cams = await Html5Qrcode.getCameras();
            if (cams && cams.length) {
              await qr.start(cams[0].id, cfg, onScan, err => {});
            } else {
              throw new Error('No cameras found');
            }
          } catch (e) {
            errorMessage.value = `Camera error: ${e.message}`;
            isScanning.value = false;
          }
        }
      };
  
      const stopScanner = () => {
        if (qr) {
          qr.stop().catch(()=>{});
        }
        isScanning.value = false;
      };
  
      const toggleScan = () => {
        if (isScanning.value) stopScanner(); else startScanner();
      };
  
      onMounted(startScanner);
      
  
      return { med, mode, isScanning, errorMessage, scanTips, toggleScan };
    }
  };
  </script>
  
  <style scoped>
  .error { color: red; margin-top: 0.5rem; }
  .tips { color: #666; font-style: italic; margin-top: 0.25rem; }
  </style>
  