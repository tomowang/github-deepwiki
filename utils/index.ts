/**
 * Extracts the username and repository name from a GitHub URL, even with query parameters.
 *
 * @param {string} url - The GitHub URL to parse.
 * @returns {GitHubRepoInfo|null} - An object with 'user' and 'repo' properties if successful,
 * null otherwise.
 */

interface GitHubRepoInfo {
  user: string;
  repo: string;
}

export function extractGitHubRepoInfo(url: string): GitHubRepoInfo | null {
  const regex = /github\.com\/([^/]+)\/([^/]+)/i;
  const match = url.match(regex);

  if (match) {
    return {
      user: match[1],
      repo: match[2],
    };
  }
  return null;
}
