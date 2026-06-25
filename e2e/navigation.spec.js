import {expect, test} from '@playwright/test';

test.describe('Navigation', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('/');
	});

	const sections = [
		{ link: 'About me', id: '#about' },
		{ link: 'Key skills', id: '#skills' },
		{ link: 'Experience', id: '#experience' },
		{ link: 'Achievements & Projects', id: '#achievements' },
	];

	for(const {link, id} of sections) {
		test(`scrolls to ${id} on nav click`, async ({ page }) => {
			await page.getByRole('link', { name: link }).click();
			await expect(page.locator(id)).toBeInViewport();
		});
	}

	test('scrolls back to top on logo click', async ({ page }) => {
		await page.getByRole('link', { name: 'Achievements & Projects' }).click();
		await expect(page.locator('#achievements')).toBeInViewport();

		await page.getByRole('button', { name: /scroll to top/i }).click();
		await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
	});
});