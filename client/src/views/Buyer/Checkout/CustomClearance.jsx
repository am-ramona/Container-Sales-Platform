import React from "react";
import { Card } from "../../../common/styles";
import tw from "twin.macro";

const LeftSide = tw.div`
lg:w-2/3 w-full lg:pr-16 mb-10
`;

export default function CustomClearance() {

  return (
        <LeftSide>
          <br />
          {/*Customs Clearance ... TO BE REMOVED */}
          <Card>
            <h1 tw="text-primary-blue text-lg mb-4">
              Choose customs clearance service
            </h1>
            <div tw="flex flex-col space-y-3">
              <label tw="inline-flex items-center ">
                <input
                  type="radio"
                  name="customs"
                  tw=" h-5 w-5 text-primary-blue"
                />
                <span tw="ml-2 text-gray-700">With CMA CGM | $50</span>
              </label>
              <label tw="inline-flex items-center mt-3">
                <input
                  type="radio"
                  name="customs"
                  tw="h-5 w-5 text-primary-blue"
                />
                <span tw="ml-2 text-gray-700">Other</span>
              </label>
            </div>
          </Card>
          {/*Customs Clearance ... TO BE REMOVED */}
        </LeftSide>
  );
}
