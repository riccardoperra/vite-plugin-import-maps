import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    name: "vite-plugin-native-import-maps",
    dir: "./test",
    environment: "node",
  },
  plugins: [],
});
