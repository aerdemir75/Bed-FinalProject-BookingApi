import { auth } from "express-oauth2-jwt-bearer";

const authMiddleware = auth({
  audience: "https://booking_api",
  issuerBaseURL: "https://dev-lhukn1ysyfs8cxfc.us.auth0.com/",
  // tokenSigningAlg: 'RS256'
});

export default authMiddleware;
