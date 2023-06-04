import path from 'path';
import vue from '@vitejs/plugin-vue2';
import VitePluginHtmlEnv from 'vite-plugin-html-env';

export default {
  plugins: [vue(), VitePluginHtmlEnv(),],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
}
