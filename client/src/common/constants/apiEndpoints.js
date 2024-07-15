const containerEndpoints = {
  count: "/containers/summary",
  booked: "/containers/booked",
  soldBySize: "/containers/soldBySize",
  soldByType: "/containers/soldByType",
  soldByCondition: "/containers/soldByCondition",
  products: "/products",
  list: "/containers",
  updateContainer: "/containers/updateContainer",
  updateContainerStatus: "/containers/status",
  laralist: "/laraContainers",
  mapLaraContainers: "/laraContainers/products",
  moveToAwaitingConfirmation: "/products/laraContainers",
  updateLaraContainer: "/laraContainers"
};

const bookingEndpoints = {
  bookings: "/bookings",
  sample: "/bookings/sample",
  agents: "/users"
};

const paymentEndpoints = {
  getPaymentInfo: "/payments/getPaymentInfo"
};

const orderEndpoints = {
  cart: "/orders",
  addToCart: "/orders/cart",
  orderDetails: "/orderDetails",
  updateOrderDetails: "/orderDetails",
  sales: "/orders/ordersPerYear"
};

const customerEndpoints = {
  list: "/customers/list"
};

const locationsEndpoints = {
  agent: "/locations/agent",
  savedDepots: "/locations",
  depots: "/cdrlocations",
  countries: "/cdrlocations/countries"
}

export {
  bookingEndpoints,
  containerEndpoints,
  paymentEndpoints,
  orderEndpoints,
  customerEndpoints,
  locationsEndpoints
};
