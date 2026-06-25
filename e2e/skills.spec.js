import {expect, test} from '@playwright/test';

test.describe('Skills', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('shows tooltip on skill card hover', async ({ page }) => {
		const skills = page.locator('#skills');

		const jsCardName = skills.getByText('JavaScript', { exact: true });
		const tooltipText = skills.getByText(/my primary one/i);

		await expect(tooltipText).toBeHidden();

		await jsCardName.hover();

		await expect(tooltipText).toBeVisible();
	});
});