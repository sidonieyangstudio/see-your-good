// 線上永遠抓最新，離線用上次存下來的
const CACHE='see-your-good-99b2207758';
const SHELL=['./','./index.html','./manifest.json','./icons/icon-180.png','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.match(r).then(h=>h||fetch(r).then(x=>{const k=x.clone();caches.open(CACHE).then(c=>c.put(r,k));return x})));return}
 if(u.origin!==location.origin)return;
 e.respondWith(fetch(r).then(x=>{if(x.ok){const k=x.clone();caches.open(CACHE).then(c=>c.put(r,k))}return x}).catch(()=>caches.match(r).then(h=>h||caches.match('./index.html'))))});
