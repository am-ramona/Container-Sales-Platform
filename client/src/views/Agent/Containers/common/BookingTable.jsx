import React from "react";
import { ITableProps, kaReducer, Table } from "ka-table";
import {
  DataTable,
  SelectionCell,
  SelectionHeader,
  SelectEditor,
  SearchEditor,
  SaveButton,
  EditButton,
  CustomEditor,
  BookingButton,
  CustomNumberEditor,
  RangeEditor,
  DateEditor,
} from "./DataTable";
import {
  DataType,
  ActionType,
  FilteringMode,
  SortDirection,
  EditingMode,
  SortingMode,
} from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import { DispatchFunc } from "ka-table/types";
import {
  openEditor,
  loadData,
  updateData,
  closeRowEditors,
  hideLoading,
  saveRowEditors,
  showLoading,
} from "ka-table/actionCreators";
import { ICellTextProps } from "ka-table/props";
import Modal from "../../../../common/components/Modal/Modal";
import { Text } from "../../../../common/styles";
import currencies from "../../../../common/constants/currencies";
import { CONTAINERS_PAGE_SIZE } from "../../../../common/constants/settings";
import { Loader } from "../../../../common/styles";
import { BuyerProfileIcon } from "../../../../assets/icons";
import useQuery from "../../../../common/hooks/api/useQuery";
import { customerEndpoints } from "../../../../common/constants/apiEndpoints";
import tw from "twin.macro";

// const CustomCellStyle = ({
//   column,
//   dispatch,
//   rowKeyValue,
//   value,
// }) => {
//   return (
//     <div onClick={() => {
//       dispatch(openEditor(rowKeyValue, column.key));
//     }} className={value ? 'custom-cell-demo-loyal' : 'custom-cell-demo-no-loyal'}>
//       {value ? 'Loyal Program Member' : 'No Loyal Programm'}
//     </div>
//   );
// };

const CustomCell = ({ rowData, value }) => {
  return (
    <div>
      {value} {currencies[rowData.containerCurrency]}
    </div>
  );
};

const BuyerProfile = (name) => {
  // console.log('BuyerProfile name', name)
  const {
    data: customerData,
    isError,
    isLoading,
  } = useQuery(`${customerEndpoints.list}`);
  // console.log('BuyerProfile customerData', customerData)

  return isLoading ? (
    <Loader format="smaller" />
  ) : isError ? (
    "error"
  ) : (
    customerData &&
    customerData.map((buyer) => {
      return (
        buyer &&
        buyer.customerFirstName === name.name && (
          <div tw="text-lg text-left px-9 pt-41">
            <div tw="grid grid-cols-2 pb-25">
              <span tw="font-medium">User ID</span>
              <span tw="font-normal">{buyer.customerUid}</span>
            </div>
            <div tw="grid grid-cols-2 pb-25">
              <span tw="font-medium">Email</span>
              <span tw="font-normal">{buyer.customerEmail}</span>
            </div>
            <div tw="grid grid-cols-2">
              <span tw="font-medium">Phone Number</span>
              <span tw="font-normal">{buyer.customerMobile}</span>
            </div>
          </div>
        )
      );
    })
  );
};

const CustomImageCell = ({ value }) => {
  console.log("CustomImageCell value", value);
  return (
    <Modal
      width="445px"
      height="334px"
      titleFontSize="21px"
      component={
        <>
          <BuyerProfileIcon tw="w-5 inline mr-2" alt="Buyer Profile" />
          <span>{value}</span>
        </>
      }
      title={
        <>
          <BuyerProfileIcon tw="w-20 h-20 inline mr-41" alt="Buyer Profile" />
          <span>{value}</span>
        </>
      }
      children={<BuyerProfile name={value} />}
    />
  );
};

const StyleText = (text) => {
  switch (text) {
    case "not ready":
    case "none":
    case "buyer not uploaded":
    case "not uploaded":
      return "gray";

    case "invoice sent":
      return "yellow";

    case "picked up":
    case "paid":
    case "uploaded / validated":
      return "green";

    case "uploaded not validated":
      return "blue";

    case "ready for pick up":
      return "orange";

    case "storage overdue":
      return "red";

    default:
    // code block
  }
};

const dataArray = [
  {
    id: 1,
    orderId: 4569,
    // bookingQuantity: 8,
    customerFirstName: "Bette Ross",
    amount: 1800,
    bookingDate: new Date(2021, 10, 9),
    documentStatus: "Not Uploaded",
    bookingStatus: "None",
    paymentStatus: "None",
  },
  {
    id: 2,
    orderId: 7721,
    // bookingQuantity: 10,
    customerFirstName: "John Doe",
    amount: 1400,
    bookingDate: new Date(2021, 10, 8),
    documentStatus: "Not Uploaded",
    bookingStatus: "None",
    paymentStatus: "Invoice Sent",
  },
  {
    id: 3,
    orderId: 9071,
    // bookingQuantity: 1,
    customerFirstName: "Joe Gil",
    amount: 900,
    bookingDate: new Date(2021, 11, 8),
    documentStatus: "Uploaded / Not Validated",
    bookingStatus: "Ready for pick up",
    paymentStatus: "Paid",
  },
  {
    id: 4,
    orderId: 5237,
    // bookingQuantity: 3,
    customerFirstName: "Rose Smith",
    amount: 1000,
    bookingDate: new Date(2021, 12, 9),
    documentStatus: "Uploaded / Validated",
    bookingStatus: "Storage overdue",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    orderId: 8234,
    // bookingQuantity: 3,
    customerFirstName: "Noami Sul",
    amount: 1000,
    bookingDate: new Date(2021, 11, 12),
    documentStatus: "Uploaded / Validated",
    bookingStatus: "Picked up",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    orderId: 8234,
    // bookingQuantity: 3,
    customerFirstName: "Noami Sul",
    amount: 1000,
    bookingDate: new Date(2021, 11, 12),
    documentStatus: "Uploaded / Validated",
    bookingStatus: "Picked up",
    paymentStatus: "Paid",
  },
  {
    id: 5,
    orderId: 8234,
    // bookingQuantity: 3,
    customerFirstName: "Noami Sul",
    amount: 1000,
    bookingDate: new Date(2021, 11, 12),
    documentStatus: "Uploaded / Validated",
    bookingStatus: "Picked up",
    paymentStatus: "Paid",
  },
];

// let Quantities = dataArray.map(({ bookingQuantity }) => bookingQuantity)
let TotalAmounts = dataArray.map(({ amount }) => amount);

Array.prototype.max = function () {
  return Math.max.apply(null, this);
};

Array.prototype.min = function () {
  return Math.min.apply(null, this);
};

const tablePropsInit = {
  columns: [
    { key: "selection-cell", isEditable: false },
    {
      key: "orderId",
      title: "Ref.#",
      dataType: DataType.String,
      sortDirection: SortDirection.Ascend,
    },
    // { key: 'bookingQuantity', title: 'Qty', dataType: DataType.String, sortDirection: SortDirection.Ascend },
    // the used one
    // { key: 'bookingQuantity', title: 'Qty', dataType: DataType.Number, isEditable: false,
    // filterRowOperator: "<=", filterRowValue: Quantities.max(), max: Quantities.max() },
    { key: "fullName", title: "Buyer", dataType: DataType.String },
    {
      key: "amount",
      title: "Total Amount",
      dataType: DataType.Number,
      isEditable: false,
      filterRowOperator: "<=", //filterRowValue: TotalAmounts.max(), max: TotalAmounts.max()
      filterRowValue: 100000,
      max: 100000,
    },
    {
      key: "bookingDate",
      title: "date Booked",
      dataType: DataType.String,
    },
    { key: "documentStatus", title: "Documents", dataType: DataType.String },
    {
      key: "bookingStatus",
      title: "Booking Status",
      dataType: DataType.String,
      isEditable: true,
    },
    {
      key: "paymentStatus",
      title: "Payment Status",
      dataType: DataType.String,
      isEditable: true,
    },
    { key: "editColumn" },
  ],
  data: [],
  loading: {
    enabled: true,
  },
  // paging: {
  //   enabled: true,
  //   pageIndex: 0,
  //   pageSize: CONTAINERS_PAGE_SIZE,
  //   pageSizes: [15, 30, 45],
  //   // position: PagingPosition.Bottom
  // },
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 5,
    pageSizes: [5, 10, 15],
  },
  rowKeyField: "orderId",
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
  // editableCells: [{ columnKey: 'bookingStatus' }],
  // editingMode: EditingMode.Cell,
  // singleAction: loadData(),

  format: ({ column, value }) => {
    // console.log('format tablePropsInit column.key', column.key)
    // console.log('format tablePropsInit value', value)
    // if (column.key === 'amount') {
    //   return `$${value}`;
    // console.log('inside format ${value}', value)
    // return 'no value';
    // }
    // if (column.dataType === DataType.Date) {
    //   return value && value.toLocaleDateString('en', { month: '2-digit', day: '2-digit', year: 'numeric' });
    // }
  },
};

const CustomCellStyle = ({
  column,
  dispatch,
  rowKeyValue,
  value,
  ...props
}) => {
  return (
    //   <div className={value ? 'custom-cell-demo-loyal' : 'custom-cell-demo-no-loyal'}>
    //     {value ? 'Loyal Program Member' : 'No Loyal Program'}
    //   </div>  padding-left: 9px;  width: -moz-fit-content; padding-right: 10px;
    <Text tw="px-2.5 w-max" color={StyleText(value)}>
      {value}
    </Text>
  );
};

const BookingTable = ({ tableProps, dispatch }) => {
  // console.log('BookingTable: tableProps.data', tableProps.data)
  return (
    <div>
      {/* <Table
        {...tableProps}
        data={dataArrayy}
        dispatch={dispatch}
        /> */}
      <DataTable
        {...tableProps}
        // data={dataArrayy}
        childComponents={{
          cellText: {
            content: (props) => {
              console.log("cellText props", props);
              if (props.column.key === "selection-cell") {
                return <SelectionCell {...props} />;
              }
              if (props.column.key === "editColumn") {
                return (
                  <BookingButton
                    name={
                      props.rowData.documentStatus === "Uploaded / Validated" &&
                      props.rowData.paymentStatus === "Paid" &&
                      props.rowData.bookingStatus === "Picked up"
                        ? "View"
                        : "Manage"
                    }
                    {...props}
                  />
                );
              }
              if (props.column.key === "customerFirstName") {
                return <CustomImageCell {...props} />;
              }
              if (props.column.key === "amount") {
                return <CustomCell {...props} />;
              }
              if (
                props.column.key === "documentStatus" ||
                props.column.key === "bookingStatus" ||
                props.column.key === "paymentStatus"
              ) {
                return <CustomCellStyle {...props} />;
              }
            },
          },
          cellEditor: {
            content: (props) => {
              // code switch props.column.key
            },
          },
          filterRowCell: {
            content: (props) => {
              switch (props.column.key) {
                case "selection-cell":
                case "editColumn":
                  return <></>;
                case "amount":
                case "bookingQuantity":
                  return <RangeEditor {...props} />;
                // case "customerFirstName":
                //   return (
                //     <SelectEditor
                //       // options={flattenData(containersData["size"])}
                //       // {...props}
                //     />
                //   );
                // case "bookingDocuments":
                //   return (
                //     <SelectEditor
                //       // options={flattenData(containersData["type"])}
                //       {...props}
                //     />
                //   );
                case "bookingDate":
                  return (
                    <DateEditor
                      // options={flattenData(containersData["condition"])}
                      options={["21/10/2020"]}
                      {...props}
                    />
                  );
                case "documentStatus":
                case "bookingDocuments":
                  return (
                    <SelectEditor
                      // options={flattenData(containersData["condition"])}
                      options={[
                        "Not Uploaded",
                        "Uploaded / Not Validated",
                        "Uploaded / Validated",
                      ]}
                      {...props}
                    />
                  );

                case "bookingStatus":
                  return (
                    <SelectEditor
                      // options={flattenData(containersData["condition"])}
                      options={[
                        "None",
                        "Ready for pick up",
                        "Storage overdue",
                        "Picked up",
                      ]}
                      {...props}
                    />
                  );
                case "paymentStatus":
                  return (
                    <SelectEditor
                      // options={flattenData(containersData["condition"])}
                      options={[
                        "None",
                        "Invoice Sent",
                        "Awaiting Validation",
                        "Paid",
                      ]}
                      {...props}
                    />
                  );
                // case "paymentStatus":
                //   return (
                //     <SelectEditor
                //        options={[]}
                //       {...props}
                //     />
                //   );
                default:
                  return <SearchEditor {...props} />;
              }
            },
          },
          headCell: {
            content: (props) => {
              if (props.column.key === "selection-cell") {
                return (
                  <SelectionHeader
                    {...props}
                    areAllRowsSelected={kaPropsUtils.areAllFilteredRowsSelected(
                      tableProps
                    )}
                  />
                );
              }
            },
          },
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export { BookingTable, tablePropsInit };
