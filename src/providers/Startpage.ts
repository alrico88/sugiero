import { OpenSearch } from './OpenSearch';

export class Startpage extends OpenSearch {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://www.startpage.com/osuggestions?q=${encodeURIComponent(searchTerm)}`;
  }
}
