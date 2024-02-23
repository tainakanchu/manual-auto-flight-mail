import {
  AirportIATACode,
  AirportInfo,
} from "manual-auto-flight-mail-interface";
import { isObject, valueFromAny } from "../utils";

/**
 * AirportInfo のバリデーションを行う
 *
 * @param airportInfo
 * @returns AirportInfo | false
 */
export const validateAirportInfo = (
  airportInfo: unknown,
): AirportInfo | false => {
  if (!isObject(airportInfo)) {
    return false;
  }

  // @type が Airport であることを確認する
  if (valueFromAny(airportInfo, "@type") !== "Airport") {
    return false;
  }

  // iataCode が期待している文字列であることを確認する
  const iataCode = valueFromAny(airportInfo, "iataCode");
  if (!isAirportIATACode(iataCode)) {
    return false;
  }

  // name がstringであることを確認する
  const name = valueFromAny(airportInfo, "name");
  if (typeof name !== "string") {
    return false;
  }

  return {
    "@type": "Airport",
    name: name,
    iataCode: iataCode,
  };
};

// 型ガード関数
const isAirportIATACode = (code: any): code is AirportIATACode => {
  return AirportIATACode.includes(code);
};
