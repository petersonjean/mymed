import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Scan from '../components/Scan.vue';
import Detail from '../components/Detail.vue';
import Tracking from '../components/Tracking.vue';

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/scan/:id', name: 'ScanPage', component: Scan, props: true }, //id of selected today's med
  { path: '/detail/:id', name: 'DetailPage', component: Detail, props: true }, //id from scan qrcode/rfid
  { path: '/tracking', name: 'TrackingPage', component: Tracking },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;