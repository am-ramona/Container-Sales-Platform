import React, { useContext } from "react";
import { NavbarContext } from "./NavbarContext";

function Scoreboard() {
  const quantity = useContext(NavbarContext);

  return <div>Score: {quantity}</div>;
}

export default Scoreboard;
