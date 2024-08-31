import { initializeApp } from 'firebase/app';
import { getMessaging, getToken as getFirebaseToken, onMessage } from 'firebase/messaging';
import { firebaseConfig } from './firebaseConfig';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const setupNotifications = (callback) => {
  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload); // Debugging line
    callback(payload);
  });
};

export const getToken = async () => {
  try {
    const currentToken = localStorage.getItem('fcmToken');
    if (currentToken) {
      console.log('FCM Token from localStorage:', currentToken);
      return currentToken;
    } else {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted.');

        const token = await getFirebaseToken(messaging, { vapidKey: 'BF9Q0ytyvFzr7aZRCqwNQRhYGhTkO9NFZyQDU_FUNQ5rV0jcZ0_hYjjB9yd5CGzFGQrPDLEDSX03K8_FR1d3v6g' });
        if (token) {
          console.log('FCM Token:', token);
          localStorage.setItem('fcmToken', token);
          return token;
        } else {
          console.log('Failed to get FCM token.');
          return null;
        }
      } else {
        console.log('Notification permission not granted.');
        return null;
      }
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};
export const checkNotificationPermission = async () => {
    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return Notification.permission === 'granted';
  };
  
