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
import { kaDateUtils, kaPropsUtils } from "ka-table/utils";
import { Select, Checkbox, Input, Button } from "../../../../common/styles";
import ArrowUpIcon from "../../../../assets/icons/Arrow/Up.svg";
import ArrowDownIcon from "../../../../assets/icons/Arrow/Down.svg";
import currencies from "../../../../common/constants/currencies";
import { CONTAINERS_PAGE_SIZE } from "../../../../common/constants/settings";
import tw, { styled } from "twin.macro";

const CustomNumberEditor = ({ value, dispatch, column, rowKeyValue, rowData }) => {
  const [editorValue, setValue] = useState(value);

  const handleChange = (event) => {
    dispatch(updateEditorValue(rowKeyValue, column.key, event.currentTarget.value));
    setValue(event.currentTarget.value);
  }

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
    dispatch(updateEditorValue(rowKeyValue, column.key, event.currentTarget.value));
    setValue(event.currentTarget.value);
  }

  return (
    <Select
      value={editorValue}
      onChange={handleChange}
    >
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
    <Checkbox
      tw="mr-3"
      checked={isSelectedRow}
      onChange={(event) => {
        if (event.nativeEvent.shiftKey) {
          dispatch(selectRowsRange(rowKeyValue, [...selectedRows].pop()));
        } else if (event.currentTarget.checked) {
          dispatch(selectRow(rowKeyValue));
        } else {
          dispatch(deselectRow(rowKeyValue));
        }
        console.log('SelectionCell rowKeyValue', rowKeyValue)
        console.log('SelectionCell isSelectedRow', isSelectedRow)
        console.log('SelectionCell selectedRows', selectedRows)
      }}
    />
  );
};

const SelectionHeader = ({ dispatch, areAllRowsSelected }) => {
  return (
    <Checkbox
      tw="mr-3"
      checked={areAllRowsSelected}
      onChange={(event) => {
        if (event.currentTarget.checked) {
          dispatch(selectAllFilteredRows()); // also available: selectAllVisibleRows(), selectAllRows()
        } else {
          dispatch(deselectAllFilteredRows()); // also available: deselectAllVisibleRows(), deselectAllRows()
        }
      }}
    />
  );
};

const SelectEditor = ({ column, dispatch, options }) => {
  return (
    <Select tw="text-14 h-40 text-primary-blue border-r-0 border-l-0 border-t-0"
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
      <input tw="w-95 text-14 text-casual-gray"
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
  console.log('SearchEditor column', column)
  return (
    <Input
      tw="w-20 h-40 text-14 text-casual-gray border-r-0 border-l-0 border-t-0"
      defaultValue={column.filterRowValue}
      onKeyUp={(event) => {
        // if(event.keyCode === 13)
        dispatch(
          updateFilterRowValue(
            column.key,
            event.currentTarget.value !== ""
              ? event.currentTarget.value
              : ""
          ));
      }}
    />
  );
};

const DateEditor = ({ column, dispatch }) => {
  const fieldValue = column.filterRowValue;
  // const value = fieldValue && kaDateUtils.getDateInputValue(fieldValue);
  const value = fieldValue;
  return (
    <Input
      tw="w-28 h-40 text-14 text-casual-gray p-0 border-r-0 border-l-0 border-t-0"
      type="date"
      value={value || ""}
      onChange={(event) => {
        const targetValue = event.currentTarget.value;
        // console.log("DateEditor targetValue", targetValue)
        // const filterRowValue = targetValue ? new Date(targetValue) : null;
        dispatch(updateFilterRowValue(column.key, targetValue ));
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

const EditButton = ({ dispatch, rowKeyValue }) => {
  return (
    <Button
      color="navy"
      onClick={() => dispatch(openRowEditors(rowKeyValue))}
    >
      Edit
    </Button>
  );
};

const BookingButton = ({ name, dispatch, rowKeyValue }) => {
  const history = useHistory();
  return (
    <Button
      tw="text-12 min-w-61.25"
      color="primary-blue"
      onClick={() => history.push({
        pathname: '/agent/containers/selection',
        // search: '?refNo=' + rowKeyValue,
        state: { reference: rowKeyValue }
      })
      }
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
    ${tw`min-w-full border-collapse`}
  }

  & .ka-thead {
    ${tw`text-left align-top text-15`}
  }

  & .ka-tbody {
    ${tw`text-left align-top text-14 font-light`}
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

  & .ka-paging-page-index-active, .ka-paging-size-active {
    ${tw`bg-gray-200 rounded-full w-7 text-center`}
  }

  & .ka-filter-row-cell {
    ${tw`text-sm md:text-base whitespace-nowrap py-5 border-b border-gray-200 border-t pr-4 align-middle`}
  }

  & .ka-thead-cell {
    ${tw`pb-5`}
  }

  & .ka-thead-cell-content {
    ${tw`text-gray-400 font-medium`}
  }

  & .ka-cell-editor {
    ${tw`w-full`}
  }

  & .ka-cell {
    ${tw`py-5 border-b border-gray-200 text-primary-blue align-middle`}
  }

  & .ka-cell-text {
  }

  & .ka-icon {
    position: relative;
  }

  & input::-webkit-calendar-picker-indicator {
    ${tw`m-0`}
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

  & .ka-paging {
    ${tw`min-w-full`}
  }

  & .ka-paging-page-index {
    ${tw`mr-4 cursor-pointer text-primary-blue`}
  }
`;

const tableReducer = (prevProps, action) => {
  if (action.type === "LOAD_TOTAL_PAGES")
    return { ...prevProps, paging: { ...prevProps.paging, pagesCount: Math.round(action.payload / CONTAINERS_PAGE_SIZE) } };
  return kaReducer(prevProps, action);
};

const DataTable = ({ childComponents, ...tableProps }) => {
  // const [tableProps, changeTableProps] = useState(tablePropsInit);
  // const dispatch = action => {
  //   changeTableProps(prevState => kaReducer(prevState, action));
  // };

  console.log("DataTable tableProps", tableProps)
  console.log('SelectionCell kaPropsUtils.getSelectedData(tableProps)', kaPropsUtils.getSelectedData(tableProps))
  // console.log('SelectionCell kaPropsUtils.areAllFilteredRowsSelected(tableProps)', kaPropsUtils.areAllFilteredRowsSelected(tableProps))
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
  tableReducer
}
