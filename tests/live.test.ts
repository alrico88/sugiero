import { describe, expect, it } from 'vite-plus/test';
import { getSuggestions, type SearchProviderType } from '../src';

const providers: SearchProviderType[] = [
  'Google',
  'YouTube',
  'DuckDuckGo',
  'Qwant',
  'Startpage',
  'Swisscows',
  'Yahoo',
  'Bing',
  'Ecosia',
  'Yandex',
  'Wikipedia',
  'Amazon',
];

describe.runIf(process.env.LIVE)('live providers', () => {
  it.each(providers)('%s returns suggestions', async (provider) => {
    const suggestions = await getSuggestions('hotels', provider);

    expect(suggestions.length).toBeGreaterThan(0);
  });
});
