import { BaseProvider, fetchJson, type Suggestion } from './base';

export type OpenSearchSuggestResult = [string, string[], ...unknown[]];

/**
 * Base for providers that answer in the OpenSearch suggestions format
 */
export abstract class OpenSearch extends BaseProvider {
  /**
   * Gets search suggestions for a partial search
   *
   * @static
   * @param {string} partialSearch The term to search suggestions for
   * @return {Promise<Suggestion[]>} The suggested searches
   */
  static async getSuggestions(partialSearch: string): Promise<Suggestion[]> {
    const url = this.getUrl(partialSearch);

    const suggestions = await fetchJson<OpenSearchSuggestResult>(url);

    return suggestions[1].map((suggestion) => ({
      term: suggestion,
      type: 'QUERY',
    }));
  }
}
