import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Table, kaReducer } from "ka-table";
import {
  deselectAllFilteredRows,
  deselectRow,
  selectAllFilteredRows,
  selectRow,
  selectRowsRange,
  updateFilterRowValue,
  closeRowEditors,
  openRowEditors,
  updateEditorValue,
} from "ka-table/actionCreators";
import { kaDateUtils } from "ka-table/utils";
import { Select, Checkbox, Input, Button } from "../../../../common/styles";
import Modal from "../../../../common/components/Modal/Modal";
import Popup from "../../../../common/components/Popup";
import { Edit, StyledEdit, Delete } from "./style";
import { BuyerProfileIcon } from "../../../../assets/icons";
import ArrowUpIcon from "../../../../assets/icons/Arrow/Up.svg";
import ArrowDownIcon from "../../../../assets/icons/Arrow/Down.svg";
import currencies from "../../../../common/constants/currencies";
import { CONTAINERS_PAGE_SIZE } from "../../../../common/constants/settings";
import tw, { styled } from "twin.macro";

const CustomNumberEditor = ({
  value,
  dispatch,
  column,
  rowKeyValue,
  rowData,
}) => {
  const [editorValue, setValue] = useState(value);

  const handleChange = (event) => {
    dispatch(
      updateEditorValue(rowKeyValue, column.key, event.currentTarget.value)
    );
    setValue(event.currentTarget.value);
  };

  return (
    <>
      <Input
        tw="w-20 mr-2"
        type="number"
        value={editorValue}
        onChange={handleChange}
      />
      {currencies[rowData.containerCurrency]}
    </>
  );
};

const CustomEditor = ({ value, options, dispatch, column, rowKeyValue }) => {
  const [editorValue, setValue] = useState(value);

  const handleChange = (event) => {
    dispatch(
      updateEditorValue(rowKeyValue, column.key, event.currentTarget.value)
    );
    setValue(event.currentTarget.value);
  };

  return (
    <Select value={editorValue} onChange={handleChange}>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const SelectionCell = ({
  rowKeyValue,
  dispatch,
  isSelectedRow,
  selectedRows,
}) => {
  return (
    // <Checkbox
    //   tw="mr-3"
    //   checked={isSelectedRow}
    //   onChange={(event) => {
    //     if (event.nativeEvent.shiftKey) {
    //       dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
    //     } else if (event.currentTarget.checked) {
    //       dispatch(selectRow(rowKeyValue));
    //     } else {
    //       dispatch(deselectRow(rowKeyValue));
    //     }
    //   }}
    // />
    <BuyerProfileIcon tw="w-50 h-50 inline" alt="Buyer" />
  );
};

const SelectionHeader = ({ dispatch, areAllRowsSelected }) => {
  return (
    // <Checkbox
    //   tw="mr-3"
    //   checked={areAllRowsSelected}
    //   onChange={(event) => {
    //     if (event.currentTarget.checked) {
    //       dispatch(selectAllFilteredRows());
    //     } else {
    //       dispatch(deselectAllFilteredRows());
    //     }
    //   }}
    // />
    <BuyerProfileIcon tw="w-50 h-50 inline mr-18" alt="Buyer" />
  );
};

const SelectEditor = ({ column, dispatch, options }) => {
  return (
    <Select
      tw="text-14 h-40 text-primary-blue"
      defaultValue={column.filterRowValue}
      onChange={(event) => {
        dispatch(updateFilterRowValue(column.key, event.currentTarget.value));
      }}
    >
      <option value=""> All </option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};

const NumberEditor = ({ column, dispatch }) => {
  return (
    <Input
      defaultValue={column.filterRowValue}
      tw="p-2"
      onChange={(event) => {
        const filterRowValue =
          event.currentTarget.value !== ""
            ? Number(event.currentTarget.value)
            : null;
        dispatch(updateFilterRowValue(column.key, filterRowValue));
      }}
      type="number"
    />
  );
};

const RangeEditor = ({ column, dispatch }) => {
  const [value, setValue] = useState(column.filterRowValue);
  function handleChange(event) {
    const filterRowValue =
      event.currentTarget.value !== ""
        ? Number(event.currentTarget.value)
        : null;
    dispatch(updateFilterRowValue(column.key, filterRowValue));
  }
  // console.log('RangeEditor column', column)
  return (
    <>
      <input
        tw="w-95 text-14 text-casual-gray"
        max={column.max}
        defaultValue={column.filterRowValue}
        onChange={(e) => {
          setValue(e.currentTarget.value);
        }}
        onMouseUp={handleChange}
        onTouchEnd={handleChange}
        type="range"
      />
      <span tw="ml-2 text-12 text-casual-gray">{value}</span>
    </>
  );
};

const SearchEditor = ({ column, dispatch }) => {
  return (
    <Input
      tw="w-20 h-40 text-14 text-casual-gray"
      defaultValue={column.filterRowValue}
      onKeyUp={(event) => {
        // if(event.keyCode === 13)
        dispatch(
          updateFilterRowValue(
            column.key,
            event.currentTarget.value !== "" ? event.currentTarget.value : ""
          )
        );
      }}
    />
  );
};

const DateEditor = ({ column, dispatch }) => {
  const fieldValue = column.filterRowValue;
  const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
  return (
    <Input
      tw="w-151 h-40 text-14 text-casual-gray"
      type="date"
      value={value || ""}
      onChange={(event) => {
        const targetValue = event.currentTarget.value;
        const filterRowValue = targetValue ? new Date(targetValue) : null;
        dispatch(updateFilterRowValue(column.key, filterRowValue));
      }}
    />
  );
};

const SaveButton = ({ dispatch, rowKeyValue }) => {
  return (
    <div tw="flex justify-center space-x-4">
      <Button
        color="outline-blue"
        onClick={() => {
          dispatch({
            type: "INTERCEPT_EDIT",
            rowKeyValue,
          });
        }}
      >
        Save
      </Button>
      <Button
        color="outline-red"
        onClick={() => {
          dispatch(closeRowEditors(rowKeyValue));
        }}
      >
        Close
      </Button>
    </div>
  );
};

const EditButton = (props) => {
  const history = useHistory();
  // console.log("EditButton", props);
  return (
    <div tw="grid grid-cols-1 justify-items-center items-center">
      <StyledEdit
        onClick={() =>
          history.push({
            pathname: "/admin/manage-agents/assign-depots",
            // search: '?agentId=' + rowKeyValue,
            state: {
              agentUid: props.rowData.ccgId,
              agentName: props.rowData.firstName + " " + props.rowData.lastName,
              agentEmail: props.rowData.email,
              agentPhone: props.rowData.phoneNumber,
            },
          })
        }
        alt="Edit Agent"
      />
    </div>
  );
};

const BookingButton = ({ name, dispatch, rowKeyValue }) => {
  const history = useHistory();
  return (
    <Button
      tw="text-12 min-w-61.25"
      color="primary-blue"
      onClick={() => history.push("/agent/containers/selection")}
    >
      {name}
    </Button>
  );
};

const StyledDatatable = styled.div`
  & .ka {
    ${tw`mx-auto text-lg`}
  }

  & .ka-table-wrapper {
    ${tw`overflow-x-auto md:overflow-x-hidden border-collapse p-1`}
  }

  & .ka-table {
    ${tw`min-w-full table-fixed w-full border-collapse`}
  }

  & .ka-thead {
    ${tw`text-left align-top text-17`}
  }

  & .ka-thead-cell.ka-thead-background:first-child {
    ${tw`w-60 h-50`}
  }

  & .ka-thead-cell.ka-thead-background:last-child {
    ${tw`w-60`}
  }

  & .ka-tbody {
    ${tw`text-left text-14`}
  }

  & .ka-paging-pages {
    ${tw`flex flex-row justify-end`}
  }

  & .ka-paging {
    ${tw`min-w-full grid grid-rows-1 grid-cols-2 text-14 text-primary-blue`}
  }

  & .ka-paging-sizes {
    ${tw`grid grid-rows-1 grid-cols-pagination items-center justify-items-center`}
  }

  & .ka-paging-size {
    ${tw`cursor-pointer`}
  }

  & .ka-paging-page-index-active,
  .ka-paging-size-active {
    ${tw`bg-gray-200 rounded-full w-7 text-center`}
  }

  & .ka-filter-row-cell {
    ${tw`text-sm md:text-base whitespace-nowrap py-5 border-b border-gray-200 border-t pr-4 align-middle`}
  }

  & .ka-thead-cell {
    ${tw`pb-5`}
  }

  & .ka-thead-cell-content {
    ${tw`text-gray-400 text-15`}
  }

  & .ka-cell-editor {
    ${tw`w-full`}
  }

  & .ka-cell {
    ${tw`py-5 border-b border-gray-200 text-primary-blue align-middle truncate`}
  }

  & .ka-icon {
    position: relative;
  }

  & .ka-icon-sort-arrow-up:after {
    content: "....";
    color: transparent;
    background: url(${ArrowUpIcon});
    background-size: cover;
    margin-left: 10px;
    font-size: 17px;
  }
  & .ka-icon-sort-arrow-down:after {
    content: "....";
    color: transparent;
    background: url(${ArrowDownIcon});
    background-size: cover;
    font-size: 17px;
    margin-left: 10px;
  }

  & .ka-pointer {
    cursor: pointer;
  }

  & .ka-loading {
    position: absolute;
    bottom: 0;
    top: 0;
    left: 0;
    right: 0;
    background-color: #ffffffcc;
    margin: auto;
    align-items: center;
    justify-content: center;
    display: flex;
    z-index: 1;
  }

  & .ka-paging-page-index {
    ${tw`mr-4 cursor-pointer text-primary-blue`}
  }
`;

const tableReducer = (prevProps, action) => {
  if (action.type === "LOAD_TOTAL_PAGES")
    return {
      ...prevProps,
      paging: {
        ...prevProps.paging,
        pagesCount: Math.round(action.payload / CONTAINERS_PAGE_SIZE),
      },
    };
  return kaReducer(prevProps, action);
};

const DataTable = ({ childComponents, ...tableProps }) => {
  // console.log("DataTable tableProps", tableProps);
  return (
    <StyledDatatable>
      <Table
        {...tableProps}
        childComponents={{
          pagingIndex: {
            elementAttributes: ({ isActive }) => ({
              style: isActive && { color: "var(--primary-blue)" },
            }),
          },
          ...childComponents,
        }}
      />
      {/* <Table
      {...tableProps}
      data={dataArray}
      dispatch={tableProps.dispatch}
    /> */}
    </StyledDatatable>
  );
};

export {
  DataTable,
  EditButton,
  SaveButton,
  BookingButton,
  DateEditor,
  SearchEditor,
  RangeEditor,
  NumberEditor,
  SelectEditor,
  SelectionHeader,
  SelectionCell,
  CustomEditor,
  CustomNumberEditor,
  tableReducer,
};
