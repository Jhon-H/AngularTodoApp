import { TagColorPipe } from './tag-color.pipe';

describe('TagColorPipe', () => {
  it('should use the fallback color when the provided color is undefined', () => {
    const pipe = new TagColorPipe();
    const transformedColor = pipe.transform('', 'peach');
    expect(transformedColor).toBe('peach');
  });
});
