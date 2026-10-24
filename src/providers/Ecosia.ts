import { OpenSearch } from './OpenSearch';

export class Ecosia extends OpenSearch {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://ac.ecosia.org/autocomplete?q=${encodeURIComponent(searchTerm)}&type=list`;
  }
}
