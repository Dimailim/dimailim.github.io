import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import About from '@/components/About.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe('About component', () => {
	const aboutMount = (locale = 'en') => mount(About, {
		global: {
			plugins: [createTestI18n(locale)]
		}
	});

	it('should render the component', () => {
		const wrapper = aboutMount();

		expect(wrapper.find('#about').exists()).toBe(true);
	});

	it.each([
		['en', en],
		['ru', ru]
	])('should render the correct text (%s)', (locale, messages) => {
		const wrapper = aboutMount(locale);
		const paragraphs = wrapper.findAll('p');

		expect(wrapper.find('h2').text()).toBe(messages.Common_data.Common_title_about);
		// Main text
		for (let i = 0, length = messages.About_data.main_text.length; i < length; i++) {
			expect(paragraphs[i].text()).toBe(messages.About_data.main_text[i]);
		}

		// Lists
		const extraActivitiesSection = wrapper.findAll('.about__list');

		expect(extraActivitiesSection[0].findAll('li').length).toBe(messages.About_data.experience_incl_list.length);
		expect(extraActivitiesSection[1].findAll('li').length).toBe(messages.About_data.extra_activities_list.length);

		// Status
		expect(wrapper.find('.about__status').text()).toBe(messages.About_data.availablity);
	});
});