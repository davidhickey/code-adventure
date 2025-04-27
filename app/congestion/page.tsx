import CongestionMain from "@/components/features/congestion/CongestionMain";

const parseData = (data: any): { date: string; crz_entries: number }[] => {
  const crzEntriesByDate = data.map((item: any) => ({
    date: new Date(item.__dimension_alias__).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    crz_entries: Number(item.__measure_alias__),
  }));

  return crzEntriesByDate;
};

const crzEntriesByDateQuery =
  `SELECT date_trunc_ymd(toll_date) AS __dimension_alias__, SUM(crz_entries) AS __measure_alias__ WHERE toll_date IS NOT NULL AND toll_date < '9999-01-01' AND toll_date >= '1000-01-01' AND (1=1) GROUP BY date_trunc_ymd(toll_date) LIMIT 1001`;

const getCongestion = async () => {
  try {
    const response = await fetch(
      `https://data.ny.gov/resource/t6yz-b64h.json?$query=${encodeURIComponent(crzEntriesByDateQuery)}`,
      {
        headers: {
          "X-App-Token": "2PXTBN06MfTwGhCgS7m7feRPb",
        },
        method: "GET",
      }
    );
    const data = await response.json();
    const parsedData = parseData(data);
    return parsedData;
  } catch (error) {
    console.error("Error fetching congestion data:", error);
    return [];
  }
};

const Congestion = async () => {
  const congestion = await getCongestion();
  console.log(congestion);
  return (
    <div>
      <h1>Congestion</h1>
      <CongestionMain congestionData={congestion} />
    </div>
  );
};

export default Congestion;
