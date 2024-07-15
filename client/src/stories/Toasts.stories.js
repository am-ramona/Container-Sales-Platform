import React from 'react';
// import Toast from "../common/components/Toast/Toast";
import Alert from "../common/components/Alert.jsx";

export default {
  title: 'Example/Alerts',
};

let props = {
  type : "success",
  message : "this is a validation customized message",
  autoClose : true,
  // dismissTime : 10000
  }

export const SuccessToast = () => <Alert {...props} />;
export const InfoToast = () => <Alert type='info'/>;
export const DangerToast = () => <Alert type='danger'/>;
export const WarningToast = () => <Alert type='warning'/>;
export const ErrorToast = () => <Alert type='error'/>;
export const ToDoToast = () => <Alert type='todo'/>;

export const Alertt = () => <Alert {...props} />;