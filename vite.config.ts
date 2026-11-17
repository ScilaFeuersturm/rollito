import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import frontmatter from 'remark-frontmatter'
import mdxFrontmatter from 'remark-mdx-frontmatter'

export default defineConfig({
  base: '/',
  plugins: [
    { ...mdx({ remarkPlugins: [frontmatter, mdxFrontmatter] }), enforce: 'pre' },
    react(),
  ],
})
