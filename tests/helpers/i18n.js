import {createI18n} from 'vue-i18n';
import en from '@/data/localization/en.json';
import ru from '@/data/localization/ru.json';

export default function createTestI18n(locale = 'en') {
	return createI18n({
		legacy: false,
		locale,
		fallbackLocale: 'en',
		messages: { en, ru },
	});
}