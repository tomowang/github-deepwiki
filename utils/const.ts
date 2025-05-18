export enum MessageAction {
  TOGGLE_PANEL,
}

export enum MessageTarget {
  BACKGROUND,
  PANEL,
}

export const DEFAULT_WIDTH = 400;

export const CONTENT_SCRIPT_MATCHES = "https://github.com/*";
export const CONTENT_SCRIPT_CONTAINER_ID = "github-deepwiki-container";
