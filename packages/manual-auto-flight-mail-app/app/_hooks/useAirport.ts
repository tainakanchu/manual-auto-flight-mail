import { useState, useEffect } from "react";

const api = "/api/airport-name";
const unknownAirportInfo = {
  airportName: "Unknown Airport",
  isLoading: false,
} as const;

export const useAirport = (
  airportIATACode: string,
):
  | {
      airportName: string;
      isLoading: boolean;
    }
  | {
      airportName: "Unknown Airport";
      isLoading: false;
    } => {
  const [airportInfo, setAirportInfo] = useState<{
    airportName: string;
    iata: string | null;
  }>({
    airportName: unknownAirportInfo.airportName,
    iata: null,
  });
  const isValidIata = airportIATACode.length === 3;

  // 桁数が3桁で大文字の場合は、 API経由で取得する
  useEffect(() => {
    // IATA 空港コードは必ず3桁の大文字である。そうでない場合は unknown とする
    if (!isValidIata) {
      return;
    }

    const url = `${api}?iata=${airportIATACode}`;

    let isActive = true;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (!isActive) {
          return;
        }
        setAirportInfo({
          airportName: json.airportName,
          iata: airportIATACode,
        });
      })
      .catch(() => {
        if (!isActive) {
          return;
        }
        setAirportInfo({
          airportName: unknownAirportInfo.airportName,
          iata: airportIATACode,
        });
      });
    return () => {
      isActive = false;
    };
  }, [airportIATACode, isValidIata]);

  if (!isValidIata) {
    return unknownAirportInfo;
  }

  const isLoading = airportInfo.iata !== airportIATACode;

  return {
    airportName: isLoading ? "loading..." : airportInfo.airportName,
    isLoading,
  };
};
