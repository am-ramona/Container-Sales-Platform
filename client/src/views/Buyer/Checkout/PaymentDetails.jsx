import React, { useState } from "react";
import { BankIcon, Copy } from "../../../assets/icons";
import { paymentEndpoints } from "../../../common/constants/apiEndpoints";
import useQuery from "../../../common/hooks/api/useQuery";
import { Button, Card, Loader } from "../../../common/styles";
import tw from "twin.macro";

const Layout = tw.div`
flex md:flex-nowrap flex-wrap 
md:space-x-36 md:space-y-0 
space-x-0 space-y-4 
md:pl-10 md:py-6 
mt-6 lg:mt-0 mb-4
`;

const ImageWrapper = tw.div`
border-2 mt-4 flex 
justify-center p-10
`;

const StyledBankIcon = tw(BankIcon)`
md:h-auto h-32 w-32 
object-cover 
object-center
`;

const BillingDetailsWrapper = tw.div`
flex flex-col space-y-3 mt-4
`;

const BillingDetail = tw.div`
flex flex-row justify-start space-x-8
text-primary-blue relative max-w-max
`;

export default function PaymentDetails({ toggleStep }) {
  const [copySuccess, setCopySuccess] = useState('');
  const [billingDetailName, setBillingDetailsName] = useState('');
  const { data, isLoading, isError } = useQuery(
    `${paymentEndpoints.getPaymentInfo}/italy`
    // `https://csp-app-front.fpaas-dev.cld.cma-cgm.com/payments/getPaymentInfo/italy`
  );

  function copyToClipboard(e) {
    var elementToCopy = e.currentTarget.parentElement.getElementsByClassName("elementToCopy")[0]
    const internalData = elementToCopy.innerHTML;
    navigator.clipboard.writeText(internalData)
    setCopySuccess('Copied to Clipboard !')
    setBillingDetailsName(e.currentTarget.parentElement.getAttribute("name"))
  }

  return (
    <section tw="mt-40">
      {isLoading ? (
        <Loader format="smaller" />
      ) : isError ? (
        "An error occurred"
      ) : (
        <Card>
          <Layout>
            <div tw="md:w-1/4 w-full">
              <h2 tw="text-primary-blue text-2xl">Pay By Wire Transfer</h2>
              <ImageWrapper>
                <StyledBankIcon alt="bank" />
              </ImageWrapper>
            </div>

            <div tw="md:w-3/4 w-full">
              <h2 tw="text-primary-blue text-2xl mb-2">Billing Details</h2>
              <h1 tw="text-sm text-gray-500 tracking-widest">
                Please copy the below details to use in your wire transfer
                </h1>
              <BillingDetailsWrapper>
                <BillingDetail name="Name">
                  <span tw="text-17 font-normal w-88">Name</span>
                  <span className="elementToCopy" tw="m-0 text-17 font-light">CMA CGM</span>
                  <Copy className="copy" tw="ml-10 cursor-pointer" alt="Copy" onClick={copyToClipboard} />
                  {billingDetailName === `Name` && copySuccess !== '' &&
                    <span tw='absolute right-0 text-9 text-gray-500 animate-fadeinout -right-20 top-4'>{copySuccess}</span>
                  }
                </BillingDetail>
                <BillingDetail name="IBAN">
                  <span tw="text-17 font-normal w-88">IBAN</span>
                  <span className="elementToCopy" tw="m-0 text-17 font-light">{data.iban}</span>
                  <Copy className="copy" tw="ml-10 cursor-pointer" alt="Copy" onClick={copyToClipboard} />
                  {billingDetailName === `IBAN` && copySuccess !== '' &&
                    <span tw='absolute right-0 text-9 text-gray-500 animate-fadeinout -right-20 top-4'>{copySuccess}</span>
                  }
                </BillingDetail>
                <BillingDetail name="Bank">
                  <span tw="text-17 font-normal w-88">Bank</span>
                  <span className="elementToCopy" tw="m-0 text-17 font-light">{data.bankName}</span>
                  <Copy className="copy" tw="ml-10 cursor-pointer" alt="Copy" onClick={copyToClipboard} />
                  {billingDetailName === `Bank` && copySuccess !== '' &&
                    <span tw='absolute right-0 text-9 text-gray-500 animate-fadeinout -right-20 top-4'>{copySuccess}</span>
                  }
                </BillingDetail>
                <BillingDetail name="SWIFT">
                  <span tw="text-17 font-normal w-88">SWIFT</span>
                  <span className="elementToCopy" tw="m-0 text-17 font-light">{data.swift}</span>
                  <Copy className="copy" tw="ml-10 cursor-pointer" alt="Copy" onClick={copyToClipboard} />
                  {billingDetailName === `SWIFT` && copySuccess !== '' &&
                    <span tw='absolute right-0 text-9 text-gray-500 animate-fadeinout -right-20 top-4'>{copySuccess}</span>}
                </BillingDetail>
              </BillingDetailsWrapper>
            </div>
          </Layout>
          <hr tw="border-gray-200" />

          <p tw="mt-2 p-3 text-primary-blue">
            <span tw="text-primary-red"> Note: </span>You need to provide
              proof of payment within 2 working days after receiving the invoice{" "}
          </p>
          <div tw="flex justify-end mt-3">
            <Button
              onClick={() => {
                toggleStep(3);
              }}
              color="primary-blue"
              tw="px-10 py-2 w-194 h-45"
            >
              Proceed
              </Button>
          </div>
        </Card>
      )}
    </section>
  );
}
