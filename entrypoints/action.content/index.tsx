import "~/assets/tailwind.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import { extractGitHubRepoInfo } from "@/utils/index";

export default defineContentScript({
  matches: [CONTENT_SCRIPT_MATCHES],
  // cssInjectionMode: "ui",
  async main(ctx) {
    const link = window.location.href;
    const info = extractGitHubRepoInfo(link);
    if (!info) {
      return;
    }
    const { user, repo } = info;
    const ui = createIntegratedUi(ctx, {
      tag: "li",
      position: "inline",
      anchor: "ul.pagehead-actions",
      append: "first",
      onMount(container) {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container);
        root.render(<App user={user} repo={repo} />);
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
