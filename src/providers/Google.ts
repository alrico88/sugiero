import axios from 'axios';
import { SuggestionType, BaseProvider, Suggestion } from './base';

export type GoogleSuggestResult = [
  string,
  string[],
  [],
  string[],
  {
    'google:clientdata': { 'bpc': boolean, 'tlw': boolean },
    'google:suggestrelevance': number[],
    'google:suggestsubtypes': number[][],
    'google:suggesttype': string[],
    'google:verbatimrelevance': number
  },
];

export class Google extends BaseProvider {
  /**
   * Type enforce the suggestion type
   *
   * @param {string} typeStr
   * @return {SuggestionType}
   */
  static getSuggestionType(typeStr: string): SuggestionType {
    return typeStr === 'QUERY' ? 'QUERY' : 'NAVIGATION';
  }

  /**
   * Gets the URL to query the autosuggest service
   *
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `http://suggestqueries.google.com/complete/search?client=chrome&q=${searchTerm}`;
  }

  /**
   * Gets search suggestions for a partial search
   *
   * @param {string} partialSearch The term to search suggestions for
   * @return {Promise<Suggestion[]>} The suggested searches
   */
  static async getSuggestions(partialSearch: string): Promise<Suggestion[]> {
    const url = this.getUrl(partialSearch);

    const res = await axios(url);
    const suggestions = await res.data as GoogleSuggestResult;

    return suggestions[1].map((suggestion, index) => ({
      term: suggestion,
      type: Google.getSuggestionType(suggestions[4]['google:suggesttype'][index]),
    }));
  }
}
