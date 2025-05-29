import jkt48 from '@jkt48/core';

export default async function handler(req, res) {
  const apiKey = process.env.JKT48_APIKEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API Key configuration missing." });
  }

  try {
    const data = await jkt48.members(apiKey);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
