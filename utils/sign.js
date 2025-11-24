import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const PRIVATE_KEY_PATH = path.join(process.cwd(), 'keys', 'private.pem');
const PUBLIC_KEY_PATH = path.join(process.cwd(), 'keys', 'public.pem');

const PRIVATE_KEY = process.env.PRIVATE_KEY || (fs.existsSync(PRIVATE_KEY_PATH) ? fs.readFileSync(PRIVATE_KEY_PATH) : null);
const PUBLIC_KEY = process.env.PUBLIC_KEY || (fs.existsSync(PUBLIC_KEY_PATH) ? fs.readFileSync(PUBLIC_KEY_PATH) : null);

export function canonicalPayload(cert) {
  return JSON.stringify({
    id: cert.id,
    name: cert.name,
    cohort: cert.cohort,
    issuedAt: cert.issuedAt
  });
}

export function signCertificate(cert) {
  if (!PRIVATE_KEY) throw new Error('Private key missing, create keys/private.pem or set PRIVATE_KEY env var');
  const payload = canonicalPayload(cert);
  const signer = crypto.createSign('SHA256');
  signer.update(payload);
  signer.end();
  const signature = signer.sign(PRIVATE_KEY, 'base64');
  const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
  return { payload, signature, payloadHash };
}

export function verifySignature(payload, signature) {
  if (!PUBLIC_KEY) throw new Error('Public key missing, create keys/public.pem or set PUBLIC_KEY env var');
  const verifier = crypto.createVerify('SHA256');
  verifier.update(payload);
  verifier.end();
  return verifier.verify(PUBLIC_KEY, signature, 'base64');
}
