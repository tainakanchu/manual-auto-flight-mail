import * as fs from "fs";
import csvParser from "csv-parser";

const iataCodes: string[] = [];

const airportNameMap: Record<string, string> = {};

fs.createReadStream("./assets/airports.csv")
  .pipe(csvParser({ separator: "," }))
  .on("data", (data) => {
    // console.log(data.iata_code);
    if (data.iata_code) {
      iataCodes.push(data.iata_code);
      airportNameMap[data.iata_code] = data.name;
    }
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
    console.log("💖iataCodes", iataCodes);

    fs.writeFileSync(
      "./src/IATA/AirportIATACode.ts",
      `export const AirportIATACode = ${JSON.stringify(iataCodes, null, 2)} as const

export type AirportIATACode = (typeof AirportIATACode)[number];

export const airportNameMap = ${JSON.stringify(airportNameMap, null, 2)} as const;
`
    );
  });
