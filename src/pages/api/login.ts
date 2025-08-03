import type { NextApiRequest, NextApiResponse } from "next";

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzo6uDLEGZkXxSt5Svsac6GBo2fT24uzj-GHPgIpBFBmyBCy-6kU4_VHvqy2bAPTRxHKg/exec";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const formData = new URLSearchParams();
    formData.append("login", req.body.login);
    formData.append("password", req.body.password);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const text = await response.text();
    const data = JSON.parse(text);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: (error as Error).message });
  }
}
