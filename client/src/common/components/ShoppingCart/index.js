import { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import {
    connectUser,
    disconnectUser,
    getUserProfile,
    getOrderID,
    getOrderDetails,
    getOrderSum,
    getProductsList,
    updateOrderDetails
} from '../../../redux';
import Counter from "../Counter";
import currencies from "../../constants/currencies";
import { NavbarContext } from "../../../context/NavbarContext";
import { Button, Card, Loader } from "../../styles";
import { CloseMenuIcon } from "../../../assets/icons";
import tw, { styled, css } from "twin.macro";

/** w-305 */
const GoToCheckoutButton = tw(Button)`
border-0 w-305 h-41 text-sm self-end mb-1.5`;

/** 'fixed right-6' for fixed design **/
const ShoppingCard = tw(Card)`
grid grid-rows-cart gap-4
h-maxContent 
bg-white 
hover:bg-white`;
// = styled.input(({ hasBorder }) => [
//     `color: black;`,
//     hasBorder && tw`border-purple-500`,
//   ])

const noContentStyles = css`
    ${tw`grid-rows-1`}
  }
`

const ShoppingTable = tw.table`
w-full table-auto relative`;

const TableTh = tw.th`
text-primary-blue pb-1 text-base text-left`;

function ShoppingCart(props) {
    const { loggedInUser,
        orderId,
        productData,
        orderData,
        cartData,
        cartDataError,
        orderDataError,
        currentOrders = false
    } = props
    let history = useHistory();
    const value = useContext(NavbarContext);

    const handleClick = () => {
        if (productData) history.push("/productList/checkout");
        props.setIsCartOpen(false);
    };

    const closeShoppingCart = () => {
        props.setIsCartOpen(!value.iscartOpen);
    };

    useEffect(() => {
        if (loggedInUser && orderId) 
        props.getOrderDetails(orderId)
    }, [orderId]);

    useEffect(() => {
        if (loggedInUser) 
        props.getProductsList();
    }, []);

    useEffect(() => {
        if (loggedInUser) {
            const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
            props.getOrderSum(filterOrderQuery)
        }
    }, []);

    //   (orderData && productData && productData.products && orderData.map((order) => (
    //                         productData.products.map((product) => console.log('currencies[product.productCurrency]', currencies[product.productCurrency]) || (
    //                             order.productId === product.productId && 
    //                             <tr tw="text-15 h-14 text-primary-blue font-normal border-b border-gray-200 capitalize">
    //                                 <td tw="leading-extra-loose">
    //                                     <p tw="w-11/12 truncate">{order.quantity}x {product.productTypeDisplay}, {product.productSize}' {product.productTypeSizeDisplay}, {product.productCondition}<br />
    //                                         <span tw="text-13 text-light-gray tracking-wide">{order.productId === product.productId && `${product.productCity}, ${product.productCountry}`}</span>
    //                                     </p>
    //                                 </td>   
    //                                 <td tw="text-center">{currencies[product.productCurrency]} {order.price}</td>
    //                             </tr>
    //                         ))
    //                     ))
    //                     )

    useEffect(() => {
        if (orderData && productData && productData.products) {
            orderData.map((order) => (
                productData.products.map((product) => (
                    order.productId === product.productId &&
                    localStorage.setItem('currency', currencies[product.productCurrency])
                ))
            ))
        }
    }, [productData]);

    const items = { ...localStorage };
    // console.log("items in localstorage", items)
    return (
        <ShoppingCard css={[cartDataError && noContentStyles]}>
            <ShoppingTable cellSpacing="10" cellPadding="2">
                <thead>
                    <tr tw="border-b border-gray-200">
                        <TableTh colSpan="2">Shopping Cart</TableTh>
                        <TableTh></TableTh>
                        <th tw="cursor-pointer text-primary-blue">
                            <CloseMenuIcon width="13px" height="13px" onClick={closeShoppingCart} />
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cartDataError && <tr><td><span tw="text-14 pt-2 italic">Your shopping cart is empty</span></td></tr>}
                    {!orderData ? (
                        <div tw="min-h-loader" colSpan="2">
                            <Loader format="smaller" />
                        </div>
                    ) :
                        (orderData && cartDataError !== 'error' && productData && productData.products && orderData.map((order) => (
                            productData.products.map((product) => (
                                order.productId === product.productId &&
                                <tr tw="text-15 h-14 text-primary-blue font-normal border-b border-gray-200 capitalize">
                                    <td tw="leading-extra-loose">
                                        <p tw="w-11/12 truncate">{order.quantity} x {product.productTypeDisplay}, {product.productSize}' {product.productTypeSizeDisplay}, {product.productCondition}<br />
                                            <span tw="text-13 text-light-gray tracking-wide">{order.productId === product.productId && `${product.productCity}, ${product.productCountry}`}</span>
                                        </p>
                                    </td>
                                    {/* <td><Counter number={order.quantity} /></td> */}
                                    <td tw="text-center">{currencies[product.productCurrency]} {order.total}</td>
                                </tr>
                            ))
                        ))
                        )
                    }
                </tbody>

                {!cartData ? (
                    <div tw="min-h-loader" colSpan="2">
                        <Loader format="smaller" />
                    </div>
                ) :
                    // (props.orderData && props.productData &&
                    (cartDataError !== 'error' && cartData && cartData[0] &&
                        <tfoot>
                            <tr tw="text-13 text-primary-blue font-normal">
                                {/* <td></td> */}
                                <td tw="text-right pt-1.5">SubTotal <span tw="text-9">Excl. taxes</span></td>
                                <td tw="text-center pt-1.5">{localStorage.getItem('currency')} {cartData[0].amount}</td>
                            </tr>
                            <tr tw="text-15 text-primary-blue font-medium">
                                {/* <td></td> */}
                                <td tw="text-right pt-1.5">Total <span tw="text-9">Incl. taxes ({cartData && [(cartData[0].taxAmount / cartData[0].amount) * 100]}%)</span></td>

                                <td tw="text-center pt-1.5">{localStorage.getItem('currency')} {(cartData[0].amount + cartData[0].taxAmount)} </td>
                            </tr>
                        </tfoot>
                    )
                }
            </ShoppingTable>
            {!cartDataError &&
                <GoToCheckoutButton color="primary-blue"
                    onClick={handleClick} >
                    Go To Checkout
                </GoToCheckoutButton>
            }
        </ShoppingCard>
    )
}

function mapStateToProps(state) {
    return {
        count: state.count,
        loggedIn: state.loggedIn,
        loggedInUser: state.loggedInUser,
        loggedOut: state.loggedOut,
        orderId: state.orderId,
        orderCurrency: state.orderCurrency,
        orderData: state.orderData,
        orderDataError: state.orderDataError,
        cartData: state.cartData,
        cartDataError: state.cartDataError,
        productData: state.productData
    }
}

const mapDispatchToProps = {
    connectUser,
    disconnectUser,
    getUserProfile,
    getOrderID,
    getOrderDetails,
    getOrderSum,
    getProductsList,
    updateOrderDetails
}

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
