import {Rule} from "eslint";

export const MESSAGE_ID = 'no-empty-tags' as const;

export default {
    meta: {
        type: "problem",
        docs: {
            description: "Ensure tags are filled in package.json of Nx monorepo",
            category: "Best Practices",
            recommended: true,
        },
        fixable: "code",
        messages: {
            [MESSAGE_ID]:
                'Use with caution - zone.{{ name }} will invoke Zone and cause change detection cycle.'
        },
        schema: [
            {
                type: 'object',
                properties: {
                    validTags: {
                        type: 'array',
                        items: {
                            type: 'string',
                        },
                        uniqueItems: true,
                    },
                },
                additionalProperties: false,
            },
        ],
    },
    create: (context) => {
        const configuration = context.options[0] || {};
        const validTags = configuration.validTags || [];

        if(validTags.lenght === 0) {
            validTags.push("type:app");
        }

        return ({
            "Program:exit": (node) => {
                const fileName = context.getFilename();
                console.log('context: ', context.getFilename());
                console.log('fileName: ', fileName);
                if (!fileName.endsWith("package.json")) {
                    return;
                }

                const content = context.getSourceCode().getText(node);
                let packageJson;

                try {
                    packageJson = JSON.parse(content);
                } catch {
                    throw new Error(`Unable to parse package.json ${content}.`);
                }

                if (!packageJson.tags) {
                    context.report({
                        node,
                        messageId: MESSAGE_ID,
                        fix: (fixer) => {
                            const _content = JSON.parse(content);
                            _content.tags = [validTags[0]];
                            return fixer.replaceText(node, JSON.stringify(_content, null, 2));
                        }
                    });
                }
            }
        })
    },
} satisfies Rule.RuleModule;
