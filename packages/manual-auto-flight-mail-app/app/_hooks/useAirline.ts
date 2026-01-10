import { useEffect, useState } from "react";

const api = "/api/airline-name";
const unknownAirlineInfo = {
  airlineName: "Unknown Airline",
  isLoading: false,
} as const;

/**
 * AirLineIATACode と AirLineName を返す
 */
export const useAirline = (
  airlineIATACode: string,
):
  | {
      airlineName: string;
      isLoading: boolean;
    }
  | {
      airlineName: "Unknown Airline";
      isLoading: false;
    } => {
  const [airlineInfo, setAirlineInfo] = useState<{
    airlineName: string;
    iata: string | null;
  }>({
    airlineName: unknownAirlineInfo.airlineName,
    iata: null,
  });
  const isValidIata = airlineIATACode.length === 2;

  // 桁数が2桁で大文字の場合は、 API経由で取得する
  useEffect(() => {
    // IATA 航空会社は必ず2桁の大文字である。そうでない場合は unknown とする
    if (!isValidIata) {
      return;
    }

    const url = `${api}?iata=${airlineIATACode}`;

    let isActive = true;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!isActive) {
          return;
        }
        setAirlineInfo({
          airlineName: json.airlineName,
          iata: airlineIATACode,
        });
      })
      .catch(() => {
        if (!isActive) {
          return;
        }
        setAirlineInfo({
          airlineName: unknownAirlineInfo.airlineName,
          iata: airlineIATACode,
        });
      });
    return () => {
      isActive = false;
    };
  }, [airlineIATACode, isValidIata]);

  if (!isValidIata) {
    return unknownAirlineInfo;
  }

  const isLoading = airlineInfo.iata !== airlineIATACode;

  return {
    airlineName: isLoading ? "loading..." : airlineInfo.airlineName,
    isLoading,
  };
};
