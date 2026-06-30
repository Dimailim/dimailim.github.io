import createTestI18n from '../helpers/i18n.js';
import {mount} from '@vue/test-utils';

import Skills from '@/components/Skills.vue';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

describe.each([
	['en', en],
	['ru', ru]
])('Skills component (%s)', (locale, messages) => {
	const skillsMount = () => mount(Skills, {
		global: {
			plugins: [createTestI18n(locale)],
		}
	});

	it ('should render skill cards', () => {
		const wrapper = skillsMount();

		expect(wrapper.findAll('.skill-card').length).toBe(messages.Skills_data.skills_list.length);
	});

	it('should render skill cards with correct data.', () => {
		const wrapper = skillsMount();

		const skillCards = wrapper.findAll('.skill-card');

		skillCards.forEach((card, index) => {
			const cardName = card.find('.skill-card__name');
			const cardExpertise = card.find('.skill-card__expertise');

			expect(cardName.text()).toBe(messages.Skills_data.skills_list[index].name);
			expect(cardExpertise.text()).toBe(messages.Skills_data.skills_list[index].description);
		});
	});

	it('should render extra text with correct data.', () => {
		const wrapper = skillsMount();

		const extraText = wrapper.find('.skills__note');

		expect(extraText.text()).toBe(messages.Skills_data.extra_text);
	});
});