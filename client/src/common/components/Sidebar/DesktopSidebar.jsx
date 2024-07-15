import React from "react";
import tw from "twin.macro";
import SidebarContent from "./SidebarContent";

const Sidebar = tw.aside`
z-desktop-sidebar 
flex-shrink-0 
hidden w-72 
overflow-y-auto 
bg-white lg:block 
shadow-md h-containersSelection
`;

function DesktopSidebar() {
  return (
    <Sidebar>
      <SidebarContent />
    </Sidebar>
  );
}

export default DesktopSidebar;
