
/**
 * Sends a message via Telegram Bot API
 * @param {string} message - The message text (Markdown supported)
 */
export async function sendTelegramMessage(message) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.warn('⚠️ Telegram credentials missing. Skipping notification.');
        return;
    }

    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('❌ Telegram API Error:', data.description);
        }
        return data;
    } catch (error) {
        console.error('❌ Telegram Connection Error:', error.message);
    }
}
