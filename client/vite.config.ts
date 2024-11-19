import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import * as pkg from "./package.json";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");

  const host = process.env.HOST || "localhost";
  const port = +(process.env.PORT || 3000);

  return {
    // vite config
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      "process.env": {
        VERSION: pkg.version,
      },
    },
    server: {
      host,
      port,
    },
    build: {
      outDir: "dist",
    },
    plugins: [react(), tsconfigPaths()],
  };
});
