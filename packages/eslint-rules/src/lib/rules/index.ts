import noEmptyTags from "./no-empty-tags";
import noInvalidTypeTags from "./no-invalid-type-tags";
import { Rule } from "eslint";

export const rules: Record<string, Rule.RuleModule> = {
  'projectJson/no-empty-tags': noEmptyTags,
  'projectJson/no-invalid-type-tags': noInvalidTypeTags,
}
