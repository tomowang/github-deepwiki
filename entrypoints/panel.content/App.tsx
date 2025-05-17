import { twMerge } from "tailwind-merge";
import { MessageTarget, MessageAction, DEFAULT_WIDTH } from "@/utils/const";

export default function App() {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const h = document.querySelector("html");

  useEffect(() => {
    if (!h || !h.style) return;
    if (open) {
      h.style.setProperty(
        "width",
        `calc(100% - ${DEFAULT_WIDTH}px)`,
        "important"
      );
      h.style.setProperty("position", "relative", "important");
      h.style.setProperty("minHeight", "100vh", "important");
    } else {
      h.style.setProperty("width", "");
      h.style.setProperty("position", "");
      h.style.setProperty("minHeight", "");
    }
  }, [open]);

  useEffect(() => {
    browser.runtime.onMessage.addListener((message) => {
      console.log("Message:", message);
      if (message.target !== MessageTarget.PANEL) return;
      if (message.action === MessageAction.TOGGLE_PANEL) {
        setOpen((open) => !open);
        if (message.link && message.link !== link) setLink(message.link);
      }
    });
  }, []);
  return (
    <div
      className={twMerge(
        "fixed right-0 top-0 h-full",
        open ? "block" : "hidden"
      )}
      style={{ width: `${DEFAULT_WIDTH}px` }}
    >
      <iframe
        src={link || "about:blank"}
        className="w-full h-full overflow-auto bg-white"
      />
    </div>
  );
}
