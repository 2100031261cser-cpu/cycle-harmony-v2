import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async ({ to, subject, html }) => {
    try {
        // Check if credentials exist
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.log('--- EMAIL SIMULATION (No Credentials) ---');
            console.log(`To: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log('-----------------------------------------');
            return { success: true, simulated: true };
        }

        const info = await transporter.sendMail({
            from: `"Cycle Harmony" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });

        console.log('Message sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};

export const getOrderEmailTemplate = (order, type = 'confirmation') => {
    const isConfirmation = type === 'confirmation';
    const subject = isConfirmation
        ? `Order Confirmed - #${order.orderId || order._id.slice(-6).toUpperCase()}`
        : `Order Update: ${order.orderStatus} - #${order.orderId || order._id.slice(-6).toUpperCase()}`;

    const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #fce7f3; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(to right, #ec4899, #8b5cf6); padding: 24px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Cycle Harmony</h1>
        <p style="margin: 8px 0 0; opacity: 0.8;">Your Wellness Journey</p>
      </div>
      <div style="padding: 32px; color: #1f2937;">
        <h2 style="margin-top: 0;">${isConfirmation ? 'Thank you for your order!' : 'Order Status Updated'}</h2>
        <p>Hi ${order.fullName},</p>
        <p>${isConfirmation
            ? `We've received your order for the <b>${order.phase} Healthy Laddus</b>. Our team is now preparing it with care.`
            : `Your order status has been updated to: <span style="background: #fdf2f8; color: #db2777; padding: 4px 8px; border-radius: 4px; font-weight: bold;">${order.orderStatus}</span>`}
        </p>
        
        <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 24px 0;">
          <h3 style="margin-top: 0; font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Order Summary</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #4b5563;">Order ID:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold;">#${order.orderId || order._id.slice(-6).toUpperCase()}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563;">Products:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold;">${order.phase} Laddus (${order.totalQuantity} Units)</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #4b5563;">Amount:</td>
              <td style="padding: 8px 0; text-align: right; font-weight: bold; color: #db2777;">₹${order.totalPrice}</td>
            </tr>
          </table>
        </div>

        <p style="text-align: center; margin-top: 32px;">
          <a href="https://cycle-harmony.netlify.app/profile" style="background: #db2777; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Track My Order</a>
        </p>
      </div>
      <div style="background: #f9fafb; padding: 16px; text-align: center; color: #9ca3af; font-size: 12px; border-top: 1px solid #f3f4f6;">
        <p>© 2026 Cycle Harmony. All rights reserved.</p>
      </div>
    </div>
  `;

    return { subject, html };
};
