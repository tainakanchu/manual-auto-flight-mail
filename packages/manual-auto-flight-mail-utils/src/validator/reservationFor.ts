import { ReservationFor } from "manual-auto-flight-mail-interface";
import { isObject, valueFromAny } from "../utils";
import { validateAirlineInfo } from "./airline";
import { validateDateTime } from "./dateTime";
import { validateAirportInfo } from "./airport";

/**
 *
 */
export const validateReservationFor = (
  reservationFor: unknown,
): ReservationFor | false => {
  if (!isObject(reservationFor)) {
    return false;
  }

  // @type が Flight であることを確認する
  if (valueFromAny(reservationFor, "@type") !== "Flight") {
    return false;
  }

  // flightNumber がstringであることを確認する
  const flightNumber = valueFromAny(reservationFor, "flightNumber");
  if (typeof flightNumber !== "string") {
    return false;
  }

  // airline チェック
  const airline = validateAirlineInfo(valueFromAny(reservationFor, "airline"));
  if (!airline) {
    return false;
  }

  // airport チェック
  const departureAirport = validateAirportInfo(
    valueFromAny(reservationFor, "departureAirport"),
  );
  const arrivalAirport = validateAirportInfo(
    valueFromAny(reservationFor, "arrivalAirport"),
  );

  if (!departureAirport || !arrivalAirport) {
    return false;
  }

  // time チェック
  const departureTime = validateDateTime(
    valueFromAny(reservationFor, "departureTime"),
  );
  const arrivalTime = validateDateTime(
    valueFromAny(reservationFor, "arrivalTime"),
  );

  if (!departureTime || !arrivalTime) {
    return false;
  }

  return {
    "@type": "Flight",
    flightNumber: flightNumber,
    airline: airline,
    departureAirport: departureAirport,
    arrivalAirport: arrivalAirport,
    departureTime: departureTime,
    arrivalTime: arrivalTime,
  };
};
