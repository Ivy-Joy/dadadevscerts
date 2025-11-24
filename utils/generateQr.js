import QRCode from 'qrcode';
export async function generateQrDataUrl(url) {
  return QRCode.toDataURL(url, { errorCorrectionLevel: 'M', margin: 1, width: 300 });
}
