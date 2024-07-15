import { ResponsivePie } from "@nivo/pie";
import "twin.macro";

export default function Pie({ data }) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
      startAngle={-3}
      innerRadius={0.7}
      colors={{ scheme: "blues" }}
      borderColor={{ from: "color", modifiers: [["darker", "0.2"]] }}
      radialLabel={function (e) {
        return (
          <tspan tw="text-sm md:text-base capitalize font-light text-primary-blue">
            {e.label + " (" + e.value + "%)"}
          </tspan>
        );
      }}
      radialLabelsTextXOffset={3}
      radialLabelsTextColor="#04246A"
      radialLabelsLinkOffset={-5}
      radialLabelsLinkHorizontalLength={10}
      radialLabelsLinkColor={{ from: "color" }}
      enableSliceLabels={false}
      sliceLabelsRadiusOffset={0.3}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
    />
  );
}
