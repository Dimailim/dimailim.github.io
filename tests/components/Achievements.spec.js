import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Achievements from '@/components/Achievements.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';


describe('Achievements component', () => {
	const mountAchievements = (locale = 'en') => mount(Achievements, {
		global: {
			plugins: [createTestI18n(locale)]
		}
	});

	afterEach(() => {
		document.body.style.overflow = '';
	})

	it('should render all achievement cards and no modal by default. EN', () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');

		expect(wrapper.find('h2').text()).toBe(en.Common_data.Common_title_achievements);
		expect(achievementCards.length).toBe(en.Achievements_data.Achievements_list.length);
		for (let i = 0; i < en.Achievements_data.Achievements_list.length; i++) {
			const achievementCard = en.Achievements_data.Achievements_list[i];
			expect(achievementCards[i].find('h4').text()).toBe(achievementCard.title);
			expect(achievementCards[i].findAll('.achievement-card__tag').length).toBe(achievementCard.tags.length);
			expect(achievementCards[i].find('.achievement-card__desc').text()).toBe(achievementCard.desc);
		}
	});

	it('should render all achievement cards and no modal by default. RU', () => {
		const wrapper = mountAchievements('ru');
		const achievementCards = wrapper.findAll('.achievement-card');

		expect(wrapper.find('h2').text()).toBe(ru.Common_data.Common_title_achievements);
		expect(achievementCards.length).toBe(ru.Achievements_data.Achievements_list.length);
		for (let i = 0; i < ru.Achievements_data.Achievements_list.length; i++) {
			const achievementCard = ru.Achievements_data.Achievements_list[i];
			expect(achievementCards[i].find('h4').text()).toBe(achievementCard.title);
			expect(achievementCards[i].findAll('.achievement-card__tag').length).toBe(achievementCard.tags.length);
			expect(achievementCards[i].find('.achievement-card__desc').text()).toBe(achievementCard.desc);
		}
	});

	it('should open modal when achievement card is clicked.', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const achievementCard = achievementCards[0];
		const achievementCardLocale = en.Achievements_data.Achievements_list[0];

		await achievementCard.trigger('click');

		expect(wrapper.find('.modal-overlay').exists()).toBe(true);
		expect(wrapper.find('.modal-header h3').text()).toBe(achievementCardLocale.title);
		expect(document.body.style.overflow).toBe('hidden');
	});

	it('should close modal window and restore body scroll', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const achievementCard = achievementCards[0];

		await achievementCard.trigger('click');

		expect(wrapper.find('.modal-overlay').exists()).toBe(true);

		// Close window
		await wrapper.find('.modal-close').trigger('click');

		expect(wrapper.find('.modal-overlay').exists()).toBe(false);
		expect(document.body.style.overflow).toBe('auto');
	});

	it('should toggle screenshot gallery in clicked opened modal window', async () => {
		const wrapper = mountAchievements();
		const achievementCards = wrapper.findAll('.achievement-card');
		const indexCardWithScreenshot = en.Achievements_data.Achievements_list.findIndex((item) => item.screenshots);

		await achievementCards[indexCardWithScreenshot].trigger('click');

		expect(wrapper.find('.modal-gallery').exists()).toBe(false);

		await wrapper.find('.modal-spoiler-btn').trigger('click');

		expect(wrapper.find('.modal-gallery').exists()).toBe(true);
	});

});