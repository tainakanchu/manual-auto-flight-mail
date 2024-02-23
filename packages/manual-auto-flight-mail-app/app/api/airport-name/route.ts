import {
  AirportIATACode,
  airportNameMap,
} from "manual-auto-flight-mail-interface";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const iataCode = searchParams.get("iata")?.toUpperCase();

  if (!iataCode) {
    return new NextResponse("IATA code is required", { status: 400 });
  }

  if (!isAirportIATACode(iataCode)) {
    return new NextResponse("Invalid IATA code", { status: 400 });
  }

  const airportName = airportNameMap[iataCode];

  return new NextResponse(airportName, { status: 200 });
}

const isAirportIATACode = (iataCode: string): iataCode is AirportIATACode => {
  return AirportIATACode.includes(iataCode as AirportIATACode);
};
