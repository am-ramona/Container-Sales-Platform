import { useState } from "react";
import { connect } from "react-redux";
import { getUserRole, getUserProfile } from "../../../redux";
import { Pie } from "../../../common/components/Charts";
import Alert from "../../../common/components/Alert.jsx";
import useQuery from "../../../common/hooks/api/useQuery";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import { Card, Loader } from "../../../common/styles";
import tw, { css } from "twin.macro";

/** Styles **/
const wrapperStyles = css`
  ${tw` 
border-primary-blue
text-primary-blue
w-full mt-10
`}
`;

function Dashboard(props) {
  const { loggedInUser } = props;
  const [pieFilter, setPieFilter] = useState("SIZE");
  const {
    data: barSoldData,
    isError: barDataError,
    isLoading: barDataLoading,
  } = useQuery(
    pieFilter === "SIZE"
      ? `${containerEndpoints.soldBySize}?agentUid=` + loggedInUser.uid
      : pieFilter === "CONDITION"
      ? `${containerEndpoints.soldByCondition}?agentUid=` + loggedInUser.uid
      : `${containerEndpoints.soldByType}?agentUid=` + loggedInUser.uid
  );

  return (
    <Card hasHighlightedBorder css={wrapperStyles}>
      <p tw="text-17 inline-block font-semibold">
        Percentage of Sold Containers By:
        <select
          value={pieFilter}
          onChange={(e) => {
            setPieFilter(e.target.value);
          }}
          tw="inline-block text-14 border-none outline-none ring-0 focus:ring-0"
        >
          <option value="TYPE"> Type </option>
          <option value="SIZE"> Size </option>
          <option value="CONDITION"> Condition </option>
        </select>
      </p>
      <div tw="h-512 relative">
        {barDataLoading ? (
          <Loader format="smaller" />
        ) : barDataError ? (
          <div tw="text-14 "> Error Occurred </div>
        ) : (
          <>
            {barSoldData.length === 0 ? (
              <Alert type="info" message="no data to display" />
            ) : null}
            <Pie data={barSoldData} />
          </>
        )}
      </div>
    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
