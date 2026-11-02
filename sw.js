// Augmentez le numéro de version à chaque mise à jour de l'application
const C='boutiko-v4',F=['./','./index.html','./manifest.webmanifest','./icon.svg','./icon-180.png','./icon-192.png','./icon-512.png','https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];
self.addEventListener('install',e=>e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!=C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!='GET'||u.hostname.endsWith('supabase.co'))return;
 // Pages : réseau d'abord (toujours la dernière version), cache si hors ligne
 if(e.request.mode=='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/')){
  e.respondWith(fetch(e.request).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put(e.request,c));return x}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(x=>{const c=x.clone();caches.open(C).then(k=>k.put(e.request,c));return x}).catch(()=>caches.match('./index.html'))));
});
