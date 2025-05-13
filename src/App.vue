<template>
  <div id="app" class="main">
    <router-view />
  </div>
</template>

<script>
export default { name: 'App' };
</script>

<style>
/*––– DESIGN TOKENS –––––––––––––––––––––*/
:root{ --blue:#007aff; --blue-dark:#0051c6; --gray-100:#f2f4f7; --gray-300:#d0d5dc; --gray-700:#3d4754; --radius-lg:18px; --radius-md:12px; --shadow:0 4px 6px rgba(0,0,0,0.1); }
html, body { margin:0; background:var(--gray-100); color:var(--gray-700); font-family:system-ui, sans-serif; }
h1,h2,h3{margin:0 0 .5rem;}
button{ font-size:1.05rem; font-weight:600; padding:1rem 1.5rem; border:none; border-radius:var(--radius-md); color:#fff; background:var(--blue); cursor:pointer; width:100%; }
button:active{background:var(--blue-dark);}
.hidden{display:none!important;}
.main{ max-width:480px; margin:0 auto; padding:1rem .5rem 4rem; }
.screen{ background:#fff; border-radius:var(--radius-lg); box-shadow:var(--shadow); padding:1.5rem 1.25rem 2.5rem; margin-bottom:1rem; }
.med-photo{width:100%; border-radius:var(--radius-md); object-fit:cover;}
.ai-avatar{width:96px; height:96px; border-radius:50%; object-fit:cover; margin:1rem auto; display:block;}
.tab-row{display:flex; margin:.75rem 0 1rem;}
.tab-row button{flex:1; padding:.75rem 0; background:var(--gray-100); color:var(--gray-700); border-radius:0; border:1px solid var(--gray-300); border-right:none;}
.tab-row button:last-child{border-right:1px solid var(--gray-300);}
.tab-row button.active{background:var(--blue); color:#fff;}
.progress-ring{width:120px; height:120px; border-radius:50%; background:conic-gradient(var(--blue) calc(var(--pct)*1%), var(--gray-300) 0); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:1.25rem; color:var(--gray-700); margin:0 auto 1rem;}
.checklist input{width:28px; height:28px;}
.checklist label{display:flex; align-items:center; gap:.75rem;}
.med-card{background:var(--gray-100); border-radius:var(--radius-md); padding:.75rem 1rem; margin-bottom:.75rem; display:flex; justify-content:space-between; align-items:center; font-size:1.1rem;}

/*––– 1. SCAN ––––––––––––––––––––––––––*/
/* #camera-view{ width:100%; aspect-ratio:3/4; background:#000; border-radius:var(--radius-lg); position:relative; overflow:hidden; margin-bottom:1rem; }
#camera-stream{ width:100%; height:100%; object-fit:cover; }
#camera-frame{ position:absolute; inset:0; border:6px solid #fff; border-radius:var(--radius-lg); pointer-events:none; } */
#camera-view{width:100%;aspect-ratio:3/4;background:#000;border-radius:var(--radius-lg);position:relative;overflow:hidden;margin-bottom:1rem;} #camera-stream{width:100%;height:100%;} #camera-stream video,#camera-stream canvas{width:100%!important;height:100%!important;object-fit:cover;} #camera-frame{position:absolute;inset:0;border:6px solid #fff;border-radius:var(--radius-lg);pointer-events:none;}

</style>