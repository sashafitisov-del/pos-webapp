import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const scriptUrl =
    "https://script.google.com/macros/s/AKfycbxm8h5C-ZqhYupMk9fajp47OaiGQQTcr4eEs-87hRE1u7BSnuBUuhMCEj7LZY2DQLXErQ/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: "Помилка мережі або сервера" });
  }
}
