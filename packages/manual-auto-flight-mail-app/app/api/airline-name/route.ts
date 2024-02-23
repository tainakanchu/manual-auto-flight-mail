import {
  AirLineIATACode,
  airLineNameMap,
} from "manual-auto-flight-mail-interface";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const iataCode = searchParams.get("iata")?.toUpperCase();

  if (!iataCode) {
    return new NextResponse("IATA code is required", { status: 400 });
  }

  if (!isAirlineIATACode(iataCode)) {
    return new NextResponse("Invalid IATA code", { status: 400 });
  }

  const airlineName = airLineNameMap[iataCode];

  const body = JSON.stringify({ airlineName });

  return new NextResponse(body, { status: 200 });
}

const isAirlineIATACode = (iataCode: string): iataCode is AirLineIATACode => {
  return AirLineIATACode.includes(iataCode as AirLineIATACode);
};
