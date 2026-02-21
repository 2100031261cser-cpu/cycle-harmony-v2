import fetch from 'node-fetch';
import { processAiQuery } from './aiAgent.js';

let lastUpdateId = 0;

// ==================== CONVERSATION MEMORY ====================
// Stores recent messages per chat for context
const conversationHistory = new Map();
const MAX_HISTORY = 20; // Keep last 20 messages per chat

function addToHistory(chatId, role, content) {
    if (!conversationHistory.has(chatId)) {
        conversationHistory.set(chatId, []);
    }
    const history = conversationHistory.get(chatId);
    history.push({
        role,
        content,
        timestamp: new Date().toISOString()
    });
    // Keep only last MAX_HISTORY messages
    if (history.length > MAX_HISTORY) {
        history.splice(0, history.length - MAX_HISTORY);
    }
}

function getHistory(chatId) {
    return conversationHistory.get(chatId) || [];
}

function clearHistory(chatId) {
    conversationHistory.delete(chatId);
}

/**
 * Starts long polling for Telegram updates
 */
export async function startTelegramListener() {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) {
        console.warn('⚠️ [TELEGRAM] TELEGRAM_BOT_TOKEN missing. AI Agent listener disabled.');
        return;
    }

    console.log('🤖 [TELEGRAM] AI Agent Listener Starting...');
    console.log(`🤖 [TELEGRAM] Token: ${token.substring(0, 10)}... (length: ${token.length})`);
    pollTelegram(token);
}

async function pollTelegram(token) {
    console.log('🤖 [TELEGRAM] Polling loop entered');
    while (true) {
        try {
            const url = `https://api.telegram.org/bot${token}/getUpdates?offset=${lastUpdateId + 1}&timeout=30`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.ok && data.result.length > 0) {
                for (const update of data.result) {
                    lastUpdateId = update.update_id;
                    if (update.message && update.message.text) {
                        handleIncomingMessage(token, update.message);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Telegram Polling Error:', error.message);
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    }
}

async function handleIncomingMessage(token, message) {
    const chatId = message.chat.id;
    const userId = message.from.id;
    const userText = message.text;

    // Handle commands
    if (userText.startsWith('/')) {
        if (userText === '/start') {
            clearHistory(chatId);
            await sendReply(token, chatId, "Hello! I am your Cycle Harmony AI Assistant. 🤖\n\nI remember our conversation, so you can ask follow-up questions!\n\nAsk me anything about customers, orders, or inventory.\nI can also perform actions like changing order status, assigning delivery boys, and more!\n\nType /clear to reset our conversation memory.");
        } else if (userText === '/clear') {
            clearHistory(chatId);
            await sendReply(token, chatId, "🧹 Conversation memory cleared! Starting fresh.");
        }
        return;
    }

    console.log(`📩 Message from ${userId}: ${userText}`);

    // Save user message to history
    addToHistory(chatId, 'user', userText);

    // Show "typing" status
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: 'typing' })
    });

    // Get conversation history for context
    const history = getHistory(chatId);

    // Process with AI (pass history for memory)
    const aiResponse = await processAiQuery(userText, history);

    // Save AI response to history
    addToHistory(chatId, 'assistant', aiResponse);

    // Send reply
    await sendReply(token, chatId, aiResponse);
}

async function sendReply(token, chatId, text) {
    try {
        const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: text,
                parse_mode: 'Markdown'
            })
        });
        const data = await response.json();
        if (!data.ok) {
            console.error('❌ Telegram send error:', data.description);
            // Retry without Markdown if parsing fails
            if (data.description?.includes('parse')) {
                await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: chatId, text: text })
                });
            }
        }
    } catch (error) {
        console.error('❌ Failed to send Telegram reply:', error.message);
    }
}
