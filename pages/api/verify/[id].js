import dbConnect from '../../../lib/db';
import Certificate from '../../../models/Certificate';
import { canonicalPayload, verifySignature } from '../../../utils/sign';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  const rec = await Certificate.findOne({ id }).lean();
  if (!rec) return res.status(404).json({ valid: false, reason: 'not_found' });

  const cert = { id: rec.id, name: rec.name, cohort: rec.cohort, issuedAt: rec.issuedAt.toISOString() };

  try {
    const payload = canonicalPayload(cert);
    const ok = verifySignature(payload, rec.signature);
    if (!ok) return res.json({ valid: false, reason: 'signature_mismatch', cert });
    if (rec.revoked) return res.json({ valid: false, reason: 'revoked', cert });
    return res.json({ valid: true, cert, pdfUrl: rec.pdfUrl });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ valid: false, reason: 'server_error', detail: err.message });
  }
}
