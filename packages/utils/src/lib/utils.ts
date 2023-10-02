import { getProjects, ProjectConfiguration, ProjectGraph, readCachedProjectGraph, readNxJson, Tree } from "@nx/devkit";
import { FsTree } from "nx/src/generators/tree";
import { NxJsonConfiguration } from "nx/src/config/nx-json";
import { headline, li, NEW_LINE, style } from "./md";
import { readPackageJson } from "nx/src/project-graph/file-utils";
import { PackageJson } from "nx/src/utils/package-json";
import * as process from "process";

export async function generateReport() {
  const ws = workspaceReport();
  ws.graph.dependencies;

  for (let node in ws.graph.nodes) {
    const nodeName = ws.graph.nodes[node].name;
    console.log("nodeName: ", nodeName);
    console.log("node: ", ws.graph.dependencies[nodeName]);
  }

  console.log("graph: ", renderMdReport(ws));
  // {nxJson, projects, graph}

}

type WsReport = {
  packageJson: PackageJson,
  nxJson: NxJsonConfiguration | null,
  projects: Map<string, ProjectConfiguration>
  graph: ProjectGraph
}

export function workspaceReport(root?: Tree): WsReport {
  const tree = root || new FsTree(process.cwd(), true);

  const nxJson = readNxJson(tree);
  if (!nxJson) {
    throw new Error("Read nx json returned null");
  }

  return {
    packageJson: readPackageJson(),
    nxJson,
    projects: getProjects(tree),
    graph: readCachedProjectGraph()
  };
}

function renderMdReport(report: WsReport): string {
  const { packageJson, projects } = report;
  let md = headline(packageJson.name) + NEW_LINE + NEW_LINE;
  md += style("Projects:") + NEW_LINE;

  projects.forEach(p => {
    md += li(p.name || "missing") + NEW_LINE;
  });

  return md;
}
