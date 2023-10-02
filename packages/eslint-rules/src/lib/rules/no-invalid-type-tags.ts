import { Rule } from "eslint";
import { ErrorObject, tagsEmpty, typesValid } from "../utils/tags";

export const INVALID_MESSAGE_ID = "nx/no-invalid-type-tags" as const;
export const EMPTY_MESSAGE_ID = "nx/no-empty-type-tags" as const;

export const invalidTagsMessage = (invalidTypeTags: ErrorObject<string[]>) => `${INVALID_MESSAGE_ID}: ${(invalidTypeTags as unknown[]).join(', ')}`

export default {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure tags in `package.json` have valid types",
      category: "Best Practices",
      recommended: true
    },
    fixable: "code",
    messages: {
      [EMPTY_MESSAGE_ID]:
        "A `project.json` file should have valid tags configured",
      [INVALID_MESSAGE_ID]:
        "Only valid type tags are allowed"
    },
    schema: [
      {
        type: "object",
        properties: {
          validTypes: {
            type: "array",
            items: {
              type: "string"
            },
            uniqueItems: true
          }
        },
        additionalProperties: false
      }
    ]
  },
  create: (context) => {
    const configuration = context.options[0] || {};
    const validTypes: string[] = configuration.validTypes;
    if(validTypes?.some(type => type?.startsWith('type:'))) {
      throw new Error(`validTypes can\`t start with "type:". e.g. ["app"] instead of ["type:app"]`)
    }
    return ({
      "Program:exit": (node) => {
        const fileName = context.getFilename();
        if (!fileName.endsWith("package.json")) {
          return;
        }

        const content = context.getSourceCode().getText(node);
        let packageJson;

        try {
          packageJson = JSON.parse(content);
        } catch {
          // @Notice: It is best practice to use context#report instead of throwing an error.
          // However, the json parser will throw before in case an invalid json is provided.
          context.report({
            node,
            message: "Unable to parse package.json."
          });
          return;
        }
        if (tagsEmpty(packageJson)) {
          context.report({
            node,
            messageId: EMPTY_MESSAGE_ID
          });
          return;
        }
        const invalidTypesError = typesValid(packageJson, validTypes)
        if (invalidTypesError) {
          context.report({
            node,
            // messageId: INVALID_MESSAGE_ID,
            message: invalidTagsMessage(invalidTypesError)
          });
          return;
        }
      }
    });
  }
} satisfies Rule.RuleModule;
