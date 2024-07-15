import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getUserRole, getUserProfile } from "../../../redux";
import InfoCard from "../../../common/components/Card/InfoCard";
// import Alert from "../../../common/components/Alert.jsx";
import useQuery from "../../../common/hooks/api/useQuery";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import { Loader } from "../../../common/styles";
import {
  Container3DIcon,
  DocumentDollarIcon,
  DocumentCheckIcon,
  CreditCardIcon,
} from "../../../assets/icons";
import tw, { theme } from "twin.macro";

/** Styles **/
const Wrapper = tw.div`
grid grid-cols-1
md:grid-cols-2 
gap-5
relative
`;

function InfoCardContainer(props) {
  const {
    loggedInUser
  } = props;
  const {
    data: awaitingConfirmation,
    isError: awaitingConfirmationError,
    isLoading: awaitingConfirmationLoading,
  } = useQuery(
    `${containerEndpoints.laralist}?status=awaiting confirmation&agentUid=`+loggedInUser.uid
  );
  const {
    data: sold,
    isError: soldError,
    isLoading: soldLoading,
  } = useQuery(`${containerEndpoints.count}?containerStatus=sold&agentUid=`+loggedInUser.uid);
  const {
    data: inStock,
    isError: inStockError,
    isLoading: inStockLoading,
  } = useQuery(`${containerEndpoints.count}?containerStatus=available&agentUid=`+loggedInUser.uid);
  const {
    data: booked,
    isError: bookedError,
    isLoading: bookedLoading,
  } = useQuery(`${containerEndpoints.booked}?agentUid=`+loggedInUser.uid);

  return (
    <>
      {!awaitingConfirmationLoading &&
      !soldLoading &&
      !inStockLoading &&
      !bookedLoading ? (
        <Wrapper>
          {awaitingConfirmationError ? (
            <div> Error Retrieving </div>
          ) : (
            <InfoCard
              borderColor={theme`colors.primary-blue`}
              multilineHeader={false}
              title="Containers Awaiting Confirmation"
              icon={<DocumentCheckIcon tw="w-10 h-10" />}
              // data={awaitingConfirmation.count > 0 ? awaitingConfirmation.count : <Alert type="info" message="no data to display" />}
              data={awaitingConfirmation.containers.length}
              link={
                <Link to="/agent/containers/awaiting-confirmation">
                  View Containers
                </Link>
              }
            />
          )}
          {inStockError ? (
            <div>Error Retrieving </div>
          ) : (
            <InfoCard
              multilineHeader={false}
              borderColor={theme`colors.primary-blue`}
              title="Containers in Stock"
              icon={<Container3DIcon tw="w-12 h-12" />}
              // data={inStock.count > 0 ? inStock.count : <Alert type="info" message="no data to display" />}
              data={inStock.count}
              link={
                <Link to="/agent/containers/in-stock">View Containers</Link>
              }
            />
          )}

          {bookedError ? (
            <div>Error</div>
          ) : (
            <InfoCard
              borderColor={theme`colors.primary-blue`}
              multilineHeader={false}
              title="Bookings"
              icon={<CreditCardIcon tw="w-12 h-12" />}
              // data={booked.count > 0 ? booked.count : <Alert type="info" message="no data to display" />}
              data={booked.count}
              link={<Link to="/agent/bookings">View Bookings</Link>}
            />
          )}
          {soldError ? (
            <div> Error </div>
          ) : (
            <InfoCard
              borderColor={theme`colors.primary-blue`}
              multilineHeader={false}
              title="Sold Containers"
              icon={<DocumentDollarIcon tw="w-12 h-12" />}
              // data={sold.count > 0 ? sold.count : <Alert type="info" message="no data to display" />}
              data={sold.count}
              link={<Link to="/agent/containers/sold">View Containers</Link>}
            />
          )}
        </Wrapper>
      ) : (
        <Loader format="smaller" />
      )}
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
  getUserRole,
};

export default connect(mapStateToProps, mapDispatchToProps)(InfoCardContainer);
