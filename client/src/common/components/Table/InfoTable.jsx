import React, { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import { getOrderDetails, getProductsList } from "../../../redux";
import ShoppingCart from "../ShoppingCart/";
import UploadDocuments from "../../../common/components/UploadDocuments";
import ViewDocuments from "../../../common/components/ViewDocuments";
// import ViewContainersDetails from "./ViewContainersDetails.jsx";
// import { orderAddress } from "../../../common/constants/customClearance";
import currencies from "../../../common/constants/currencies";
import { Button, Text } from "../../styles";
import axios from "axios";
import PropTypes from "prop-types";
import tw from "twin.macro";

const TableWrapper = tw.div`
py-2 align-middle 
inline-block min-w-full 
rounded-sm px-4
`;

const Table = tw.table`
min-w-full text-center
`;

const TheadRow = tw.tr`
h-48
text-black 
bg-extra-light-blue
`;

const TheadCol = tw.th`
py-3
text-primary-blue font-medium
text-sm md:text-17 
whitespace-nowrap
`;

const TbodyRow = tw.tr`
hover:bg-gray-100
last:border-0
`;
// xl:py-4
const TbodyCol = tw.td`
px-6 sm:py-2
text-primary-blue font-normal
text-sm md:whitespace-nowrap
sm:whitespace-nowrap md:whitespace-normal
`;

function InfoTable({
  headers,
  data,
  order,
  headerColor,
  headerFontSize,
  alignTdsTop,
  bgColor,
  width,
  height,
  borderBottom,
  coloredText,
  bookingOrder = null,
  ...props
}) {
  const { getOrderDetails, getProductsList, orderData, productData } = props;

  const [container, setContainer] = useState([]);
  const [address, setAddress] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);
  const [typeSize, setTypeSize] = useState([]);
  const [condition, setCondition] = useState([]);
  const [price, setPrice] = useState([]);
  const [currency, setCurrency] = useState([]);
  const [orderFullDetails, setOrderFullDetails] = useState([]);
  const [ex, setEx] = useState([]);
  const [render, setRender] = useState(false);

  const [product, setProduct] = useState([]);

  const useForceUpdate = () => useState()[1];
  const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   if (getOrderDetails && bookingOrder) getOrderDetails(bookingOrder);
  // }, [getOrderDetails, bookingOrder]);

  // const getBookingInfo = (bookingOrder) => {
  //   data.map((booking, index) => {
  //     if (booking.orderId === bookingOrder)
  //     {
  //       axios.get('/orderDetails/' + bookingOrder).then((results) => {
  //         console.log('home orderDetails results.data', results.data )
  //         // setOrders(results.data);
  //       })
  //     }

  //   })

  // }

  useEffect(() => {
    if (getProductsList) getProductsList();
  }, [getProductsList, bookingOrder]);

  useEffect(() => {
    if (typeof productData !== "undefined") setProduct(productData);
  }, [productData]);

  useEffect(() => {
    if (bookingOrder) {
      // data.map((booking, index) => {
      // if (booking.orderId === bookingOrder) {
      axios.get("/orderDetails/" + bookingOrder).then((results) => {
        console.log("home orderDetails results.data", results.data);
        // setOrders(results.data);
        let quantities = [];
        let price = [];
        results.data.map((oneOrderDetails, index) => {
          console.log("useeffect index", index);
          // quantities.push(oneOrderDetails.quantity);
          setQuantity((quantity) => [...quantity, oneOrderDetails.quantity]);
          setPrice((price) => [...price, oneOrderDetails.price]);

          // if (getProductsList) {
          // getProductsList().then((response) => {
          console.log("useEffect productData", productData);
          console.log("useEffect product", product);
          if (productData) {
            productData.products.map((oneProduct) => {
              if (oneOrderDetails.productId === oneProduct.productId) {
                // setType((type) => [...type, oneProduct.productTypeDisplay]);
                // setSize((size) => [...size, oneProduct.productSize]);
                // setTypeSize((typeSize) => [
                //   ...typeSize,
                //   oneProduct.productTypeSizeDisplay,
                // ]);
                // setCondition((condition) => [
                //   ...condition,
                //   oneProduct.productCondition,
                // ]);
                // setAddress((address) => [
                //   ...address,
                //   oneProduct.productCity + oneProduct.productCountry,
                // ]);
                // setContainer((container) => [
                //   ...container,
                //   oneProduct.productDepot,
                // ]);
                setCurrency((currency) => [
                  ...currency,
                  oneProduct.productCurrency,
                ]);
                setOrderFullDetails((orderFullDetails) => [
                  ...orderFullDetails,
                  {
                    Quantity: oneOrderDetails.quantity,
                    Price: oneOrderDetails.price,
                    Type: oneProduct.productTypeDisplay,
                    Size: oneProduct.productSize,
                    TypeSize: oneProduct.productTypeSizeDisplay,
                    Condition: oneProduct.productCondition,
                    Address: oneProduct.productCity + oneProduct.productCountry,
                    Container: oneProduct.productDepot,
                  },
                ]);
                // setEx((ex) => [
                //   ...ex,
                //   {
                //     Quantity: 1,
                //     Price: 1000,
                //     Type: "dry",
                //     Size: 20,
                //     Address: "MILANOItaly",
                //     Condition: "re-use",
                //     Container: 3,
                //     //  Container: "C",        ​​
                //     TypeSize: "ST",
                //   },
                // ]);
                setEx([
                  ...ex,
                  oneOrderDetails.quantity,
                  oneOrderDetails.price,
                  oneProduct.productTypeDisplay,
                  oneProduct.productSize,
                  oneProduct.productTypeSizeDisplay,
                  oneProduct.productCondition,
                  oneProduct.productCity + ", " + oneProduct.productCountry,
                  oneProduct.productDepot,
                ]);
                setRender(true);
                // forceUpdate()
              }

              // {currencies[product.productCurrency]} {order.total}
            });
          }
          // })
          // }
        });
        // setQuantity(quantities);
      });
      // }
      // });
    }
    forceUpdate();
  }, [getProductsList, bookingOrder, productData]);

  // useEffect(() => {
  //   forceUpdate()
  // },[ex, render])
  // useEffect(() => {
  //   if (getOrderDetails && bookingOrder)
  //   getBookingInfo(bookingOrder)
  // }, [getBookingInfo, bookingOrder])
  console.log("home ex", ex);
  console.log("home data", data);
  console.log("home getOrderDetails", getOrderDetails);
  console.log("home bookingOrder", bookingOrder);
  console.log("home productData", productData);
  console.log("home product", product);
  console.log("home quantity", quantity);
  console.log("home currency", currency);
  console.log(
    "home container data",
    quantity,
    price,
    type,
    size,
    typeSize,
    condition,
    address,
    container,
    currency
  );
  console.log("orderFullDetails", orderFullDetails);

  // console.log("InfoTable props", props);
  const styleText = (text) => {
    switch (text) {
      case "none":
      case "not ready":
      case "not uploaded":
        return "gray";

      case "invoice sent":
        return "yellow";

      case "Uploaded / Not Validated":
        return "blue";

      case "picked up":
      case "paid":
      case "Uploaded / Validated":
        return "green";

      default:
      // code block
    }
  };

  const currencySymbol = (country) => {
    switch (country) {
      case "italy":
      case "spain":
        return " €";
      default:
        return " £";
    }
  };

  function getButton(status, orderId) {
    if (status === "uploaded /not validated") {
      return (
        <Modal
          inline
          width="508px"
          paddingBottom="80px"
          titleFontSize="24px"
          component={
            <Button color="primary-blue" tw="w-128">
              Manage
            </Button>
          }
          title="Manage Documents"
          children={
            <UploadDocuments key={Math.random()} bookingOrder={orderId} />
          }
        />
      );
    }

    return status === "uploaded / validated" ? (
      <Modal
        inline
        width="508px"
        paddingBottom="32px"
        titleFontSize="24px"
        component={
          <Button color="primary-blue" tw="w-128">
            View
          </Button>
        }
        title="View Documents"
        children={<ViewDocuments key={Math.random()} bookingOrder={orderId} />}
      />
    ) : (
      <Modal
        inline
        width="508px"
        paddingBottom="32px"
        titleFontSize="24px"
        component={
          <Button color="primary-blue" tw="w-128">
            Upload
          </Button>
        }
        title="Upload Documents"
        children={
          <UploadDocuments key={Math.random()} bookingOrder={orderId} />
        }
      />
    );
  }

  return (
    <div
      tw="overflow-x-auto m-auto my-0"
      style={{
        backgroundColor: bgColor ? bgColor : "#ffffff",
        width: width ? width : "100%",
        height: height ? height : "max-content",
        maxWidth: "100%",
      }}
    >
      <TableWrapper>
        <Table>
          <thead>
            <TheadRow
              style={{
                backgroundColor: headerColor ? headerColor : "#E6EAF0",
                borderBottom: borderBottom ? borderBottom : 0,
              }}
            >
              {/* {ex} */}
              {/* {orderFullDetails.length > 0 ? orderFullDetails[0].Quantity : "empty array"} */}
              {headers &&
                headers.map(
                  (title) =>
                    console.log("title", title) || (
                      <TheadCol
                        key={title}
                        scope="col"
                        style={{
                          fontSize: headerFontSize ? headerFontSize : 14,
                          textAlign: ex && ex.length > 0 ? "left" : "center",
                        }}
                      >
                        {/* {title === 'Total Amount' ? title+currency()} */}
                        {title}
                      </TheadCol>
                    )
                )}
            </TheadRow>
            {/* {ex.length > 0 && (
              <TheadRow
                style={{
                  backgroundColor: headerColor ? headerColor : "#E6EAF0",
                  borderBottom: borderBottom ? borderBottom : 0,
                }}
              >
                {ex.map(
                  (title) =>
                    console.log("title", title) || (
                      <TheadCol
                        key={title}
                        scope="col"
                        style={{ fontSize: 14 }}
                      >
                        {title}
                      </TheadCol>
                    )
                )}
              </TheadRow>
            )} */}
          </thead>
          <tbody>
            {ex.length > 0 && (
              <TbodyRow
                style={{
                  borderBottom: borderBottom ? borderBottom : 0,
                  verticalAlign: alignTdsTop ? "top" : "middle",
                }}
              >
                <TbodyCol
                  style={{ fontSize: 14, textAlign: "left", paddingLeft: 0 }}
                >
                  {/* {ex.map((title, i) => (
                   <span> {title} </span>
                    ) )} */}
                  <span tw="text-15 h-14 text-primary-blue font-normal capitalize">
                    {" "}
                    {ex[0] +
                      " x " +
                      ex[2] +
                      ", " +
                      ex[3] +
                      "' " +
                      ex[4] +
                      ", " +
                      ex[5]}{" "}
                  </span>
                  <span> {ex[1]} </span>
                  <div tw="text-13 text-light-gray tracking-wide"> {ex[6]}</div>
                </TbodyCol>
                <TbodyCol style={{ fontSize: 14, textAlign: "left" }}>
                  <span> {ex[1]} </span>
                </TbodyCol>
              </TbodyRow>
            )}

            {data &&
              data.map((item, i) => (
                <TbodyRow
                  key={i}
                  style={{
                    borderBottom: borderBottom ? borderBottom : 0,
                    verticalAlign: alignTdsTop ? "top" : "middle",
                  }}
                >
                  {order.map(
                    (key) =>
                      console.log("key", key, item[key], item) ||
                      (key === "button" ? (
                        // (key === "customsClearance" ? (
                        <TbodyCol key={item[key]}>
                          {/* {item[key] === "Upload" || item[key] === "Manage" ? ( */}
                          {getButton(item["documentStatus"], item["orderId"])}
                        </TbodyCol>
                      ) : key === "pendingActions" ? (
                        <TbodyCol key={item[key]}>
                          {item["paymentStatus"] === "invoice sent" &&
                          item["paymentProof"] === "not uploaded"
                            ? "Upload Payment Proof"
                            : item["paymentStatus"] === "paid" &&
                              item["customsClearance"] === "not uploaded"
                            ? "Upload Customs Clearance Proof"
                            : "none"}
                        </TbodyCol>
                      ) : coloredText ? (
                        <TbodyCol key={item[key]}>
                          {key !== "bookingStatus" ? (
                            <Text color={styleText(item[key])}>
                              {item[key]}
                            </Text>
                          ) : (
                            <>
                              <Text color={styleText(item[key])}>
                                {item[key]}
                              </Text>
                              {/* { quantity.length > 0 && 
                             quantity.length > 0 && 
                             price.length > 0 && 
                             type.length > 0 && 
                             size.length > 0 && 
                             typeSize.length > 0 && 
                             condition.length > 0 && 
                             address.length > 0 && 
                             container.length > 0 && 
                             currency.length > 0 && */}
                              {console.log("return ex", ex)}
                              {/* {forceUpdate()} */}
                              {productData && (
                                <Modal
                                  render={render}
                                  ex={ex}
                                  grid
                                  width="435px"
                                  paddingBottom="25.5px"
                                  component={
                                    item["paymentStatus"] !== "none"
                                      ? "Order Details"
                                      : ""
                                  }
                                  title={"order #" + item.orderId}
                                  children={
                                    <InfoTable
                                      productData={productData && productData}
                                      // orderFullDetails={
                                      //   orderFullDetails.length > 0 &&
                                      //   orderFullDetails
                                      // }
                                      // ex={ex}
                                      bookingOrder={item.orderId}
                                      width="384px"
                                      headerColor="#f3f5f7"
                                      headerFontSize="17px"
                                      alignTdsTop={true}
                                      bgColor="#f3f5f7"
                                      borderBottom="1px solid #d1d1d1"
                                      headers={["Containers Details"]}
                                      order={[]}
                                      // order={[
                                      //   container[0],
                                      //   address[0],
                                      //   quantity[0],
                                      //   type[0],
                                      //   condition[0],
                                      // ]}
                                      data={ex}
                                    />
                                  }
                                />
                              )}
                            </>
                          )}
                        </TbodyCol>
                      ) : (
                        <TbodyCol key={item[key]}>
                          {item[key] && key === "bookingDate"
                            ? item[key].substring(0, 10)
                            : key === "orderId"
                            ? item[key]
                            : key === "amount"
                            ? item[key] + currency
                            : item[key]}
                          {/* {(item[key] instanceof Date) ? new Date(item[key].toDateString()) : item[key]} */}
                        </TbodyCol>
                      ))
                  )}
                </TbodyRow>
              ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
}

InfoTable.propTypes = {
  headers: PropTypes.arrayOf(String),
  data: PropTypes.arrayOf(Object),
  order: PropTypes.arrayOf(String),
};

function mapStateToProps(state) {
  return {
    orderId: state.orderId,
    orderData: state.orderData,
    cartData: state.cartData,
    productData: state.productData,
  };
}

const mapDispatchToProps = {
  getOrderDetails,
  getProductsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoTable);
