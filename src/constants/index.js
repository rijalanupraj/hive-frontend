export const BACKEND =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://samadhan-backend-ultimate.herokuapp.com";
export const SOCKET_URL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:8000"
    : "ws://samadhan-backend-ultimate.herokuapp.com";
export const BACKEND_API_URL = `${BACKEND}/api/v1`;
export const FACEBOOK_AUTH_LINK = `${BACKEND_API_URL}/auth/facebook`;
export const GOOGLE_AUTH_LINK = `${BACKEND_API_URL}/auth/google`;
