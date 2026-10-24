import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import { getSuggestions, type SearchProviderType } from '../src';

const cases: [SearchProviderType, unknown, string][] = [
  [
    'Google',
    [
      'hotels',
      ['hotels', 'http://hotels.com'],
      [],
      [],
      { 'google:suggesttype': ['QUERY', 'NAVIGATION'] },
    ],
    'suggestqueries.google.com',
  ],
  [
    'YouTube',
    [
      'hotels',
      ['hotels', 'http://hotels.com'],
      [],
      [],
      { 'google:suggesttype': ['QUERY', 'NAVIGATION'] },
    ],
    'ds=yt',
  ],
  ['DuckDuckGo', [{ phrase: 'hotels' }, { phrase: 'hotels.com' }], 'duckduckgo.com'],
  [
    'Qwant',
    {
      status: 'success',
      data: {
        items: [
          { value: 'hotels', suggestType: 0 },
          { value: 'hotels.com', suggestType: 0 },
        ],
      },
      special: [],
    },
    'api.qwant.com',
  ],
  ['Startpage', ['hotels', ['hotels', 'hotels.com']], 'startpage.com'],
  ['Bing', ['hotels', ['hotels', 'hotels.com']], 'api.bing.com'],
  ['Ecosia', ['hotels', ['hotels', 'hotels.com']], 'ac.ecosia.org'],
  ['Yandex', ['hotels', ['hotels', 'hotels.com']], 'suggest.yandex.com'],
  ['Wikipedia', ['hotels', ['hotels', 'hotels.com'], [], []], 'wikipedia.org'],
  [
    'Amazon',
    {
      alias: 'aps',
      prefix: 'hotels',
      suggestions: [
        { type: 'KEYWORD', value: 'hotels' },
        { type: 'KEYWORD', value: 'hotels.com' },
      ],
    },
    'completion.amazon.com',
  ],
  ['Swisscows', ['hotels', 'hotels.com'], 'api.swisscows.com'],
  [
    'Yahoo',
    {
      q: 'hotels',
      l: { gprid: '' },
      r: [
        { k: 'hotels', m: 6 },
        { k: 'hotels.com', m: 5 },
      ],
    },
    'search.yahoo.com',
  ],
];

function mockFetch(body: unknown, status = 200) {
  const fetchMock = vi.fn<typeof fetch>(async () => Response.json(body, { status }));

  vi.stubGlobal('fetch', fetchMock);

  return fetchMock;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe.each(cases)('%s', (provider, body, host) => {
  it('parses suggestions', async () => {
    mockFetch(body);

    const suggestions = await getSuggestions('hotels', provider);

    expect(suggestions.map((s) => s.term)).toEqual([
      'hotels',
      expect.stringContaining('hotels.com'),
    ]);
    expect(suggestions[0].type).toBe('QUERY');
  });

  it('requests the provider with an encoded term', async () => {
    const fetchMock = mockFetch(body);

    await getSuggestions('a&b c', provider);

    const url = fetchMock.mock.calls[0][0] as string;

    expect(url).toContain(host);
    expect(url).toContain('a%26b%20c');
  });
});

it('maps navigation types', async () => {
  mockFetch(cases[0][1]);
  expect((await getSuggestions('hotels', 'Google'))[1].type).toBe('NAVIGATION');

  mockFetch(cases[cases.length - 1][1]);
  expect((await getSuggestions('hotels', 'Yahoo'))[1].type).toBe('NAVIGATION');
});

it('defaults to Google', async () => {
  const fetchMock = mockFetch(cases[0][1]);

  await getSuggestions('hotels');

  expect(fetchMock.mock.calls[0][0]).toContain('suggestqueries.google.com');
});

it('throws on HTTP errors', async () => {
  mockFetch({}, 500);

  await expect(getSuggestions('hotels', 'DuckDuckGo')).rejects.toThrow('status 500');
});
