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

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    res.status(500).json({ error: 'RESEND_API_KEY non configurée' });
    return;
  }

  const emailSubject = subject || `Stats Volley — ${teamName} vs ${teamAdverse}`;
  const description = isFull
    ? `le PDF complet du match ${teamName} vs ${teamAdverse}`
    : `le PDF du set ${(setIdx || 0) + 1} du match ${teamName} vs ${teamAdverse}`;

  // Corps de l'email en HTML
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
      Pour ouvrir le fichier PDF joint, utilisez votre navigateur ou une application d'impression et sélectionnez "Imprimer" puis "Enregistrer en PDF" en format paysage A4.
    </p>
    <hr style="border:none;border-top:0.5px solid #eee;margin:20px 0">
    <p style="color:#aaa;font-size:11px;text-align:center">
      Volley-Ball, My Team Simple Stats · Propulsé par Pi Network
    </p>
  </div>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Volley Stats <stats@volleyball-stats.fr>',
        to: [email],
        subject: emailSubject,
        html: emailBody,
        attachments: [
          {
            filename: isFull
              ? `stats-complet-${teamName}-vs-${teamAdverse}.html`
              : `stats-set${(setIdx||0)+1}-${teamName}-vs-${teamAdverse}.html`,
            content: Buffer.from(pdfHtml).toString('base64'),
            content_type: 'text/html'
          }
        ]
      })
    });

    const data = await response.json();
    console.log('Resend response:', response.status, JSON.stringify(data));

    if (!response.ok) {
      res.status(response.status).json({ error: data.message || 'Erreur Resend' });
      return;
    }

    res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Send-pdf error:', err.message);
    res.status(500).json({ error: err.message });
  }
}
