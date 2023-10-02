import noEmptyTags from "./no-empty-tags";
import noInvalidTypeTags from "./no-invalid-type-tags";
import { Rule } from "eslint";

export const rules: Record<string, Rule.RuleModule> = {
  'no-empty-tags': noEmptyTags,
  'no-invalid-type-tags': noInvalidTypeTags,
}
