import createTestI18n from '../helpers/i18n.js';
import {flushPromises, mount} from '@vue/test-utils';

import Experience from '@/components/Experience.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe('Experience component', () => {
	const mountExperience = (locale = 'en') => mount(Experience, {
		global: {
			plugins: [createTestI18n(locale)],
		},
	});
	beforeEach(() => {
		Object.defineProperty(HTMLElement.prototype, 'scrollHeight', {
			configurable: true,
			value: 500,
		});
	});
	afterEach(() => {
		delete HTMLElement.prototype.scrollHeight;
	});

	it('should renders experience section', () => {
		const  wrapper = mountExperience();

		expect(wrapper.find('#experience').exists()).toBe(true);
	});

	it.each([
		['en', en],
		['ru', ru]
	])('should renders experience section with correct title. (%s)', (locale, messages) => {
		const wrapper = mountExperience(locale);

		expect(wrapper.find('h2').text()).toBe(messages.Common_data.Common_title_experience);
	});

	it.each([
		['en', en],
		['ru', ru]
	])('should renders experience section with correct cards of experience. (%s)', (locale, messages) => {
		const wrapper = mountExperience(locale);

		const experienceCards = wrapper.findAll('.experience-item');

		expect(experienceCards.length).toBe(messages.Experience_data.length);
		for (let i = 0; i < experienceCards.length; i++) {
			expect(experienceCards[i].find('.experience-item__company').text()).toBe(messages.Experience_data[i].company);
			expect(experienceCards[i].find('.experience-item__role').text()).toBe(messages.Experience_data[i].role);
			expect(experienceCards[i].find('.experience-item__period').text()).toBe(messages.Experience_data[i].period);
			expect(experienceCards[i].classes()).not.toContain('experience-item--expanded');
			expect(experienceCards[i].findAll('li').length).toBe(messages.Experience_data[i].details.length);
		}
	});

	it('should keep all content collapsed by default (max-height 0)', () => {
		const wrapper = mountExperience();
		const contents = wrapper.findAll('.experience-item__content');

		contents.forEach((content) => {
			expect(content.element.style.maxHeight).toBe('0px');
		});
	});

	it('should expand experience card by click', async () => {
		const wrapper = mountExperience();
		const experienceCards = wrapper.findAll('.experience-item');
		const experienceContentCards = wrapper.findAll('.experience-item__content');
		const headerExperienceCard = experienceCards[0].find('.experience-item__header');

		// Expand card
		await headerExperienceCard.trigger('click');

		expect(experienceCards[0].classes()).toContain('experience-item--expanded');
		expect(experienceContentCards[0].element.style.maxHeight).toBe('500px');

		// Collapse card
		await headerExperienceCard.trigger('click');

		expect(experienceCards[0].classes()).not.toContain('experience-item--expanded');
		expect(experienceContentCards[0].element.style.maxHeight).toBe('0px');
	});

	it('should collapse previous expanded card if expand the next one', async () => {
		const wrapper = mountExperience();
		const experienceCards = wrapper.findAll('.experience-item');
		const experienceContentCards = wrapper.findAll('.experience-item__content');
		const firstHeaderCard = experienceCards[0].find('.experience-item__header');
		const secondHeaderCard = experienceCards[1].find('.experience-item__header');

		await firstHeaderCard.trigger('click');
		expect(experienceCards[0].classes()).toContain('experience-item--expanded');
		expect(experienceContentCards[0].element.style.maxHeight).toBe('500px');
		expect(experienceCards[1].classes()).not.toContain('experience-item--expanded');
		expect(experienceContentCards[1].element.style.maxHeight).toBe('0px');

		await secondHeaderCard.trigger('click');
		expect(experienceCards[0].classes()).not.toContain('experience-item--expanded');
		expect(experienceContentCards[0].element.style.maxHeight).toBe('0px');
		expect(experienceCards[1].classes()).toContain('experience-item--expanded');
		expect(experienceContentCards[1].element.style.maxHeight).toBe('500px');
	});

	it('should re-measure expanded card height on locale change', async () => {
		const i18n = createTestI18n('en');
		const wrapper = mount(Experience, { global: { plugins: [i18n] } });
		const content = wrapper.findAll('.experience-item__content')[0];
		const header = wrapper.findAll('.experience-item')[0].find('.experience-item__header');

		await header.trigger('click');
		expect(content.element.style.maxHeight).toBe('500px');

		Object.defineProperty(HTMLElement.prototype, 'scrollHeight', { configurable: true, value: 800 });
		i18n.global.locale.value = 'ru';
		await flushPromises();

		expect(content.element.style.maxHeight).toBe('800px');
	});

	it('should clean up content refs on unmount', () => {
		const wrapper = mountExperience();

		expect(() => wrapper.unmount()).not.toThrow();
	});
});
