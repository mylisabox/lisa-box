'use strict';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "index.html": "49b054a3585ca99c8a529a318690e093",
"main.dart.js": "357071d23fabc2035237cf429bbc6ddc",
"assets/LICENSE": "90fac7b91676f9201a8e023298f25a51",
"assets/AssetManifest.json": "d9dd3587b89033350ff632f0ef9361bc",
"assets/FontManifest.json": "62afa70aefd89df1400afb7833aed5a8",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "9a62a954b81a1ad45a58b9bcea89b50b",
"assets/fonts/MaterialIcons-Regular.ttf": "56d3ffdef7a25659eab6a68a3fbfaf16",
"assets/assets/images/bg_login_portrait.jpg": "ce5b6db560e4a7459f919e0ba8e8e8a6",
"assets/assets/images/bg_login_landscape.jpg": "fd6a86ecce87e769d1f1f0b48f94a212",
"assets/assets/images/lisa.png": "e7b686d15f157699088057e982df72f5",
"assets/assets/images/logo.png": "2fd25730be5e7c51553602ba88205837",
"assets/assets/fonts/Raleway-SemiBold.ttf": "6ec58d1ea836b7ef69f94ea6770972a3",
"assets/assets/fonts/Raleway-Regular.ttf": "84abe14c9756256a4b91300ba3e4ec62",
"assets/assets/fonts/Raleway-Italic.ttf": "e97be495a4a423cf1dd376b9becca841",
"assets/assets/fonts/Raleway-Bold.ttf": "2f99a85426a45e0c7f8707aae53af803",
"assets/assets/animations/AudioWave.flr": "6d3be0d072c593cb1468b9a4eb7229ff",
"assets/assets/animations/intro.flr": "9a2835b4cf6ccc59fa7e1083cb7e9846"
};

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheName) {
      return caches.delete(cacheName);
    }).then(function (_) {
      return caches.open(CACHE_NAME);
    }).then(function (cache) {
      return cache.addAll(Object.keys(RESOURCES));
    })
  );
});

self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request)
      .then(function (response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
