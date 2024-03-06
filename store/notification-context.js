import { createContext, useEffect, useState } from "react";


const NotificationContext = createContext({
  notification: null, // { title, message, status }
  showNotification: function (notificationData) {},
  hideNotification: function () {},
});

export function NotificationContextProvider(props) {
  const [activeNotification, seActivetNotification] = useState();

  const showNotification = (notificationData) => {
    seActivetNotification(notificationData);
  };

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === "success" ||
        activeNotification.status === "error")
    ) {
      const timer = setTimeout(() => {
        hideNotification();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  const hideNotification = () => {
    seActivetNotification(null);
  };

  const context = {
    notification: activeNotification,
    showNotification: showNotification,
    hideNotification: hideNotification,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
