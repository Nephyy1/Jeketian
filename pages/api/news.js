import jkt48 from '@jkt48/core';

export default async function handler(req, res) {
  const apiKey = process.env.JKT48_APIKEY;

  if (!apiKey) {
    console.error("API Key JKT48_APIKEY is missing from environment variables.");
    return res.status(500).json({ error: "API Key configuration missing." });
  }

  try {
    const newsData = await jkt48.news(apiKey);

    if (typeof newsData === 'string' && newsData.trim().toLowerCase().startsWith('<!doctype')) {
      console.error("External API for news returned HTML content instead of JSON.");
      return res.status(502).json({ error: "Bad gateway: The upstream server returned an invalid response." });
    }
    
    res.status(200).json(newsData);
  } catch (error) {
    console.error("Error fetching JKT48 news in /api/news:", error.message);
    res.status(500).json({ error: "Failed to fetch news.", details: error.message });
  }
}