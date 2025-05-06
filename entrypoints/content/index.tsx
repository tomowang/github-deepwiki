import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

const githubRepoRegex = /^https:\/\/github.com\/([^\/]+)\/([^\/]+).*$/;

export default defineContentScript({
  matches: ["https://github.com/*"],
  cssInjectionMode: "ui",
  async main(ctx) {
    const link = window.location.href;
    if (!githubRepoRegex.test(link)) {
      return;
    }
    const user = link.match(githubRepoRegex)?.[1];
    const repo = link.match(githubRepoRegex)?.[2];
    const ui = createIntegratedUi(ctx, {
      tag: "li",
      // name: "github-deepwiki",
      position: "inline",
      anchor: "ul.pagehead-actions",
      append: "first",
      onMount(container) {
        // Container is a body, and React warns when creating a root on the body, so create a wrapper div
        // const app = document.createElement("div");
        // container.append(app);

        // Create a root on the UI container and render a component
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        return root;
      },
      onRemove(root) {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
