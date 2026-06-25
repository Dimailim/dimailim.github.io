import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import BusinessCard from '@/components/BusinessCard.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe('BusinessCard component', () => {
	const businessCardMount = (locale = 'en') => mount(BusinessCard, {
		global: {
			plugins: [createTestI18n(locale)]
		}
	});

	it('should render component correctly', () => {
		const wrapper = businessCardMount();

		expect(wrapper.find('.business-card').exists()).toBe(true);
	});

	it('should render text correctly. EN', () => {
		const wrapper = businessCardMount();

		expect(wrapper.find('.business-card__badge').text()).toBe(en.Common_data.BusinessCard_direction);
		expect(wrapper.find('.business-card__name').text()).toBe(en.Common_data.Common_name);
		expect(wrapper.find('.business-card__position').text()).toBe(en.Common_data.BusinessCard_position);
	});

	it('should render text correctly. RU', () => {
		const wrapper = businessCardMount('ru');

		expect(wrapper.find('.business-card__badge').text()).toBe(ru.Common_data.BusinessCard_direction);
		expect(wrapper.find('.business-card__name').text()).toBe(ru.Common_data.Common_name);
		expect(wrapper.find('.business-card__position').text()).toBe(ru.Common_data.BusinessCard_position);
	});
});