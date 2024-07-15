import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../styles";
import "twin.macro";

export default function Popup(props) {
  let history = useHistory();

  function handleClick1() {
    if (props.name === "confirm") {
      props.setStep(2);
    }
    if (props.name === "moveToAwaitingConfirmation") {
      props.accept(false);
    }
    if (props.name === "markUnavailable") {
      props.accept(false);
    }
    if (props.name === "proceed") {
      props.bookCart();
    }
    if (props.name === "saveAssignDepotsToAgent") {
      props.accept(true);
    }

    props.setShowModal(false);
  }

  function handleClick2(item) {
    // Here, we invoke the callback with the new value
    if (props.name === "delete") {
      props.onClick(item);
    }
    if (props.name === "confirm") {
      history.push("/product-list?page=1&signin=true");
    }
    if (props.name === "deleteContainersInStock") {
      props.accept(true);
    }
    if (props.name === "deleteAssignDepotsToAgentRow") {
      props.accept(true);
    }

    props.setShowModal(false);
  }

  return (
    <div tw="h-full grid pb-4 px-4">
      <div tw=" whitespace-normal text-left leading-6"> {props.message}</div>
      <div tw="grid grid-cols-2equal gap-x-md self-end pt-8">
        <Button
          color={props.buttonColor}
          tw="w-full rounded-none"
          onClick={() => handleClick1()}
        >
          {props.button1}
        </Button>
        <Button
          color={props.cancelColor ? props.cancelColor : "primary-red"}
          tw="w-full rounded-none"
          onClick={() => handleClick2(props.item)}
        >
          {props.button2}
        </Button>
      </div>
    </div>
  );
}
