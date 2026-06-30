import useMediaQuery from '@/composables/useMediaQuery.js';
import withSetup from '../helpers/withSetup.js';

describe('useMediaQuery composable', () => {
	const mockMatchMedia = (matches) => {
		const mock = {
			changeHandler: null,
			addEventListener: vi.fn((event, cb) => { mock.changeHandler = cb; }),
			removeEventListener: vi.fn()
		};

		vi.stubGlobal('matchMedia', vi.fn(() => ({
			matches,
			addEventListener: mock.addEventListener,
			removeEventListener: mock.removeEventListener
		})));

		return mock;
	};

	it ('should returns the initial match value', () => {
		mockMatchMedia(true);

		const {result} = withSetup(() => useMediaQuery('(max-width: 768px)'));

		expect(result.value).toBe(true);
	});

	it('should updates the value when the media query changes', () => {
		const mock = mockMatchMedia(false);

		const {result} = withSetup(() => useMediaQuery('(max-width: 768px)'));

		expect(result.value).toBe(false);

		mock.changeHandler({matches: true});

		expect(result.value).toBe(true);
		expect(mock.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
	});

	it('should removes the listener when the component is unmounted', () => {
		const mock = mockMatchMedia(false);

		const {wrapper}= withSetup(() => useMediaQuery('(max-width: 768px)'));
		wrapper.unmount();

		expect(mock.removeEventListener).toHaveBeenCalled();
	});
});