import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderID,
  getOrderDetails,
  getOrderSum,
  getProductsList,
  updateOrderDetails,
  getOrderCurrency
} from '../../../redux';
import Alert from "../Alert";
import Counter from "../Counter";
import { Button, Card, Input, Tooltip } from "../../styles";
import { Container3DIcon } from "../../../assets/icons";
import currencies from "../../constants/currencies";
import { NavbarContext } from "../../../context/NavbarContext";
import axios from "axios";
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
  ...props
}) {

  let history = useHistory();
  const { loggedInUser,
    orderData,
    cartData,
    orderId,
    orderIdError,
    cartDataError,
    orderDataError
  } = props
  // const value = useContext(NavbarContext);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [addToCart, clickAddTocart] = useState({ [productId]: false });
  const [containerQuantity, setContainerQuantity] = useState(1);
  const [onChange, setOnChange] = useState(false);
  // const [remove, setRemove] = useState({ [productId]: false });
  const { quantity, setQuantity, setIsVignetteShown, setIsCartOpen } = useContext(NavbarContext);
 const [ itemOriginQuantity, setItemOriginQuantity ] = useState(0);

  useEffect(() => {
    if (orderDataError === 'error') setIsVignetteShown(false)
  }, [orderDataError]);

  // useEffect(() => {
  //     props.getOrderDetails(orderId)
  // }, [addToCart]);



  // useEffect(() => {
  //   setTimeout(() => {
  //     setAlert(false)
  //   }, 3000);
  // }, [addToCart]);

  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, 2000);
    });
  }

  function callOrderDetails(filterQuery, ...cb) {
    props.updateOrderDetails(localStorage.getItem('order_ID'), filterQuery)
    cb.forEach(s => s.apply());
  }

  function callGetOrderDetails() {
    props.getOrderDetails(props.orderId === null ? localStorage.getItem('order_ID') : props.orderId)
  }

  function callGetOrderSum() {
    props.getOrderSum(props.orderId === null ? localStorage.getItem('order_ID') : props.orderId)
  }

  const productInList = (id) => {
    const productExistingInList = props.orderData.map((order) => {
      return order.productId === id ? ({ [id]: true }) : ({ [id]: false })
    })
    return productExistingInList
  }

  const productExists = (ele) => {
    return productInList(productId).some(function (el) {
      return el[productId] === ele;
    });
  }

  console.log('ContainerCard: product', productType)
  console.log('ContainerCard: cartData', cartData)
  console.log("cartData && cartData['originCountry'] && cartData['originCountry'] !== productCountry", cartData && cartData['originCountry'] && cartData['originCountry'] !== productCountry)

  function AddToCart() {
    // console.log("AddContainerQuantity")
    console.log("AddToCart containerQuantity", containerQuantity)
    console.log('AddToCart : productId', productId)
    // console.log("props.cartData['originCountry']", props.cartData['originCountry'])
    // console.log("props.cartData", props.cartData)
    if (!cartDataError && cartData && cartData[0]['originCountry'] && cartData[0]['originCountry'] !== productCountry) {
      setAlert(true);
      setMessage('Only containers from the same country can be added to cart')
      return;
    }

    if (containerQuantity > inStock) {
      setAlert(true);
      setMessage('Quantity is larger than the stock, kindly choose a valid number')
      return;
    }

    if (containerQuantity !== "") {
      // console.log("inside containerQuantity")
      //  value.setIsCartOpen(false);
      //  value.setIsCartOpen(true);
      // console.log('AddToCart : addToCart', addToCart)
      clickAddTocart({ ...addToCart, [productId]: true }, () => console.log('AddToCart : addToCart' + [productId], addToCart[productId]))
      quantity[productId] = parseInt(containerQuantity);
      setQuantity({ ...quantity });
      setIsVignetteShown(true)

      let filterQuery =
      {
        "customerUid": loggedInUser.uid,
        "productId": productId,
        "price": productPrice,
        "quantity": containerQuantity,
      }

      const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
      props.getOrderID(filterQuery)
        .then(response => {
          props.getOrderSum(filterOrderQuery);
          setItemOriginQuantity(0)
        })
      // .then( response => {
      //   if(orderId) props.getOrderDetails(orderId)
      // })

      console.log('AddToCart orderDataError', orderDataError)
      // console.log('AddToCart getProductOriginQuantity' + (productId), getProductOriginQuantity(productId))
      // console.log('AddToCart : addToCart'+[productId], addToCart[productId])
      // if (getProductOriginQuantity(productId) > 0)
      // console.log('AddToCart cartDataError', cartDataError)
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
    setOnChange(true)
    const containerQte = evt.target.validity.valid ? evt.target.value : quantity;
    if (evt.target.value !== '') {
      setContainerQuantity(containerQte);
      setAlert(false);

      console.log("handleChange containerQuantity", containerQuantity)
      console.log("addToCart[productId]", addToCart[productId])
      console.log('handleChange alert', alert)
    }

    // if (addToCart[productId] || productExists(true) && containerQte !== "") {
    //   if (evt.target.value > inStock) {
    //     setAlert(true);
    //     setMessage('Quantity is larger than the stock, kindly choose a valid number')
    //     return;
    //   }


    if (addToCart[productId] || itemOriginQuantity && itemOriginQuantity > 0) {
      if (evt.target.value > inStock) {
        setAlert(true);
        setMessage('Quantity is larger than the stock, kindly choose a valid number')
        return;
      } else if (evt.target.value !== '' && Number(containerQte)) {
        // console.log('quantity less than in Stock')
        let filterQuery =
        {
          "productId": productId,
          "quantity": evt.target.value,
        }
        // console.log('filterQuery', filterQuery)
        // callOrderDetails(filterQuery, callGetOrderDetails, callGetOrderSum)

        const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
        // props.updateOrderDetails(orderId, filterQuery)
        // props.getOrderDetails(orderId)

        // props.getOrderSum(filterOrderQuery)

        props.updateOrderDetails(orderId, filterQuery)
          .then(response => {
            props.getOrderSum(filterOrderQuery)
          })
          .then(props.getOrderDetails(orderId))
          .then(response => {
            // setCasesFields(response.data.result.record_set);
            if (cartDataError === 'error') setIsVignetteShown(false)
          }
          )
        // getoriginQuantity()

        if (addToCart[productId]) {
          quantity[productId] = parseInt(containerQte);
          setQuantity({ ...quantity });
          setIsVignetteShown(true)
        }
      } else {
        setContainerQuantity('')

      }
    }
  }

  function handleRemove() {
    clickAddTocart({ ...addToCart, [productId]: false })
    // setIsVignetteShown(false);
    // setIsCartOpen(false);
    setContainerQuantity(1);
    // setDefaultvalue(1)
    // setQuantity([...quantity, containerQuantity])
    setQuantity({})
    // setRemove({ ...remove, [productId]: true })

    let filterQuery =
    {
      "productId": productId,
      "quantity": 0,
    }

    console.log('handleRemove orderId', orderId)
    // callOrderDetails(filterQuery, callGetOrderDetails, callGetOrderSum)
    // props.updateOrderDetails(orderId, filterQuery)
    // props.getOrderDetails(orderId)
    const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
    // props.getOrderSum(filterOrderQuery)

    props.updateOrderDetails(orderId, filterQuery)
      .then(response => {
        props.getOrderSum(filterOrderQuery)
        setAlert(false);
        setItemOriginQuantity(0)
      })
    // .then(props.getOrderDetails(orderId))
    // .then(response => {
    //   console.log('is cartdataError false ')
    //   // setCasesFields(response.data.result.record_set);
    //   if (cartDataError === 'error') setIsVignetteShown(false)
    // }
    // )

    console.log('remove containerQuantity', containerQuantity)
    console.log('remove addToCart', addToCart)
  }

  // console.log("productExists(true)", productExists(true))
  // console.log("productExists(false)", productExists(false))
useEffect(() => {
  // const getProductOriginQuantity = (productId) => {

    // props.getOrderDetails(orderId)
    orderData.length > 0 && orderData.some((order) => {
      if (order.productId === productId) {
        console.log('getProductOriginQuantity : order', order)
        console.log('getProductOriginQuantity : order.productId', order.productId)
        console.log('getProductOriginQuantity : productId', productId)
        // console.log('getProductOriginQuantity : id', id)
        setItemOriginQuantity(order.quantity)
        setIsVignetteShown(true)
        // quantity['productId-'+productId] = parseInt(order.quantity);
        // setQuantity({ ...quantity });
        // return true
      }
      // else {
      //   itemOriginQuantity = 0
      //   // return false
      // }
    })
    // console.log('getProductOriginQuantity itemOriginQuantity', itemOriginQuantity)
    // return itemOriginQuantity
  }, [orderData]
)

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

  // console.log('Containercard: orderIdError', orderIdError)
  // console.log('Containercard: orderId', orderId)
  // console.log('Containercard: orderData', orderData)
  console.log("defaultvalue addToCart" + [productId], addToCart[productId])
  // console.log('containerQuantity', containerQuantity)
  // console.log("productExists(true)", productExists(true))
  // console.log("!addToCart[productId] && !productExists(true)", !addToCart[productId] && !productExists(true))
  // console.log("!addToCart[productId] || typeof getProductOriginQuantity(productId) === 'undefined' || getProductOriginQuantity(productId) === 0", !addToCart[productId] || typeof getProductOriginQuantity(productId) === 'undefined' || getProductOriginQuantity(productId) === 0)
  // console.log("defaultvalue orderData.length > 0 && typeof getProductOriginQuantity(productId) !== 'undefined' && getProductOriginQuantity(productId) > 0)", orderData.length > 0 && typeof getProductOriginQuantity(productId) !== 'undefined' && getProductOriginQuantity(productId) > 0)
  // console.log("defaultvalue orderData.length > 0 ", orderData.length > 0)
  // console.log("typeof getProductOriginQuantity(productId)", typeof getProductOriginQuantity(productId))
  // console.log("getProductOriginQuantity(productId) !== 0", getProductOriginQuantity(productId) !== 0)
  // console.log("defaultvalue getProductOriginQuantity" + (productId), getProductOriginQuantity(productId))
  // console.log('((!addToCart[productId] && getProductOriginQuantity(productId) > 0) || addToCart[productId]) && cartDataError !== error && cartData.amount !== 0', ((!addToCart[productId] && getProductOriginQuantity(productId) > 0) || addToCart[productId]) && cartDataError !== 'error' && cartData.amount !== 0)
  // console.log('((!addToCart' + [productId] + '&& getProductOriginQuantity' + (productId) + ' > 0) || addToCart' + [productId] + ') && cartDataError !== error && cartData.amount !== 0', ((!addToCart[productId] && getProductOriginQuantity(productId) > 0) || addToCart[productId]) && cartDataError !== 'error' && cartData.amount !== 0)
  // const defaultvalue = ((!addToCart[productId] || getProductOriginQuantity(productId) === 0 || typeof getProductOriginQuantity(productId) === 'undefined') ? containerQuantity : getProductOriginQuantity(productId))
  // var defaultvalue = ((orderData.length > 0 && typeof getProductOriginQuantity(productId) !== 'undefined' && getProductOriginQuantity(productId) > 0) ? getProductOriginQuantity(productId) : containerQuantity)

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
  }

  // console.log('AddToCart : orderDataError', orderDataError)
  // console.log('AddToCart : cartDataError', cartDataError)
  console.log('ContainerCard: productID', productId)

  return (
    <>
      <Wrapper>
        <Alert {...alert ? alertProps : {}} />
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
        {loggedInUser ?
          (<>
            <Item>
              <p tw="w-full">{currencies[productCurrency]} {productPrice}</p>
            </Item>
            <VLine />
            <Item>
              <p tw="w-full">In Stock: {inStock} </p>
            </Item>
            <Item tw="overflow-visible m-0">
              {/* {(addToCart[productId] || productExists(true)) && */}
              {/* {((addToCart[productId] || getProductOriginQuantity(productId) > 0)) && orderDataError !== 'error' && */}
              {((!addToCart[productId] && itemOriginQuantity > 0) || addToCart[productId]) && cartDataError !== 'error' && cartData.amount !== 0 &&
                <>
                  <QuantityLabel>Quantity:</QuantityLabel>
                  <RemoveQuantity onClick={handleRemove}>
                    Remove
                  </RemoveQuantity>
                </>
              }
              {/* <Counter /> */}
              <Input tw="ml-sm"
                defaultValue={containerQuantity}
                value={containerQuantity}
                maxLength="3"
                pattern="[0-9]*"
                onChange={(e) => handleChange(e, productId)} />
              {/* {!addToCart[productId] && !productExists(true) && */}
              {((!addToCart[productId] && itemOriginQuantity === 0) || cartDataError === 'error') &&
                <>
                  <Button color="primary-blue" tw="h-10 ml-2.5"
                    onClick={AddToCart}>
                    Add to cart
                </Button>
                </>
              }
            </Item>
          </>
          )
          : (<>
            <Item>
              <p tw="w-full">Starting at: <br /> {currencies[productCurrency]} {productPrice}</p>
            </Item>
            <Item tw="overflow-visible">
              <Button color="primary-blue"
                onClick={() => window.location.replace(`${(process.env.NODE_ENV === 'development') ? 'http://localhost:3001' : ''}/auth/sso/login?initialURL=${history.location.pathname}`)}>
                Sign in to buy
              </Button>
            </Item>
          </>
          )
        }
      </Wrapper>

      <WrapperMobile>
        <InnerWrapperMobile>
          <Container3DIcon tw="flex-shrink-0 w-full h-20 object-cover object-center mb-4" alt="Container" />
          <div tw="w-full text-primary-blue text-sm leading-6 text-left">
            <p tw="capitalize">{productType}</p>
            <p>Starting at: {currencies[productCurrency]} {productPrice}</p>
            <p tw="capitalize">
              {productCity}, {productCountry} | {productSize}ft |{" "}
              {productCondition}
            </p>
            <span tw="inline-flex mt-4">
              <Button color="primary-blue">{loggedInUser ? 'Add to cart' : 'Sign in to buy'}</Button>
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
    cartDataError: state.cartDataError
  }
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
  getOrderCurrency
}

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
