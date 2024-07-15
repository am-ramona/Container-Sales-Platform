import { Link } from "react-router-dom";
import InfoTable from "../../../common/components/Table/InfoTable";
import useQuery from "../../../common/hooks/api/useQuery";
import { orderEndpoints } from "../../../common/constants/apiEndpoints";
import { Card, Loader } from "../../../common/styles";
import tw, { css } from "twin.macro";

/** Styles **/
// border-primary-blue
// w-full h-full
//
const wrapperStyles = css`
  ${tw`
relative
`}
`;

const TableHeaderTitle = tw.h1`
text-17 font-semibold text-primary-blue
`;

const SeeMoreWrapper = tw.p`
text-14 text-secondary-blue 
font-normal pl-6 cursor-pointer
absolute bottom-5
`;

export default function InfoTableContainer() {
  const {
    data: bookings,
    isError: bookingsError,
    isLoading: bookingsLoading,
  } = useQuery(`${orderEndpoints.cart}?status=booked`);

  return (
    <Card hasHighlightedBorder css={wrapperStyles}>
      <div tw="mb-4">
        <TableHeaderTitle>New Orders</TableHeaderTitle>
      </div>
      {bookingsLoading ? (
        <Loader format="smaller" />
      ) : bookingsError ? (
        <div> {bookingsError.message} </div>
      ) : (
        <>
          <InfoTable
            headers={[
              "Order #",
              "Total Amount",
              "Date Booked",
              "Booking Status",
            ]}
            order={["orderId", "amount", "bookingDate", "bookingStatus"]}
            data={bookings.slice(0, 8)}
          />
          <SeeMoreWrapper>
            <Link to="/agent/bookings">See More ...</Link>
          </SeeMoreWrapper>
        </>
      )}
    </Card>
  );
}

