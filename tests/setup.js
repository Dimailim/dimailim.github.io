import {afterEach, beforeAll, vi} from 'vitest';

beforeAll(() => {
	// Mocking IntersectionObserver. Using in useIntersectionObserver composable.
	global.IntersectionObserver = class IntersectionObserver {
		constructor(callback) {
			this.callback = callback;
			global.IntersectionObserverCallback = callback;
		}

		observe() {
			return null;
		}

		disconnect() {
			return null;
		}
		unobserve() {
			return null;
		}
	}

	// Mocking matchMedia. Using in index.html for init theme.
	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		configurable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		}))
	});

	// Mocking navigator.language. Using in useLanguage composable.
	Object.defineProperty(navigator, 'language', {
		writable: true,
		configurable: true,
		value: 'en-US'
	});

	// Mocking scrollTo
	window.scrollTo = vi.fn();
	Element.prototype.scrollTo = vi.fn();
});

afterEach(() => {
	document.documentElement.removeAttribute('data-theme');
	vi.clearAllMocks();
	vi.unstubAllGlobals()
	global.IntersectionObserverCallback = null;
	localStorage.clear();
});
