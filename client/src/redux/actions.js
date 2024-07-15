import axios from 'axios';

export const getUserProfile = () => (dispatch) => {
  return axios.get(`/profile`, { credentials: 'include' }).then((results) => {
    dispatch({
      type: 'GET_USER_SUCCESS',
      loggedInUser: results.data,
    })
  }).catch(error => {
    // throw(error)
    dispatch({
      type: 'GET_USER_SUCCESS',
      loggedInUser: null,
    })
  })
}

export const connectUser = (initialURL) => (dispatch) => {
  return axios.get('/auth/sso/login?initialURL=' + initialURL, { credentials: 'omit', withCredentials: false }).then((results) => {
    dispatch({
      type: 'AUTHENTICATION_USER_SUCCESS',
      loggedIn: true,
    })
  }).catch(error => {
    throw (error)
  })
}

export const userConnected = () => (dispatch, getState) => {
  dispatch({ type: 'LOGGED_IN' })
}

export const disconnectUser = () => (dispatch, getState) => {
  return axios.get('/auth/sso/logout').then((results) => {
    dispatch({
      type: 'LOGOUT',
      loggedIn: false,
      loggedInUser: null
    })
  }).catch(error => {
    throw (error)
  })
}

export const getUserRole = (ccgId) => (dispatch, getState) => {
  return axios.get(`/users/` + ccgId).then((results) => {
    dispatch({
      type: 'User_Role',
      userInfo: results.data,
      userRole: results.data.role
    })
  }).catch(error => {
    throw (error)
  })
}

/*** Shopping Cart ***/
export const openShoppingCart = () => (dispatch, getState) => {
  dispatch({
    type: 'OPEN_SHOPPINGCART',
    openShoppingCart: true
  })
}

export const getOrderCurrency = (currency) => (dispatch, getState) => {
  dispatch({
    type: 'ORDER_CURRENCY',
    orderCurrency: currency
  })
}

export const getOrderStatus = (status) => (dispatch, getState) => {
  dispatch({
    type: 'ORDER_STATUS',
    orderStatus: status
  })
}

export const getOrderID = (filterQuery) => (dispatch, getState) => {
  return axios.post('/orders/cart', filterQuery).then((results) => {
    dispatch({
      type: 'GET_ORDERID',
      orderId: results.data.orderId
    })
    // localStorage.setItem('order_ID', results.data.orderId);
    // console.log('inside getOrderID')
    // console.log("getOrderID results", results)
    // console.log("orderId", results.data.orderId)
  }).catch(error => {
    // throw(error)
    dispatch({
      type: 'ADDTOCART_ERROR',
      orderIdError: 'error'
    })
  })
}

export const getOrderDetails = (orderId) => (dispatch, getState) => {
  return axios.get('/orderDetails/' + orderId).then((results) => {
    dispatch({
      type: 'GET_ORDERDATA',
      orderData: results.data,
      orderDataError: ''
    })
    // console.log('inside getOrderDetails')
    // console.log("getOrderDetails results", results.data)
    // console.log("orderId", results.data.orderId)
  }).catch(error => {
    console.log('getOrderDetails error', error)
    dispatch({
      type: 'ORDERDATA_ERROR',
      orderDataError: 'error',
      orderData: []
    })
    // throw(error)
  })
}

export const getOrderSum = (orderParam) => (dispatch, getState) => {
  return axios.get('/orders?' + orderParam).then((results) => {
    console.log('getOrderSum results.data', results.data)
    dispatch({
      type: 'GET_CARTDATA',
      cartData: results.data,
      cartDataError: '',
      orderId: results.data[0]['orderId'],
      // type: 'GET_USER_ORDERSLIST',
    })
    // dispatch({
    //   type: 'GET_ORDERID',
    //   orderId: results.data.orderId
    // })
    // console.log('inside getOrderSum')
    // console.log("getOrderSum results", results)
    // localStorage.setItem('cart_DATA', results.data);
    // console.log("getOrderSum orderId", results.data[0]['orderId'])
  }).catch(error => {
    // throw(error)
    dispatch({
      type: 'CARTDATA_ERROR',
      cartDataError: 'error',
      cartData: [],
      // type: 'GET_USER_SUCCESS',
      // loggedInUser: null,
    })
  })
}

export const getProductsList = () => (dispatch, getState) => {
  return axios.get('/products').then((results) => {
    dispatch({
      type: 'GET_PRODUCTDATA',
      productData: results.data
    })
    // results.data.products.map((product, index) => {
    //   localStorage.setItem('currency', product.productCurrency);
    // })
    // console.log('inside getProductsList')
    // console.log("getProductsList results", results)
    // console.log("orderId", results.data.orderId)
  }).catch(error => {
    // throw (error)
    dispatch({
      type: 'PRODUCTDATA_ERROR',
      cartDataError: 'error'
    })
  })
}

export const updateOrderDetails = (orderId, filterQuery) => (dispatch, getState) => {
  return axios.put('/orderDetails/' + orderId, filterQuery).then((results) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      updateProduct: true,
      updatedProductData: filterQuery
    })
    // console.log('inside updateOrderDetails')
    // console.log("updateOrderDetails results", results)
    // console.log("updateOrderDetails updatedOrderData", filterQuery)
  }).catch(error => {
    // throw(error)
    dispatch({
      type: 'CARTDATA_ERROR',
      cartDataError: 'error'
    })
  })
}

