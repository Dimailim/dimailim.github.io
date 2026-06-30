import {useI18n} from 'vue-i18n';

const useLanguage = () => {
	const {locale} = useI18n();
	const supportedLanguages = ['en', 'ru'];

	const toggleLang = (newLang) => {
		locale.value = newLang;
		localStorage.setItem('lang', newLang);
	};
	const initLang = () => {
			const clientLang = localStorage.getItem('lang') || navigator.language.split('-')[0];
			locale.value = supportedLanguages.includes(clientLang) ? clientLang : 'en';
	};

	return { locale, toggleLang, initLang };
}
export default useLanguage;