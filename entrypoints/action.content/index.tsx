import "./style.css";
import ReactDOM from "react-dom/client";
import { ContentScriptContext } from "wxt/utils/content-script-context";
import ActionButton from "./ActionButton";
import { extractGitHubRepoInfo } from "@/utils/index";
const contentMatch = new MatchPattern(CONTENT_SCRIPT_MATCHES);

export default defineContentScript({
  matches: [CONTENT_SCRIPT_MATCHES],
  // cssInjectionMode: "ui",
  async main(ctx: ContentScriptContext) {
    ctx.addEventListener(window, "wxt:locationchange", ({ newUrl }) => {
      if (contentMatch.includes(newUrl)) mainWatch(ctx);
    });
    mainWatch(ctx);
  },
});

function mainWatch(ctx: ContentScriptContext) {
  if (document.getElementById(CONTENT_SCRIPT_CONTAINER_ID)) return;
  if (!document.querySelector("ul.pagehead-actions")) return;

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
      container.id = CONTENT_SCRIPT_CONTAINER_ID;
      // Create a root on the UI container and render a component
      const root = ReactDOM.createRoot(container);
      root.render(<ActionButton user={user} repo={repo} />);
      return root;
    },
    onRemove(root) {
      root?.unmount();
    },
  });

  ui.mount();
}
