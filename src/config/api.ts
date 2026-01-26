const rawBase =
  process.env.REACT_APP_BACKEND_ADDRESS ||
  "http://localhost:3000";

// remove trailing slash if user wrote "https://x.com/"
export const API_BASE_URL = rawBase.replace(/\/+$/, "");