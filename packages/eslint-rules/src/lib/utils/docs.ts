import { generateReport } from "@push-based/utils";

export function docsUrl(ruleName: string): string {
    return `https://github/pushbased/pagckages/eslint-plugin/src/lib/rules/${ruleName}.md`;
}

generateReport
