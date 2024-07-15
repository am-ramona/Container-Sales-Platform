import MultiSelectComponent from "react-multi-select-component";
import { Checkbox } from "../../styles";
import "./MultiSelect.css";
import "twin.macro";

const customItemRenderer = ({ checked, option, onClick, disabled }) => (
  <div>
    <Checkbox
      tw="align-middle m-0"
      onChange={onClick}
      checked={checked}
      tabIndex={0}
      disabled={disabled}
    />
    <span tw="inline-block pl-2 align-middle m-0">{option.label}</span>
  </div>
);

const customValueRenderer = (selected, _options) => {
  return selected.length === _options.length
    ? "All selected"
    : selected.length > 1 && `${selected.length} selected`;
};

export function filterOptions(options, filter) {
  console.log("filtering !");
  if (!filter) {
    return options;
  }
  const re = new RegExp(filter, "i");
  return options.filter(({ value }) => value && value.match(re));
}

export default function MultiSelect(props) {
  return (
    <MultiSelectComponent
      {...props}
      hasSelectableOptions={"Select All"}
      valueRenderer={customValueRenderer}
      ItemRenderer={customItemRenderer}
      filterOptions={filterOptions}
      overrideStrings={{
        selectSomeItems: "All...",
        allItemsAreSelected: "All items are selected.",
        selectAll: "Select All",
        search: "Search",
        clearSearch: "Clear Search",
      }}
    />
  );
}
