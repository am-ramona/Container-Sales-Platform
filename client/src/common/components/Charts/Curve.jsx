import { ResponsiveLine } from "@nivo/line";
import { theme } from 'twin.macro';

const styled = // You can pass this object to the `theme` property
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
      },
      "legend": {
        "text": {
          "fontSize": 15,
          "fill": "#04246A",
          // "fontWeight": 'bold'
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


export default function Curve({data}) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 60, bottom:40, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat={(value) => `${value} €`}
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendOffset: 25,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 10,
        tickRotation: 0,
        legend: "In €",
        legendOffset: -50,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      colors={theme`colors.primary-blue`}   
      lineWidth={3}
      enablePoints={false}
      areaBaselineValue={10}
      areaOpacity={0.1}
      useMesh={true}
      theme={styled}
    />
  );
}
