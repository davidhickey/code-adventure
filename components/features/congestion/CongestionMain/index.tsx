"use client";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryGroup } from "victory";

const CongestionMain = ({ congestionData }: { congestionData: any }) => {
  return (
    <div className="w-full h-full">
      <VictoryChart
        height={400}
        width={400}
        theme={VictoryTheme.material}
      >
        <VictoryLine
          data={congestionData}
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
