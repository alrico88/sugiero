[sugiero](README.md) / Exports

# sugiero

## Table of contents

### Type aliases

- [SearchProviderType](modules.md#searchprovidertype)

### Functions

- [getSuggestions](modules.md#getsuggestions)

## Type aliases

### SearchProviderType

Ƭ **SearchProviderType**: ``"Google"`` \| ``"Yahoo"`` \| ``"DuckDuckGo"`` \| ``"random"``

#### Defined in

[index.ts:6](https://github.com/alrico88/sugiero/blob/master/src/index.ts#L6)

## Functions

### getSuggestions

▸ **getSuggestions**(`partialSearch`, `searchProvider?`): `Promise`<`Suggestion`[]\>

Gets search suggestions for a partial search

**`export`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `partialSearch` | `string` | `undefined` | The term to search suggestions for |
| `searchProvider` | [`SearchProviderType`](modules.md#searchprovidertype) | `'Google'` |  |

#### Returns

`Promise`<`Suggestion`[]\>

The suggested searches

#### Defined in

[index.ts:16](https://github.com/alrico88/sugiero/blob/master/src/index.ts#L16)
