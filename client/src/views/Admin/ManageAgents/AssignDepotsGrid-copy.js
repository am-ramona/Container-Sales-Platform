import React, { useCallback, useEffect, useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    useTable
} from 'react-table';
import MultiSelect from "../../../common/components/MultiSelect";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import { locationsEndpoints } from "../../../common/constants/apiEndpoints";
import { TrashIcon } from '../../../assets/icons';
import {
    AddWrapper,
    AddSign,
    StyledEdit
} from './style';
import axios from "axios";
import tw from "twin.macro";

export default function Grid({
    agent,
    countries,
    savedDepots,
    data,
    setData,
    selected,
    setSelected,
    count,
    setCount,
    ...props
}) {
    const [depots, setDepots] = useState([]);
    const [country, setCountry] = useState([]);
    const [addFlag, setAddFlag] = useState(false);
    const [arr, setArr] = useState([]);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        console.log('grid savedDepots', savedDepots)
        console.log('grid data', data)
        console.log('useEffect country', country)
        console.log('useEffect data', data)
        // setData(dataa)
        console.log('useEffect selected', selected)
        // console.log('useEffect depots', depots)
    }, [selected, depots, savedDepots, data, country, data])

    // console.log('assigndepot root selected', selected)

    const getAddButton = () => {
        return (
            <AddWrapper>
                <label>Add</label>
                {countries && <AddSign onClick={addNewRow} >+</AddSign>}
            </AddWrapper>
        );
    };

    const unAssignDepotsToAgent = useCallback((row) => {
        const newData = [...data.slice(0, row.index), ...data.slice(row.index + 1)];
        setData(newData)

        axios.put(`${locationsEndpoints.agent}/none`, selected)
            .then(function (response) {
                // console.log('unAssignDepotsToAgent response', response)
                // const depotsList = [ ... response.data.containers]
                // console.log('response.data.containers', response.data.containers)
                // const depotsList = response.data.containers.map(
                //   ({ depot: label, depot: value, ...rest }) => ({
                //     label,
                //     value,
                //     ...rest,
                //   })
                // );]
            })
    }, [data, setData, selected]
    );

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            //   borderBottom: '1px dotted pink',
            //   color: state.isSelected ? '#04246A' : '#3E64B8',
            backgroundColor: state.isFocused ? '#E5E9F0' : 'transparent',
            color: '#04246A',
            borderBottom: 0,
            padding: 15,
        }),
        control: () => ({
            // none of react-select's styles are passed to <Control /> {/* styles={customStyles} */}
            display: 'grid',
            gridTemplateColumns: 'minmax( auto, 242px ) auto'
        }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            const color = '#04246A';
            return { ...provided, opacity, transition, color };
        },
        multiValue: (provided, state) => {
            const color = '#04246A';
            const backgroundColor = '#E5E9F0';
            const borderRadius = 10;
            return { ...provided, color, backgroundColor, borderRadius };
        }
    }

    const onChange = (e) => {
        setDepots([])
        // let countrycloned
        setCountry([...country, e.value]);
        // console.log('onChange e', e)
        // console.log('onChange');
        axios.get(`${locationsEndpoints.depots}?isoCountryCode=${e.value}`)
            .then(function (response) {
                // const depotsList = [ ... response.data.containers]
                // console.log('response.data.containers', response.data.containers)
                const depotsList = response.data.map(({
                    internalID: label,
                    internalID: value,
                    internalID: depotCode,
                    ...rest
                }) => ({
                    label,
                    value,
                    depotCode,
                    ...rest
                }));
                setDepots(depotsList)
                // setSavedAssignedDepots(depotsList)
                // setSelected(selected)
            })
    }


    const handleClickEditRow = useCallback((rowIndex) => {
        // window.alert("rowIndex", rowIndex);
        console.log('data before', data)
        // setEditableRow({ [rowIndex]: true });
        // setTableData((prev) =>
        //   prev.map((r, index) => (rowIndex === index ? { ...r, isEditing: true } : {...r}))
        // );
        // updateMyArray( arr => [...arr, `${arr.length}`]);
        setData(data.map((r, index) => (Number(rowIndex.id) === index ? { ...r, isEditing: true } : { ...r })));
        // setGridData(dataa);
        const options = countries.map(({
            isoCountryCode: value,
            isoCountryName: label,
            ...rest
        }) => ({
            value,
            label,
            ...rest
        }));
        console.log('editRow options', options)
        // let checkKeyPresenceInArray = country => options.some(option => Object.keys(option).includes(country));
        let arr = options;
        // country.map((ct) => {
        //     console.log('country ct', ct)
        //     let array = options.filter(option => option.value !== ct);
        //     console.log('addNewRow array', array)
        //     arr.push(array)
        // }) 
        country.map((ct) => {
            let array = arr.filter(option => option.value !== ct);
            console.log('editRow array', array)
            arr = array
            return arr;
        })
        console.log('rowIndex', rowIndex)
        console.log('data after', data)
        // var updateOptions = options.filter(option => option.value !== country);
        console.log('editRow arr', arr)
        // if (count < 5) {
        //     let newTableData = [...data];
        //     newTableData.push({
        //         col1: <Select
        //             options={arr}
        //             components={animatedComponents}
        //             closeMenuOnSelect={false}
        //             onChange={onChange}
        //             styles={customStyles}
        //         />,
        //         col2: <MultiSelect
        //             options={depots}
        //             value={selected}
        //             onChange={setSelected}
        //             labelledBy={"Select"}
        //         />
        //     });
        //     setData(newTableData);
        //     setCount(count + 1)
        // }
    },
        [data,
            setData,
            onChange,
            countries,
            country,
            depots,
            selected,
            setSelected,
            animatedComponents,
            customStyles,
            count,
            setCount],
    );

    // console.log('assigndepotsgrid selected', selected)

    //   console.log('root options', options)

    // const options = [
    //     { value: 'italy', label: 'Italy' },
    //     { value: 'spain', label: 'Spain' },
    //     { value: 'portugal', label: 'Portugal' },
    //     { value: 'ivh', label: 'Italy' },
    //     { value: 'vth', label: 'Spain' },
    //     { value: 'thtyy', label: 'Portugal' },
    //     { value: 'r', label: 'Italy' },
    //     { value: 'y', label: 'Spain' },
    //     { value: 'i', label: 'Portugal' },
    //     { value: 'p', label: 'Italy' },
    //     { value: 'w', label: 'Spain' },
    //     { value: 'q', label: 'Portugal' },
    //     { value: 'b', label: 'Italy' },
    //     { value: 'u', label: 'Spain' },
    //     { value: 'p', label: 'Portugal' }
    // ]

    console.log('root grid depots', depots)

    // function addNewRowElements() {
    //     let newTableData = [...data];
    //     newTableData.push({
    //         col1: <Select
    //             options={options}
    //             components={animatedComponents}
    //             closeMenuOnSelect={false}
    //             onChange={onChange}
    //             styles={customStyles}
    //         />,
    //         col2: <MultiSelect
    //             options={depots}
    //             value={selected}
    //             onChange={setSelected}
    //             labelledBy={"Select"}
    //         />
    //     });
    //     setData(newTableData);
    // }

    // useEffect(() => {
    //     const options = countries.map(({
    //         isoCountryCode: value,
    //         isoCountryName: label,
    //         ...rest
    //     }) => ({
    //         value,
    //         label,
    //         ...rest
    //     }));
    //     console.log('addNewRow options', options)
    //     /
    //     let arr = options;

    //     country.map((ct) => {
    //         let array = arr.filter(option => option.value !== ct);
    //         console.log('addNewRow array', array)
    //         arr = array
    //         return arr;
    //     })

    // })

    const addNewRow = useCallback(
        () => {
            console.log('addNewRow count', count)
            console.log('addnewRow grid depots', depots)
            console.log('addNewRow data', data)
            console.log('addNewRow country', country)
            setAddFlag(true);

            const options = countries.map(({
                isoCountryCode: value,
                isoCountryName: label,
                ...rest
            }) => ({
                value,
                label,
                ...rest
            }));
            console.log('addNewRow options', options)
            // let checkKeyPresenceInArray = country => options.some(option => Object.keys(option).includes(country));
            let arr = options;
            // country.map((ct) => {
            //     console.log('country ct', ct)
            //     let array = options.filter(option => option.value !== ct);
            //     console.log('addNewRow array', array)
            //     arr.push(array)
            // }) 
            country.map((ct) => {
                let array = arr.filter(option => option.value !== ct);
                console.log('addNewRow array', array)
                arr = array
                return arr;
            })
            setArr(arr)
            // var updateOptions = options.filter(option => option.value !== country);
            console.log('addNewRow arr', arr)
            if (count < 5) {
                let newTableData = [...data];
                newTableData.push({
                    col1: <Select
                        options={arr}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        onChange={onChange}
                        styles={customStyles}
                    />,
                    col2: <MultiSelect
                        options={depots}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                    />
                });
                setData(newTableData);
                setCount(count + 1)
            }
        },
        [data,
            setData,
            onChange,
            countries,
            country,
            depots,
            selected,
            setSelected,
            animatedComponents,
            customStyles,
            count,
            setCount],
    );

    // useEffect(() => {
    //     if (countries) {
    //         const options = countries.map(({
    //             isoCountryCode: value,
    //             isoCountryName: label,
    //             ...rest
    //         }) => ({
    //             value,
    //             label,
    //             ...rest
    //         }));
    //         let newTableData = [...data];
    //         newTableData.push({
    //             col1: <Select
    //                 options={options}
    //                 components={animatedComponents}
    //                 closeMenuOnSelect={false}
    //                 onChange={onChange}
    //                 styles={customStyles}
    //             />,
    //             col2: <MultiSelect
    //                 options={depots}
    //                 value={selected}
    //                 onChange={setSelected}
    //                 labelledBy={"Select"}
    //             />
    //         });
    //         setData(newTableData);
    //     }
    // }, [depots])

    const onRemove = (selectedList, removedItem) => {

    }

    const clickToolbarAdd = useCallback(
        (row) => {
            //console.log('gridstyle clickToolbarAdd');
            // if (onClickToolbarAdd) {
            // handleClickAddRow();
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

    let deleteRowProps = {
        message: "Are you sure you want to delete the row?",
        button1: "Cancel",
        button2: "Delete Row",
        buttonColor: "outline-blue"
    };

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
                    console.log('editableRow', row)
                    //return !editableRow[row.index] ? (
                    return (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: savedDepots ? 'auto auto' : 'auto',
                            gridGap: 10
                        }}>
                            {savedDepots && <StyledEdit
                                onClick={() => handleClickEditRow(row)}
                                alt="Edit Assigned Depots per Country"
                            />
                            }
                            {/* <TrashIcon tw="self-center justify-self-center cursor-pointer"
                                onClick={() => unAssignDepotsToAgent(row)}
                                alt="Delete Assigned Depots per Country"
                            /> */}
                            <Modal
                                grid
                                width="450px"
                                height="auto"
                                titleFontSize="24px"
                                component={<TrashIcon tw="self-center justify-self-center cursor-pointer"
                                    alt="Delete Assigned Depots per Country"
                                />}
                                title="Delete Row"
                                children={
                                    <Popup
                                        name="deleteAssignDepotsToAgentRow"
                                        {...deleteRowProps}
                                        accept={() => unAssignDepotsToAgent(row)}
                                    />
                                }
                            />
                        </div>
                    )
                },
            },
        ],
        [countries, depots, selected, addFlag, savedDepots, unAssignDepotsToAgent]
    )

    const EditableCell = ({
        data,
        value: initialValue,
        row: { index },
        // row,
        column: { id },
        // column,
        isEditing,
        updateMyData, // This is a custom function that we supplied to our table instance
        ...props
    }) => {
        console.log('EditableCell isEditing', isEditing)
        console.log('EditableCell id', id)
        // If the initialValue is changed external, sync it up with our state
        // React.useEffect(() => {
        // setValue(initialValue);
        // }, [initialValue])
        console.log('data[index]', data[index])
        return (
            (typeof data[index]['isEditing'] !== 'undefined' &&
                data[index]['isEditing']) ?
                id === 'col1'
                    ?
                    <Select
                        options={""}
                        components={animatedComponents}
                        closeMenuOnSelect={false}
                        onChange={onChange}
                        styles={customStyles}
                    />
                    :
                    id === 'col2'
                        ?
                        <MultiSelect
                            options={depots}
                            value={selected}
                            onChange={setSelected}
                            labelledBy={"Select"}
                        />
                        :
                        initialValue : initialValue

        )
    };

    // Set our editable cell renderer as the default Cell renderer
    const defaultColumn = {
        Cell: EditableCell,
    };

    // Render the UI for your table
    //console.log('gridstyled data', data)
    //console.log('defaultColumn', defaultColumn)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data, defaultColumn })

    // console.log('rows', rows)
    console.log('table gridData', data)
    console.log('table rows', rows)
    console.log('table columns', columns)

    // console.log('headerGroups', headerGroups)
    // console.log('getTableBodyProps()', getTableBodyProps())
    console.log('useTable countries', countries)
    let options = [];
    if (countries) {
        options = countries.map(({
            isoCountryCode: value,
            isoCountryName: label,
            ...rest
        }) => ({
            value,
            label,
            ...rest
        }));
    }

    return (<>
        <table {...getTableProps()} style={{ border: 'solid 1px #04246A' }}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)'
                        }}>
                        {headerGroup.headers.map(column => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: 'solid 3px #E20101',
                                    background: 'white',
                                    color: '#04246A',
                                    fontWeight: 'bold',
                                    padding: 10
                                }}
                            >
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 1fr)'
                            }}>
                            {row.cells.map(cell => {
                                console.log('inside grid cell.column.id', cell.column.id)
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: 10,
                                            borderLeft: 'solid 1px #04246A',
                                            borderRight: 'solid 1px #04246A',
                                            borderBottom: 'solid 1px #04246A',
                                            background: 'white',
                                            display: 'grid',
                                            justifyContent: savedDepots
                                                && !cell.row.original.isEditing
                                                || (cell.row.original.isEditing && cell.column.id === 'actions')
                                                ? 'center' : 'normal',
                                            alignItems: 'center'
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
        {(countries) &&
            <Select
                options={options}
                components={animatedComponents}
                closeMenuOnSelect={false}
                onChange={onChange}
                styles={customStyles}
            />
        }
    </>
    )
}