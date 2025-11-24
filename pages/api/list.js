
import dbConnect from '../../lib/db';
import Certificate from '../../models/Certificate';


export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const certs = await Certificate.find().sort({ createdAt: -1 });
    return res.status(200).json(certs);
  } catch (err) {
    return res.status(500).json({ message: "Server Error", error: err.message });
  }
}
