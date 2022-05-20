import axios from 'axios';
import { BaseProvider, Suggestion } from './base';

export type BraveSuggestResult = [
  string,
  string[],
];

export class Brave extends BaseProvider {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://search.brave.com/api/suggest?q=${searchTerm}`;
  }

  /**
   * Gets search suggestions for a partial search
   *
   * @static
   * @param {string} partialSearch The term to search suggestions for
   * @return {Promise<Suggestion[]>} The suggested searches
   */
  static async getSuggestions(partialSearch: string): Promise<Suggestion[]> {
    const url = this.getUrl(partialSearch);

    const res = await axios(url);
    const suggestions = await res.data as BraveSuggestResult;

    return suggestions[1].map((suggestion) => ({
      term: suggestion,
      type: 'QUERY',
    }));
  }
}
