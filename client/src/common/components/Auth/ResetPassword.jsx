import React, { useState } from "react";
import cntl from "cntl";
import Logo from "../Logo/Logo";

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

function ResetPassword() {
  return (
    <div className={wrapperCN}>
      <div className="text-center flex flex-col">
        <Logo className="w-20 mx-auto mb-8" />
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
        <button className="btn btn-primary-blue" onClick={() => {}}>
          Reset Password
        </button>
        <p className="mt-3">
          <a className="text-primary-blue hover:underline" onClick={() => {}}>
            Go back
          </a>
        </p>
      </div>
    </div>
  );
}

export default ResetPassword;
