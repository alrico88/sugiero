import { BaseProvider, fetchJson, type Suggestion } from './base';

export type SwisscowsSuggestResult = string[];

export class Swisscows extends BaseProvider {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://api.swisscows.com/suggest?query=${encodeURIComponent(searchTerm)}&itemsCount=10`;
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

    const suggestions = await fetchJson<SwisscowsSuggestResult>(url);

    return suggestions.map((suggestion) => ({
      term: suggestion,
      type: 'QUERY',
    }));
  }
}
