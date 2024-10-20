import { google } from "googleapis";

export const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

// Function to generate the Google OAuth URL
function getGoogleAuthURL() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // 'offline' to get a refresh token
    prompt: "consent", // Ask the user to re-consent to permissions
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });
}

export default getGoogleAuthURL;