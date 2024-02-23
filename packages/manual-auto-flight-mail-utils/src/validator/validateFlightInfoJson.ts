import { FlightInfoJson } from "manual-auto-flight-mail-interface";
import { validatePersonInfo } from "./personInfo";
import { isObject, valueFromAny } from "../utils";
import { validateReservationFor } from "./reservationFor";

export const validateFlightInfoJson = (
  json: unknown,
): FlightInfoJson | false => {
  if (!isObject(json)) {
    return false;
  }

  // @context が期待している文字列であることを確認する
  const isContextValid = valueFromAny(json, "@context") === "http://schema.org";

  // @type が期待している文字列であることを確認する
  const isTypeValid = valueFromAny(json, "@type") === "FlightReservation";

  // reservationNumber がstringであることを確認する
  const reservationNumber = valueFromAny(json, "reservationNumber");

  // reservationStatus が期待している文字列であることを確認する
  const isReservationStatusValid =
    valueFromAny(json, "reservationStatus") === "http://schema.org/Confirmed";

  const isPersonInfoValid = validatePersonInfo(valueFromAny(json, "underName"));

  const reservationForInfo = validateReservationFor(
    valueFromAny(json, "reservationFor"),
  );

  // 一つでもバリデーションに引っかかったら false を返す
  if (
    !isContextValid ||
    !isTypeValid ||
    typeof reservationNumber !== "string" ||
    !isReservationStatusValid ||
    !isPersonInfoValid ||
    !reservationForInfo
  ) {
    return false;
  }

  return {
    "@context": "http://schema.org",
    "@type": "FlightReservation",
    reservationNumber: reservationNumber,
    reservationStatus: "http://schema.org/Confirmed",
    underName: isPersonInfoValid,
    reservationFor: reservationForInfo,
  };
};
