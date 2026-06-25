import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
	testDir: './e2e',
	fullyParallel: true,
	use: {
		baseURL: 'http://localhost:4173',
		trace: 'on-first-retry',
		colorScheme: 'light'
	},
	webServer: {
		command: 'npm run build && npm run preview',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env.CI,
	},
	projects: [
		{ name: 'chromium', use: { ...devices['Desktop Chrome'] } },
	],
});