# sugiero

Get search suggestions from a partial search term.

## Installation

Using npm:

`npm i sugiero`

Using pnpm:

`pnpm add sugiero`

Requires Node.js 20 or later (it uses the built-in `fetch`).

## Usage

Using CommonJS

```javascript
const { getSuggestions } = require('sugiero');
```

Using imports

```javascript
import { getSuggestions } from 'sugiero';
```

Then

```javascript
const suggestions = await getSuggestions('hotels');

// [{ term: 'hotels', type: 'QUERY' }, { term: 'http://hotels.com', type: 'NAVIGATION' }, ...]
```

You can choose between multiple providers by passing their name as second argument. If none is provided, Google will be used.

```javascript
const suggestions = await getSuggestions('hotels', 'Yahoo');
```

Available search providers are:

- Amazon
- Bing
- DuckDuckGo
- Ecosia
- Google
- Qwant
- Startpage
- Swisscows
- Wikipedia
- Yahoo
- Yandex
- YouTube
- random (chooses a random provider between those available)

## API

### `getSuggestions(partialSearch, searchProvider?)`

Returns a `Promise<Suggestion[]>` with the suggestions for `partialSearch`.

| Parameter        | Type                 | Default    | Description                               |
| ---------------- | -------------------- | ---------- | ----------------------------------------- |
| `partialSearch`  | `string`             |            | The term to get suggestions for           |
| `searchProvider` | `SearchProviderType` | `'Google'` | One of the providers above, or `'random'` |

It throws if the provider answers with an HTTP error.

### Types

```typescript
type SuggestionType = 'QUERY' | 'NAVIGATION';

interface Suggestion {
  term: string;
  type: SuggestionType;
}

type SearchProviderType =
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
```

All three types are exported:

```typescript
import type { SearchProviderType, Suggestion, SuggestionType } from 'sugiero';
```

`NAVIGATION` is only returned by Google, YouTube and Yahoo, when the provider marks a suggestion as navigational (usually a site or URL). Everything else is a `QUERY`.
