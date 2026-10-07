// Sabaq — Claude API uchun oddiy server funksiyasi (Vercel).
// API kalit faqat serverda, muhit o'zgaruvchisida saqlanadi.
const hits = new Map();
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST kerak' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY kiritilmagan' });

  // oddiy cheklov: bir IP dan 10 daqiqada 40 ta so'rov
  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || 'x';
  const now = Date.now();
  const list = (hits.get(ip) || []).filter(t => now - t < 600000);
  if (list.length >= 40) return res.status(429).json({ code: 'rate_limited', error: "Juda ko'p so'rov. Birozdan keyin urinib ko'ring." });
  list.push(now); hits.set(ip, list);

  const { messages = [], images = [] } = req.body || {};
  if (!Array.isArray(messages) || !messages.length) return res.status(400).json({ error: "Xabar yo'q" });
  const msgs = messages.slice(-20).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content || '').slice(0, 60000),
  }));
  if (images.length) {
    const last = msgs[msgs.length - 1];
    last.content = [
      ...images.slice(0, 3).map(d => ({ type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: String(d) } })),
      { type: 'text', text: last.content },
    ];
  }
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.CLAUDE_MODEL || 'claude-sonnet-5-5', max_tokens: 4000, messages: msgs }),
    });
    const d = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: (d.error && d.error.message) || 'API xatosi' });
    res.json({ text: (d.content || []).filter(b => b.type === 'text').map(b => b.text).join('') });
  } catch (e) {
    res.status(500).json({ error: 'Server xatosi' });
  }
};
