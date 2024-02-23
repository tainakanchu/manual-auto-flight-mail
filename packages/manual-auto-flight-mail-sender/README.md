# manual-auto-flight-mail-sender
This is a Google Apps Script project, developed with clasp, that sends flight reservation emails integrated with Google Calendar.

## How to deploy to your Google Apps Script
1. Clone this repository.
2. Create a new GAS project at the Google Apps Script console or with the `clasp create` command.
3. Copy the script id of the project.
4. Create a .env file at the root of the project and write `SCRIPT_ID=your_script_id`.
5. Execute `pnpm push`.


## How to send a flight reservation email to yourself
1. Create JSON-LD data for the flight. Due to the complexity of the JSON-LD format, it is highly recommended to use this application. The specification of the JSON-LD format is described here.
2. Open `mail_template.html` in your Google Apps Script project created above.
3. Replace the JSON-LD data in `mail_template.html` with the JSON-LD data you created.
4. Select `index.gs` and run the `sendFlightInfo` function. When you run the function for the first time, a dialog to authorize the script will be shown. Please allow the script to access your Gmail account.
5. The flight reservation email should be sent to your inbox.

Here is an example of the JSON-LD format:
```json
{
  "@context": "http://schema.org",
  "@type": "FlightReservation",
  "reservationNumber": "XXXXXX",
  "reservationStatus": "http://schema.org/Confirmed",
  "underName": {
    "@type": "Person",
    "name": "tainakanchu"
  },
  "reservationFor": {
    "@type": "Flight",
    "flightNumber": "531",
    "airline": {
      "@type": "Airline",
      "name": "JAPAN AIRLINES CO. ,LTD",
      "iataCode": "JL"
    },
    "departureAirport": {
      "@type": "Airport",
      "name": "Tokyo - Haneda",
      "iataCode": "HND"
    },
    "departureTime": "2024-02-24T11:20:46+09:00",
    "arrivalAirport": {
      "@type": "Airport",
      "name": "Sapporo - New Chitose Airport",
      "iataCode": "CTS"
    },
    "arrivalTime": "2024-02-24T12:55:46+09:00"
  }
}
```
