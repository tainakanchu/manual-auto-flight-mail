"use client";

import { useState } from "react";
import { AirportIATACode, airportNameMap } from "./AirportIATACode";

export const Input: React.FC = () => {
  const [departureIATA, setDepartureIATA] = useState<AirportIATACode>("NRT");

  const [arrivalIATA, setArrivalIATA] = useState<AirportIATACode>("CTS");

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
      flightNumber: "4743",
      airline: {
        "@type": "Airline",
        name: "SAS Scandinavian Airlines",
        iataCode: "SK",
      },
      departureAirport: {
        "@type": "Airport",
        name: departureAirportName,
        iataCode: departureIATA,
      },
      departureTime: "2023-10-03T08:20:00+02:00",
      arrivalAirport: {
        "@type": "Airport",
        name: arrivalAirportName,
        iataCode: arrivalIATA,
      },
      arrivalTime: "2023-10-03T10:15:00+02:00",
    },
  };

  return (
    <div>
      {/* 出発地の空港 */}
      <input
        placeholder="Where are you leaving from?"
        className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
        value={departureIATA}
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          setDepartureIATA(e.target.value as AirportIATACode);
        }}
      />

      <br />

      {/* 到着地の空港 */}
      <input
        placeholder="Where are you going?"
        className="border-2 border-gray-300 rounded-lg p-2 w-96 text-gray-900"
        value={arrivalIATA}
        onChange={(e) => {
          e.target.value = e.target.value.toUpperCase();
          setArrivalIATA(e.target.value as AirportIATACode);
        }}
      />

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
