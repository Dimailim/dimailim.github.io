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

	it('should render the correct text. EN', () => {
		const wrapper = aboutMount();
		const paragraphs = wrapper.findAll('p');

		expect(wrapper.find('h2').text()).toBe(en.Common_data.Common_title_about);
		// Main text
		for (let i = 0, length = en.About_data.main_text.length; i < length; i++) {
			expect(paragraphs[i].text()).toBe(en.About_data.main_text[i]);
		}

		// Lists
		const extraActivitiesSection = wrapper.findAll('.about__extra');

		expect(extraActivitiesSection[0].findAll('li').length).toBe(en.About_data.experience_incl_list.length);
		expect(extraActivitiesSection[1].findAll('li').length).toBe(en.About_data.extra_activities_list.length);

		// Status
		expect(wrapper.find('.about__status').text()).toBe(en.About_data.availablity);
	});

	it('should render the correct text. RU', () => {
		const wrapper = aboutMount('ru');
		const paragraphs = wrapper.findAll('p');

		expect(wrapper.find('h2').text()).toBe(ru.Common_data.Common_title_about);
		// Main text
		for (let i = 0, length = ru.About_data.main_text.length; i < length; i++) {
			expect(paragraphs[i].text()).toBe(ru.About_data.main_text[i]);
		}

		// Lists
		const extraActivitiesSection = wrapper.findAll('.about__extra');

		expect(extraActivitiesSection[0].findAll('li').length).toBe(ru.About_data.experience_incl_list.length);
		expect(extraActivitiesSection[1].findAll('li').length).toBe(ru.About_data.extra_activities_list.length);

		// Status
		expect(wrapper.find('.about__status').text()).toBe(ru.About_data.availablity);
	});
});