import axios from 'axios';
import { BaseProvider, Suggestion } from './base';

export type DuckDuckGoSuggestResult = {
  'phrase': string
}[];

export class DuckDuckGo implements BaseProvider {
  /**
     * Gets the URL to query the autosuggest service
     *
     * @param {string} searchTerm
     * @return {string}
     */
  getUrl(searchTerm: string): string {
    return `https://duckduckgo.com/ac/?q=${searchTerm}&kl=wt-wt`;
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
    const suggestions = await res.data as DuckDuckGoSuggestResult;

    return suggestions.map((suggestion) => ({
      term: suggestion.phrase,
      type: 'QUERY',
    }));
  }
}
