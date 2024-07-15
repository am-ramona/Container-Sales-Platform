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
    setSelected,
    count,
    setCount,
    getIsoCountryCode,
    ...props
}) {
    /*** unused, to be removed ***/
    const [depots, setDepots] = useState([]);
    /***********/
    const [country, setCountry] = useState([]);
    const [addFlag, setAddFlag] = useState(false);
    const [arr, setArr] = useState([]);
    const [newOption, setNewOption] = useState({});
    const animatedComponents = makeAnimated();

    useEffect(() => {
        console.log('grid savedDepots', savedDepots)
        console.log('grid savedAssignedDepots', savedAssignedDepots)
        console.log('grid data', data)
        console.log('grid country', country)
        console.log('grid data', data)
        console.log('grid options', options)
        // setData(dataa)
        console.log('grid selected', selected)
        console.log('grid addFlag', addFlag)
        console.log('grid depots', depots)
        console.log('grid count', count)
        console.log('grid arr', arr)

    }, [selected, depots, savedAssignedDepots, savedDepots, data, country, data, count])

    // console.log('assigndepot root selected', selected)

    const getAddButton = () => {
        return (
            <AddWrapper>
                <label> Actions </label>
                {/* <label>Add</label>
                {countries && <AddSign onClick={() => setAddFlag(true)} >+</AddSign>} */}
            </AddWrapper>
        );
    };

    const unAssignDepotsToAgent = useCallback((row) => {
        const newData = [...data.slice(0, row.index), ...data.slice(row.index + 1)];
        setData(newData);
        setCount(count-1);

        console.log('unAssignDepotsToAgent row', row)
        console.log('unAssignDepotsToAgent selected', selected)
        
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

    const onChange = useCallback((e, index) => {
        window.alert('onChange')
        setCountry([e.value]);
        // setSelected([]);
        // setDepots([]);

        console.log('onChange addFlag', addFlag)
        console.log('onChange e', e)
        console.log('onChange index', index)
        // setCountry([...country, e.value]);

        // console.log('savedDepots.containers[index].country', savedDepots.containers[index].country)
        // savedDepots.containers[index].country
        // let savedDepotsCopy = savedDepots.containers.map(el => (
        //        el.label==='name'? {...el, key: value}: el
        //      ))
        // console.log('onChange e, index', e, index)
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

                if (addFlag)  {setSavedAssignedDepots(depotsList);} else {setSavedAssignedDepots([...savedAssignedDepots, ([{ [e.value]: depotsList }])])}
                // setSavedAssignedDepots([...savedAssignedDepots, ([{ [e.value]: depotsList }])])
                // setSavedAssignedDepots( [{ [e.value]: depotsList }])
                // setSavedAssignedDepots(depotsList)
                // setSelected([])
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
                setDepots([])
                console.log('onChange addFlag 2', addFlag)
   
                // setDepots(depotsList)
                // setCurrency((currency) => [
                //     ...currency,
                //     oneProduct.productCurrency,
                //   ]);
                // setSelected(selected)
            })

            // setSavedAssignedDepots([])
        
    }, [addFlag]
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
        window.alert("rowIndex", rowIndex);
        console.log('data before', data)
        // setEditableRow({ [rowIndex]: true });
        // setTableData((prev) =>
        //   prev.map((r, index) => (rowIndex === index ? { ...r, isEditing: true } : {...r}))
        // );
        // updateMyArray( arr => [...arr, `${arr.length}`]);

        // setData(data.map((r, index) => (index === rowIndex.index ? { ...r, isEditing: true } : { ...r })));
        setData(data.map((r, index) => (index === 0 ? { ...r, tralala : true, row : index} : { ...r })));
        var dataCopy = [...data]
        const itemIndex = dataCopy.map((r, index) => (index === rowIndex.index ? { ...r, isEditing : true, row : index} : { ...r }));
       console.log('itemIndex', itemIndex)
       setData(itemIndex)
        // setGridData(dataa);
        // const options = countries.map(({
        //     isoCountryCode: value,
        //     isoCountryName: label,
        //     ...rest
        // }) => ({
        //     value,
        //     label,
        //     ...rest
        // }));
        // console.log('editRow options', options)
        // let checkKeyPresenceInArray = country => options.some(option => Object.keys(option).includes(country));
        // let arr = options;
        // country.map((ct) => {
        //     console.log('country ct', ct)
        //     let array = options.filter(option => option.value !== ct);
        //     console.log('addNewRow array', array)
        //     arr.push(array)
        // }) 
        // country.map((ct) => {
        //     let array = arr.filter(option => option.value !== ct);
        //     console.log('editRow array', array)
        //     arr = array
        //     return arr;
        // })
        console.log('rowIndex', rowIndex)
        console.log('data after', data)
        // var updateOptions = options.filter(option => option.value !== country);
        console.log('editRow arr', arr)
        console.log('editRow country, savedDepots, depots', country, savedDepots, depots )
        console.log('editRow savedDepots', savedDepots)
        console.log('editRow depots', depots)
        console.log('editRow data', data)

        //     let newTableData = [...data];
        //     var index = newTableData.findIndex(x=> x.id === id);
        //     let newMarkers = newTableData.map(el => (
        //         el.label==='name'? {...el, key: value}: el
        //   ))
        //   this.setState({ markers });
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

    // useEffect(() => {
    //     if (addFlag && count > 0 && savedDepots.containers.length > 0){
    //         // window.alert('savedDepots already exist')
    //              const options = countries.map(({
    //             isoCountryCode: value,
    //             isoCountryName: label,
    //             ...rest
    //         }) => ({
    //             value,
    //             label,
    //             ...rest
    //         }));
    //         let result = options.filter(option => savedDepots.containers.some(savedDepot => option.label !== savedDepot.country));
    //         console.log('result', result)
    //         setOptions(result)
    //     }
    // }, [count, savedDepots, countries, addFlag])

    useEffect(() => {
        if (addFlag) {
            // window.alert('addFlag changed')
            setSavedAssignedDepots([]);
            // const options = countries.map(({
            //     isoCountryCode: value,
            //     isoCountryName: label,
            //     ...rest
            // }) => ({
            //     value,
            //     label,
            //     ...rest
            // }));
            console.log('addFlag options', options)
            // let checkKeyPresenceInArray = country => options.some(option => Object.keys(option).includes(country));
            let arr = options;
            // country.map((ct) => {
            //     console.log('country ct', ct)
            //     let array = options.filter(option => option.value !== ct);
            //     console.log('addNewRow array', array)
            //     arr.push(array)
            // }) 
            // country.map((ct) => {
            //     let array = arr.filter(option => option.value !== ct);
            //     console.log('addFlag array', array)
            //     arr = array
            //     return arr;
            // })
            setArr(arr)
            // var updateOptions = options.filter(option => option.value !== country);
            console.log('addFlag options', options)
            console.log('addFlag arr', arr)
            console.log('addFlag addFlag', addFlag)
            console.log('addFlag depots', depots)
            console.log('addFlag savedAssignedDepots', savedAssignedDepots)
            console.log('addFlag count', count)
            console.log('addFlag savedDepots',  savedDepots)

            let result = []
            var properties = ['label', 'value']

            if (count > 0 && savedDepots && savedDepots.containers.length > 0){
                result = options.filter(function(o1){
                    return !savedDepots.containers.some(function(o2){
                        return o1.label === o2.country;     
                    });
                }).map(function(o){
                    return properties.reduce(function(newo, name){
                        newo[name] = o[name];
                        return newo;
                    }, {});
                });
            }
            console.log('result outside', result)

            if (count < 5) {
                window.alert("count<5")
                let newTableData = [...data];
                newTableData.push({
                    col1: <Select
                    id={count}
                        options={result.length > 0 ? result : arr}
                        components={animatedComponents}
                        closeMenuOnSelect={true}
                        onChange={onChange}
                        styles={customStyles}
                    />,
                    col2: <MultiSelect
                    id={count}
                        options={savedAssignedDepots}
                        value={selected}
                        onChange={setSelected}
                        labelledBy={"Select"}
                    />
                });
                setData(newTableData);
            }
            setCount(count + 1)
        }
      }, [addFlag, options]);

      useEffect(() => {
          if (addFlag) {
        //   window.alert('savedAssignedDepots changed')
          console.log('savedAssignedDepots after changing data', data )
          console.log('savedAssignedDepots data', data)
          console.log('savedAssignedDepots country', country)
          console.log('savedAssignedDepots selected', selected)
          console.log('savedAssignedDepots savedDepots', savedDepots)

          var selectValue = arr.find(ar => ar.value === country[0]);
          console.log('select arr, country, country[count-1]', arr, country, country[0])
          console.log('select country.length', country.length)   
          console.log('select count', count)    
   
          console.log("select value", selectValue)

          let result = []
          var properties = ['label', 'value']

          if (count > 0 && savedDepots && savedDepots.containers.length > 0){
          result = options.filter(function(o1){
            return !savedDepots.containers.some(function(o2){
                return o1.label === o2.country;  
            });
        }).map(function(o){
            return properties.reduce(function(newo, name){
                newo[name] = o[name];
                return newo;
            }, {});
        });
    }
    console.log('result outside', result)

        let gridData = [...data];
        let  gridDataUpdated = gridData.map((el, i) => console.log("gridDataUpdated i, count", i, count) || (
            i===count-1? {...el,   col1: <Select
                id={count}
                    options={result.length > 0 ? result : arr}
                    value={arr.find(ar => ar.value === country[0])}
                    components={animatedComponents}
                    closeMenuOnSelect={true}
                    onChange={onChange}
                    styles={customStyles}
                />,
                col2: <MultiSelect
                id={count}
                    options={savedAssignedDepots}
                    value={selected}
                    onChange={setSelected}
                    labelledBy={"Select"}
                />}: {...el}
        ))
        console.log('gridDataUpdated', gridDataUpdated)
        setData(gridDataUpdated);
        // let gridData = data[length-1].map(el => (
        //     el.value===country[index]? {...el}: null
        // ))
          }
      }, [savedAssignedDepots, savedDepots, selected])

      useEffect(() => {
        if (addFlag) {
            setSelected([]);
            setSavedAssignedDepots([]);
        } 
      }, [addFlag, setSelected])

      useEffect(() => {
        // if (setSelected) setAddFlag(false) 
      }, [setSelected])

    // const addNewRow = useCallback(
    //     () => {
    //         console.log('addNewRow count', count)
    //         console.log('addnewRow grid depots', depots)
    //         console.log('addNewRow data', data)
    //         console.log('addNewRow country', country)
    //         setAddFlag(true);

    //         const options = countries.map(({
    //             isoCountryCode: value,
    //             isoCountryName: label,
    //             ...rest
    //         }) => ({
    //             value,
    //             label,
    //             ...rest
    //         }));
    //         console.log('addNewRow options', options)
    //         // let checkKeyPresenceInArray = country => options.some(option => Object.keys(option).includes(country));
    //         let arr = options;
    //         // country.map((ct) => {
    //         //     console.log('country ct', ct)
    //         //     let array = options.filter(option => option.value !== ct);
    //         //     console.log('addNewRow array', array)
    //         //     arr.push(array)
    //         // }) 
    //         country.map((ct) => {
    //             let array = arr.filter(option => option.value !== ct);
    //             console.log('addNewRow array', array)
    //             arr = array
    //             return arr;
    //         })
    //         setArr(arr)
    //         // var updateOptions = options.filter(option => option.value !== country);
    //         console.log('addNewRow options', options)
    //         console.log('addNewRow arr', arr)
    //         console.log('addNewRow addFlag', addFlag)
    //         if (count < 5) {
    //             let newTableData = [...data];
    //             newTableData.push({
    //                 col1: <Select
    //                     options={arr}
    //                     components={animatedComponents}
    //                     closeMenuOnSelect={true}
    //                     onChange={onChange}
    //                     styles={customStyles}
    //                 />,
    //                 col2: <MultiSelect
    //                     options={depots}
    //                     value={selected}
    //                     onChange={setSelected}
    //                     labelledBy={"Select"}
    //                 />
    //             });
    //             setData(newTableData);
    //             setCount(count + 1)
    //         }
    //     },
    //     [data,
    //         setData,
    //         onChange,
    //         countries,
    //         country,
    //         depots,
    //         selected,
    //         setSelected,
    //         animatedComponents,
    //         customStyles,
    //         addFlag,
    //         count,
    //         setCount],
    // );

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

    useEffect(() => {
        if (typeof country !== 'undefined' && country.length > 0) {
            console.log('get the options country', country)
            console.log('get the options')
            console.log('get the options getIsoCountryCode', getIsoCountryCode(`${country}`))
            setSavedAssignedDepots([]);
        let savedAssignedDepotsList = []
        axios.get(
            `${locationsEndpoints.depots}?isoCountryCode=` +
              getIsoCountryCode(`${country}`)
          )
          .then(function (response) {
            console.log("useEffect response", response);
            // const depotsList = [ ... response.data.containers]
            // console.log('response.data.containers', response.data.containers)
            const depotsList = response.data.map(
              ({
                internalID: label,
                internalID: value,
                internalID: depotCode,
                ...rest
              }) => ({
                label,
                value,
                depotCode,
                ...rest,
              })
            );

            savedAssignedDepotsList.push({ [country]: depotsList });
            setSavedAssignedDepots([savedAssignedDepotsList]);
            // console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
            // console.log("Editable depotsList", depotsList);
            // setSelected(depotsList)
    })
}

    }, [country])

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
        // console.log('EditableCell selected', selected)
        console.log('EditableCell savedAssignedDepots', savedAssignedDepots)
        console.log('EditableCell savedAssignedDepots[0]', savedAssignedDepots[0])
        // console.log("savedDepots.containers[index].country", savedDepots.containers[index].country)
        console.log('EditableCell country[index]', country[index])
        // console.log('EditableCell savedDepots.containers[index].depot', savedDepots.containers[index].depot)
        console.log('EditableCell data[index]', data[index])
        console.log('EditableCell options', options)
        console.log('EditableCell selected', selected)
        console.log('EditableCell selected.length', selected.length)
            
        const newOption = options && options.filter((item) => item.value === country[index])
        // console.log('selectedOption', selectedOption)
        console.log('EditableCell newOption', newOption)
        console.log('selected[data[index][row]]',selected[data[index].row])
        console.log('data[index]', data[index])
        // console.log('Editable filter savedAssignedDepots[0]', savedAssignedDepots[0].filter(item => item[savedDepots.containers[index].country]), savedAssignedDepots[0])
        // console.log('Editable filter2', savedAssignedDepots[0].map(a => a[savedDepots.containers[index].country]))
        // console.log('Editable filter3', savedAssignedDepots[0].reduce((a, o) => (o[savedDepots.containers[index].country] && a.push(o[savedDepots.containers[index].country]), a), []))
        // savedAssignedDepots[0].some(function(el) {
        //     return el.isoCountryName === savedDepots.containers[index].country;
        //   }) ? savedAssignedDepots[0].filter(savedAssignedDepot => {
        //   return savedAssignedDepot.isoCountryName === savedDepots.containers[index].country
        // })  : null 
        // myObj = savedAssignedDepots[0].find(savedAssignedDepot => obj.prop === 'something');
        // console.log('', ( in obj))
        // console.log('EditableCell savedAssignedDepots[0]1', savedAssignedDepots[0].some(function(el) {
        //     console.log('el', el)
        //     el.map(function(e){
        //         console.log('e isoCountryName', e.isoCountryName)
        //         console.log('e savedDepots.containers[index].country', savedDepots.containers[index].country)
        //         return e.isoCountryName === savedDepots.containers[index].country;
        //     })
        //     // return el.isoCountryName === savedDepots.containers[index].country;
        //   }) )

        // console.log('EditableCell savedAssignedDepots[0]2', savedAssignedDepots[0].filter(savedAssignedDepot => {
        //   return savedAssignedDepot.isoCountryName === savedDepots.containers[index].country
        // }) )

        let result = []
        var properties = ['label', 'value']

        if (count > 0 && options && savedDepots && savedDepots.containers.length > 0){
            result = options.filter(function(o1){
                return !savedDepots.containers.some(function(o2){
                    return o1.label === o2.country;     
                });
            }).map(function(o){
                return properties.reduce(function(newo, name){
                    newo[name] = o[name];
                    return newo;
                }, {});
            });
        }
        console.log('result outside', result)

        // if (data[index].isEditing && selected.length === 0) setCountry(data[index].col1)

        // getCountryDepots(data[index].col1)

        // setCountry([e.value]);
        let savedAssignedDepotsList = []
        if (data[index].isEditing && selected.length === 0) {

        axios.get(
            `${locationsEndpoints.depots}?isoCountryCode=` +
              getIsoCountryCode(`${data[index].col1}`)
          )
          .then(function (response) {
            console.log("useEffect response", response);
            // const depotsList = [ ... response.data.containers]
            // console.log('response.data.containers', response.data.containers)
            const depotsList = response.data.map(
              ({
                internalID: label,
                internalID: value,
                internalID: depotCode,
                ...rest
              }) => ({
                label,
                value,
                depotCode,
                ...rest,
              })
            );

            savedAssignedDepotsList.push({ [data[index].col1]: depotsList });
            console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
            setSavedAssignedDepots([savedAssignedDepotsList]);
            // console.log("Editable depotsList", depotsList);
            // setSelected(depotsList)
          });
        }

        //   axios.get(`${locationsEndpoints.depots}?isoCountryCode=${e.value}`)
        //   .then(function (response) {
        //       const depotsList = response.data.map(({
        //           internalID: label,
        //           internalID: value,
        //           internalID: depotCode,
        //           ...rest
        //       }) => ({
        //           label,
        //           value,
        //           depotCode,
        //           ...rest
        //       }));

        //       if (addFlag)  {setSavedAssignedDepots(depotsList);} else {setSavedAssignedDepots([...savedAssignedDepots, ([{ [e.value]: depotsList }])])}
        //       setSelected(
        //           selected.map((x, i) => {
        //               console.log('selected i', i)
        //               console.log('selected index', index)
        //               if (i !== index) return x;
        //                   // return {
        //                   //     ...subItem,
        //                   //     text: text
        //                   // };
        //                   return ([{}])
        //           }),
        //         );

        return (
            (typeof data[index]['isEditing'] !== 'undefined' &&
                data[index]['isEditing']) ?
                // id === 'col1'
                    // ?
                    // <Select
                    //     defaultValue={Object.keys(newOption).length === 0 ? {label: savedDepots.containers[index].country} : newOption}
                    //     options={result.length > 0 ? result : options}
                    //     components={animatedComponents}
                    //     closeMenuOnSelect={true}
                    //     onChange = {(e) => onChange(e, index)}
                    //     styles={customStyles}
                    // />
                    // :
                    id === 'col2'
                        ?
                        // <MultiSelect
                        //     value={selected}
                        //     options={savedAssignedDepots}
                        //     onChange={setSelected}
                        //     labelledBy={"Select"}
                        // />savedAssignedDepots[0].reduce((a, o) => (o[savedDepots.containers[index].country] && a.push(o.value), a), [])  
                                  <MultiSelect
                                  options={data[index].isEditing && selected.length === 0 ? savedAssignedDepots : savedAssignedDepots.length > 0 && savedAssignedDepots[0] && savedAssignedDepots[0].reduce((a, o) => (o[savedDepots.containers[index].country] && a.push(o[savedDepots.containers[index].country]), a), [])[0]  }
                                  value={data[index]['isEditing'] && data[index].row && typeof selected[data[index].row] !== 'undefined' && selected[data[index].row].length > 0 ? selected[data[index].row] : []}
                                  onChange={(e) => changeSelected(e, data[index])}
                                  labelledBy={"Select"}
                                />
                        :
                        initialValue 
                        : initialValue
        )
    };

    const changeSelected = useCallback((e) => {
        // window.alert("changeSelected");
        console.log('changeSelected e', e)
        let newSelected =[];
        newSelected.push(e);
        console.log('newSelected', newSelected)
        setSelected(newSelected)

      }, [selected]);

    const getCountryDepots = (country) => {
        let savedAssignedDepotsList = []
        axios.get(
            `${locationsEndpoints.depots}?isoCountryCode=` +
              getIsoCountryCode(`${country}`)
          )
          .then(function (response) {
            console.log("useEffect response", response);
            // const depotsList = [ ... response.data.containers]
            // console.log('response.data.containers', response.data.containers)
            const depotsList = response.data.map(
              ({
                internalID: label,
                internalID: value,
                internalID: depotCode,
                ...rest
              }) => ({
                label,
                value,
                depotCode,
                ...rest,
              })
            );

            savedAssignedDepotsList.push({ [country]: depotsList });
            console.log("Editable savedAssignedDepotsList", savedAssignedDepotsList);
            // console.log("Editable depotsList", depotsList);
            // setSelected(depotsList)
    })
}


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

    // console.log('rows', rows)
    console.log('table gridData', data)
    console.log('table rows', rows)
    console.log('table columns', columns)

    // console.log('headerGroups', headerGroups)
    // console.log('getTableBodyProps()', getTableBodyProps())
    console.log('useTable countries', countries)
    console.log('useTable defaultColumn[savedAssignedDepots]', defaultColumn['savedAssignedDepots'])
    // let options = [];
    // if (countries) {
    //     options = countries.map(({
    //         isoCountryCode: value,
    //         isoCountryName: label,
    //         ...rest
    //     }) => ({
    //         value,
    //         label,
    //         ...rest
    //     }));
    // }

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
    </>
    )
}
