// ============================================================
// Google Sign-In — verifies the ID token Google's client-side
// library hands the frontend, so we trust its payload server-side.
// ============================================================

const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config');

const client = new OAuth2Client(config.googleClientId);

/**
 * @param {string} idToken - the credential returned by Google Identity Services
 * @returns {Promise<{email: string, name: string, picture: string, email_verified: boolean}>}
 */
const verifyGoogleToken = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.googleClientId,
  });
  return ticket.getPayload();
};

module.exports = { verifyGoogleToken };
