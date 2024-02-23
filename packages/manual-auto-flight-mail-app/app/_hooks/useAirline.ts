import {
  AirLineIATACode,
  airLineNameMap,
} from "manual-auto-flight-mail-interface";

/**
 * AirLineIATACode と AirLineName を返す
 */
export const useAirline = (
  airlineIATACode: string
):
  | {
      airlineCode: AirLineIATACode;
      airlineName: string;
    }
  | {
      airlineCode: string;
      airlineName: "Unknown Airline";
    } => {
  const isValidAsAirlineIATACode = AirLineIATACode.includes(
    airlineIATACode as AirLineIATACode
  );
  // airLineIATACode が AirLineIATACode に含まれているかどうかを確認する
  if (!isValidAsAirlineIATACode) {
    return {
      airlineCode: airlineIATACode,
      airlineName: "Unknown Airline",
    };
  }

  const airlineName = airLineNameMap[airlineIATACode as AirLineIATACode];

  return {
    airlineCode: airlineIATACode as AirLineIATACode,
    airlineName: airlineName,
  };
};
