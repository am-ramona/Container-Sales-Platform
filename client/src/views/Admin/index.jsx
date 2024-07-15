import React, { useContext, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getUserRole } from "../../redux";
import routes from "../../routes/admin";
import { roles } from "../../routes/sidebar";
import { SidebarContext } from "../../context/SidebarContext";
import Sidebar from "../../common/components/Sidebar";
import { Header } from "../../common/components/Topbar";
import Loader from "../../common/styles/Loader";
import tw from "twin.macro";

function Layout(props) {
  let history = useHistory();
  const { isSidebarOpen, closeSidebar, setRole } = useContext(SidebarContext);
  const { loggedInUser, getUserRole, userRole, userInfo } = props;
  let location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      getUserRole(loggedInUser.uid)
    } else { history.push("/"); }
  }, []);

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setRole(roles.ADMIN);
  });

  return (
    <>
      <div>
        <Header
          username={Object.keys(userInfo).length > 0 && userInfo.firstName + " " + userInfo.lastName}
          items={[
            // {
            //   link: "/admin/profile",
            //   label: "Profile",
            // },
            {
              // link: "/admin/logout",
              label: "Logout",
            },
          ]}
        />
      </div>
      <div
        tw="flex h-screen pt-16"
        css={[isSidebarOpen && tw`overflow-hidden`]}
      >
        <div tw="lg:pt-5 lg:pl-5">
          <Sidebar />
        </div>
        <div tw="w-full p-5 overflow-y-auto">
          <main>
            <Suspense fallback={<Loader format="smaller" />}>
              <Switch>
                <Redirect exact from="/admin" to="/admin/dashboard" />
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/admin${route.path}`}
                      render={(props) => <route.component {...props} />}
                    />
                  ) : null;
                })}
              </Switch>
            </Suspense>
          </main>
        </div>
      </div>
    </>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedInUser: state.loggedInUser,
    userRole: state.userRole,
    userInfo: state.userInfo,
  };
}

const mapDispatchToProps = {
  getUserRole
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
