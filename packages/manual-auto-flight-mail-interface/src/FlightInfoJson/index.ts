import { DateTime } from "../DateTime";
import { AirLineIATACode, AirportIATACode } from "../IATA";

/**
 * Gmail が Flight Reservation に関連するメールを認識するための JSON-LD 形式のデータ
 *
 * @see https://developers.google.com/gmail/markup/reference/flight-reservation
 *
 * @example
 * ```json
 * {
 *   "@context": "http://schema.org",
 *   "@type": "FlightReservation",
 *   "reservationNumber": "RXJ34P",
 *   "reservationStatus": "http://schema.org/Confirmed",
 *   "underName": {
 *     "@type": "Person",
 *     "name": "Eva Green"
 *   },
 *   "reservationFor": {
 *     "@type": "Flight",
 *     "flightNumber": "110",
 *     "airline": {
 *       "@type": "Airline",
 *       "name": "United",
 *       "iataCode": "UA"
 *     },
 *     "departureAirport": {
 *       "@type": "Airport",
 *       "name": "San Francisco Airport",
 *       "iataCode": "SFO"
 *     },
 *     "departureTime": "2027-03-04T20:15:00-08:00",
 *     "arrivalAirport": {
 *       "@type": "Airport",
 *       "name": "John F. Kennedy International Airport",
 *       "iataCode": "JFK"
 *     },
 *     "arrivalTime": "2027-03-05T06:30:00-05:00"
 *   }
 * }
 * </script>
 * ```
 */
export type FlightInfoJson = {
  "@context": "http://schema.org";
  "@type": "FlightReservation";
  reservationNumber: string;
  reservationStatus: "http://schema.org/Confirmed";
  underName: PersonInfo;
  reservationFor: ReservationFor;
};

export type ReservationFor = {
  "@type": "Flight";
  flightNumber: string;
  airline: AirlineInfo;
  departureAirport: AirportInfo;
  departureTime: DateTime;
  arrivalAirport: AirportInfo;
  arrivalTime: DateTime;
};

export type PersonInfo = {
  "@type": "Person";
  name: string;
};

export type AirlineInfo = {
  "@type": "Airline";
  name: string;
  iataCode: AirLineIATACode;
};

export type AirportInfo = {
  "@type": "Airport";
  name: string;
  iataCode: AirportIATACode;
};
