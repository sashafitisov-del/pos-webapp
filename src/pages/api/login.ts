import type { NextApiRequest, NextApiResponse } from "next";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxC_0aSKUbdHntEPzqknPCqS77j3KXFQOken50LJTbRDNpaRlxGYoNsBajM2BAcbdTs_g/exec";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
}
