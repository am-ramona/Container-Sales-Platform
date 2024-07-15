import React, { useState, useRef, useEffect, useMountEffect } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import currencies from "../../../common/constants/currencies";
import { Button, Card, Input, Loader } from "../../../common/styles";
import { Container3DIcon, ShoppingBag } from "../../../assets/icons";
import Alert from "../../../common/components/Alert";
import { connect } from "react-redux";
import {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderID,
  getOrderDetails,
  getOrderSum,
  getProductsList,
  updateOrderDetails,
} from "../../../redux";
import useQuery from "../../../common/hooks/api/useQuery";
// import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import {
  orderEndpoints,
  containerEndpoints,
} from "../../../common/constants/apiEndpoints";
import axios from "axios";
import tw from "twin.macro";

const HeaderTitle = tw.h1`
font-medium text-2xl 
text-primary-blue 
mt-6 mb-6
`;

const CartTable = tw.table`
table-fixed min-w-full
text-primary-blue
`;

const CartTableTh = tw.th`
px-6 py-3 text-left font-medium
text-sm md:text-2xl
whitespace-nowrap
`;

const CartTableTd = tw.td`
leading-7 font-normal
px-6 py-4 relative
whitespace-nowrap                    
text-sm md:text-17
`;

const OrderSummaryCard = tw(Card)`
p-8 flex flex-col w-full
`;

const OrderSummaryCardHeader = tw.h1`
text-gray-900 text-sm md:text-2xl 
font-medium mb-5 
text-primary-blue
`;

const CheckoutBtn = tw(Button)`
border-0 py-2 px-8 text-sm
mt-4 h-45
`;

const LeftSide = tw.div`
lg:w-2/3 w-full lg:pr-16 mb-10
`;

const RightSide = tw.div`
lg:w-1/3  w-full
`;

const RemoveQuantity = tw.div`
text-primary-red text-sm 
underline absolute 
bottom-3.5 cursor-pointer
`;

const EmptyCard = tw(Card)`
grid content-center justify-center grid-rows-3RowsAuto 
h-414 gap-y-25 text-casual-gray 
p-8 mt-40 overflow-x-auto
`;

const EmptyCardMessage = tw.div`
text-17 font-normal leading-20.8
`;
/* h-10 is changed to h-45 for consistency with all the buttons of the checkout page */
const GoToShoppingBtn = tw(Button)`
text-sm h-45
`;

const ContinueShoppingBtn = tw.span`
font-light underline text-primary-blue 
text-xl w-full block text-right 
pt-2.5 cursor-pointer`;

function EmptyCart() {
  let history = useHistory();

  const handleClick = () => {
    history.push("/productList?page=1");
  };

  return (
    <EmptyCard>
      <ShoppingBag tw="w-full h-xxl" alt="Shopping Bag" />
      <EmptyCardMessage>
        {" "}
        You have no items in your shopping cart .
        <br />
        Go to the shopping list to add containers
      </EmptyCardMessage>
      <GoToShoppingBtn color="primary-blue" onClick={() => handleClick()}>
        Go To Shopping List
      </GoToShoppingBtn>
    </EmptyCard>
  );
}

function CartDetails({ toggleStep, ...props }) {
  // const orderID = localStorage.getItem('orderId');
  let history = useHistory();
  const {
    loggedInUser,
    orderId,
    orderData,
    cartData,
    productData,
    orderDataError,
    cartDataError,
  } = props;
  // const [quantity, setQuantity] = useState({ [productId] : 1 })
  const [quantity, setQuantity] = useState({ id: 1 });
  const [alert, setAlert] = useState(false);

  // console.log('cartDetails : loggedInUser', loggedInUser)
  // console.log('cartDetails : orderId', orderId)
  // console.log('cartDetails : productData', productData)
  // const [rows, setRows] = useState([
  //                                     {
  //                                       id: 1,
  //                                        name: "Reefer, 40' HC, Recycle",
  //                                        country: "Milan, Italy",
  //                                        quantity: "1",
  //                                        price: "$1,100",
  //                                        total: "$1,100"
  //                                     },
  //                                     {
  //                                       id: 2,
  //                                        name: " Dry, 20' ST, Reuse",
  //                                        country: "Milan, Italy",
  //                                        quantity: "2",
  //                                        price: "$900",
  //                                        total: "$1,800"
  //                                     }
  //                                 ]);
  // const [rows, setRows] = useState(localStorage.getItem('totalAmount'))
  // useEffect(() => {
  //   if (loggedInUser) {
  //     props.getOrderDetails(orderId);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (loggedInUser) {
  //     const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
  //     props.getOrderSum(filterOrderQuery)
  //   }
  // }, []);

  // useEffect(() => {
  //   props.getProductsList();
  // }, [])

  // if (loggedInUser && orderId) {
  //   props.getOrderDetails(orderId);
  //   props.getProductsList();
  //   const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`;
  //   props.getOrderSum(filterOrderQuery)
  // }

  useEffect(() => {
    if (loggedInUser) {
      const filterOrderQuery =
        `customerUid=` + loggedInUser.uid + `&status=cart`;
      props.getOrderSum(filterOrderQuery);
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (loggedInUser && orderId) {
      props.getOrderDetails(orderId).then(props.getProductsList());
    }
  }, [loggedInUser, orderId]);

  useEffect(() => {
    // setAlert(false)
  }, [orderData]);

  // console.log("cartDetails: loggedInUser", loggedInUser)
  // console.log("CartDetails : orderId", orderId)
  // console.log("cartData && cartData[0] && cartData[0].amount > 0 && cartDataError !== 'error'", cartData && cartData[0] && cartData[0].amount > 0 && cartDataError !== 'error')
  // console.log("cartDetails: cartData", cartData)

  function isNumber(evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  function handleChange(evt, id, inStock) {
    setAlert(false);
    localStorage.setItem("inStock", inStock);
    const containerQuantity = evt.target.validity.valid
      ? evt.target.value
      : quantity["id"];
    setQuantity({ [id]: evt.target.value });
    // console.log('Cartdetails quantity', quantity)
    // if (isNaN(Number(event.target.value))) {
    //   return;
    // } else {
    //   this.setState({ value: event.target.value });
    // }

    if (
      evt.target.value !== "" &&
      Number(evt.target.value) &&
      !isNaN(Number(evt.target.value))
    ) {
      let filterQuery = {
        customerUid: loggedInUser.uid,
        productId: id,
        quantity: evt.target.value,
      };
      // props.updateOrderDetails(localStorage.getItem('order_ID'), filterQuery)
      // props.getProductsList()
      // props.getOrderSum(localStorage.getItem('order_ID'))
      // props.getOrderDetails(localStorage.getItem('order_ID'))

      // props.updateOrderDetails(orderId, filterQuery)
      // props.getOrderDetails(orderId)

      const filterOrderQuery =
        `customerUid=` + loggedInUser.uid + `&status=cart`;
      // props.getOrderSum(filterOrderQuery)
      // props.getOrderDetails(orderId)
      evt.target.value > inStock
        ? setAlert(true)
        : props
            .updateOrderDetails(orderId, filterQuery)
            .then((response) => {
              props.getOrderSum(filterOrderQuery);
            })
            .then((response) => {
              props.getOrderDetails(orderId);
            });
      // .then(response => {
      //   console.log('is cartdataError false ')
      //   // setCasesFields(response.data.result.record_set);
      //   if (cartDataError === 'error') setIsVignetteShown(false)
      // }
      // )
    }
  }

  const handleRemoveSpecificRow = (id) => {
    let filterQuery = {
      customerUid: loggedInUser.uid,
      productId: id,
      quantity: 0,
    };
    const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`;
    props
      .updateOrderDetails(orderId, filterQuery)
      .then((response) => {
        props.getOrderSum(filterOrderQuery);
      })
      .then((response) => {
        props.getOrderDetails(orderId);
      })
      .then((response) => {
        // console.log('cartDetails : handleRemoveSpecificRow orderData', orderData)
        props.getProductsList();
      });

    // props.updateOrderDetails(localStorage.getItem('order_ID'), filterQuery)
    // props.getOrderDetails(localStorage.getItem('order_ID'))
    // props.getProductsList()
    // props.getOrderSum(localStorage.getItem('order_ID'))
  };

  const handleClick = () => {
    history.push("/productList?page=1");
  };

  const isInputNumber = (evt) => {
    var ch = String.fromCharCode(evt.which);
    if (!/[0-9]/.test(ch)) {
      evt.preventDefault();
    }
  };

  let deleteProps = {
    message: "Are you sure you want to remove item ?",
    button1: "Cancel",
    button2: "Remove",
    buttonColor: "outline-blue",
  };

  let alertProps = {
    type: "error",
    message:
      "Quantity is larger than instock ( " +
      localStorage.getItem("inStock") +
      " ), kindly choose a valid number",
    autoClose: false,
    // dismissTime : 3000,
    width: 558,
    height: 27,
    font: 12,
    iconWidth: 20,
    iconHeight: 20,
    paddingTop: "0px",
    paddingBottom: "0px",
    closeIconFontSize: "11px",
    setAlert,
  };

  // console.log('cartDetails : orderData', orderData)
  // console.log('cartDetails : orderDataError', orderDataError)

  return (
    <section>
      {alert && <Alert {...(alert ? alertProps : {})} />}
      {cartData &&
      cartData[0] &&
      cartData[0].amount > 0 &&
      cartDataError !== "error" ? (
        <>
          <HeaderTitle>Your Items</HeaderTitle>
          <div tw="flex flex-wrap">
            <LeftSide>
              <Card tw="p-8 overflow-x-auto">
                <CartTable>
                  <thead>
                    <tr tw="border-b border-gray-200">
                      <CartTableTh>Details</CartTableTh>
                      <CartTableTh>Quantity</CartTableTh>
                      <CartTableTh>Price</CartTableTh>
                      <CartTableTh>Total</CartTableTh>
                    </tr>
                  </thead>
                  <tbody tw="capitalize">
                    {orderData &&
                      orderData.map(
                        (order) =>
                          productData &&
                          productData.length > 0 &&
                          productData.products.map(
                            (product, index) =>
                              order.productId === product.productId && (
                                <tr
                                  tw="py-10 border-b border-gray-200 last:border-b-0"
                                  className={"wrapper index_" + index}
                                  key={index}
                                >
                                  <CartTableTd>
                                    <Container3DIcon tw="inline mr-5" />
                                    <p tw="inline-block">
                                      {product.productTypeDisplay},{" "}
                                      {product.productSize}'{" "}
                                      {product.productTypeSizeDisplay},{" "}
                                      {product.productCondition}
                                      <span tw="block text-13 text-light-gray tracking-wide">
                                        {order.productId ===
                                          product.productId &&
                                          `${product.productCity}, ${product.productCountry}`}
                                      </span>
                                      <Modal
                                        width="auto"
                                        height="auto"
                                        padding="20px"
                                        titleFontSize="24px"
                                        component={
                                          <RemoveQuantity>
                                            Remove
                                          </RemoveQuantity>
                                        }
                                        title="Delete item"
                                        children={
                                          <Popup
                                            name="delete"
                                            {...deleteProps}
                                            item={product}
                                            onClick={() => {
                                              handleRemoveSpecificRow(
                                                product.productId
                                              );
                                            }}
                                          />
                                        }
                                      />
                                    </p>
                                  </CartTableTd>
                                  <CartTableTd>
                                    <Input
                                      defaultValue={order.quantity}
                                      onKeyPress={(event) =>
                                        isInputNumber(event)
                                      }
                                      value={quantity[product.productId]}
                                      maxLength="3"
                                      pattern="[0-9]*"
                                      onInput={(e) =>
                                        handleChange(
                                          e,
                                          product.productId,
                                          product.inStock
                                        )
                                      }
                                    />
                                  </CartTableTd>
                                  <CartTableTd>
                                    {currencies[product.productCurrency]}{" "}
                                    {order.price}
                                  </CartTableTd>
                                  <CartTableTd>
                                    {currencies[product.productCurrency]}{" "}
                                    {order.total}
                                  </CartTableTd>
                                </tr>
                              )
                          )
                      )}
                  </tbody>
                </CartTable>
              </Card>
              <ContinueShoppingBtn
                onClick={() => {
                  handleClick();
                }}
              >
                Continue Shopping
              </ContinueShoppingBtn>
            </LeftSide>
            <RightSide>
              <OrderSummaryCard>
                <OrderSummaryCardHeader>Order Summary</OrderSummaryCardHeader>
                <hr tw="text-gray-200" />
                <CartTable>
                  <tbody tw="border-b border-gray-200">
                    {orderData &&
                      orderData.map(
                        (order) =>
                          productData &&
                          productData.length > 0 &&
                          productData.products.map(
                            (product, index) =>
                              order.productId === product.productId && (
                                <tr tw="py-10 capitalize" key={index}>
                                  <CartTableTd>
                                    {" "}
                                    {product.productTypeDisplay},{" "}
                                    {product.productSize}'{" "}
                                    {product.productTypeSizeDisplay},{" "}
                                    {product.productCondition}
                                  </CartTableTd>
                                  <CartTableTd> {order.quantity} </CartTableTd>
                                  <CartTableTd>
                                    {localStorage.getItem("currency")}{" "}
                                    {order.total}{" "}
                                  </CartTableTd>
                                </tr>
                              )
                          )
                      )}
                    <tr>
                      <CartTableTd>
                        <b>VAT</b>
                      </CartTableTd>
                      <CartTableTd>
                        {" "}
                        {cartData && [
                          (cartData[0].taxAmount / cartData[0].amount) * 100,
                        ]}
                        %
                      </CartTableTd>
                      <CartTableTd>
                        {localStorage.getItem("currency")}{" "}
                        {cartData && cartData[0].taxAmount}
                      </CartTableTd>
                    </tr>
                  </tbody>
                  <tfoot>
                    <CartTableTd>
                      <b> Total Cost</b>
                    </CartTableTd>
                    <CartTableTd></CartTableTd>
                    <CartTableTd>
                      {localStorage.getItem("currency")}{" "}
                      {cartData && cartData[0].amount + cartData[0].taxAmount}
                    </CartTableTd>
                  </tfoot>
                </CartTable>
                <CheckoutBtn
                  color="primary-blue"
                  onClick={() => {
                    toggleStep(3);
                  }}
                >
                  Checkout
                </CheckoutBtn>
              </OrderSummaryCard>
            </RightSide>
          </div>
        </>
      ) : (
        <EmptyCart />
      )}
    </section>
  );
}

function mapStateToProps(state, props) {
  return {
    count: state.count,
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderId: state.orderId,
    orderData: state.orderData,
    orderDataError: state.orderDataError,
    cartData: state.cartData,
    cartDataError: state.cartDataError,
    productData: state.productData,
    updateProduct: state.updateProduct,
  };
}

const mapDispatchToProps = {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderID,
  getOrderDetails,
  getOrderSum,
  getProductsList,
  updateOrderDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(CartDetails);
