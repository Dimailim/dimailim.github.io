import {expect, test} from '@playwright/test';

test.describe('Achievements', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	test('opens modal with card data and closes it', async ({ page }) => {
		const achievements = page.locator('#achievements');

		const firstTitle = (
			await achievements.getByRole('heading', { level: 4 }).first().textContent()
		).trim();

		await achievements.getByRole('button', { name: firstTitle }).first().click();

		const dialog = page.getByRole('dialog');
		await expect(dialog).toBeVisible();
		await expect(dialog.getByRole('heading', { level: 3 })).toHaveText(firstTitle);

		await dialog.getByRole('button', { name: /close|закрыть/i }).first().click();
		await expect(dialog).toBeHidden();
	});

	test('moves carousel forward with next button', async ({ page }) => {
		const achievements = page.locator('#achievements');

		const thirdTitle = (
			await achievements.getByRole('heading', { level: 4 }).nth(2).textContent()
		).trim();
		const thirdCard = achievements.getByRole('button', { name: thirdTitle });

		await expect(thirdCard).not.toBeInViewport();

		await achievements.getByRole('button', { name: /next element/i }).click();

		await expect(thirdCard).toBeInViewport();
	});
});