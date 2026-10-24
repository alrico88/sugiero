import { BaseProvider, fetchJson, type Suggestion, type SuggestionType } from './base';

export type YahooSuggestResult = {
  q: string;
  l: {
    gprid: string;
  };
  r: {
    k: string;
    m: number;
  }[];
};

export class Yahoo extends BaseProvider {
  /**
   * Type enforce the suggestion type
   *
   * @static
   * @param {number} typeNum
   * @return {SuggestionType}
   */
  static getSuggestionType(typeNum: number): SuggestionType {
    return typeNum === 6 ? 'QUERY' : 'NAVIGATION';
  }

  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://search.yahoo.com/sugg/gossip/gossip-us-ura/?command=${encodeURIComponent(searchTerm)}&output=sd1&appid=yfp-t&nresults=10&pq=`;
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

    const suggestions = await fetchJson<YahooSuggestResult>(url);

    return suggestions.r.map((suggestion) => ({
      term: suggestion.k,
      type: Yahoo.getSuggestionType(suggestion.m),
    }));
  }
}
