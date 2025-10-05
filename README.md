
# PLEU API Demo (gratuita / com simulação e Hugging Face opcional)

Backend leve para conectar o protótipo do PLEU às APIs. 
Funciona 100% **gratuito** em modo simulado. 
Opcionalmente, você pode usar a **Hugging Face Inference API** com um token gratuito.

## Endpoints
- `GET /health` – status
- `POST /api/text/continue` – completa texto com IA (simulado ou Hugging Face gpt2)
- `POST /api/image/generate` – gera ilustração (simulada com placeholder de imagem)
- `POST /api/video/generate` – gera link de vídeo simulado
- `POST /api/points/earn` – adiciona pontos simulados
- `POST /api/messages/send` – envia mensagem simulada

## Como rodar localmente
1. `npm install`
2. Copie `.env.example` para `.env` e (opcional) defina `HF_TOKEN=seu_token`
3. `npm run dev`
4. A API estará em `http://localhost:3000`

## Deploy rápido (gratuito)
- **Vercel** (serverless): importe este repositório e defina as variáveis de ambiente.
- **Render / Railway / Fly.io**: suba como serviço web Node.
- **Supabase Edge Functions**: adapte os handlers (Deno).

## Usando com o protótipo HTML
No arquivo do protótipo, defina a base da API:
```js
const API = "http://localhost:3000"; // altere para sua URL pública após o deploy
```

## Hugging Face Inference API (opcional)
- Crie uma conta gratuita em https://huggingface.co/
- Gere um token em https://huggingface.co/settings/tokens
- Coloque no `.env`: `HF_TOKEN=seu_token`
- O endpoint de exemplo usa o modelo `gpt2`:
  - `POST https://api-inference.huggingface.co/models/gpt2`
  - Headers: `Authorization: Bearer HF_TOKEN`

> Observação: geração de imagem/vídeo neste demo é simulada para evitar custos.
> Em produção, integre com provedores específicos (Stability, Pika, etc.) ou modelos próprios.

## Segurança
- Nunca exponha chaves no frontend.
- Habilite CORS apenas para seus domínios de produção.
- Adicione autenticação (JWT) e rate limiting antes do lançamento público.

---
Desenvolvido para o ecossistema **PLEU • VC É CRIA • LOBOMAU**.
