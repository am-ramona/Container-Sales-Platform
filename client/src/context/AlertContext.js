import React, { useState } from "react";

export const AlertContext = React.createContext();

export const AlertProvider = ({ children }) => {
  const [isAlert, setIsAlert] = useState(false);

  function triggerAlert() {
    setIsAlert(!isAlert);
  }

  function dismissAlert() {
    setIsAlert(false);
  }

  const value = {
    isAlertTrue,
    triggerAlert,
    dismissAlert
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
};
