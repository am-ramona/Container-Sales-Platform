import React, { useState } from "react";
import MultiSelect from "../../../common/components/MultiSelect";
import SalesCurveContainer from "./SalesCurveContainer";
import InfoCardContainer from "./InfoCardContainer";
// import BarContainer from "./BarContainer";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { locationsEndpoints } from "../../../common/constants/apiEndpoints";
import tw from "twin.macro";

/** Styles **/
const OuterGrid = tw.div`
grid grid-cols-1
xl:grid-cols-2 
gap-5
relative
`;

const MultiSelectWrapper = tw.div`
grid grid-cols-multiSelect gap-x-4 mb-10`;

const Label = tw.label`
text-15 text-primary-blue font-medium`;

export default function Dashboard() {
  const [countries, setCountries] = useState([]);
  // const { filterQuery } = useQueryBuilder({
  //   "productCity": cities.map(city => city.value),
  //   "productCountry": countries.map(country => country.value),
  //   "page": activePage,
  //   ...filters,
  // });

  const { data, isLoading, isError } = useQuery(
    `${locationsEndpoints.countries}`
  );

  return (
    <>
      <OuterGrid>
        {/* <MultiSelectWrapper>
          <Label> Choose Country </Label>
          <MultiSelect
            tw="mt-1"
            className="multi-select"
            options={countriesData}
            value={countries}
            onChange={setCountries}
            labelledBy={"Select"}
          />
        </MultiSelectWrapper> */}
        <InfoCardContainer />
        <SalesCurveContainer />
      </OuterGrid>
      {/* phase 2 */}
      {/* <BarContainer /> */}
    </>
  );
}
