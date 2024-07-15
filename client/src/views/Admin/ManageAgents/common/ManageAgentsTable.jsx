import React from "react";
import {
  StyledDownloadIcon as DownloadIcon,
  HeaderTitle,
  HeaderWrapper,
  Line,
  Number,
} from "./style";
import { CSVLink } from "react-csv";
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
  FilteringMode,
  SortDirection,
  PagingPosition,
  EditingMode,
} from "ka-table/enums";
import { kaPropsUtils } from "ka-table/utils";
import { DispatchFunc } from "ka-table/types";
import { openEditor } from "ka-table/actionCreators";
import { ICellTextProps } from "ka-table/props";
import Modal from "../../../../common/components/Modal/Modal";
import { Text } from "../../../../common/styles";
import currencies from "../../../../common/constants/currencies";
import { CONTAINERS_PAGE_SIZE } from "../../../../common/constants/settings";
import { BuyerProfileIcon } from "../../../../assets/icons";
import ArrowUpIcon from "../../../../assets/icons/Arrow/Up.svg";
import ArrowDownIcon from "../../../../assets/icons/Arrow/Down.svg";
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

const DownloadButton = ({ data, headers, filename, value }) => {
  return (
    <div tw="grid grid-cols-agentDepots text-primary-blue">
      <span tw="overflow-ellipsis overflow-hidden">{value}</span>
      <CSVLink data={data} headers={headers} filename={filename} tw="ml-2.5">
        <DownloadIcon />
      </CSVLink>
    </div>
  );
};

const CustomCell = ({ rowData, value }) => {
  return (
    <div>
      {value} {currencies[rowData.containerCurrency]}
    </div>
  );
};

const CustomImageCell = ({ value }) => {
  return (
    // <Modal width="445px"
    //   height="334px"
    //   titleFontSize="21px"
    //   component={<>
    //     <BuyerProfileIcon tw="w-5 inline mr-2" alt='Buyer Profile' />
    //     <span>{value}</span>
    //   </>
    //   }
    //   title={
    <>
      <span>{value}</span>
    </>
    //   }
    //   children={""}
    // />
  );
};

const StyleText = (text) => {
  switch (text) {
    case "Not Ready":
    case "None":
    case "Buyer / Not Uploaded":
    case "Not Uploaded":
      return "gray";

    case "Invoice Sent":
      return "yellow";

    case "Picked up":
    case "Paid":
    case "Uploaded / Validated":
      return "green";

    case "Uploaded / Not Validated":
      return "blue";

    case "Ready for pick up":
      return "orange";

    case "Storage overdue":
      return "red";

    default:
    // code block
  }
};

const dataArray = [
  {
    id: 1,
    name: "Frank Delfino",
    email: "F.delfino@cma-cgm.com",
    phone: "+39 45612847",
    date: new Date(2019, 21, 8),
    depotsAssigned: "FrankDelfino_Depots",
  },
  {
    id: 2,
    name: "Annalise Keating",
    email: "A.Keating@cma-cgm.com",
    phone: "+39 45612847",
    date: new Date(2019, 21, 8),
    depotsAssigned: "AnnaliseKeating_Depots",
  },
  {
    id: 3,
    name: "Wes Gibbons",
    email: "W.gibbons@cma-cgm.com",
    phone: "+39 45612847",
    date: new Date(2019, 21, 8),
    depotsAssigned: "WesGibbons_Depots",
  },
  {
    id: 4,
    name: "Michaela Pratt",
    email: "M.Pratt@cma-cgm.com",
    phone: "+39 45612847",
    date: new Date(2019, 21, 8),
    depotsAssigned: "MichaelaPratt_Depots",
  },
  {
    id: 5,
    name: "Gabriel Maddox",
    email: "G.maddox@cma-cgm.com",
    phone: "+39 45612847",
    date: new Date(2019, 21, 8),
    depotsAssigned: "GabrielMaddox_Depots",
  },
];

const tablePropsInit = {
  columns: [
    { key: "selection-cell", isEditable: false },
    {
      key: "fullName",
      title: "Name",
      dataType: DataType.String,
      sortDirection: SortDirection.Ascend,
    },
    { key: "email", title: "Email", dataType: DataType.String },
    { key: "phoneNumber", title: "Phone Number", dataType: DataType.String },
    {
      key: "created",
      title: "Date Added",
      dataType: DataType.Date,
    },
    // { key: 'depotsAssigned', title: 'Depots Assigned', dataType: DataType.String },
    { key: "none", title: "Depots Assigned", dataType: DataType.String },
    { key: "editColumn", title: "Actions" },
  ],
  data: [],
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: CONTAINERS_PAGE_SIZE,
    // pageSize: 3,
    pageSizes: [15, 30, 45],
    // position: PagingPosition.Bottom
  },
  // loading: {
  //   enabled: false,
  // },
  filteringMode: FilteringMode.FilterRow,
  format: ({ column, value }) => {
    // console.log('format tablePropsInit column.key', column.key)
    // console.log('format tablePropsInit value', value)
    // if (column.key === 'bookingTotalAmount'){
    //     return `$${value}`;
    //     // console.log('inside format ${value}', value)
    //     // return 'no value';
    //   }
    if (column.dataType === DataType.Date) {
      return (
        value &&
        value.toLocaleDateString("en", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        })
      );
    }
  },
  rowKeyField: "id",
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

const ManageAgentsTable = ({ tableProps, dispatch }) => {
  return (
    <div>
      {/* <Table
        {...tableProps}
        data={dataArray}
        dispatch={dispatch}
        /> */}
      <DataTable
        {...tableProps}
        childComponents={{
          cellText: {
            content: (props) => {
              // console.log("cellText props", props);
              if (props.column.key === "selection-cell") {
                return <SelectionCell {...props} />;
              }
              if (props.column.key === "editColumn") {
                return <EditButton agent={props.rawData} {...props} />;
                return <EditButton agent={props.rawData} {...props} />;
              }
              if (props.column.key === "name") {
                return <CustomImageCell {...props} />;
              }
              // if (props.column.key === "depotsAssigned") {
              //   return
              //    <DownloadButton
              //     data={kaPropsUtils.getData(tableProps)}
              //     headers={tableProps.columns.map((c) => ({
              //       label: c.title,
              //       key: c.key,
              //     }))}
              //     filename="depots_assigned.csv"
              //     {...props}
              //   />
              // }
              // if (props.column.key === "bookingTotalAmount") {
              //   return <CustomCell {...props} />;
              // }
              // if (props.column.key === "depotsAssigned" || props.column.key === "bookingStatus" || props.column.key === "bookingPaymentStatus") {
              //   return <CustomCellStyle {...props} />;
              // }
            },
          },
          cellEditor: {
            content: (props) => {
              // code
            },
          },
          filterRowCell: {
            content: (props) => {
              switch (props.column.key) {
                case "selection-cell":
                case "editColumn":
                case "phone":
                case "depotsAssigned":
                case "phoneNumber":
                case "none":
                  return <></>;
                case "date":
                case "created":
                  return (
                    <DateEditor
                      // options={flattenData(containersData["condition"])}
                      options={["21/10/2020"]}
                      {...props}
                    />
                  );
                default:
                  return <SearchEditor {...props} />;
              }
            },
          },
          headCell: {
            content: (props) => {
              // code
            },
          },
        }}
        dispatch={dispatch}
      />
    </div>
  );
};

export { ManageAgentsTable, tablePropsInit };
