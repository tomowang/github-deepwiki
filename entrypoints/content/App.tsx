interface Props {
  user: string;
  repo: string;
}

export default function App({ user, repo }: Props) {
  const link = `https://deepwiki.com/${user}/${repo}`;

  function handleClick() {
    // window.open(link, "_blank");
    // Send a message to the background script to open the link
    browser.runtime.sendMessage({
      action: "openSidePanel",
      link: link,
    });
  }
  return (
    <button className="btn btn-sm" onClick={handleClick}>
      Deepwiki
    </button>
  );
}
