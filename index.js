const { google } = require("googleapis");
const { JWT } = require("google-auth-library");
const credentials = require("./credentials.json");
require("dotenv").config({
  path:".env"
})

const data = {
  summary: "My first event summary",
  description: "My first event description",
  start: {
    dateTime: "2023-07-08T10:00:00",
    timeZone: "Asia/Karachi",
  },
  end: {
    dateTime: "2023-07-08T11:00:00",
    timeZone: "Asia/Karachi",
  },
  reminders: {
    useDefault: true,
    // overrides: [{ method: "popup" }],
  },
  //   attendees: [],
  sendUpdates: "none",
  conferenceData: {
    createRequest: {
      conferenceSolutionKey: {
        // "eventHangout" ,"eventNamedHangout","hangoutsMeet"  //This defines you want to make call through which service like eventHangOut or hanggoutsMeet[Google Meet]
        type: "hangoutsMeet",
      },
      requestId: `12345678`, // A unique ID for the Meet link creation
    },
  },
};

const createGEvent = async () => {
  // create client that we can use to communicate with Google
  const client = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ]
  });

  const calendar = google.calendar({ version: "v3" });

  try {
    const res = await calendar.events.insert({
      calendarId: process.env.CALANDER_ID,
      auth: client,
      requestBody: data,
      conferenceDataVersion: 1,
    });
    console.log(res.data);
    return res.data.htmlLink;
  } catch (error) {
    console.log(error);
    throw new Error(`Could not create event: ${error.message}`);
  }
};

createGEvent();
