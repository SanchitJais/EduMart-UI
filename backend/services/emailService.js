// ============================================================
// Transactional email via Resend.
// Without RESEND_API_KEY set, sends are skipped and the link is
// logged to the console instead — so the verification flow is
// still fully testable with zero external setup.
// ============================================================

const { Resend } = require('resend');
const config = require('../config/config');

const resend = config.resend.apiKey ? new Resend(config.resend.apiKey) : null;

const formatINR = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

const verificationEmailHtml = (name, verifyUrl) => `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; color: #1e293b;">
    <h2 style="color: #2563eb; margin-bottom: 4px;">Welcome to EduMart, ${name}! 🎓</h2>
    <p>Thanks for signing up. Please verify your email address to activate all account features.</p>
    <p style="text-align: center; margin: 32px 0;">
      <a href="${verifyUrl}"
         style="background: #2563eb; color: #ffffff; padding: 12px 28px; border-radius: 999px;
                text-decoration: none; font-weight: 600; display: inline-block;">
        Verify Email
      </a>
    </p>
    <p style="color: #64748b; font-size: 13px;">
      Or paste this link into your browser: <br />
      <a href="${verifyUrl}" style="color: #2563eb;">${verifyUrl}</a>
    </p>
    <p style="color: #94a3b8; font-size: 12px; margin-top: 24px;">
      If you didn't create this account, you can safely ignore this email.
    </p>
  </div>
`;

/**
 * @param {string} to
 * @param {string} name
 * @param {string} verifyUrl
 */
const sendVerificationEmail = async (to, name, verifyUrl) => {
  if (!resend) {
    console.warn(
      `[emailService] RESEND_API_KEY not set — skipping real send.\n` +
      `[emailService] Verification link for ${to}: ${verifyUrl}`
    );
    return { skipped: true };
  }

  return resend.emails.send({
    from: config.resend.fromEmail,
    to,
    subject: 'Verify your EduMart account',
    html: verificationEmailHtml(name, verifyUrl),
  });
};

const orderConfirmationEmailHtml = (name, order) => {
  const itemRows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0;">${item.title}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; text-align: center;">${item.qty}</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">${formatINR(item.price * item.qty)}</td>
        </tr>`
    )
    .join('');

  const summaryRow = (label, value) => `
    <tr>
      <td style="padding: 4px 0; color: #64748b;">${label}</td>
      <td style="padding: 4px 0; text-align: right;">${value}</td>
    </tr>`;

  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 520px; margin: 0 auto; color: #1e293b;">
      <h2 style="color: #2563eb; margin-bottom: 4px;">Thanks for your order, ${name}! 🛍️</h2>
      <p>Your order <strong>${order.id}</strong> has been confirmed and is now being processed.</p>

      <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
        <thead>
          <tr>
            <th style="text-align: left; border-bottom: 2px solid #1e293b; padding-bottom: 8px;">Item</th>
            <th style="text-align: center; border-bottom: 2px solid #1e293b; padding-bottom: 8px;">Qty</th>
            <th style="text-align: right; border-bottom: 2px solid #1e293b; padding-bottom: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>

      <table style="width: 100%; max-width: 240px; margin-left: auto; border-collapse: collapse;">
        ${summaryRow('Subtotal', formatINR(order.subtotal))}
        ${summaryRow('Shipping', order.shipping === 0 ? 'FREE' : formatINR(order.shipping))}
        ${summaryRow('GST', formatINR(order.tax))}
        <tr>
          <td style="padding-top: 8px; border-top: 2px solid #1e293b; font-weight: 700;">Total</td>
          <td style="padding-top: 8px; border-top: 2px solid #1e293b; font-weight: 700; text-align: right;">${formatINR(order.total)}</td>
        </tr>
      </table>

      <h3 style="margin-top: 32px; margin-bottom: 8px; font-size: 15px;">Shipping to</h3>
      <p style="color: #475569; margin: 0;">
        ${order.address.street}<br />
        ${order.address.city}, ${order.address.state} – ${order.address.pin}
      </p>

      <p style="color: #64748b; font-size: 13px; margin-top: 24px;">
        Paying via ${order.paymentMethod}. You can track this order any time from
        <strong>My Orders</strong> in your EduMart account.
      </p>
    </div>
  `;
};

/**
 * @param {string} to
 * @param {string} name
 * @param {object} order - { id, items, subtotal, shipping, tax, total, address, paymentMethod }
 */
const sendOrderConfirmationEmail = async (to, name, order) => {
  if (!resend) {
    console.warn(
      `[emailService] RESEND_API_KEY not set — skipping real send.\n` +
      `[emailService] Order confirmation for ${to}: ${order.id} — ${formatINR(order.total)}`
    );
    return { skipped: true };
  }

  return resend.emails.send({
    from: config.resend.fromEmail,
    to,
    subject: `Your EduMart order ${order.id} is confirmed`,
    html: orderConfirmationEmailHtml(name, order),
  });
};

module.exports = { sendVerificationEmail, sendOrderConfirmationEmail };
