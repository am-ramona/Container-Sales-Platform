import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
  getOrderCurrency,
} from "../../../redux";
import Alert from "../Alert";
// import Counter from "../Counter";
import { Button, Card, Input, Tooltip } from "../../styles";
import { Container3DIcon } from "../../../assets/icons";
import currencies from "../../constants/currencies";
import { NavbarContext } from "../../../context/NavbarContext";
// import axios from "axios";
// import { mutate } from "swr";
import PropTypes from "prop-types";
import tw from "twin.macro";

const Wrapper = tw(Card)`
md:flex flex-wrap hidden
justify-between 
px-4 py-5 space-x-3
`;

const WrapperMobile = tw(Card)`
md:hidden 
flex 
flex-wrap 
`;

const VLine = tw.div`
flex 
items-center 
bg-gray-200
w-0.5
`;

const ContainerIcon = tw.div`
pl-4 py-1
`;

const Item = tw.div`
flex items-center flex-1
capitalize text-center
truncate text-primary-blue
px-4 py-1 text-15 relative
`;

const InnerWrapperMobile = tw.div`
p-4 h-full flex 
flex-col items-center 
text-center
`;

const RemoveQuantity = tw.div`
text-primary-red text-sm 
underline absolute 
-bottom-7 cursor-pointer
`;

const QuantityLabel = tw.p`
font-medium text-17 text-primary-blue
`;

function ContainerCard({
  productType,
  productCondition,
  productPrice,
  productCurrency,
  productCity,
  productSize,
  productCountry,
  productId,
  inStock,
  sameCountryAlert,
  setSameCountryAlert,
  ...props
}) {
  let history = useHistory();
  const {
    loggedInUser,
    orderData,
    cartData,
    orderId,
    // orderIdError,
    cartDataError,
    orderDataError,
  } = props;
  // const value = useContext(NavbarContext);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [addToCart, clickAddToCart] = useState({ [productId]: false });
  const [containerQuantity, setContainerQuantity] = useState(1);
  const [onChange, setOnChange] = useState(false);
  // const [remove, setRemove] = useState({ [productId]: false });
  const { quantity, setQuantity, setIsVignetteShown, setIsCartOpen } =
    useContext(NavbarContext);
  const [itemOriginQuantity, setItemOriginQuantity] = useState(0);

  // useEffect(() => {
  //   props.getOrderDetails(orderId)
  // }, []);

  // useEffect(() => {
  //   console.log("useEffect alert", alert);
  // }, [alert]);

  useEffect(() => {
    // console.log('useEffect orderDataError', orderDataError)
    if (orderDataError === "error") {
      setContainerQuantity(1);
      setIsVignetteShown(false);
    }
  }, [orderDataError, history]);

  const getProductOriginQuantity = (id) => {
    var itemOriginQuantity;
    // console.log('getProductOriginQuantity : orderData', orderData)
    // console.log('getProductOriginQuantity : orderDataError', orderDataError)
    // console.log('getProductOriginQuantity : addToCart'+[id], addToCart[id])
    // orderDataError !== 'error' && orderData.length > 0 && orderData.some((order) => {
    orderData.length > 0 &&
      orderData.some((order) => {
        // console.log('getProductOriginQuantity : order', order)
        if (order.productId === id) {
          // console.log('getProductOriginQuantity : id', id)
          itemOriginQuantity = order.quantity;
          // setItemOriginQuantity(order.quantity)
          setIsVignetteShown(true);
          // quantity['productId-'+productId] = parseInt(order.quantity);
          // setQuantity({ ...quantity });
          // console.log('getProductOriginQuantity : order.productId', order.productId)
          // console.log('getProductOriginQuantity : productId', productId)
          // console.log('getProductOriginQuantity : order.quantity', order.quantity)
          return true;
        } else {
          itemOriginQuantity = 0;
          // setItemOriginQuantity(0)
          return false;
        }
      });
    return itemOriginQuantity;
  };

  useEffect(() => {
    if (getProductOriginQuantity(productId) && orderDataError !== "error")
      setContainerQuantity(getProductOriginQuantity(productId));
  }, [orderDataError, productId, getProductOriginQuantity]);

  useEffect(() => {
    // console.log('ContainerCard : useEffect orderData', orderData)
    orderData.length > 0 &&
      orderData.map((order) => {
        if (order.productId === productId) {
          // console.log('getProductOriginQuantity : order', order)
          // console.log('ContainerCard : useEffect order.productId', order.productId)
          // console.log('getProductOriginQuantity : productId', productId)
          // console.log('ContainerCard : useEffect order.quantity', order.quantity)
          setItemOriginQuantity(order.quantity);
          // setContainerQuantity(order.quantity)
          setIsVignetteShown(true);
          // quantity['productId-'+productId] = parseInt(order.quantity);
          // setQuantity({ ...quantity });
          // console.log('ContainerCard : useEffect itemOriginQuantity before', itemOriginQuantity)
        } else {
          setItemOriginQuantity(0);
          // setContainerQuantity(1);
          // console.log('ContainerCard : useEffect itemOriginQuantity null', itemOriginQuantity)
        }
        // console.log('ContainerCard : useEffect itemOriginQuantity', itemOriginQuantity)
      });
    // console.log('getProductOriginQuantity itemOriginQuantity', itemOriginQuantity)
    // return itemOriginQuantity
  }, [orderData, addToCart, containerQuantity]);

  function AddToCart() {
    // console.log('AddToCart : containerQuantity', containerQuantity)
    // console.log('productCountry originCountry', productCountry, cartData[0]["originCountry"])

    if (
      !cartDataError &&
      cartData &&
      cartData[0]["originCountry"] &&
      cartData[0]["originCountry"] !== productCountry.toLowerCase()
    ) {
      if (!sameCountryAlert && alert === false) {
        setAlert(true);
        setSameCountryAlert(true);
        setMessage(
          "Only containers from the same country can be added to cart"
        );
      }
      return;
    }

    if (containerQuantity > inStock) {
      setAlert(true);
      setMessage(
        "Quantity is larger than the stock, kindly choose a valid number"
      );
      return;
    }

    if (containerQuantity !== "") {
      clickAddToCart({ ...addToCart, [productId]: true });
      quantity[productId] = parseInt(containerQuantity);
      setQuantity({ ...quantity });
      setIsVignetteShown(true);

      let filterQuery = {
        customerUid: loggedInUser.uid,
        productId: productId,
        price: productPrice,
        quantity: containerQuantity,
      };

      const filterOrderQuery =
        `customerUid=` + loggedInUser.uid + `&status=cart`;
      props
        .getOrderID(filterQuery)
        .then((response) => {
          props.getOrderSum(filterOrderQuery);
          setItemOriginQuantity(0);
        })
        .then((response) => {
          if (orderId) props.getOrderDetails(orderId);
        });

      //   props.updateOrderDetails(orderId, filterQuery)
      // .then(response => {
      //   props.getOrderSum(filterOrderQuery)
      // })
      // .then(response => { props.getOrderDetails(orderId) })
      // .then( response => {
      //   if(orderId) props.getOrderDetails(orderId)
      // })

      // if (addToCart[productId]) {
      //   quantity[productId] = parseInt(containerQte);
      //   setQuantity({ ...quantity });
      //   setIsVignetteShown(true)
      // }
    }
  }

  // const getoriginQuantity = async () => {
  //   try {
  //     const originQuantity = await getProductOriginQuantity(productId);
  //     setContainerQuantity(getProductOriginQuantity(productId) === 0 ? 1 : getProductOriginQuantity(productId))
  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  function handleChange(evt, id) {
    setOnChange(true);
    setAlert(false);

    const containerQte = evt.target.validity.valid
      ? evt.target.value
      : quantity;
    if (evt.target.value !== "") setContainerQuantity(containerQte);

    // console.log('handleChange : addToCart' + [productId], addToCart[productId])
    // console.log('handleChange : getProductOriginQuantity(productId)', getProductOriginQuantity(productId))
    // if (addToCart[productId] || productExists(true) && containerQte !== "") {
    // console.log('addToCart[productId]', addToCart[productId])
    // console.log('getProductOriginQuantity(productId)', getProductOriginQuantity(productId))
    if (addToCart[productId] || getProductOriginQuantity(productId) > 0) {
      if (evt.target.value > inStock) {
        setAlert(true);
        setMessage(
          "Quantity is larger than the stock, kindly choose a valid number"
        );
        return;
      } else if (evt.target.value !== "" && Number(containerQte)) {
        // console.log('quantity less than in Stock')
        let filterQuery = {
          customerUid: loggedInUser.uid,
          productId: productId,
          quantity: evt.target.value,
        };

        const filterOrderQuery =
          `customerUid=` + loggedInUser.uid + `&status=cart`;
        props
          .updateOrderDetails(orderId, filterQuery)
          .then((response) => {
            props.getOrderSum(filterOrderQuery);
          })
          .then((response) => {
            if (orderId) props.getOrderDetails(orderId);
          })
          .then((response) => {
            if (cartDataError === "error") setIsVignetteShown(false);
          });

        if (addToCart[productId]) {
          quantity[productId] = parseInt(containerQte);
          setQuantity({ ...quantity });
          setContainerQuantity(containerQte);
          setIsVignetteShown(true);
        }
      } else {
        setContainerQuantity("");
      }
    }
  }

  function handleRemove() {
    // alert("handleRemove");
    clickAddToCart({ ...addToCart, [productId]: false });
    // setOnChange(false);

    let filterQuery = {
      customerUid: loggedInUser.uid,
      productId: productId,
      quantity: 0,
    };

    const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`;

    props
      .updateOrderDetails(orderId, filterQuery)
      .then((response) => {
        props.getOrderSum(filterOrderQuery);
      })
      .then((response) => {
        if (orderId) props.getOrderDetails(orderId);
      });

    setContainerQuantity(1);
    setItemOriginQuantity(0);
    setQuantity({});
    // console.log('handleRemove : addToCart' + [productId], addToCart[productId])
    // console.log('handleRemove : onChange', onChange)
    // setIsVignetteShown(false);

    // setDefaultvalue(1)
    // setQuantity([...quantity, containerQuantity])

    // setRemove({ ...remove, [productId]: true })
    // console.log('remove containerQuantity', containerQuantity)
    // console.log('remove addToCart', addToCart)
  }

  // console.log("productExists(true)", productExists(true))
  // console.log("productExists(false)", productExists(false))

  // useEffect(() => {
  //   if (!onChange) {
  //     // setContainerQuantity(itemOriginQuantity === 0 ? 1 : itemOriginQuantity)
  //   }
  // }, [itemOriginQuantity])

  //   const getoriginQuantity = async () => {
  //   try {
  //     const originQuantity = await getProductOriginQuantity(productId);
  //     setContainerQuantity(getProductOriginQuantity(productId) === 0 ? 1 : getProductOriginQuantity(productId))
  //   } catch (error) {
  //     console.log('error')
  //   }
  // }

  // useEffect(() => {
  //   if (!onChange && typeof getProductOriginQuantity(productId) !== 'undefined') {
  //     setContainerQuantity(getProductOriginQuantity(productId) === 0 ? 1 : getProductOriginQuantity(productId))
  //   }
  // }, [getProductOriginQuantity(productId)])

  // if(productExists(true)) setIsVignetteShown(true)
  // var defaultvalue = typeof getProductOriginQuantity(productId) === 'undefined' || getProductOriginQuantity(productId) === 0 ? containerQuantity : getProductOriginQuantity(productId)

  let alertProps = {
    type: "error",
    message: message,
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
    setSameCountryAlert,
  };

  console.log(
    "Quanity + Remove" + [productId],
    (!addToCart[productId] && getProductOriginQuantity(productId) > 0) ||
      (addToCart[productId] &&
        cartDataError !== "error" &&
        cartData.amount !== 0)
  );

  // console.log('ContainerCard: orderDataError', orderDataError)
  // console.log('ContainerCard: cartDataError', cartDataError)
  // console.log('ContainerCard: productID', productId)
  // console.log('ContainerCard: itemOriginQuantity', itemOriginQuantity)
  // console.log('remove quantity condition', ((!addToCart[productId] && itemOriginQuantity > 0) || addToCart[productId]) && cartDataError !== 'error' && cartData.amount !== 0 )
  // console.log('ContainerCard: productId', productId)
  // console.log('ContainerCard: quantity', quantity)
  // console.log('ContainerCard: containerQuantity', containerQuantity)
  // console.log('ContainerCard: itemOriginQuantity', itemOriginQuantity)
  // console.log('ContainerCard: orderData', orderData)
  // console.log('ContainerCard: orderDataError', orderDataError)
  // console.log('ContainerCard: addToCart' + [productId], addToCart[productId])
  // if (productId && orderData) console.log('ContainerCard: getProductOriginQuantity(productId)', getProductOriginQuantity(productId))

  return (
    <>
      {" "}
      {
        //getProductOriginQuantity(productId)
      }
      {/* {"itemOriginQuantity: " + itemOriginQuantity} */}
      {/* {"containerQuantity: " + containerQuantity} */}
      {/* {((!addToCart[productId] && getProductOriginQuantity(productId) > 0) || addToCart[productId]) && cartDataError !== 'error' ? 'true' : "false"} */}
      <Wrapper>
        {alert && <Alert {...(alert ? alertProps : {})} />}
        <ContainerIcon>
          <Container3DIcon alt="Container" />
        </ContainerIcon>
        <Item>
          <p tw="w-full">{productType}</p>
        </Item>
        <VLine />
        <Item>
          <Tooltip>
            <p tw="truncate w-full">
              {productCity}, {productCountry}
            </p>
          </Tooltip>
        </Item>
        <VLine />
        <Item>
          <p tw="w-full">{productSize}ft</p>
        </Item>
        <VLine />
        <Item tw="overflow-visible">
          <p tw="w-full">{productCondition}</p>
        </Item>
        <VLine />
        {loggedInUser ? (
          <>
            <Item>
              <p tw="w-full">
                {currencies[productCurrency]} {productPrice}
              </p>
            </Item>
            <VLine />
            <Item>
              <p tw="w-full">In Stock: {inStock} </p>
            </Item>
            <Item tw="overflow-visible m-0">
              {/* {(addToCart[productId] || productExists(true)) && */}
              {/* {((addToCart[productId] || getProductOriginQuantity(productId) > 0)) && orderDataError !== 'error' && */}
              {((!addToCart[productId] &&
                getProductOriginQuantity(productId) > 0) ||
                addToCart[productId]) &&
                cartDataError !== "error" &&
                cartData.amount !== 0 && (
                  <>
                    <QuantityLabel>Quantity:</QuantityLabel>
                    <RemoveQuantity onClick={handleRemove}>
                      Remove
                    </RemoveQuantity>
                  </>
                )}
              {/* <Counter /> */}
              <Input
                tw="ml-sm"
                defaultValue={
                  itemOriginQuantity > 0
                    ? itemOriginQuantity
                    : containerQuantity
                }
                value={containerQuantity}
                maxLength="3"
                pattern="[0-9]*"
                onChange={(e) => handleChange(e, productId)}
              />
              {/* {!addToCart[productId] && !productExists(true) && */}
              {((!addToCart[productId] &&
                getProductOriginQuantity(productId) === 0) ||
                cartDataError === "error") && (
                <>
                  <Button
                    color="primary-blue"
                    tw="h-10 ml-2.5"
                    onClick={AddToCart}
                  >
                    Add to cart
                  </Button>
                </>
              )}
            </Item>
          </>
        ) : (
          <>
            <Item>
              <p tw="w-full">
                Starting at: <br /> {currencies[productCurrency]} {productPrice}
              </p>
            </Item>
            <Item tw="overflow-visible">
              <Button
                color="primary-blue"
                onClick={() =>
                  window.location.replace(
                    `${
                      process.env.NODE_ENV === "development"
                        ? "http://localhost:3001"
                        : ""
                    }/auth/sso/login?initialURL=${history.location.pathname}`
                  )
                }
              >
                Sign in to buy
              </Button>
            </Item>
          </>
        )}
      </Wrapper>
      <WrapperMobile>
        <InnerWrapperMobile>
          <Container3DIcon
            tw="flex-shrink-0 w-full h-20 object-cover object-center mb-4"
            alt="Container"
          />
          <div tw="w-full text-primary-blue text-sm leading-6 text-left">
            <p tw="capitalize">{productType}</p>
            <p>
              Starting at: {currencies[productCurrency]} {productPrice}
            </p>
            <p tw="capitalize">
              {productCity}, {productCountry} | {productSize}ft |{" "}
              {productCondition}
            </p>
            <span tw="inline-flex mt-4">
              <Button color="primary-blue">
                {loggedInUser ? "Add to cart" : "Sign in to buy"}
              </Button>
            </span>
          </div>
        </InnerWrapperMobile>
      </WrapperMobile>
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderId: state.orderId,
    orderIdError: state.orderIdError,
    orderData: state.orderData,
    orderDataError: state.orderDataError,
    cartData: state.cartData,
    cartDataError: state.cartDataError,
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
  getOrderCurrency,
};

ContainerCard.propTypes = {
  productType: PropTypes.string.isRequired,
  productCondition: PropTypes.string.isRequired,
  minPrice: PropTypes.number,
  productCity: PropTypes.string.isRequired,
  productSize: PropTypes.number.isRequired,
  productCountry: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContainerCard);
