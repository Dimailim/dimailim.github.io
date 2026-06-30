import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Achievements from '@/components/Achievements.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';
import {vi} from 'vitest';
import {nextTick} from 'vue';


describe('Achievements component', () => {
	const mountAchievements = (locale = 'en') => mount(Achievements, {
		global: {
			plugins: [createTestI18n(locale)]
		}
	});

	afterEach(() => {
		document.body.style.overflow = '';
		vi.unstubAllGlobals()
	})

	it.each([
		['en', en],
		['ru', ru]
	])('should render all achievement cards and no modal by default. (%s)', (locale, messages) => {
		const wrapper = mountAchievements(locale);
		const achievementCards = wrapper.findAll('.achievement-card');

		expect(wrapper.find('h2').text()).toBe(messages.Common_data.Common_title_achievements);
		expect(achievementCards.length).toBe(messages.Achievements_data.Achievements_list.length);
		for (let i = 0; i < messages.Achievements_data.Achievements_list.length; i++) {
			const achievementCard = messages.Achievements_data.Achievements_list[i];
			expect(achievementCards[i].find('h4').text()).toBe(achievementCard.title);
			expect(achievementCards[i].findAll('.tag').length).toBe(achievementCard.tags.length);
			expect(achievementCards[i].find('.achievement-card__desc').text()).toBe(achievementCard.desc);
		}
	});

	it('should open modal when achievement card is clicked.', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const achievementCard = achievementCards[0];
		const achievementCardLocale = en.Achievements_data.Achievements_list[0];

		await achievementCard.trigger('click');

		expect(wrapper.find('.modal__overlay').exists()).toBe(true);
		expect(wrapper.find('.modal__header h3').text()).toBe(achievementCardLocale.title);
		expect(document.body.style.overflow).toBe('hidden');
	});

	it('should close modal window and restore body scroll', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const achievementCard = achievementCards[0];

		await achievementCard.trigger('click');

		expect(wrapper.find('.modal__overlay').exists()).toBe(true);

		// Close window
		await wrapper.find('.modal__close').trigger('click');

		expect(wrapper.find('.modal__overlay').exists()).toBe(false);
		expect(document.body.style.overflow).toBe('auto');
	});

	it('should toggle screenshot gallery in clicked opened modal window', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const indexCardWithScreenshot = en.Achievements_data.Achievements_list.findIndex((item) => item.screenshots);

		await achievementCards[indexCardWithScreenshot].trigger('click');

		expect(wrapper.find('.modal__gallery').exists()).toBe(false);

		await wrapper.find('.modal__spoiler-btn').trigger('click');

		expect(wrapper.find('.modal__gallery').exists()).toBe(true);
	});

	it('should be different cards visible for mobile and desktop view', () => {
		const mockMatchMedia = (matches) => {
			vi.stubGlobal('matchMedia', vi.fn(() => ({
					matches,
					addEventListener: vi.fn(),
					removeEventListener: vi.fn(),
			})));
		};
		// Mobile
		mockMatchMedia(true);

		const wrapperMobile = mountAchievements();

		expect(wrapperMobile.find('.carousel--per-1').exists()).toBe(true);

		//Desktop
		mockMatchMedia(false);

		const wrapperDesktop = mountAchievements();

		expect(wrapperDesktop.find('.carousel--per-2').exists()).toBe(true);
	});

	it('should open modal on Enter key on a card', async () => {
		const wrapper = mountAchievements();

		await wrapper.findAll('.achievement-card')[0].trigger('keydown.enter');

		expect(wrapper.find('.modal__overlay').exists()).toBe(true);
	});

	it('should open modal on Space key on a card', async () => {
		const wrapper = mountAchievements();

		await wrapper.findAll('.achievement-card')[0].trigger('keydown.space');

		expect(wrapper.find('.modal__overlay').exists()).toBe(true);
	});

	it('should close modal on Escape key', async () => {
		const wrapper = mountAchievements();
		await wrapper.findAll('.achievement-card')[0].trigger('click');
		expect(wrapper.find('.modal__overlay').exists()).toBe(true);

		document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
		await nextTick();

		expect(wrapper.find('.modal__overlay').exists()).toBe(false);
		expect(document.body.style.overflow).toBe('auto');
	});
});