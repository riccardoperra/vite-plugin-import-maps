import { VitePluginImportMapsStore } from "./store.js";
import { pluginImportMapsBuildEnv } from "./build.js";
import { pluginImportMapsInject } from "./inject-import-map.js";
import { pluginImportMapsDevelopmentEnv } from "./development.js";
import { pluginImportMapsAsFile } from "./import-maps-as-file.js";
import { pluginImportMapsAsModule } from "./import-map-module.js";
import type { VitePluginImportMapsConfig } from "./config.js";
import type { Plugin } from "vite";

export function vitePluginNativeImportMaps(
  options: VitePluginImportMapsConfig,
): Array<Plugin> {
  const { injectImportMapsToHtml = true, outputAsFile } = options;

  const plugins: Array<Plugin> = [];

  const store = new VitePluginImportMapsStore(options);

  plugins.push(...pluginImportMapsBuildEnv(store));
  plugins.push(pluginImportMapsDevelopmentEnv(store));

  if (injectImportMapsToHtml) {
    plugins.push(pluginImportMapsInject(store));
  }

  plugins.push(pluginImportMapsAsModule(store));

  if (outputAsFile) {
    plugins.push(
      pluginImportMapsAsFile(store, {
        name:
          typeof options.outputAsFile === "string"
            ? options.outputAsFile
            : undefined,
      }),
    );
  }

  return plugins;
}
