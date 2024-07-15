import { useState } from "react";
import Curve from "../../../common/components/Charts/Curve";
import Alert from "../../../common/components/Alert.jsx";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { orderEndpoints } from "../../../common/constants/apiEndpoints";
import data from "../../../api/graphData.json";
import { Card, Loader } from "../../../common/styles";
import tw, { css } from "twin.macro";

/** Styles **/
const wrapperStyles = css`
  ${tw`
w-full
border-primary-blue
relative
`}
`;

const CurveHeader = tw.div`
flex sm:flex-row 
flex-col 
justify-between 
mb-10
`;

const CurveHeaderTitle = tw.h1`
text-lg 
font-semibold
`;

export default function SalesCurveContainer() {
  // const salesData = data["2020"]["0"];

  const [filters, setFilters] = useState({
    // page: 1,
    agentUid: "S01168982",
  });
  const { filterQuery } = useQueryBuilder(filters);
  const {
    data: salesData,
    isError: salesDataError,
    isLoading: salesDataLoading,
  } = useQuery(`${orderEndpoints.sales}?` + filterQuery);

  return (
    <Card hasHighlightedBorder css={wrapperStyles}>
      <CurveHeader>
        <CurveHeaderTitle>Sales</CurveHeaderTitle>
      </CurveHeader>
      <div tw="h-96">
        {salesDataLoading ? (
          <Loader format="smaller" />
        ) : salesDataError ? (
          <>
          <div> {salesDataError.message} </div>
          {/* <Alert type="info" message="no data to display" /> */}
          <Curve data={[]} />
          </>
        ) : (
          <>
            {salesData.length === 0 ? (
              <Alert type="info" message="no data to display" />
            ) : null}
            <Curve data={salesData} />
          </>
        )}
      </div>
    </Card>
  );
}

{
  /* {bookingsLoading ? (
  <Loader format="smaller" />
) : bookingsError ? (
  <div> {bookingsError.message} </div>
) : (
  <>
    <InfoTable
      headers={["Order #", "Total Amount", "Date Booked", "Booking Status"]}
      order={["orderId", "amount", "bookingDate", "bookingStatus"]}
      data={bookings.slice(0, 8)}
    />
    <SeeMoreWrapper>
      <Link to="/agent/bookings">
        See More ...
    </Link>
    </SeeMoreWrapper>
  </>
)} */
}
