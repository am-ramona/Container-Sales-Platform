import React, { useEffect, useState, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
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
} from '../../redux';
import Breadcrumb from "../../common/components/Breadcrumb";
import FilterBox from "../../common/components/FilterBox";
import MultiSelect from "../../common/components/MultiSelect";
// import ShoppingCart from "../../common/components/ShoppingCart/index";
import { ContainerCard } from "../../common/components/Card";
import Paginate from "../../common/components/Paginate";
import Loader from "../../common/styles/Loader";
import useQuery from "../../common/hooks/api/useQuery";
import useQueryBuilder from "../../common/hooks/useQueryBuilder";
import { NavbarContext } from "../../context/NavbarContext";
import countriesData from "../../common/constants/countries";
// import citiesData from "../../common/constants/cities";
import containersData from "../../common/constants/containers";
import { containerEndpoints, orderEndpoints } from "../../common/constants/apiEndpoints";
import { PRODUCTS_PAGE_SIZE } from "../../common/constants/settings";
import tw from "twin.macro";

/** Styles **/
const Wrapper = tw.section`
mt-16 p-6 
mx-auto max-w-full`;

const FilterBoxWrapper = tw.div``;

const ProductListLayout = tw.div`
grid md:grid-cols-productListLayout xl:space-x-12 lg:space-x-4`;

const ProductListing = tw.div`
mt-9 md:mt-0
flex flex-col`;

const MultiSelectWrapper = tw.div`
grid grid-cols-multiSelect gap-x-4 mb-10`;

const ContainercardWrapper = tw.div`
flex flex-col space-y-6 relative h-full`;

const Label = tw.label`
text-15 text-primary-blue font-medium`;

const PaginationWrapper = tw.div`
flex justify-end mt-5`;

const Error = tw.div`
text-xs text-primary-gray font-light italic`;

const sections = [
  {
    title: "productType",
    label: "Type",
    options: containersData["type"]
  },
  {
    title: "productCondition",
    label: "Condition",
    options: containersData["condition"]
  },
  {
    title: "productSize",
    label: "Size",
    options: containersData["size"]
  },
];

const items = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "Products",
  },
];

function ProductList(props) {
  const { loggedInUser, 
          cartData, 
          cartDataError, 
          orderData, 
          orderId,
          crumbs
        } = props;
  const history = useHistory();
  const location = useLocation();
  const { isCartOpen } = useContext(NavbarContext);
  const search = new URLSearchParams(location.search);

  const [filters, setFilters] = useState({});
  const [sameCountryAlert, setSameCountryAlert] = useState(false);

  const [countries, setCountries] = useState(
    search.getAll("productCountry").map((item) => {
      return { label: item, value: item };
    }) || []
  );
  const [activePage, setActivePage] = useState(Number(search.get("page")) || 1);
  const [totalItemsCount, setTotalItemsCount] = useState(100);

  const [cities, setCities] = useState(
    search.getAll("productCity").map((item) => {
      return { label: item, value: item };
    }) || []
  );

  const { filterQuery } = useQueryBuilder({
    "minQuantity": 1,
    "productCity": cities.map(city => city.value),
    "productCountry": countries.map(country => country.value),
    "page": activePage,
    ...filters,
  });

  const { data, isLoading, isError } = useQuery(
    `${containerEndpoints.products}?${filterQuery}`
  );

  // const { filterOrderQuery } = useQueryBuilder({
  //   // "customerUid": 'S02547862',
  //   "customerUid" : loggedInUser && loggedInUser.uid,
  //   "status": 'cart',
  //   ...filters,
  // });

  //   const {
  //     data: cartData,
  //     isError: cartError,
  //     isLoading: cartLoading,
  // } = useQuery(`/orders/list?customerUid=01168982&status=cart`);

  // const {
  //     data: cartdata,
  //     isError: cartError,
  //     isLoading: cartLoading,
  //   } = useQuery(`${orderEndpoints.cart}?${filterOrderQuery}`)

  // const { data, isLoading, isError } = useQuery(
  //   `${/orders/list}?${filterOrderQuery}`
  // );  
  // props.getOrderSum(filterOrderQuery)

  // useEffect(() => {
  //   // if (props.cartData && props.cartData.status !== 'closed') {
  //   if (loggedInUser) {
  //     const filterOrderQuery = `customerUid=` + loggedInUser.uid + `&status=cart`
  //     // props.getOrderSum(filterOrderQuery)
  //   }
  // }, [loggedInUser]);

  // useEffect(() => {
  //   // console.log('ProductList: useEffect outside if cartData', cartData)
  //   if (cartDataError === '' && cartData && cartData.length > 0 && cartData[0].status === 'cart') {
  //     // console.log('ProductList: useEffect cartData', cartData)
  //     // console.log('cartData[0].orderId', cartData[0].orderId)
  //     // props.getOrderDetails(props.orderId === null ? localStorage.getItem('order_ID') : props.orderId)
  //     // props.getOrderDetails(cartData[0].orderId)
  //     // props.getOrderDetails(orderId)
  //   }
  // }, [loggedInUser, cartData]);

  useEffect(() => {
    history.replace("/productList?" + filterQuery);
  }, [filterQuery]);

  useEffect(() => {
    if (data) {
      setTotalItemsCount(data.length);
    }
  }, [data, setTotalItemsCount]);

  // console.log('ProductList: cartData', cartData)
  // console.log('ProductList: orderData', orderData)
  // console.log('ProductList: cartDataError', cartDataError)
  // console.log('ProductList: loggedInUser', loggedInUser)
  // console.log('productList crumbs', crumbs)
  // console.log('productList sameCountryAlert', sameCountryAlert)
  
  return (
    <Wrapper>
      <Breadcrumb crumbs={crumbs} />
      <ProductListLayout>
        <FilterBoxWrapper>
          <FilterBox
            initialFilters={{
              productSize: search.getAll("productSize"),
              productCondition: search.getAll("productCondition"),
              productType: search.getAll("productType"),
            }}
            sections={sections}
            title="Filter By"
            getFilters={setFilters}
          />
        </FilterBoxWrapper>
        <ProductListing>
          <MultiSelectWrapper>
            <div>
              <Label> Choose Country </Label>
              <MultiSelect
                tw="mt-1"
                className="multi-select"
                options={countriesData}
                value={countries}
                onChange={setCountries}
                labelledBy={"Select"}
              />
            </div>
            {/* <div>
              <Label> Choose City </Label>
              <MultiSelect
                tw="mt-1"
                className="multi-select"
                options={citiesData}
                value={cities}
                onChange={setCities}
                labelledBy={"Select"}
              />
            </div> */}
          </MultiSelectWrapper>
          <ContainercardWrapper>
            {isLoading ? (
              <Loader format="smaller" />
            ) : isError ? (
              <Error> { isError.message } </Error>
            ) : (
              data.products.map((product) => (
                <ContainerCard
                  key={product.productId}
                  productId={product.productId}
                  productSize={product.productSize}
                  productCity={product.productCity}
                  productType={product.productTypeDisplay}
                  productCondition={product.productCondition}
                  productCountry={product.productCountry}
                  productPrice={product.productPrice}
                  productCurrency={product.productCurrency}
                  inStock={product.inStock}
                  sameCountryAlert={sameCountryAlert}
                  setSameCountryAlert={setSameCountryAlert}
                />
              ))
            )}
          </ContainercardWrapper>
          <PaginationWrapper>
            {data && <Paginate
              innerClass="pagination"
              activePage={activePage}
              itemsCountPerPage={PRODUCTS_PAGE_SIZE}
              totalItemsCount={totalItemsCount}
              pageRangeDisplayed={5}
              onChange={setActivePage}
            />
            }
          </PaginationWrapper>
        </ProductListing>
      </ProductListLayout>
    </Wrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderId: state.orderId,
    orderData: state.orderData,
    cartData: state.cartData,
    orderDataError: state.orderDataError,
    cartDataError: state.cartDataError
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);