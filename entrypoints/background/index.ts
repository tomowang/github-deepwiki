import { MessageTarget, MessageAction } from "@/utils/const";
const contentMatch = new MatchPattern(CONTENT_SCRIPT_MATCHES);

export default defineBackground(() => {
  // Listen for messages from the content script
  browser.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      if (
        request.action === MessageAction.TOGGLE_PANEL &&
        request.target === MessageTarget.BACKGROUND
      ) {
        const { link } = request;
        console.log("toggle link:", link);
        if (sender.tab && sender.tab.id !== undefined) {
          browser.tabs.sendMessage(sender.tab.id, {
            action: MessageAction.TOGGLE_PANEL,
            target: MessageTarget.PANEL,
            link: link,
          });
        }
      }
    }
  );

  (browser.action ?? browser.browserAction).onClicked.addListener((tab) => {
    if (!tab.id) return;
    if (!tab.url || !contentMatch.includes(tab.url)) return;
    const info = extractGitHubRepoInfo(tab.url);
    if (info) {
      const { user, repo } = info;
      const link = `https://deepwiki.com/${user}/${repo}`;
      browser.tabs.sendMessage(tab.id, {
        action: MessageAction.TOGGLE_PANEL,
        target: MessageTarget.PANEL,
        link,
      });
    }
  });
});
