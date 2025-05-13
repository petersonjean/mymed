import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import Scan from '../components/Scan.vue';
import Detail from '../components/Detail.vue';
import Tracking from '../components/Tracking.vue';

const routes = [
  { path: '/', name: 'HomePage', component: Home },
  { path: '/scan', name: 'ScanPage', component: Scan },
  { path: '/detail', name: 'DetailPage', component: Detail },
  { path: '/tracking', name: 'TrackingPage', component: Tracking },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;