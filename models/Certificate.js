import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  cohort: { type: String, required: true },
  issuedAt: { type: Date, required: true },
  signature: { type: String, required: true },
  payloadHash: { type: String, required: true },
  pdfUrl: { type: String },
  emailSent: { type: Boolean, default: false },
  revoked: { type: Boolean, default: false },
  revokedAt: { type: Date }
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
