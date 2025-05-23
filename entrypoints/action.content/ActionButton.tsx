import { MessageTarget, MessageAction } from "@/utils/const";
import logo from "@/assets/deepwiki.svg";
import { ExternalLink, PanelRightOpen } from "lucide-react";
interface Props {
  user: string;
  repo: string;
}

export default function ActionButton({ user, repo }: Props) {
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
      <div className="button-container">
        <img src={logo} width={16} height={16} alt="DeepWiki" />
        <span>DeepWiki</span>
        <PanelRightOpen className="icon" onClick={handleClick} />
        <ExternalLink
          className="icon"
          onClick={() => window.open(link, "_blank")}
        />
      </div>
    </div>
  );
}
