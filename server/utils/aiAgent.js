import { GoogleGenerativeAI } from '@google/generative-ai';
import Customer from '../models/Customer.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

// Lazy initialization - model is created on first use, after dotenv has loaded
let model = null;

function getModel() {
    if (!model) {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error('GEMINI_API_KEY is not set in environment variables');
        }
        console.log('🔑 Initializing Gemini with API key:', apiKey.substring(0, 10) + '...');
        const genAI = new GoogleGenerativeAI(apiKey);
        model = genAI.getGenerativeModel({
            model: 'gemini-2.0-flash',
            systemInstruction: `You are the Cycle Harmony AI Admin Assistant. You have FULL admin access to manage the business via Telegram.

You can READ data and also PERFORM ACTIONS like changing order status, assigning delivery boys, and sending emails.

CRITICAL - ORDER ID RULES:
- Each order has two IDs: "orderId" (like "A004A01") and "_id" (MongoDB internal ID)
- ALWAYS display "orderId" (e.g. #A004A01) to the user - NEVER show MongoDB _id
- In the ACTION BLOCK, use the "orderId" field (like A005A01) for the orderId parameter

IMPORTANT - ACTION COMMANDS:
When the user wants to perform an action, you MUST respond with an ACTION BLOCK (plain text, no markdown formatting around the markers).

ACTION BLOCK FORMAT - use EXACTLY this format with NO bold/italic/backtick formatting on the markers:
---ACTION---
type: update_status
customer: ramu
orderId: A005A01
field: orderStatus
oldValue: Processing
newValue: Shipped
---END_ACTION---

RULES FOR ACTION BLOCK:
1. Do NOT put any * or ** or backticks around ---ACTION--- or ---END_ACTION---
2. The orderId should be the display orderId like A005A01 (NOT the MongoDB _id)
3. The type must be one of: update_status, assign_delivery, send_email, update_stock, cancel_order
4. Always include the customer name
5. For assign_delivery, newValue should be the delivery boy's name

EXAMPLES:

User: "change anu status to shipped"
---ACTION---
type: update_status
customer: anu
orderId: A005A01
field: orderStatus
oldValue: Processing
newValue: Shipped
---END_ACTION---

✅ *Status Updated!*
📦 *Order #A005A01*
👤 Customer: anu
🔄 Status: Processing ➜ *Shipped*

User: "assign delivery boy Ram to anu's order"
---ACTION---
type: assign_delivery
customer: anu
orderId: A005A01
field: deliveryBoy
oldValue: Not Assigned
newValue: Ram
---END_ACTION---

✅ *Delivery Boy Assigned!*
📦 *Order #A005A01*
👤 Customer: anu
🚚 Delivery Boy: *Ram*

VALID STATUS VALUES: Pending, Confirmed, Processing, Shipped, Delivered, Cancelled

FORMATTING RULES:
- Use Telegram Markdown: *bold* for labels
- Use emojis for visual appeal
- ALWAYS show orderId (like #A004A01), NEVER show MongoDB _id
- Structure order lists with emojis and separators
- Always show totals/summaries at the end
- Use ━━━ separators between items`
        });
    }
    return model;
}

// ==================== READ TOOLS ====================
const tools = {
    search_customers: async (query) => {
        try {
            if (!query) {
                return await Customer.find({}).sort({ createdAt: -1 }).limit(5);
            }
            const searchRegex = new RegExp(query, 'i');
            return await Customer.find({
                $or: [
                    { name: searchRegex },
                    { phone: searchRegex },
                    { customerId: searchRegex }
                ]
            }).limit(5);
        } catch (err) {
            console.error('Customer search error:', err.message);
            return { error: 'Failed to search customers' };
        }
    },

    get_order_history: async (phone_or_email) => {
        try {
            return await Order.find({
                $or: [{ phone: phone_or_email }, { email: phone_or_email }]
            }).sort({ createdAt: -1 }).limit(10);
        } catch (err) {
            console.error('Order history error:', err.message);
            return { error: 'Failed to get order history' };
        }
    },

    get_inventory_status: async () => {
        try {
            const products = await Product.find({});
            return products.map(p => ({
                name: p.name,
                stock: p.stock,
                price: p.price,
                _id: p._id
            }));
        } catch (err) {
            console.error('Inventory error:', err.message);
            return { error: 'Failed to get inventory' };
        }
    },

    get_recent_orders: async () => {
        try {
            return await Order.find({}).sort({ createdAt: -1 }).limit(5);
        } catch (err) {
            console.error('Recent orders error:', err.message);
            return { error: 'Failed to get recent orders' };
        }
    },

    get_todays_orders: async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return await Order.find({ createdAt: { $gte: today } }).sort({ createdAt: -1 });
        } catch (err) {
            console.error('Todays orders error:', err.message);
            return { error: 'Failed to get todays orders' };
        }
    },

    get_todays_customers: async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return await Customer.find({ createdAt: { $gte: today } }).sort({ createdAt: -1 });
        } catch (err) {
            console.error('Todays customers error:', err.message);
            return { error: 'Failed to get todays customers' };
        }
    },

    get_yesterday_orders: async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            return await Order.find({ createdAt: { $gte: yesterday, $lt: today } }).sort({ createdAt: -1 });
        } catch (err) {
            console.error('Yesterday orders error:', err.message);
            return { error: 'Failed to get yesterday orders' };
        }
    },

    get_stats: async () => {
        try {
            const totalCustomers = await Customer.countDocuments();
            const totalOrders = await Order.countDocuments();
            const revenue = await Order.aggregate([
                { $match: { orderStatus: { $ne: 'Cancelled' } } },
                { $group: { _id: null, total: { $sum: '$totalPrice' } } }
            ]);
            return {
                totalCustomers,
                totalOrders,
                totalRevenue: revenue[0]?.total || 0
            };
        } catch (err) {
            console.error('Stats error:', err.message);
            return { error: 'Failed to get stats' };
        }
    },

    find_order_by_customer: async (customerName) => {
        try {
            const searchRegex = new RegExp(customerName, 'i');
            return await Order.find({ fullName: searchRegex }).sort({ createdAt: -1 }).limit(5);
        } catch (err) {
            console.error('Find order error:', err.message);
            return { error: 'Failed to find orders' };
        }
    },

    get_delivery_boys: async () => {
        try {
            const deliveryBoys = await Order.aggregate([
                { $match: { deliveryBoy: { $exists: true, $ne: '', $ne: null } } },
                {
                    $group: {
                        _id: '$deliveryBoy',
                        phone: { $first: '$deliveryBoyPhone' },
                        totalDeliveries: { $sum: 1 },
                        activeDeliveries: {
                            $sum: { $cond: [{ $eq: ['$orderStatus', 'Shipped'] }, 1, 0] }
                        },
                        completedDeliveries: {
                            $sum: { $cond: [{ $eq: ['$orderStatus', 'Delivered'] }, 1, 0] }
                        }
                    }
                },
                { $sort: { totalDeliveries: -1 } }
            ]);
            return deliveryBoys.map(d => ({
                name: d._id,
                phone: d.phone || 'Not provided',
                totalDeliveries: d.totalDeliveries,
                activeDeliveries: d.activeDeliveries,
                completedDeliveries: d.completedDeliveries
            }));
        } catch (err) {
            console.error('Delivery boys error:', err.message);
            return { error: 'Failed to get delivery boys' };
        }
    }
};

// ==================== SMART ORDER FINDER ====================
/**
 * Find an order flexibly - tries _id, orderId field, then customer name
 */
async function findOrderFlexible(identifier) {
    if (!identifier) return null;
    const cleanId = identifier.trim().replace(/^#/, '');
    console.log(`🔍 Looking for order with identifier: "${cleanId}"`);

    // 1. Try MongoDB _id
    try {
        if (cleanId.match(/^[0-9a-fA-F]{24}$/)) {
            const order = await Order.findById(cleanId);
            if (order) {
                console.log(`🔍 ✅ Found by _id: ${order.orderId}`);
                return order;
            }
        }
    } catch (e) { /* not a valid ObjectId */ }

    // 2. Try by orderId field (like A005A01)
    const byOrderId = await Order.findOne({ orderId: new RegExp(`^${cleanId}$`, 'i') });
    if (byOrderId) {
        console.log(`🔍 ✅ Found by orderId: ${byOrderId.orderId}`);
        return byOrderId;
    }

    // 3. Try by customer name
    const byName = await Order.findOne({ fullName: new RegExp(cleanId, 'i') }).sort({ createdAt: -1 });
    if (byName) {
        console.log(`🔍 ✅ Found by customer name: ${byName.fullName} (${byName.orderId})`);
        return byName;
    }

    console.log(`🔍 ❌ No order found for: "${cleanId}"`);
    return null;
}

// ==================== ACTION TOOLS ====================
const actionTools = {
    update_status: async ({ orderId, newValue }) => {
        try {
            const validStatuses = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
            if (!validStatuses.includes(newValue)) {
                return { success: false, error: `Invalid status. Valid: ${validStatuses.join(', ')}` };
            }
            const order = await findOrderFlexible(orderId);
            if (!order) return { success: false, error: `Order not found for: ${orderId}` };

            order.orderStatus = newValue;
            await order.save();
            console.log(`✅ DB UPDATED: Status for ${order.fullName} (${order.orderId}) → ${newValue}`);
            return { success: true, order };
        } catch (err) {
            console.error('Update status error:', err.message);
            return { success: false, error: err.message };
        }
    },

    assign_delivery: async ({ orderId, newValue, deliveryPhone }) => {
        try {
            const order = await findOrderFlexible(orderId);
            if (!order) return { success: false, error: `Order not found for: ${orderId}` };

            order.deliveryBoy = newValue;
            if (deliveryPhone) order.deliveryBoyPhone = deliveryPhone;
            await order.save();
            console.log(`✅ DB UPDATED: Delivery boy "${newValue}" assigned to ${order.fullName} (${order.orderId})`);
            return { success: true, order };
        } catch (err) {
            console.error('Assign delivery error:', err.message);
            return { success: false, error: err.message };
        }
    },

    send_email: async ({ orderId }) => {
        try {
            const order = await findOrderFlexible(orderId);
            if (!order) return { success: false, error: `Order not found for: ${orderId}` };
            if (!order.email) return { success: false, error: 'No email for this order' };
            // Dynamically import email utils
            try {
                const { sendEmail, getOrderEmailTemplate } = await import('../utils/email.js');
                const { subject, html } = getOrderEmailTemplate(order, 'update');
                await sendEmail({ to: order.email, subject, html });
                console.log(`✅ Email sent to ${order.email}`);
                return { success: true, email: order.email };
            } catch (emailErr) {
                console.error('Email module error:', emailErr.message);
                return { success: false, error: 'Email service unavailable' };
            }
        } catch (err) {
            console.error('Send email error:', err.message);
            return { success: false, error: err.message };
        }
    },

    update_stock: async ({ productId, newValue }) => {
        try {
            const product = await Product.findByIdAndUpdate(
                productId,
                { stock: parseInt(newValue) },
                { new: true }
            );
            if (!product) return { success: false, error: 'Product not found' };
            console.log(`✅ DB UPDATED: Stock for ${product.name} → ${newValue}`);
            return { success: true, product };
        } catch (err) {
            console.error('Update stock error:', err.message);
            return { success: false, error: err.message };
        }
    },

    cancel_order: async ({ orderId }) => {
        try {
            const order = await findOrderFlexible(orderId);
            if (!order) return { success: false, error: `Order not found for: ${orderId}` };

            order.orderStatus = 'Cancelled';
            await order.save();
            console.log(`✅ DB UPDATED: Order cancelled for ${order.fullName} (${order.orderId})`);
            return { success: true, order };
        } catch (err) {
            console.error('Cancel order error:', err.message);
            return { success: false, error: err.message };
        }
    }
};

// ==================== ACTION BLOCK PARSER ====================
function parseActionBlock(response) {
    // Strip markdown formatting that AI might wrap around markers
    const cleaned = response
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/`/g, '')
        .replace(/\r\n/g, '\n');

    const patterns = [
        /---ACTION---([\s\S]*?)---END_ACTION---/,
        /---ACTION---([\s\S]*?)---END ACTION---/,
    ];

    let actionMatch = null;
    for (const pattern of patterns) {
        actionMatch = cleaned.match(pattern);
        if (actionMatch) break;
    }

    if (!actionMatch) {
        console.log('⚠️ No ACTION BLOCK found in AI response');
        return null;
    }

    const block = actionMatch[1].trim();
    console.log('📋 Raw action block:\n' + block);

    const action = {};
    block.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim();
            if (key && value) {
                action[key] = value;
            }
        }
    });

    console.log('📋 Parsed action:', JSON.stringify(action));
    return Object.keys(action).length > 0 ? action : null;
}

async function executeAction(action) {
    const { type, orderId, newValue, customer } = action;
    if (!type) return { success: false, error: 'No action type' };

    // Use orderId first; if that fails, the findOrderFlexible will try customer name too
    const searchId = orderId || customer;
    console.log(`🔧 Executing: type=${type}, searchId=${searchId}, newValue=${newValue}`);

    switch (type) {
        case 'update_status':
            return await actionTools.update_status({ orderId: searchId, newValue });
        case 'assign_delivery':
            return await actionTools.assign_delivery({ orderId: searchId, newValue, deliveryPhone: action.deliveryPhone });
        case 'send_email':
            return await actionTools.send_email({ orderId: searchId });
        case 'update_stock':
            return await actionTools.update_stock({ productId: action.productId || searchId, newValue });
        case 'cancel_order':
            return await actionTools.cancel_order({ orderId: searchId });
        default:
            return { success: false, error: `Unknown action type: ${type}` };
    }
}

// ==================== MAIN PROCESSOR ====================
/**
 * Process a natural language query using Gemini and local DB tools
 */
export async function processAiQuery(userQuery, history = []) {
    try {
        console.log('🤖 AI Query received:', userQuery);
        console.log('💬 History length:', history.length);

        const chatModel = getModel();
        const chat = chatModel.startChat();

        const context = await getInitialContext(userQuery);
        console.log('📊 Context keys:', Object.keys(context));

        const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'short' });

        // Build conversation history
        let historyText = '';
        const previousMessages = history.slice(0, -1);
        if (previousMessages.length > 0) {
            historyText = '\nPREVIOUS CONVERSATION:\n';
            for (const msg of previousMessages) {
                const role = msg.role === 'user' ? '👤 User' : '🤖 Assistant';
                const content = msg.content.length > 300 ? msg.content.substring(0, 300) + '...' : msg.content;
                historyText += `${role}: ${content}\n`;
            }
            historyText += '---END HISTORY---\n';
        }

        const prompt = `
CURRENT DATE AND TIME (IST): ${now}
${historyText}
CONTEXT DATA FROM DATABASE:
${JSON.stringify(context, null, 2)}

USER MESSAGE:
${userQuery}

If the user refers to previous conversation, use the history above.
If the user wants an action, include the ACTION BLOCK with the orderId field (like A005A01).
Be concise and helpful.`;

        const result = await chat.sendMessage(prompt);
        let responseText = result.response.text();
        console.log('✅ AI Response generated');
        console.log('📝 Response preview:', responseText.substring(0, 300));

        // Parse and execute action block
        const action = parseActionBlock(responseText);
        if (action) {
            console.log('🔧 Action detected! Executing...');
            const actionResult = await executeAction(action);
            console.log('🔧 Action result:', actionResult.success ? '✅ SUCCESS' : `❌ FAILED: ${actionResult.error}`);

            // Remove the action block from visible message
            responseText = responseText
                .replace(/\*{0,2}---ACTION---\*{0,2}[\s\S]*?\*{0,2}---END_ACTION---\*{0,2}\n?/g, '')
                .replace(/`{0,3}---ACTION---`{0,3}[\s\S]*?`{0,3}---END_ACTION---`{0,3}\n?/g, '')
                .replace(/---ACTION---[\s\S]*?---END_ACTION---\n?/g, '')
                .trim();

            if (!actionResult.success) {
                responseText += `\n\n❌ *Action Failed:* ${actionResult.error}`;
            } else {
                responseText += `\n\n✅ _Action executed successfully in database!_`;
            }
        } else {
            console.log('ℹ️ No action - query-only response');
        }

        return responseText;
    } catch (error) {
        console.error('❌ AI Processing Error:', error.message);
        if (error.message?.includes('API_KEY')) {
            return "❌ AI config error: Invalid GEMINI_API_KEY";
        }
        if (error.message?.includes('safety')) {
            return "⚠️ Cannot answer due to safety filters.";
        }
        if (error.message?.includes('quota') || error.message?.includes('429')) {
            return "⏳ Rate limit reached. Please wait.";
        }
        return "❌ Error: " + error.message;
    }
}

// ==================== CONTEXT EXTRACTION ====================
async function getInitialContext(query) {
    const lowerQuery = query.toLowerCase();
    let context = {};
    const isToday = lowerQuery.includes('today') || lowerQuery.includes('todays') || lowerQuery.includes("today's");
    const isYesterday = lowerQuery.includes('yesterday');

    const isAction = lowerQuery.includes('change') || lowerQuery.includes('update') || lowerQuery.includes('assign') ||
        lowerQuery.includes('cancel') || lowerQuery.includes('send email') || lowerQuery.includes('deliver') ||
        lowerQuery.includes('status') || lowerQuery.includes('set');

    try {
        context.business_stats = await tools.get_stats();

        // For actions, find the customer's orders
        if (isAction) {
            const words = query.split(/\s+/);
            const skipWords = ['change', 'update', 'assign', 'cancel', 'send', 'email', 'status', 'set',
                'the', 'for', 'to', 'order', 'orders', 'delivery', 'boy', 'of',
                'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled',
                'his', 'her', 'their', "'s", 'a', 'an'];
            for (const word of words) {
                const cleanWord = word.replace(/[^a-zA-Z]/g, '');
                if (cleanWord.length > 2 && !skipWords.includes(cleanWord.toLowerCase())) {
                    const orders = await tools.find_order_by_customer(cleanWord);
                    if (orders && orders.length > 0) {
                        context.matching_orders = orders;
                        break;
                    }
                }
            }
        }

        if (lowerQuery.includes('customer') || lowerQuery.includes('who') || lowerQuery.includes('find') || lowerQuery.includes('recent')) {
            if (isToday) {
                context.todays_customers = await tools.get_todays_customers();
            } else {
                const phoneMatch = query.match(/(\d{10})/);
                const nameMatch = query.match(/([A-Z][a-z]+)/);
                const q = phoneMatch ? phoneMatch[0] : (nameMatch ? nameMatch[0] : '');
                context.customers = await tools.search_customers(q);
            }
        }

        if (lowerQuery.includes('order') || lowerQuery.includes('status') || lowerQuery.includes('track')) {
            if (isToday) {
                context.todays_orders = await tools.get_todays_orders();
            } else if (isYesterday) {
                context.yesterday_orders = await tools.get_yesterday_orders();
            } else {
                const phoneMatch = query.match(/(\d{10})/);
                if (phoneMatch) {
                    context.orders = await tools.get_order_history(phoneMatch[0]);
                } else {
                    context.recent_orders = await tools.get_recent_orders();
                }
            }
        }

        if (lowerQuery.includes('stock') || lowerQuery.includes('inventory') || lowerQuery.includes('much') || lowerQuery.includes('product') || lowerQuery.includes('laddu') || lowerQuery.includes('phase')) {
            context.inventory = await tools.get_inventory_status();
        }

        if (lowerQuery.includes('delivery') || lowerQuery.includes('deliver') || lowerQuery.includes('boy') || lowerQuery.includes('driver')) {
            context.delivery_boys = await tools.get_delivery_boys();
        }

        // General overview if no specific context
        if (Object.keys(context).length <= 1) {
            context.recent_orders = await tools.get_recent_orders();
            context.inventory = await tools.get_inventory_status();
            context.customers = await tools.search_customers('');
        }
    } catch (err) {
        console.error('❌ Context extraction error:', err.message);
    }

    return context;
}
