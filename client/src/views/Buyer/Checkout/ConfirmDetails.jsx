import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import { Button, Card } from "../../../common/styles";
import { connect } from 'react-redux';
import {
  connectUser,
  disconnectUser,
  getUserProfile,
  getOrderID,
  getOrderDetails,
  getOrderSum,
  getProductsList,
  updateOrderDetails,
  getOrderStatus
} from '../../../redux';
import { ConfirmationChecked, BackSpace } from "../../../assets/icons";
import axios from 'axios';
import tw from "twin.macro";

const CartTable = tw.table`
table-fixed min-w-full
mt-10 mb-4
`;

const CartTableTh = tw.th`
pb-1.5 text-left w-1/4
text-sm md:text-base 
whitespace-nowrap
`;

const CartTableTd = tw.td`
leading-8 text-primary-blue 
text-seemore whitespace-nowrap                    
`;

const ThankYouMessageTitle = tw.h1`
font-medium text-3xl
text-primary-blue pb-1.5
`;

const ThankYouDescription = tw.div`
text-primary-blue text-xl 
leading-normal pb-6
`;

function ConfirmDetails({ toggleStep, ...props }) {
  const { orderData, cartData, productData, orderId, getOrderStatus } = props;
  const [step, setStep] = useState(1);

  let history = useHistory();

  const handleClick = (link) => {
    getOrderStatus('cart')
    history.push(link);
  };

  const bookCart = () => {
    props.getOrderDetails(orderId)
      .then(response => {
        orderData.map((orderDetails) => {
          const filterQuery = {
            "productId": orderDetails['productId'],
            "minusQuantity": orderDetails['quantity'],
            "plusQuantity": 0
          }
          axios
            .put('/products', filterQuery)
            .then(
              () => {
                const filterBookingQuery = {
                  "bookingStatus": "None",
                  "customsClearanceMethod": "CMA CGM",
                  "documentStatus": "Not Uploaded",
                  "paymentStatus": "None",
                  "status": "booked"
                }
                axios.put('/orders/' + orderId, filterBookingQuery).then(
                  () => {
                    console.log('booking success !');
                    getOrderStatus('booked')
                    setStep(2);
                  }, (error) => {
                    console.log('Update Order booking error !', error);
                  }
                )
              },
              (error) => {
                console.log('booking error !', error)
              }
            );
        })
      })
  }

  // function goToThankyouMessage() {
  //   setStep(2);
  // }

  let confirmProps = {
    message: "confirm message after getting the Items updates from the stock",
    button1: "Proceed",
    button2: "Cancel Booking",
    buttonColor: "primary-blue"
  }

  return (
    <>
      {step === 1 ? (
        <section tw="w-668 h-512 mt-40 mx-auto max-w-full">
          <Card tw="pt-7 sm:px-11 pb-7">
            <h1 tw="text-lg font-medium text-primary-blue text-2xl"> Order Summary </h1>
            <CartTable>
              <thead>
                <tr tw="border-b border-gray-200">
                  <CartTableTh tw="text-primary-blue font-medium text-seemore text-left w-3/10">Description</CartTableTh>
                  <CartTableTh tw="text-primary-blue font-medium text-seemore text-center w-3/10">Quantity</CartTableTh>
                  <CartTableTh tw="text-primary-blue font-medium text-seemore text-center w-3/10">Price</CartTableTh>
                  <CartTableTh tw="text-lighter-blue font-medium text-seemore text-right cursor-pointer w-1/10" onClick={() => { toggleStep(1) }}>Edit</CartTableTh>
                </tr>
              </thead>
              <tbody>
                {orderData && orderData.map((order) => (
                  productData && productData.products.map((product, index) => (
                    order.productId === product.productId &&
                    <tr key={index}>
                      <CartTableTd tw='pt-1'>{product.productTypeDisplay}, {product.productSize}' {product.productTypeSizeDisplay}, {product.productCondition}</CartTableTd>
                      <CartTableTd tw="text-center"> {order.quantity} </CartTableTd>
                      <CartTableTd tw="text-center">{localStorage.getItem('currency')} {order.total} </CartTableTd>
                      <CartTableTd></CartTableTd>
                    </tr>
                  ))))}
                <tr tw="border-b border-gray-200">
                  <CartTableTd tw="font-medium w-3/10 pb-1.5">VAT</CartTableTd>
                  <CartTableTd tw="w-3/10"></CartTableTd>
                  <CartTableTd tw="text-center w-3/10">{localStorage.getItem('currency')} {cartData && cartData[0].taxAmount}</CartTableTd>
                  <CartTableTd></CartTableTd>
                </tr>
              </tbody>
              <tfoot tw="text-primary-blue ">
                <tr>
                  <td tw="w-3/10"></td>
                  <td tw="text-center w-3/10 font-medium pt-1.5 text-seemore">Total</td>
                  <td tw="text-center w-3/10 font-medium text-seemore">{localStorage.getItem('currency')} {cartData && cartData[0].amount + cartData[0].taxAmount}</td>
                </tr>
              </tfoot>
            </CartTable>

            <h1 tw="text-lg font-medium text-primary-blue text-2xl"> Billing Details </h1>

            <table tw="table-fixed min-w-full mb-40 mt-10">
              <thead tw="text-left border-b border-gray-200">
                <tr>
                  <th tw="text-primary-blue font-medium text-seemore pb-1.5 w-2/5">Payment Method</th>
                  <th tw="text-primary-blue font-medium text-seemore pb-1.5 w-2/5">Billing Details</th>
                  <th></th>
                </tr>
              </thead>
              <tbody tw="text-left">
                <tr tw="align-top">
                  <td tw="leading-5 text-gray-600 w-2/4 py-2 text-seemore">Wire Transfer</td>
                  <td tw="leading-5 text-gray-600 w-1/4 py-2 text-seemore">
                    To be provided to you in the invoice you will receive via email in the next few days
                </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <div tw="flex space-x-5">
              <Modal className="modal" width="450px"
                height="auto"
                titleFontSize="24px"
                component={
                  <Button color="primary-blue"
                    tw="w-full p-0 h-45 text-sm"
                  > Confirm Order </Button>
                }
                title="In Stock Update"
                children={<Popup name="proceed" setStep={setStep} bookCart={bookCart} {...confirmProps} />}
              />
              <Button color="outline-blue"
                tw="w-full rounded-none p-0 h-45 text-sm"
                onClick={() => { handleClick("/productList?page=1") }}
              >
                Cancel
              </Button>
            </div>
          </Card>
        </section>
      ) : (
          <section tw="mt-40 mx-auto max-w-full">
            <Card tw="grid grid-rows-confirmation justify-items-center items-start gap-y-7 text-center pt-10 sm:pl-lg sm:pr-lg pb-7">
              <ThankYouMessageTitle>Thank you for your Order!</ThankYouMessageTitle>
              <ConfirmationChecked tw="w-92 h-92" alt="Checked" />
              <ThankYouDescription>
                An agent will get in contact soon to provide you with the invoice by email. <br />
              Please note that you need to neutralize the container by repainting and removing any CMA CGM branding.
            </ThankYouDescription>
              <div tw="max-w-full p-0 h-45 grid justify-items-center items-center grid-cols-2ColAuto gap-x-5">
                <Button
                  color="primary-blue"
                  tw="w-56 max-w-full p-0 h-45 text-sm grid justify-items-center items-center grid-cols-2ColAuto gap-x-1.5"
                  onClick={() => { handleClick("/productList?page=1") }}>
                  <BackSpace tw="justify-self-end" />
                  <span tw="justify-self-start"> Back to Shopping</span>
                </Button>
                <Button
                  color="primary-blue"
                  tw="w-56 max-w-full p-0 h-45 text-sm grid justify-items-center items-center grid-cols-2ColAuto gap-x-1.5"
                  onClick={() => { handleClick("/currentorders") }}>
                  <span tw="justify-self-end"> View Orders</span>
                  <BackSpace tw="justify-self-start transform rotate-180" />
                </Button>
              </div>
            </Card>
          </section>
      )
      }
    </>
  );
}

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
    orderStatus: state.orderStatus
  }
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
  getOrderStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmDetails);
