import React, { useCallback, useEffect, useState } from "react";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {
    useTable
} from 'react-table';
import { connect } from "react-redux";
import {
    connectUser,
    disconnectUser,
    getUserProfile,
    getOrderID,
    getOrderDetails,
    getOrderSum,
    getProductsList,
    updateOrderDetails,
    getOrderCurrency,
} from "../../../redux";
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
import { findIndex } from "lodash";

export default function Grid({
    agent,
    countries,
    savedDepots,
    savedAssignedDepots,
    setSavedAssignedDepots,
    options,
    setOptions,
    data,
    setData,
    selected,
    selected1,
    selected2,
    selected3,
    selected4,
    selected5,
    setSelected,
    setSelected1,
    count,
    setCount,
    getIsoCountryCode,
    ...props
}) {
    const [country, setCountry] = useState([]);
    const [arr, setArr] = useState([]);
    const animatedComponents = makeAnimated();
    const [word, setWord] = useState([]);

    useEffect(() => {
        console.log('grid savedDepots', savedDepots)
        console.log('grid savedAssignedDepots', savedAssignedDepots)
        console.log('grid country', country)
        console.log('grid data', data)
        console.log('grid options', options)
        console.log('grid selected', selected)
        console.log('grid count', count)
        console.log('grid arr', arr)
        console.log('grid word', word)
        console.log('grid selected1', selected1)

    }, [selected, word,
        savedAssignedDepots,
        savedDepots,
        data,
        country,
        data,
        count,
        selected1
    ])

    const getAddButton = () => {
        return (
            <AddWrapper>
                <label> Actions </label>
            </AddWrapper>
        );
    };

    const unAssignDepotsToAgent = useCallback((row) => {
        // const newData = [...data.slice(0, row.index), ...data.slice(row.index + 1)];
        // setData(newData);
        // setCount(count-1);

        console.log('unAssignDepotsToAgent row', row)
        console.log('unAssignDepotsToAgent selected', selected)
        if (row.original.isEditing) {
        let copy = [...selected1];
        copy[row.index] = [];
        setSelected1(copy);
        }

        // axios.put(`${locationsEndpoints.agent}/none`, selected)
        //     .then(function (response) {
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
        // })
    }, [data, setData, selected]
    );

    const onChange = useCallback((e, index) => {
        // window.alert('onChange')

        // setSelected([]);
        // setDepots([]);
        console.log('onChange e', e)
        console.log('onChange index', index)

        axios.get(`${locationsEndpoints.depots}?isoCountryCode=${e.value}`)
            .then(function (response) {
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

                setSavedAssignedDepots([...savedAssignedDepots, ([{ [e.value]: depotsList }])])
                // setSavedAssignedDepots([...savedAssignedDepots, ([{ [e.value]: depotsList }])])
                // setSavedAssignedDepots( [{ [e.value]: depotsList }])
                setSelected(
                    selected.map((x, i) => {
                        console.log('selected i', i)
                        console.log('selected index', index)
                        if (i !== index) return x;
                        // return {
                        //     ...subItem,
                        //     text: text
                        // };
                        return ([{}])
                    }),
                );

                // setCurrency((currency) => [
                //     ...currency,
                //     oneProduct.productCurrency,
                //   ]);
                // setSelected(selected)
            })
    }, []
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

    const handleClickEditRow = useCallback((rowIndex) => {
        // window.alert("rowIndex", rowIndex);
        console.log('data before', data)
        // if ( data[index].isEditing ) setCountry([data[index].col1]);

        // setData(data.map((r, index) => (index === rowIndex.index ? { ...r, isEditing: true } : { ...r })));
        // setData(data.map((r, index) => (index === 0 ? { ...r, tralala : true, row : index} : { ...r })));
        var dataCopy = [...data]
        const itemIndex = dataCopy.map((r, index) => (index === rowIndex.index ? { ...r, isEditing: true, row: index } : { ...r }));
        console.log('itemIndex', itemIndex)
        setData(itemIndex)
        setCountry(rowIndex.original.col1)

        //    setCountry(data[index].col1)

        console.log('rowIndex', rowIndex)
        console.log('data after', data)
        console.log('editRow arr', arr)
        console.log('editRow country, savedDepots', country, savedDepots)
        console.log('editRow savedDepots', savedDepots)
        console.log('editRow data', data)
    },
        [data,
            setData,
            onChange,
            countries,
            country,
            selected,
            setSelected,
            animatedComponents,
            customStyles,
            count,
            setCount],
    );

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
                            gridTemplateColumns: 'auto auto',
                            gridGap: 10
                        }}>
                            {<StyledEdit
                                onClick={() => handleClickEditRow(row)}
                                alt="Edit Assigned Depots per Country"
                            />
                            }
                            <TrashIcon tw="self-center justify-self-center cursor-pointer"
                                onClick={() => unAssignDepotsToAgent(row)}
                                alt="Delete Assigned Depots per Country"
                            />
                            {/* <Modal
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
                            /> */}
                        </div>
                    )
                },
            },
        ],
        [countries, selected, savedDepots, unAssignDepotsToAgent]
    )

    useEffect(() => {
        console.log('savedAssignedDepots after changing data', data)
        console.log('savedAssignedDepots data', data)
        console.log('savedAssignedDepots country', country)
        console.log('savedAssignedDepots selected', selected)
        console.log('savedAssignedDepots savedDepots', savedDepots)
        console.log('savedAssignedDepots savedAssignedDepots', savedAssignedDepots)
        console.log('select arr, country, country[count-1]', arr, country, country[0])
        console.log('select country.length', country.length)
        console.log('select count', count)

        let result = [];
        if (savedAssignedDepots && savedAssignedDepots[0] && savedAssignedDepots[0].length > 1) {
            result = savedAssignedDepots[0].find(a => a[country])
            console.log('result', result)
            // console.log('result[data[index].col1] ', result[data[index].col1] )
        }

        var newValues = [];
        // if (selected.length > 0) {
        //     selected.map((oneSelected, index) => {
        //         console.log('selected', selected)
        //         console.log('oneSelected', oneSelected)
        //         console.log('oneSelected country', oneSelected[country])
        //         console.log('oneSelected["United Kingdom"]', oneSelected["United Kingdom"])
        //         console.log('oneSelected, oneSelected the country, oneSelected[country], oneSelected[country][0]', oneSelected, country, oneSelected[country], oneSelected[country][0])
        //         console.log('oneSelected the country', country)
        //         console.log('oneSelected[country]', oneSelected[country])
        //         return newValues.push(oneSelected[country][0])
        //     })
        // }
        console.log('newValues on returnnnn', newValues)

        let gridData = [...data];
        console.log('gridData', gridData)
        let gridDataUpdated = gridData.map((el, i) => (
            el.col1 === country ? {
                ...el,
                col2:
                    <MultiSelect
                        options={savedAssignedDepots.length > 0 ? result[country] : savedAssignedDepots[0]}
                        value={selected1[i]}
                        onChange={(e) => {
                            let copy = [...selected1];
                            copy[i] = e;
                            setSelected1(copy);
                        }}
                        labelledBy={"Select"}
                    />
            } : { ...el }
        ))
        console.log('gridDataUpdated', gridDataUpdated)
        setData(gridDataUpdated);
    }, [selected, word, savedAssignedDepots, country, selected1])


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
        console.log('EditableCell id', id)
        console.log('EditableCell index', index)
        console.log('EditableCell savedAssignedDepots', savedAssignedDepots)
        console.log('EditableCell savedAssignedDepots[0]', savedAssignedDepots[0])
        console.log('EditableCell country', country)
        console.log('EditableCell data[index]', data[index])
        console.log('EditableCell selected', selected)
        console.log('EditableCell selected.length', selected.length)
        // console.log('EditableCell selected[0]', selected[0])
        console.log('EditableCell selected[data[index]]', selected[data[index]])
        console.log('EditableCell data[index].row', data[index].row)
        console.log('EditableCell data[index].isEditing', data[index].isEditing)
        console.log('EditableCell savedAssignedDepots.length', savedAssignedDepots.length)
        console.log('selected[data[index].col1]', selected[data[index].col1])
        console.log('data[index].col1', data[index].col1)
        // console.log('EditableCell savedAssignedDepots[0][0][country]', savedAssignedDepots[0][0][country])
        // if (data[index].isEditing && selected.length === 0) setCountry(data[index].col1)
        // if ( data[index].isEditing && selected.length === 0 ) setCountry(data[index].col1)
        // if ( selected.length === 0 ) getCountryDepots(data[index].col1)
        // console.log('getCountryDepots(data[index].col1)', getCountryDepots(data[index].col1))
        let savedAssignedDepotsList = []

        // if (data[index].isEditing && selected.length === 0) {

        // axios.get(
        //     `${locationsEndpoints.depots}?isoCountryCode=` +
        //       getIsoCountryCode(`${data[index].col1}`)
        //   )
        //   .then(function (response) {
        //     console.log("useEffect response", response);
        //     // const depotsList = [ ... response.data.containers]
        //     // console.log('response.data.containers', response.data.containers)
        //     const depotsList = response.data.map(
        //       ({
        //         internalID: label,
        //         internalID: value,
        //         internalID: depotCode,
        //         ...rest
        //       }) => ({
        //         label,
        //         value,
        //         depotCode,
        //         ...rest,
        //       })
        //     );

        //     savedAssignedDepotsList.push({ [data[index].col1]: depotsList });
        //     console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
        //     setSavedAssignedDepots([savedAssignedDepotsList]);
        //     // console.log("Editable depotsList", depotsList);
        //     // setSelected(depotsList)
        //   });
        // }
        // console.log('newnew', data[index]['isEditing'] && data[index].row && typeof selected[data[index].row] !== 'undefined' && selected[0].length > 0)
        // console.log('savedAssignedDepots[0].find(a => a[data[index].col1])', savedAssignedDepots[0].find(a => a[data[index].col1]))
        let result = [];
        if (savedAssignedDepots[0].length > 1) {
            result = savedAssignedDepots[0].find(a => a[data[index].col1])
            console.log('result2', result)
            // console.log('result[data[index].col1] ', result[data[index].col1] )
        }
        console.log('result22', result)
        // if ( result[data[index].col1]) console.log('result[data[index].col1]2', result[data[index].col1] )
        console.log('country', country)
        // if (selected[0]) console.log('selected[0][data[index].col1]', selected[0][data[index].col1] )

        let filtered = []
        if (selected.length > 0) {
            filtered = selected.reduce((a, o) => (o[data[index].col1] && a.push(o[data[index].col1]), a), [])
            console.log('filtered', filtered)
            console.log('filtered[data[index].col1]', filtered[data[index].col1])
        }

        var newValues = [];
        // if (selected.length > 0) {
        //     selected.map((oneSelected, index) => {
        //         console.log('oneSelected', oneSelected)
        //         console.log('oneSelected.country', oneSelected[country])
        //         return newValues.push(oneSelected[country][0])
        //     })
        // }
        // console.log('newValues on return', newValues)
        // const [ word, setWord] = useState([])  

        // let countrySelection;
        // switch(country) {
        //     case 'Spain':
        //     countrySelection = {selected1, setSelected1}
        //       return countrySelection; 
        //     case 'United Kingdom':
        //         countrySelection = {selected2, setSelected2}
        //         return countrySelection;
        //       case 'Italy':
        //         countrySelection = {selected3, setSelected3}
        //         return countrySelection;
        //         case 'Lebanon':
        //             countrySelection = {selected4, setSelected4}
        //             return countrySelection;
        //     default:
        //         countrySelection = {selected5, setSelected5}
        //         return countrySelection;
        //   } 
console.log('selected1[index], index', selected1[index], index)
        return (
            (typeof data[index]['isEditing'] !== 'undefined' &&
                data[index]['isEditing']) && typeof result !== 'undefined' ?
                id === 'col1' ? (data[index].isEditing && data[index].col1) :
                    id === 'col2'
                        ?
                        //   <MultiSelect
                        //   options={data[index].isEditing && savedAssignedDepots.length > 0 ? result[data[index].col1] : savedAssignedDepots[0] }
                        //   value={data[index]['isEditing'] && data[index].row && typeof selected[data[index].row] !== 'undefined' && selected[0] && selected[0].length > 0 && selected.length > 0 && word.length > 0 ? newValues : []}
                        //   onChange={(e) => changeSelected(e, data[index].col1)}
                        //   labelledBy={"Select"}
                        // />

                        <MultiSelect
                            options={data[index].isEditing && savedAssignedDepots.length > 0 ? result[data[index].col1] : savedAssignedDepots[0]}
                            value={selected1[index]}
                            onChange={(e) => {
                                let copy = [...selected1];
                                copy[index] = e;
                                setSelected1(copy);
                            }}
                            labelledBy={"Select"}
                        />
                        :
                        initialValue
                : initialValue
        )
    };

    const changeSelected = (e, country) => {
        // window.alert("changeSelected");
        console.log("changeSelected country", country)
        console.log('changeSelected e', e)
        let newSelected = [...selected];
        // newSelected.filter(new => new.hasOwnProperty([country])) ? newSelected.vendor[0].type.push("foo") :
        newSelected.push({ [country]: e });
        // newSelected.push(e)
        // Object.assign(newSelected[0][country], e);

        console.log('selected, newSelected', selected, newSelected)
        setSelected(newSelected)
        // setWord([[{'JUBAIL': [{label: 'A', value: 'B'}]}]])

    };

    //     const getCountryDepots = (country) => {
    //         console.log("inside getCountryDepots")
    //         let savedAssignedDepotsList = []
    //         axios.get(
    //             `${locationsEndpoints.depots}?isoCountryCode=` +
    //               getIsoCountryCode(`${country}`)
    //           )
    //           .then(function (response) {
    //             console.log("useEffect response", response);
    //             // const depotsList = [ ... response.data.containers]
    //             // console.log('response.data.containers', response.data.containers)
    //             const depotsList = response.data.map(
    //               ({
    //                 internalID: label,
    //                 internalID: value,
    //                 internalID: depotCode,
    //                 ...rest
    //               }) => ({
    //                 label,
    //                 value,
    //                 depotCode,
    //                 ...rest,
    //               })
    //             );

    //             savedAssignedDepotsList.push({ [country]: depotsList });
    //             console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
    //             return savedAssignedDepotsList
    //     })
    //     return savedAssignedDepotsList
    // }

    // async function getCountryDepots(country) {
    //     try {
    //       await axios
    //         .get(`${locationsEndpoints.depots}?isoCountryCode=` +
    //         getIsoCountryCode(`${country}`))
    //         .then(function (response) {
    //           console.log("getCountryDepots response data", response.data);
    //           const depotsList = response.data.map(
    //             ({
    //               internalID: label,
    //               internalID: value,
    //               internalID: depotCode,
    //               ...rest
    //             }) => ({
    //               label,
    //               value,
    //               depotCode,
    //               ...rest,
    //             })
    //           );
    //           let savedAssignedDepotsList = []
    //           savedAssignedDepotsList.push({ [country]: depotsList });
    //           console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
    //           return savedAssignedDepotsList
    //         })
    //         .catch(function (error) {
    //           console.log("getDepotsFromCountries response error", error);
    //           return error.message;
    //         });
    //     } catch {
    //       throw new Error("getDepotsFromCountries error");
    //     }
    //   }

    // Set our editable cell renderer as the default Cell renderer
    const defaultColumn = {
        Cell: EditableCell
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

    console.log('table gridData', data)
    console.log('table rows', rows)
    console.log('table columns', columns)
    console.log('useTable countries', countries)
    console.log('useTable defaultColumn[savedAssignedDepots]', defaultColumn['savedAssignedDepots'])

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
                                            justifyContent:
                                                !cell.row.original.isEditing
                                                    || (cell.row.original.isEditing && cell.column.id === 'actions')
                                                    ? 'center' : 'normal',
                                            alignItems: 'center',
                                            textAlign: cell.column.id === 'col2' ? 'left' : 'center'
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
    </>
    )
}
