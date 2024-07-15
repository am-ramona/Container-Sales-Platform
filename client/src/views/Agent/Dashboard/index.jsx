import tw from "twin.macro";
import PieContainer from "./PieContainer";
import InfoCardContainer from "./InfoCardContainer";
import InfoTableContainer from "./InfoTableContainer";

/** Styles **/
const OuterGrid = tw.div`
grid grid-cols-1 
xl:grid-cols-2 
gap-5
relative
`;

export default function Dashboard() {
  return (
    <>
      <OuterGrid>
        <InfoCardContainer />
        <InfoTableContainer />
      </OuterGrid>
      <PieContainer />
    </>
  );
}
