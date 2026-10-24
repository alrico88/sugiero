import { BaseProvider, fetchJson, type Suggestion, type SuggestionType } from './base';

export type GoogleSuggestResult = [
  string,
  string[],
  [],
  string[],
  {
    'google:clientdata': { bpc: boolean; tlw: boolean };
    'google:suggestrelevance': number[];
    'google:suggestsubtypes': number[][];
    'google:suggesttype': string[];
    'google:verbatimrelevance': number;
  },
];

export class Google extends BaseProvider {
  /**
   * Type enforce the suggestion type
   *
   * @static
   * @param {string} typeStr
   * @return {SuggestionType}
   */
  static getSuggestionType(typeStr: string): SuggestionType {
    return typeStr === 'QUERY' ? 'QUERY' : 'NAVIGATION';
  }

  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://suggestqueries.google.com/complete/search?client=chrome&oe=utf-8&q=${encodeURIComponent(searchTerm)}`;
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

    const suggestions = await fetchJson<GoogleSuggestResult>(url);

    return suggestions[1].map((suggestion, index) => ({
      term: suggestion,
      type: this.getSuggestionType(suggestions[4]['google:suggesttype'][index]),
    }));
  }
}
