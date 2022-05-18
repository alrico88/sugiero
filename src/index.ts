import axios from 'axios';

type GoogleSuggestResult = [
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

type DuckDuckGoSuggestResult = {
  'phrase': string
}[]

type YahooSuggestResult = {
  q: string,
  l: {
    gprid: string
  },
  r: {
    'k': string,
    'm': number
  }[]
}
type SuggestionType = 'QUERY' | 'NAVIGATION';
type SearchEngine = 'Google' | 'Yahoo' | 'DuckDuckGo' | 'random'
/**
 * Gets search suggestions for a partial search
 *
 * @export
 * @param {string} partialSearch The term to search suggestions for
 * @param {SearchEngine} searchEngine
 * @return {Promise<Suggestion[]>} The suggested searches
 */
 export async function getSuggestions(partialSearch: string, searchEngine: SearchEngine = "Google"): Promise<Suggestion[]> {
  if (searchEngine == 'random') {
    const engines = ['Google','Yahoo','DuckDuckGo']
    searchEngine = engines[Math.floor(Math.random()*engines.length)] as SearchEngine
  }
  switch (searchEngine) {
    case 'DuckDuckGo':
      return new DuckDuckGo().getSuggestions(partialSearch)
    case 'Yahoo':
      return new Yahoo().getSuggestions(partialSearch)
    default:
      return new Google().getSuggestions(partialSearch)
  }
};

export interface Suggestion {
  term: string,
  type: SuggestionType
}

interface BaseSearch {
  getUrl(searchTerm: string): string
  getSuggestions(partialSearch: string): Promise<Suggestion[]>
}

export class Google implements BaseSearch {
  /**
   * Type enforce the suggestion type
   *
   * @param {string} typeStr
   * @return {SuggestionType}
   */
  getSuggestionType(typeStr: string): SuggestionType {
    return typeStr === 'QUERY' ? 'QUERY' : 'NAVIGATION';
  }

  /**
   * Gets the URL to query the autosuggest service
   *
   * @param {string} searchTerm
   * @return {string}
   */
  getUrl(searchTerm: string): string {
    return `http://suggestqueries.google.com/complete/search?client=chrome&q=${searchTerm}`;
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
    const suggestions = await res.data as GoogleSuggestResult;

    return suggestions[1].map((suggestion, index) => ({
      term: suggestion,
      type: this.getSuggestionType(suggestions[4]['google:suggesttype'][index]),
    }));
  }
}

export class DuckDuckGo implements BaseSearch {
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

export class Yahoo implements BaseSearch {

  /**
   * Type enforce the suggestion type
   *
   * @param {number} typeNum
   * @return {SuggestionType}
   */
  getSuggestionType(typeNum: number): SuggestionType {
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
      type: this.getSuggestionType(suggestion.m),
    }));
  }
}
