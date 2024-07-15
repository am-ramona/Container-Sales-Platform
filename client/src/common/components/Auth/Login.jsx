import React, { useState } from "react";
import { Button, Checkbox } from "../../styles";
import Email from "../../../assets/icons/Email.svg";
import Key from "../../../assets/icons/Key.svg";
import cntl from "cntl";
import tw from "twin.macro";

/** Styles **/

const wrapperCN = cntl`
 sm:w-96  p-10 mx-auto bg-white rounded shadow
`;

const Input = tw.input`
w-291 text-left text-17 
mb-5 text-primary-blue 
border-primary-blue bg-no-repeat
block
`;

const RememberMeWrapper = tw.div`
w-291 m-auto text-left
flex items-center text-gray-200 mt-4
`;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className={wrapperCN}>
      <form>
        <Input style={{ backgroundImage: 'url("' + Email + '")', 
                        backgroundPosition: 'right 15px top 50%',
                        margin: '0 auto 1.25rem' 
                      }} type="email" placeholder="Email" />
        <Input tw="mb-6" style={{ backgroundImage: 'url("' + Key + '")', 
                                  backgroundPosition: 'right 14px top 50%',
                                  margin: '0 auto 1.25rem'
                                }} type="password" placeholder="Password" />
        <RememberMeWrapper tw="w-291 m-auto text-left">
          <Checkbox type="checkbox" className="checkbox" />
          <span className="ml-2 mt-6" tw="text-sm text-primary-blue ml-3 normal-case"> Remember me</span>
        </RememberMeWrapper>
        <Button color="primary-blue" tw="w-291 mt-3.5 p-2 text-17 hover:( bg-secondary-blue border-secondary-blue text-white )" > Sign in </Button>
        <p tw="font-light text-xs text-primary-blue mt-3.5 normal-case"> Please sign in using your eCommerce credentials </p>
      </form>
    </div>
  );
}

export default Login;
