import React from "react";
import MainSearch from "./MainSearch";
// import Carousel from "./Carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import heroImage from "../../../assets/images/saint-exupery_0.jpg";
import tw from "twin.macro";

/** Styles **/
const Header = tw.header`
bg-center bg-no-repeat 
bg-cover relative
mt-0 xs:mt-16
flex flex-col h-512 
items-center justify-center bg-cover
`;

const HeroTitle = tw.h1`
text-gray-100 text-landingPage 
text-23
sm:text-3xl 
md:text-landingPage 
text-center
relative z-10
`;

const Layer = tw.div`
bg-navy absolute
top-0 left-0
w-full h-full`;

const MainSearchWrapper = tw.div`
absolute -bottom-186.2 max-w-3/4
xs:w-auto md:(w-890 -bottom-58.55)
`;

export default function Home(props) {
  return (
    <Header style={{ backgroundImage: 'url("' + heroImage + '")' }}>
      {/* <Header> */}
      <Layer></Layer>
      {/* <Carousel /> */}
      <HeroTitle>CMA CGM CONTAINERS SALES</HeroTitle>
      <MainSearchWrapper>
        <MainSearch />
      </MainSearchWrapper>
    </Header>
  );
}
