import { MessageTarget, MessageAction } from "@/utils/const";
import logo from "@/assets/deepwiki.svg";
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
    <button
      className="btn-sm btn inline-flex items-center"
      onClick={handleClick}
    >
      <img
        src={logo}
        width={16}
        height={16}
        alt="DeepWiki"
        className="mr-2 inline-block align-center"
      />
      DeepWiki
    </button>
  );
}
