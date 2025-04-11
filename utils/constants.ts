export const DEVELOPMENT_URL = process.env.DEVELOPMENT_URL;
export const PRODUCTION_URL = process.env.PRODUCTION_URL;
const isDevelopment = process.env.NODE_ENV === "development";
export const BASE_API_URL = isDevelopment ? DEVELOPMENT_URL : PRODUCTION_URL;