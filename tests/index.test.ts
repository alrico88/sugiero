import { getSuggestions } from '../src';

describe('Test getting suggestions', () => {
  it('Should return suggestions for common search terms', async () => {
    const suggestions = await getSuggestions('hotels');

    expect(suggestions.length).toBeGreaterThan(0);
  });

  it('Should should not return suggestions for weird search terms', async () => {
    const suggestions = await getSuggestions('saduqlkjasdku,ylkajsdkhasd');

    expect(suggestions.length).toBe(0);
  });
});
