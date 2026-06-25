import {createI18n} from 'vue-i18n';
import ru from '../data/localization/ru.json';
import en from '../data/localization/en.json';

export const  i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        ru,
        en
    }
});

export default i18n;
