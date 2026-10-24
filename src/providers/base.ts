export type SuggestionType = 'QUERY' | 'NAVIGATION';

export interface Suggestion {
  term: string;
  type: SuggestionType;
}

export abstract class BaseProvider {
  static getUrl: (searchTerm: string) => string;

  static getSuggestions: (partialSearch: string) => Promise<Suggestion[]>;
}

/**
 * Fetches a URL and parses its JSON body
 *
 * @template T
 * @param {string} url
 * @return {Promise<T>}
 */
export async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Request to ${url} failed with status ${res.status}`);
  }

  return res.json() as Promise<T>;
}
