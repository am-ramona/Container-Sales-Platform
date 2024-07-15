import React, { useEffect, useCallback } from "react";
import { useMenuState, Menu as BaseMenu, MenuItem, MenuButton } from "reakit";
import PropTypes from "prop-types";
import tw from "twin.macro";

const Item = tw(MenuItem)`
block px-4 py-2 text-sm
text-left leading-5 
text-primary-gray
hover:bg-gray-100 
hover:text-primary-blue 
focus:outline-none 
focus:bg-gray-100 
focus:text-primary-blue
w-full
`;

let DropdownMenu = tw(BaseMenu)`
mt-2 w-56 rounded-md 
shadow-lg block bg-white 
outline-none
`;
export default function Dropdown({
  disclosure,
  items,
  isClose = false,
  ...props
}) {
  const menu = useMenuState();

  useEffect(() => {
    // console.log('props.closeDropdown useEffect', props.closeDropdown)
    props.isCartOpen === true && menu.show()
    props.isCartOpen === false && menu.hide()
    isClose === true && menu.hide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isCartOpen, isClose, menu]);

  //   const checkClose = useCallback(
  //     () => {
  //       window.alert('checkClose')
  //       if (isClose === true) { menu.hide()}
  //     },
  //     [isClose, menu]
  // );
  // console.log('props.closeDropdown outside', props.closeDropdown)
  return (
    <>
      <MenuButton {...menu} ref={disclosure.ref} {...disclosure.props}>
        {(disclosureProps) => React.cloneElement(disclosure, disclosureProps)}
      </MenuButton>
      <DropdownMenu {...menu} {...props} style={{ width: props.width }}>
        {items.map((item, i) => (
          <Item {...menu} {...item.props} key={i}>
            {(itemProps) => React.cloneElement(item, itemProps)}
          </Item>
        ))}
      </DropdownMenu>
    </>
  );
}

Dropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node),
  disclosure: PropTypes.node,
};
