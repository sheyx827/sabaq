# Sabaq — o'z saytingiz sifatida ishga tushirish

Bu loyiha claude.ai'dan mustaqil ishlaydi. Uchta fayl bor:
- `index.html` — sayt (bosh sahifa)
- `api/claude.js` — Claude bilan gaplashadigan server funksiyasi
- `package.json`

## 1. API kalit olish
1. https://console.anthropic.com ga kiring, hisob oching.
2. **API Keys** bo'limida yangi kalit yarating va nusxalang.
3. **Billing / Limits** bo'limida oylik xarajat chegarasini qo'ying (masalan 10 dollar), shunda kutilmagan xarajat bo'lmaydi.

## 2. Saytni joylash (Vercel, bepul tarif bor)
1. https://github.com da bepul hisob oching, yangi repository yarating va shu fayllarni yuklang.
2. https://vercel.com ga GitHub orqali kiring → **Add New → Project** → repositoryni tanlang → **Deploy**.
3. Loyiha sozlamalari: **Settings → Environment Variables** ga kiring va qo'shing:
   - `ANTHROPIC_API_KEY` = (nusxalagan kalitingiz)
4. **Deployments → Redeploy** ni bosing.
5. Vercel bergan manzil (masalan `sabaq.vercel.app`) — sizning saytingiz. O'z domeningizni (sabaq.uz) **Settings → Domains** orqali ulaysiz.

## Eslatmalar
- API kalitni hech qachon `index.html` ichiga yozmang va hech kimga bermang.
- Har bir so'rov pul turadi, shuning uchun 1-qadamdagi xarajat chegarasini albatta qo'ying.
- Ma'lumotlar (kitoblar, natijalar) hozircha har bir foydalanuvchining o'z brauzerida saqlanadi. Hisob (login) va umumiy saqlash keyingi bosqich.
- Modelni o'zgartirish uchun `CLAUDE_MODEL` muhit o'zgaruvchisini qo'shing.
