import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { mutate } from "swr";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import { Card, Button, Loader } from "../../../common/styles";
import { HeaderWrapper } from "./common/style";
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
import { orderEndpoints } from "../../../common/constants/apiEndpoints";
import {
  ViewChosenContainersTable,
  tablePropsInit,
} from "./common/ViewChosenContainersTable";
import Alert from "../../../common/components/Alert.jsx";
import { flattenData } from "../../../common/utils/functions";
import { getOrderDetails } from "../../../redux";
import axios from "axios";
import "twin.macro";

const ViewChosenContainers = (props) => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [filters, setFilters] = useState({
    page: 1,
    containerStatus: "awaiting confirmation",
  });
  const [alert, setAlert] = useState(false);
  const [confirmedContainers, setConfirmedContainers] = useState(0);
  const [data, setData] = useState([]);
  console.log("ViewChosenContainers : tablePropsInit", tablePropsInit);

  const selectedData = kaPropsUtils.getSelectedData(tableProps);
  //   const { filterQuery } = useQueryBuilder(filters);

  // const { data, isError, isLoading } = useQuery(
  //   `${orderEndpoints.cart}?orderId=` + props.orderId
  // );

  // const { data: containersCount, isCountError, isCountLoading } = useQuery(
  //     `${orderEndpoints.cart}?containerStatus=awaiting confirmation`
  // );

  useEffect(() => {
    props.getOrderDetails(props.orderId);
  }, []);

  console.log("view props.orderData", props.orderData);
  console.log("view chosen containers data", data);

  useEffect(() => {
    let containers = [];
    props.orderData.map((order) => {
      axios.get("/containers?orderDetailsId=" + order.orderDetailsId).then(
        function (response) {
          console.log("get containers success !");
          containers.push(response.data.containers);
          console.log("view containers", containers);
          setData(containers);
        },
        (error) => {
          console.log("get containers error !", error);
        }
      );
    });
  }, [props.orderData]);

  function flatDeep(arr, d = 1) {
    return d > 0
      ? arr.reduce(
          (acc, val) =>
            acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
          []
        )
      : arr.slice();
  }

  const getMembers = (members) => {
    let children = [];
  
    return members.map(mem => {
      const m = {...mem}; // use spread operator
      if (m.children && m.children.length) {
        children = [...children, ...m.children];
      }
      delete m.children; // this will not affect the original array object
      return m;
    }).concat(children.length ? getMembers(children) : children);
  };

  useEffect(() => {
    if (data) {
      dispatch(hideLoading());
      dispatch({ type: "LOAD_TOTAL_PAGES", payload: data.length });
      console.log("what is the data", data);
      let dataa = [...data];
      // dataa.flat();
      getMembers(dataa)
      console.log("getMembers", getMembers(dataa));
    //   dataa.find((item) => typeof item === "object");

      let newData = [];
      dataa.filter((element) => {
        return {...element}
      })
            console.log("dataaaaa flatt find", dataa);
      let bigCities = data.map(function (e) {
        return e.map(function (el) {
        
            return el
        })
    });

    console.log('bigCities', bigCities)
    //   dataa.map((item, i) => {

    //   });
      dispatch(updateData());
    } else {
      dispatch(hideLoading());
      dispatch(updateData([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.orderData, data]);

  const handleStatus = (confirm) => {
    const containersToUpdate = selectedData.map((container) => {
      return {
        containerNo: container.containerNo,
        containerStatus: confirm ? "available" : "unavailable",
      };
    });

    const selectedContainersNumbers = flattenData(
      containersToUpdate,
      "containerNo"
    );

    dispatch(showLoading());

    axios.put(orderEndpoints.updateContainerStatus, containersToUpdate).then(
      () => {
        dispatch(hideLoading());
        if (confirm) {
          setConfirmedContainers(containersToUpdate.length);
          setAlert(true);
        }
        mutate(`${orderEndpoints.count}?containerStatus=awaiting confirmation`);
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

  const handleEdit = (containerId, updatedObject) => {
    dispatch(showLoading());
    axios
      .put(`${orderEndpoints.updateContainer}/${containerId}`, updatedObject)
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

  let AlertProps = {
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
  };

  let markUnavailableProps = {
    message: "Are you sure you want to mark these containers unavailable ?",
    button1: "Mark Unavailable",
    button2: "Cancel",
    buttonColor: "primary-blue",
    cancelColor: "outline-blue",
  };
  console.log("ViewChosenContainers : tableProps", tableProps);
  return (
    <>
      <HeaderWrapper>
        <Alert {...(alert ? AlertProps : {})} />
        <Button
          tw="w-xxl ml-auto"
          color="primary-blue"
          onClick={() => props.setIsSaved(false)}
        >
          Edit List
        </Button>
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
                  accept={handleStatus}
                />
              }
            />
          </div>
        ) : null}
      </HeaderWrapper>
      <Card tw="p-10">
        <ViewChosenContainersTable
          tableProps={tableProps}
          dispatch={dispatch}
        />
      </Card>
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    count: state.count,
    loggedIn: state.loggedIn,
    loggedInUser: state.loggedInUser,
    loggedOut: state.loggedOut,
    orderData: state.orderData,
    cartData: state.cartData,
    cartDataError: state.cartDataError,
    productData: state.productData,
    updateProduct: state.updateProduct,
    orderDataError: state.orderDataError,
  };
}

const mapDispatchToProps = {
  getOrderDetails,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewChosenContainers);
