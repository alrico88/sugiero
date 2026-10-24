import { BaseProvider, fetchJson, type Suggestion } from './base';

export type AmazonSuggestResult = {
  alias: string;
  prefix: string;
  suggestions: {
    type: string;
    value: string;
  }[];
};

export class Amazon extends BaseProvider {
  /**
   * Gets the URL to query the autosuggest service
   *
   * @static
   * @param {string} searchTerm
   * @return {string}
   */
  static getUrl(searchTerm: string): string {
    return `https://completion.amazon.com/api/2017/suggestions?mid=ATVPDKIKX0DER&alias=aps&prefix=${encodeURIComponent(searchTerm)}`;
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

    const suggestions = await fetchJson<AmazonSuggestResult>(url);

    return suggestions.suggestions.map((suggestion) => ({
      term: suggestion.value,
      type: 'QUERY',
    }));
  }
}
