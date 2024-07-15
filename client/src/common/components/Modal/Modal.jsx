import React, { useState, useRef } from "react";
import { CloseMenuIcon } from "../../../assets/icons";
import PropTypes from "prop-types";
import useOutsideAlerter from "../../hooks/useOutsideAlerter";
import tw, { styled } from "twin.macro";

// pt-2 removed from Modaltrigger, check home buyer Upload Document modal
const ModalTrigger = tw.div`
focus:outline-none cursor-pointer 
text-xs text-secondary-blue
w-full`;

const WrapperCN = tw.div`
justify-center items-center 
flex overflow-x-hidden overflow-y-auto 
fixed inset-0 z-modal outline-none 
focus:outline-none w-auto mx-0
shadow-md 
p-5 
`;

const ModalCN = tw.div`
relative w-auto max-w-3xl
mx-0 
`;

const BackdropCN = styled.div`
  ${tw`opacity-50 fixed inset-0 
z-modal-backdrop bg-black
`};
  & {
    margin-left: 0 !important;
  }
`;

const Notification = styled.div`
  ${tw`h-full grid
    content-center items-center
    grid-cols-alert grid-rows-1
    gap-x-2.5
    transition duration-300 ease
    cursor-pointer overflow-hidden
    py-7 px-15 opacity-90 shadow-alert
    hover:shadow-alertHover hover:opacity-100
    `};
  & {
    grid-template-areas: "a b c";
  }
`;

const CloseWrapperCN = tw.div`
relative flex flex-col w-full
`;

const CloseBtnCN = tw.button`
self-start`;

const CloseCN = tw.span`
`;

const HeaderWrapperCN = tw.div`
grid grid-cols-modal justify-center
items-center p-4
`;
// grid grid-cols-modalHeader items-center justify-items-end
const HeaderTitleCN = tw.h3`
text-xl font-semibold
font-medium text-primary-blue
`;

const ContentWrapperCN = tw.div`
max-w-halfFull md:max-w-full m-auto
border-0 rounded-none shadow-lg 
relative flex flex-col 
text-center text-primary-blue
w-full bg-white outline-none 
focus:outline-none
`;

export default function Modal({
  component,
  title,
  titleColor,
  children,
  width,
  height,
  paddingBottom,
  padding,
  titleFontSize,
  inline = false,
  grid = false,
  ...props
}) {
  const [showModal, setShowModal] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => {
    setShowModal(false);
  });

  console.log("modal productData", props.productData);
  console.log("modal props", props);

  const childrenWithProps = React.Children.map(children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { setShowModal: setShowModal });
    }
    return child;
  });

  return (
    <>
      <ModalTrigger
        style={{ display: inline ? "inline" : grid ? "grid" : "inherit" }}
        onClick={() => setShowModal(true)}
      >
        {component}
      </ModalTrigger>
      {showModal ? (
        <>
          <WrapperCN>
            <ModalCN ref={wrapperRef}>
              <ContentWrapperCN
                style={{
                  width: width ? width : "auto",
                  height: height ? height : "auto",
                  paddingBottom: paddingBottom ? paddingBottom : "inherit",
                  paddingLeft: padding ? padding : 0,
                  paddingRight: padding ? padding : 0,
                }}
              >
                <HeaderWrapperCN>
                  {title && (
                    <HeaderTitleCN
                      style={{
                        fontSize: titleFontSize ? titleFontSize : 20,
                        color: titleColor ? titleColor : "#04246A",
                      }}
                    >
                      {title}
                    </HeaderTitleCN>
                  )}
                  <CloseBtnCN onClick={() => setShowModal(false)}>
                    <CloseCN data-testid="close">
                      <CloseMenuIcon tw="w-4" />
                    </CloseCN>
                  </CloseBtnCN>
                </HeaderWrapperCN>
                {childrenWithProps}
              </ContentWrapperCN>
            </ModalCN>
          </WrapperCN>
          <BackdropCN></BackdropCN>
        </>
      ) : null}
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  component: PropTypes.node.isRequired,
};
