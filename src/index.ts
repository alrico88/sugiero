import { Suggestion } from './providers/base';

import { DuckDuckGo } from './providers/DuckDuckGo';
import { Google } from './providers/Google';
import { Yahoo } from './providers/Yahoo';

export type SearchProviderType = 'Google' | 'Yahoo' | 'DuckDuckGo' | 'random';
/**
 * Gets search suggestions for a partial search
 *
 * @export
 * @param {string} partialSearch The term to search suggestions for
 * @param {SearchProviderType} searchProvider
 * @return {Promise<Suggestion[]>} The suggested searches
 */
export async function getSuggestions(partialSearch: string, searchProvider: SearchProviderType = 'Google'): Promise<Suggestion[]> {
  let provider = searchProvider;
  if (provider === 'random') {
    const providers = ['Google', 'Yahoo', 'DuckDuckGo'];
    provider = providers[Math.floor(Math.random() * providers.length)] as SearchProviderType;
  }
  switch (provider) {
    case 'DuckDuckGo':
      return new DuckDuckGo().getSuggestions(partialSearch);
    case 'Yahoo':
      return new Yahoo().getSuggestions(partialSearch);
    default:
      return new Google().getSuggestions(partialSearch);
  }
}
