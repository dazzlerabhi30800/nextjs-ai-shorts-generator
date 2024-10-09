import { boolean, pgTable, serial, varchar, json, integer } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  imageUrl: varchar("imageUrl"),
  subscription: boolean("subscription").default(false),
  credits: integer('credits').default(30) // 30 credits = 3 videos
});


export const VideoData = pgTable("videoData", {
  id: serial("id").primaryKey(),
  script: json("script").notNull(),
  audioUrl: varchar("audioUrl").notNull(),
  captions: json("captions").notNull(),
  imageList: varchar("imageList").array(),
  createdBy: varchar("createdBy").notNull(),
})