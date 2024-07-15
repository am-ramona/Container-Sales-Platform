import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import UserProfileMenu from "./UserProfileMenu";
import { connectUser, disconnectUser, getUserProfile } from "../../../redux";
import { Button } from "../../styles";
import { Logo, LogoColored } from "../../../assets/images";
import tw from "twin.macro";

const Wrapper = tw.div`
w-full 
fixed bg-white
z-50 shadow 
top-0 h-16
`;

// const List = tw.ul`
// flex items-center
// hidden space-x-8
// lg:flex
// `;

// const ListItem = tw.li`
// text-primary-blue 
// text-base
// cursor-pointer
// font-normal
// `;

// const ListAnchor = tw.a`
// tracking-wide 
// text-gray-700 transition-colors 
// duration-200 
// hover:text-primary-blue
// `;

// const MenuBtn = tw(Button)`
// p-2 -mt-2 -mr-2 
// transition duration-200 
// rounded hover:bg-gray-200 
// focus:bg-gray-200 focus:outline-none
// `;

const LoginBtn = tw(Button)`
w-100 rounded-none
`;

function Navbar(props) {
  let history = useHistory();
  const { loggedIn, loggedInUser, getUserProfile } = props;

  useEffect(() => {
    if (!loggedInUser) getUserProfile();
  }, []);

  useEffect(() => {
    // if (
    //   !loggedIn &&
    //   (window.location.pathname.toLowerCase() === "/currentorders" ||
    //     window.location.pathname.toLowerCase() === "/productlist/checkout")
    // ) {
    //   history.push("/");
    // }
  }, [history, loggedIn]);

  return (
    <Wrapper
      style={{
        background: history.location.pathname === "/" ? "none" : "white",
        boxShadow:
          history.location.pathname === "/"
            ? "none"
            : "0 1px 3px 0 rgba(0,0,0,0.1),0 1px 2px 0 rgba(0,0,0,0.06)",
      }}
    >
      <div
        tw="h-full relative flex items-center justify-between"
        style={{
          padding:
            history.location.pathname === "/" ? "8px 25px 0 7px" : "0 25px",
        }}
      >
        <a
          href="/"
          aria-label="CMA CGM"
          title="CMA CGM"
          tw="inline-flex items-center"
        >
          <img
            src={history.location.pathname === "/" ? Logo : LogoColored}
            tw="mx-auto"
            style={{
              width: history.location.pathname === "/" ? "6rem" : "4rem",
              paddingTop: history.location.pathname === "/" ? "8px" : "inherit",
            }}
            alt="CMA CGM"
          />
        </a>
        {/* { (!props.signin && window.location.pathname !== '/checkout' && window.location.pathname !== '/home') ?     */}
        {!loggedInUser ? (
          <LoginBtn
            color="outline-blue"
            onClick={() =>
              window.location.replace(
                `${
                  process.env.NODE_ENV === "development"
                    ? "http://localhost:3001"
                    : ""
                }/auth/sso/login?initialURL=${history.location.pathname}`
              )
            }
            // onClick={() => window.location.replace(`https://auth-int.cma-cgm.com:9031/as/authorization.oauth2?response_type=code&redirect_uri=https%3A%2F%2Fcsp-app-front.fpaas-dev.cld.cma-cgm.com%2Fauth%2Fsso%2Fcallback&scope=csp%3Aread%3Afe&client_id=webapp-csp&prompt=login`)}
          >
            Sign in
          </LoginBtn>
        ) : (
          <UserProfileMenu />
        )}
      </div>
    </Wrapper>
  );
}

function mapStateToProps(state, props) {
  return {
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
  };
}

const mapDispatchToProps = {
  connectUser,
  disconnectUser,
  getUserProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
