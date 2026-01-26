// apiBase.ts
export const API_BASE =
  process.env.REACT_APP_BACKEND_ADDRESS?.replace(/\/$/, "") ||
  "http://localhost:3000";
