# Dada Devs Certificates: Digital Verification System (MVP)

A secure, tamper‑proof digital certificate issuance and verification system built with Next.js, Node.js, MongoDB, RSA signatures, QR codes, and PDF generation.

This MVP demonstrates how organizations can issue certificates that **cannot be forged**, are **verifiable publicly**, and include a **cryptographic digital signature**.

## Features

### Certificate Issuance
- Admin can create a certificate by entering:
  - Student name  
  - Cohort
  - An email which is optional
- A **unique Certificate ID** is generated.
- A **digital RSA signature** is created using `private.pem`.
- A professional **PDF certificate** is generated with:
  - Student details  
  - Timestamp  
  - QR code leading to verification page  
  - Embedded (but invisible) signature  

### Certificate Verification
- Anyone can scan the QR code or open  
  `BASE_URL/verify/{certificateId}`
- The system:
  - Fetches the certificate
  - Validates the digital signature using `public.pem`
  - Shows whether certificate is **VALID** or **INVALID**
  - Displays certificate details

### Admin Dashboard
Admin can:
- Issue certificates
- View all certificates
- See certificate ID, name, cohort, and status
- Revoke certificates
- API routes protected by **ADMIN_API_KEY**

## Why This System Is Secure

### **1. RSA Digital Signatures**
Every certificate is signed with:
- **private.pem** → used ONLY on the server  
- **public.pem** → used by the verifier

Anyone can verify the certificate’s authenticity without needing the private key.

### **2. Tamper-Proof**
If someone tries to edit:
- Name  
- Cohort  
- Timestamp  
- ID  
The signature will **no longer match**, and the system marks it **INVALID**.

### **3. Built-in Revocation**
Admins can revoke certificates.  
Verification instantly reflects the revocation state.

### **4. No Client-Side Exposure**
Private key never leaves the server.  
Signature is embedded in PDF metadata — not visible to users.

## Project Structure

```
app/
  admin/           → Admin dashboard
  issue/           → Certificate issuance UI
  verify/[id]/     → Public verification UI
components/        → Shared components
lib/
  db.js            → MongoDB connection
  rateLimit.js     → API rate limiter
models/
  Certificate.js   → Certificate DB schema
pages/api/
  issue/           → Issues certificates (API)
  verify/          → Verifies certificates (API)
keys/
  private.pem      → RSA private key
  public.pem       → RSA public key
```

---

## Installation & Setup

### **1. Clone the repo**
```
git clone <repo-url>
cd DadaDevsCerts
```

### **2. Create `.env.local`** - Logo exists at LOGO_PATH in .env.local (default uses uploaded path).
```
MONGODB_URI=mongodb://127.0.0.1:27017/DadaDevsCerts
ADMIN_API_KEY=YOUR_ADMIN_KEY
BASE_URL=http://localhost:3000
LOGO_PATH=/public/certs/DadaDevsLogo.png

# Mailtrap (dev)
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=xxxxx
MAILTRAP_PASS=xxxxx
EMAIL_FROM="Dada Devs Certs <no-reply@dadadevscerts.test>"
```

### **3. Generate RSA Keys**
```
mkdir keys
openssl genpkey -algorithm RSA -out keys/private.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in keys/private.pem -out keys/public.pem
```

### **4. Install dependencies**
```
npm install e.g npm install mongoose qrcode crypto-js puppeteer zod uuid ejs
```

### **5. Run the development server**
```
npm run dev
```

### **6. Open in browser**
- **Admin** → http://localhost:3000/admin  
- **Issue Certificate** → http://localhost:3000/issue  
- **Verify Certificate** → http://localhost:3000/verify  

---

## How It Works Internally

### **Issuance Flow**
1. Admin submits form  
2. System generates:
   - UUID certificate ID  
   - Digital signature (RSA-SHA256)  
3. PDF is generated with:
   - Logo  
   - Certificate details  
   - QR code for verification  
4. Certificate stored in MongoDB  
5. PDF returned to admin  

### **Verification Flow**
1. User opens `/verify/{id}` or scans QR  
2. System loads certificate  
3. System verifies signature using `public.pem`  
4. Returns:
   -  VALID  
   -  INVALID  
   -  REVOKED  

---

## API Endpoints (Admin Only)

### Issue Certificate
```
POST /api/issue
Headers:
  x-admin-key: ADMIN_API_KEY
```

### Revoke Certificate
```
POST /api/revoke
Headers:
  x-admin-key: ADMIN_API_KEY
```

### Public Verification
```
GET /api/verify/:id
```

---

## MVP Summary Requirements (All Met)

✔ Unique certificate ID  
✔ Secure RSA digital signature  
✔ Embedded signature (not displayed in UI)  
✔ QR code linking to verification  
✔ Public verification system  
✔ Admin-only issuance  
✔ Revocation system  
✔ Dashboard for issued certificates  
✔ PDF output generation  
✔ Tailwind + Next.js UI  
✔ MongoDB persistence  

---

