import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import App from '@/App.vue';
import useTheme from '@/composables/useTheme.js';
import en from '@/data/localization/en.json';

describe('App component', () => {
	const mountApp = (locale = 'en') => mount(App, {
		global: {
			plugins: [createTestI18n(locale)]
		}
	});

	beforeEach(() => {
		useTheme().theme.value = 'light';
	});

	it ('should render all main section', () => {
		const wrapper = mountApp();

		expect(wrapper.find('.header').exists()).toBe(true);
		expect(wrapper.find('.business-card').exists()).toBe(true);
		expect(wrapper.find('#about').exists()).toBe(true);
		expect(wrapper.find('#skills').exists()).toBe(true);
		expect(wrapper.find('#experience').exists()).toBe(true);
		expect(wrapper.find('#achievements').exists()).toBe(true);
		expect(wrapper.find('.footer').exists()).toBe(true);
	});

	it('should initialize theme on mount', () => {
		mountApp();

		expect(useTheme().theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
	});

	it ('should initialize  EN language on mount', () => {
		const wrapper = mountApp();

		expect(wrapper.find('#about h2').text()).toBe(en.Common_data.Common_title_about);
	});

});