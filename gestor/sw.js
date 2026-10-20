/* LexMonitor Admin · SW propio (scope /lexmonitor/gestor/). Solo guarda el lanzador; no toca la demo ni /app/ ni respuestas del Worker. */
const C='lm-gestor-v1', F=['./','index.html','manifest.webmanifest','icons/icon.svg','icons/icon-192.png','icons/icon-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(F)).then(()=>self.skipWaiting())); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x.startsWith('lm-gestor-')&&x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())); });
self.addEventListener('fetch',e=>{ const u=new URL(e.request.url); if(e.request.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('/lexmonitor/gestor/')) return;
  e.respondWith(fetch(e.request).then(r=>{ const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); return r; }).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html')))); });
