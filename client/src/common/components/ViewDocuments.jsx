import React, { useState } from "react";
import { Button } from "../../common/styles";
import tw, { styled } from "twin.macro";

const Wrapper = tw.div`
md:(max-w-full mx-0) mx-auto max-w-85
`;

export default function UploadDocuments(props) {
    const [step, setStep] = useState(1);
    const [document, setDocument] = useState("Custom Clearance");
    console.log('UploadDocuments props', props)

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
            <section tw="max-w-400 mx-auto pt-45 text-left">
                <div style={{
                    color: '#599bff',
                    fontSize: 17,
                    fontWeight: 'normal',
                    paddingBottom: 37,
                    verticalAlign: 'top'
                }}>
                    {step === 1 ?
                        '1290_CustomsClearance.pdf' : '1290_PaymentProof.pdf'
                    }
                </div>
                <Button tw="w-full" color="primary-blue" onClick={() => props.setShowModal(false)} > Close</Button>
            </section>
        </Wrapper >
    );
}
