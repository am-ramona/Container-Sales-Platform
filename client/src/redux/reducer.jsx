import _ from "lodash";

let initialState = {
  count: 42,
  loggedInUser: null,
  loggedIn: false,
  loggedOut: false,
  SignedIn: false,
  clients: [],
  userInfo: {},
  userRole: "",

  orderId: null,
  orderCurrency: null,
  originCountry: null,
  openShoppingCart: false,
  totalAmount: 0,

  orderData: [],
  cartData: [],
  productData: [],
  updateProduct: false,
  updatedProductData: {},

  status: null,
  orderStatus: "",
  response: null,
  orderDataError: "",
  orderIdError: "",
  cartDataError: "",
  productDataError: ""
};

export default function Reducer(state = initialState, action) {
  if (!_.get(action, "type")) {
    return state;
  }
  switch (action.type) {
    case "FETCHING":
      return {
        ...state,
        status: "FETCHING",
      };
    case "SUCCESS":
      return {
        ...state,
        status: "SUCCESS",
        // response
      };
    case "ERROR":
      return {
        ...state,
        status: "ERROR",
        // response
      };
    case "INCREMENT":
      return {
        count: state.count + 1,
      };
    case "DECREMENT":
      return {
        count: state.count - 1,
      };
    case "AUTHENTICATION_USER_SUCCESS":
    case "GET_USER_SUCCESS":
      return {
        ...state,
        loggedIn: true,
        loggedInUser: action.loggedInUser,
      };
    case "LOGGED_IN":
      return {
        ...state,
        loggedIn: true,
      };
    case "LOGOUT":
      return {
        ...state,
        loggedOut: true,
        loggedIn: false,
        loggedInUser: null,
      };

    case "User_Role":
      return {
        ...state,
        userInfo: action.userInfo,
        userRole: action.userRole,
      };

    case "GET_ORDERID":
      return {
        ...state,
        orderId: action.orderId,
      };

    case "OPEN_SHOPPINGCART":
      return {
        ...state,
        openShoppingCart: true,
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        updateProduct: true,
        updatedProductData: action.updatedProductData,
      };
    case "GET_ORDERDATA":
      return {
        ...state,
        orderData: action.orderData,
        orderdataError: action.orderDataError,
      };
    case "GET_PRODUCTDATA":
      return {
        ...state,
        productData: action.productData,
      };
    case "GET_CARTDATA":
      return {
        ...state,
        cartData: action.cartData,
        cartDataError: action.cartDataError,
        orderId: action.orderId,
      };
    case "ADDTOCART_ERROR":
      return {
        ...state,
        orderIdError: action.orderIdError,
      };
    case "ORDER_CURRENCY":
      return {
        ...state,
        orderCurrency: action.orderCurrency,
      };
    case "get_ORIGINCOUNTRY":
      return {
        ...state,
        originCountry: action.originCountry,
      };
    case "ORDER_STATUS":
      return {
        ...state,
        orderStatus: action.orderStatus,
      };
    case "ORDERDATA_ERROR":
      return {
        ...state,
        orderDataError: "error",
      };
    case "CARTDATA_ERROR":
      return {
        ...state,
        cartDataError: "error",
      };
    case "PRODUCTDATA_ERROR":
      return {
        ...state,
        productDataError: "error",
      };

    default:
      return state;
  }
}
