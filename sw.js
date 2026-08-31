var CACHE="kiroku-v2";
var FILES=["./","./index.html","./manifest.webmanifest","./icon-180.png","./icon-192.png","./icon-512.png"];
self.addEventListener("install",function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES);}).catch(function(){}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){
  e.waitUntil(caches.keys().then(function(k){return Promise.all(k.map(function(x){return x===CACHE?null:caches.delete(x);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  if(e.request.method!=="GET")return;
  if(e.request.mode==="navigate"){
    e.respondWith(fetch(e.request).then(function(r){var c=r.clone();caches.open(CACHE).then(function(cc){cc.put("./index.html",c);});return r;})
      .catch(function(){return caches.match("./index.html");}));return;}
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));});
