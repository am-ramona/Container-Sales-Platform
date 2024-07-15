import { useEffect, useState } from "react";
// import PropTypes, { arrayOf } from "prop-types";
import Collapse from "./Collapse";
import { Card, Checkbox } from "../styles";
import tw from "twin.macro";

/** Styles **/
const Section = tw.div`
flex flex-col mb-4
`;

const Title = tw.div`
mb-4 font-bold text-17 tracking-tighter
`;

const SectionItem = tw.div`
inline-flex 
items-center 
p-1 mt-1
`;
const SectionItemLabel = tw.span`
ml-2 capitalize
`;

export default function FilterBox({
  sections,
  title,
  getFilters,
  initialFilters,
}) {
  const [filters, setFilters] = useState(initialFilters || {});

  useEffect(() => {
    getFilters(filters);
  }, [filters, getFilters]);

  const generateFilters = (name, type) => {
    const updatedFilters = { ...filters };
    if (updatedFilters[type]) {
      if (updatedFilters[type].includes(name))
        updatedFilters[type] = updatedFilters[type].filter(
          (item) => item !== name
        );
      else updatedFilters[type].push(name);
    } else {
      updatedFilters[type] = [];
      updatedFilters[type].push(name);
    }

    setFilters(updatedFilters);
  };

  return (
    <Card tw="bg-panel-blue text-white">
      <div tw="min-w-0 p-4">
        <Title>{title}</Title>
        {sections.map((section) => (
          <div key={section.title} tw="mb-2">
            <Collapse open={true} trigger={section.label}>
              <hr tw="mt-1 border-gray-200" />
              <Section>
                {section.options.map((option) => (
                  <SectionItem key={option.value}>
                    <Checkbox
                      name={option.value}
                      checked={
                        filters[section.title] &&
                        filters[section.title].includes(option.value)
                          ? "checked"
                          : ""
                      }
                      onChange={() => {
                        generateFilters(option.value, section.title);
                      }}
                    />
                    <SectionItemLabel>{option.label}</SectionItemLabel>
                  </SectionItem>
                ))}
              </Section>
            </Collapse>
          </div>
        ))}
      </div>
    </Card>
  );
}
