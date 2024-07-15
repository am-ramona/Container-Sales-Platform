import React, { useState } from "react";

export const NavbarContext = React.createContext();

export const NavbarProvider = ({ children }) => {
  const [quantity, setQuantity] = useState({})
  const [isVignetteShown, setIsVignetteShown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // function toggleVignette() {
  //   setIsVignetteShown(!isVignetteShown);
  // }

  // function closeNavbar() {
  //   setIsCartOpen(false);
  // }

  const value = {
    quantity,
    setQuantity,
    isVignetteShown,
    setIsVignetteShown,
    isCartOpen,
    setIsCartOpen
  };

  // console.log("value in NavbarContext", value)

  return (
    <NavbarContext.Provider value={value}>{children}</NavbarContext.Provider>
  );
};
