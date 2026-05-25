export default async function handler(req, res) {
  // 1. GET Request: Webhook verification from Meta
  if (req.method === 'GET') {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // This token must match the one you define in your Meta App Webhook settings
    const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;

    if (mode === 'subscribe' && token === verifyToken) {
      console.log('Webhook verified successfully');
      return res.status(200).send(challenge);
    } else {
      return res.status(403).json({ error: 'Verification failed' });
    }
  }

  // 2. POST Request: Incoming messages from WhatsApp
  if (req.method === 'POST') {
    const body = req.body;

    if (body.object === 'whatsapp_business_account') {
      try {
        const entry = body.entry?.[0];
        const changes = entry?.changes?.[0];
        const value = changes?.value;
        const messages = value?.messages;
        const contacts = value?.contacts;

        // Check if there is an actual text message
        if (messages && messages.length > 0) {
          const message = messages[0];
          const senderPhone = message.from; // Sender's phone number
          const contactName = contacts?.[0]?.profile?.name || 'there';
          const messageText = message.text?.body || '';

          // Auto-Reply Logic: Check if it's a booking request from the website
          if (messageText.includes('I want to book an inspection')) {
            const replyMsg = `Hi ${contactName}! 👋 Thanks for reaching out to Autonest.\n\nWe've received your inspection booking request. Our expert will review your details and a human agent will connect with you here shortly to confirm the appointment!\n\nIf you have any urgent questions in the meantime, please feel free to ask.`;
            await sendWhatsAppMessage(senderPhone, replyMsg);
          } else {
            // Optional: A catch-all auto-reply for other messages 
            // await sendWhatsAppMessage(senderPhone, `Hi ${contactName}, we will get back to you shortly!`);
          }
        }
        
        // Always return a 200 OK immediately for Meta webhooks
        return res.status(200).send('EVENT_RECEIVED');
      } catch (error) {
        console.error('Error handling webhook:', error);
        return res.status(500).send('ERROR');
      }
    } else {
      return res.status(404).send('Not Found');
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

// Helper function to send WhatsApp API messages
async function sendWhatsAppMessage(toPhone, text) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error("Missing WhatsApp credentials in environment variables.");
    return;
  }

  const url = `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`;
  
  const payload = {
    messaging_product: 'whatsapp',
    to: toPhone,
    type: 'text',
    text: { body: text },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (!response.ok) {
    console.error('Failed to send WhatsApp message:', data);
  }
  return data;
}
