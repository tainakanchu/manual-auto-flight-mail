import {
  AirportIATACode,
  airportNameMap,
} from "manual-auto-flight-mail-interface";

export const useAirport = (
  airportIATACode: string,
):
  | {
      airportCode: AirportIATACode;
      airportName: string;
    }
  | {
      airportCode: string;
      airportName: "Unknown Airport";
    } => {
  const isValidAsAirportIATACode = AirportIATACode.includes(
    airportIATACode as AirportIATACode,
  );
  // airLineIATACode が AirLineIATACode に含まれているかどうかを確認する
  if (!isValidAsAirportIATACode) {
    return {
      airportCode: airportIATACode,
      airportName: "Unknown Airport",
    };
  }

  // 有効である時点で AirportIATACode であることが確定している
  const iataCode = airportIATACode as AirportIATACode;

  const airportName = airportNameMap[iataCode];

  return {
    airportCode: iataCode,
    airportName: airportName,
  };
};
