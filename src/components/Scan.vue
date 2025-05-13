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
    import { ref, onMounted,onBeforeUnmount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { meds } from '@/store/meds';
    import { Html5Qrcode } from 'html5-qrcode';
   
  export default {
    name: 'ScanPage',
    setup() {
      const route = useRoute();
      const router = useRouter();
      const med = meds.find(m=>m.id===route.params.id)||meds[0];
      let qr;
  
      const cfg={fps:10,qrbox:250};
      const onScan=s=>{const m=s.match(/^https:\/\/mymed-puce\.vercel\.app\/(\d+)/);if(m&&m[1]===med.id){qr.stop().catch(()=>{});router.push({name:'DetailPage',params:{id:med.id}});}else alert('Wrong medication code.');};
  
      const start=async()=>{
        if(qr) await qr.stop().catch(()=>{});
        qr=new Html5Qrcode('camera-stream');
        // prefer back cam on mobile; fallback to first camera id
        try{
          await qr.start({facingMode:{exact:'environment'}},cfg,onScan,console.warn);
        }catch(e){
          try{
            await qr.start({facingMode:'environment'},cfg,onScan,console.warn);
          }catch(e2){
            const cams=await Html5Qrcode.getCameras();
            if(cams.length) await qr.start(cams[0].id,cfg,onScan,console.warn);
            else alert('No camera found');
          }
        }
      };
  
      const restart=()=>start();
  
      onMounted(()=>{start();});
      onBeforeUnmount(()=>{qr&&qr.stop().catch(()=>{});});
  
      return{med,restart};
    }
  }; 
  
    </script>