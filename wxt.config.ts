import { defineConfig, WxtViteConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "GitHub DeepWiki",
    permissions: ["activeTab", "scripting"],
    action: {},
  },
  vite: () =>
    <WxtViteConfig>{
      plugins: [tailwindcss()],
    },
});
