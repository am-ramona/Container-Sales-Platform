import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../../common/styles";
import "twin.macro";

export default function Popup(props) {

    let history = useHistory();  

    function handleClick2(item) {
        // Here, we invoke the callback with the new value
        if (props.name === 'delete') {  props.onClick(item); }
        if (props.name === 'confirm') { history.push("/product-list?page=1&signin=true"); }
        props.setShowModal(false);                               
    } 

    function handleClick1() {
        if (props.name === 'confirm') { props.setStep(2); }  
        props.setShowModal(false)
    }

    return (
        <div tw="h-full grid pb-4 px-4">
            <div> {props.message}</div>
            <div tw="grid grid-cols-2equal gap-x-md self-end pt-8">
                <Button color={props.buttonColor} tw="w-full rounded-none"
                        onClick={() => handleClick1()}> 
                            {props.button1}  
                </Button>
                <Button color="primary-red" 
                        onClick={() => handleClick2(props.item)}> 
                            {props.button2}
                </Button>
            </div>
        </div>
    )
}