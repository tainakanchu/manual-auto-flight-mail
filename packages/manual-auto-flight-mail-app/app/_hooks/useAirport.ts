import { useState, useEffect } from "react";

const api = "/api/airport-name";

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
    isLoading: boolean;
  }>({
    airportName: "Unknown Airport",
    isLoading: false,
  });

  // 桁数が3桁で大文字の場合は、 API経由で取得する
  useEffect(() => {
    // IATA 空港コードは必ず3桁の大文字である。そうでない場合は unknown とする
    if (airportIATACode.length !== 3) {
      setAirportInfo({
        airportName: "Unknown Airport",
        isLoading: false,
      });
      return;
    }

    const url = `${api}?iata=${airportIATACode}`;

    setAirportInfo({
      airportName: "loading...",
      isLoading: true,
    });

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setAirportInfo({
          airportName: json.airportName,
          isLoading: false,
        });
      })
      .catch((e) => {
        setAirportInfo({
          airportName: "Unknown Airport",
          isLoading: false,
        });
      });
  }, [airportIATACode]);

  return airportInfo;
};
