

const parseData = (data: any) => {
  const crzEntriesByDate = data.map((item: any) => ({
    date: item.__dimension_alias__,
    crz_entries: item.__measure_alias__,
  }));

  return crzEntriesByDate;
};

const getCongestion = async () => {
  try {
    const response = await fetch("https://data.ny.gov/resource/t6yz-b64h.json?$query=SELECT%20date_trunc_ymd(%60toll_date%60)%20AS%20__dimension_alias__%2C%20SUM(%60crz_entries%60)%20AS%20__measure_alias__%20WHERE%20%60toll_date%60%20IS%20NOT%20NULL%20AND%20%60toll_date%60%20%3C%20%279999-01-01%27%20AND%20%60toll_date%60%20%3E%3D%20%271000-01-01%27%20AND%20(1%3D1)%20GROUP%20BY%20date_trunc_ymd(%60toll_date%60)%20LIMIT%201001&$$read_from_nbe=true&$$version=2.1", {
    headers: {
      "X-App-Token": "2PXTBN06MfTwGhCgS7m7feRPb",
    },
    method: "GET",
    });
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
    </div>
  );
};

export default Congestion;