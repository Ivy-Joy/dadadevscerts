import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import dbConnect from '../../lib/db';
import Certificate from '../../models/Certificate';
import { signCertificate } from '../../utils/sign';
import generateCertificatePdf from '../../utils/generatePdf';
import rateLimit from '../../lib/rateLimit';
import { z } from 'zod';
import sendEmail from './send-email';

const IssueSchema = z.object({
  name: z.string().min(2),
  cohort: z.string().min(1),
  email: z.string().email().optional()
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!(await rateLimit(req, res))) return;

  const apiKey = req.headers['x-api-key'] || req.body.apiKey;
  if (!apiKey || apiKey !== process.env.ADMIN_API_KEY) 
    return res.status(401).json({ error: 'Unauthorized' });

  const parse = IssueSchema.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid input', details: parse.error.flatten() });

  const { name, cohort, email } = parse.data;

  await dbConnect();

  const id = uuidv4();
  const issuedAt = new Date().toISOString();
  const cert = { id, name, cohort, issuedAt };

  try {
    const { signature, payloadHash } = signCertificate(cert);

    const verifyUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/verify/${id}`;

    const logoFile = path.join(process.cwd(), 'public', 'certs', 'DadaDevsLogo.png');
    const logoDataUrl = fs.existsSync(logoFile)
      ? `data:image/png;base64,${fs.readFileSync(logoFile).toString('base64')}`
      : null;

    const pdfBuffer = await generateCertificatePdf({ cert, signature, verifyUrl, logoPath: logoDataUrl });

    const certsDir = path.join(process.cwd(), 'public', 'certs');
    if (!fs.existsSync(certsDir)) fs.mkdirSync(certsDir, { recursive: true });
    const pdfName = `${id}.pdf`;
    const pdfPath = path.join(certsDir, pdfName);
    fs.writeFileSync(pdfPath, pdfBuffer);

    await Certificate.create({
      id,
      name,
      cohort,
      issuedAt: new Date(issuedAt),
      signature,
      payloadHash,
      pdfUrl: `/certs/${pdfName}`
    });

    if (email) {
      try {
        await sendEmail({
          to: email,
          subject: 'Your Certificate — Bitcoin Dada',
          text: `Hi ${name}, your certificate is ready: ${process.env.BASE_URL}/certs/${pdfName}`,
          html: `<p>Hi ${name},</p><p>Your certificate is ready. Download it <a href="${process.env.BASE_URL}/certs/${pdfName}">here</a>.</p>`
        });
      } catch (err) {
        console.error('Email sending error:', err);
      }
    }

    return res.status(201).json({ id, pdfUrl: `/certs/${pdfName}`, verifyUrl });

  } catch (err) {
    console.error('Issue certificate error:', err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
