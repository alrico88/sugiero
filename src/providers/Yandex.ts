import { OpenSearch } from './OpenSearch';

export class Yandex extends OpenSearch {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://suggest.yandex.com/suggest-ff.cgi?part=${encodeURIComponent(searchTerm)}`;
  }
}
