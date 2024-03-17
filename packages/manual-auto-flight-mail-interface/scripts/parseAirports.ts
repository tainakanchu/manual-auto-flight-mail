import * as fs from "fs";
import csvParser from "csv-parser";

export const parseAirports = () => {
  const iataCodes: string[] = [];

  const airportNameMap: Record<string, string> = {};

  fs.createReadStream("./assets/airports.csv")
    .pipe(csvParser({ separator: "," }))
    .on("data", (data) => {
      if (data.iata_code) {
        iataCodes.push(data.iata_code);
        airportNameMap[data.iata_code] = data.name;
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      const sortedIataCodes = iataCodes.sort((a, b) =>
        a.localeCompare(b, "en", { sensitivity: "base" }),
      );
      const sortedAirportMap = Object.keys(airportNameMap)
        .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
        .reduce(
          (acc, key) => {
            acc[key] = airportNameMap[key];
            return acc;
          },
          {} as Record<string, string>,
        );

      fs.writeFileSync(
        "./src/IATA/AirportIATACode.ts",
        `export const AirportIATACode = ${JSON.stringify(sortedIataCodes, null, 2)} as const

export type AirportIATACode = (typeof AirportIATACode)[number];

export const airportNameMap: Record<AirportIATACode, string> = ${JSON.stringify(sortedAirportMap, null, 2)} as const;
`,
      );
    });
};
