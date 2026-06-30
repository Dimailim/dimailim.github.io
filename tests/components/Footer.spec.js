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

	it.each([
		['en', en],
		['ru', ru]
	])('should display header text. (%s)', (locale, messages) => {
		const {wrapper} = mountFooter(locale);
		const title = wrapper.find('h4');

		expect(title.text()).toBe(messages.Common_data.Footer_title_contact);
	});

	it.each([
		['en', en],
		['ru', ru]
	])('should display all links. (%s)', (locale, messages) => {
		const {wrapper, i18n} = mountFooter(locale);
		const links = wrapper.findAll('a');

		expect(links.length).toBe(3);
		expect(links[0].text()).toBe(messages.Common_data.Common_links.github_title);
		expect(links[0].attributes('href')).toBe(messages.Common_data.Common_links.github);
		expect(links[1].text()).toBe(messages.Common_data.Common_links.linkedin_title);
		expect(links[1].attributes('href')).toBe(messages.Common_data.Common_links.linkedin);
		expect(links[2].text()).toBe(messages.Common_data.Common_links.email_title);
		const email = i18n.global.t('Common_data.Common_links.email');
		expect(links[2].attributes('href')).toBe('mailto:' + email);
	});

	it.each([
		['en', en],
		['ru', ru]
	])('should display the correct copyright text. (%s)', (locale, messages) => {
		const {wrapper} = mountFooter(locale);
		const copyrightSection = wrapper.find('.footer__copy')

		expect(copyrightSection.text()).toContain(`${currentYear} ${messages.Common_data.Common_name}`);
	});
});
