import React, { useState, useContext, useEffect } from "react";
import { connect } from "react-redux";
import { getUserRole, getOrderSum } from "../../../redux";
import MainSearch from "./MainSearch";
import InfoTable from "../../../common/components/Table/InfoTable";
import Breadcrumb from "../../../common/components/Breadcrumb";
import Alert from "../../../common/components/Alert";
import { CustomClearanceContext } from "../../../context/CustomClearanceContext";
import { CustomClearanceData } from "../../../common/constants/customClearance";
import axios from "axios";
import tw from "twin.macro";

const HomePage = tw.section`
mt-16 p-6
mx-auto relative
`;

const HomepageTitle = tw.h1`
text-primary-blue 
font-medium
text-24
`;

const CurrentOrdersSection = tw.section`
h-auto bg-white 
pt-4 px-10 mt-10 
shadow-md`;

const SearchContainersSection = tw.section`
pt-10
`;

const HomepageSubTitle = tw.h1`
text-primary-blue font-medium
text-23 leading-none pb-3
`;

function BuyerHome(props) {
  const {
    // getUserRole,
    userInfo,
    loggedInUser,
    cartData,
    getOrderSum,
  } = props;
  const [alert, setAlert] = useState(false);
  const [orders, setOrders] = useState([]);
  const { customClearanceDocument } = useContext(CustomClearanceContext);

  // const { data, isLoading, isError } = useQuery(
  //   `${containerEndpoints.products}?${filterQuery}`
  // );

  useEffect(() => {
    // if (props.cartData && props.cartData.status !== 'closed') {
    if (loggedInUser) {
      const filterOrderQuery =
        `customerUid=` + loggedInUser.uid + `&status=booked`;
      // props.getOrderSum(filterOrderQuery)
      // getOrderSum(filterOrderQuery)
      axios.get("/orders?" + filterOrderQuery).then((results) => {
        console.log("home /orders results.data", results.data);
        setOrders(results.data);
      });
    }
  }, [loggedInUser, getOrderSum]);

  // console.log("home orderData", props.orderData);
  // console.log("home cartData", props.cartData);
  // console.log("home userInfo", props.userInfo);
  // console.log("home orders", orders);

  let properties = {
    type: "warning",
    message: "Upload your customs clearance documents for order #1290",
    autoClose: false,
    // dismissTime : 10000
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

  return (
    <>
      <HomePage>
        <Breadcrumb crumbs={props.crumbs} />
        {/* <Alert {...(customClearanceDocument === "" ? properties : {})} /> */}
        <HomepageTitle>
          Welcome,{" "}
          {Object.keys(userInfo).length > 0 &&
            userInfo.firstName + " " + userInfo.lastName}{" "}
          !
        </HomepageTitle>
        <CurrentOrdersSection>
          <HomepageSubTitle>Your Current Orders</HomepageSubTitle>
          <InfoTable
            headerColor="#ffffff"
            borderBottom="1px solid #d1d1d1"
            coloredText={true}
            headers={[
              "Order #",
              "Containers",
              "Payment",
              "Documents",
              "Pending Actions",
              "Date of Booking",
              "Documents",
            ]}
            order={[
              "orderId",
              "bookingStatus",
              "paymentStatus",
              "documentStatus",
              "pendingActions",
              "bookingDate",
              "button",
            ]}
            data={orders}
          />
        </CurrentOrdersSection>
        <SearchContainersSection>
          <HomepageSubTitle tw="pb-10">Search Containers</HomepageSubTitle>
          <MainSearch />
        </SearchContainersSection>
      </HomePage>
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedInUser: state.loggedInUser,
    userRole: state.userRole,
    userInfo: state.userInfo,
    orderData: state.orderData,
    cartData: state.cartData,
  };
}

const mapDispatchToProps = {
  getUserRole,
  getOrderSum,
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyerHome);
