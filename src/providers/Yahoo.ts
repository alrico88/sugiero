import axios from 'axios';
import { SuggestionType, BaseProvider, Suggestion } from './base';

export type YahooSuggestResult = {
  q: string,
  l: {
    gprid: string
  },
  r: {
    'k': string,
    'm': number
  }[]
};

export class Yahoo implements BaseProvider {
  /**
     * Type enforce the suggestion type
     *
     * @param {number} typeNum
     * @return {SuggestionType}
     */
  static getSuggestionType(typeNum: number): SuggestionType {
    return typeNum === 6 ? 'QUERY' : 'NAVIGATION';
  }

  /**
     * Gets the URL to query the autosuggest service
     *
     * @param {string} searchTerm
     * @return {string}
     */
  getUrl(searchTerm: string): string {
    return `https://search.yahoo.com/sugg/gossip/gossip-us-ura/?command=${searchTerm}&output=sd1&appid=yfp-t&nresults=10&pq=`;
  }

  /**
     * Gets search suggestions for a partial search
     *
     * @param {string} partialSearch The term to search suggestions for
     * @return {Promise<Suggestion[]>} The suggested searches
     */
  async getSuggestions(partialSearch: string): Promise<Suggestion[]> {
    const url = this.getUrl(partialSearch);

    const res = await axios(url);
    const suggestions = await res.data as YahooSuggestResult;

    return suggestions.r.map((suggestion) => ({
      term: suggestion.k,
      type: Yahoo.getSuggestionType(suggestion.m),
    }));
  }
}
