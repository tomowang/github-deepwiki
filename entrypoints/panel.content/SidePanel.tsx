import { twMerge } from "tailwind-merge";
import { MessageTarget, MessageAction, DEFAULT_WIDTH } from "@/utils/const";
import ResizePanel from "@/components/ResizePanel";

export default function SidePanel() {
  const [open, setOpen] = useState(false);
  const [link, setLink] = useState("");
  const [width, setWidth] = useState(DEFAULT_WIDTH);
  const h = document.querySelector("html");

  function handlePanelResize(width: number) {
    setWidth(width);
  }

  useEffect(() => {
    if (!h || !h.style) return;
    h.style.setProperty("width", `calc(100% - ${width}px)`, "important");
  }, [width]);

  useEffect(() => {
    if (!h || !h.style) return;
    if (open) {
      h.style.setProperty("width", `calc(100% - ${width}px)`, "important");
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
      if (message.target !== MessageTarget.PANEL) return;
      if (message.action === MessageAction.TOGGLE_PANEL) {
        setOpen((open) => !open);
        if (message.link && message.link !== link) setLink(message.link);
      }
    });
  }, []);
  return (
    <ResizePanel
      className={twMerge(
        "fixed right-0 top-0 h-full",
        open ? "flex" : "hidden"
      )}
      defaultWidth={width}
      handlePanelResize={handlePanelResize}
    >
      <div className="h-full">
        <iframe
          src={link || "about:blank"}
          className="w-full h-full overflow-auto bg-white"
        />
      </div>
    </ResizePanel>
  );
}
