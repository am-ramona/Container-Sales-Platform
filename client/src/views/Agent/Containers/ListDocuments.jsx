import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { PaperIcon, BackSpace } from "../../../assets/icons";
import { Checkbox, Card, Button, Text } from "../../../common/styles";
import tw from "twin.macro";

const ThankYouDescription = tw.div`
text-gray-2 text-17 
leading-normal pb-6
`;

const Payment = tw.div`justify-self-start pb-50`;
const CustomsClearance = tw.div`justify-self-start`;
const Title = tw.div`font-medium text-xl text-primary-blue pb-17`;
const DocumentName = tw.div`text-17 text-lighter-blue pb-25`;
const Actions = tw.div``;
const ValidateButton = tw.button`w-151 h-35 text-13 text-casual-green border mr-2.5`;
const AskForReUploadButton = tw.button`w-151 h-35 text-13 text-primary-red border`;

const ListDocuments = () => {
  const history = useHistory();
  const [isChecked, setIsChecked] = useState({
    "CMAU - 782190": false,
    "CMAU - 633781": false,
    "CMAU - 374654": false,
    "CMAU - 951379": false,
    "CMAU - 375654": false,
    "CMAU - 955379": false,
  });

  const [checkedCount, setCheckedCount] = useState(0);

  const handleChecked = ({ target: { name, checked } }) => {
    setIsChecked({
      ...isChecked,
      [name]: checked,
    });
  };

  const handleClick = () => {
    // getOrderStatus('cart')
    history.push("/agent/containers/booking-list");
  };

  useEffect(() => {
    // console.log("ListDocuments isChecked", isChecked)
    var count = Object.keys(isChecked).filter(function (key) {
      return isChecked[key] === true;
    }).length;
    // console.log('count', count)
    setCheckedCount(count);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChecked]);

  var noDocumentsUploaded = (
    <>
      <PaperIcon tw="w-xxl h-xxl text-gray-2" alt="Empty Document" />
      <ThankYouDescription>
        There are no documents uploaded by User Name for <br /> this booking
      </ThankYouDescription>
      <Button
        color="primary-blue"
        tw="w-56 max-w-full p-0 h-45 text-sm grid justify-items-center items-center grid-cols-2ColAuto gap-x-1.5"
      >
        <BackSpace tw="justify-self-end" />
        <div
          tw="justify-self-start"
          onClick={() => {
            handleClick();
          }}
        >
          {" "}
          Back to Bookings Page{" "}
        </div>
      </Button>
    </>
  );

  return (
    <section tw="mt-40 mx-auto max-w-full grid grid-rows-confirmation justify-items-center items-start gap-y-7 text-left pt-10 sm:pl-lg sm:pr-lg pb-7">
      {/* { noDocumentsUploaded } */}
      <Payment>
        <Title>Documents</Title>
        <DocumentName>6395_Client432_receipt.pdf</DocumentName>
        <Actions>
          <ValidateButton>Validate Payment</ValidateButton>
          <AskForReUploadButton>Ask for a reupload</AskForReUploadButton>
        </Actions>
      </Payment>
      <CustomsClearance>
        <Title>Customs Clearance</Title>
        <DocumentName>6395_Client432_clearance.pdf</DocumentName>
        <Actions>
          <ValidateButton>Validate Document</ValidateButton>
          <AskForReUploadButton>Ask for a reupload</AskForReUploadButton>
        </Actions>
      </CustomsClearance>
    </section>
  );
};

export default ListDocuments;
