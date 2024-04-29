export interface PluginUserConfig {
    import?: import('@vituum/vite-plugin-postcss/types/postcssImport.d.ts').AtImportOptions
    nesting?: import('postcss-nesting').pluginOptions
    customMedia?: import('postcss-custom-media').pluginOptions
    autoprefixer?: import('autoprefixer').Options
}

export default function plugin(options?: PluginUserConfig) : import('vite').Plugin
