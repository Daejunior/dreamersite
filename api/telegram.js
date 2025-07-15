export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { lie, belief, truthPreference } = req.body;

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    const message = `
📜 Sacred Council Submission

🔥 Lie:
${lie}

💡 Outdated Belief:
${belief}

⚖️ Truth Choice: ${truthPreference}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message })
      });

      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
