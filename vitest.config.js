import {configDefaults, defineConfig} from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  	plugins: [vue()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},
	test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: path.resolve(__dirname, './tests/setup.js'),
	exclude: [...configDefaults.exclude, 'e2e/**'],
	coverage: {
		provider: 'v8',
		reporter: ['text', 'json', 'lcov', 'html'],
		all: true,
		thresholds: {
			lines: 80,
			functions: 80,
			branches: 80,
			statements: 80,
		},
		exclude: [
			'node_modules/',
			'**/*.config.js',
			'**/dist/**',
			'tests/**',
			'src/data/**'
		],
	},

  },
})