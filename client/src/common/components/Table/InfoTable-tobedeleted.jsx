import { useEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import { getOrderDetails } from '../../../redux'
import ShoppingCart from "../ShoppingCart/";
import UploadDocuments from "../../../common/components/UploadDocuments";
import ViewDocuments from "../../../common/components/ViewDocuments";
import { orderAddress } from "../../../common/constants/customClearance";
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

  const { getOrderDetails, orderData, productData } = props

  const [container, setContainer] = useState([]);
  const [address, setAddress] = useState([]);
  const [quantity, setQuantity] = useState([]);
  const [type, setType] = useState([]);
  const [size, setSize] = useState([]);
  const [typeSize, setTypeSize] = useState([]);
  const [condition, setCondition] = useState([]);
  const [price, setPrice] = useState([]);

  useEffect(() => {
    if (getOrderDetails && bookingOrder)
    getOrderDetails(bookingOrder)
  }, [getOrderDetails, bookingOrder])

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
    if (getOrderDetails && bookingOrder)
    {
      data.map((booking, index) => {
        if (booking.orderId === bookingOrder)
        {
          axios.get('/orderDetails/' + bookingOrder).then((results) => {
            console.log('home orderDetails results.data', results.data )
            // setOrders(results.data);
            let quantities = [];
            let price = [];
            results.data.map((oneOrderDetails, index) =>
                // quantities.push(oneOrderDetails.quantity);
                setQuantity(quantity => [...quantity, oneOrderDetails.quantity]);
                setPrice(price => [...price, oneOrderDetails.price]);
				
				productData.products.map((oneProduct) => (
                    oneOrderDetails.productId === oneProduct.productId && 
								setType(type => [...type, oneProduct.productTypeDisplay])
								setSize(size => [...size, oneProduct.productSize])
								setTypeSize(typeSize => [...typeSize, oneProduct.productTypeSizeDisplay])
								setCoondition(condition => [...condition, oneProduct.productCondition])
								setAddress(address => [...address, oneProduct.productCity + oneProduct.productCountry])
								setContainer(container => [...container, oneproduct.productDepot])
								setCurrency(currency => [...currency, oneProduct.productCurrency])
								
{currencies[product.productCurrency]} {order.total}
                            ))
               
            )
            // setQuantity(quantities);
          })
        }
  
      })

    }

  }, [getOrderDetails, bookingOrder])

  // useEffect(() => {
  //   if (getOrderDetails && bookingOrder)
  //   getBookingInfo(bookingOrder)
  // }, [getBookingInfo, bookingOrder])

  console.log('home data', data)

  console.log("InfoTable props", props);
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

  const currency = (country) => {
    switch (country) {
      case "italy":
      case "spain":
        return " €";
      default:
        return " £";
    }
  };

  function getButton(status) {
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
          children={<UploadDocuments key={Math.random()} />}
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
        children={<ViewDocuments key={Math.random()} />}
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
        children={<UploadDocuments key={Math.random()} />}
      />
    );
  }

  return (
    <div
      tw="overflow-x-auto m-auto my-0"
      style={{
        backgroundColor: bgColor ? bgColor : "#ffffff",
        width: width ? width : "100%",
        height: height ? height : "inherit",
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
              {headers.map(
                (title) =>
                  console.log("title", title) || (
                    <TheadCol
                      key={title}
                      scope="col"
                      style={{ fontSize: headerFontSize ? headerFontSize : 14 }}
                    >
                      {/* {title === 'Total Amount' ? title+currency()} */}
                      {title}
                    </TheadCol>
                  )
              )}
            </TheadRow>
          </thead>
          <tbody>
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
                          {getButton(item["documentStatus"])}
                        </TbodyCol>
                      ) : (key === "pendingActions") ? (
                        <TbodyCol key={item[key]}>
                          {(item["paymentStatus"] === 'invoice sent' && item['paymentProof'] === 'not uploaded') ? 'Upload Payment Proof' : (item["paymentStatus"] === 'paid' && item['customsClearance'] === 'not uploaded') ? 'Upload Customs Clearance Proof' : 'none'}
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
                              <Modal
                                grid
                                width="435px"
                                height="337px"
                                component={
                                  item["paymentStatus"] !== "none"
                                    ? "View Address"
                                    : ""
                                }
                                title={"order #" + item.orderId}
                                children={
                                  <InfoTable
                                    bookingOrder={item.orderId}
                                    width="384px"
                                    height="250px"
                                    headerColor="#f3f5f7"
                                    headerFontSize="17px"
                                    alignTdsTop={true}
                                    bgColor="#f3f5f7"
                                    borderBottom="1px solid #d1d1d1"
                                    headers={["Container IDs", "Address", "Qte", "Type", "Condition"]}
                                    // order={["containerID", "POOL_ADDRESS_FULL", "A", "B", "C"]}
                                    order={[container, address, quantity, type, condition]}
                                    data={orderAddress}
                                  />
                                }
                              />
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
                            ? item[key] +
                              currency(props.orderData["originCountry"])
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

function mapStateToProps(state, props) {
  return {
    orderId: state.orderId,
    orderData: state.orderData,
    cartData: state.cartData,
    productData: state.productData
  };
}

const mapDispatchToProps = {
  getOrderDetails
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoTable);
