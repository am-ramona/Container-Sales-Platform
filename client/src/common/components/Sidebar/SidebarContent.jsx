import React, { useContext } from "react";
import { NavLink, Route } from "react-router-dom";
import { routes } from "../../../routes/sidebar";
import SidebarSubmenu from "./SidebarSubmenu";
import SidebarIcons from "./SidebarIcons";
import { SidebarContext } from "../../../context/SidebarContext";
import tw from "twin.macro";

const StyledNavLink = tw(NavLink)`
inline-flex text-primary-blue 
items-center w-full text-lg h-full
active:bg-secondary-gray
hover:bg-secondary-gray
`;

const SidebarListItem = tw.li`
relative min-h-10 mb-xs
active:bg-secondary-gray
hover:bg-secondary-gray
grid`;

const SelectedItemIndicator = tw.span`
absolute inset-y-0
left-0 w-1 
bg-primary-blue 
rounded-tr-lg rounded-br-lg
`;

function SidebarContent() {
  const { role } = useContext(SidebarContext);

  return (
    <div tw="py-4 text-gray-500">
      <ul tw="mt-6">
        {routes[role].map((route) =>
          route.routes ? (
            <SidebarSubmenu key={route.name} route={route} />
          ) : (
            <SidebarListItem key={route.name}>
              <StyledNavLink exact to={route.path}>
                <Route path={route.path} exact={route.exact}>
                  <SelectedItemIndicator aria-hidden="true" />
                </Route>
                <SidebarIcons
                  tw="w-7 h-7 ml-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span tw="ml-2 text-17 text-primary-blue font-medium">{route.name}</span>
              </StyledNavLink>
            </SidebarListItem>
          )
        )}
      </ul>
    </div>
  );
}

export default SidebarContent;
