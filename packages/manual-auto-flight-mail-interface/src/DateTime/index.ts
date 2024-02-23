// "2027-03-04T20:15:00-08:00"の形
export type DateTime =
  `${number}-${number}-${number}T${number}:${number}:${number}${
    | "+"
    | "-"}${number}:${number}`;
