<template>
  <section class="screen" id="screen-scan">
    <h2>Scan {{ med.name }}</h2>
    <div id="camera-view">
      <div id="camera-stream"></div>
      <div id="camera-frame"></div>
    </div>
    <div style="margin:.75rem 0; display:flex; gap:1rem;">
      <label><input type="radio" value="qr" v-model="mode"> QR Code</label>
      <label><input type="radio" value="rfid" v-model="mode"> RFID</label>
    </div>
    <p>Please scan the QR code on your <strong>{{ med.name }}</strong> packaging.</p>
    <button id="btn-scan" @click="restart">📷 {{ isScanning ? 'Stop Scan' : 'Start Scan' }}</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="scanTips" class="tips">{{ scanTips }}</p>
  </section>
</template>

<script>
/* eslint-disable */ 
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter, useRoute } from 'vue-router'; 
import { Html5Qrcode, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { meds } from '@/store/meds';

export default {
  name: 'ScanPage',
  setup() {
    const route = useRoute();
    const router = useRouter(); 
    const med = meds.find(m => m.id === route.params.id) || meds[0];
    const qrScanner = ref(null);
    const isScanning = ref(false);
    const errorMessage = ref('');
    const scanTips = ref('');


    // const config = {
    //   fps: 10,
    //   qrbox: { width: 250, height: 250 },
    //   supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
    //   formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
    // };
    const config = {
      fps: 10,
      qrbox: 250, // Can also use { width: 250, height: 250 }
      disableFlip: false // Important for better detection
    };


    const onScanSuccess = (decodedText) => {
      try {
        const url = new URL(decodedText);
        if (url.hostname === 'mymed-puce.vercel.app') {
          const medId = url.pathname.split('/')[1];
          if (medId === med.id) {
            stopScanner();
            router.push({ name: 'DetailPage', params: { id: med.id } });
          } else {
            errorMessage.value = 'This QR code is for a different medication.';
          }
        }
      } catch (e) {
        errorMessage.value = 'Please scan a valid medication QR code.';
      }
    };

    const onScanError = (error) => {
      if (!error.includes('NotFoundException')) {
        errorMessage.value = `Scan error: ${error}`;
      }
      scanTips.value = 'Tips: Hold steady, ensure good lighting, and fill the frame with the QR code.';
    };

    const startScanner = async () => {
      try {
        errorMessage.value = '';
        scanTips.value = '';
        isScanning.value = true;
        
        qrScanner.value = new Html5Qrcode('camera-stream');
        
        // Try environment (back) camera first, then user (front) camera
        await qrScanner.value.start(
          { facingMode: "environment" },
          config,
          onScanSuccess,
          onScanError
        ).catch(async () => {
          // Fallback to user-facing camera if environment fails
          await qrScanner.value.start(
            { facingMode: "user" },
            config,
            onScanSuccess,
            onScanError
          );
        });
      } catch (err) {
        errorMessage.value = `Camera error: ${err.message}`;
        isScanning.value = false;
        scanTips.value = 'Please ensure camera permissions are granted.';
      }
    };


    const stopScanner = async () => {
      try {
        if (qrScanner.value && isScanning.value) {
          await qrScanner.value.stop();
          qrScanner.value.clear();
        }
      } catch (err) {
        console.warn('Error stopping scanner:', err);
      } finally {
        isScanning.value = false;
      }
    };

    const restart = async () => {
      await stopScanner();
      await startScanner();
    };


    onMounted(() => {
      startScanner();
    });

    onBeforeUnmount(() => {
      stopScanner();
    });

    return { med, restart, isScanning, errorMessage, scanTips };
  }
};
</script>

<style scoped>
.error {
  color: red;
  margin-top: 1rem;
}
.tips {
  color: #666;
  font-style: italic;
  margin-top: 0.5rem;
}
</style>