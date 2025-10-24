export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    const buffer = Buffer.concat(chunks);
    const contentType = req.headers["content-type"] || "";

    const response = await fetch("https://0x0.st", {
      method: "POST",
      headers: {
        "Content-Type": contentType,
        "User-Agent": "curl/8.6.0"
      },
      body: buffer
    });

    const text = await response.text();
    res.status(200).send(text.trim());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
