import * as fs from "fs";
import csvParser from "csv-parser";

export const parseAirlines = () => {
  const iataCodes: string[] = [];

  const airLineNameMap: Record<string, string> = {};

  fs.createReadStream(
    // http://www.lsv.fr/~sirangel/teaching/dataset/index.html
    "./assets/airlines.csv",
  )
    .pipe(csvParser({ separator: "," }))
    .on("data", (data) => {
      if (data.IATA && data.IATA.length === 2) {
        iataCodes.push(data.IATA);
        airLineNameMap[data.IATA] = data.Name;
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      const sortedIataCodes = Array.from(new Set(iataCodes)).sort((a, b) =>
        a.localeCompare(b, "en", { sensitivity: "base" }),
      );
      const sortedAirLineMap = Object.keys(airLineNameMap)
        .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
        .reduce(
          (acc, key) => {
            acc[key] = airLineNameMap[key];
            return acc;
          },
          {} as Record<string, string>,
        );

      fs.writeFileSync(
        "./src/IATA/AirLineIATACode.ts",
        `export const AirLineIATACode = ${JSON.stringify(sortedIataCodes, null, 2)} as const
        
        export type AirLineIATACode = (typeof AirLineIATACode)[number];
        
        export const airLineNameMap: Record<AirLineIATACode, string> = ${JSON.stringify(sortedAirLineMap, null, 2)} as const;
        `,
      );
    });
};
