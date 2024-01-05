"use client";

import { useState } from "react";
import { format } from "date-fns";
import { AirportIATACode, airportNameMap } from "../_constant";
import { useDatePicker } from "../_hooks";
import { AirLineIATACode, airLineNameMap } from "../_constant/AirLineIATACode";

export const InputPage: React.FC = () => {
  // 便番号
  const [flightNumber, setFlightNumber] = useState<string>("");

  const airlineCode = flightNumber.slice(0, 2) as AirLineIATACode;
  const airlineName = airLineNameMap[airlineCode] ?? "Unknown Airline";
  const flightNumberCode = flightNumber.slice(2);

  // 出発地の情報
  const [departureIATA, setDepartureIATA] = useState<AirportIATACode>("NRT");
  const { date: departureDate, component: DeparturePicker } = useDatePicker();

  // 到着地の情報
  const [arrivalIATA, setArrivalIATA] = useState<AirportIATACode>("CTS");
  const { date: arrivalDate, component: ArrivalPicker } = useDatePicker();

  const departureAirportName =
    airportNameMap[departureIATA] ?? "Unknown Airport";

  const arrivalAirportName = airportNameMap[arrivalIATA] ?? "Unknown Airport";

  const template = {
    "@context": "http://schema.org",
    "@type": "FlightReservation",
    reservationStatus: "http://schema.org/Confirmed",
    underName: {
      "@type": "Person",
      name: "tainakanchu",
    },
    reservationFor: {
      "@type": "Flight",
      flightNumber: flightNumberCode,
      airline: {
        "@type": "Airline",
        name: airlineName,
        iataCode: airlineCode,
      },
      departureAirport: {
        "@type": "Airport",
        name: departureAirportName,
        iataCode: departureIATA,
      },
      departureTime: format(departureDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
      arrivalAirport: {
        "@type": "Airport",
        name: arrivalAirportName,
        iataCode: arrivalIATA,
      },
      arrivalTime: format(arrivalDate, "yyyy-MM-dd'T'HH:mm:ssxxx"),
    },
  };

  return (
    <div>
      {/* 便情報 */}
      <section>
        <h2 className="text-xl font-bold">
          <label htmlFor="flightNumber">Flight Number</label>
        </h2>
        <input
          placeholder="What's your flight number?"
          className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
          value={flightNumber}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            setFlightNumber(value);
          }}
        />
      </section>
      {/* 出発地の空港 */}
      <section>
        <h2 className="text-xl font-bold">
          <label htmlFor="departure">Departure</label>
        </h2>
        <input
          placeholder="Where are you leaving from?"
          className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
          value={departureIATA}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            setDepartureIATA(e.target.value as AirportIATACode);
          }}
        />

        <DeparturePicker />
      </section>

      <br />

      {/* 到着地の空港 */}
      <section>
        <h2 className="text-xl font-bold">
          <label htmlFor="arrival">Arrival</label>
        </h2>
        <input
          placeholder="Where are you going?"
          className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
          value={arrivalIATA}
          onChange={(e) => {
            e.target.value = e.target.value.toUpperCase();
            setArrivalIATA(e.target.value as AirportIATACode);
          }}
        />
        <ArrivalPicker />
      </section>

      <div className="flex flex-col items-center justify-between p-24">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            navigator.clipboard.writeText(JSON.stringify(template, null, 2));
          }}
        >
          Copy
        </button>
        <br />
        <pre className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-500">
          {JSON.stringify(template, null, 2)}
        </pre>
      </div>
    </div>
  );
};
