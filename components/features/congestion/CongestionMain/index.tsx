"use client";

import { VictoryChart, VictoryLine, VictoryTheme, VictoryGroup } from "victory";
import useCongestionData from "../hooks/useCongestionData";
const CongestionMain = () => {
  const { data, isLoading, error } = useCongestionData({});
  return (
    <div className="w-full h-full">
      <VictoryChart
        height={400}
        width={400}
        theme={VictoryTheme.material}
      >
        <VictoryLine
          data={data}
          x="date"
          y="crz_entries"
          interpolation="natural"
          style={{
            data: {
              stroke: "red",
            },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default CongestionMain;
