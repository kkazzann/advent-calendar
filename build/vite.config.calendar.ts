import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  build: {
    outDir: path.resolve(rootDir, 'dist-calendar'),
    emptyOutDir: false, // Don't clear folder - we're building multiple files sequentially
    rollupOptions: {
      input: path.resolve(__dirname, 'calendar.html'),
    },
  },
});
