import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mutate } from "swr";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import { Card, Button, Loader } from "../../../common/styles";
import {
  StyledDownloadIcon as DownloadIcon,
  HeaderTitle,
  HeaderWrapper,
  Line,
  Number,
} from "./common/style";

import { CSVLink } from "react-csv";
// import {
//   // ITableProps,
//   kaReducer,
//   // Table
// } from 'ka-table';
import { tableReducer } from "../../../common/components/Table/DataTable";
import {
  closeRowEditors,
  hideLoading,
  saveRowEditors,
  showLoading,
  updateData,
} from "ka-table/actionCreators";
import { ActionType } from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import { ContainerTable, tablePropsInit } from "./common/ContainerTable";
import Alert from "../../../common/components/Alert.jsx";
import { flattenData } from "../../../common/utils/functions";
import axios from "axios";
import "twin.macro";

const AwaitingConfirmation = (props) => {
  const { loggedInUser } = props;
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [filters, setFilters] = useState({
    page: 1,
    status: "awaiting confirmation",
    agentUid: loggedInUser.uid,
  });
  const [alert, setAlert] = useState(false);
  const [alertConfirm, setAlertConfirm] = useState(false);
  const [confirmedContainers, setConfirmedContainers] = useState(0);

  // console.log('Awaiting confirmation: tablePropsInit', tablePropsInit)

  const selectedData = kaPropsUtils.getSelectedData(tableProps);
  // console.log('Awaiting confirmation: tableProps', tableProps)
  // console.log('Awaiting confirmation: kaPropsUtils', kaPropsUtils)
  // console.log('Awaiting confirmation: selectedData', kaPropsUtils.getSelectedData(tableProps))

  const { filterQuery } = useQueryBuilder(filters);

  const { data, isError, isLoading } = useQuery(
    `${containerEndpoints.laralist}?${filterQuery}`
  );
  console.log("awaiting isError", isError);
  // `${containerEndpoints.laralist}?containerStatus=awaiting confirmation`
  // const { data: containersCount, isCountError, isCountLoading } = useQuery(
  //   `${containerEndpoints.count}?containerStatus=awaiting confirmation`
  // );

  // console.log('data.containers', data.containers)

  function capitalize(arr) {
    for (var i = 0; i < arr.length; i++) {
      var first = arr[i].containerCondition;
      // var last = arr[i].lname;
      if (first !== null)
        arr[i].containerCondition =
          first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
      // arr[i].lname = last.slice(0,1).toUpperCase() +last.slice(1).toLowerCase();
    }
    return arr;
  }

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoading());
    } else if (data) {
      dispatch(hideLoading());
      dispatch({ type: "LOAD_TOTAL_PAGES", payload: data.length });

      // const x = {};
      // for (const [key, value] of Object.entries(data.containers)) {
      //   x[key.toUpperCase()] = value;
      // }

      dispatch(updateData(capitalize(data.containers)));
    } else {
      dispatch(hideLoading());
      dispatch(updateData([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError]);

  const handleStatus = (confirm) => {
    console.log("confirm", confirm);
    console.log("handleStatus selectedData", selectedData);

    const containersToUpdate = selectedData.map((container) => {
      return {
        containerNo: container.containerNo,
        // containerStatus: confirm ? "available" : "unavailable",
      };
    });

    const containersToUnconfirm = selectedData.map((container) => {
      return {
        containerNo: container.containerNo,
        status: "unconfirmed",
        containerCondition:
          container.containerCondition === null
            ? ""
            : container.containerCondition,
        price: container.containerPrice,
      };
    });

    const selectedContainersNumbers = flattenData(
      containersToUpdate,
      "containerNo"
    );

    console.log("handleStatus containersToUpdate", containersToUpdate);
    console.log(
      "handleStatus selectedContainersNumbers",
      selectedContainersNumbers
    );

    dispatch(showLoading());

    if (confirm) {
      if (
        selectedData.some(
          (o) => o.containerCondition == null || o.containerPrice === 0
        )
      ) {
        dispatch(hideLoading());
        setAlertConfirm(true);
      } else {
        axios
          .put(containerEndpoints.mapLaraContainers, containersToUpdate)
          .then(
            () => {
              dispatch(hideLoading());
              if (confirm) {
                setConfirmedContainers(containersToUpdate.length);
                setAlert(true);
              }
              mutate(
                `${containerEndpoints.count}?containerStatus=awaiting confirmation`
              );
              dispatch(
                updateData(
                  kaPropsUtils.getData(tableProps).filter((elem) => {
                    return !selectedContainersNumbers.includes(
                      elem.containerNo
                    );
                  })
                )
              );
            },
            (error) => {
              dispatch(hideLoading());
              //TODO: Replace with Alert
              console.log(error);
            }
          );
      }
    } else {
      axios
        .put(containerEndpoints.updateLaraContainer, containersToUnconfirm)
        .then(
          () => {
            dispatch(hideLoading());
            mutate(
              `${containerEndpoints.count}?containerStatus=awaiting confirmation`
            );
            dispatch(
              updateData(
                kaPropsUtils.getData(tableProps).filter((elem) => {
                  return !selectedContainersNumbers.includes(elem.containerNo);
                })
              )
            );
          },
          (error) => {
            dispatch(hideLoading());
            //TODO: Replace with Alert
            console.log(error);
          }
        );
    }
  };

  const handleEdit = (containerId, updatedObject) => {
    // console.log('handleEdit updatedObject', updatedObject)
    dispatch(showLoading());
    axios
      .put(`${containerEndpoints.updateLaraContainer}`, [updatedObject])
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

  // const dispatch = (action) => {
  //   console.log('Awaiting Confirmation: dispatch action.type', action.type)
  //   changeTableProps((prevState) => kaReducer(prevState, action));
  // };

  const dispatch = (action) => {
    switch (action.type) {
      case ActionType.UpdateFilterRowValue:
        let updatedFilters = {};
        switch (action.columnKey) {
          case "containerPrice":
            updatedFilters["maxPrice"] = action.filterRowValue;
            break;
          case "containerTypeDisplay":
            updatedFilters["containerType"] = action.filterRowValue;
            break;
          default:
            updatedFilters[action.columnKey] = action.filterRowValue;
        }
        setFilters({ ...filters, ...updatedFilters });
        break;
      case ActionType.UpdatePageIndex:
        setFilters({ ...filters, page: action.pageIndex + 1 });
        changeTableProps((prevState) => tableReducer(prevState, action));
        break;
      case "INTERCEPT_EDIT":
        const containerId = action.rowKeyValue;
        changeTableProps((prevState) => {
          // const containersToEdit = selectedData.map((container) => {
          //   return {
          //     containerNo: container.containerNo,
          //     status: "awaiting confirmation",
          //   };
          // });
          // {
          //   "containerCondition": "reuse",
          //   "containerNo": "CMAU1477271",
          //   "price": 1200,
          //   "status": "unconfirmed"
          // }
          let updatedObject = {
            containerNo: containerId,
            containerCondition: "re-use",
            price: "",
            status: "awaiting confirmation",
          };

          prevState.editableCells
            .filter(
              (cell) =>
                cell.rowKeyValue === containerId &&
                cell.columnKey !== "editColumn"
            )
            .forEach((key) => {
              console.log("updateObject key.editorValue", key.editorValue);
              if (key.columnKey === "containerPrice") {
                updatedObject["price"] = key.editorValue;
              } else if (
                key.columnKey === "containerCondition" &&
                typeof key.editorValue === "undefined"
              ) {
                updatedObject["containerCondition"] = "re-use";
              } else {
                updatedObject[key.columnKey] = key.editorValue
                  ? key.editorValue.toLowerCase()
                  : "";
              }
            });
          console.log("updateObject", updatedObject);
          handleEdit(containerId, updatedObject);
          return tableReducer(prevState, action);
        });
        break;
      default:
        changeTableProps((prevState) => tableReducer(prevState, action));
    }
  };

  let confirmContainersProps = {
    type: "success",
    message: confirmedContainers + " containers confirmed",
    autoClose: false,
    // dismissTime : 10000
    width: 558,
    height: 27,
    font: 12,
    iconWidth: 20,
    iconHeight: 20,
    paddingTop: "0px",
    paddingBottom: "0px",
    closeIconFontSize: "11px",
    setAlert
  };

  let checkContainersValidityProps = {
    type: "error",
    message:
      "Kindly make sure that all the Containers have a Condition and a Price.",
    autoClose: false,
    // dismissTime : 10000
    width: 558,
    height: 27,
    font: 12,
    iconWidth: 20,
    iconHeight: 20,
    paddingTop: "0px",
    paddingBottom: "0px",
    closeIconFontSize: "11px",
    setAlert: {setAlertConfirm}
  };

  let markUnavailableProps = {
    message: "Are you sure you want to mark these containers unavailable ?",
    button1: "Mark Unavailable",
    button2: "Cancel",
    buttonColor: "primary-blue",
    cancelColor: "outline-blue",
  };

  console.log("selectedData", selectedData);
  console.log('AC alert', alert)
  console.log('AC alertConfirm', alertConfirm)

  return (
    <>
      <HeaderWrapper>
       {(alert || alertConfirm) && <Alert
          {...(alert
            ? confirmContainersProps
            : alertConfirm
            ? checkContainersValidityProps
            : {})}
        />
          }
        <HeaderTitle>
          Containers Awaiting Confirmation
          <Line />
          <Number>{tableProps && tableProps.data.length}</Number>
          <CSVLink
            data={kaPropsUtils.getData(tableProps)}
            headers={tableProps.columns.map((c) => ({
              label: c.title,
              key: c.key,
            }))}
            filename="containers.data.csv"
          >
            <DownloadIcon />
          </CSVLink>
        </HeaderTitle>
        {selectedData.length ? (
          <div tw="space-x-3 grid grid-cols-2ColAuto h-minContent">
            <Button color="primary-blue" onClick={() => handleStatus(true)}>
              Confirm
            </Button>
            <Modal
              width="450px"
              height="auto"
              titleFontSize="24px"
              component={<Button color="primary-blue">Mark Unavailable</Button>}
              title="Mark Unavailable"
              children={
                <Popup
                  name="markUnavailable"
                  {...markUnavailableProps}
                  accept={() => handleStatus(false)}
                />
              }
            />
          </div>
        ) : null}
      </HeaderWrapper>
      <Card tw="p-10">
        <ContainerTable tableProps={tableProps} dispatch={dispatch} />
      </Card>
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    loggedInUser: state.loggedInUser,
    // userRole: state.userRole,
    // userInfo: state.userInfo,
  };
}

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AwaitingConfirmation);
