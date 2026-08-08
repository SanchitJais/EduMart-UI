// Google Auth helper - verifies token sent from frontend client

const { OAuth2Client } = require('google-auth-library');
const config = require('../config/config');

const client = new OAuth2Client(config.googleClientId);

// Verify Google ID token and return user profile payload
const verifyGoogleToken = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.googleClientId,
  });
  return ticket.getPayload();
};

module.exports = { verifyGoogleToken };
