import { useState, useEffect } from "react";
export default function App() {
  const [link, setLink] = useState<string | undefined>();
  useEffect(() => {
    browser.runtime.onMessage.addListener((message) => {
      console.log("Message received from background script:", message);
      if (message.action === "openLink") {
        setLink(message.link);
      }
    });
  }, []);
  return (
    <div>
      {link === undefined ? (
        <div>Loading</div>
      ) : (
      <iframe src={link} style={{ width: "100%", height: "100%" }} />
      )}
    </div>
  );
}
