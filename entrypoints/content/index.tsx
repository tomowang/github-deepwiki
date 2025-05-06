import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const githubRepoRegex = /^https:\/\/github.com\/([^\/]+)\/([^\/]+).*$/;

export default defineContentScript({
  matches: ["https://github.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const link = window.location.href;
    const match = link.match(githubRepoRegex);
    if (!match) {
      return;
    }
    const user = match[1];
    const repo = match[2];
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
