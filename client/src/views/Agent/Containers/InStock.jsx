import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { tableReducer } from "../../../common/components/Table/DataTable";
import {
  hideLoading,
  showLoading,
  updateData,
  saveRowEditors,
  closeRowEditors,
} from "ka-table/actionCreators";
import { ActionType } from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import useQuery from "../../../common/hooks/api/useQuery";
import { containerEndpoints } from "../../../common/constants/apiEndpoints";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { ContainerTable, tablePropsInit } from "./common/ContainerTable";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import {
  StyledDownloadIcon as DownloadIcon,
  HeaderTitle,
  HeaderWrapper,
  Line,
  Number,
} from "./common/style";
import { flattenData } from "../../../common/utils/functions";
import Alert from "../../../common/components/Alert.jsx";
import { Card, Button, Loader } from "../../../common/styles";
import axios from "axios";
import { mutate } from "swr";
import "twin.macro";

const InStock = () => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const selectedData = kaPropsUtils.getSelectedData(tableProps);
  const [filters, setFilters] = useState({
    page: 1,
    containerStatus: "available",
  });
  const [alert, setAlert] = useState(false);
  const [movedContainers, setMovedContainers] = useState(0);
  const [deleteContainers, setDeleteContainers] = useState(false);

  const { filterQuery } = useQueryBuilder(filters);
  const { data, isError, isLoading } = useQuery(
    `${containerEndpoints.list}?${filterQuery}`
  );

  const {
    data: containersCount,
    isCountError,
    isCountLoading,
  } = useQuery(`${containerEndpoints.count}?containerStatus=available`);

  function capitalize(arr) {
    for (var i = 0; i < arr.length; i++) {
      var condition = arr[i].containerCondition;
      var type = arr[i].containerTypeDisplay;
      if (condition !== null)
        arr[i].containerCondition =
          condition.slice(0, 1).toUpperCase() +
          condition.slice(1).toLowerCase();
      if (type !== null)
        arr[i].containerTypeDisplay =
          type.slice(0, 1).toUpperCase() + type.slice(1).toLowerCase();
    }
    return arr;
  }

  useEffect(() => {
    if (isLoading) {
      dispatch(showLoading());
    } else if (data) {
      dispatch(hideLoading());
      dispatch({ type: "LOAD_TOTAL_PAGES", payload: data.length });
      dispatch(updateData(capitalize(data.containers)));
    } else {
      dispatch(hideLoading());
      dispatch(updateData([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError]);

  const handleEdit = (containerId, updatedObject) => {
    dispatch(showLoading());
    axios
      .put(
        `${containerEndpoints.list}/${containerId}`,
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
          let updateObject = {
            containerCondition: "",
            containerPrice: "",
            containerStatus: "",
          };
          prevState.editableCells
            .filter(
              (cell) =>
                cell.rowKeyValue === containerId &&
                cell.columnKey !== "editColumn"
            )
            .forEach(
              (key) =>
                (updateObject[key.columnKey] = key.editorValue
                  ? key.editorValue
                  : "")
            );
          handleEdit(containerId, updateObject);
          return tableReducer(prevState, action);
        });
        break;
      default:
        changeTableProps((prevState) => tableReducer(prevState, action));
    }
  };

  // const before containersToUpdate is removed as it is now declared in the upper scope
  const handleStatus = (deleted) => {
    containersToUpdate = selectedData.map((container) => {
      return {
        containerNo: container.containerNo,
        // containerStatus: deleted ? "deleted" : "awaiting confirmation",
      };
    });

    const selectedContainersNumbers = flattenData(
      containersToUpdate,
      "containerNo"
    );

    dispatch(showLoading());
    axios.put("/products/laraContainers", containersToUpdate).then(
      () => {
        dispatch(hideLoading());
        if (deleted) {
          setDeleteContainers(true);
        }
        setMovedContainers(containersToUpdate.length);
        setAlert(true);

        mutate(`${containerEndpoints.count}?containerStatus=available`);
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
  };

  let props = {
    type: "success",
    message:
      movedContainers +
      (deleteContainers
        ? " containers deleted"
        : " containers moved to awaiting confirmation"),
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
  };

  var containersToUpdate = selectedData.map((container) => {
    return {
      containerNo: container.containerNo,
    };
  });

  let deleteContainersinStockProps = {
    message:
      "Are you sure you want to delete " +
      containersToUpdate.length +
      (containersToUpdate.length === 1 ? " container" : " containers ?"),
    button1: "Cancel",
    button2: "Delete",
    buttonColor: "outline-blue",
  };

  let moveToAwaitingConfirmationProps = {
    message:
      "Are you sure you want to move " +
      containersToUpdate.length +
      (containersToUpdate.length === 1 ? " container" : " containers ?") +
      " to 'Containers Awaiting Confirmation' List ? This will hide them from potential buyers.",
    button1: "Move Containers",
    button2: "Cancel",
    buttonColor: "outline-blue",
  };

  return (
    <>
      <HeaderWrapper>
        <Alert {...(alert ? props : {})} />
        <HeaderTitle>
          Containers In Stock
          <Line />
          <Number>{containersCount && `${containersCount.count}`}</Number>
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
            <Modal
              width="450px"
              height="auto"
              titleFontSize="24px"
              component={
                <Button color="primary-blue">
                  Move to awaiting confirmation
                </Button>
              }
              title="Move to awaiting confirmation"
              children={
                <Popup
                  name="moveToAwaitingConfirmation"
                  {...moveToAwaitingConfirmationProps}
                  accept={() => handleStatus(false)}
                />
              }
            />
            {/* <Modal
              width="450px"
              height="auto"
              titleFontSize="24px"
              component={<Button color="primary-blue">Delete</Button>}
              title="Delete"
              children={
                <Popup
                  name="deleteContainersInStock"
                  {...deleteContainersinStockProps}
                  accept={handleStatus}
                />
              }
            /> */}
          </div>
        ) : null}
      </HeaderWrapper>
      <Card tw="p-10">
        <ContainerTable name="inStock" tableProps={tableProps} dispatch={dispatch} />
      </Card>
    </>
  );
};

export default InStock;
