export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { login, password } = req.body;

  try {
    const googleScriptUrl =
      "https://script.google.com/macros/s/AKfycbxm8h5C-ZqhYupMk9fajp47OaiGQQTcr4eEs-87hRE1u7BSnuBUuhMCEj7LZY2DQLXErQ/exec";

    const response = await fetch(googleScriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
