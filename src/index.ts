import { Elysia } from "elysia";
import { db } from "./config/db";
import { users } from "./db/schema";
import "dotenv/config";

const app = new Elysia()
  // Global Error Handler
  .onError(({ code, error }) => {
    return {
      success: false,
      code,
      error: error.message,
    };
  })

  // Basic Health Check Endpoint
  .get("/health", () => {
    return {
      success: true,
      message: "Server is healthy",
      timestamp: new Date().toISOString(),
    };
  })

  // Example DB Interaction Endpoint
  .get("/users", async () => {
    const allUsers = await db.select().from(users);
    return {
      success: true,
      data: allUsers,
    };
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
});
