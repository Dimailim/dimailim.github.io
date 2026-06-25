import useIntersectionObserver from '@/composables/useIntersectionObserver';

describe('useIntersectionObserver composable', () => {
	let mockObserverCallback;
	let mockObserverInstance;

	beforeEach(() => {
		mockObserverCallback = vi.fn();
		mockObserverInstance = {
			disconnect: vi.fn(),
			observe: vi.fn(),
			unobserve: vi.fn(),
		};
		global.IntersectionObserver = class {
			constructor(callback) {
				mockObserverCallback = callback;
			}
			observe() {
				mockObserverInstance.observe();
			}
			disconnect() {
				mockObserverInstance.disconnect();
			}
			unobserve() {
				mockObserverInstance.unobserve();
			}
		};


		document.body.innerHTML = `
			<div id="top"></div>
			<div id="about"></div>
		  	<div id="skills"></div>
		  	<div id="experience"></div>
		  	<div id="achievements"></div>
		`;
  	});
	afterEach(() => {
		document.body.innerHTML = '';
		vi.clearAllMocks();
	});

	it('should init observer for elements', () => {
		const elementIds = ['top', 'about', 'skills', 'experience', 'achievements'];
		const {initObservers} = useIntersectionObserver({});

		initObservers(elementIds);

		expect(mockObserverInstance.observe).toHaveBeenCalled(5);
	});
	it('should ingore elements that are not found in the DOM', () => {
		const elementIds = ['top', 'about', 'skills', 'experience', 'achievements', 'non-existent'];
		const {initObservers} = useIntersectionObserver({});

		initObservers(elementIds);

		expect(mockObserverInstance.observe).toHaveBeenCalled(5);
	});
	it('should update visibleElementId when element is visible', () => {
		const {visibleElementId, initObservers} = useIntersectionObserver({});
		const mockElement = document.getElementById('about');

		initObservers(['about', 'skills']);
		mockObserverCallback([
			{
				target: mockElement,
				isIntersecting: true,
			},
		]);

		expect(visibleElementId.value).toBe('about');
	});
	it('should update visibleElementId while switch between elements', () => {
		const { visibleElementId, initObservers } = useIntersectionObserver({});
		const aboutElement = document.getElementById('about');
		const skillsElement = document.getElementById('skills');

		initObservers(['about', 'skills', 'experience']);

		mockObserverCallback([{
			target: aboutElement,
			isIntersecting: true,
		}]);
		expect(visibleElementId.value).toBe('about');
		mockObserverCallback([{
			target: skillsElement,
			isIntersecting: true,
		}]);
		expect(visibleElementId.value).toBe('skills');
	});
	it('should call disconnect', () => {
		const {disconnectObserver} = useIntersectionObserver({});

		disconnectObserver();

		expect(mockObserverInstance.disconnect).toHaveBeenCalled();
	});
	it('should update visibleElementId for visible element. Multiple entries', () => {
		const { visibleElementId, initObservers } = useIntersectionObserver({});
		const aboutElement = document.getElementById('about');
		const skillsElement = document.getElementById('skills');
		const experienceElement = document.getElementById('experience');

		initObservers(['about', 'skills', 'experience']);
		mockObserverCallback([
			{
				target: aboutElement,
				isIntersecting: false,  // not visible
			},
			{
				target: skillsElement,
				isIntersecting: true,   // VISIBLE
			},
			{
				target: experienceElement,
				isIntersecting: false,  // not visible
			},
		]);

		expect(visibleElementId.value).toBe('skills');
	});

});