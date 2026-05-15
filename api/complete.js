export default async function handler(req, res) {
  // CORS — autoriser Pi Browser et toutes origines
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { paymentId, txid } = req.body || {};
  if (!paymentId || !txid) {
    res.status(400).json({ error: 'paymentId ou txid manquant' });
    return;
  }

  const API_KEY = process.env.PI_NETWORK_API_KEY;
  if (!API_KEY) {
    res.status(500).json({ error: 'PI_NETWORK_API_KEY non configurée' });
    return;
  }

  try {
    const response = await fetch(`https://api.testnet.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    });
    const data = await response.json();
    console.log('Complete response:', response.status, JSON.stringify(data));
    if (!response.ok) {
      res.status(response.status).json({ error: data });
      return;
    }
    res.status(200).json({ success: true, payment: data });
  } catch (err) {
    console.error('Complete error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
