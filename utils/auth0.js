import { initAuth0 } from "@auth0/nextjs-auth0";

export default initAuth0({
  domain: process.env.AUTH_0_DOMAIN,
  clientId: process.env.AUTH_0_CLIENT_ID,
  clientSecret: process.env.AUTH_0_CLIENT_SECRET,
  scope: process.env.AUTH_0_SCOPE,
  redirectUri: process.env.AUTH_0_REDIRECT_URI,
  postLogoutRedirectUri: process.env.AUTH_0_POST_LOGOUT_REDIRECT_URI,
  session: {
    cookieSecret: process.env.AUTH_0_COOKIE_SECRET,
  },
});
