import React, { useContext, Suspense, useEffect } from "react";
import { Switch, Route, Redirect, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getUserRole, getUserProfile } from "../../redux";
import Sidebar from "../../common/components/Sidebar";
import Loader from "../../common/styles/Loader";
import routes from "../../routes/agent";
import { roles } from "../../routes/sidebar";
import { Header } from "../../common/components/Topbar";
import { SidebarContext } from "../../context/SidebarContext";
import tw from "twin.macro";

function Layout(props) {
  let history = useHistory();
  let location = useLocation();

  const { isSidebarOpen, closeSidebar, setRole } = useContext(SidebarContext);
  const { loggedInUser, getUserProfile, getUserRole, userRole, userInfo } = props;

  useEffect(() => {
    console.log('agent loggedInUser',loggedInUser )
    // if (!loggedInUser) { getUserProfile();
    if (loggedInUser) {
      getUserRole(loggedInUser.uid);

      // getUserProfile()
      // .then((response) => {
        // if (loggedInUser) getUserRole(loggedInUser.uid);
        // else history.push("/");
      // })
    } else { history.push("/"); }
  }, []);

  useEffect(() => {
    closeSidebar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  useEffect(() => {
    setRole(roles.AGENT);
  });

  return (
    <>
      <div>
        <Header
          username={Object.keys(userInfo).length > 0 && userInfo.firstName + " " + userInfo.lastName}
          items={[
            // {
            //   link: "/agent/profile",
            //   label: "Profile",
            // },
            {
              link: "/agent/logout",
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
          <main tw="min-h-containersSelection">
            <Suspense fallback={<Loader format="smaller" />}>
              <Switch>
                <Redirect exact from="/agent" to="/agent/dashboard" />
                {routes.map((route, i) => {
                  return route.component ? (
                    <Route
                      key={i}
                      exact={true}
                      path={`/agent${route.path}`}
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
  getUserProfile,
  getUserRole
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
