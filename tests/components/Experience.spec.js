import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Experience from '@/components/Experience.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe('Experience component', () => {
	const mountExperience = (locale = 'en') => mount(Experience, {
		global: {
			plugins: [createTestI18n(locale)],
		},
	});

	it('should renders experience section', () => {
		const  wrapper = mountExperience();

		expect(wrapper.find('#experience').exists()).toBe(true);
	});

	it('should renders experience section with correct title. EN', () => {
		const wrapper = mountExperience();

		expect(wrapper.find('h2').text()).toBe(en.Common_data.Common_title_experience);
	});

	it('should renders experience section with correct cards of experience. EN', () => {
		const wrapper = mountExperience();

		const experienceCards = wrapper.findAll('.experience-item');

		expect(experienceCards.length).toBe(en.Experience_data.length);
		for (let i = 0; i < experienceCards.length; i++) {
			expect(experienceCards[i].find('.experience-item__company').text()).toBe(en.Experience_data[i].company);
			expect(experienceCards[i].find('.experience-item__role').text()).toBe(en.Experience_data[i].role);
			expect(experienceCards[i].find('.experience-item__period').text()).toBe(en.Experience_data[i].period);
			expect(experienceCards[i].classes()).not.toContain('experience-item--expanded');
			expect(experienceCards[i].findAll('li').length).toBe(en.Experience_data[i].details.length);
		}
	});

	it('should renders experience section with correct title. RU', () => {
		const wrapper = mountExperience('ru');

		expect(wrapper.find('h2').text()).toBe(ru.Common_data.Common_title_experience);
	});

	it('should renders section with correct cards of experience. RU', () => {
		const wrapper = mountExperience('ru');

		const experienceCards = wrapper.findAll('.experience-item');

		expect(experienceCards.length).toBe(ru.Experience_data.length);
		for (let i = 0; i < experienceCards.length; i++) {
			expect(experienceCards[i].find('.experience-item__company').text()).toBe(ru.Experience_data[i].company);
			expect(experienceCards[i].find('.experience-item__role').text()).toBe(ru.Experience_data[i].role);
			expect(experienceCards[i].find('.experience-item__period').text()).toBe(ru.Experience_data[i].period);
			expect(experienceCards[i].classes()).not.toContain('experience-item--expanded');
			expect(experienceCards[i].findAll('li').length).toBe(ru.Experience_data[i].details.length);
		}
	});

	it('should expand experience card by click', async () => {
		const wrapper = mountExperience();
		const experienceCards = wrapper.findAll('.experience-item');
		const headerExperienceCard = experienceCards[0].find('.experience-item__header');

		// Expand card
		await headerExperienceCard.trigger('click');

		expect(experienceCards[0].classes()).toContain('experience-item--expanded');

		// Collapse card
		await headerExperienceCard.trigger('click');

		expect(experienceCards[0].classes()).not.toContain('experience-item--expanded');
	});

	it('should collapse previous expanded card if expand the next one', async () => {
		const wrapper = mountExperience();
		const experienceCards = wrapper.findAll('.experience-item');
		const firstHeaderCard = experienceCards[0].find('.experience-item__header');
		const secondHeaderCard = experienceCards[1].find('.experience-item__header');

		await firstHeaderCard.trigger('click');
		expect(experienceCards[0].classes()).toContain('experience-item--expanded');
		expect(experienceCards[1].classes()).not.toContain('experience-item--expanded');

		await secondHeaderCard.trigger('click');
		expect(experienceCards[0].classes()).not.toContain('experience-item--expanded');
		expect(experienceCards[1].classes()).toContain('experience-item--expanded');
	});
});
