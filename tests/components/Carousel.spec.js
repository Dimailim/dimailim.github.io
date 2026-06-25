import {mount} from '@vue/test-utils';

import Carousel from '@/components/Carousel.vue';

describe('Carousel component', () => {
	const carouselMount  = (items, perPage = 1) => mount(Carousel, {
		props: { items, perPage},
		slots: { default: '<div class="carousel-item"></div>' },
	});
	const carouselItems = [{title:'Test1'}, {title:'Test2'}, {title: 'Test3'}];

	it('should render the correct number of items', () => {
		const wrapper = carouselMount(carouselItems);

		expect(wrapper.findAll('.carousel__item').length).toBe(carouselItems.length);
	});

	it('should have next and previous buttons', () => {
		const wrapper = carouselMount(carouselItems);

		expect(wrapper.findAll('.carousel__btn').length).toBe(2);
	});

	it('should have carousel dots', () => {
		const perPage = 2;
		const wrapper = carouselMount(carouselItems, perPage);

		expect(wrapper.findAll('.carousel__dot').length).toBe(2);
	});

	it('shouldn\'t have buttons and dots when perPage is equal to items length', () => {
		const perPage = 1;
		const carouselItem = [{title: "Test"}];
		const wrapper = carouselMount(carouselItem, perPage);

		expect(wrapper.findAll('.carousel__btn').length).toBe(0);
		expect(wrapper.findAll('.carousel__dot').length).toBe(0);
	});

	it('check start position of carousel', () => {
		const wrapper = carouselMount(carouselItems);

		expect(wrapper.find('.carousel__btn--prev').isDisabled()).toBe(true);
		expect(wrapper.find('.carousel__btn--next').isDisabled()).toBe(false);
		expect(wrapper.findAll('.carousel__dot')[0].classes()).toContain('carousel__dot--active');
	});

	it('should call scrollTo by clicking next button', async () => {
		const wrapper = carouselMount(carouselItems, 2);
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 300, configurable: true});

		await wrapper.find('.carousel__btn--next').trigger('click');
		expect(viewportElement.scrollTo).toHaveBeenCalledWith({left: 150, behavior: 'smooth'});
	});

	it('should scroll to next element', async () => {
		const wrapper = carouselMount(carouselItems, 2);
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 300, configurable: true});
		viewportElement.scrollLeft = 150;

		await viewport.trigger('scroll');

		expect(wrapper.find('.carousel__btn--next').isDisabled()).toBe(true);
		expect(wrapper.find('.carousel__btn--prev').isDisabled()).toBe(false);
		expect(wrapper.findAll('.carousel__dot')[0].classes()).not.toContain('carousel__dot--active');
		expect(wrapper.findAll('.carousel__dot')[1].classes()).toContain('carousel__dot--active');
	});

	it('negative test: shouldn\'t scroll because of incorrect clientWidth', async () => {
		const wrapper = carouselMount(carouselItems);

		// Checking start position
		expect(wrapper.findAll('.carousel__dot')[0].classes()).toContain('carousel__dot--active');

		// Checking scroll
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 0, configurable: true});

		viewportElement.scrollLeft = 150;
		await viewport.trigger('scroll');

		expect(wrapper.find('.carousel__btn--prev').isDisabled()).toBe(true);
		expect(wrapper.find('.carousel__btn--next').isDisabled()).toBe(false);
		expect(wrapper.findAll('.carousel__dot')[0].classes()).toContain('carousel__dot--active');
	});

	it('should swipe to next element', async () => {
		const wrapper = carouselMount(carouselItems, 2);
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 300, configurable: true});

		await viewport.trigger('pointerdown', {clientX: 200});
		await viewport.trigger('pointerup', {clientX: 100});
		expect(viewportElement.scrollTo).toHaveBeenCalled();

	});

	it('should swipe to previous element', async () => {
		const wrapper = carouselMount(carouselItems, 2);
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 300, configurable: true});

		viewportElement.scrollLeft = 150;
		await viewport.trigger('scroll');
		await viewport.trigger('pointerdown', {clientX: 100});
		await viewport.trigger('pointerup', {clientX: 200});
		expect(viewportElement.scrollTo).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
	});

	it ('shouldn\'t recognize as swipe', async () => {
		const wrapper = carouselMount(carouselItems, 2);
		const viewport = wrapper.find('.carousel__viewport');
		const viewportElement = viewport.element;
		Object.defineProperty(viewportElement, 'clientWidth', {value: 300, configurable: true});

		await viewport.trigger('pointerdown', {clientX: 200});
		await viewport.trigger('pointerup', {clientX: 200});
		expect(viewportElement.scrollTo).not.toHaveBeenCalled();
	});
});