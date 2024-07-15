import React from "react";
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
  DateEditor
} from "./BookingTable";
import {
  DataType,
  FilteringMode,
  SortDirection, 
  SortingMode,
} from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import currencies from "../../../../common/constants/currencies";
import containersData from "../../../../common/constants/containers";
import { flattenData } from "../../../../common/utils/functions";
import { CONTAINERS_PAGE_SIZE } from "../../../../common/constants/settings";

const CustomCell = ({
  rowData,
  value
}) => {

  return (
    <div >
      {value}  {currencies[rowData.containerCurrency]}
    </div>
  );
};

const styleText = (text) => {

    switch(text) {
      case 'Not Ready':
      case 'Buyer / Not Uploaded':
      case 'Not Uploaded':
        return "gray"

      case 'Invoice Sent':
        return "yellow"

      case 'Picked up':
      case 'Paid':
      case 'Uploaded / Validated':
        return "green"

      default:
        // code block
    }  

  }

const dataArray = [
  { 
    refNo: 4569, 
    bookingQuantity: 8, 
    bookingBuyer: 'Bette Ross', 
    bookingTotalAmount: 1800, 
    bookingDate: new Date(2021, 10, 9),
    bookingDocuments: styleText('Not Uploaded'),
    bookingStatus: 'None',
    bookingPaymentStatus: 'None'
  },
  { 
    refNo: 7721, 
    bookingQuantity: 10, 
    bookingBuyer: 'John Doe', 
    bookingTotalAmount: 1400, 
    bookingDate: new Date(2021, 10, 8),
    bookingDocuments: styleText('Not Uploaded'),
    bookingStatus: 'None',
    bookingPaymentStatus: 'Invoice Sent'
  },
  { 
    refNo: 9071, 
    bookingQuantity: 1, 
    bookingBuyer: 'Joe Gil', 
    bookingTotalAmount: 900, 
    bookingDate: new Date(2021, 11, 8),
    bookingDocuments: styleText('Uploaded / Not Validated'),
    bookingStatus: 'ready for pick up',
    bookingPaymentStatus: 'Paid'
  },
  { 
    refNo: 5237, 
    bookingQuantity: 3, 
    bookingBuyer: 'Rose Smith', 
    bookingTotalAmount: 1000, 
    bookingDate: new Date(2021, 12, 9),
    bookingDocuments: styleText('Uploaded / Validated'),
    bookingStatus: 'Storage overdue',
    bookingPaymentStatus: 'Paid'
  },
  {
    refNo: 8234, 
    bookingQuantity: 3, 
    bookingBuyer: 'Noami Sul', 
    bookingTotalAmount: 1000, 
    bookingDate: new Date(2021, 11, 12),
    bookingDocuments: styleText('Uploaded / Validated'),
    bookingStatus: 'Picked up',
    bookingPaymentStatus: 'Paid'
  },
];

const tablePropsInit = {
  columns: [
    {
      key: "selection-cell",
      isEditable: false,
    },
    { key: 'refNo', title: 'Ref.#', dataType: DataType.String, isEditable: false, },
    { key: 'bookingQuantity', 
      title: 'Qty', 
      dataType: DataType.Number, 
      sortDirection: SortDirection.Descend, 
      // filterRowValue: 30000, 
      isEditable: true,
      filterRowOperator: "<="
    },
    { key: 'bookingBuyer', title: 'Buyer', dataType: DataType.String, isEditable: true, },
    { key: 'bookingTotalAmount', 
      title: 'Total Amount', 
      dataType: DataType.Number,
      // filterRowValue: 30000, 
      isEditable: true,
      filterRowOperator: "<=" },
    {
      dataType: DataType.Date,
      key: 'bookingDate',
      title: 'date Booked',
    },
    { key: 'bookingDocuments', title: 'Documents', dataType: DataType.String, isEditable: false, },
    { key: 'bookingStatus', title: 'Booking Status', dataType: DataType.String, isEditable: true, },
    { key: 'bookingPaymentStatus', title: 'Payment Status', dataType: DataType.String },
    { key: "editColumn" },
  ],
  loading: {
    enabled: true,
  },
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: CONTAINERS_PAGE_SIZE,
  },
  data: dataArray,
  rowKeyField: "refNo",
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
};

// const BookingTable = ({...props}) => {
//   console.log('BookingTable: ...props', props)
//   return "inside booking table"
// }

// const TableProps={
//   "columns": [
//     {
//       "key": "selection-cell",
//       "isEditable": false
//     },
//     {
//       "key": "refNo",
//       "title": "Ref.#",
//       "dataType": "string",
//       "isEditable": false
//     },
//     {
//       "key": "bookingQuantity",
//       "title": "Qty",
//       "dataType": "number",
//       "sortDirection": "descend",
//       "filterRowValue": 30000,
//       "isEditable": true,
//       "filterRowOperator": "<="
//     },
//     {
//       "key": "bookingBuyer",
//       "title": "Buyer",
//       "dataType": "string",
//       "isEditable": true
//     },
//     {
//       "key": "bookingTotalAmount",
//       "title": "Total Amount",
//       "dataType": "number",
//       "filterRowValue": 30000,
//       "isEditable": true,
//       "filterRowOperator": "<="
//     },
//     {
//       "dataType": "date",
//       "key": "bookingDate",
//       "title": "date Booked"
//     },
//     {
//       "key": "bookingDocuments",
//       "title": "Documents",
//       "dataType": "string",
//       "isEditable": false
//     },
//     {
//       "key": "bookingStatus",
//       "title": "Booking Status",
//       "dataType": "string",
//       "isEditable": true
//     },
//     {
//       "key": "bookingPaymentStatus",
//       "title": "Payment Status",
//       "dataType": "string"
//     },
//     {
//       "key": "editColumn"
//     }
//   ],
//   "loading": {
//     "enabled": false
//   },
//   "paging": {
//     "enabled": true,
//     "pageIndex": 0,
//     "pageSize": 50
//   },
//   "data": [
//     {
//       "id": 1,
//       "refNo": 4569,
//       "bookingQuantity": 8,
//       "bookingBuyer": "Bette Ross",
//       "bookingTotalAmount": 1800,
//       "bookingDate": "2021-11-08T22:00:00.000Z",
//       "bookingDocuments": "Not Uploaded",
//       "bookingStatus": "None",
//       "bookingPaymentStatus": "None"
//     },
//     {
//       "id": 2,
//       "refNo": 7721,
//       "bookingQuantity": 10,
//       "bookingBuyer": "John Doe",
//       "bookingTotalAmount": 1400,
//       "bookingDate": "2021-11-07T22:00:00.000Z",
//       "bookingDocuments": "Not Uploaded",
//       "bookingStatus": "None",
//       "bookingPaymentStatus": "Invoice Sent"
//     },
//     {
//       "id": 3,
//       "refNo": 9071,
//       "bookingQuantity": 1,
//       "bookingBuyer": "Joe Gil",
//       "bookingTotalAmount": 900,
//       "bookingDate": "2021-12-07T22:00:00.000Z",
//       "bookingDocuments": "Uploaded / Not Validated",
//       "bookingStatus": "ready for pick up",
//       "bookingPaymentStatus": "Paid"
//     },
//     {
//       "id": 4,
//       "refNo": 5237,
//       "bookingQuantity": 3,
//       "bookingBuyer": "Rose Smith",
//       "bookingTotalAmount": 1000,
//       "bookingDate": "2022-01-08T22:00:00.000Z",
//       "bookingDocuments": "Uploaded / Validated",
//       "bookingStatus": "Storage overdue",
//       "bookingPaymentStatus": "Paid"
//     },
//     {
//       "id": 5,
//       "refNo": 8234,
//       "bookingQuantity": 3,
//       "bookingBuyer": "Noami Sul",
//       "bookingTotalAmount": 1000,
//       "bookingDate": "2021-12-11T22:00:00.000Z",
//       "bookingDocuments": "Uploaded / Validated",
//       "bookingStatus": "Picked up",
//       "bookingPaymentStatus": "Paid"
//     },
//   ],
//   "rowKeyField": "id",
//   "sortingMode": "single",
//   "filteringMode": "filterRow"
// }

const BookingTable = ({tableProps, dispatch}) => {
  console.log('BookingTable: tableProps', tableProps)
  console.log('BookingTable: TableProps', TableProps)
  return (
    <DataTable
      {...tableProps}
      // {...TableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === "selection-cell") {
              return <SelectionCell {...props} />;
            }
            if (props.column.key === "editColumn") {
              return <BookingButton {...props} />;
            }
            if (props.column.key === "bookingQuantity") {
              return <CustomCell {...props} />;
            }
          },
        },
        cellEditor: {
          content: (props) => {
            switch (props.column.key) {
              case "editColumn":
                return <SaveButton {...props} />;
              // case "containerCondition":
              //   return (
              //     <CustomEditor
              //       options={flattenData(containersData["condition"])}
              //       {...props}
              //     />
              //   );
              case "bookingQuantity":
                return <CustomNumberEditor {...props} />;
              default:
                return;
            }
          },
        },
        filterRowCell: {
          content: (props) => {
            switch (props.column.key) {
              case "selection-cell":
              case "editColumn":
                return <></>;
              case "bookingTotalAmount":
              case "bookingQuantity":
                return <RangeEditor {...props} />;
              // case "bookingBuyer":
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
              case 'bookingDate':
                return (
                  <DateEditor
                    // options={flattenData(containersData["condition"])}
                    options={['21/10/2020']}
                    {...props}
                  />
                );

              case "bookingStatus":
                return (
                  <SelectEditor
                    // options={flattenData(containersData["condition"])}
                    options={['None', 'Ready for pick up', 'Storage overdue', 'Picked up']}
                    {...props}
                  />
                );
              case "bookingPaymentStatus":
                return (
                  <SelectEditor
                    // options={flattenData(containersData["condition"])}
                    options={['None', 'Invoice Sent', 'Paid']}
                    {...props}
                  />
                );
                case "bookingDocuments":
                  return (
                    <SelectEditor
                      // options={flattenData(containersData["condition"])}
                      options={['Not Uploaded', 'Uploaded / Not validated', 'Uploaded / Validated']}
                      {...props}
                    />
                  );
              // case "bookingPaymentStatus":
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
  );
};

export { BookingTable, tablePropsInit } ;
