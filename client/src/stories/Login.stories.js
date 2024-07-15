import React from 'react';
import Login from "../common/components/Auth/Login";

export default {
  title: 'Example/Login',
};

// let props = {
//   type : "success",
//   message : "this is a validation customized message",
//   autoClose : true,
//   // dismissTime : 10000
//   }

// export const LoginPopUp = () => <Login {...props} />;
export const LoginForm = () => <Login />;
