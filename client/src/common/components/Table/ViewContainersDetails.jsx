import { useEffect, useState, useLayoutEffect } from "react";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import { getOrderDetails, getProductsList } from "../../../redux";
import ShoppingCart from "../ShoppingCart/";
import UploadDocuments from "../../../common/components/UploadDocuments";
import ViewDocuments from "../../../common/components/ViewDocuments";
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

function ViewContainersDetails({
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

  const [product, setProduct] = useState([]);

  console.log("view ex", ex);
  console.log("view data", data);
  console.log("view getOrderDetails", getOrderDetails);
  console.log("view bookingOrder", bookingOrder);
  console.log("view productData", productData);
  console.log("view product", product);
  console.log("view quantity", quantity);
  console.log(
    "view container data",
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
              trklqala
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

                        <TbodyCol key={item[key]}>
trha
                        </TbodyCol>
                      )
                  }
                </TbodyRow>
              ))}
          </tbody>
        </Table>
      </TableWrapper>
    </div>
  );
}

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

export default connect(mapStateToProps, mapDispatchToProps)(ViewContainersDetails);
