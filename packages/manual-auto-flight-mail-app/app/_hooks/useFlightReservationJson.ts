import { format } from "date-fns";
import { useAirline } from "./useAirline";
import { useAirport } from "./useAirport";

/**
 * フライト予約情報を JSON-LD 形式で返す
 */
export const useFlightReservationJson = ({
  reservationNumber,
  fullFlightNumber,
  departureDate,
  departureAirportIATA: departureIATA,
  arrivalDate,
  arrivalAirportIATA: arrivalIATA,
}: {
  /**
   * 予約番号
   *
   * @example 1234567890
   */
  reservationNumber: string;
  /**
   * フライト番号
   *
   * @example NH52
   */
  fullFlightNumber: string;
  /**
   * 出発日時
   */
  departureDate: Date;
  /**
   * 出発空港
   *
   * @example CTS
   */
  departureAirportIATA: string;
  /**
   * 到着日時
   */
  arrivalDate: Date;
  /**
   * 到着空港
   *
   * @example HND
   */
  arrivalAirportIATA: string;
}) => {
  // NH52 のような航空会社コード+フライト番号のフォーマットを分割する
  // 現状は 2桁の IATA コードのみを想定して決め打ちでスライスしてる
  const airlineCode = fullFlightNumber.slice(0, 2);
  const flightNumber = fullFlightNumber.slice(2);

  const { airlineName } = useAirline(airlineCode);
  const { airportName: departureAirportName } = useAirport(departureIATA);
  const { airportName: arrivalAirportName } = useAirport(arrivalIATA);

  const template = {
    "@context": "http://schema.org",
    "@type": "FlightReservation",
    reservationNumber,
    reservationStatus: "http://schema.org/Confirmed",
    underName: {
      "@type": "Person",
      name: "tainakanchu",
    },
    reservationFor: {
      "@type": "Flight",
      flightNumber,
      airline: {
        "@type": "Airline",
        name: airlineName,
        iataCode: airlineCode,
      },
      departureAirport: {
        "@type": "Airport",
        name: departureAirportName,
        iataCode: departureIATA,
      },
      departureTime: format(departureDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      arrivalAirport: {
        "@type": "Airport",
        name: arrivalAirportName,
        iataCode: arrivalIATA,
      },
      arrivalTime: format(arrivalDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    },
  };

  return template;
};
