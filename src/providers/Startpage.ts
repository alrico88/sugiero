import axios from 'axios';
import { BaseProvider, Suggestion } from './base';

export type StartpageSuggestResult = {
  extended_data: {},
  suggestions: {
    'text': string
  }[]
};

export class Startpage extends BaseProvider {
  /**
     * Gets the URL to query the autosuggest service
     *
     * @static
     * @param {string} searchTerm
     * @return {string}
     */
  static getUrl(searchTerm: string): string {
    return `https://www.startpage.com/suggestions?q=${searchTerm}&segment=startpage.udog`;
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
    const suggestions = await res.data as StartpageSuggestResult;

    return suggestions.suggestions.map((suggestion) => ({
      term: suggestion.text,
      type: 'QUERY',
    }));
  }
}
