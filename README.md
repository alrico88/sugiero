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

## Documentation

See [DOCS](./docs/modules.md)
