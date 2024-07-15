import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  disconnectUser,
} from "../../../redux";
import { SidebarContext } from "../../../context/SidebarContext";
import PropTypes from "prop-types";
import Dropdown from "../Dropdown";
import { Button } from "../../styles";
import Logo from "../Logo";
import { MenuIcon } from "../../../assets/icons";
import tw from "twin.macro";

const Wrapper = tw.header`
z-layout-header 
fixed top-0 
inset-x-0 
h-16 bg-white 
shadow-md
`;

const InnerWrapper = tw.div`
flex items-center 
justify-between h-full 
px-6 mx-auto
`;

const MenuBtn = tw(Button)`
p-1 mr-5 -ml-1 
rounded-md 
lg:hidden 
focus:outline-none
`;

const List = tw.ul`
flex items-center 
flex-shrink-0 
space-x-6
`;

const DropdownBtn = tw(Button)`
inline-flex justify-center
w-full bg-white
leading-5 font-medium 
hover:text-primary-blue 
focus:outline-none 
focus-visible:ring-2
`;

function Header({ items, username, ...props }) {
  let history = useHistory();
  const { loggedIn, disconnectUser } = props;
  const { toggleSidebar } = useContext(SidebarContext);

  const handleLogoutClick = (event) => {
    if (loggedIn) {
      disconnectUser();
      window.localStorage.clear();
      history.push('/')
    }
  };

  return (
    <Wrapper>
      <InnerWrapper>
        <MenuBtn onClick={toggleSidebar} aria-label="Menu">
          <MenuIcon tw="w-6 h-6" />
        </MenuBtn>
        <a tw="lg:block hidden" href="/">
          <Logo />
        </a>
        <List>
          <li tw="flex">
            <Dropdown
              aria-label="Menu"
              disclosure={
                <DropdownBtn>
                  <h1 tw="text-primary-blue text-15">{username}</h1>
                  <svg
                    tw="-mr-1 ml-2 -mt-0.5 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </DropdownBtn>
              }
              items={items.map((item) =>
                item.label !== "Logout" ? (
                  <Link tw="text-primary-blue text-14" to={item.link}>{item.label}</Link>
                ) : (
                  <span tw="text-primary-blue text-14 cursor-pointer" onClick={(evt) => handleLogoutClick(evt)}>
                    {item.label}
                  </span>
                )
              )}
            ></Dropdown>
          </li>
        </List>
      </InnerWrapper>
    </Wrapper>
  );
}

Header.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ),
  username: PropTypes.string.isRequired,
};

function mapStateToProps(state, props) {
  return {
    loggedIn: state.loggedIn,
  };
}

const mapDispatchToProps = {
  disconnectUser
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
