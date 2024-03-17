import { useEffect, useState } from "react";

const api = "/api/airline-name";

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
    isLoading: boolean;
  }>({
    airlineName: "Unknown Airline",
    isLoading: false,
  });

  // 桁数が2桁で大文字の場合は、 API経由で取得する
  useEffect(() => {
    // IATA 航空会社は必ず2桁の大文字である。そうでない場合は unknown とする
    if (airlineIATACode.length !== 2) {
      setAirlineInfo({
        airlineName: "Unknown Airline",
        isLoading: false,
      });
      return;
    }

    const url = `${api}?iata=${airlineIATACode}`;

    setAirlineInfo({
      airlineName: "loading...",
      isLoading: true,
    });

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setAirlineInfo({
          airlineName: json.airlineName,
          isLoading: false,
        });
      })
      .catch((e) => {
        setAirlineInfo({
          airlineName: "Unknown Airline",
          isLoading: false,
        });
      });
  }, [airlineIATACode]);

  return airlineInfo;
};
