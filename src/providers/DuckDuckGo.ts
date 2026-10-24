import { BaseProvider, fetchJson, type Suggestion } from './base';

export type DuckDuckGoSuggestResult = {
  phrase: string;
}[];

export class DuckDuckGo extends BaseProvider {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://duckduckgo.com/ac/?q=${encodeURIComponent(searchTerm)}&kl=wt-wt`;
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

    const suggestions = await fetchJson<DuckDuckGoSuggestResult>(url);

    return suggestions.map((suggestion) => ({
      term: suggestion.phrase,
      type: 'QUERY',
    }));
  }
}
