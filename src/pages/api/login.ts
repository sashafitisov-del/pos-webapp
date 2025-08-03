import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { login, password } = req.body;

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxkwcc5DGBv8Vz_16z-S89f1J3aDssKjHyAd-Z8AJSjmauHBUDtbQP2Y3DMc4NVH8zKIA/exec",
      {
        method: "POST",
        body: JSON.stringify({ login, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
