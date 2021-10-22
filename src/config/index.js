const environmentList = [
  "http://localhost:5001/api/", // local      = 0
  "https://applogiq.in/api/", // staging    = 1
  "https://sl53mjqru9.execute-api.us-east-1.amazonaws.com/"
];

export const env = 2; // Place your environment number here


export const hostConfig = {
  CURRENT_URL: environmentList[env],
  WEB_URL: process.env.url,
  // API_URL: `${environmentList[env]}v1/`,
  API_URL: `${environmentList[env]}dev/`,
};
