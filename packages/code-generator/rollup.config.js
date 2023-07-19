import rollupTypescript from '@rollup/plugin-typescript'
import { string } from 'rollup-plugin-string'

export default {
  input: 'src/index.ts',
  output: {
    file: 'main.js',
    format: 'esm'
  },
  external: ['prettier', 'prettier/parser-html', 'prettier/parser-postcss', 'jszip', 'file-saver'],
  plugins: [
    rollupTypescript(),
    string({
      include: [
        '**/normalize.css',
        '**/index.css',
        '**/animation.css',
        '**/presets.js',
        '**/bottom.js',
        '**/dist/material/*',
        '**/dist/util/*'
      ]
      // exclude: ['**/index.html']
    })
  ]
}
