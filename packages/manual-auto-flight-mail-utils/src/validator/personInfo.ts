import { PersonInfo } from "manual-auto-flight-mail-interface";
import { isObject, valueFromAny } from "../utils";

/**
 * PersonInfo のバリデーションを行う
 *
 * @param info
 * @returns
 */
export const validatePersonInfo = (info: unknown): PersonInfo | false => {
  if (!isObject(info)) {
    return false;
  }

  // @type が Person であることを確認する
  if (valueFromAny(info, "@type") !== "Person") {
    return false;
  }

  // name がstringであることを確認する
  const name = valueFromAny(info, "name");
  if (typeof name !== "string") {
    return false;
  }

  return {
    "@type": "Person",
    name: name,
  };
};
