import { describe, expect, it } from "vitest";
import { tagsEmpty, typesValid } from "./tags";

describe('tagsEmpty', () => {
  it('should return null for a packageJson with undefined tags property', () => {
    expect(tagsEmpty({tags: ["my-tag"]})).toBe(null);
  });
  it('should return ErrorResult for a packageJson with undefined tags property', () => {
    expect(tagsEmpty({})).toBe('no tags present');
  });
  it('should return ErrorResult for a packageJson with empty tags', () => {
    expect(tagsEmpty({tags: []})).toBe('tags empty');
  });
});

const validTypes = ['app','lib'];
describe('typesValid', () => {
  it('should return null for a packageJson with defined tags property', () => {
    expect(typesValid({tags: ["type:app", "scope:lib"]}, validTypes)).toBe(null);
  });

  it('should return ErrorResult for a packageJson with invalid tags configured', () => {
    expect(typesValid({tags: ["type:apppp", "scope:lib"]}, validTypes)).toEqual([ 'type:apppp' ]);
  });
});
