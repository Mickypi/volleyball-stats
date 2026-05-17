export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return; }

  const { email, subject, pdfHtml, teamName, teamAdverse, isFull, setIdx } = req.body || {};

  if (!email || !pdfHtml) {
    res.status(400).json({ error: 'email et pdfHtml sont requis' });
    return;
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    res.status(500).json({ error: 'BREVO_API_KEY non configurée' });
    return;
  }

  const emailSubject = subject || `Stats Volley — ${teamName} vs ${teamAdverse}`;
  const description = isFull
    ? `le PDF complet du match ${teamName} vs ${teamAdverse}`
    : `le PDF du set ${(setIdx || 0) + 1} du match ${teamName} vs ${teamAdverse}`;

  const filename = isFull
    ? `stats-complet-${teamName}-vs-${teamAdverse}.html`
    : `stats-set${(setIdx||0)+1}-${teamName}-vs-${teamAdverse}.html`;

  const emailBody = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f0;padding:30px">
  <div style="max-width:500px;margin:0 auto;background:#fff;border-radius:12px;padding:30px">
    <div style="text-align:center;margin-bottom:20px">
      <div style="font-size:32px;margin-bottom:8px">🏐</div>
      <div style="font-size:20px;font-weight:700;color:#1a1a18">Volley-Ball · My Team Simple Stats</div>
    </div>
    <p style="color:#444;font-size:15px;line-height:1.6">Bonjour,</p>
    <p style="color:#444;font-size:15px;line-height:1.6">
      Vous trouverez ci-joint ${description}.
    </p>
    <div style="background:#E6F1FB;border-radius:8px;padding:14px;margin:20px 0;text-align:center">
      <div style="font-size:14px;color:#0C447C;font-weight:600">🔵 ${teamName} vs ${teamAdverse} 🔴</div>
    </div>
    <p style="color:#888;font-size:12px;line-height:1.6;margin-top:20px">
      Pour imprimer en PDF : ouvrez le fichier joint dans votre navigateur, puis "Imprimer" → "Enregistrer en PDF" en format paysage A4.
    </p>
    <hr style="border:none;border-top:0.5px solid #eee;margin:20px 0">
    <p style="color:#aaa;font-size:11px;text-align:center">
      Volley-Ball, My Team Simple Stats · Propulsé par Pi Network
    </p>
  </div>
</body>
</html>`;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': BREVO_API_KEY,
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Volley Stats', email: 'no-reply@volleyball-stats-five.vercel.app' },
        to: [{ email }],
        subject: emailSubject,
        htmlContent: emailBody,
        attachment: [
          {
            name: filename,
            content: Buffer.from(pdfHtml).toString('base64')
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Brevo response:', response.status, JSON.stringify(data));

    if (!response.ok) {
      res.status(response.status).json({ error: data.message || 'Erreur Brevo' });
      return;
    }

    res.status(200).json({ success: true, messageId: data.messageId });
  } catch (err) {
    console.error('Send-pdf error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
