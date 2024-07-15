import React, { useContext } from "react";
import SidebarContent from "./SidebarContent";
import { SidebarContext } from "../../../context/SidebarContext";
import tw from "twin.macro";

const Sidebar = tw.aside`
fixed inset-y-0 
z-mobile-sidebar 
flex-shrink-0
mt-16 overflow-y-auto 
bg-white lg:hidden
`;

const Backdrop = tw.div`
fixed inset-0 
z-mobile-backdrop 
flex items-end bg-black 
bg-opacity-50 sm:items-center 
sm:justify-center
`;

function MobileSidebar() {
  const { isSidebarOpen, closeSidebar } = useContext(SidebarContext);

  return (
    <>
      {isSidebarOpen ? (
        <>
          <Backdrop onClick={closeSidebar}></Backdrop>
          <Sidebar>
            <SidebarContent />
          </Sidebar>
        </>
      ) : null}
    </>
  );
}

export default MobileSidebar;
