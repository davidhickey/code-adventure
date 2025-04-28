import { useMemo, useState } from "react";
import { VehicleClass } from "@/app/api/congestion/route";
import { useEffect } from "react";

const parseData = (data: { __dimension_alias__: string; __measure_alias__: string }[]): { date: string; crz_entries: number }[] => {
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

type FilterParams = {
  vehicleClass?: VehicleClass;
}

const useCongestionData = ({filterParams}: {filterParams?: FilterParams}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fullUrl = useMemo(() => {
    const queryParams = new URLSearchParams();
    if (filterParams?.vehicleClass) {
      queryParams.set('vehicleClass', filterParams.vehicleClass);
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/congestion?${queryParams.toString()}`;
  }, [filterParams]);

  const fetchCongestionData = async () => {
    try {
      const response = await fetch(
        fullUrl,
      );
    const {data, error, status} = await response.json();
    console.log('useHook api data', data);
      const parsedData = parseData(data);
      setData(parsedData);
    } catch (error) {
      console.error("Error fetching congestion data:", error);
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCongestionData();
  }, []);

  return { data, isLoading, error };
};

export default useCongestionData;
