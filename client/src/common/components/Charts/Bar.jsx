import { ResponsiveBar } from "@nivo/bar";
import { BoxLegendSvg } from "@nivo/legends";
import useMediaQuery from "../../hooks/useMediaQuery";

const theme =
{
  "background": "#ffffff",
  "fontSize": 14,
  "axis": {
      "domain": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 0
          }
      },
      "ticks": {
          "line": {
              "stroke": "#777777",
              "strokeWidth": 1
          }
      }
  },
  "grid": {
      "line": {
          "stroke": "#dddddd",
          "strokeWidth": 0
      }
  }
}

const BarLegend = ({ height, legends, width }) => (
  <>
    {legends.map(legend => (
      <BoxLegendSvg
        key={JSON.stringify(legend.data.map(({ id }) => id))}
        {...legend}
        containerHeight={height}
        containerWidth={width}
      />
    ))}
  </>
);

export default function Bar({ data }) {
  const keys = ["USA", "SPAIN", "ITALY"];
  const colors = ["#e88351", "#051039", "#6284e3"];
  let isMobile = useMediaQuery('(max-width: 768px)');
  const getBarColor = bar => colors[keys.indexOf(bar.data.country)];
  return (
    <ResponsiveBar
      data={data}
      keys={["value"]}
      indexBy="id"
      layout={isMobile ? "horizontal" : "vertical"}
      margin={{ top: 70, right: 120, bottom: 50, left: 80 }}
      padding={0.3}
      innerPadding={10}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={getBarColor}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Days",
        legendPosition: "middle",
        legendOffset: 35,
      }}
      axisLeft={{
        tickSize: 2,
        tickPadding: 2,
        tickRotation: 0,
        legend: "Country",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableGridY={false}
      labelTextColor={{ from: "color", modifiers: [["darker", "1.8"]] }}
      enableLabel={false}
      layers={["grid", "axes", "bars", "markers", BarLegend]}
      legends={[
        {
          dataFrom: "keys",
          data: keys.map((id, index) => ({
            color: colors[index],
            id,
            label:id
          })),
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 121,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      theme={theme}
    />
  );
}
