import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route, useHistory, Link } from "react-router-dom";

import Navbar from "./common/components/Topbar";
import { SidebarProvider } from "./context/SidebarContext";
import { NavbarProvider } from "./context/NavbarContext";
import { CustomClearanceProvider } from "./context/CustomClearanceContext";
import AgentLayout from './views/Agent';
import AdminLayout from './views/Admin';
import routes from "./routes";

const Home = lazy(() => import(/* webpackPrefetch: true */ './views/Buyer/Home'));
const BuyerHome = lazy(() => import(/* webpackPrefetch: true */ './views/Buyer/Home/Home'));
const ProductList = lazy(() => import(/* webpackPrefetch: true */ './views/Buyer/ProductList'));
const Checkout = lazy(() => import(/* webpackPrefetch: true */ './views/Buyer/Checkout'));
// const AgentLayout = lazy(() => import(/* webpackPrefetch: true */ './views/Agent'));
// const AdminLayout = lazy(() => import(/* webpackPrefetch: true */ './views/Admin'));
const Breadcrumb = lazy(() => import(/* webpackPrefetch: true */ './common/components/Breadcrumb'));
// import MyErrorBoundary from './MyErrorBoundary';

// const AppRoute = ({ component: Component }) => (
//   <Route render={props => (
//       <Navbar>
//        <Component {...props} />
//       </Navbar>
//   )} />
// )

function WithNavbar() {
  return (
    <div> Page not found </div>
  )
}

function App() {
  let history = useHistory();

  // const queryString = window.location.search;
  // const urlParams = new URLSearchParams(queryString);
  // const signin = urlParams.get('signin')

  // if (signin !== null)
  //   var SignedIn = (signin === 'true');
  // else SignedIn = 'false'

  const items = [
    { to: '/', label: 'Home' },
    { to: '/currentOrders', label: 'Current Orders' },
    { to: '/productList', label: 'Products' },
    { to: '/productList/checkout', label: 'Checkout' },
  ]

  // console.log("NavbarProvider in App", NavbarProvider)
  // console.log('routes', routes)
  return (

    <div className="app">
      {/* <MyErrorBoundary> */}
      <Suspense fallback={<div>Loading...</div>}>
        {/* <Breadcrumb>
          {items.map(({ to, label }) => (
            <Link key={to} to={to}>
              {label}
            </Link>
          ))}
        </Breadcrumb> */}

        <Router>
          <Switch>
            {/* {routes.map(({ path, Component, provider }, key) => (
              <Route exact path={path} key={key} render={(props) => (
                <>
                  {provider.map((prov) => {
                    return prov
                  })}
                  <Navbar history={history} />
                  <Component {...props} />
                  {provider.map((prov) => {
                    return "/" + prov
                  })}
                </>
              )} />
            ))} */}
            <Route exact path="/"
              render={props => {
                return (
                  <NavbarProvider>
                    <Navbar />
                    <Home {...props} />
                  </NavbarProvider>
                )
              }
              }
            />
            <Route exact path="/currentorders"
              render={props => {
                const crumbs =
                  [
                    {
                      title: "Home",
                      link: "/",
                    },
                    {
                      title: "Current Orders",
                      link: "/currentorders",
                    }
                  ];
                return (
                  <CustomClearanceProvider><NavbarProvider>
                    <Navbar />
                    <BuyerHome crumbs={crumbs} {...props} />
                  </NavbarProvider></CustomClearanceProvider>
                )
              }
              }
            />
            <Route exact path="/productList"
              render={props => {
                const crumbs =
                  [
                    {
                      title: "Home",
                      link: "/",
                    },
                    {
                      title: "Products",
                    },
                  ];
                return (
                  <NavbarProvider>
                    <Navbar history={history} />
                    <ProductList crumbs={crumbs} {...props} />
                  </NavbarProvider>
                )
              }
              }
            />
            <Route exact path="/productList/checkout"
              render={props => {
                const crumbs =
                  [
                    {
                      title: "Home",
                      link: "/",
                    },
                    {
                      title: "Products",
                      link: "/productList?page=1"
                    },
                    {
                      title: "Checkout",
                    }
                  ];
                return (
                  <NavbarProvider>
                    <Navbar />
                    <Checkout crumbs={crumbs} {...props} />
                  </NavbarProvider>
                )
              }
              }
            />
            <Route path="/admin"
              render={(props) => (
                <SidebarProvider>
                  <AdminLayout {...props} />
                </SidebarProvider>
              )}
            />
            <Route path="/agent"
              render={(props) => (
                <SidebarProvider>
                  <AgentLayout {...props} />
                </SidebarProvider>
              )}
            />
            <Route component={WithNavbar} /> {/* No match route */}
          </Switch>
        </Router>
      </Suspense>
      {/* </MyErrorBoundary> */}
    </div>
  );
}

/*** for later on usage */
function mapStateToProps(state, props) {
  return {
    loggedInUser: state.loggedInUser,
  };
}

export default connect(mapStateToProps)(App);
