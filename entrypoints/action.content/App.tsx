import { MessageTarget, MessageAction } from "@/utils/const";
import logo from "@/assets/deepwiki.svg";
import { ExternalLink, PanelRightOpen } from "lucide-react";
interface Props {
  user: string;
  repo: string;
}

export default function App({ user, repo }: Props) {
  const link = `https://deepwiki.com/${user}/${repo}`;

  function handleClick() {
    // window.open(link, "_blank");
    browser.runtime.sendMessage({
      action: MessageAction.TOGGLE_PANEL,
      target: MessageTarget.BACKGROUND,
      link: link,
    });
  }
  return (
    <div className="btn-sm btn cursor-default">
      <div className="flex gap-1 items-center justify-center">
        <img src={logo} width={16} height={16} alt="DeepWiki" />
        <span>DeepWiki</span>
        <span className="cursor-pointer" onClick={handleClick}>
          <PanelRightOpen className="w-4 h-4" />
        </span>
        <span
          className="cursor-pointer"
          onClick={() => window.open(link, "_blank")}
        >
          <ExternalLink className="w-4 h-4" />
        </span>
      </div>
    </div>
  );
}
