import React, { useEffect, useState } from "react";
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
} from "../../../redux";
import ViewChosenContainers from "./ViewChosenContainers";
import Collapse from "../../../common/components/Collapse";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { Checkbox, Card, Button, Text } from "../../../common/styles";
import tw from "twin.macro";
import axios from "axios";

const Title = tw.div`
text-primary-blue text-17 font-medium 
pt-30 pb-1
`;

const Product = tw.div`
grid grid-cols-7 gap-2.5`;

const Description = tw.div`
text-primary-blue text-17 font-medium`;

const Light = tw.span`
font-normal`;

const TableWrapper = tw.div`
w-full bg-gray pt-1 pb-2`;

const Table = tw.table`
max-w-full md:w-432 
text-primary-blue text-17
text-center ml-41 leading-none`;

const Titles = tw.tr`
font-medium`;

const Tbody = tw.tbody`
font-normal`;

const Th = tw.th`
py-3.5 font-medium`;

const Tr = tw.tr`
border-b border-gray-200 h-38`;

const Actions = tw.div`
text-right pt-sm`;

const Cancel = tw.span`
font-light underline mr-30 cursor-pointer`;

const StyledStatus = tw.div`
`;

const SaveBtn = tw(Button)`
h-41 w-151 mdl:text-14 xs:text-13 
hover:( bg-secondary-blue border-secondary-blue text-white )
`;

const StyledCheckbox = tw(Checkbox)`
w-25 h-25 text-light-green
bg-primary-blue rounded-xl
focus:ring-0 
focus:outline-none focus-visible:ring-2 
focus-visible:ring-light-green
cursor-pointer
`;

const ChooseContainers = (props) => {
  const {
    loggedInUser,
    orderId,
    orderData,
    cartData,
    productData,
    cartDataError,
  } = props;
  const history = useHistory();
  const [saved, setIsSaved] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isChecked, setIsChecked] = useState([
    // "CMAU - 782190": false,
    // "CMAU - 633781": false,
    // "CMAU - 374654": false,
    // "CMAU - 951379": false,
    // "CMAU - 375654": false,
    // "CMAU - 955379": false
  ]);

  const [containersData, setContainersData] = useState({});

  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  // const referenceNo = urlParams.get('refNo')

  const [checkedCount, setCheckedCount] = useState([]);
  console.log("chooseContainers props", props);
  console.log("chooseContainers orderData", orderData);
  console.log("chooseContainers productData", productData);
  // const [filters, setFilters] = useState({
  //     containerType: 1,
  //     containerCondition: "booked",
  //     containerDepot: "",
  //     containerCity: "",
  //     containerCountry: "",
  //     maxPrice: " "
  // });
  // const { filterQuery } = useQueryBuilder(filters);
  // const { data, isError, isLoading } = useQuery(
  //     `${containerEndpoints.list}?${filterQuery}`
  // );

  // console.log('isChecked',isChecked)
  // var count = Object.keys(isChecked).filter(function (key) {
  //     return (isChecked[key] === true);
  // }).length;
  // setCheckedCount(count)
  // console.log('count', count)
  // checkedCount[name] = count;
  // setCheckedCount({ ...checkedCount })

  useEffect(() => {
    // console.log("ChooseContainers isChecked", isChecked)
    // var count = isChecked.length;
    console.log('useEffect isChecked', isChecked)
    const isCheckedCopy = [...isChecked]
    // var isCheckedCopyy = isCheckedCopy.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i).length;
//   console.log('isChecked isCheckedCopyy', isChecked, isCheckedCopyy)
    var count = isCheckedCopy.filter(function (key) {
        console.log('key key ', key )
        console.log('Object.values(key).includes(true)', Object.values(key).includes(true) )
        return (Object.values(key).includes(true));
    }).length;
    // count = count.filter((v,i,a)=>a.findIndex(t=>(JSON.stringify(t) === JSON.stringify(v)))===i).length;
    console.log("count count", count);
    setCheckedCount(count);
    setIsDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  useEffect(() => {
    // if (loggedInUser) {
    props.getOrderDetails(props.orderId);
    // .then(props.getProductsList())
    // }
  }, [isChecked]);

  useEffect(() => {
    // props.getOrderDetails(referenceNo).then(response => {
    //     props.getProductsList();
    // })

    // props.getOrderDetails(referenceNo).then(response => {
    props.getProductsList();
  }, [props.orderId]);

  useEffect(() => {
    orderData &&
      productData.products &&
      orderData.map((order) =>
        productData.products.map(
          (product) =>
            order.productId === product.productId &&
            axios
              .get(
                `${containerEndpoints.list}?containerType=${product.productTypeDisplay}&containerCondition=${product.productCondition}&containerDepot=${product.productDepot}&containerCity=${product.productCity}&containerCountry=${product.productCountry}&containerPrice=${product.productPrice}`
              )
              .then((response) => {
                // console.log('response.data.containers', response.data.containers)
                containersData[product.productId] = response.data.containers;
                setContainersData({ ...containersData });
                // console.log('containersData', containersData)
                // console.log('containersData[product.productId]', containersData[product.productId])
              })
        )
      );
  }, [productData]);

  console.log("ChooseContainers", orderData);
  console.log("ChooseContainers isChecked", isChecked);

  const handleChecked = ({ target: { name, checked } }, orderDetails) => {
    console.log("orderDetails", orderDetails);

    let isCheckedCopy = [...isChecked];
    let objIndex = isCheckedCopy.findIndex((obj) => obj.orderDetailsId === orderDetails);
    console.log("objIndex", objIndex);
    if (objIndex === 0) {
      isCheckedCopy[objIndex] = {
        orderDetailsId: orderDetails,
        containerNo: name,
        [name]: checked,
        containerStatus: "Available",
      };
    } else {
      isCheckedCopy.push({
        orderDetailsId: orderDetails,
        containerNo: name,
        [name]: checked,
        containerStatus: "Available",
      });
    }

    // console.log('isCheckedCopy', isCheckedCopy)
    //     let newIsCheckedCopy = isCheckedCopy.map(el => (
    //         el.orderDetailsId==='name'? {...el, key: value}: el
    //   ))

    setIsChecked(isCheckedCopy)
    // setIsChecked([
    //   ...isChecked,
    //   {
    //     orderDetailsId: orderDetails,
    //     containerNo: name,
    //     [name]: checked,
    //     containerStatus: "Available",
    //   },
    // ]);
  };

  const saveSelectedContainers = () => {
    console.log("isChecked", isChecked);
    // const containersToSave = Object.keys(isChecked).map(function (key, index) {
    //   return {
    //     containerNo: key,
    //     containerStatus: "Available",
    //     orderDetailsId: "test",
    //   };
    // });
    axios
      .put(`${containerEndpoints.updateContainerStatus}`, isChecked)
      .then((response) => {console.log('Containers saved to bookings')});
  };

  return (
    <>
      {" "}
      {!saved ? (
        <>
          <Title>Choose Containers</Title>
          {orderData &&
            productData.products &&
            orderData.map((order) =>
              productData.products.map(
                (product) =>
                  order.productId === product.productId && (
                    <Collapse
                      trigger={
                        <Card>
                          <Product>
                            <Description>
                              Type: <Light>{product.productTypeDisplay}</Light>
                            </Description>
                            <Description>
                              Condition:{" "}
                              <Light>{product.productCondition}</Light>
                            </Description>
                            <Description>
                              Location:{" "}
                              <Light>
                                {product.productCity}, {product.productCountry}
                              </Light>
                            </Description>
                            <Description>
                              Price:{" "}
                              <Light>
                                {product.productPrice} {product.productCurrency}
                              </Light>
                            </Description>
                            <Description>
                              In Stock: <Light>{product.inStock}</Light>
                            </Description>
                            <Description>
                              Qty: <Light>{order.quantity}</Light>
                            </Description>
                            <StyledStatus>
                              <Text
                                tw="px-2.5 w-max"
                                color={
                                  checkedCount === order.quantity
                                    ? "green"
                                    : "blue"
                                }
                              >
                                {checkedCount} Chosen
                              </Text>
                            </StyledStatus>
                          </Product>
                        </Card>
                      }
                    >
                      <TableWrapper>
                        <Table>
                          <thead>
                            <Titles>
                              <Th>Container ID</Th>
                              <Th>Depot</Th>
                              <Th>Age</Th>
                              <Th></Th>
                            </Titles>
                          </thead>
                          <tbody>
                            {containersData &&
                              containersData[product.productId] &&
                              containersData[product.productId].map(
                                (container) =>
                                  console.log(
                                    "containersData container",
                                    container
                                  ) || (
                                    <Tr>
                                      <td>{container.containerNo}</td>
                                      <td>{container.containerDepot}</td>
                                      <td>{container.containerAge}</td>
                                      {/* <td>{Math.abs(2021 - container.buildDate)}</td> */}
                                      {/* <td><StyledCheckbox color="green" defaultChecked={isChecked["CMAU - 782190"]} name="CMAU - 782190" disabled={false} onClick={(e) => handleChecked(e)} /></td> */}
                                      <td>
                                        <StyledCheckbox
                                          color="green"
                                          defaultChecked={false}
                                          name={container.containerNo}
                                          disabled={false}
                                          onClick={(e) =>
                                            handleChecked(
                                              e,
                                              order.orderDetailsId
                                            )
                                          }
                                        />
                                      </td>
                                    </Tr>
                                  )
                              )}
                          </tbody>
                        </Table>
                      </TableWrapper>
                    </Collapse>
                  )
              )
            )}

          <Actions>
            <Cancel onClick={() => history.push("/agent/bookings")}>
              Cancel
            </Cancel>
            <SaveBtn
              onClick={() => {
                setIsSaved(true);
                saveSelectedContainers();
              }}
              disabled={isDisabled}
              color="primary-blue"
            >
              Save
            </SaveBtn>
          </Actions>
        </>
      ) : (
        <ViewChosenContainers orderId={props.orderId} setIsSaved={setIsSaved} />
      )}
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    count: state.count,
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderData: state.orderData,
    cartData: state.cartData,
    cartDataError: state.cartDataError,
    productData: state.productData,
    updateProduct: state.updateProduct,
    orderDataError: state.orderDataError,
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

export default connect(mapStateToProps, mapDispatchToProps)(ChooseContainers);
