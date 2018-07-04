var cacheName = 'pwatest11';
var dataCacheName = 'pwatest11';
/*
var filesToCache = [
  '/pwatest/static/index.html',
  '/pwatest/static/css/',
  '/pwatest/static/img/',
  '/pwatest/static/',
  '/pwatest/static/js/'
];
*/
/*
var filesToCache = [
  '/pwatest/static/css/',
  '/pwatest/static/img/',
  '/pwatest/static/js/'
];
*/
var filesToCache = [
];
//var offlineUrl="/pwatest/static/login.html";
var offlineUrl="";
relist();
async function relist(){
  console.log("9999999")
await self.addEventListener('install', function(event) {
    //debugger;
    console.log('Service Worker installing.');
    event.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
});

await self.addEventListener('activate', function(event) {
    console.log('Service Worker activating.');  
    event.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

await self.addEventListener('fetch', function(event) {
  if (event.request.mode === 'navigate' || (event.request.method === 'POST')) {
    event.respondWith(
      fetch(event.request.url).catch(error => {
          // Return the offline page
          // 返回离线页面
          return caches.match(offlineUrl);
      })
    );
  }else{
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
      )
    );
  }
});

await self.addEventListener('push', function(event) {  
  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = './img/icon128x128.png';  
  var tag = 'simple-push-example-tag';
  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});
}