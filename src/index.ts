import { Suggestion } from './providers/base';
import { Brave } from './providers/Brave';
import { DuckDuckGo } from './providers/DuckDuckGo';
import { Google } from './providers/Google';
import { Yahoo } from './providers/Yahoo';

export type SearchProviderType = 'Brave' | 'DuckDuckGo' | 'Google' | 'Yahoo' | 'random';

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
    const providers = ['Brave', 'DuckDuckGo', 'Google', 'Yahoo'];
    provider = providers[Math.floor(Math.random() * providers.length)] as SearchProviderType;
  }

  switch (provider) {
    case 'Brave':
      return Brave.getSuggestions(partialSearch)
    case 'DuckDuckGo':
      return DuckDuckGo.getSuggestions(partialSearch);
    case 'Yahoo':
      return Yahoo.getSuggestions(partialSearch);
    default:
      return Google.getSuggestions(partialSearch);
  }
}
