export default defineBackground(() => {
  // Set the side panel behavior to open on action click
  browser.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
  // Listen for messages from the content script
  browser.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
      if (request.action === "openSidePanel") {
        const { link } = request;
        console.log("Opening link:", link);
        if (sender.tab && sender.tab.id !== undefined) {
          await browser.sidePanel.open({ tabId: sender.tab.id });
          await browser.runtime.sendMessage({
            action: "openLink",
            link: link,
          });
        }
      }
    }
  );
});
