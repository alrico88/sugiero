import { getSuggestions } from '../src';

describe('Test getting Google suggestions', () => {
  it('Should return suggestions for common search terms', async () => {
    const suggestions = await getSuggestions('hotels', 'Google');

    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('Should should not return suggestions for weird search terms', async () => {
    const suggestions = await getSuggestions('aduqlkjasdku,ylkajsdkhasd', 'Google');

    expect(suggestions.length).toBe(0);
  });
});

describe('Test getting DuckDuckGo suggestions', () => {
  it('Should return suggestions for common search terms', async () => {
    const suggestions = await getSuggestions('hotels', 'DuckDuckGo');

    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('Should should not return suggestions for weird search terms', async () => {
    const suggestions = await getSuggestions('saduqlkjasdku,ylkajsdkhasd', 'DuckDuckGo');

    expect(suggestions.length).toBe(0);
  });
});

describe('Test getting Yahoo suggestions', () => {
  it('Should return suggestions for common search terms', async () => {
    const suggestions = await getSuggestions('hotels', 'Yahoo');

    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('Should should not return suggestions for weird search terms', async () => {
    const suggestions = await getSuggestions('saduqlkjasdku,ylkajsdkhasd', 'Yahoo');

    expect(suggestions.length).toBe(0);
  });
});

describe('Test getting random suggestions', () => {
  it('Should return suggestions for common search terms', async () => {
    const suggestions = await getSuggestions('hotels', 'random');

    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('Should should not return suggestions for weird search terms', async () => {
    const suggestions = await getSuggestions('saduqlkjasdku,ylkajsdkhasd', 'random');

    expect(suggestions.length).toBe(0);
  });
});
