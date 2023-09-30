export type ErrorObject<T = string> = T | any[] | Record<string, any>;
export type ValidatorResult<T> = null | ErrorObject<T>;

export function tagsEmpty(packageJson: Record<string, string[]>): ValidatorResult<string> {
  if (!packageJson["tags"]) {
    return 'no tags present';
  } else {
    if (Array.isArray(packageJson["tags"])) {
      return packageJson["tags"].length > 0 ? null : 'tags empty';
    }
    else {
      return 'tags no array';
    }
  }
}

export function typesValid(
  packageJson: Record<'tags', string[]>,
  validTypes: string[]
): ValidatorResult<string[]> {

  const types = packageJson.tags
    .filter(tag => tag.startsWith('type:'))
  const invalidTypeTags: string[] = types
    .filter(tag => {
      const type = tag.split('type:').pop() as string;
      !validTypes.includes(type)
    });

  if (invalidTypeTags.length > 0) {
    return invalidTypeTags;
  }

  return null;
}
