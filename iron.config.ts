export const ironOptions = {
  cookieName: "twitter_verifier",
  password: process.env.IRON_PASSWORD ?? "",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};
