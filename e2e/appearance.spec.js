import {expect, test} from '@playwright/test';

test.describe('Appearance', () => {
	test.beforeEach(async ({page}) => {
		await page.goto('/');
	});
	test('Toggles theme', async ({page}) => {
		const html = page.locator('html');
		const themeBtn = page.getByRole('button', {name: /toggle theme/i});

		await expect(html).toHaveAttribute('data-theme', 'light');

		await themeBtn.click();
		await expect(html).toHaveAttribute('data-theme', 'dark');

		await themeBtn.click();
		await expect(html).toHaveAttribute('data-theme', 'light');
	});
	test('Switches language to RU', async ({page}) => {
		const button = page.getByRole('button', {name: /Сменить язык на русский/i});

		await expect(page.getByRole('heading', {name: 'About me'})).toBeVisible();

		await button.click();
		await expect(page.getByRole('heading', {name: 'О себе'})).toBeVisible();
		await expect(button).toHaveClass(/--active/);
	});
});