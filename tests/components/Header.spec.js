import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Header from '@/components/Header.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';
import useTheme from '@/composables/useTheme.js';
import {nextTick} from 'vue';


describe('Header component', () => {
	const mountHeader = (locale = 'en') => {
		const i18n = createTestI18n(locale);
		const wrapper = mount(Header, {global: {plugins: [i18n]}});
		return {wrapper, i18n};
	};
	afterEach(() => {
		useTheme().theme.value = 'light';
	})

	it('should render correctly all header elements. EN', () => {
		const {wrapper} = mountHeader();
		const title = wrapper.find('.header__name');
		const navLinks = wrapper.findAll('.header__nav-link');
		const socialLinks = wrapper.findAll('.header__icon-link');
		const buttons = wrapper.findAll('button');

		expect(title.text()).toBe(en.Common_data.Common_name);
		expect(navLinks.length).toBe(4);
		expect(navLinks[0].text()).toBe(en.Common_data.Common_title_about);
		expect(navLinks[1].text()).toBe(en.Common_data.Common_title_skills);
		expect(navLinks[2].text()).toBe(en.Common_data.Common_title_experience);
		expect(navLinks[3].text()).toBe(en.Common_data.Common_title_achievements);
		expect(socialLinks.length).toBe(2);
		expect(socialLinks[0].attributes('title')).toBe(en.Common_data.Common_links.github_title);
		expect(socialLinks[0].attributes('href')).toBe(en.Common_data.Common_links.github);
		expect(socialLinks[1].attributes('title')).toBe(en.Common_data.Common_links.linkedin_title);
		expect(socialLinks[1].attributes('href')).toBe(en.Common_data.Common_links.linkedin);
		expect(buttons.length).toBe(3);
	});

	it('should render correctly all header elements. RU', () => {
		const {wrapper} = mountHeader('ru');
		const title = wrapper.find('.header__name');
		const navLinks = wrapper.findAll('.header__nav-link');
		const socialLinks = wrapper.findAll('.header__icon-link');
		const buttons = wrapper.findAll('button');

		expect(title.text()).toBe(ru.Common_data.Common_name);
		expect(navLinks.length).toBe(4);
		expect(navLinks[0].text()).toBe(ru.Common_data.Common_title_about);
		expect(navLinks[1].text()).toBe(ru.Common_data.Common_title_skills);
		expect(navLinks[2].text()).toBe(ru.Common_data.Common_title_experience);
		expect(navLinks[3].text()).toBe(ru.Common_data.Common_title_achievements);
		expect(socialLinks.length).toBe(2);
		expect(socialLinks[0].attributes('title')).toBe(ru.Common_data.Common_links.github_title);
		expect(socialLinks[0].attributes('href')).toBe(ru.Common_data.Common_links.github);
		expect(socialLinks[1].attributes('title')).toBe(ru.Common_data.Common_links.linkedin_title);
		expect(socialLinks[1].attributes('href')).toBe(ru.Common_data.Common_links.linkedin);
		expect(buttons.length).toBe(3)
	});

	it('should be eng localization active by default', () => {
		const {wrapper} = mountHeader();
		const buttons = wrapper.findAll('.header__lang-btn');
		const title = wrapper.find('.header__name')

		expect(buttons[0].classes()).toContain('header__lang-btn--active');
		expect(buttons[1].classes()).not.toContain('header__lang-btn--active');
		expect(title.text()).toBe(en.Common_data.Common_name);
	});

	it('should be light theme by default', () => {
		const {wrapper} = mountHeader();
		const button = wrapper.find('.header__theme-btn');

		expect(button.text()).toBe('moon_stars');
		expect(document.documentElement.getAttribute('data-theme')).toBe(null);
	});

	it('should change localization by click button', async () => {
		const {wrapper} = mountHeader();
		const langButtons = wrapper.findAll('.header__lang-btn');
		const langRuButton = langButtons.find((langButton) => langButton.text() === 'RU');
		const langEnButton = langButtons.find((langButton) => langButton.text() === 'EN');
		const title = wrapper.find('.header__name');

		// Change to RU
		await langRuButton.trigger('click');

		expect(langRuButton.classes()).toContain('header__lang-btn--active');
		expect(langEnButton.classes()).not.toContain('header__lang-btn--active');
		expect(title.text()).toBe(ru.Common_data.Common_name);

		// Change to EN
		await langEnButton.trigger('click');

		expect(langRuButton.classes()).not.toContain('header__lang-btn--active');
		expect(langEnButton.classes()).toContain('header__lang-btn--active');
		expect(title.text()).toBe(en.Common_data.Common_name);
	});

	it('should change theme after click theme button', async () => {
		const {wrapper} = mountHeader();
		const button = wrapper.find('.header__theme-btn');

		// To dark
		await button.trigger('click');

		expect(button.text()).toBe('light_mode');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

		// To light
		await button.trigger('click');

		expect(button.text()).toBe('moon_stars');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
	});

	it('should highlights active nav link when section becomes visible', async () => {
		const {wrapper} = mountHeader();
		const navigation = wrapper.find('.header__nav-list');
		const navigationLinks = navigation.findAll('a');

		for (let i = 0; i < navigationLinks.length; i++) {
			expect(navigationLinks[i].classes()).not.toContain('header__nav-link--active');
		}

		// Scroll to About
		global.IntersectionObserverCallback([
			{
			target: {id: 'about'},
			isIntersecting: true,
			}
		]);
		await nextTick();

		expect(navigationLinks[0].classes()).toContain('header__nav-link--active');

		//Scroll to Skills
		global.IntersectionObserverCallback([
			{
			target: {id: 'skills'},
			isIntersecting: true,
			}
		]);
		await nextTick();

		expect(navigationLinks[0].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[1].classes()).toContain('header__nav-link--active');

		// Scroll to Experience
		global.IntersectionObserverCallback([
			{
			target: {id: 'experience'},
			isIntersecting: true,
			}
		]);
		await nextTick();

		expect(navigationLinks[0].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[1].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[2].classes()).toContain('header__nav-link--active');

		// Scroll to Achievements
		global.IntersectionObserverCallback([
			{
				target: {id: 'achievements'},
				isIntersecting: true,
			}
		]);
		await nextTick();

		expect(navigationLinks[0].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[1].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[2].classes()).not.toContain('header__nav-link--active');
		expect(navigationLinks[3].classes()).toContain('header__nav-link--active');
	});

	it('should scrolls to top on logo click', async () => {
		const { wrapper } = mountHeader();
		await wrapper.find('.header__logo').trigger('click');
		expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
	});

	it('should scrolls to section on nav link click', async () => {
		// creating real sections to getElementById in scrollTo function find them
		const ids = ['about', 'skills', 'experience', 'achievements'];
		ids.forEach((id) => {
			const el = document.createElement('section');
			el.id = id;
			document.body.appendChild(el);
		});

		const { wrapper } = mountHeader();
		const navLinks = wrapper.findAll('.header__nav-link');

		await navLinks[0].trigger('click');
		expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });

		await navLinks[1].trigger('click');
		expect(window.scrollTo).toHaveBeenLastCalledWith({ top: -400, behavior: 'smooth' });

		await navLinks[2].trigger('click');
		expect(window.scrollTo).toHaveBeenLastCalledWith({ top: -100, behavior: 'smooth' });

		await navLinks[3].trigger('click');
		expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, behavior: 'smooth' });

		ids.forEach((id) => document.getElementById(id)?.remove());
	});

	it('should disconnects observer on unmount', () => {
		const { wrapper } = mountHeader();
		
		expect(() => wrapper.unmount()).not.toThrow();
	});
});
