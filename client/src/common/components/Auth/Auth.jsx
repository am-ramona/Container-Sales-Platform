import React, { useState } from "react";
import cntl from "cntl";
import { BankIcon } from "../../../assets/icons";
import Logo from "../Logo";

const defined_status = {
  LOGIN: "LOGIN",
  FORGOT_PASSWORD: "FORGOT_PASSWORD",
  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_MESSAGE: "RESET_PASSWORD_MESSAGE",
};

/** Styles **/

const wrapperCN = cntl`
 sm:w-96  p-10 mx-auto bg-white rounded shadow
`;

const titleCN = cntl`
mb-4 text-xl text-primary-gray
`;

const labelCN = cntl`
block mt-4 text-sm
`;

function Auth() {
  const [status, setStatus] = useState(defined_status.LOGIN);
  return (
    <div className={wrapperCN}>
      <div className="text-center flex flex-col">
        {/* <Logo className="w-20 mx-auto mb-8" /> */}
        {status === defined_status.LOGIN ? (
          <>
            {/* <h1 className={titleCN}>Login</h1> */}
            <label className={labelCN}>
              <div className="relative">
                <input className="input" type="email" placeholder="Email" />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  <BankIcon width={32} height={32} />
                </div>
              </div>
            </label>
            <label className={labelCN}>
              <div className="relative">
                <input
                  className="input"
                  type="password"
                  placeholder="Jane Doe"
                />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </label>
            <label className="flex items-center text-gray-200 mt-5 mb-5">
              <input type="checkbox" className="checkbox" />
              <span className="ml-2"> Remember me</span>
            </label>
            <button className="btn btn-primary-blue">Log in</button>
            <p className="mt-3">
              <a
                href="/"
                className="text-primary-blue hover:underline"
                onClick={() => {
                  setStatus(defined_status.FORGOT_PASSWORD);
                }}
              >
                Forgot your password?
              </a>
            </p>
          </>
        ) : status === defined_status.FORGOT_PASSWORD ? (
          <>
            <h1 className={titleCN}>Reset Password</h1>
            <p>
              {" "}
              Please enter the email you registered with so we can send you a
              password reset link{" "}
            </p>
            <label className={labelCN}>
              <div className="relative">
                <input className="input" type="email" placeholder="Email" />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </label>
            <button
              className="btn btn-primary-blue mt-3"
              onClick={() => {
                setStatus(defined_status.RESET_PASSWORD_MESSAGE);
              }}
            >
              Reset Password
            </button>
            <p className="mt-3">
              <a
                href="/"
                className="text-primary-blue hover:underline"
                onClick={() => {
                  setStatus(defined_status.LOGIN);
                }}
              >
                Go back
              </a>
            </p>
          </>
        ) : status === defined_status.RESET_PASSWORD ? (
          <>
            <h1 className={titleCN}>Reset Password</h1>
            <p>
              {" "}
              Please enter the email you registered with so we can send you a
              password reset link{" "}
            </p>
            <label className={labelCN}>
              <div className="relative">
                <input className="input" type="email" placeholder="Email" />
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 pointer-events-none">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </label>
            <button
              className="btn btn-primary-blue"
              onClick={() => {
                setStatus(defined_status.RESET_PASSWORD_MESSAGE);
              }}
            >
              Reset Password
            </button>
            <p className="mt-3">
              <a
                href="/"
                className="text-primary-blue hover:underline"
                onClick={() => {
                  setStatus(defined_status.LOGIN);
                }}
              >
                Go back
              </a>
            </p>
          </>
        ) : status === defined_status.RESET_PASSWORD_MESSAGE ? (
          <>
            <h1 className={titleCN}>Reset Password</h1>
            <p> An email has been sent to reset password. </p>
            <p className="mt-3">
              <a
                href="/"
                className="text-primary-blue hover:underline"
                onClick={() => {
                  setStatus(defined_status.LOGIN);
                }}
              >
                Go back
              </a>
            </p>{" "}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Auth;
