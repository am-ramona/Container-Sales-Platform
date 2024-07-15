import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import MultiSelect from "../../../common/components/MultiSelect";
import Grid from "./AssignDepotsGrid";
import Modal from "../../../common/components/Modal/Modal";
import Popup from "../../../common/components/Popup";
import { Card, Button, Input } from "../../../common/styles";
import { locationsEndpoints } from "../../../common/constants/apiEndpoints";
import useQuery from "../../../common/hooks/api/useQuery";
import useQueryBuilder from "../../../common/hooks/useQueryBuilder";
import axios from "axios";
import tw from "twin.macro";

const Header = tw.div`
text-primary-blue text-17 font-bold`;

const Wrapper = tw.section`
ml-102 mt-32`;

const SelectionCard = tw(Card)`
h-full min-h-containersSelection`;

const Actions = tw.div`
grid grid-cols-2ColAuto 
items-center justify-end 
text-right pt-sm`;

const Cancel = tw.span`
font-light underline mr-30 cursor-pointer
text-primary-blue mdl:text-14 xs:text-13 `;

const SaveBtn = tw(Button)`
h-41 w-151 text-white mdl:text-14 xs:text-13 
hover:( bg-secondary-blue border-secondary-blue )
`;

const DiscardChangesModal = tw(Modal)`
inline`;

const AssignDepots = (props) => {
  const history = useHistory();
  const animatedComponents = makeAnimated();
  const [gridData, setGridData] = useState([]);
  const [options, setOptions] = useState([]);
  const [countriesNames, setCountriesNames] = useState([]);

  const [selected, setSelected] = useState([]);
  const [selected1, setSelected1] = useState([[], [], [], [], []]);

  const [count, setCount] = useState(0);
  const [savedAssignedDepots, setSavedAssignedDepots] = useState([]);
  const [filters, setFilters] = useState([]);
  const [arrayOfDepotsPerCountryUpdated, setArrayOfDepotsPerCountryUpdated] =
    useState([]);
  // const { filterQuery } = useQueryBuilder(filters);
  const {
    data: countries,
    isError: countryError,
    isLoading: countryLoading,
  } = useQuery(`${locationsEndpoints.countries}`);

  const {
    data: savedDepots,
    isError: savedDepotsError,
    isLoading: savedDepotsLoading,
  } = useQuery(
    `${locationsEndpoints.savedDepots}?agentUid=${props.location.state.agentUid}`
  );

  useEffect(() => {
      console.log("useEffect savedDepots, selected",savedDepots,selected);
    console.log("useEffect countries", countries);
    console.log("useEffect selected", selected);
    console.log("useEffect selected1", selected1);
    console.log("useEffect count", count);
    console.log("useEffect savedAssignedDepots", savedAssignedDepots);
    console.log("useEffect options", options);
    console.log("useEffect gridData", gridData);
    console.log("useEffect countriesNames", countriesNames);
    console.log(
      "useEffect arrayOfDepotsPerCountryUpdated",
      arrayOfDepotsPerCountryUpdated
    );
  }, [
    savedDepots,
    savedAssignedDepots,
    selected,
    countries,
    count,
    options,
    gridData,
    countriesNames,
    arrayOfDepotsPerCountryUpdated,
  ]);
  console.log("assignDepots props", props);
  // console.log("gridDataError", gridDataError);

  useEffect(() => {
    let countriesList =
      countries &&
      countries.map(
        ({ isoCountryCode: value, isoCountryName: label, ...rest }) => ({
          value,
          label,
          ...rest,
        })
      );

    let countriesNames =
      countries && countries.map((country) => country.isoCountryName);
    // console.log("countriesNames", countriesNames);

    setOptions(countriesList);
    setCountriesNames(countriesNames);
  }, [countries]);

  useEffect(() => {
    let savedDepotsList = [],
      savedDepotsCountriesList = [];
    if (savedDepots) {
      savedDepotsList = savedDepots.containers.map(
        ({ depot: label, depot: value, ...rest }) => [
          {
            label,
            value,
            ...rest,
          },
        ]
      );
      console.log("savedDepotsList", savedDepotsList);
      setSelected(savedDepotsList);
    }
  }, [savedDepots]);

  useEffect(() => {
    let savedAssignedDepotsList = [];
    if (typeof countriesNames !== "undefined") {
      countriesNames.map((countryName, index) => {
        axios
          .get(
            `${locationsEndpoints.depots}?isoCountryCode=` +
              getIsoCountryCode(`${countryName}`)
          )
          .then(function (response) {
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

            savedAssignedDepotsList.push({ [countryName]: depotsList });
            setSavedAssignedDepots([savedAssignedDepotsList]);
          });
      });
    }
  }, [countriesNames]);

  // useEffect(() => {
  //   if (typeof countriesNames !== "undefined") {
  //     let arrayOfDepotsPerCountry = [...countriesNames];
  //     let arrayOfDepotsPerCountryUpdated = [];
  //     let dataa = [];

  //     countriesNames.map((countryName, index) => {
  //       // arrayOfDepotsPerCountryUpdated = arrayOfDepotsPerCountry.map(function(item) { return item === countryName ? [(countryName: {})] : item; });
  //       console.log('arrayOfDepotsPerCountryUpdated', arrayOfDepotsPerCountryUpdated)
  //       axios
  //       .get(
  //         `${locationsEndpoints.savedDepots}?agentUid=${props.location.state.agentUid}&country=${countryName}`
  //       )
  //         .then(function (response) {
  //           arrayOfDepotsPerCountryUpdated.push({[countryName]: [response.data.containers]})
  //           console.log('useEffect response.data.containers', response.data.containers)
  //           console.log('arrayOfDepotsPerCountryUpdated inside', arrayOfDepotsPerCountryUpdated)
  //           setArrayOfDepotsPerCountryUpdated(arrayOfDepotsPerCountryUpdated)
  //           dataa.push({
  //             col1: [countryName],
  //             col2: response.data.containers.map(value => value.depot).length + ' Selected',
  //           });
  //           setGridData(dataa);
  //           console.log("depots per country", response.data);
  //         })
  //         .catch(function (error) {
  //           console.log("depots per country response error", error);
  //           return error.message;
  //         });
  //         console.log('arrayOfDepotsPerCountryUpdated after',  arrayOfDepotsPerCountryUpdated)
  //     });
  //   }
  //   console.log('in countriesNames')
  // }, [countriesNames]);

  const getIsoCountryCode = (code) => {
    let isoCountryCode;
    switch (code) {
      case "Spain":
        isoCountryCode = "ES";
        break;
      case "United Kingdom":
        isoCountryCode = "GB";
        // code block
        break;
      case "Italy":
        isoCountryCode = "IT";
        // code block
        break;
      case "Lebanon":
        isoCountryCode = "LB";
        // code block
        break;
      case "Portugal":
        isoCountryCode = "PT";
        // code block
        break;
      default:
      // code block
    }
    return isoCountryCode;
  };

  useEffect(() => {
    console.log("savedDepottts", savedDepots);
    setSavedAssignedDepots([]);

    var dataa = [],
      savedAssignedDepotsList = [],
      savedDepotsCountriesList = [];

    savedDepots &&
      savedDepots.containers.map((savedDepot, index) => {
        setCount(index + 1);
        axios
          .get(
            `${locationsEndpoints.depots}?isoCountryCode=` +
              getIsoCountryCode(`${savedDepot.country}`)
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

            savedAssignedDepotsList.push({ [savedDepot.country]: depotsList });
            console.log("savedAssignedDepotsList", savedAssignedDepotsList);
            console.log("depotsList", depotsList);
            // setSelected(depotsList)
          });
        console.log("savedAssignedDepotsList1", savedAssignedDepotsList);
        console.log("savedDepot in", savedDepot);
        console.log("selected1", selected1);
        // dataa.push({
        //   col1: savedDepot.country,
        //   col2: savedDepot.depot,
        // });
        savedDepotsCountriesList.push(savedDepot.country);
        // return dataa;
      });
    console.log("savedDepotsCountriesList after", savedDepotsCountriesList);
    console.log("savedDepots out", savedDepots);
    // if (arrayOfDepotsPerCountryUpdated) {
    //   countriesNamesList.map((countryName) =>
    //   dataa.push({
    //     col1: countryName,
    //     col2: "",
    //   })
    // }
    // if (countriesNames) {

    if (countriesNames && savedDepots) {
      let countriesNamesList = [...countriesNames],
        countriesNamesListExists = [...countriesNames];
      // console.log("countriesNames end", countriesNamesList);
      // let result = countriesNamesList.filter(o1 => savedDepots.containers.some(o2 => o1 === o2.country));
      let result = savedDepots.containers.filter((o1) =>
        countriesNamesList.some((o2) => o1.country === o2)
      );
      console.log('countriesNamesList result', result)

      countriesNamesListExists = countriesNamesListExists.filter((val) =>
        savedDepotsCountriesList.includes(val)
      );

      console.log('countriesNamesList countriesNamesListExists', countriesNamesListExists)
      var result2 = [];
      countriesNamesListExists.map((countryName) => {
        console.log("countriesNamesListExists", countriesNamesListExists);
        // result2 = result.find((obj) => {
        //   return obj.country === countryName;
        // });
        result2 = result.filter((obj) =>
        obj.country === countryName
      );
      // check = neww.filter((obj) => obj.label !== "");
        console.log("result depots", result2);
       var depotsCombined = result2.map(function(elem){
          return elem.depot;
      }).join(", ")
      console.log('result combined', depotsCombined)
        dataa.push({
          col1: countryName,
          // col2: result2.depot,
          col2: depotsCombined
        });
      });
      // var result2 = result.find(obj => {
      //   return obj.country === country
      // });
      // dataa.push({
      //   col1: countryName,
      //   col2: "",
      // })

      countriesNamesList = countriesNamesList.filter(
        (val) => !savedDepotsCountriesList.includes(val)
      );

      countriesNamesList.map((countryName) =>
        dataa.push({
          col1: countryName,
          col2: "",
        })
      );
    }

    if (typeof savedDepots === "undefined" && countriesNames) {
      let countriesNamesList = [...countriesNames];
      countriesNamesList.map((countryName) =>
        dataa.push({
          col1: countryName,
          col2: "",
        })
      );
    }
    // let savedDepotsList = [];
    // savedDepotsList =
    //   savedDepots && savedDepots.containers.map((oneSavedDepot, index) => {

    //   });

    // var result =  savedDepots && savedDepots.containers.find(obj => {
    //   return obj.country === 'United Kingdom'
    // });

    // console.log('savedDeppots result', result)

    setSavedAssignedDepots([savedAssignedDepotsList]);
    console.log("savedAssignedDepotsList2", savedAssignedDepotsList);
console.log('needed dataa', dataa)
    const neww = dataa.map(({ col2: label, col2: value, col2: depotCode, ...rest }) => ({
      label,
      value,
      depotCode,
      ...rest,
    }));

    const newwArr = [];
    // let newwUpdated;
    // newwUpdated = neww.findIndex((obj => obj.label !== ""));
    // console.log('newwUpdated', newwUpdated)
    // neww[newwUpdated] = []
    neww.map((newarr) => {
      if (newarr.label === '') return newwArr.push([]);
      if (newarr.label.includes(",")) 
      {let depotSplit = newarr.label.split(', '); let newDepots = [];
      console.log('depotSplit', depotSplit)
      var depotSplitObj = depotSplit.map((oneSplit, i) => {
           newDepots.push({label: oneSplit, value: oneSplit, depotCode : oneSplit})
      })
console.log('newDepots', newDepots)
      return newwArr.push(newDepots)
      }
      return newwArr.push([newarr]);
    });
    // var check = [];
    // check = neww.filter((obj) => obj.label !== "");

    // console.log("check", check);
    console.log("newwArr, selected1", newwArr, selected1);
    console.log("neww, selected1", neww, selected1);
    setSelected1(newwArr);
    setGridData(dataa);
    // setSelected1(dataa);
  }, [savedDepots, countriesNames, arrayOfDepotsPerCountryUpdated]);

  const assignDepotsToAgent = useCallback(() => {
    // window.alert("assignDepotsToAgent");
    console.log("assignDepotsToAgent selected1", selected1);
    var merged = [].concat.apply([], selected1);

    console.log("merged", merged);
    console.log("assignDepotsToAgent merged", merged);
    axios
      .put(
        `${locationsEndpoints.agent}/${props.location.state.agentUid}`,
        merged
      )
      .then(function (response) {
        history.push("/admin/manage-agents");
      });
  }, [selected1, savedDepots]);

  // const callAssignedDepots = useCallback((depotsList, depotsForAgents) => {
  //   // setSelected(depotsForAgents);

  //   setSelected([...selected, { index: depotsForAgents }]);
  // }, []);

  let discardChangesProps = {
    message: "Are you sure you want to discard the changes you made?",
    button1: "Discard Changes",
    button2: "Cancel",
    buttonColor: "primary-blue",
    cancelColor: "outline-blue",
  };

  let saveDepotsProps = {
    message: "Are you sure you want to save ?",
    button1: "Yes",
    button2: "No",
    buttonColor: "primary-blue",
    cancelColor: "outline-blue",
  };

  return (
    <SelectionCard>
      <Header> Assign Depots </Header>
      <Wrapper>
        <form tw="grid grid-cols-addAgent gap-y-6 text-primary-blue text-14 font-light items-center">
          <label htmlFor="name" className="name">
            Agent Name*
          </label>
          <Input
            id="name"
            tw="text-14 w-337 h-40 px-2.5 bg-secondary-gray"
            type="text"
            placeholder={props.location.state.agentName}
            disabled
          />
          <label htmlFor="email" className="email">
            Agent Email*
          </label>
          <Input
            id="email"
            tw="text-14 w-337 h-40 px-2.5 bg-secondary-gray"
            type="text"
            placeholder={props.location.state.agentEmail}
            disabled
          />
          <label htmlFor="agentPhone" className="phone">
            Agent Phone Number*
          </label>
          <Input
            id="agentPhone"
            tw="text-14 w-337 h-40 px-2.5 bg-secondary-gray"
            type="text"
            placeholder={props.location.state.agentPhone}
            disabled
          />
          <label htmlFor="depotsAssigned" className="depots-assigned">
            Depots Assigned*
          </label>
          <Grid
            count={count}
            setCount={setCount}
            agent={props.location.state.agentUid}
            countries={countries}
            options={options}
            setOptions={setOptions}
            savedDepots={savedDepots}
            savedAssignedDepots={savedAssignedDepots}
            setSavedAssignedDepots={setSavedAssignedDepots}
            data={gridData}
            setData={setGridData}
            selected={selected}
            selected1={selected1}
            setSelected={setSelected}
            setSelected1={setSelected1}
            getIsoCountryCode={getIsoCountryCode}
          />
        </form>
        <Actions>
          <DiscardChangesModal
            inline
            width="450px"
            height="auto"
            titleFontSize="24px"
            component={<Cancel>Cancel</Cancel>}
            title="Discard Changes"
            children={
              <Popup
                name="markUnavailable"
                {...discardChangesProps}
                accept={() => history.push("/admin/manage-agents")}
              />
            }
          />
          <Modal
            grid
            width="450px"
            height="auto"
            titleFontSize="24px"
            component={<SaveBtn color="primary-blue">Save</SaveBtn>}
            title="Save Changes"
            children={
              <Popup
                name="saveAssignDepotsToAgent"
                {...saveDepotsProps}
                accept={assignDepotsToAgent}
              />
            }
          />
        </Actions>
      </Wrapper>
    </SelectionCard>
  );
};

export default AssignDepots;
