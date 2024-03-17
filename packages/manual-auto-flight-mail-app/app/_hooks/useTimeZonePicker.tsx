import React, { ChangeEventHandler, useState } from "react";
import { TimeZone, isTimeZone } from "manual-auto-flight-mail-interface";

type Params = {
  initialTimeZone: TimeZone;
};

export const useTimeZonePicker = ({ initialTimeZone }: Params) => {
  const [zone, setZone] = useState<TimeZone>(initialTimeZone);

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (isTimeZone(event.target.value)) setZone(event.target.value);
  };

  const picker: React.FC = () => (
    <select
      id={"timezone"}
      name={"todo"}
      value={zone}
      onChange={handleChange}
      className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
    >
      {TimeZone.map((timezone) => {
        return (
          <option
            key={timezone}
            id={timezone}
            value={timezone}
            className="block px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring"
          >
            {timezone}
          </option>
        );
      })}
    </select>
  );

  return {
    TimeZonePicker: picker,
    timeZone: zone,
  };
};
