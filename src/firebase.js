const admin = require("firebase-admin");

const serviceAccountKey = JSON.parse(Buffer.from(process.env.GOOGLE_APPLICATION_CREDENTIALS_BASE64, 'base64').toString('ascii'));

function setupFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });
}

module.exports = {
  setupFirebase
}