import { MessageTarget, MessageAction } from "@/utils/const";
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
    <button className="btn btn-sm" onClick={handleClick}>
      DeepWiki
    </button>
  );
}
