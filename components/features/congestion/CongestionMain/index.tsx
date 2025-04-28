"use client";

import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryGroup,
  VictoryAxis,
  VictoryVoronoiContainer,
  VictoryTooltip,
} from "victory";
import useCongestionData from "../hooks/useCongestionData";
import { VehicleClasses } from "@/app/api/congestion/route";
import { useState } from "react";

const vehicleClassesSelectOptions: Record<VehicleClasses | "all", string> = {
  all: "All",
  cars: "Cars",
  trucks: "Trucks",
  multiUnitTrucks: "Multi-Unit Trucks",
  buses: "Buses",
  motorcycles: "Motorcycles",
  taxis: "Taxis",
};

const customTheme = {
  axis: {
    style: {
      grid: {
        stroke: "none",
      },
      tickLabels: {
        fontSize: 4,
        padding: 4,
      },
      ticks: {
        size: 4,
      },
    },
  },
  tooltip: {
    style: {
      fontSize: 4,
      padding: 4,
      strokeWidth: 1,
      fill: "white",
    },
  },
};

const CongestionMain = () => {
  const [selectedVehicleClass, setSelectedVehicleClass] = useState<
    VehicleClasses | "all"
  >("all");
  const { data, isLoading, error } = useCongestionData({
    filterParams: { vehicleClass: selectedVehicleClass as VehicleClasses },
  });

  return (
    <div className="w-full h-full">
      <div className="congestion-line-chart-container">
        <div className="header">
          <h1>Congestion</h1>
          <div className="filter-container">
            <label htmlFor="vehicleClass">Vehicle Class</label>
            <select
              name="vehicleClass"
              id="vehicleClass"
              onChange={(e) =>
                setSelectedVehicleClass(
                  e.target.value as VehicleClasses | "all"
                )
              }
            >
              {Object.entries(vehicleClassesSelectOptions).map(
                ([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
        <div className="body relative">
          {isLoading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!isLoading && !error && (
            <VictoryChart height={400} width={400} theme={customTheme} containerComponent={
            <VictoryVoronoiContainer
              voronoiDimension="x"
              labelComponent={<VictoryTooltip/>}
              labels={({ datum }) => {
                console.log(datum);
                return datum.y;
              }}
            />
            }
            >
              <VictoryAxis
                crossAxis
                tickFormat={data.map((item) =>
                  item.date.includes("/01/") || item.date.includes("01/05/2025")
                    ? item.date
                    : null
                )}
                label="Date"
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(t) => t.toLocaleString()}
                label="Number of Vehicle Entries"
              />

              <VictoryLine
                data={data.map((item) => ({
                  x: item.date,
                  y: item.crz_entries,
                }))}
                interpolation="natural"
              />
            </VictoryChart>
          )}
        </div>
      </div>
    </div>
  );
};

export default CongestionMain;
