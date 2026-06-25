import useTheme from '@/composables/useTheme';

describe('useTheme composable', () => {
	beforeEach(() => {
		document.documentElement.removeAttribute('data-theme'); // явное предусловие
		useTheme().theme.value = 'light';                       // сброс синглтона
	});

	it ('positive test: should initialize theme from DOM attribute', () => {
		document.documentElement.setAttribute('data-theme', 'dark');
		const {theme, initTheme} = useTheme();

		initTheme();

		expect(theme.value).toBe('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
	});

	it('negative test: should initialize theme to light if no data-theme attribute is present', () => {
		const {theme, initTheme} = useTheme();

		initTheme();

		expect(theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
	});

	it('positive test: should switch theme from light to dark', () => {
		document.documentElement.setAttribute('data-theme', 'light');
		const {theme, initTheme, toggleTheme} = useTheme();

		initTheme();

		expect(theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');

		toggleTheme();

		expect(theme.value).toBe('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
	});

	it('positive test: should switch theme from dark to light', () => {
		document.documentElement.setAttribute('data-theme', 'dark');
		const {theme, initTheme, toggleTheme} = useTheme();

		initTheme();

		expect(theme.value).toBe('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
		toggleTheme();
		expect(theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
	});
	it('positive test: should correctly work while multiple switch theme', () => {
		document.documentElement.setAttribute('data-theme', 'light');
		const {theme, initTheme, toggleTheme} = useTheme();

		initTheme();

		expect(theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
		// light -> dark
		toggleTheme();
		expect(theme.value).toBe('dark');
		expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
		// dark -> light
		toggleTheme();
		expect(theme.value).toBe('light');
		expect(document.documentElement.getAttribute('data-theme')).toBe('light');
	});
});
