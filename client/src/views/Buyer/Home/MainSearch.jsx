import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MultiSelect from "../../../common/components/MultiSelect";
import { Button, Card } from "../../../common/styles";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import containersData from "../../../common/constants/containers";
import countriesData from "../../../common/constants/countries";
import tw from "twin.macro";

const Layout = tw.div`
grid md:grid-cols-multiSelectHome md:grid-rows-none
xs: grid-rows-4Full gap-3.5
lg:space-x-4 lg:space-y-0 
space-y-2 p-3
`;

const SelectWrapper = tw.div`m-0`;

const Label = tw.label`
text-17 font-medium text-primary-blue
`;

const SearchBtnWrapper = tw.div`
text-center grid m-0
xs:content-center md:content-end 
`;

const SearchBtn = tw(Button)`
mdl:text-14 xs:text-13 
hover:( bg-secondary-blue border-secondary-blue text-white )
`;

export default function MainSearch() {
  let history = useHistory();
  const [countries, setCountries] = useState([]);
  const [types, setTypes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const { filterQuery } = useQueryBuilder({
    productType: types.map((type) => type.value),
    productSize: sizes.map((size) => size.value),
    productCountry: countries.map((country) => country.value),
  });

  const handleClick = () => {
    history.push("/productList?" + filterQuery);
  };

  return (
    <Card>
      <Layout>
        <SelectWrapper>
          <Label>Type</Label>
          <MultiSelect
            tw="mt-1.5"
            className="multi-select"
            options={containersData["type"]}
            value={types}
            onChange={setTypes}
            labelledBy={"Select"}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Label>Size</Label>
          <MultiSelect
            tw="mt-1.5"
            className="multi-select"
            options={containersData["size"]}
            value={sizes}
            onChange={setSizes}
            labelledBy={"Select"}
          />
        </SelectWrapper>
        <SelectWrapper>
          <Label>Country</Label>
          <MultiSelect
            tw="mt-1.5"
            className="multi-select"
            options={countriesData}
            value={countries}
            onChange={setCountries}
            labelledBy={"Select"}
          />
        </SelectWrapper>
        <SearchBtnWrapper>
          <SearchBtn color="primary-blue" onClick={handleClick}>
            Search Containers
          </SearchBtn>
        </SearchBtnWrapper>
      </Layout>
    </Card>
  );
}
