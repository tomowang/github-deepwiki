import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    name: "GitHub DeepWiki",
    side_panel: {
      default_path: "sidepanel.html",
    },
  },
});
