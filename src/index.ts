import type { BaseProvider, Suggestion } from './providers/base';
import { Amazon } from './providers/Amazon';
import { Bing } from './providers/Bing';
import { DuckDuckGo } from './providers/DuckDuckGo';
import { Ecosia } from './providers/Ecosia';
import { Google } from './providers/Google';
import { Qwant } from './providers/Qwant';
import { Startpage } from './providers/Startpage';
import { Swisscows } from './providers/Swisscows';
import { Wikipedia } from './providers/Wikipedia';
import { Yahoo } from './providers/Yahoo';
import { Yandex } from './providers/Yandex';
import { YouTube } from './providers/YouTube';

export type { Suggestion, SuggestionType } from './providers/base';

export type SearchProviderType =
  | 'Amazon'
  | 'Bing'
  | 'DuckDuckGo'
  | 'Ecosia'
  | 'Google'
  | 'Qwant'
  | 'Startpage'
  | 'Swisscows'
  | 'Wikipedia'
  | 'Yahoo'
  | 'Yandex'
  | 'YouTube'
  | 'random';

const providers: Record<Exclude<SearchProviderType, 'random'>, typeof BaseProvider> = {
  Amazon,
  Bing,
  DuckDuckGo,
  Ecosia,
  Google,
  Qwant,
  Startpage,
  Swisscows,
  Wikipedia,
  Yahoo,
  Yandex,
  YouTube,
};

/**
 * Gets search suggestions for a partial search
 *
 * @param {string} partialSearch The term to search suggestions for
 * @param {SearchProviderType} searchProvider
 * @return {Promise<Suggestion[]>} The suggested searches
 */
export async function getSuggestions(
  partialSearch: string,
  searchProvider: SearchProviderType = 'Google',
): Promise<Suggestion[]> {
  let provider = searchProvider;

  if (provider === 'random') {
    const names = Object.keys(providers) as (keyof typeof providers)[];

    provider = names[Math.floor(Math.random() * names.length)];
  }

  return providers[provider].getSuggestions(partialSearch);
}
