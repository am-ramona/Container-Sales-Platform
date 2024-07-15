import React, { useState } from 'react';
import tw from "twin.macro";
import "./styles.css";

const CounterWrapper = tw.div`
grid grid-cols-counter
`;

const CounterButton = tw.button`
w-18 h-18 
border rounded-xl
relative
before:absolute inset-0
focus:outline-none
`;

const Number = tw.span`
text-primary-blue text-base
`;

function Counter(props) {
  const [clicks, setClicks] = useState(props.number ? props.number : 0);

  const IncrementItem = () => {
    setClicks(clicks + 1)
  }
  const DecreaseItem = () => {
    clicks > 0 && setClicks(clicks - 1)
  }

  return (
    <CounterWrapper className="counterWrapper">
      <CounterButton className="circle minus" onClick={() => DecreaseItem()}></CounterButton>
      <span> {clicks} </span>
      <CounterButton className="circle plus" onClick={() => IncrementItem()}></CounterButton>
    </CounterWrapper>
  );
}

export default Counter;
