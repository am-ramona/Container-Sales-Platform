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
  const [depots, setDepots] = useState([]);
  const [selected, setSelected] = useState([]);
  const [count, setCount] = useState(0);

  /** to delete **/
  const [assignedDepots, setAssignedDepots] = useState([]);
  /***************/
  const [savedAssignedDepots, setSavedAssignedDepots] = useState([]);
  const [filters, setFilters] = useState([]);
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
    if (savedDepots)
      console.log(
        "useEffect savedDepots.containers, selected",
        savedDepots.containers,
        selected
      );
    console.log("useEffect countries", countries);
    console.log("useEffect selected", selected);
    console.log("useEffect count", count);
    console.log("useEffect savedAssignedDepots", savedAssignedDepots);
    console.log("useEffect assignedDepots", assignedDepots);
    console.log("useEffect options", options);
    console.log("useEffect gridData", gridData);
  }, [
    savedDepots,
    savedAssignedDepots,
    assignedDepots,
    selected,
    countries,
    count,
    options,
    gridData,
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
    }
    // console.log('savedDepotsList.map((key) =>{[key[country]: key])', savedDepotsList.map((key) =>[{key["country"]: key}]))
    setSelected(savedDepotsList);
  }, [savedDepots]);

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

  // const callAssignedDepots = useCallback((depotsList, depotsForAgents) => {
  //   setDepots(depotsList);
  //   // setSelected(depotsForAgents);

  //   setSelected([...selected, { index: depotsForAgents }]);
  // }, []);

  useEffect(() => {
    // window.alert('useEffect')
    console.log('savedDepottts', savedDepots)
    setSavedAssignedDepots([])
              // if (savedDepots) {
      // window.alert("savedDepots defined");
      // let depotsForAgents = [],
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

            // const savedAssignedDepots = [
            //   {
            //     label: savedDepot.depot,
            //     value: savedDepot.depot,
            //     depotCode: savedDepot.depot,
            //   },
            // ];
            // setDepots(depotsList)
            // const updateSelected = [...selected, assignedDepots];
            // depotsForAgents.push(updateSelected);
            /***  depotsForAgents not a state to replace & removed ****/
            // console.log("useEffect2 depotsForAgents", depotsForAgents);
            /*******************/
            // callAssignedDepots(depotsList, depotsForAgents);

            savedAssignedDepotsList.push({ [savedDepot.country]: depotsList });
            console.log("savedAssignedDepotsList", savedAssignedDepotsList);
            console.log("depotsList", depotsList);
            // setSelected(depotsList)
          });
        console.log("savedAssignedDepotsList1", savedAssignedDepotsList);
        dataa.push({
          col1: savedDepot.country,
          col2: savedDepot.depot,
        });
        savedDepotsCountriesList.push(savedDepot.country);

        // dataa = [
        //   {
        //     col1: "Italy",
        //     col2: savedDepot.country === "Italy" ? savedDepot.depot : "",
        //   },
        //   {
        //     col1: "Lebanon",
        //     col2: savedDepot.country === "Lebanon" ? savedDepot.depot : "",
        //   },
        //   {
        //     col1: "Portugal",
        //     col2: savedDepot.country === "Portugal" ? savedDepot.depot : "",
        //   },
        //   {
        //     col1: "Spain",
        //     col2: savedDepot.country === "Spain" ? savedDepot.depot : "",
        //   },
        //   {
        //     col1: "United Kingdom",
        //     col2:
        //       savedDepot.country === "United Kingdom" ? savedDepot.depot : "",
        //   },
        // ];
        return dataa;
      });
      // console.log("savedDepotsCountriesList after", savedDepotsCountriesList);
      if (countriesNames) {
        let countriesNamesList = [...countriesNames];
        countriesNamesList = countriesNamesList.filter(
          (val) => !savedDepotsCountriesList.includes(val)
        );
        // console.log("countriesNames end", countriesNamesList);
        countriesNamesList.map((countryName) =>
          dataa.push({
            col1: countryName,
            col2: '',
          })
        );
      }
      setSavedAssignedDepots([savedAssignedDepotsList]);
      console.log("savedAssignedDepotsList2", savedAssignedDepotsList);
      // setSavedAssignedDepots(savedAssignedDepotsList);
      setGridData(dataa);
    // }
  }, [savedDepots, countriesNames]);

  async function getDepotsFromCountries() {
    try {
      await axios
        .get(`${locationsEndpoints.countries}`)
        .then(function (response) {
          console.log("getDepotsFromCountries response 200", response.data);
          axios
            .get(
              `${locationsEndpoints.depots}?isoCountryCode=response.data."isoCountryCode"`
            )
            .then(function (response) {});
        })
        .catch(function (error) {
          console.log("getDepotsFromCountries response error", error);
          return error.message;
        });
    } catch {
      throw new Error("getDepotsFromCountries error");
    }
  }

  //   const onChange = (e) => {
  //     setDepots([])
  //     setAssignedDepots([])
  //     // console.log('onChange e', e)
  //     // console.log('onChange');
  //     axios.get(`${locationsEndpoints.depots}?isoCountryCode=${e.value}`)
  //         .then(function (response) {
  //             // const depotsList = [ ... response.data.containers]
  //             // console.log('response.data.containers', response.data.containers)
  //             const depotsList = response.data.map(({
  //                 internalID: label,
  //                 internalID: value,
  //                 internalID: depotCode,
  //                 ...rest
  //             }) => ({
  //                 label,
  //                 value,
  //                 depotCode,
  //                 ...rest
  //             }));
  //             setDepots(depotsList)
  //         })
  // }

  // const dataa = [
  //   {
  //     col1: (
  //       <Select
  //         options={options}
  //         components={animatedComponents}
  //         closeMenuOnSelect={false}
  //         onChange={onChange}
  //         styles={customStyles}
  //       />
  //     ),
  //     col2: (
  //       <MultiSelect
  //         options={depots}
  //         value={selected}
  //         onChange={setSelected}
  //         labelledBy={"Select"}
  //       />
  //     ),
  //   },
  // ];

  let discardChangesProps = {
    message: "Are you sure you want to discard the changes you made?",
    button1: "Discard Changes",
    button2: "Cancel",
    buttonColor: "primary-blue",
    cancelColor: "outline-blue",
  };

  // savedDepots.map((savedDepot, index) => {
  // const memoizedItems = useMemo(() => {
  //   return savedDepots.map(savedDepot => React.Memo(savedDepot));
  // }, [])

  // let dataa = [];
  // let index = 0;
  // for (const MemoizedItem of memoizedItems) {
  //   dataa.push(<MemoizedItem key={index} index={index} />);
  //   index++;
  // }

  // const dataa = React.useMemo(
  //   () => [
  //     {
  //       col1: (
  //         <Select
  //           options={options}
  //           components={animatedComponents}
  //           closeMenuOnSelect={false}
  //           onChange={onChange}
  //           styles={customStyles}
  //         />
  //       ),
  //       col2: (
  //         <MultiSelect
  //           options={depots}
  //           value={assignedDepots}
  //           onChange={setAssignedDepots}
  //           labelledBy={"Select"}
  //         />
  //       ),
  //     },
  //   ],
  //   []
  // );

  //   const dataa = React.useMemo(
  //     () => [
  // {
  //     col1: '',
  //     col2: '',
  // },
  // {
  //     col1: 'Hello',
  //     col2: 'World',
  // },
  // {
  //     col1: 'react-table',
  //     col2: 'rocks',
  // },
  // {
  //     col1: 'whatever',
  //     col2: 'you want',
  // },
  //     ],
  //     []
  // )
  console.log("root gridData", gridData);

  const assignDepotsToAgent = useCallback(() => {
    // window.alert("assignDepotsToAgent");
    console.log("assignDepotsToAgent selected", selected);
    axios
      .put(
        `${locationsEndpoints.agent}/${props.location.state.agentUid}`,
        selected.pop()
      )
      .then(function (response) {
        history.push("/admin/manage-agents");
      });
  }, [selected]);

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
            setSelected={setSelected}
            savedDepots={savedDepots}
            getIsoCountryCode={getIsoCountryCode}
          />
        </form>
        <Actions>
          {/* <Cancel onClick={() => history.push('/admin/manage-agents')}>Cancel</Cancel> */}
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
          {/* <SaveBtn color="primary-blue" onClick={assignDepotsToAgent}>
            Save
          </SaveBtn> */}
        </Actions>
      </Wrapper>
    </SelectionCard>
  );
};

export default AssignDepots;
