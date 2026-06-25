import useLanguage from '@/composables/useLanguage.js';

// Mocking i18n
vi.mock('vue-i18n', () => ({
	useI18n: vi.fn(() => ({
		locale: {
			value: 'en'
		} })),
	createI18n: vi.fn()
}));

describe('useLanguage composable', () => {
	it('positive test: should return language "en" from navigator', () => {
		const { locale, initLang } = useLanguage();

		  initLang();

		expect(locale.value).toBe('en');
  	});

	it('positive test: should switch language from "en" to "ru"', () => {
		const { locale, initLang, toggleLang } = useLanguage();

		initLang();

		expect(locale.value).toBe('en');
		toggleLang('ru');
		expect(locale.value).toBe('ru');
  	});

	it('edge test: should use default en lang for unsupported lang', () => {
		Object.defineProperty(navigator, 'language', {
		  	value: 'fr-FR',
		  	writable: true,
			configurable: true
		});
	  	const { locale, initLang } = useLanguage();

		initLang();

		expect(locale.value).toBe('en');
  	});

	it('positive test: should switch lang en -> ru, ru -> en', () => {
		  const { locale, initLang, toggleLang } = useLanguage();

		  initLang();

		  expect(locale.value).toBe('en');
		  toggleLang('ru');
		  expect(locale.value).toBe('ru');
		  toggleLang('en');
		  expect(locale.value).toBe('en');
  	});
});