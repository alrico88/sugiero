sugiero / [Exports](modules.md)

# sugiero

Get search suggestions from a partial search term.

## Installation

Using npm:

`npm i sugiero`

Using yarn:

`yarn add sugiero`

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

// suggestions will be an array of {term, type} objects
```

You can choose between multiple providers by passing their name as second argument. If none is provided, Google will be used.

```javascript
const suggestions = await getSuggestions('hotels', 'Yahoo');
```

Available search providers are:

- Brave
- DuckDuckGo
- Google
- Qwant
- Startpage
- Swisscows
- Yahoo
- YouTube
- random (chooses a random provider between those available)

## Documentation

See [DOCS](./docs/modules.md)
