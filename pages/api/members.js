import jkt48 from '@jkt48/core';

export default async function handler(req, res) {
  const groupId = req.query.group || 'J-D55B';
  try {
    const data = await jkt48.members(groupId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}