
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors({ origin: "*"}));
app.use(express.json({ limit: "2mb" }));

const HF_TOKEN = process.env.HF_TOKEN; // opcional (gratuito com conta Hugging Face)
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => res.json({ ok: true, name: "PLEU API Demo" }));

// === TEXT: continue story (IA) ===
app.post("/api/text/continue", async (req, res) => {
  const { text = "", mode = "livre" } = req.body || {};
  try {
    if (!HF_TOKEN) {
      // Simulação local (sem custo)
      return res.json({
        ok: true,
        data: { completion: `(${mode}) Continuação: ${text} ... algo surpreendente acontece.` }
      });
    }
    // Exemplo com Hugging Face Inference API (modelo leve)
    const resp = await fetch("https://api-inference.huggingface.co/models/gpt2", {
      method: "POST",
      headers: { "Authorization": `Bearer ${HF_TOKEN}`, "Content-Type": "application/json" },
      body: JSON.stringify({ inputs: text, parameters: { max_new_tokens: 60, temperature: 0.9 } })
    });
    const out = await resp.json();
    let completion = "";
    if (Array.isArray(out) && out[0]?.generated_text) {
      completion = out[0].generated_text;
    } else if (out?.generated_text) {
      completion = out.generated_text;
    } else {
      completion = `(${mode}) Continuação: ${text} ... (HF fallback)`;
    }
    res.json({ ok: true, data: { completion } });
  } catch (err) {
    res.status(500).json({ ok: false, error: "IA_TEXT_ERROR", detail: String(err) });
  }
});

// === IMAGE: generate illustration ===
app.post("/api/image/generate", async (req, res) => {
  const { prompt = "ilustração literária", style = "realista" } = req.body || {};
  try {
    if (!HF_TOKEN) {
      // Simulação local
      return res.json({ ok: true, data: { imageUrl: `https://dummyimage.com/1024x576/0A1E3D/E5A000&text=${encodeURIComponent(prompt)}` } });
    }
    // OBS: Muitos modelos de imagem na HF precisam de tempo/CPU e nem todos habilitam CORS.
    // Para teste simples: retornar placeholder usando dummyimage
    return res.json({ ok: true, data: { imageUrl: `https://dummyimage.com/1024x576/0A1E3D/E5A000&text=${encodeURIComponent(prompt)}` } });
  } catch (err) {
    res.status(500).json({ ok: false, error: "IMG_GEN_ERROR", detail: String(err) });
  }
});

// === VIDEO: generate short video ===
app.post("/api/video/generate", async (req, res) => {
  const { script = "cena curta", voice = "neutra" } = req.body || {};
  try {
    // Simulação local; para produção, integrar a um serviço de composição/tts
    const videoUrl = `https://example.com/video/${Date.now()}.mp4`;
    res.json({ ok: true, data: { videoUrl } });
  } catch (err) {
    res.status(500).json({ ok: false, error: "VIDEO_GEN_ERROR", detail: String(err) });
  }
});

// === POINTS: earn points ===
app.post("/api/points/earn", async (req, res) => {
  const { userId = "demo", points = 0, reason = "action" } = req.body || {};
  try {
    // Simulação: retorne total fictício
    const totalPoints = 1250 + Number(points || 0);
    res.json({ ok: true, data: { totalPoints, userId, reason } });
  } catch (err) {
    res.status(500).json({ ok: false, error: "POINTS_ERROR", detail: String(err) });
  }
});

// === MESSAGES: send direct message ===
app.post("/api/messages/send", async (req, res) => {
  const { roomId = "demo-room", message = "" } = req.body || {};
  try {
    res.json({ ok: true, data: { delivered: true, timestamp: Date.now(), roomId, message } });
  } catch (err) {
    res.status(500).json({ ok: false, error: "MSG_SEND_ERROR", detail: String(err) });
  }
});

app.listen(PORT, () => console.log("PLEU API Demo running on http://localhost:" + PORT));
