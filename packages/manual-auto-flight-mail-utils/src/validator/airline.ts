import {
  AirLineIATACode,
  AirlineInfo,
} from "manual-auto-flight-mail-interface";
import { isObject, valueFromAny } from "../utils";

/**
 * AirlineInfo のバリデーションを行う
 *
 * @param airlineInfo
 * @returns AirlineInfo | false
 */
export const validateAirlineInfo = (
  airlineInfo: unknown
): AirlineInfo | false => {
  if (!isObject(airlineInfo)) {
    return false;
  }

  // @type が Airline であることを確認する
  if (valueFromAny(airlineInfo, "@type") !== "Airline") {
    return false;
  }

  // iataCode が期待している文字列であることを確認する
  const iataCode = valueFromAny(airlineInfo, "iataCode");
  if (!isAirlineIATACode(iataCode)) {
    return false;
  }

  // name がstringであることを確認する
  const name = valueFromAny(airlineInfo, "name");
  if (typeof name !== "string") {
    return false;
  }

  return {
    "@type": "Airline",
    name: name,
    iataCode: iataCode,
  };
};

// 型ガード関数
const isAirlineIATACode = (code: any): code is AirLineIATACode => {
  return AirLineIATACode.includes(code);
};
