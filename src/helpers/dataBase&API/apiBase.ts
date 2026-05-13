export const API_BASE_URL =
  process.env.REACT_APP_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:3000";