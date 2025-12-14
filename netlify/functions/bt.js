export async function handler(event, context) {
  try {
    // Your Netlify environment variable
    const API_KEY = process.env.BT_API_KEY;

    // Example payload for Boomtrain
    const payload = {
      type: 'viewed',
      site_id: 'adam-sandbox',
      href: 'https://gilded-elf-f1b316.netlify.app/',
      properties: {
        doc_referrer: '',
        autoTrack: true,
        track_by_url: true
      },
      url: 'https://gilded-elf-f1b316.netlify.app/',
    };

    // Call Boomtrain API using the server-side key
    const url = 'https://events.api.boomtrain.com/event/track';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}` // Use the environment variable for the API key
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    // Pass through the status if Boomtrain returns an error
    const statusCode = response.status;

    return {
      statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
