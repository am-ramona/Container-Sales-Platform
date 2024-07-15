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
  CustomNumberEditor,
  RangeEditor,
} from "../../../../common/components/Table/DataTable";
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


const tablePropsInit = {
  columns: [
    {
      key: "selection-cell",
      isEditable: false,
    },
    {
      key: "containerNo",
      title: "Container ID",
      dataType: DataType.String,
      isEditable: false,
    },
    {
      key: "containerTypeDisplay",
      title: "Type",
      dataType: DataType.String,
      isEditable: false,
      sortDirection: SortDirection.Ascend 
    },
    {
      key: "containerCondition",
      title: "Condition",
      dataType: DataType.String,
      isEditable: false,
    },
    {
      key: "containerSize",
      title: "Size",
      dataType: DataType.String,
      isEditable: false,
    },
    {
      key: "containerAge",
      title: "Age",
      dataType: DataType.Number,
      isEditable: false,
      filterRowOperator: "<=",
      filterRowValue: 100,
    },
    {
      key: "containerPrice",
      title: "Price",
      dataType: DataType.Number,
      isEditable: false,
      filterRowOperator: "<=",
      filterRowValue: 30000,
    }
  ],
  loading: {
    enabled: false,
  },
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: CONTAINERS_PAGE_SIZE,
  },
  data: [],
  rowKeyField: "containerNo",
  sortingMode: SortingMode.Single,
  filteringMode: FilteringMode.FilterRow,
};

const ViewChosenContainersTable = ({tableProps, dispatch}) => {
  return (
    <DataTable
      {...tableProps}
      childComponents={{
        cellText: {
          content: (props) => {
            if (props.column.key === "selection-cell") {
              return <SelectionCell {...props} />;
            }
            if (props.column.key === "containerPrice") {
              return <CustomCell {...props} />;
            }
          },
        },
        cellEditor: {
          content: (props) => {
            switch (props.column.key) {
              case "containerCondition":
                return (
                  <CustomEditor
                    options={flattenData(containersData["condition"])}
                    {...props}
                  />
                );
              case "containerPrice":
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
              case "containerAge":
              case "containerPrice":
                return <RangeEditor {...props} />;
              case "containerSize":
                return (
                  <SelectEditor
                    options={flattenData(containersData["size"])}
                    {...props}
                  />
                );
              case "containerTypeDisplay":
                return (
                  <SelectEditor
                    options={flattenData(containersData["type"])}
                    {...props}
                  />
                );
              case "containerCondition":
                return (
                  <SelectEditor
                    options={flattenData(containersData["condition"])}
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

export { ViewChosenContainersTable, tablePropsInit } ;
