import { useMemo, useState } from "react";
import { VehicleClasses } from "@/app/api/congestion/route";
import { useEffect } from "react";

const parseData = (
  data: { __dimension_alias__: string; __measure_alias__: string }[]
): { date: string; crz_entries: number }[] => {
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
  vehicleClass?: VehicleClasses | "all";
};

const useCongestionData = ({
  filterParams,
}: {
  filterParams?: FilterParams;
}) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fullUrl = useMemo(() => {
    const queryParams = new URLSearchParams();
    if (filterParams?.vehicleClass && filterParams.vehicleClass !== "all") {
      queryParams.set("vehicleClass", filterParams.vehicleClass);
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/congestion?${queryParams.toString()}`;
  }, [filterParams]);

  const fetchCongestionData = async () => {
    try {
      const response = await fetch(fullUrl);
      const { data, error, status } = await response.json();
      if (status !== 200 || error) {
        throw new Error(error, {
          cause: status,      
        });
      }
      
      const parsedData = parseData(data);
      console.log('parsedData', parsedData);
      setData(parsedData);
    } catch (error: any) {
      console.error(`Error fetching congestion data. Status: ${error.cause}`, error);
      if (error instanceof Error) {
        if (error.cause === 400) {
          setError("Invalid vehicle class. Please try again.");
        } else {
          setError("An unknown error occurred. Please try again.");
        }
      } else {
        setError("An unknown error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCongestionData();
  }, [fullUrl]);

  return { data, isLoading, error };
};

export default useCongestionData;
