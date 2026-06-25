import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Footer from '@/components/Footer.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe('Footer component', () => {
	const currentYear = new Date().getFullYear();
	const mountFooter = (locale = 'en') => {
		const i18n = createTestI18n(locale);
		const wrapper = mount(Footer, {global: {plugins: [i18n]}});
		return {wrapper, i18n};
	};

	it('component should mounting without errors', () => {
		const {wrapper} = mountFooter();

		expect(wrapper.find('.footer').exists()).toBe(true);
	});

	it('should display the current year', () => {
		const {wrapper} = mountFooter();
		const copyrightSection = wrapper.find('.footer__copy');

		expect(copyrightSection.text()).toContain(currentYear.toString());
	});

	it('should display header text. EN', () => {
		const {wrapper} = mountFooter();
		const title = wrapper.find('h4');

		expect(title.text()).toBe(en.Common_data.Footer_title_contact);
	});

	it('should display all links. EN', () => {
		const {wrapper, i18n} = mountFooter();
		const links = wrapper.findAll('a');

		expect(links.length).toBe(3);
		expect(links[0].text()).toBe(en.Common_data.Common_links.github_title);
		expect(links[0].attributes('href')).toBe(en.Common_data.Common_links.github);
		expect(links[1].text()).toBe(en.Common_data.Common_links.linkedin_title);
		expect(links[1].attributes('href')).toBe(en.Common_data.Common_links.linkedin);
		expect(links[2].text()).toBe(en.Common_data.Common_links.email_title);
		const email = i18n.global.t('Common_data.Common_links.email');
		expect(links[2].attributes('href')).toBe('mailto:' + email);
	});

	it('should display the correct copyright text. EN', () => {
		const {wrapper} = mountFooter();
		const copyrightSection = wrapper.find('.footer__copy')

		expect(copyrightSection.text()).toContain(`${currentYear} ${en.Common_data.Common_name}`);
	});
	
	it('should display correct header. RU', () => {
		const {wrapper} = mountFooter('ru');
		const title = wrapper.find('h4');

		expect(title.text()).toBe(ru.Common_data.Footer_title_contact);
	});

	it('should display all links. RU', () => {
		const {wrapper, i18n} = mountFooter('ru');
		const links = wrapper.findAll('a');

		expect(links.length).toBe(3);
		expect(links[0].text()).toBe(ru.Common_data.Common_links.github_title);
		expect(links[0].attributes('href')).toBe(ru.Common_data.Common_links.github);
		expect(links[1].text()).toBe(ru.Common_data.Common_links.linkedin_title);
		expect(links[1].attributes('href')).toBe(ru.Common_data.Common_links.linkedin);
		expect(links[2].text()).toBe(ru.Common_data.Common_links.email_title);
		const email = i18n.global.t('Common_data.Common_links.email');
		expect(links[2].attributes('href')).toBe('mailto:' + email);
	});

	it('should display the correct copyright text. RU', () => {
		const {wrapper} = mountFooter('ru');
		const copyrightSection = wrapper.find('.footer__copy');

		expect(copyrightSection.text()).toContain(`${currentYear} ${ru.Common_data.Common_name}`);
	})
});
