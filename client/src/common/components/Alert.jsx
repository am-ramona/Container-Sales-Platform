import React, { useState, useEffect } from "react";
import alertInfos from "../constants/alertInfos";
import PropTypes from "prop-types";
import tw, { styled } from "twin.macro";

const NotificationWrapper = styled.div`
  ${tw`w-365 h-50 fixed z-40 inset-x-0 m-auto top-65`}
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

const NotificationIcon = styled.img`
   {
    grid-area: a;
  }
`;

const NotificationTitle = styled.p`
  ${tw`font-bold text-base text-center`};
  & {
    grid-area: b;
  }
`;

const DismissButton = styled.button`
  ${tw`font-bold text-base`};
  & {
    grid-area: c;
  }
`;

const Alert = (props) => {
  const {
    type,
    message,
    autoClose,
    dismissTime = 5000,
    width,
    height,
    font,
    iconWidth,
    iconHeight,
    paddingTop,
    paddingBottom,
    closeIconFontSize,
    setSameCountryAlert,
    setAlert,
    // setAlertConfirm = false
  } = props;
  console.log('Alert props', props)
  const [show, setShow] = useState(true);

  const deleteAlert = () => {
    setShow(false);
    if (setAlert.setAlertConfirm) setAlert.setAlertConfirm(false); else setAlert(false);
    // if (setAlertConfirm) setAlertConfirm(false)
    if (setSameCountryAlert) setSameCountryAlert(false)
  };

    useEffect(() => {
    const interval = setInterval(() => {
      if (autoClose) {
        deleteAlert();
      }
    }, dismissTime);

    return () => {
      clearInterval(interval);
    };
  }, [autoClose, dismissTime, deleteAlert]);

  return (
    <>
      {show && (
        <NotificationWrapper
          style={{ width: width ? width : 365, height: height ? height : 50 }}
        >
          {alertInfos.map((alertInfo, i) =>
            alertInfo["type"] === type ? (
              <Notification
                key={i}
                style={{
                  backgroundColor: alertInfo.backgroundColor,
                  paddingTop: paddingTop ? paddingTop : "1.75rem",
                  paddingBottom: paddingBottom ? paddingBottom : "1.75rem",
                }}
              >
                <NotificationIcon
                  src={alertInfo.icon}
                  style={{
                    width: iconWidth ? iconWidth : "auto",
                    height: iconHeight ? iconHeight : "auto",
                  }}
                  alt={alertInfo.label}
                />
                <NotificationTitle
                  style={{
                    color: alertInfo.color,
                    fontSize: font ? font : "1rem",
                  }}
                >
                  {message ? message : alertInfo.label}
                </NotificationTitle>
                <DismissButton
                  style={{
                    color: alertInfo.color,
                    fontSize: closeIconFontSize ? closeIconFontSize : "1rem",
                  }}
                  onClick={() => deleteAlert()}
                >
                  X
                </DismissButton>
              </Notification>
            ) : null
          )}
        </NotificationWrapper>
      )}
    </>
  );
};

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string,
  autoClose: PropTypes.bool,
  dismissTime: PropTypes.number,
};

export default Alert;
