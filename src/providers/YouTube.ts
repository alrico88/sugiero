import { Google, GoogleSuggestResult } from './Google';

export type YouTubeSuggestResult = GoogleSuggestResult;

export class YouTube extends Google {
  /**
     * Gets the URL to query the autosuggest service
     *
     * @static
     * @param {string} searchTerm
     * @return {string}
     */
  static getUrl(searchTerm: string): string {
    return `https://suggestqueries.google.com/complete/search?client=chrome&ds=yt&q=${searchTerm}`;
  }
}
