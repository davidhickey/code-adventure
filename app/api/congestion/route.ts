import { NextRequest, NextResponse } from "next/server";

export enum VehicleClassesEnum {
  cars = "1 - Cars, Pickups and Vans",
  trucks = "2 - Single-Unit Trucks",
  multiUnitTrucks = "3 - Multi-Unit Trucks",
  buses = "4 - Buses",
  motorcycles = "5 - Motorcycles",
  taxis = "6 - TLC Taxi/FHV",
}

export type VehicleClasses = keyof typeof VehicleClassesEnum;

export async function GET(req: NextRequest) {
  const baseQuery = `SELECT date_trunc_ymd(toll_date) AS __dimension_alias__, SUM(crz_entries) AS __measure_alias__ WHERE toll_date IS NOT NULL AND toll_date < '9999-01-01' AND toll_date >= '1000-01-01' AND (1=1) GROUP BY date_trunc_ymd(toll_date) LIMIT 1001`;

  try {
    const { searchParams } = new URL(req.url);
    let query = baseQuery;
    const vehicleClassFilter = searchParams.get("vehicleClass");
    if (vehicleClassFilter) {
      const vehicleClassQuery = `(vehicle_class = '${VehicleClassesEnum[vehicleClassFilter as VehicleClasses]}') AND`;
      query = `SELECT date_trunc_ymd(toll_date) AS __dimension_alias__, SUM(crz_entries) AS __measure_alias__ WHERE ${vehicleClassQuery} toll_date IS NOT NULL AND toll_date < '9999-01-01' AND toll_date >= '1000-01-01' AND (1=1) GROUP BY date_trunc_ymd(toll_date) LIMIT 1001`;
    }

    const encodedQuery = `$query=${encodeURIComponent(query)}`;

    const response = await fetch(
      `https://data.ny.gov/resource/t6yz-b64h.json?${encodedQuery}`,
      {
        headers: {
          "X-App-Token": "2PXTBN06MfTwGhCgS7m7feRPb",
        },
        method: "GET",
      }
    );
    if (!response.ok) {
      console.log("response", response);
      return NextResponse.json({ error: response.statusText, status: response.status, data:null });
    }

    const data = await response.json();
    return NextResponse.json({ data, status: 200 });
  } catch (error) {
    console.error("Server API Error:", error);
    return NextResponse.json({ error: "Server API Error", status: 500, data: null });
  }
}
