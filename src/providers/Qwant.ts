import axios from 'axios';
import { BaseProvider, Suggestion } from './base';

export type QwantSuggestResult = {
  'status': string
  'data': {
    items: {
      'value': string
      'suggestType': number
    }[]
  },
  'special': []
};

export class Qwant extends BaseProvider {
  /**
     * Gets the URL to query the autosuggest service
     *
     * @static
     * @param {string} searchTerm
     * @return {string}
     */
  static getUrl(searchTerm: string): string {
    return `https://api.qwant.com/v3/suggest?q=${searchTerm}&version=2`;
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
    const suggestions = await res.data as QwantSuggestResult;
    return suggestions.data.items.map((suggestion) => ({
      term: suggestion.value,
      type: 'QUERY',
    }));
  }
}
