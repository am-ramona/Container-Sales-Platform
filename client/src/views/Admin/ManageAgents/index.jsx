import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Select, Loader } from "../../../common/styles";
import {
  StyledDownloadIcon as DownloadIcon,
  HeaderTitle,
  HeaderWrapper,
  Line,
  Number,
} from "./common/style";
import { tableReducer } from "../../../common/components/Table/DataTable";
import {
  closeRowEditors,
  hideLoading,
  saveRowEditors,
  showLoading,
  updateData,
} from "ka-table/actionCreators";
import { ManageAgentsTable, tablePropsInit } from "./common/ManageAgentsTable";
import Alert from "../../../common/components/Alert.jsx";
import { ActionType } from "ka-table/enums";
import { kaReducer } from "ka-table";
import { kaPropsUtils } from "ka-table/utils";
import {
  bookingEndpoints,
  containerEndpoints,
} from "../../../common/constants/apiEndpoints";
import { flattenData } from "../../../common/utils/functions";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { mutate } from "swr";
import axios from "axios";
import tw from "twin.macro";

const SearchBar = tw.div`
relative`;

const SearchWrapper = tw.div`
absolute w-max h-17 m-auto inset-y-0 left-3.5`;

const Search = tw.div`
w-17 m-auto relative text-center`;

const Circle = tw.div`
w-ten h-ten 
border-2 border-solid border-gray-200
rounded-full`;

const Rectangle = tw.div`
w-ten right-0 
border-0.5 border-solid border-gray-200 
absolute -bottom-3 transform rotate-45
rounded-r-xl`;

const ManageAgents = () => {
  const history = useHistory();
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [filters, setFilters] = useState({
    // page: 1,
    role: "agent",
  });

  const selectedData = kaPropsUtils.getSelectedData(tableProps);
  // const selectedData = kaPropsUtils.areAllFilteredRowsSelected(tableProps);
  // const selectedData = tableProps;
  // console.log('ManageAgents: tablePropsInit', tablePropsInit)
  const { filterQuery } = useQueryBuilder(filters);

  const { data, isError, isLoading } = useQuery(
    `${bookingEndpoints.agents}?${filterQuery}`
  );

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoading());
    } else if (data) {
      dispatch(hideLoading());
      const appendFullNameToAgents = data.agents.map(v => ({...v, fullName: v.firstName+ " "+v.lastName}))
      dispatch({ type: "LOAD_TOTAL_PAGES", payload: data.length });
      dispatch(updateData(appendFullNameToAgents));
    } else {
      dispatch(hideLoading());
      dispatch(updateData([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError]);

  // console.log('manage agents data', data)
//   const handleStatus = (confirm) => {
//     const containersToUpdate = selectedData.map((container) => {
//       return {
//         containerNo: container.containerNo,
//         containerStatus: confirm ? "available" : "unavailable",
//       };
//     });

//     const selectedContainersNumbers = flattenData(
//       containersToUpdate,
//       "containerNo"
//     );

//     dispatch(showLoading());

//     axios
//       .put(containerEndpoints.updateContainerStatus, containersToUpdate)
//       .then(
//         () => {
//           dispatch(hideLoading());
//           if (confirm) {
//             setConfirmedContainers(containersToUpdate.length);
//             setAlert(true);
//           }
//           mutate(
//             `${containerEndpoints.count}?containerStatus=awaiting confirmation`
//           );
//           dispatch(
//             updateData(
//               kaPropsUtils.getData(tableProps).filter((elem) => {
//                 return !selectedContainersNumbers.includes(elem.containerNo);
//               })
//             )
//           );
//         },
//         (error) => {
//           dispatch(hideLoading());
//           //TODO: Replace with Alert
//           console.log(error);
//         }
//       );
//   };

  const handleEdit = (containerId, updatedObject) => {
    dispatch(showLoading());
    axios
      .put(
        `${containerEndpoints.updateContainer}/${containerId}`,
        updatedObject
      )
      .then(
        () => {
          dispatch(hideLoading());
          dispatch(
            saveRowEditors(containerId, {
              validate: true,
            })
          );
        },
        (error) => {
          dispatch(hideLoading());
          dispatch(closeRowEditors(containerId));
          //TODO: Replace with Alert
          console.log(error);
        }
      );
  };

  const dispatch = (action) => {
    // console.log("dispatch action", action);
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  // const dispatch = (action) => {
  //     switch (action.type) {
  //         case ActionType.UpdateFilterRowValue:
  //             let updatedFilters = {};
  //             switch (action.columnKey) {
  //                 case "containerPrice":
  //                     updatedFilters["maxPrice"] = action.filterRowValue;
  //                     break;
  //                 case "containerTypeDisplay":
  //                     updatedFilters["containerType"] = action.filterRowValue;
  //                     break;
  //                 default:
  //                     updatedFilters[action.columnKey] = action.filterRowValue;
  //             }
  //             setFilters({ ...filters, ...updatedFilters });
  //             break;
  //         case ActionType.UpdatePageIndex:
  //             setFilters({ ...filters, page: action.pageIndex + 1 });
  //             changeTableProps((prevState) => tableReducer(prevState, action));
  //             break;
  //         case "INTERCEPT_EDIT":
  //             const containerId = action.rowKeyValue;
  //             changeTableProps((prevState) => {
  //                 let updateObject = {
  //                     containerCondition: "",
  //                     containerPrice: "",
  //                     containerStatus: "",
  //                 };
  //                 prevState.editableCells
  //                     .filter(
  //                         (cell) =>
  //                             cell.rowKeyValue === containerId &&
  //                             cell.columnKey !== "editColumn"
  //                     )
  //                     .forEach((key) => (updateObject[key.columnKey] = key.editorValue ? key.editorValue : ''));
  //                 handleEdit(containerId, updateObject);
  //                 return tableReducer(prevState, action);
  //             });
  //             break;
  //         default:
  //             changeTableProps((prevState) => tableReducer(prevState, action));
  //     }
  // };
  // console.log("ManageAgents: data", data);
  // console.log("ManageAgents: tableProps", tableProps);
  // console.log('ManageAgents: selectedData', selectedData)
  // console.log('kaPropsUtils', kaPropsUtils)

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          Manage Agents
          <Number> {tableProps.data.length} agents</Number>
        </HeaderTitle>
        {/* to be added in phase 2 */
        /* <SearchBar>
                    <input type="text" placeholder="Search" tw="w-full h-40 text-primary-blue text-14 pl-9" />
                    <SearchWrapper> 
                        <Search>
                            <Circle></Circle>
                            <Rectangle></Rectangle>
                        </Search>
                    </SearchWrapper>
                </SearchBar> */}
        {/* <Button color="primary-blue" tw='w-84 h-35 justify-self-end' onClick={() => history.push('/admin/manage-agents/add')}> Add </Button> */}
      </HeaderWrapper>
      <Card>
        <ManageAgentsTable tableProps={tableProps} dispatch={dispatch} />
      </Card>
    </>
  );
};

export default ManageAgents;
