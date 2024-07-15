
import React, { useState } from "react";

// create context
export const CustomClearanceContext = React.createContext();

export const CustomClearanceProvider = ({ children }) => {
  const [customClearanceDocument, setCustomClearanceDocument] = useState("");
  const [paymentProofDocument, setPaymentProofDocument] = useState("");

  const value = {
    customClearanceDocument,
    setCustomClearanceDocument,
    paymentProofDocument,
    setPaymentProofDocument,
  };

  return (
    <CustomClearanceContext.Provider value={value}>{children}</CustomClearanceContext.Provider>
  );
};

