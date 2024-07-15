import React, { useState } from "react";
import { connect } from 'react-redux';
import {
  getOrderStatus
} from '../../../redux';
import CartDetails from "./CartDetails";
import PaymentDetails from "./PaymentDetails";
import ConfirmDetails from "./ConfirmDetails";
import ShoppingCart from "../../../common/components/ShoppingCart";
import CreditCard from "../../../common/components/CreditCard";
import Check from "../../../common/components/Check";
import Breadcrumb from "../../../common/components/Breadcrumb";
import { Button } from "../../../common/styles";
import tw, { styled } from "twin.macro";

const Wrapper = styled.section`
  ${tw`pt-88 px-6 mx-auto`}
  @media(min-width: 976px) {
    ${tw``}
  }
`;

const VLine = tw.div`
w-vLine h-35
self-center
bg-casual-gray 
`;

function Checkout(props) {
  const { orderStatus, getOrderStatus, crumbs } = props;
  const [step, setStep] = useState(1);

  return (
    <Wrapper>
      <Breadcrumb crumbs={crumbs} />
      <div tw="grid grid-cols-formSteps bg-secondary-gray">
        <Button
          disabled={orderStatus !== 'booked' ? false : true}
          onClick={() => setStep(1)}
          color={step === 1 ? "primary-blue" : "outline-free"}
          tw="grid grid-cols-2ColAuto justify-items-end items-center gap-5 text-xl font-light h-checkoutHeaderButtons border-0"
        >
          <ShoppingCart fillColor={step === 1 ? "#ffffff" : "#04246A"} 
                        width="30px" 
                        height="30px" 
                        alt="Shopping Cart"
          />
          <div tw="justify-self-start">Cart</div>
        </Button>
        <VLine />
        {/* <Button
          disabled={step >= 2 && orderStatus !== 'booked' ? false : true}
          onClick={() => setStep(2)}
          color={step === 2 ? "primary-blue" : "outline-free"}
          tw="grid grid-cols-2ColAuto justify-items-end items-center gap-5 text-xl font-light h-checkoutHeaderButtons border-0"
        >
          <CreditCard fillColor={step === 2 ? "#ffffff" : "#04246A"} width="30px" height="30px" alt="Credit Cart" />
          <div tw="justify-self-start">Payment Details</div>
        </Button>
        <VLine /> */}
        <Button
          disabled={step > 2 && orderStatus !== 'booked' ? false : true}
          color={step === 3 ? "primary-blue" : "outline-free"}
          tw="grid grid-cols-2ColAuto justify-items-end items-center gap-5 text-xl font-light h-checkoutHeaderButtons border-0"
        >
          <Check fillColor={step === 3 ? "#ffffff" : "#04246A"} width="30px" height="30px" alt="Confirmation check" />
          <div tw="justify-self-start">Confirmation</div>
        </Button>
        {/* <Breadcrumb items={items} /> */}
      </div>
      {step === 1 ? (
        <CartDetails {...props} toggleStep={(value) => { setStep(value) }} />
      ) : step === 2 ? (
        <PaymentDetails toggleStep={(value) => { setStep(value) }} />
      ) : (
        <ConfirmDetails toggleStep={(value) => { setStep(value) }} />
      )}
    </Wrapper>
  );
}


function mapStateToProps(state, props) {
  return {
    orderStatus: state.orderStatus
  }
}

const mapDispatchToProps = {
  getOrderStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
