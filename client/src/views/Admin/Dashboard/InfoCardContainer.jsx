import tw, { theme } from "twin.macro";
import { InfoCard } from "../../../common/components/Card";
import {
  Container3DIcon,
  DocumentDollarIcon,
  WarningIcon,
} from "../../../assets/icons";
import { Link } from "react-router-dom";
import useQuery from "../../../common/hooks/api/useQuery";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import Loader from "../../../common/styles/Loader";
// import Alert from "../../../common/components/Alert.jsx";

/** Styles **/
const Wrapper = tw.div`
grid grid-cols-1 
md:grid-cols-2 
gap-5
`;

const InfoCardSelect = tw.select`
border-none 
outline-none 
ring-0 
focus:ring-0 
text-lg
`;

export default function InfoCardContainer() {
  const {
    data: sold,
    isError: soldError,
    isLoading: soldLoading,
  } = useQuery(`${containerEndpoints.count}?containerStatus=sold`);
  const {
    data: inStock,
    isError: inStockError,
    isLoading: inStockLoading,
  } = useQuery(`${containerEndpoints.count}?containerStatus=available`);

  const depotsOnPlatformNb = 400;
  const pendingIssuesNb = 400;
  return (
    <>
      {!soldLoading && !inStockLoading ? (
        <Wrapper>
          {inStockError ? (
            <div>Error Retrieving </div>
          ) : (
            <InfoCard
              multilineHeader={false}
              borderColor={theme`colors.primary-blue`}
              title="Containers in Stock"
              icon={<Container3DIcon tw="w-12 h-12" />}
              data={
                // inStock.count > 0 ? (
                  inStock.count
                // ) : (
                //   <Alert type="info" message="no data to display" />
                // )
              }
            />
          )}

          <InfoCard
            borderColor={theme`colors.primary-blue`}
            multilineHeader={false}
            title="Depots on Platform"
            icon={<Container3DIcon tw="w-14 h-14" />}
            data={
              // depotsOnPlatformNb > 0 ? (
                depotsOnPlatformNb
              // ) : (
              //   <Alert type="info" message="no data to display" />
              // )
            }
            link={<Link to="/admin/manage-agents">View Agents</Link>}
          />

          <InfoCard
            borderColor={theme`colors.primary-blue`}
            multilineHeader={false}
            title="Pending Issues"
            icon={<WarningIcon tw="w-12 h-12" />}
            data={
              // pendingIssuesNb > 0 ? (
                pendingIssuesNb
              // ) : (
              //   <Alert type="info" message="no data to display" />
              // )
            }
            // link={<Link to="/admin/issues">View Issues</Link>}
          />

          {soldError ? (
            <div> Error </div>
          ) : (
            <InfoCard
              multilineHeader={true}
              borderColor={theme`colors.primary-blue`}
              title="Containers Sold"
              icon={<DocumentDollarIcon tw="w-12 h-12" />}
              data={
                // sold.count > 0 ? (
                  sold.count
                // ) : (
                //   <Alert type="info" message="no data to display" />
                // )
              }
            >
              in the past
              <InfoCardSelect>
                <option> 30 </option>
                <option> 60 </option>
                <option> 90 </option>
                <option> All Time </option>
              </InfoCardSelect>
              days
            </InfoCard>
          )}
        </Wrapper>
      ) : (
        <Loader format="small" />
      )}
    </>
  );
}
