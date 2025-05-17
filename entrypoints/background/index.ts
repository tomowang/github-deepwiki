import { MessageTarget, MessageAction } from "@/utils/const";

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
});
