import React, { useState } from "react";
import Dropzone from "../../common/components/DragAndDrop/DropZone/DropZone";
import { Button } from "../../common/styles";
import tw, { styled } from "twin.macro";

const Wrapper = styled.div`
  ${tw`md:max-w-full mx-auto max-w-85`}
  @media(min-width: 976px) {
    ${tw`container`}
  }
`;

export default function UploadDocuments({ name, bookingOrder = null }) {
  const [step, setStep] = useState(1);
  const [document, setDocument] = useState("Custom Clearance");

  console.log('booookingOrder', bookingOrder)

  return (
    <Wrapper>
      <section tw='grid grid-cols-2FullCols max-w-400 m-auto'>
        <Button tw="text-xs md:text-xl font-normal"
          onClick={() => setStep(1)}
          color={step === 1 ? "neutral-blue" : "neutral"}
        >
          <span>Custom Clearance</span>
        </Button>
        <Button tw="text-xs md:text-xl font-normal"
          onClick={() => { setStep(2); setDocument("Payment Proof") }}
          color={step === 2 ? "neutral-blue" : "neutral"}
        >
          <span>Payment Proof</span>
        </Button>
      </section>
      <section tw="max-w-400 mx-auto pt-5">
        {step === 1 ?
          <Dropzone name={name} document={document} bookingOrder={bookingOrder} />
          :
          <Dropzone name={name} document={document} bookingOrder={bookingOrder} key={1} />
        }
      </section>
    </Wrapper>
  );
}
