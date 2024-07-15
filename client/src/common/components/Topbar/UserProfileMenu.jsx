import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderDetails,
  getUserRole,
} from "../../../redux";
import { Button } from "../../styles";
import DropdownComponent from "../Dropdown";
import ShoppingCart from "../ShoppingCart/";
// import useQuery from "../../hooks/api/useQuery";
import {
  ShoppingCartIcon,
  Logout,
  // CloseMenuIcon,
  // Container3DIcon,
} from "../../../assets/icons";
import { NavbarContext } from "../../../context/NavbarContext";
// import axios from "axios";
import tw from "twin.macro";

const UserProfileMenuWrapper = tw.div`
grid grid-cols-3ColAuto 
items-center gap-x-sm 
text-primary-blue
`;

const Vignette = tw.span`
absolute -top-9 -right-9
text-9 rounded-3xl bg-primary-red
w-15 h-15 text-white font-normal
grid content-center justify-center
`;

const UserIcon = tw.div`
w-10 h-10 text-sm
grid items-center justify-items-center
rounded-full border-primary-blue
border-userIcon`;

function UserProfileMenu(props) {
  let history = useHistory();

  const {
    loggedIn,
    loggedInUser,
    getUserRole,
    userRole,
    orderData,
    cartDataError,
    orderId,
  } = props;
  const value = useContext(NavbarContext);
  // const { setIsVignetteShown } = useContext(NavbarContext);
  console.log("UserProfileMenu : value", value);
  // console.log("UserProfileMenu : history.location", history.location);
  // console.log(
  //   "history.location.pathname.indexOf('/admin')",
  //   history.location.pathname.indexOf("/admin")
  // );
  // console.log('UserProfileMenu : orderData', orderData)
  //  console.log('UserProfileMenu : loggedIn', loggedIn)
  //  console.log('UserProfileMenu : loggedInUser', loggedInUser)
  console.log("userRole userRole", userRole);
  useEffect(() => {
    // joseph: S01171192 agent
    // Ramona S01168982 admin
    // Georges: S01227927 buyer
    if (loggedIn) {
      getUserRole(loggedInUser.uid).then((response) => {
        switch (userRole) {
          case "buyer":
            // if (history.location.pathname.indexOf('/admin') > -1 || history.location.pathname.indexOf('/agent') > -1 )
            // if (!loggedIn) history.push("/");
            break;
          case "agent":
            history.push("/agent");
            break;
          case "admin":
            history.push("/admin");
            break;
          default:
          // history.push("/");
          // alert("nothing");
        }
      });
    }

    //   async function getTheUserRole() {
    //     if (loggedIn) {
    //     await getUserRole(loggedInUser.uid)
    //     // response = await response
    //     switch (userRole) {
    //       case "buyer":
    //         // if (history.location.pathname.indexOf('/admin') > -1 || history.location.pathname.indexOf('/agent') > -1 )
    //         // if (!loggedIn) history.push("/");
    //         break;
    //       case "agent":
    //         history.push("/agent");
    //         break;
    //       case "admin":
    //         history.push("/admin");
    //         break;
    //       default:
    //       // history.push("/");
    //       // alert("nothing");
    //     }
    //   }
    //  }
    //  getTheUserRole()
  }, [userRole]);

  const handleClick = () => {
    value.setIsCartOpen(!value.isCartOpen);
    // props.openShoppingCart(true)
    // console.log('UserProfileMenu value.isCartOpen', value.isCartOpen)
  };

  const handleLogoutClick = (event) => {
    if (loggedIn) {
      props.disconnectUser(history);
      window.localStorage.clear();
      // props.getUserProfile()
    }
  };

  const getProductOriginTotalQuantity = () => {
    if (orderData && value) {
      var itemsOriginQuantity = orderData.reduce(
        (total, obj) => obj.quantity + total,
        0
      );
      value.setIsVignetteShown(true);
    }
    return itemsOriginQuantity;
  };
  // console.log('UserProfileMenu : getProductOriginTotalQuantity()', getProductOriginTotalQuantity())
  return (
    <UserProfileMenuWrapper
      style={{
        color: history.location.pathname === "/" ? "#ffffff" : "#04246A",
      }}
    >
      <UserIcon
        style={{
          borderColor:
            history.location.pathname === "/" ? "#ffffff" : "#04246A",
        }}
      >
        {loggedInUser && loggedInUser["given_name"].charAt(0)}
      </UserIcon>
      {history.location.pathname !== "/productList/checkout" && (
        <DropdownComponent
          aria-label="Menu"
          isCartOpen={value.isCartOpen}
          setIsCartOpen={value.setIsCartOpen}
          width="auto"
          disclosure={
            <Button tw="p-0">
              <ShoppingCartIcon
                onClick={handleClick}
                tw="outline-none"
                width="25px"
                height="25px"
                alt="Shopping Cart"
              />
              {/* {cartDataError !=='error' && value && value.isVignetteShown && orderData && orderData.length > 0 && */}
              {cartDataError !== "error" &&
                value &&
                value.isVignetteShown &&
                history.location.pathname !== "/" && (
                  <Vignette onClick={handleClick}>
                    {/* {Object.keys(value.quantity).length !== 0 ?
                                                    getProductOriginTotalQuantity() + Object.values(value.quantity).reduce((sum, qty) => sum + qty) :
                                                    getProductOriginTotalQuantity()
                                                } */}
                    {getProductOriginTotalQuantity()}
                  </Vignette>
                )}
            </Button>
          }
          items={[<ShoppingCart setIsCartOpen={handleClick} />]}
        ></DropdownComponent>
      )}

      {/* {value && value.isVignetteShown &&
                    <Vignette onClick={handleClick}>
                        {Object.keys(value.quantity).length !== 0 ?
                            Object.values(value.quantity).reduce((sum, qty) => sum + qty) :
                            null
                        }
                        {/* {
                            getProductOriginTotalQuantity()  
                        } */}
      {/* </Vignette>
                }  */}
      <Logout tw="cursor-pointer" onClick={(evt) => handleLogoutClick(evt)} />

      {/* pop up display in case we decided to re-add it  */}
    </UserProfileMenuWrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    userRole: state.userRole,
    loggedOut: state.loggedOut,
    openShoppingCart: state.openShoppingCart,
    orderData: state.orderData,
    cartDataError: state.cartDataError,
    orderId: state.orderId,
  };
}

const mapDispatchToProps = {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderDetails,
  getUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileMenu);
