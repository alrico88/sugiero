import fetch from 'isomorphic-unfetch';

type SuggestResult = [
  string,
  string[],
  [],
  string[],
  {
    'google:clientdata': { 'bpc':boolean, 'tlw':boolean },
    'google:suggestrelevance': number[],
    'google:suggestsubtypes': number[][],
    'google:suggesttype': string[],
    'google:verbatimrelevance': number
  },
];

type SuggestionType = 'QUERY' | 'NAVIGATION';

export interface Suggestion {
  term: string,
  type: SuggestionType
}

/**
 * Gets the URL to query the autosuggest service
 *
 * @param {string} searchTerm
 * @return {string}
 */
function getUrl(searchTerm: string): string {
  return `http://suggestqueries.google.com/complete/search?client=chrome&q=${searchTerm}`;
}

/**
 * Type enforce the suggestion type
 *
 * @param {string} typeStr
 * @return {SuggestionType}
 */
function getSuggestionType(typeStr: string): SuggestionType {
  return typeStr === 'QUERY' ? 'QUERY' : 'NAVIGATION';
}

/**
 * Gets search suggestions for a partial search
 *
 * @export
 * @param {string} partialSearch The term to search suggestions for
 * @return {Promise<Suggestion[]>} The suggested searches
 */
export async function getSuggestions(partialSearch: string): Promise<Suggestion[]> {
  const url = getUrl(partialSearch);

  const res = await fetch(url);
  const suggestions = await res.json() as SuggestResult;

  return suggestions[1].map((suggestion, index) => ({
    term: suggestion,
    type: getSuggestionType(suggestions[4]['google:suggesttype'][index]),
  }));
}
