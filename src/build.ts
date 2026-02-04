import { buildWithVirtual } from "./strategy/build-virtual.js";
import type { Plugin } from "vite";
import type { VitePluginImportMapsStore } from "./store.js";

export function pluginImportMapsBuildEnv(
  store: VitePluginImportMapsStore,
): Array<Plugin> {
  const plugins: Array<Plugin> = [];

  for (const dep of store.sharedDependencies) {
    store.addInput(dep);
  }

  plugins.push(...buildWithVirtual(store));

  return plugins;
}
