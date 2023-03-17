import path from 'path'

import { Alias, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import * as tsconfig from './tsconfig.json'

function readAliasFromTsConfig(): Alias[] {
  const pathReplaceRegex = /\/\*$/
  return Object.entries(tsconfig.compilerOptions.paths).reduce<Alias[]>((aliases, [fromPaths, toPaths]) => {
    const find = fromPaths.replace(pathReplaceRegex, '')
    const toPath = toPaths[0].replace(pathReplaceRegex, '')
    const replacement = path.resolve(__dirname, toPath)
    aliases.push({ find, replacement })
    return aliases
  }, [])
}

export default defineConfig({
  resolve: {
    alias: readAliasFromTsConfig()
  },
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-macros']
      }
    })
  ],
  server: {
    port: 3000
  }
})
