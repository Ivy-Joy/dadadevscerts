import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import puppeteer from 'puppeteer';
import { generateQrDataUrl } from './generateQr';

export default async function generateCertificatePdf({ cert, signature, verifyUrl, logoPath }) {
  const templatePath = path.join(process.cwd(), 'templates', 'cert.html.ejs');
  const template = fs.readFileSync(templatePath, 'utf8');
  const qrDataUrl = await generateQrDataUrl(verifyUrl);
  const html = ejs.render(template, { cert, signature, verifyUrl, qrDataUrl, logoPath });

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  await page.emulateMediaType('screen');
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '18mm', bottom: '18mm' } });
  await browser.close();
  return pdfBuffer;
}
