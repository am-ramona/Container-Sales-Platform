import React, { useEffect, useState } from "react";
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
import ChooseContainers from "./ChooseContainers";
import ListDocuments from "./ListDocuments";
import { ShoppingCartIcon, DocumentIcon } from "../../../assets/icons";
import { Card, Button } from "../../../common/styles";

import tw, { styled } from "twin.macro";

const Header = tw.div`
text-primary-blue text-17 font-bold
`;

const RefId = tw.span`
font-normal`;

const Wrapper = styled.section``;

const SelectionCard = tw(Card)`
h-full min-h-containersSelection`;

const Title = tw.div`
grid grid-cols-2 
max-w-275 pt-5
`;

const TabBtn = tw(Button)`
grid grid-cols-25Auto gap-2.5
text-17 text-left pl-0
`;

const SelectContainers = (props) => {
  const {
    loggedInUser,
    orderId,
    orderData,
    cartData,
    productData,
    cartDataError,
  } = props;
  const [step, setStep] = useState(1);

  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const referenceNo = urlParams.get('refNo')

  // useEffect(() => {
  //     props.getOrderDetails(props.location.booking.reference)
  // }, [])

  // console.log('SelectContainers props.orderData', props.orderData)
  // console.log('SelectContainers props.orderId', props.orderId)
  // console.log('SelectContainers props.location', props.location)
  console.log("selection orderId", props.location.state.reference);
  return (
    <SelectionCard>
      {/* <Header>Booking Reference #: <RefId>{referenceNo}</RefId> </Header> */}
      <Header>
        Booking Reference #: <RefId>{props.location.state.reference}</RefId>{" "}
      </Header>
      <Wrapper>
        <Title>
          <TabBtn
            onClick={() => setStep(1)}
            color={step === 1 ? "neutral-blue" : "neutral"}
          >
            <ShoppingCartIcon
              tw="outline-none"
              width="25px"
              height="25px"
              style={{ color: step === 2 ? "#d3dce1" : "#04246A" }}
              alt="Shopping Cart"
            />
            <p style={{ color: step === 1 ? "#04246A" : "#d3dce1" }}>Booking</p>
          </TabBtn>
          <TabBtn
            onClick={() => setStep(2)}
            color={step === 2 ? "neutral-blue" : "neutral"}
          >
            <DocumentIcon
              tw="outline-none"
              width="25px"
              height="25px"
              style={{ fill: step === 1 ? "#d3dce1" : "#04246A" }}
              alt="Documents"
            />
            <p style={{ color: step === 1 ? "#d3dce1" : "#04246A" }}>
              Documents
            </p>
          </TabBtn>
        </Title>
        <section>
          {step === 1 ? (
            <ChooseContainers orderId={props.location.state.reference} />
          ) : (
            <ListDocuments orderId={props.location.state.reference} />
          )}
        </section>
      </Wrapper>
    </SelectionCard>
  );
};

function mapStateToProps(state, props) {
  return {
    count: state.count,
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderId: state.orderId,
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectContainers);
