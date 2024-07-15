import React, { useState } from "react";
import { Link, Route } from "react-router-dom";
import Collapse from "../Collapse";
import SidebarIcons from "./SidebarIcons";
import tw from "twin.macro";

const SelectedItemIndicator = tw.span`
absolute inset-y-0
left-0 w-1 
bg-primary-blue 
rounded-tr-lg rounded-br-lg
`;

function SidebarSubmenu({ route }) {
  const [active, setActive] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const activate = (index) => {
    setActive(true);
    setActiveLink(index);
  };

  return (
    <li tw="relative min-h-10 mb-xs" key={route.name}>
      <Collapse
        tw="grid p-0 hover:bg-secondary-gray"
        trigger={
          <span tw="min-h-10 inline-flex text-primary-blue items-center text-17">
            <SidebarIcons
              tw="w-7 h-7 ml-5"
              aria-hidden="true"
              icon={route.icon}
            />
            <span tw="ml-2 text-17 font-medium">{route.name} </span>
          </span>
        }
      >
        <ul tw="font-medium text-primary-blue" aria-label="submenu">
          {route.routes.map((r, i) => (
            <li
              tw="relative min-h-10 mb-xs grid content-center justify-start hover:bg-secondary-gray"
              key={r.name}
              onClick={() => activate(i)}
              className={
                i === activeLink &&
                active &&
                window.location.href.substring(
                  window.location.href.lastIndexOf("/") + 1
                ) === r.name.replace(/\s+/g, "-").toLowerCase()
                  ? " active"
                  : ""
              }
            >
              <Link tw="text-sm" to={r.path}>
                <Route path={r.path} exact={r.exact}>
                  {active && <SelectedItemIndicator aria-hidden="true" />}
                </Route>
                <SidebarIcons
                  tw="w-7 h-7 ml-8 inline"
                  aria-hidden="true"
                  icon={r.icon}
                />
                <span tw="ml-2 leading-7">{r.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Collapse>
    </li>
  );
}

export default SidebarSubmenu;
