# Dada Devs Certificates (MVP)

1. .env.local and filled values (MONGODB_URI, ADMIN_API_KEY, BASE_URL).
2. RSA keys (dev):
   mkdir keys
   openssl genpkey -algorithm RSA -out keys/private.pem -pkeyopt rsa_keygen_bits:2048
   openssl rsa -pubout -in keys/private.pem -out keys/public.pem

3. Logo exists at LOGO_PATH in .env.local (default uses uploaded path).
4. Install deps 
   npm install mongoose qrcode crypto-js puppeteer zod uuid ejs

5. Run dev:
   npm run dev

6. Open:
   - Admin: http://localhost:3000/admin
   - Issue: http://localhost:3000/issue
   - Verify: http://localhost:3000/verify

