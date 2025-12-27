import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "https://sweetshop.netlify.app",
    headless: true,
  },
  testDir: "./tests",
});
