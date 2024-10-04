/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./configs/schema.js",
  dialect: "postgresql",
  dbCredentials: {
    // url: process.env.DB_URL,
    url: "postgresql://shorts_owner:WMtc9yzga6fK@ep-proud-river-a1rxqwfn.ap-southeast-1.aws.neon.tech/ai-shorts-generator?sslmode=require",
  },
};
