import { DateTime } from "manual-auto-flight-mail-interface";

export const validateDateTime = (dateTime: unknown): DateTime | false => {
  if (typeof dateTime !== "string") {
    return false;
  }

  const date = new Date(dateTime);

  if (isNaN(date.getTime())) {
    return false;
  }

  // TODO: as にしないでちゃんとやりたい
  return dateTime as DateTime;
};
