import React, { useCallback } from "react";
import {
    useTable, useAsyncDebounce,
    useBlockLayout,
    useFilters,
    useGlobalFilter,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
} from 'react-table';
import { Button } from "../../../common/styles";
import { TrashIcon, Delete } from '../../../assets/icons';
import {
    PageNumber,
    PaginateWithNumbers,
    Pagination,
    PaginationButton,
    PaginationSelect,
    RowsPerPage,
    SpanArrow,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderContent,
    TableHeaderToolbar,
    TableRow,
    TableRowGroup,
    TableRowHead,
    TableStyled,
    ToolbarButtonStyled,
    ToolbarStyled
} from './style';
//   import { Toolbar, ToolbarButtonAdd, ToolbarButtonClear, ToolbarButtonFilter, ToolbarButtonSend } from '../toolbar';
import tw, { styled } from "twin.macro";
import Dropdown from "../../../common/components/Dropdown";

export default function Grid(props) {

    const getAddButton = () => {
        const AddBtn = tw(Button)`
h-30 w-78 text-white p-0 mdl:text-14 xs:text-13 
hover:( bg-secondary-blue border-secondary-blue )
`;
        const AddButton = (
            <AddBtn color="primary-blue">Add</AddBtn>
        );
        return AddButton;
    };

    function Toolbar() {
        return <ToolbarStyled {...props}>{props.children}</ToolbarStyled>;
    }

    function ToolbarButton() {
        return (
            <ToolbarButtonStyled
                onClick={props.disabled ? null : props.onClick}
                disabled={props.disabled}
            >
                {props.Title}
                <img src={props.Icon ? props.Icon : <Button>Add</Button>} alt={props.Title} />
            </ToolbarButtonStyled>
        );
    }

    function ToolbarButtonAdd() {
        return (
            <ToolbarButton
                onClick={props.onClick}
                Title="Add"
                Icon={<Button>Add</Button>}
                disabled={props.disabled}
            />
        );
    }

    function ToolbarButtonSend() {
        return (
            <ToolbarButton
                onClick={props.onClick}
                Title={props.Title ? props.Title : 'Send'}
                Icon={""}
                disabled={props.disabled}
            />
        );
    }

    function ToolbarButtonDelete() {
        return (
            <ToolbarButton
                onClick={props.onClick}
                Title={props.Title ? props.Title : 'Delete'}
                Icon={TrashIcon}
                disabled={props.disabled}
            />
        );
    }

    function ToolbarButtonClear() {
        return <ToolbarButton onClick={props.onClick} Title="Clear" Icon={TrashIcon} />;
    }

    function ToolbarButtonFilter() {
        return <ToolbarButton onClick={props.onClick} Title="Filter" Icon={""} />;
    }

    function handleClickAddRow() { }

    const clickToolbarAdd = useCallback(
        (row) => {
            //console.log('gridstyle clickToolbarAdd');
            // if (onClickToolbarAdd) {
            // handleClickAddRow();
            // }
        }
    );

    const clickToolbarSend = useCallback(
        (row) => {
            // console.log('gridstyle clickToolbarSend');
            // if (onClickToolbarSend) {
            // onClickToolbarSend();
            // }
        }
    );

    const isRowError = (row) => {
        // console.log('gridstyle check row', row);
        if (row && row.original?.isError) {
            return row.original?.isError.length > 0;
        } else {
            return false;
        }
    };

    const isCellError = (cell, errors) => {
        //console.log('gridstyle check col', cell.column.id.split('.')[0]);
        //console.log('gridstyle isCellError', errors);
        if (errors) {
            return (
                errors.findIndex((e) => {
                    return e === cell.column.id.split('.')[0];
                }) > -1
            );
        }
        return false;
    };

    // const map = pageOptions.map((x) => {
    //     return <PageNumber>{x + 1} </PageNumber>;
    // });

    // console.log('tableprops', headerGroups)
    // const h = find(headerGroups[0].headers, {id: 'startDate'});
    // console.log(h);

    // Render the UI for your table
    //console.log('gridstyled data', data)
    //console.log('defaultColumn', defaultColumn)



    const data = React.useMemo(
        () => [
            {
                col1: 'Hello',
                col2: 'World',
            },
            {
                col1: 'react-table',
                col2: 'rocks',
            },
            {
                col1: 'whatever',
                col2: 'you want',
            },
        ],
        []
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Country',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Depots',
                accessor: 'col2',
            },
            {
                id: 'actions',
                Header: getAddButton,
                Cell: ({ row }) => {
                    //const rowIndex = props.row.id;
                    //console.log('editableRow', row)
                    //return !editableRow[row.index] ? (
                    return (
                        <div
                            style={{
                                width: '100%',
                                display: 'grid',
                                gridTemplateColumns: 'auto auto',
                                gap: 3,
                            }}
                        >
                            <TrashIcon/>
                        </div>
                    )
                },
                
                
            },

        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        pageOptions,
        nextPage,
        previousPage,
        setPageSize,
        page,
        canPreviousPage,
        canNextPage,
        state: { expanded, selectedRowIds, pageIndex, pageSize, globalFilter },
    } = useTable({ columns, data })

    const firstPageRows = rows.slice(0, 10);

    return (<>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px red',
                                    background: 'aliceblue',
                                    color: 'black',
                                    fontWeight: 'bold',
                                }}
                            >
                                {column.render('Header')}
                                {/* <TableHeaderToolbar className="toolbar">
                                                    <Toolbar>
                                                        <ToolbarButtonAdd onClick={clickToolbarAdd}></ToolbarButtonAdd>
                                                        <ToolbarButtonClear />
                                                    </Toolbar>
                                                </TableHeaderToolbar> */}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: '10px',
                                            border: 'solid 1px gray',
                                            background: 'papayawhip',
                                        }}
                                    >
                                        {cell.render('Cell')}
                                    </td>
                                )
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </table>


        <TableStyled {...getTableProps({
            style: { width: props && props.name === 'settings' && props.width ? props.width : 'inherit' },
        })} className="table">
            <TableRowGroup>
                {headerGroups.map(headerGroup => (
                    <TableRowHead {...headerGroup.getHeaderGroupProps({
                        style: { width: props && props.name === 'settings' && props.width ? props.width : '100%' },
                    })} className="tr">
                        {headerGroup.headers.map(column => {
                            //console.log('headerGroup.headers', headerGroup.headers)
                            //console.log('column', column)
                            if (column.originalId !== 'selection_placeholder') {
                                if (column.useToolbar) {
                                    return (
                                        <TableHeader
                                            width={column.width}
                                            full={column.full}
                                            align={column.align}
                                        >
                                            <TableHeaderContent className="header">
                                                {column.render('Header')}
                                                {/* Render the columns filter UI */}
                                                <TableHeaderToolbar className="toolbar">
                                                    <Toolbar>
                                                        <ToolbarButtonAdd onClick={clickToolbarAdd}></ToolbarButtonAdd>
                                                        <ToolbarButtonClear />
                                                    </Toolbar>
                                                </TableHeaderToolbar>
                                            </TableHeaderContent>
                                        </TableHeader>);
                                }
                                return (
                                    <TableHeader
                                        width={column.width}
                                        full={column.full}
                                        align={column.align}
                                    >
                                        <TableHeaderContent style={{ height: '40px' }}>
                                            {column.render('Header')}
                                            {/* {(column.isSorted) && (<SpanArrow> {column.isSortedDesc ?
                                                <img src={ArrowDown} alt="desc" /> :
                                                <img src={ArrowUp} alt="up" />}</SpanArrow>)
                                            } */}
                                        </TableHeaderContent>
                                        {/* Use column.getResizerProps to hook up the events correctly */}
                                    </TableHeader>
                                );
                            }
                        })
                        }
                    </TableRowHead>
                ))}
            </TableRowGroup>
            <TableBody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <TableRow {...row.getRowProps({
                            style: {
                                width: props && props.name === 'settings' && props.width ? props.width : 'inherit',
                                height: props && props.name === 'settings' && props.height ? props.height : '58px',
                            },
                        })}
                            // height={height}
                            className="tr"
                            rowError={isRowError(row)}

                        >
                            {row.cells.map(cell => {
                                // console.log('cell',cell)
                                // console.log('cell error', row.original?.isError[cell.column.id])
                                //isCellError(cell, row.original?.isError)
                                //.log('cell.column.id', cell.column.width)
                                return <TableCell
                                    id={cell.column.id}
                                    width={cell.column.width}
                                    full={cell.column.full}
                                    align={cell.column.align}
                                    {...cell.getCellProps()}
                                    error={isCellError(cell, row.original?.isError)}
                                    className="td">{cell.render('Cell')}</TableCell>;
                            })}
                        </TableRow>
                    );
                })}
            </TableBody>
        </TableStyled>

        {props && props.name === 'settings' && <>
            <Pagination>
                <RowsPerPage>
                    <span>
                        Rows per page:{' '}
                    </span>{' '}
                    {/* <input
                            type="number"
                            min="0" step="1" max={page.length}
                            defaultValue={pageIndex + 1}
                            onChange={e => {
                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                gotoPage(page)
                            }}
                            style={{ width: '100px' }}
                        /> */}
                    <PaginationSelect
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value));
                        }}
                    >
                        {/* {[10, 20, 30, 40, 50].map(pageSize => ( */}
                        {[10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </PaginationSelect>
                </RowsPerPage>
                <PaginateWithNumbers>
                    <PaginationButton
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        style={{
                            marginRight: 35,
                            color: canPreviousPage && '#2D8EFE',
                        }}>
                        {'Previous'}
                    </PaginationButton>
                    {' '}
                    <span>
                        {/* {pageIndex + 1} of {pageOptions.length} */}
                        {/* {map} */}
                    </span>
                    <PaginationButton
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        style={{
                            color: canNextPage && '#2D8EFE',
                            marginLeft: 35,
                        }}>
                        {'Next'}
                    </PaginationButton>
                    {' '}
                </PaginateWithNumbers>
                <span>
                    Showing {pageSize * (pageIndex + 1) - (pageSize - 1)} to {page.length / (pageIndex + 1)} of {page.length}
                </span>
            </Pagination>
        </>
        }
    </>
    )
}