importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBKL2I-Gv82X-q47RQzaz86vCK7DQuaTIQ",
    authDomain: "lxslifestylestore-8935b.firebaseapp.com",
    projectId: "lxslifestylestore-8935b",
    storageBucket: "lxslifestylestore-8935b.firebasestorage.app",
    messagingSenderId: "800913751199",
    appId: "1:800913751199:web:b5dd70daaf8faa1a6cb6aa"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.image,
    data: {
      url: "http://localhost:5173/setting/dashboard"
    }
  });
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let client of clientList) {
        if ('focus' in client) {
          client.focus();
          client.navigate(event.notification.data.url);
          return;
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});