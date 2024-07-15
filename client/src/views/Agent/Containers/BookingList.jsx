import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import {
  // ITableProps,
  kaReducer,
  // Table
} from "ka-table";
import { mutate } from "swr";
import {
  closeRowEditors,
  hideLoading,
  saveRowEditors,
  showLoading,
  updateData,
  updateCellValue,
  changeCellValue,
} from "ka-table/actionCreators";
import { ActionType } from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
// import Modal from "../../../common/components/Modal/Modal";
// import Popup from "../../../common/components/Popup";
import { Card, Button, Select, Loader } from "../../../common/styles";
import {
  StyledDownloadIcon as DownloadIcon,
  HeaderTitle,
  HeaderWrapper,
  Line,
  Number,
} from "./common/style";
import { CSVLink } from "react-csv";
import { tableReducer } from "../../../common/components/Table/DataTable";
import { BookingTable, tablePropsInit } from "./common/BookingTable";
import DropdownComponent from "../../../common/components/Dropdown";
import { flattenData } from "../../../common/utils/functions";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import { orderEndpoints } from "../../../common/constants/apiEndpoints";
import axios from "axios";
import {
  deselectAllFilteredRows,
  deselectRow,
  selectAllFilteredRows,
  selectRow,
  selectRowsRange,
  updateFilterRowValue,
  openRowEditors,
  updateEditorValue,
} from "ka-table/actionCreators";
import tw from "twin.macro";

const ViewBookings = (props) => {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [filters, setFilters] = useState({
    page: 1,
    status: "booked",
  });
  const [alert, setAlert] = useState(false);
  const [confirmedContainers, setConfirmedContainers] = useState(0);
  const { loggedInUser } = props;

  const { filterQuery } = useQueryBuilder(filters);

  const { data, isError, isLoading } = useQuery(
    `${orderEndpoints.cart}?${filterQuery}`
  );

  const [bookingData, setBookingData] = useState(data);
  const [isClose, setIsClose] = useState(false);
  // console.log('isError', isError)
  // console.log("BookingList: typeof isError", typeof isError);

  // useEffect(() => {
  //   if (isError && typeof isError === "object")
  //     dispatch(updateData("No items match your search"));
  // }, [isError]);
  // const { data: customerData, isCountError, isCountLoading } = useQuery(
  //   `${customerEndpoints.list}`
  // );

  // const { data: containersCount, isCountError, isCountLoading } = useQuery(
  //   `${containerEndpoints.count}?containerStatus=awaiting confirmation`
  // );
  const selectedData = kaPropsUtils.getSelectedData(tableProps);
  // useEffect(() => {
  //   const selectedData = kaPropsUtils.getSelectedData(tableProps);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const selectedData = kaPropsUtils.areAllFilteredRowsSelected(tableProps);
  // const selectedData = tableProps;
  console.log("BookingList: tablePropsInit", tablePropsInit);
  // console.log('BookingList: selectedData', selectedData)

  // const dispatch = (action) => {
  //   // console.log('BookingList: dispatch action.type', action.type)
  //   changeTableProps((prevState) => kaReducer(prevState, action));
  // };

  async function getBookings() {
    try {
      await axios.get('/locations?agentUid='+loggedInUser.uid)
        .then(function (response) {
          console.log('getBookings locations response.data', response.data);
          axios.get('../orders?page=1&status=booked&originCountry='+response.data.containers[0].country).then(
                  (res) => {
                    console.log('get bookings success !');
                    console.log('get bookings response !', res);
                    setBookingData(res.data)
                  }, (error) => {
                    console.log('get bookings error !', error);
                  }
                )
          // return res.redirect(`${process.env.AUTH_ROUTE_URL}/success`);
        })
        .catch(function (error) {
          console.log('getBookings response error', error);
          // return error.message;
        });
    } catch {
      throw new Error('Bookings Invalidity')
    }
  }

    useEffect(() =>{
      // getBookings()
    }, [])

   // axios
  // .put('/locations?agentUid='+loggedInUser)
  // .then(
  //   (response) => {
  //     axios.put('orders?status='booked'&originCountry='+response.data.containers[0].country).then(
  //       () => {
  //         console.log('booking success !');
  //         getOrderStatus('booked')
  //         setStep(2);
  //       }, (error) => {
  //         console.log('Update Order booking error !', error);
  //       }
  //     )
  //   },
  //   (error) => {
  //     console.log('booking error !', error)
  //   }
  // }

  // axios.get(`/profile`).then((results) => {
  //   dispatch({
  //     type: 'GET_USER_SUCCESS',
  //     loggedInUser: results.data,
  //   })
  // }).catch(error => {
  //   // throw(error)
  //   dispatch({
  //     type: 'GET_USER_SUCCESS',
  //     loggedInUser: null,
  //   })
  // })
  

  useEffect(() => {
    // console.log("useEffect bookingData", bookingData);
    // console.log('useEffect data', data)
    if (isLoading) {
      dispatch(showLoading());
    } else if (data || bookingData) {
      dispatch(hideLoading());
      if (!bookingData && data) {
              // const appendFullNameToAgents = data.agents.map(v => ({...v, fullName: v.firstName+ " "+v.lastName}))
        console.log("!bookingData && data");
        console.log("bookingDate : data object", data);
        // console.log(
        // "bookingDate : typeof bookingDate",
        // typeof data[0].bookingDate
        // );
        // console.log("bookingDate : typeof orderId", typeof data[0].orderId);
        // console.log("bookingDate : typeof orderDate", typeof data[0].orderDate);
        // console.log(
        // "bookingDate : typeof customerUid",
        // typeof data[0].customerUid
        // );
        dispatch({ type: "LOAD_TOTAL_PAGES", payload: data.length });
        const appendFullNameToBuyers = data.map(v => ({...v, fullName: v.customerFirstName+ " "+v.customerLastName}))
        console.log('appendFullNameToBuyers', appendFullNameToBuyers)
        // var date = new Date(); // Will use computers date by default.
        // console.log('booking : date', date); // Wed Jan 01 2014 13:28:56 GMT-1000 (Hawaiian Standard Time)
        // console.log('booking : typeof date', typeof date);
        // var json = JSON.stringify(date);
        // console.log('booking : json', json);  // "2014-01-01T23:28:56.782Z"
        // console.log('booking : json', typeof json);
        //parameters will specify date you put to input
        // var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);
        // console.log('bookingDate : var date = new Date(), date is of type Date => typeof date', typeof date, '& date instanceof Date', date instanceof Date)
        // console.log("bookingDate : typeof date", typeof date);
        // console.log("bookingDate : typeof date 2", date instanceof Date);
        // console.log(
        // 'bookingDate : but typeof bookingDate', typeof data[0].bookingDate, '& bookingDate instanceof Date',
        // data[0].bookingDate instanceof Date, 'hence bookingDate is not of type Date'
        // );
        // console.log('Object.prototype.toString.call(bookingDate)', Object.prototype.toString.call(data[0].bookingDate))
        setBookingData(appendFullNameToBuyers);
        dispatch(updateData(appendFullNameToBuyers));
      } else {
        const appendFullNameToBuyers = bookingData.map(v => ({...v, fullName: v.customerFirstName+ " "+v.customerLastName}))
        // console.log('appendFullNameToBuyers', appendFullNameToBuyers)
        // console.log("not !bookingData && data");
        // console.log("useEffect bookingData");
        setBookingData(bookingData);
        dispatch(updateData(appendFullNameToBuyers));
      }
      // console.log("BookingList: data typeof ", typeof data);
      // console.log("BookingList: data", data);
      // console.log(
      //   "BookingList: data typeof orderDate",
      //   typeof data[0]["orderDate"]
      // );

      // if (!bookingData) dispatch(updateData(data));
      // else
      // dispatch(updateData(bookingData));
    } else {
      dispatch(hideLoading());
      dispatch(updateData([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isLoading, isError, bookingData]);

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
    // console.log("handleEdit updatedObject1", updatedObject);
    const filterQuery = {
      bookingStatus: updatedObject.bookingStatus,
      customsClearanceMethod: "",
      documentStatus: "",
      paymentStatus: updatedObject.paymentStatus,
      status: "booked",
    };
    // console.log("handleEdit updatedObject2", updatedObject);

    var bookingD = [...bookingData];
    var index = bookingD.findIndex(
      (x) => x.orderId === parseInt(updatedObject.orderId)
    );
    if (index === -1) {
    }
    // handle error
    else {
      // console.log("bookingD index", index);
      if (updatedObject.bookingStatus.length > 0)
        bookingD[index].bookingStatus = updatedObject.bookingStatus;
      if (updatedObject.paymentStatus.length > 0)
        bookingD[index].paymentStatus = updatedObject.paymentStatus;
      // console.log("bookingD", bookingD);
      setIsClose(true);
      setBookingData([...bookingD]);
    }

    dispatch(showLoading());
    axios.put("/orders/" + updatedObject.orderId, filterQuery).then(
      (results) => {
        // console.log("results.data", results.data);
        dispatch(hideLoading());
      },
      (error) => {
        dispatch(hideLoading());
        // dispatch(closeRowEditors(containerId));
        //TODO: Replace with Alert
        console.log(error);
      }
    );
  };

  const dispatch = (action) => {
    // console.log("dispatch action", action);
    // changeTableProps((prevState) => tableReducer(prevState, action));
    // console.log("dispatch action.type", action.type);

    switch (action.type) {
      case ActionType.UpdateFilterRowValue:
        let updatedFilters = {};
        switch (action.columnKey) {
          case "bookingDate":
            console.log("it is a date");
            // console.log('bookingDate value', action.filterRowValue)
            // var d = new Date(action.filterRowValue);
            // console.log('new date d', d)
            // var month = d.getMonth(),
            // date = d.getDate(),
            // year = d.getFullYear();
            // console.log('year + month + date', year + '-' + month + '-' +date)
            updatedFilters["bookingDate"] = action.filterRowValue;
            // .toLocaleDateString("en", {
            //   year: "numeric",
            //   month: "2-digit",
            //   day: "2-digit",
            // })
            // .replaceAll("/", "-");
            break;
          case "containerTypeDisplay":
            updatedFilters["containerType"] = action.filterRowValue;
            break;
          case "customerFirstName":
            updatedFilters["customerUid"] = action.filterRowValue;
            break;
          default:
            console.log("dispatch filters", action.filterRowValue);
            updatedFilters[action.columnKey] = action.filterRowValue;
        }
        setFilters({ ...filters, ...updatedFilters });
        changeTableProps((prevState) => tableReducer(prevState, action));
        break;

      case ActionType.UpdatePageIndex:
        setFilters({ ...filters, page: action.pageIndex + 1 });
        changeTableProps((prevState) => tableReducer(prevState, action));
        break;

      case "INTERCEPT_EDIT":
        // console.log("INTERCEPT_EDIT clicked");
        // const containerId = action.rowKeyValue;
        // console.log("INTERCEPT_EDIT containerId");
        // console.log("INTERCEPT_EDIT column");
        changeTableProps((prevState) => {
          // console.log("prevState", prevState);
          let updateObject = {
            orderId: "",
            bookingStatus: "",
            paymentStatus: "",
          };

          prevState.selectedRows
            // .filter(
            //   (cell) =>
            //     console.log("selectedRows cell", cell) ||
            //     (cell.rowKeyValue === containerId &&
            //       cell.columnKey !== "editColumn")
            // )
            .forEach((key, i) => {
              updateObject["orderId"] = key;
              action.column === "bookingStatus"
                ? (updateObject["bookingStatus"] = action.value)
                : (updateObject["paymentStatus"] = action.value);
              handleEdit(key, updateObject);
            });
          return tableReducer(prevState, action);
        });
        break;

      default:
        changeTableProps((prevState) => tableReducer(prevState, action));
    }
  };

  console.log("BookingList: tableProps", tableProps);
  // console.log("BookingList: filters", filters);
  // if (bookingData && bookingData[0].bookingDate) {
  //   console.log("bookingData", bookingData);
  //   console.log("bookingData date", bookingData[0].bookingDate);
  //   console.log("bookingData typeof date", typeof bookingData[0].bookingDate);
  // }
  // console.log(
  //   "BookingList: selectedData",
  //   kaPropsUtils.getSelectedData(tableProps)
  // );
  // console.log("BookingList: kaPropsUtils", kaPropsUtils);
  // console.log('customerData', customerData)
  // console.log("tableProps.selectedRows", tableProps.selectedRows);
  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          Bookings
          <Line />
          <Number>{tableProps && tableProps.data.length}</Number>
          <CSVLink
            data={kaPropsUtils.getData(tableProps)}
            headers={tableProps.columns.map((c) => ({
              label: c.title,
              key: c.key,
            }))}
            filename="bookings.data.csv"
          >
            <DownloadIcon />
          </CSVLink>
        </HeaderTitle>
        {tableProps.selectedRows && tableProps.selectedRows.length ? (
          <div tw="grid grid-cols-2ColAuto h-minContent">
            <DropdownComponent
              aria-label="Menu"
              isClose={isClose}
              disclosure={
                <Button tw="flex" onClick={() => setIsClose(false)}>
                  <h1 tw="text-primary-blue text-15">Change Booking Status </h1>
                  <svg
                    style={{ width: 15 }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              }
              items={[
                <option
                  value="none"
                  tw="text-13"
                  onClick={() => {
                    // setCloseDropdown(true);
                    dispatch({
                      type: "INTERCEPT_EDIT",
                      column: "bookingStatus",
                      value: "none",
                      //   // rowKeyValue,
                    });
                    // dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
                  }}
                >
                  None
                </option>,
                <option
                  value="ready for pick up"
                  tw="text-13"
                  onClick={() => {
                    dispatch({
                      type: "INTERCEPT_EDIT",
                      column: "bookingStatus",
                      value: "ready for pick up",
                      //   // rowKeyValue,
                    });
                    // dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
                  }}
                >
                  Ready for Pick up
                </option>,
                <option
                  value="picked up"
                  tw="text-13"
                  onClick={() => {
                    dispatch({
                      type: "INTERCEPT_EDIT",
                      column: "bookingStatus",
                      value: "picked up",
                      //   // rowKeyValue,
                    });
                    // dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
                  }}
                >
                  Picked up
                </option>,
              ]}
            ></DropdownComponent>
            <DropdownComponent
              aria-label="Menu"
              isClose={isClose}
              disclosure={
                <Button tw="flex" onClick={() => setIsClose(false)}>
                  <h1 tw="text-primary-blue text-15">Change Payment Status </h1>
                  <svg
                    style={{ width: 15 }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </Button>
              }
              items={[
                <option
                  value="none"
                  tw="text-13"
                  onClick={() => {
                    dispatch({
                      type: "INTERCEPT_EDIT",
                      column: "documentStatus",
                      value: "none",
                      //   // rowKeyValue,
                    });
                    // dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
                  }}
                >
                  None
                </option>,
                <option
                  value="invoice sent"
                  tw="text-13"
                  onClick={() => {
                    dispatch({
                      type: "INTERCEPT_EDIT",
                      column: "documentStatus",
                      value: "invoice sent",
                      //   // rowKeyValue,
                    });
                    // dispatch(updateCellValue(rowKeyValue, column.key, editorValue));
                  }}
                >
                  Invoice Sent
                </option>,
              ]}
            ></DropdownComponent>
          </div>
        ) : null}
      </HeaderWrapper>
      <Card>
        <BookingTable tableProps={tableProps} dispatch={dispatch} />
      </Card>
    </>
  );
};

function mapStateToProps(state, props) {
  return {
    loggedInUser: state.loggedInUser,
  }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewBookings);