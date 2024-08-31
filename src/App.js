import React, { useEffect } from 'react';
import { getMessaging, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './firebaseConfig';
import { sendNativeNotification } from './notificationHelpers';
import useVisibilityChange from './useVisibilityChange';
import MainPage from "./MainPage";
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function App() {
  const isForeground = useVisibilityChange();

  useEffect(() => {
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      const { title, body } = payload.notification;

      sendNativeNotification({ title, body });
    });
  }, [isForeground]);

  return (
    <div className="App">
    <MainPage />
  </div>
  );
}

export default App;
