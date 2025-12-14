
// netlify/functions/weather.js

export async function handler(event, context) {
  try {
    // Your Netlify environment variable
    const API_KEY = process.env.BT_API_KEY;

    // Read city from query string, default to Nashville
    const city = event.queryStringParameters.city || "Nashville";

    // Call OpenWeatherMap using the server-side key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=imperial&appid=${API_KEY}`;

    const response = await fetch(url);
    const data = await response.json();

    // Pass through the status if OWM returns an error
    const statusCode = response.status;

    return {
      statusCode,
      headers: {
        // Allow your frontend to call this from the browser
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server error", details: err.message }),
    };
  }
}
