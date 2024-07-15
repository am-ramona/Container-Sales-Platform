import { useHistory } from "react-router-dom";
import { Button } from "../../styles";
import PropTypes from "prop-types";
import { CloseMenuIcon } from "../../../assets/icons";
import { Card } from "../../styles";
import tw from "twin.macro";

export default function ShoppingCard() {
let history = useHistory();

const handleClick = () => {
   history.push("/checkout");
};

return(
<div tw="grid grid-rows-2 p-2.5 overflow-x-auto w-full h-308 bg-white hover:bg-white">
<table cellSpacing="10" cellPadding="2" tw="w-full table-auto">
    <thead>
        <tr tw="border-b">
            <th tw="text-primary-blue pb-1 text-base" colSpan="2">Shopping Cart</th>
            <th></th>
            <th tw="cursor-pointer text-primary-blue">
                <CloseMenuIcon width="13px" height="13px" />
            </th>
        </tr>
    </thead>
    <tbody>
        <tr tw="text-15 h-14 text-primary-blue font-normal py-10 border-b">
            <td tw="leading-extra-loose">
                <p tw="w-11/12 truncate">2x Dry, 20' ST, Reuse<br />
                    <span tw="text-13 text-light-gray tracking-wide">Milan, Italy</span>
                </p>
            </td>
            <td tw="text-center">$1,800</td>
        </tr>
        <tr tw="text-15 h-14 text-primary-blue font-normal py-10 border-b">
            <td tw="truncate leading-extra-loose">
                <p tw="w-11/12 truncate">1x Reefer, 40' HC, Recycle<br />
                    <span tw="text-13 text-light-gray tracking-wide">Milan, Italy</span>
                </p>
            </td>
            <td tw="text-center">$1,100</td>
        </tr>
    </tbody>
    <tfoot>
        <tr tw="text-13 text-primary-blue font-normal">
            <td></td>
            <td tw="text-right pt-1.5">SubTotal</td>
            <td tw="text-center pt-1.5">$2,900</td>
        </tr>
        <tr tw="text-15 text-primary-blue font-medium">
            <td></td>
            <td tw="text-right pt-1.5">Total</td>
            <td tw="text-center pt-1.5">$3,190</td>
        </tr>
    </tfoot>
</table>
<Button color="primary-blue" tw="border-0 w-269 h-41 text-sm self-end mb-1.5"
    onClick={() => { handleClick() }} >Go To Checkout</Button>
</div>
    )
 }