export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://volleyball-stats-five.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { paymentId } = req.body;
  if (!paymentId) return res.status(400).json({ error: 'paymentId manquant' });

  const API_KEY = process.env.PI_NETWORK_API_KEY;
  if (!API_KEY) return res.status(500).json({ error: 'PI_NETWORK_API_KEY non configurée' });

  try {
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) return res.status(response.status).json({ error: data });
    return res.status(200).json({ success: true, payment: data });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
