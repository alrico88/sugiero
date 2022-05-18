export type SuggestionType = 'QUERY' | 'NAVIGATION';

export interface Suggestion {
  term: string,
  type: SuggestionType
}

export abstract class BaseProvider {
  static getUrl: (searchTerm: string) => string;

  static getSuggestions: (partialSearch: string) => Promise<Suggestion[]>;
}
