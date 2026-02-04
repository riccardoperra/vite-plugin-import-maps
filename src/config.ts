export const PLUGIN_NAME = "vite-plugin-import-maps";

export function pluginName(name: string) {
  return `${PLUGIN_NAME}:${name}`;
}

export type DependencyIntegrityCheck = 'sha256' | 'sha384' | 'sha512';

export interface SharedDependencyObjectConfig {
  /**
   * The name of the dependency that will be resolved
   */
  name: string;
  /**
   * Local path to the entry file, or the dependency name (e.g., react)
   */
  entry: string;
  /**
   * Enable integrity check for the dependency (only in build)
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap#integrity_metadata_map
   */
  integrity?: boolean | DependencyIntegrityCheck;
}
export type SharedDependencyConfig = Array<string | SharedDependencyObjectConfig>;

export interface VitePluginImportMapsConfig {
  /**
   * Dependencies shared by modules
   */
  shared: SharedDependencyConfig;
  /**
   * Directory where the shared chunks are stored
   *
   * @default ""
   */
  sharedOutDir?: string;
  /**
   * Default `integrity` value for entries.
   * Can be customized per dependency through {@link SharedDependencyObjectConfig#integrity}
   *
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script/type/importmap#integrity_metadata_map
   */
  integrity?: boolean | DependencyIntegrityCheck;
  /**
   * Enable logging
   */
  log?: boolean;
  /**
   * Whether to inject the import map in to the main HTML file. Defaults to true.
   *
   * NOTE: You probably have to set `false` in apps with SSR enabled,
   * and use the `virtual:importmap` dynamic import instead.
   */
  injectImportMapsToHtml?: boolean;
  /**
   * Transform the resolved import map `imports` before writing it to the HTML file
   */
  importMapHtmlTransformer?: (
    importMap: Record<string, string>,
  ) => Record<string, string>;
  /**
   * Whether to generate an import file.
   *
   * If a string is provided, it will be used as the output file name. Default as 'import-map.json'.
   *
   * Output file will be generated in the root directory of your generated bundle and will be
   * available also in development mode via the Vite Dev Server.
   */
  outputAsFile?: boolean | string;
}
