export type SuggestionType = 'QUERY' | 'NAVIGATION';

export interface Suggestion {
  term: string,
  type: SuggestionType
}

export interface BaseProvider {
  getUrl(searchTerm: string): string
  getSuggestions(partialSearch: string): Promise<Suggestion[]>
}
