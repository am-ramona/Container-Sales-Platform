import { useState } from "react";
import Alert from "../../../common/components/Alert.jsx";
import apiBarData from "../../../api/barData.json";
import { Bar } from "../../../common/components/Charts";
import tw, { css } from "twin.macro";
import { Card, Select } from "../../../common/styles";

const wrapperStyles = css`${tw`
border-primary-blue 
w-full mt-10
`}`;

export default function BarContainer() {
  const [barData, setBarData] = useState(apiBarData);

  const handleBarData = (e) => {
    let newData;
    if (e.target.value !== "ALL") {
      newData = apiBarData.filter(function (el) {
        return el.country === e.target.value;
      });
    } else {
      newData = apiBarData;
    }
    setBarData(newData);
  };

  let temp = [];
  let selectedCountries = apiBarData.map((item, i) => {
    if (temp.includes(item.country)) return null;
    else {
      temp.push(item.country);
      return (
        <option key={i} value={item.country}>
          {item.country}
        </option>
      );
    }
  });

  return (
    <Card hasHighlightedBorder css={wrapperStyles}>
      <div tw="pl-2 pr-2">
        <div tw="flex sm:justify-end justify-center">
          <label>
            Country
            <Select
              onChange={(e) => handleBarData(e)}
              tw="ml-3"
            >
              <option value="ALL"> ALL </option>
              {selectedCountries}
            </Select>
          </label>
        </div>
        <div tw="mt-8 flex md:flex-row flex-col space-y-4 md:space-x-4 md:space-y-0 justify-start">
          <p tw="lg:text-lg">Average Time Between</p>
          <Select>
            <option value="BOOKING"> Booking </option>
            <option value="PICKUP"> Pickup </option>
            <option value="PAYMENT"> Payment </option>
            <option value="DOCUMENT VALIDATION"> Document Validaion </option>
          </Select>
          <p tw=" lg:text-lg">and</p>
          <Select>
            <option value="BOOKING"> Booking </option>
            <option value="PICKUP"> Pickup </option>
            <option value="PAYMENT"> Payment </option>
            <option value="DOCUMENT VALIDATION"> Document Validaion </option>
          </Select>
        </div>
      </div>
      <div tw="h-512 mt-2">
        {barData.length === 0 ? <Alert type="info" message="no data to display" /> : null}
        <Bar data={barData} />
      </div>
    </Card>
  );
}
