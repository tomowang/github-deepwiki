import "~/assets/tailwind.css";
import ReactDOM from "react-dom/client";
import SidePanel from "./SidePanel";
import { extractGitHubRepoInfo } from "@/utils/index";

export default defineContentScript({
  matches: [CONTENT_SCRIPT_MATCHES],
  cssInjectionMode: "ui",
  async main(ctx) {
    const link = window.location.href;
    const info = extractGitHubRepoInfo(link);
    if (!info) {
      return;
    }
    let container = document.getElementById("deepwiki-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "deepwiki-container";
      container.style.position = "relative";
      document.body.appendChild(container);
    }
    const ui = await createShadowRootUi(ctx, {
      name: "github-deepwiki",
      position: "inline",
      anchor: container,
      append: "last",
      onMount(container) {
        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container);
        root.render(<SidePanel />);
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
