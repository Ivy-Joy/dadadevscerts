import dbConnect from '../../../lib/db';
import Certificate from '../../../models/Certificate';


export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = req.headers['x-api-key'] || req.body.apiKey;
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) return res.status(401).json({ error: 'Unauthorized' });

  const { id } = req.query;
  await dbConnect();

  const rec = await Certificate.findOne({ id });
  if (!rec) return res.status(404).json({ error: 'Not found' });

  rec.revoked = true;
  rec.revokedAt = new Date();
  await rec.save();

  return res.json({ ok: true, id });
}
