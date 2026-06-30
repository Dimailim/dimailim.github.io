import {ref} from 'vue';

const theme = ref('light');

const useTheme = () => {

	const toggleTheme = () => {
		theme.value = theme.value === 'light' ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', theme.value);
		localStorage.setItem('theme', theme.value);
	};
	const initTheme = () => {
		const dataThemeValue = document.documentElement.getAttribute('data-theme');
		if (dataThemeValue) {
			theme.value = dataThemeValue;
		} else {
			theme.value = 'light';
			document.documentElement.setAttribute('data-theme', 'light');
		}
	}

	return { theme, toggleTheme, initTheme };
}

export default useTheme;
