import React, { useContext } from "react";
import PropTypes from "prop-types";
import { SidebarContext } from "../../../context/SidebarContext";
import Logo from "../Logo";
import { MenuIcon } from "../../../assets/icons";
import Dropdown from "../Dropdown";
import { Button } from "../../styles";
// import { Link } from "react-router-dom";
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

function ShoppingCart({ items, username }) {
  const { toggleSidebar } = useContext(SidebarContext);

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
              // case="userProfile"
              disclosure={
                <DropdownBtn>
                  <h1>{username}</h1>
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
              >
                    <div tw="flex flex-wrap">
                      <LeftSide>
                        <Card tw="p-8 overflow-x-auto">
                          <CartTable>
                            <thead>
                              <tr tw="border-b">
                                <CartTableTh>Details</CartTableTh>
                                <CartTableTh>Quantity</CartTableTh>
                                <CartTableTh>Price</CartTableTh>
                              </tr>
                            </thead>
                            <tbody>
                              <tr tw="py-10">
                                <CartTableTd>
                                  <Container3DIcon tw="inline mr-5" />
                                  Reefer, Recycle, 40' HC
                                </CartTableTd>
                                <CartTableTd>1</CartTableTd>
                                <CartTableTd>$1,100</CartTableTd>
                              </tr>
                              <tr>
                                <CartTableTd>VAT</CartTableTd>
                                <CartTableTd>10%</CartTableTd>
                                <CartTableTd>$1,100</CartTableTd>
                              </tr>
                            </tbody>
                          </CartTable>
                        </Card>
                        <br />
                        {/*Customs Clearance ... TO BE REMOVED */}
                        <Card>
                          <h1 tw="text-primary-blue text-lg mb-4">
                            Choose customs clearance service
                          </h1>
                          <div tw="flex flex-col space-y-3">
                            <label tw="inline-flex items-center ">
                              <input
                                type="radio"
                                name="customs"
                                tw=" h-5 w-5 text-primary-blue"
                              />
                              <span tw="ml-2 text-gray-700">With CMA CGM | $50</span>
                            </label>
                            <label tw="inline-flex items-center mt-3">
                              <input
                                type="radio"
                                name="customs"
                                tw="h-5 w-5 text-primary-blue"
                              />
                              <span tw="ml-2 text-gray-700">Other</span>
                            </label>
                          </div>
                        </Card>
                        {/*Customs Clearance ... TO BE REMOVED */}
                      </LeftSide>
                      <RightSide>
                        <OrderSummaryCard>
                          <OrderSummaryCardHeader>Order Summary</OrderSummaryCardHeader>
                          <hr />
                          <CartTable>
                            <tbody>
                              <tr tw="py-10">
                                <CartTableTd>Reefer</CartTableTd>
                                <CartTableTd>1</CartTableTd>
                                <CartTableTd>$1,100</CartTableTd>
                              </tr>
                              <tr>
                                <CartTableTd>VAT</CartTableTd>
                                <CartTableTd>10%</CartTableTd>
                                <CartTableTd>$1,100</CartTableTd>
                              </tr>
                            </tbody>
                          </CartTable>
                          <hr />
                          <div tw="flex justify-between mb-4 mt-4">
                            <h1 tw="text-primary-blue font-semibold"> Total Cost </h1>
                            <h1 tw="text-primary-blue font-semibold"> $3910 </h1>
                          </div>
                          <CheckoutBtn
                            color="primary-blue"
                            onClick={() => {
                              toggleStep(2);
                            }}
                          >
                            Checkout
                          </CheckoutBtn>
                        </OrderSummaryCard>
                      </RightSide>
                    </div>
            </Dropdown>
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

export default ShoppingCart;
